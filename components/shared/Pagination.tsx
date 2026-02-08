import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 ${
          currentPage === 1
            ? 'bg-[#1A1A1A] text-[#808080] cursor-not-allowed border border-[#333333]/50'
            : 'bg-[#1A1A1A] text-white hover:bg-[#E31837] border border-[#333333]/50 hover:border-[#E31837]'
        }`}
        aria-label="Previous page"
      >
        <FiChevronLeft className="text-xl" />
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <div
              key={`ellipsis-${index}`}
              className="w-11 h-11 flex items-center justify-center text-[#808080]"
            >
              ...
            </div>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-11 h-11 flex items-center justify-center rounded-xl font-medium transition-all duration-300 ${
              currentPage === page
                ? 'bg-gradient-to-r from-[#E31837] to-[#E31837] text-white shadow-lg'
                : 'bg-[#1A1A1A] text-[#B3B3B3] hover:bg-[#252525] hover:text-white border border-[#333333]/50'
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300 ${
          currentPage === totalPages
            ? 'bg-[#1A1A1A] text-[#808080] cursor-not-allowed border border-[#333333]/50'
            : 'bg-[#1A1A1A] text-white hover:bg-[#E31837] border border-[#333333]/50 hover:border-[#E31837]'
        }`}
        aria-label="Next page"
      >
        <FiChevronRight className="text-xl" />
      </button>
    </div>
  );
}



