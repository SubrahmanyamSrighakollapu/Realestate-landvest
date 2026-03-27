import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Stage, Layer, Rect, Text, Group, Arrow, Circle, Line } from 'react-konva';
import {
  LuMapPin, LuSearch, LuX, LuRefreshCw, LuSun, LuMoon,
  LuCar, LuDoorOpen, LuRuler,
  LuClipboardList, LuBookmark, LuPhone, LuMap,
} from 'react-icons/lu';

const STATUS_COLORS  = { Available: '#22c55e', Sold: '#ef4444', Reserved: '#f59e0b', Booked: '#3b82f6', Mortgage: '#8b5cf6' };
const STATUS_DARK    = { Available: '#15803d', Sold: '#b91c1c', Reserved: '#b45309', Booked: '#1d4ed8', Mortgage: '#6d28d9' };
const STATUS_LABEL   = { Available: '#bbf7d0', Sold: '#fecaca', Reserved: '#fde68a', Booked: '#bfdbfe', Mortgage: '#ede9fe' };
const CROSSED_STATUS = new Set(['Mortgage']);

// Real estate: 1 Sq.Yd ≈ 0.84 m². Typical plot frontage (width) ~9 yds, depth varies.
// We fix canvas width per plot and scale height proportionally to area.
const PLOT_W = 52;
const BASE_AREA = 120;
const BASE_H    = 44;
const COLS = 10;

function plotH(area) { return Math.round(BASE_H * (area / BASE_AREA)); }

// Real-world dimensions (width × depth in yards) for display
const PLOT_DIMS = {
  100: { w: '9\'0"', d: '11\'1"' },
  120: { w: '9\'0"', d: '13\'4"' },
  140: { w: '9\'0"', d: '15\'6"' },
  150: { w: '10\'0"', d: '15\'0"' },
  160: { w: '10\'0"', d: '16\'0"' },
  180: { w: '12\'0"', d: '15\'0"' },
};

