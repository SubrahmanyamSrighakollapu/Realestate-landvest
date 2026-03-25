import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Stage, Layer, Rect, Text, Group, Arrow, Circle } from 'react-konva';

const STATUS_COLORS  = { Available: '#22c55e', Sold: '#ef4444', Reserved: '#f59e0b', Booked: '#3b82f6' };
const STATUS_DARK    = { Available: '#15803d', Sold: '#b91c1c', Reserved: '#b45309', Booked: '#1d4ed8' };
const STATUS_LABEL   = { Available: '#bbf7d0', Sold: '#fecaca', Reserved: '#fde68a', Booked: '#bfdbfe' };

// Real estate: 1 Sq.Yd ≈ 0.84 m². Typical plot frontage (width) ~9 yds, depth varies.
// We fix canvas width per plot and scale height proportionally to area.
const PLOT_W = 56;   // fixed canvas width per plot (frontage)
const BASE_AREA = 120; // reference area → BASE_H height
const BASE_H    = 48;  // canvas height for 120 Sq.Yds
const GAP = 3, RW = 44, COLS = 6;

// Returns canvas height for a given area, proportional to BASE
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

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildPlots(total) {
  const count   = Math.min(total || 72, 120);
  const facings = ['East','West','North','South'];
  const areas   = [100, 120, 140, 150, 160, 180];
  const plots   = [];
  const half    = Math.ceil(count / 2);

  const pool = shuffle([
    ...Array(Math.ceil(count * 0.5)).fill('Available'),
    ...Array(Math.ceil(count * 0.2)).fill('Sold'),
    ...Array(Math.ceil(count * 0.15)).fill('Reserved'),
    ...Array(Math.ceil(count * 0.15)).fill('Booked'),
  ].slice(0, count));

  // Assign a shuffled area to each plot so sizes are mixed
  const areaPool = shuffle(
    Array.from({ length: count }, (_, i) => areas[i % areas.length])
  );

  // Build block plots with variable height; track row max-heights for Y positioning
  function buildBlock(startIdx, endIdx, blockLabel, startY) {
    const blockPlots = [];
    let rowY = startY;
    for (let i = startIdx; i < endIdx; i++) {
      const col = (i - startIdx) % COLS;
      if (col === 0 && i > startIdx) {
        // advance Y by max height of previous row
        const prevRowStart = i - COLS;
        const maxH = Math.max(...blockPlots.slice(prevRowStart - startIdx, i - startIdx).map(p => p.h));
        rowY += maxH + GAP;
      }
      const area = areaPool[i];
      const h    = plotH(area);
      blockPlots.push({
        id: i + 1, plotNo: String(i + 1),
        x: RW + col * (PLOT_W + GAP),
        y: rowY,
        w: PLOT_W, h,
        block: blockLabel,
        status: pool[i],
        facing: facings[i % 4],
        area,
        dims: PLOT_DIMS[area] || { w: '9\'0"', d: '13\'4"' },
        price: (area * 1500).toLocaleString('en-IN'),
      });
    }
    return blockPlots;
  }

  const blockA = buildBlock(0, half, 'A', RW);
  const maxYA  = Math.max(...blockA.map(p => p.y + p.h));
  const midRoadY = maxYA + GAP;
  const blockB = buildBlock(half, count, 'B', midRoadY + RW);
  const maxYB  = Math.max(...blockB.map(p => p.y + p.h));

  plots.push(...blockA, ...blockB);

  const canvasW = RW + COLS * (PLOT_W + GAP) + RW;
  const canvasH = maxYB + RW;
  return { plots, midRoadY, canvasW, canvasH };
}

