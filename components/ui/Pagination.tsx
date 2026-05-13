"use client";

import { useCallback } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  perPage?: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];

  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  perPage = 10,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);

  const rangeStart = (currentPage - 1) * perPage + 1;
  const rangeEnd = totalItems
    ? Math.min(currentPage * perPage, totalItems)
    : currentPage * perPage;

  const handlePage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage || isLoading)
        return;
      onPageChange(page);
    },
    [currentPage, totalPages, isLoading, onPageChange],
  );

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 py-3">
      {/* Info text */}
      <p className="text-sm text-green-700 dark:text-green-400 shrink-0">
        {totalItems != null ? (
          <>
            Showing{" "}
            <span className="font-medium text-green-900 dark:text-green-200">
              {rangeStart}–{rangeEnd}
            </span>{" "}
            of{" "}
            <span className="font-medium text-green-900 dark:text-green-200">
              {totalItems}
            </span>{" "}
            results
          </>
        ) : (
          <>
            Page{" "}
            <span className="font-medium text-green-900 dark:text-green-200">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-medium text-green-900 dark:text-green-200">
              {totalPages}
            </span>
          </>
        )}
      </p>

      {/* Buttons */}
      <nav
        aria-label="Pagination"
        className="flex items-center gap-1 flex-wrap justify-center"
      >
        {/* Prev */}
        <button
          onClick={() => handlePage(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          aria-label="Previous page"
          className={[
            "h-9 w-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors",
            "border-green-200 dark:border-green-800",
            currentPage === 1 || isLoading
              ? "opacity-40 cursor-not-allowed text-green-400 dark:text-green-600"
              : "text-green-800 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/40 cursor-pointer",
          ].join(" ")}
        >
          ‹
        </button>

        {pages.map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="h-9 w-9 flex items-center justify-center text-green-400 dark:text-green-600 text-sm select-none"
              aria-hidden
            >
              ···
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePage(page as number)}
              disabled={isLoading}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              className={[
                "h-9 min-w-[36px] px-2 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors",
                page === currentPage
                  ? "bg-green-700 dark:bg-green-700 border-green-700 dark:border-green-700 text-white cursor-default"
                  : [
                      "border-green-200 dark:border-green-800",
                      "text-green-800 dark:text-green-300",
                      isLoading
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-green-50 dark:hover:bg-green-900/40 cursor-pointer",
                    ].join(" "),
              ].join(" ")}
            >
              {page}
            </button>
          ),
        )}

        {/* Next */}
        <button
          onClick={() => handlePage(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          aria-label="Next page"
          className={[
            "h-9 w-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors",
            "border-green-200 dark:border-green-800",
            currentPage === totalPages || isLoading
              ? "opacity-40 cursor-not-allowed text-green-400 dark:text-green-600"
              : "text-green-800 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/40 cursor-pointer",
          ].join(" ")}
        >
          ›
        </button>
      </nav>
    </div>
  );
}
