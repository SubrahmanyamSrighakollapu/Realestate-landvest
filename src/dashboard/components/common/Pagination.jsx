import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalItems, 
  itemsPerPage = 10, 
  onPageChange,
  onItemsPerPageChange,
  showResultsText = true 
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (start > 1) pages.unshift('...');
    if (end < totalPages) pages.push('...');

    return pages;
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '16px',
      fontSize: '14px',
      color: 'var(--dashboard-text-light)',
      flexWrap: 'wrap',
      gap: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {showResultsText && (
          <span>Showing {totalItems === 0 ? 0 : startItem} to {endItem} of {totalItems} results</span>
        )}
        {onItemsPerPageChange && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ whiteSpace: 'nowrap' }}>Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                onItemsPerPageChange(Number(e.target.value));
                onPageChange(1);
              }}
              style={{
                padding: '6px 10px',
                border: '1px solid var(--dashboard-border)',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                outline: 'none',
                backgroundColor: 'var(--dashboard-white)'
              }}
            >
              {[10, 20, 30, 50].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          style={{
            padding: '8px 12px',
            border: '1px solid var(--dashboard-border)',
            borderRadius: '6px',
            background: 'var(--dashboard-white)',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            opacity: currentPage === 1 ? 0.5 : 1,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ChevronLeft size={16} />
        </button>

        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            style={{
              padding: '8px 12px',
              border: '1px solid var(--dashboard-border)',
              borderRadius: '6px',
              background: page === currentPage ? 'var(--dashboard-primary)' : 'var(--dashboard-white)',
              color: page === currentPage ? 'var(--dashboard-white)' : 'var(--dashboard-text)',
              fontWeight: page === currentPage ? '600' : 'normal',
              minWidth: '36px',
              cursor: typeof page === 'number' ? 'pointer' : 'default'
            }}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          style={{
            padding: '8px 12px',
            border: '1px solid var(--dashboard-border)',
            borderRadius: '6px',
            background: 'var(--dashboard-white)',
            cursor: currentPage === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer',
            opacity: currentPage === totalPages || totalPages === 0 ? 0.5 : 1,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