export default function PlotLayout({ project }) {
  const wrapRef = useRef(null);
  const [size, setSize]       = useState({ w: 800, h: 580 });
  const [scale, setScale]     = useState(1);
  const [pos, setPos]         = useState({ x: 30, y: 30 });
  const [hover, setHover]     = useState(null);
  const [hPos, setHPos]       = useState({ x:0, y:0 });
  const [selected, setSelected] = useState(null);
  const [filter, setFilter]   = useState('All');
  const [showPanel, setShowPanel] = useState(false);

  const { plots, midRoadY, canvasW, canvasH } = useMemo(() => buildPlots(project?.totalPlots), [project?.totalPlots]);
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

  const handleSelect = (p) => {
    if (selected?.id === p.id) { setSelected(null); setShowPanel(false); }
    else { setSelected(p); setShowPanel(true); }
  };

  const reset = () => { setScale(1); setPos({ x:30, y:30 }); };

  // Road color — dark asphalt like Google Maps
  const ROAD  = '#334155';
  const ROAD2 = '#1e293b';
  const GRASS = '#1a3a2a';

  return (
    <div style={{ position:'relative', fontFamily:'system-ui,sans-serif', borderRadius:16, overflow:'hidden', boxShadow:'0 8px 40px rgba(0,0,0,0.35)' }}>

      {/* ── MAP CANVAS ── */}
      <div ref={wrapRef} style={{ position:'relative', background:'#0f1923' }}>
        <Stage
          width={size.w} height={size.h}
          x={pos.x} y={pos.y}
          scaleX={scale} scaleY={scale}
          draggable
          onWheel={onWheel}
          onDragEnd={e => setPos({ x:e.target.x(), y:e.target.y() })}
        >
          <Layer>
            {/* Satellite-style dark background */}
            <Rect x={-200} y={-200} width={canvasW+400} height={canvasH+400} fill={GRASS} />

            {/* Roads */}
            {/* Top */}
            <Rect x={0} y={0} width={canvasW} height={RW} fill={ROAD} />
            {/* Bottom */}
            <Rect x={0} y={canvasH-RW} width={canvasW} height={RW} fill={ROAD} />
            {/* Left */}
            <Rect x={0} y={0} width={RW} height={canvasH} fill={ROAD} />
            {/* Right */}
            <Rect x={canvasW-RW} y={0} width={RW} height={canvasH} fill={ROAD} />
            {/* Middle */}
            <Rect x={0} y={midRoadY} width={canvasW} height={RW} fill={ROAD2} />

            {/* Road center dashes */}
            {[...Array(8)].map((_,i) => (
              <Rect key={i} x={RW+i*((canvasW-2*RW)/8)} y={midRoadY+RW/2-2} width={(canvasW-2*RW)/16} height={4} fill="#64748b" cornerRadius={2} />
            ))}

            {/* Road labels */}
            <Text text="40' WIDE ROAD" x={canvasW/2-38} y={14} fontSize={9} fill="#94a3b8" fontStyle="bold" letterSpacing={1} />
            <Text text="40' WIDE ROAD" x={canvasW/2-38} y={canvasH-RW+14} fontSize={9} fill="#94a3b8" fontStyle="bold" letterSpacing={1} />
            <Text text="33' WIDE ROAD" x={canvasW/2-38} y={midRoadY+16} fontSize={9} fill="#94a3b8" fontStyle="bold" letterSpacing={1} />
            <Text text="33' ROAD" x={8} y={canvasH/2+28} fontSize={8} fill="#94a3b8" fontStyle="bold" rotation={-90} />
            <Text text="33' ROAD" x={canvasW-6} y={canvasH/2+28} fontSize={8} fill="#94a3b8" fontStyle="bold" rotation={-90} />

            {/* Block labels */}
            <Rect x={RW+4} y={RW+4} width={52} height={16} fill="rgba(0,0,0,0.5)" cornerRadius={4} />
            <Text text="BLOCK  A" x={RW+8} y={RW+8} fontSize={8} fill="#94a3b8" fontStyle="bold" letterSpacing={1} />
            <Rect x={RW+4} y={midRoadY+RW+4} width={52} height={16} fill="rgba(0,0,0,0.5)" cornerRadius={4} />
            <Text text="BLOCK  B" x={RW+8} y={midRoadY+RW+8} fontSize={8} fill="#94a3b8" fontStyle="bold" letterSpacing={1} />

            {/* Compass */}
            <Circle x={canvasW-RW+22} y={22} radius={18} fill="rgba(15,25,35,0.85)" stroke="#475569" strokeWidth={1} />
            <Text text="N" x={canvasW-RW+16} y={12} fontSize={11} fill="#f8fafc" fontStyle="bold" />
            <Arrow points={[canvasW-RW+22,30,canvasW-RW+22,20]} stroke="#ef4444" strokeWidth={2} fill="#ef4444" pointerLength={4} pointerWidth={4} />
            <Arrow points={[canvasW-RW+22,14,canvasW-RW+22,24]} stroke="#94a3b8" strokeWidth={2} fill="#94a3b8" pointerLength={4} pointerWidth={4} />

            {/* Plots */}
            {plots.map(p => {
              const isSel  = selected?.id === p.id;
              const dimmed = filter!=='All' && p.status!==filter;
              const c      = STATUS_COLORS[p.status];
              const cd     = STATUS_DARK[p.status];
              return (
                <Group key={p.id} x={p.x} y={p.y} listening={true}>
                  {/* Plot shadow — no mouse events */}
                  <Rect width={p.w} height={p.h} fill="rgba(0,0,0,0.4)" cornerRadius={4} x={2} y={2} listening={false} />
                  {/* Plot body — sole hit target */}
                  <Rect
                    width={p.w} height={p.h} fill={c}
                    stroke={isSel ? '#fff' : cd}
                    strokeWidth={isSel ? 2.5 : 1}
                    cornerRadius={4}
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
                  {/* Plot number — no mouse events */}
                  <Text text={p.plotNo} width={p.w} height={p.h}
                    align="center" verticalAlign="middle"
                    fontSize={10} fill="white" fontStyle="bold"
                    opacity={dimmed ? 0.2 : 1}
                    listening={false}
                  />
                  {/* Selected pin — no mouse events */}
                  {isSel && (
                    <Circle x={p.w/2} y={-8} radius={6} fill="#fff" stroke={c} strokeWidth={2} listening={false} />
                  )}
                </Group>
              );
            })}
          </Layer>
        </Stage>

        {/* ── FLOATING: Top-left project badge ── */}
        <div style={{
          position:'absolute', top:12, left:12,
          background:'rgba(15,25,35,0.88)',
          backdropFilter:'blur(8px)',
          borderRadius:10, padding:'8px 14px',
          border:'1px solid rgba(255,255,255,0.1)',
          pointerEvents:'none',
        }}>
          <div style={{ color:'#6ee7b7', fontSize:10, fontWeight:700, letterSpacing:1, textTransform:'uppercase' }}>Plot Map</div>
          <div style={{ color:'white', fontSize:13, fontWeight:700, marginTop:2 }}>{project?.title || 'Layout'}</div>
          <div style={{ color:'#94a3b8', fontSize:11, marginTop:1 }}>📍 {project?.location || '—'}</div>
        </div>

        {/* ── FLOATING: Zoom controls (Google Maps style) ── */}
        <div style={{
          position:'absolute', right:12, bottom: showPanel ? 220 : 60,
          display:'flex', flexDirection:'column', gap:2,
          transition:'bottom 0.35s ease',
        }}>
          {[['+', () => setScale(s=>Math.min(s*1.3,6))],['-', () => setScale(s=>Math.max(s/1.3,0.25))]].map(([l,fn]) => (
            <button key={l} onClick={fn} style={{
              width:40, height:40, borderRadius:8,
              background:'rgba(15,25,35,0.9)',
              border:'1px solid rgba(255,255,255,0.15)',
              color:'white', fontSize:20, fontWeight:300,
              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
              backdropFilter:'blur(8px)',
              boxShadow:'0 2px 8px rgba(0,0,0,0.4)',
            }}>{l}</button>
          ))}
          <button onClick={reset} style={{
            width:40, height:40, borderRadius:8, marginTop:4,
            background:'rgba(15,25,35,0.9)',
            border:'1px solid rgba(255,255,255,0.15)',
            color:'#6ee7b7', fontSize:16, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            backdropFilter:'blur(8px)',
            boxShadow:'0 2px 8px rgba(0,0,0,0.4)',
          }}>⟳</button>
        </div>

        {/* ── FLOATING: Scale indicator ── */}
        <div style={{
          position:'absolute', left:12, bottom:14,
          background:'rgba(15,25,35,0.75)',
          borderRadius:6, padding:'4px 10px',
          color:'#94a3b8', fontSize:11,
          border:'1px solid rgba(255,255,255,0.08)',
          pointerEvents:'none',
        }}>
          {Math.round(scale*100)}% zoom
        </div>

        {/* ── FLOATING: Hover tooltip (Google Maps popup style) ── */}
        {hover && !selected && (
          <div style={{
            position:'absolute',
            left: Math.min(hPos.x+16, size.w-200),
            top:  Math.max(hPos.y-130, 8),
            background:'rgba(15,25,35,0.95)',
            backdropFilter:'blur(12px)',
            border:`1px solid ${STATUS_COLORS[hover.status]}55`,
            borderRadius:10, padding:'10px 14px',
            pointerEvents:'none',
            boxShadow:`0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${STATUS_COLORS[hover.status]}33`,
            zIndex:30, minWidth:175,
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
              <span style={{ color:'white', fontWeight:700, fontSize:14 }}>Plot #{hover.plotNo}</span>
              <span style={{
                fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20,
                background: STATUS_DARK[hover.status],
                color: STATUS_LABEL[hover.status],
              }}>{hover.status}</span>
            </div>
            {[['Block',hover.block],['Area',`${hover.area} Sq.Yds`],['Dimensions',`${hover.dims.w} × ${hover.dims.d}`],['Facing',hover.facing],['Est. Price',`₹${hover.price}`]].map(([l,v])=>(
              <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:4 }}>
                <span style={{ color:'#64748b' }}>{l}</span>
                <span style={{ color:'#e2e8f0', fontWeight:600 }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop:8, fontSize:11, color:'#475569', textAlign:'center' }}>Click to pin details</div>
          </div>
        )}

        {/* ── FLOATING BOTTOM: Selected plot panel (Google Maps bottom sheet) ── */}
        {selected && (
          <div style={{
            position:'absolute', bottom:0, left:0, right:0,
            background:'rgba(15,25,35,0.97)',
            backdropFilter:'blur(16px)',
            borderTop:`2px solid ${STATUS_COLORS[selected.status]}`,
            borderRadius:'0 0 16px 16px',
            padding:'16px 20px',
            transform: showPanel ? 'translateY(0)' : 'translateY(100%)',
            transition:'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
            zIndex:40,
          }}>
            {/* drag handle */}
            <div style={{ width:40, height:4, background:'#334155', borderRadius:2, margin:'0 auto 14px' }} />
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
              <div>
                <div style={{ color:'white', fontSize:18, fontWeight:800 }}>Plot #{selected.plotNo}</div>
                <div style={{ color:'#64748b', fontSize:12, marginTop:2 }}>Block {selected.block} &nbsp;•&nbsp; {selected.facing} Facing</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{
                  padding:'4px 14px', borderRadius:20, fontSize:12, fontWeight:700,
                  background: STATUS_DARK[selected.status],
                  color: STATUS_LABEL[selected.status],
                }}>{selected.status}</span>
                <button onClick={() => { setSelected(null); setShowPanel(false); }} style={{
                  width:30, height:30, borderRadius:'50%',
                  background:'#1e293b', border:'1px solid #334155',
                  color:'#94a3b8', cursor:'pointer', fontSize:16,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>✕</button>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10 }}>
              {[['Area',`${selected.area} Sq.Yds`],['Dimensions',`${selected.dims.w} × ${selected.dims.d}`],['Est. Price',`₹${selected.price}`],['Facing',selected.facing],['Block',selected.block]].map(([l,v])=>(
                <div key={l} style={{ background:'#1e293b', borderRadius:8, padding:'10px 12px', border:'1px solid #334155' }}>
                  <div style={{ fontSize:10, color:'#475569', textTransform:'uppercase', letterSpacing:0.5, marginBottom:4 }}>{l}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:'#f1f5f9' }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── BELOW MAP: Status filter chips (Google Maps category pills) ── */}
      <div style={{ background:'#0f1923', padding:'12px 16px', display:'flex', gap:8, overflowX:'auto', borderTop:'1px solid #1e293b' }}>
        <button onClick={() => setFilter('All')} style={{
          ...chipStyle,
          background: filter==='All' ? '#1F6F54' : '#1e293b',
          color: filter==='All' ? 'white' : '#94a3b8',
          border: `1px solid ${filter==='All' ? '#1F6F54' : '#334155'}`,
        }}>All ({plots.length})</button>
        {Object.entries(STATUS_COLORS).map(([s,c]) => (
          <button key={s} onClick={() => setFilter(filter===s?'All':s)} style={{
            ...chipStyle,
            background: filter===s ? c : '#1e293b',
            color: filter===s ? 'white' : '#94a3b8',
            border: `1px solid ${filter===s ? c : '#334155'}`,
          }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background: filter===s?'white':c, display:'inline-block', marginRight:6 }} />
            {s} ({counts[s]||0})
          </button>
        ))}
      </div>

      {/* ── BELOW MAP: Stats row ── */}
      <div style={{ background:'#0a1118', padding:'14px 20px', display:'flex', gap:0, borderTop:'1px solid #1e293b', borderRadius:'0 0 16px 16px' }}>
        {[['Total Plots',plots.length,'#6ee7b7'],['Available',counts.Available||0,'#22c55e'],['Sold',counts.Sold||0,'#ef4444'],['Reserved',counts.Reserved||0,'#f59e0b'],['Booked',counts.Booked||0,'#3b82f6']].map(([l,v,c],i,arr)=>(
          <div key={l} style={{ flex:1, textAlign:'center', borderRight: i<arr.length-1?'1px solid #1e293b':'none', padding:'0 8px' }}>
            <div style={{ fontSize:20, fontWeight:800, color:c }}>{v}</div>
            <div style={{ fontSize:11, color:'#475569', marginTop:2 }}>{l}</div>
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
