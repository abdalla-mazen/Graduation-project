"use client";

import type { PaginationProps } from "@/lib/types/pagination";
import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useEffect, useState } from "react";

type Props = PaginationProps & {
  currentPage: number;
};

export default function PaginationComponent({
  totalPages,
  initialPage,
  currentPage,
}: Props) {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [internalPage, setInternalPage] = useState(initialPage);

  useEffect(() => {
    setInternalPage(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setInternalPage(page);

      // Create new search params with updated page
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());

      // Navigate to new page
      router.push(`?${params.toString()}`);
    }
  };

  const getPageNumber = () => {
    const pages: (number | string)[] = [];
    const startPage = Math.max(internalPage - 2, 1);
    const endPage = Math.min(internalPage + 2, totalPages);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) pages.push(i);

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const formatNumber = (num: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(num);

  const pages = getPageNumber();

  return (
    <div className="flex justify-center items-center mt-6">
      <Pagination>
        <PaginationContent className="flex items-center gap-1 w-80 h-8">
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(1)}
              disabled={internalPage === 1}
              className={cn("...", internalPage === 1 && "opacity-50")}
            >
              <ChevronsLeft className="w-4 h-4 rtl:rotate-180" />
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(internalPage - 1)}
              disabled={internalPage === 1}
              className={cn("...", internalPage === 1 && "opacity-50")}
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </PaginationLink>
          </PaginationItem>

          {pages.map((page, i) =>
            typeof page === "number" ? (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={page === internalPage}
                  className={cn(
                    "gap-2 bg-white dark:bg-zinc-700 p-2 border-[1px] rounded-lg w-8 h-8 text-xs",
                    page === internalPage &&
                      "text-white bg-maroon-600 border-maroon-600"
                  )}
                >
                  {formatNumber(page)}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={i}>
                <div className="flex justify-center items-center bg-white dark:bg-zinc-700 border rounded-lg w-8 h-8 text-zinc-400 text-xs select-none">
                  …
                </div>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(internalPage + 1)}
              disabled={internalPage === totalPages}
              className={cn("...", internalPage === totalPages && "opacity-50")}
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(totalPages)}
              disabled={internalPage === totalPages}
              className={cn("...", internalPage === totalPages && "opacity-50")}
            >
              <ChevronsRight className="w-4 h-4 rtl:rotate-180" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