// Boundary side lengths in feet for each area size
// North/South = frontage width, East/West = depth
const SIDE_DIMS = {
  100: { N: 27, S: 27, E: 33, W: 33 },
  120: { N: 27, S: 27, E: 40, W: 40 },
  140: { N: 27, S: 28, E: 46, W: 47 },
  150: { N: 30, S: 30, E: 45, W: 45 },
  160: { N: 30, S: 30, E: 48, W: 48 },
  180: { N: 36, S: 36, E: 45, W: 45 },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// const NEARBY = [...]; // removed
// const AMENITIES = [...]; // removed

function buildPlots(total) {
  const count   = Math.min(total || 150, 200);
  const facings = ['East','West','North','South'];
  const areas   = [100, 120, 140, 150, 160, 180];
  const plots   = [];
  const PRICE_PER_SQYD = 15000;

  const pool = shuffle([
    ...Array(Math.ceil(count * 0.45)).fill('Available'),
    ...Array(Math.ceil(count * 0.20)).fill('Sold'),
    ...Array(Math.ceil(count * 0.12)).fill('Reserved'),
    ...Array(Math.ceil(count * 0.13)).fill('Booked'),
    ...Array(Math.ceil(count * 0.10)).fill('Mortgage'),
  ].slice(0, count));

  const areaPool = shuffle(
    Array.from({ length: count }, (_, i) => areas[i % areas.length])
  );

  // 10 columns — each with its own staggered top offset and row count.
  // Strong variation between adjacent columns = organic, non-rectangular silhouette.
  // No internal gaps: every column is a solid stack from colTopY to colBotY.
  const COL_TOP  = [3, 0, 4, 1, 5, 0, 3, 1, 4, 2].map(v => v * BASE_H);
  const COL_ROWS = [12, 16, 13, 17, 11, 15, 14, 16, 12, 14];

  const canvasW = COLS * PLOT_W;
  const colTopY = [];
  const colBotY = [];
  let idx = 0;

  for (let col = 0; col < COLS; col++) {
    let y = COL_TOP[col];
    colTopY.push(y);
    for (let row = 0; row < COL_ROWS[col]; row++) {
      const area = areaPool[idx % areaPool.length];
      const h    = plotH(area);
      plots.push({
        id: idx + 1, plotNo: String(idx + 1),
        x: col * PLOT_W, y, w: PLOT_W, h,
        block: row < Math.floor(COL_ROWS[col] / 2) ? 'A' : 'B',
        status: pool[idx % pool.length],
        facing: facings[idx % 4], area,
        dims: PLOT_DIMS[area] || { w: "9'0\"", d: "13'4\"" },
        sides: SIDE_DIMS[area] || { N: 27, S: 27, E: 40, W: 40 },
        price: (area * PRICE_PER_SQYD).toLocaleString('en-IN'),
        pricePerSqYd: PRICE_PER_SQYD.toLocaleString('en-IN'),
        isCorner: col === 0 || col === COLS - 1,
        distToRoad: Math.floor(Math.random() * 30) + 5,
        distToGate: Math.floor(Math.random() * 120) + 20,
      });
      y += h;
      idx++;
    }
    colBotY.push(y);
  }

  const canvasH = Math.max(...colBotY) + 4;

  // Boundary: stepped top (left→right) + stepped bottom (right→left)
  const bPts = [];
  // TOP edge
  for (let col = 0; col < COLS; col++) {
    if (col === 0) {
      bPts.push([0, colTopY[0]]);
    } else if (colTopY[col] !== colTopY[col - 1]) {
      bPts.push([col * PLOT_W, colTopY[col - 1]]);
      bPts.push([col * PLOT_W, colTopY[col]]);
    }
    if (col === COLS - 1) bPts.push([canvasW, colTopY[col]]);
  }
  // RIGHT side down
  bPts.push([canvasW, colBotY[COLS - 1]]);
  // BOTTOM edge
  for (let col = COLS - 1; col >= 0; col--) {
    if (col === COLS - 1) {
      bPts.push([(col + 1) * PLOT_W, colBotY[col]]);
    } else if (colBotY[col] !== colBotY[col + 1]) {
      bPts.push([(col + 1) * PLOT_W, colBotY[col + 1]]);
      bPts.push([(col + 1) * PLOT_W, colBotY[col]]);
    }
    if (col === 0) bPts.push([0, colBotY[0]]);
  }
  // LEFT side up
  bPts.push([0, colTopY[0]]);

  return { plots, canvasW, canvasH, boundaryPts: bPts };
}

export default function PlotLayout({ project }) {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const animRef  = useRef(null);
  const [size, setSize]       = useState({ w: 800, h: 580 });
  const [scale, setScale]     = useState(0.6);
  const [pos, setPos]         = useState({ x: 30, y: 30 });
  const [hover, setHover]     = useState(null);
  const [hPos, setHPos]       = useState({ x:0, y:0 });
  const [selected, setSelected] = useState(null);
  const [filter, setFilter]   = useState('All');
  const [showPanel, setShowPanel] = useState(false);
  const [search, setSearch]   = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const [night, setNight]     = useState(true);
  const [amenityHover, setAmenityHover] = useState(null);
  const [amenityPos, setAmenityPos]     = useState({ x:0, y:0 });
  // nearby & amenities state kept but unused

  const { plots, canvasW, canvasH, boundaryPts } = useMemo(() => buildPlots(project?.totalPlots), [project?.totalPlots]);
  const counts = plots.reduce((a,p) => ({...a,[p.status]:(a[p.status]||0)+1}),{});

  useEffect(() => {
    const upd = () => {
      if (wrapRef.current) {
        const w = wrapRef.current.offsetWidth;
        setSize({ w, h: Math.max(500, Math.min(w*0.7, 640)) });
      }
    };
    upd();
    window.addEventListener('resize', upd);
    return () => window.removeEventListener('resize', upd);
  }, []);

  const onWheel = useCallback((e) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    const ptr   = stage.getPointerPosition();
    const by    = 1.12;
    const next  = Math.min(Math.max(scale*(e.evt.deltaY<0?by:1/by),0.25),6);
    setPos({ x: ptr.x-((ptr.x-pos.x)/scale)*next, y: ptr.y-((ptr.y-pos.y)/scale)*next });
    setScale(next);
  }, [scale, pos]);

  const focusPlot = useCallback((p) => {
    const TARGET_SCALE = 2.5;
    const cx = size.w / 2 - (p.x + p.w / 2) * TARGET_SCALE;
    const cy = size.h / 2 - (p.y + p.h / 2) * TARGET_SCALE;
    const startScale = scale, startX = pos.x, startY = pos.y;
    const duration = 420;
    const start = performance.now();
    if (animRef.current) cancelAnimationFrame(animRef.current);
    function step(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
      setScale(startScale + (TARGET_SCALE - startScale) * ease);
      setPos({ x: startX + (cx - startX) * ease, y: startY + (cy - startY) * ease });
      if (t < 1) animRef.current = requestAnimationFrame(step);
    }
    animRef.current = requestAnimationFrame(step);
  }, [scale, pos, size]);

  const handleSelect = (p) => {
    if (selected?.id === p.id) { setSelected(null); setShowPanel(false); }
    else { setSelected(p); setShowPanel(true); setSearch(''); setSearchFocus(false); focusPlot(p); }
  };

  const handleSearchSelect = (p) => {
    setSelected(p); setShowPanel(true); setSearch(''); setSearchFocus(false); focusPlot(p);
  };

  const searchResults = search.trim()
    ? plots.filter(p => p.plotNo.startsWith(search.trim())).slice(0, 6)
    : [];

  const reset = () => { setScale(0.6); setPos({ x:20, y:20 }); };

  const GRASS   = night ? '#1a3a2a' : '#d1fae5';
  const BG      = night ? '#0f1923' : '#f0fdf4';
  const PANEL   = night ? 'rgba(15,25,35,0.97)' : 'rgba(255,255,255,0.97)';
  const CARD    = night ? '#1e293b' : '#ffffff';
  const CARDBR  = night ? '#334155' : '#e2e8f0';
  const TXT     = night ? '#f1f5f9' : '#0f172a';
  const TXTSUB  = night ? '#94a3b8' : '#64748b';
  const TXSMUTE = night ? '#475569' : '#94a3b8';
  const BADGE   = night ? 'rgba(15,25,35,0.88)' : 'rgba(255,255,255,0.95)';
  const BADGEBR = night ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const CTRL    = night ? 'rgba(15,25,35,0.9)' : 'rgba(255,255,255,0.9)';
  const CTRLBR  = night ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
  const CTRTXT  = night ? 'white' : '#0f172a';
  const SRCHBG  = night ? 'rgba(15,25,35,0.92)' : 'rgba(255,255,255,0.95)';
  const SRCHBR  = night ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
  const DDRBG   = night ? 'rgba(15,25,35,0.97)' : 'rgba(255,255,255,0.97)';
  const DDRBR   = night ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const TTIPBG  = night ? 'rgba(15,25,35,0.95)' : 'rgba(255,255,255,0.97)';
  const SCALEBG = night ? 'rgba(15,25,35,0.75)' : 'rgba(255,255,255,0.85)';
  const CHIPBG  = night ? '#1e293b' : '#f1f5f9';
  const CHIPBR  = night ? '#334155' : '#e2e8f0';
  const CHIPTXT = night ? '#94a3b8' : '#475569';
  const STATSBG = night ? '#0a1118' : '#f8fafc';
  const FILTBG  = night ? '#0f1923' : '#f1f5f9';

  return (
    <div style={{ position:'relative', fontFamily:'system-ui,sans-serif', borderRadius:16, overflow:'hidden', boxShadow:'0 8px 40px rgba(0,0,0,0.35)' }}>

      {/* ── MAP CANVAS ── */}
      <div ref={wrapRef} style={{ position:'relative', background: BG, transition:'background 0.3s' }}>
        <Stage
          width={size.w} height={size.h}
          x={pos.x} y={pos.y}
          scaleX={scale} scaleY={scale}
          draggable
          onWheel={onWheel}
          onDragEnd={e => setPos({ x:e.target.x(), y:e.target.y() })}
        >
          <Layer>
            {/* Background */}
            <Rect x={-200} y={-200} width={canvasW+400} height={canvasH+400} fill={GRASS} />
            {/* Interior fill — clips visual noise outside plot area */}
            <Line points={boundaryPts.flat()} closed fill={night ? '#0f1923' : '#f8fafc'} strokeWidth={0} listening={false} />
            {/* Outer boundary — solid stepped line from actual plot edges */}
            <Line points={boundaryPts.flat()} closed fill="transparent" stroke={night ? '#94a3b8' : '#475569'} strokeWidth={2.5} listening={false} />

            {/* Compass */}
            <Circle x={canvasW-24} y={24} radius={18} fill="rgba(15,25,35,0.85)" stroke="#475569" strokeWidth={1} />
            <Text text="N" x={canvasW-30} y={14} fontSize={11} fill="#f8fafc" fontStyle="bold" />
            <Arrow points={[canvasW-24,32,canvasW-24,22]} stroke="#ef4444" strokeWidth={2} fill="#ef4444" pointerLength={4} pointerWidth={4} />
            <Arrow points={[canvasW-24,16,canvasW-24,26]} stroke="#94a3b8" strokeWidth={2} fill="#94a3b8" pointerLength={4} pointerWidth={4} />

            {/* Plots */}
            {plots.map(p => {
              const isSel   = selected?.id === p.id;
              const isHov   = hover?.id === p.id;
              const dimmed  = filter!=='All' && p.status!==filter;
              const c       = STATUS_COLORS[p.status];
              const cd      = STATUS_DARK[p.status];
              const crossed = CROSSED_STATUS.has(p.status);
              const jitter  = (seed, max) => ((seed * 2654435761) % 100) / 100 * max;
              const j = (n) => jitter(p.id * 7 + n, 4) - 2;
              const pts = [
                j(1), j(2),
                p.w + j(3), j(4),
                p.w + j(5), p.h + j(6),
                j(7), p.h + j(8),
              ];
              // Compass rose centre — middle of plot
              const cx = p.w / 2, cy = p.h / 2;
              const R = Math.min(p.w, p.h) * 0.36; // arrow radius
              const DIRS = [
                { label:'N', angle:-90, color: p.facing==='North' ? '#fbbf24' : 'rgba(255,255,255,0.55)' },
                { label:'E', angle:  0, color: p.facing==='East'  ? '#fbbf24' : 'rgba(255,255,255,0.55)' },
                { label:'S', angle: 90, color: p.facing==='South' ? '#fbbf24' : 'rgba(255,255,255,0.55)' },
                { label:'W', angle:180, color: p.facing==='West'  ? '#fbbf24' : 'rgba(255,255,255,0.55)' },
              ];
              return (
                <Group key={p.id} x={p.x} y={p.y}>
                  {/* Shadow polygon */}
                  <Line points={pts.map((v,i) => i%2===0 ? v+2 : v+2)} closed fill='rgba(0,0,0,0.35)' listening={false} />
                  {/* Plot polygon */}
                  <Line
                    points={pts} closed fill={c}
                    stroke={isSel ? '#fff' : isHov ? '#fff' : cd}
                    strokeWidth={isSel ? 2.5 : isHov ? 2 : 1}
                    opacity={dimmed ? 0.15 : 1}
                    shadowColor={isSel ? '#fff' : 'transparent'}
                    shadowBlur={isSel ? 10 : 0}
                    onClick={() => handleSelect(p)}
                    onMouseEnter={e => {
                      e.target.getStage().container().style.cursor='pointer';
                      const pt = e.target.getStage().getPointerPosition();
                      setHover(p); setHPos({ x:pt.x, y:pt.y });
                    }}
                    onMouseMove={e => {
                      const pt = e.target.getStage().getPointerPosition();
                      setHPos({ x:pt.x, y:pt.y });
                    }}
                    onMouseLeave={e => {
                      e.target.getStage().container().style.cursor='default';
                      setHover(null);
                    }}
                  />
                  {/* Cross lines for Sold & Mortgage */}
                  {crossed && (
                    <>
                      <Line points={[2, 2, p.w-2, p.h-2]} stroke='rgba(0,0,0,0.55)' strokeWidth={1.5} listening={false} opacity={dimmed ? 0.2 : 1} />
                      <Line points={[p.w-2, 2, 2, p.h-2]} stroke='rgba(0,0,0,0.55)' strokeWidth={1.5} listening={false} opacity={dimmed ? 0.2 : 1} />
                    </>
                  )}
                  {/* Plot number — hide on hover to make room for compass */}
                  {!isHov && (
                    <Text text={p.plotNo} width={p.w} height={p.h}
                      align='center' verticalAlign='middle'
                      fontSize={10} fill='white' fontStyle='bold'
                      opacity={dimmed ? 0.2 : 1}
                      listening={false}
                    />
                  )}
                  {/* ── COMPASS ROSE on hover ── */}
                  {isHov && !dimmed && (
                    <Group listening={false}>
                      {/* dark semi-transparent overlay on the plot */}
                      <Rect x={0} y={0} width={p.w} height={p.h} fill='rgba(0,0,0,0.45)' cornerRadius={2} />
                      {/* outer ring */}
                      <Circle x={cx} y={cy} radius={R+4} fill='rgba(0,0,0,0.35)' stroke='rgba(255,255,255,0.2)' strokeWidth={0.5} />
                      {/* 4 direction arrows + labels */}
                      {DIRS.map(({ label, angle, color }) => {
                        const rad = (angle * Math.PI) / 180;
                        const tx = cx + Math.cos(rad) * (R + 9);
                        const ty = cy + Math.sin(rad) * (R + 9);
                        const ax = cx + Math.cos(rad) * (R - 2);
                        const ay = cy + Math.sin(rad) * (R - 2);
                        const isFacing = color === '#fbbf24';
                        return (
                          <Group key={label}>
                            {/* arrow from centre toward direction */}
                            <Arrow
                              points={[cx, cy, ax, ay]}
                              stroke={color}
                              strokeWidth={isFacing ? 2 : 1}
                              fill={color}
                              pointerLength={isFacing ? 5 : 3}
                              pointerWidth={isFacing ? 4 : 2.5}
                            />
                            {/* direction label */}
                            <Text
                              text={label}
                              x={tx - 5} y={ty - 5}
                              fontSize={isFacing ? 8 : 7}
                              fill={color}
                              fontStyle={isFacing ? 'bold' : 'normal'}
                            />
                          </Group>
                        );
                      })}
                      {/* plot number small at top-left */}
                      <Text text={`#${p.plotNo}`} x={3} y={3} fontSize={7} fill='rgba(255,255,255,0.7)' fontStyle='bold' />
                      {/* facing label at bottom centre */}
                      <Text
                        text={`${p.facing} Facing`}
                        width={p.w} y={p.h - 11}
                        align='center' fontSize={7}
                        fill='#fbbf24' fontStyle='bold'
                      />
                    </Group>
                  )}
                  {isSel && (
                    <Circle x={p.w/2} y={-8} radius={6} fill='#fff' stroke={c} strokeWidth={2} listening={false} />
                  )}
                </Group>
              );
            })}
            {/* Amenities layer — commented out
            {AMENITIES.map(a => {
              const ax = a.cx * canvasW;
              const ay = a.cy * canvasH;
              return (
                <Group key={a.id} x={ax} y={ay}
                  onMouseEnter={e => {
                    const pt = e.target.getStage().getPointerPosition();
                    setAmenityHover(a);
                    setAmenityPos({ x: pt.x, y: pt.y });
                  }}
                  onMouseMove={e => {
                    const pt = e.target.getStage().getPointerPosition();
                    setAmenityPos({ x: pt.x, y: pt.y });
                  }}
                  onMouseLeave={() => setAmenityHover(null)}
                >
                  <Circle radius={14} fill={night ? 'rgba(15,25,35,0.92)' : 'rgba(255,255,255,0.92)'} stroke={a.color} strokeWidth={2} shadowColor={a.color} shadowBlur={6} />
                  <Text text='+' fontSize={10} fill={a.color} offsetX={3} offsetY={5} listening={false} />
                </Group>
              );
            })}
            */}
          </Layer>
        </Stage>

        {/* Amenity tooltip — commented out
        {amenityHover && (
          <div style={{
            position:'absolute',
            left: Math.min(amenityPos.x + 14, size.w - 160),
            top:  Math.max(amenityPos.y - 44, 4),
            background: night ? 'rgba(15,25,35,0.97)' : 'rgba(255,255,255,0.97)',
            border:`1px solid ${amenityHover.color}`,
            borderRadius:8, padding:'6px 12px',
            pointerEvents:'none', zIndex:60,
            color: TXT, fontSize:12, fontWeight:600,
            boxShadow:'0 4px 16px rgba(0,0,0,0.4)',
            display:'flex', alignItems:'center', gap:6,
            whiteSpace:'nowrap',
          }}>
            <amenityHover.Icon size={14} color={amenityHover.color} />
            {amenityHover.label}
          </div>
        )}
        */}

        {/* ── FLOATING: Day/Night toggle ── */}
        <button onClick={() => setNight(n => !n)} style={{
          position:'absolute', bottom:14, right:12, zIndex:50,
          width:40, height:40, borderRadius:8,
          background: CTRL, border:`1px solid ${CTRLBR}`,
          cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          backdropFilter:'blur(8px)', boxShadow:'0 2px 8px rgba(0,0,0,0.3)',
          color: night ? '#fbbf24' : '#6366f1',
        }}>{night ? <LuSun size={18}/> : <LuMoon size={18}/>}</button>

        {/* ── FLOATING: Search Plot ── */}
        <div style={{ position:'absolute', top:12, right:12, zIndex:50 }}>
          <div style={{ position:'relative' }}>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setSearchFocus(true); }}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setTimeout(() => setSearchFocus(false), 150)}
              placeholder="Search plot no..."
              style={{
                width:170, padding:'8px 12px 8px 34px', borderRadius:10,
                background: SRCHBG, backdropFilter:'blur(8px)',
                border:`1px solid ${SRCHBR}`,
                color: TXT, fontSize:12, outline:'none',
                boxShadow:'0 2px 12px rgba(0,0,0,0.3)',
              }}
            />
            <LuSearch size={14} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color: TXTSUB, pointerEvents:'none' }} />
            {searchFocus && searchResults.length > 0 && (
              <div style={{
                position:'absolute', top:'110%', left:0, right:0,
                background: DDRBG, borderRadius:10,
                border:`1px solid ${DDRBR}`,
                overflow:'hidden', boxShadow:'0 8px 24px rgba(0,0,0,0.4)',
              }}>
                {searchResults.map(p => (
                  <div key={p.id} onMouseDown={() => handleSearchSelect(p)} style={{
                    padding:'8px 12px', cursor:'pointer', display:'flex',
                    justifyContent:'space-between', alignItems:'center',
                    borderBottom:`1px solid ${DDRBR}`,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background= night ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                  >
                    <span style={{ color: TXT, fontWeight:700, fontSize:13 }}>Plot #{p.plotNo}</span>
                    <span style={{ fontSize:11, padding:'2px 8px', borderRadius:20,
                      background: STATUS_DARK[p.status], color: STATUS_LABEL[p.status] }}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── FLOATING: Top-left project badge ── */}
        <div style={{
          position:'absolute', top:12, left:12,
          background: BADGE, backdropFilter:'blur(8px)',
          borderRadius:10, padding:'8px 14px',
          border:`1px solid ${BADGEBR}`,
          pointerEvents:'none',
        }}>
          <div style={{ color: night ? '#6ee7b7' : '#059669', fontSize:10, fontWeight:700, letterSpacing:1, textTransform:'uppercase' }}>Plot Map</div>
          <div style={{ color: TXT, fontSize:13, fontWeight:700, marginTop:2 }}>{project?.title || 'Layout'}</div>
          <div style={{ color: TXTSUB, fontSize:11, marginTop:1, display:'flex', alignItems:'center', gap:4 }}><LuMapPin size={11}/> {project?.location || '—'}</div>
        </div>

        {/* ── FLOATING: Zoom controls ── */}
        <div style={{
          position:'absolute', right:12, bottom: showPanel ? 220 : 60,
          display:'flex', flexDirection:'column', gap:2,
          transition:'bottom 0.35s ease',
        }}>
          {[['+', () => setScale(s=>Math.min(s*1.3,6))],['-', () => setScale(s=>Math.max(s/1.3,0.25))]].map(([l,fn]) => (
            <button key={l} onClick={fn} style={{
              width:40, height:40, borderRadius:8,
              background: CTRL, border:`1px solid ${CTRLBR}`,
              color: CTRTXT, fontSize:20, fontWeight:300,
              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
              backdropFilter:'blur(8px)', boxShadow:'0 2px 8px rgba(0,0,0,0.3)',
            }}>{l}</button>
          ))}
          <button onClick={reset} style={{
            width:40, height:40, borderRadius:8, marginTop:4,
            background: CTRL, border:`1px solid ${CTRLBR}`,
            color:'#6ee7b7', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            backdropFilter:'blur(8px)', boxShadow:'0 2px 8px rgba(0,0,0,0.3)',
          }}><LuRefreshCw size={16}/></button>
        </div>

        {/* ── FLOATING: Scale indicator ── */}
        <div style={{
          position:'absolute', left:12, bottom:14,
          background: SCALEBG, backdropFilter:'blur(6px)',
          borderRadius:6, padding:'4px 10px',
          color: TXTSUB, fontSize:11,
          border:`1px solid ${CARDBR}`,
          pointerEvents:'none',
        }}>
          {Math.round(scale*100)}% zoom
        </div>

        {/* ── FLOATING: Hover tooltip ── */}
        {hover && !selected && (
          <div style={{
            position:'absolute',
            left: Math.min(hPos.x+16, size.w-220),
            top:  Math.max(hPos.y-160, 8),
            background: TTIPBG, backdropFilter:'blur(12px)',
            border:`1px solid ${STATUS_COLORS[hover.status]}55`,
            borderRadius:12, padding:'12px 14px',
            pointerEvents:'none',
            boxShadow:`0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${STATUS_COLORS[hover.status]}33`,
            zIndex:30, minWidth:190,
          }}>
            {/* header */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
              <span style={{ color: TXT, fontWeight:700, fontSize:14 }}>Plot #{hover.plotNo}</span>
              <span style={{
                fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20,
                background: STATUS_DARK[hover.status], color: STATUS_LABEL[hover.status],
              }}>{hover.status}</span>
            </div>

            {/* Boundary dimensions diagram */}
            <div style={{
              position:'relative', margin:'0 auto 10px',
              width:120, height:90,
              border:`1.5px solid ${night?'rgba(255,255,255,0.25)':'rgba(0,0,0,0.2)'}`,
              borderRadius:4,
              background: night?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.03)',
            }}>
              {/* North — top centre */}
              <div style={{ position:'absolute', top:-10, left:0, right:0, textAlign:'center' }}>
                <span style={{ fontSize:10, fontWeight:700, color: hover.facing==='North'?'#fbbf24':TXTSUB }}>
                  N: {hover.sides.N} ft
                </span>
              </div>
              {/* South — bottom centre */}
              <div style={{ position:'absolute', bottom:-10, left:0, right:0, textAlign:'center' }}>
                <span style={{ fontSize:10, fontWeight:700, color: hover.facing==='South'?'#fbbf24':TXTSUB }}>
                  S: {hover.sides.S} ft
                </span>
              </div>
              {/* West — left middle */}
              <div style={{ position:'absolute', left:-28, top:0, bottom:0, display:'flex', alignItems:'center' }}>
                <span style={{ fontSize:10, fontWeight:700, color: hover.facing==='West'?'#fbbf24':TXTSUB, whiteSpace:'nowrap' }}>
                  W: {hover.sides.W} ft
                </span>
              </div>
              {/* East — right middle */}
              <div style={{ position:'absolute', right:-28, top:0, bottom:0, display:'flex', alignItems:'center' }}>
                <span style={{ fontSize:10, fontWeight:700, color: hover.facing==='East'?'#fbbf24':TXTSUB, whiteSpace:'nowrap' }}>
                  E: {hover.sides.E} ft
                </span>
              </div>
              {/* facing label inside box */}
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:9, color:'#fbbf24', fontWeight:700, letterSpacing:0.5 }}>
                  {hover.facing} Facing
                </span>
              </div>
            </div>

            {/* details */}
            {[['Block',hover.block],['Area',`${hover.area} Sq.Yds`],['Price',`₹${hover.price}`]].map(([l,v])=>(
              <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:4 }}>
                <span style={{ color: TXTSUB }}>{l}</span>
                <span style={{ color: TXT, fontWeight:600 }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop:8, fontSize:11, color: TXSMUTE, textAlign:'center' }}>Click to pin details</div>
          </div>
        )}

        {/* ── FLOATING BOTTOM: Selected plot panel (Google Maps bottom sheet) ── */}
        {selected && (
          <div style={{
            position:'absolute', bottom:0, left:0, right:0,
            background: PANEL,
            backdropFilter:'blur(16px)',
            borderTop:`2px solid ${STATUS_COLORS[selected.status]}`,
            borderRadius:'0 0 16px 16px',
            padding:'16px 20px',
            transform: showPanel ? 'translateY(0)' : 'translateY(100%)',
            transition:'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
            zIndex:40,
          }}>
            {/* drag handle */}
            <div style={{ width:40, height:4, background: CARDBR, borderRadius:2, margin:'0 auto 14px' }} />
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
              <div>
                <div style={{ color: TXT, fontSize:18, fontWeight:800 }}>Plot #{selected.plotNo}</div>
                <div style={{ color: TXTSUB, fontSize:12, marginTop:2 }}>Block {selected.block}  •  {selected.facing} Facing</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{
                  padding:'4px 14px', borderRadius:20, fontSize:12, fontWeight:700,
                  background: STATUS_DARK[selected.status], color: STATUS_LABEL[selected.status],
                }}>{selected.status}</span>
                <button onClick={() => { setSelected(null); setShowPanel(false); }} style={{
                  width:30, height:30, borderRadius:'50%',
                  background: CARD, border:`1px solid ${CARDBR}`,
                  color: TXTSUB, cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}><LuX size={14}/></button>
              </div>
            </div>
            {/* Stats grid */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:10 }}>
              {[['Area',`${selected.area} Sq.Yds`],['Est. Price',`₹${selected.price}`],['Price/Sq.Yd',`₹${selected.pricePerSqYd}`]].map(([l,v])=>(
                <div key={l} style={{ background: CARD, borderRadius:8, padding:'10px 12px', border:`1px solid ${CARDBR}` }}>
                  <div style={{ fontSize:10, color: TXTSUB, textTransform:'uppercase', letterSpacing:0.5, marginBottom:4 }}>{l}</div>
                  <div style={{ fontSize:13, fontWeight:700, color: TXT }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Boundary side dimensions */}
            <div style={{ marginBottom:10 }}>
              <div style={{ fontSize:11, color: TXTSUB, textTransform:'uppercase', letterSpacing:0.5, marginBottom:8, fontWeight:600 }}>Boundary Dimensions</div>
              <div style={{ display:'flex', gap:8, alignItems:'stretch' }}>
                {/* visual boundary box */}
                <div style={{
                  position:'relative', width:110, flexShrink:0, height:80,
                  border:`2px solid ${night?'rgba(255,255,255,0.3)':'rgba(0,0,0,0.25)'}`,
                  borderRadius:4,
                  background: night?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.03)',
                }}>
                  <div style={{ position:'absolute', top:-11, left:0, right:0, textAlign:'center' }}>
                    <span style={{ fontSize:10, fontWeight:700, color: selected.facing==='North'?'#fbbf24':TXT }}>N: {selected.sides.N} ft</span>
                  </div>
                  <div style={{ position:'absolute', bottom:-11, left:0, right:0, textAlign:'center' }}>
                    <span style={{ fontSize:10, fontWeight:700, color: selected.facing==='South'?'#fbbf24':TXT }}>S: {selected.sides.S} ft</span>
                  </div>
                  <div style={{ position:'absolute', left:-30, top:0, bottom:0, display:'flex', alignItems:'center' }}>
                    <span style={{ fontSize:10, fontWeight:700, color: selected.facing==='West'?'#fbbf24':TXT, whiteSpace:'nowrap' }}>W: {selected.sides.W} ft</span>
                  </div>
                  <div style={{ position:'absolute', right:-30, top:0, bottom:0, display:'flex', alignItems:'center' }}>
                    <span style={{ fontSize:10, fontWeight:700, color: selected.facing==='East'?'#fbbf24':TXT, whiteSpace:'nowrap' }}>E: {selected.sides.E} ft</span>
                  </div>
                  <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontSize:9, color:'#fbbf24', fontWeight:700 }}>{selected.facing}</span>
                  </div>
                </div>
                {/* side list */}
                <div style={{ flex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
                  {[['North','N'],['South','S'],['East','E'],['West','W']].map(([dir, key]) => (
                    <div key={dir} style={{
                      background: CARD, borderRadius:6, padding:'6px 10px',
                      border:`1px solid ${selected.facing===dir ? '#fbbf2466' : CARDBR}`,
                    }}>
                      <div style={{ fontSize:9, color: selected.facing===dir?'#fbbf24':TXTSUB, fontWeight:600, marginBottom:2 }}>{dir}{selected.facing===dir?' ★':''}</div>
                      <div style={{ fontSize:13, fontWeight:700, color: TXT }}>{selected.sides[key]} ft</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Distance indicators */}
            <div style={{ display:'flex', gap:8, marginBottom:10 }}>
              {[
                { Icon:LuCar,      label:'Main Road', val:`${selected.distToRoad}m` },
                { Icon:LuDoorOpen, label:'Gate',      val:`${selected.distToGate}m` },
                { Icon:LuRuler,    label:'Dims',      val:`${selected.dims.w} × ${selected.dims.d}` },
              ].map(({Icon,label,val})=>(
                <div key={label} style={{ flex:1, background: night?'#0f1923':'#f1f5f9', borderRadius:8, padding:'8px 10px', border:`1px solid ${CARDBR}`, textAlign:'center' }}>
                  <Icon size={16} color='#6ee7b7' style={{ margin:'0 auto 4px' }} />
                  <div style={{ fontSize:12, fontWeight:700, color: TXT }}>{val}</div>
                  <div style={{ fontSize:10, color: TXTSUB }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Nearby highlights — commented out
            <div style={{ display:'flex', gap:6, overflowX:'auto', marginBottom:12, paddingBottom:2 }}>
              {NEARBY.map(n=>(
                <div key={n.label} style={{ flexShrink:0, background: night?'#0f1923':'#f1f5f9', border:`1px solid ${CARDBR}`, borderRadius:8, padding:'6px 10px', display:'flex', alignItems:'center', gap:6 }}>
                  <n.Icon size={14} color={n.color} />
                  <div>
                    <div style={{ fontSize:11, color: TXT, fontWeight:600 }}>{n.label}</div>
                    <div style={{ fontSize:10, color: TXTSUB }}>{n.dist}</div>
                  </div>
                </div>
              ))}
            </div>
            */}

            {/* CTA Buttons */}
            <div style={{ display:'grid', gridTemplateColumns: CROSSED_STATUS.has(selected.status) ? '1fr 1fr' : '1fr 1fr 1fr', gap:8 }}>
              <button style={{ padding:'10px', borderRadius:10, background:'#22c55e', border:'none', color:'white', fontWeight:700, fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                <LuClipboardList size={14}/> View Details
              </button>
              {!CROSSED_STATUS.has(selected.status) && (
                <button style={{ padding:'10px', borderRadius:10, background:'#3b82f6', border:'none', color:'white', fontWeight:700, fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                  <LuBookmark size={14}/> Book Now
                </button>
              )}
              <button style={{ padding:'10px', borderRadius:10, background:'#1e293b', border:`1px solid ${CARDBR}`, color: TXTSUB, fontWeight:700, fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                <LuPhone size={14}/> Contact
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── BELOW MAP: Status filter chips ── */}
      <div style={{ background: FILTBG, padding:'12px 16px', display:'flex', gap:8, overflowX:'auto', borderTop:`1px solid ${CARDBR}`, transition:'background 0.3s' }}>
        <button onClick={() => setFilter('All')} style={{
          ...chipStyle,
          background: filter==='All' ? '#1F6F54' : CHIPBG,
          color: filter==='All' ? 'white' : CHIPTXT,
          border: `1px solid ${filter==='All' ? '#1F6F54' : CHIPBR}`,
        }}><LuMap size={12} style={{marginRight:4}}/> All ({plots.length})</button>
        {Object.entries(STATUS_COLORS).map(([s,c]) => (
          <button key={s} onClick={() => setFilter(filter===s?'All':s)} style={{
            ...chipStyle,
            background: filter===s ? c : CHIPBG,
            color: filter===s ? 'white' : CHIPTXT,
            border: `1px solid ${filter===s ? c : CHIPBR}`,
          }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background: filter===s?'white':c, display:'inline-block', marginRight:6 }} />
            {s} ({counts[s]||0})
          </button>
        ))}
      </div>

      {/* ── BELOW MAP: Stats row ── */}
      <div style={{ background: STATSBG, padding:'14px 20px', display:'flex', gap:0, borderTop:`1px solid ${CARDBR}`, borderRadius:'0 0 16px 16px', transition:'background 0.3s' }}>
        {[['Total Plots',plots.length,'#6ee7b7'],['Available',counts.Available||0,'#22c55e'],['Sold',counts.Sold||0,'#ef4444'],['Reserved',counts.Reserved||0,'#f59e0b'],['Booked',counts.Booked||0,'#3b82f6'],['Mortgage',counts.Mortgage||0,'#8b5cf6']].map(([l,v,c],i,arr)=>(
          <div key={l} style={{ flex:1, textAlign:'center', borderRight: i<arr.length-1?`1px solid ${CARDBR}`:'none', padding:'0 6px' }}>
            <div style={{ fontSize:18, fontWeight:800, color:c }}>{v}</div>
            <div style={{ fontSize:10, color: TXTSUB, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const chipStyle = {
  padding:'7px 14px', borderRadius:20, fontSize:12, fontWeight:600,
  cursor:'pointer', whiteSpace:'nowrap', display:'flex', alignItems:'center',
  transition:'all 0.2s',
};
