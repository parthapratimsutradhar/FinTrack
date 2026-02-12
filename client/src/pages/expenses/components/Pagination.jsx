import React from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  pageSize, 
  totalItems,
  onPageChange, 
  onPageSizeChange 
}) => {
  const pageSizeOptions = [
    { value: '10', label: '10 per page' },
    { value: '25', label: '25 per page' },
    { value: '50', label: '50 per page' },
    { value: '100', label: '100 per page' }
  ];

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages?.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages?.push(i);
        }
        pages?.push('...');
        pages?.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages?.push(1);
        pages?.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages?.push(i);
        }
      } else {
        pages?.push(1);
        pages?.push('...');
        pages?.push(currentPage - 1);
        pages?.push(currentPage);
        pages?.push(currentPage + 1);
        pages?.push('...');
        pages?.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-financial-sm p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Select
            options={pageSizeOptions}
            value={pageSize?.toString()}
            onChange={(value) => onPageSizeChange(parseInt(value))}
            className="w-40"
          />
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Showing {startItem}-{endItem} of {totalItems}
          </span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            className="w-9 h-9 p-0"
            aria-label="Previous page"
          />

          <div className="hidden sm:flex items-center gap-1">
            {getPageNumbers()?.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-1.5 text-sm text-muted-foreground">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => onPageChange(page)}
                    className={`
                      min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-smooth
                      focus:outline-none focus:ring-2 focus:ring-primary
                      ${currentPage === page
                        ? 'bg-primary text-primary-foreground shadow-financial-sm'
                        : 'text-card-foreground hover:bg-muted'
                      }
                    `}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="sm:hidden flex items-center gap-2">
            <span className="text-sm font-medium text-card-foreground">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            className="w-9 h-9 p-0"
            aria-label="Next page"
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;