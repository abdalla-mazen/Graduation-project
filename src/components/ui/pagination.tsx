import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("inline-flex", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  disabled,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    aria-disabled={disabled ? true : undefined}
    tabIndex={disabled ? -1 : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "default" : null,
        size,
      }),
      // compact override: remove large horizontal padding when needed
      "px-0  border border-zinc-200 rounded-xl",
      disabled && "opacity-50 pointer-events-none",
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

//revious
const PaginationPrevious = ({
  className,
  disabled,
  ...props
}: Omit<PaginationLinkProps, "isActive">) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="icon"
    disabled={disabled}
    className={cn("gap-1", className)}
    {...props}
  >
    <span className="inline-flex items-center gap-1 rounded-xl  p-2">
      <ChevronsLeft size={16} className="text-zinc-800" />
      <span className="sr-only">Previous page</span>
    </span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

// next
const PaginationNext = ({
  className,
  disabled,
  ...props
}: Omit<PaginationLinkProps, "isActive">) => (
  <PaginationLink
    aria-label="Go to next page"
    size="icon"
    disabled={disabled}
    className={cn("gap-1", className)}
    {...props}
  >
    <span className="inline-flex items-center gap-1 rounded-xl  p-2">
      <ChevronsRight size={16} className="text-zinc-800" />
      <span className="sr-only">Next page</span>
    </span>
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

//  Ellipsis right
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("inline-flex items-center justify-center", className)}
    {...props}
  >
    <span className="inline-flex items-center rounded-xl border p-2">
      <ChevronRight size={16} className="text-zinc-800" />
      <span className="sr-only">More pages</span>
    </span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

//  Ellipsis left
const PaginationEllipsisLeft = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("inline-flex items-center justify-center", className)}
    {...props}
  >
    <span className="inline-flex items-center rounded-xl border p-2">
      <ChevronLeft size={16} className="text-zinc-800" />
      <span className="sr-only">Previous pages</span>
    </span>
  </span>
);
PaginationEllipsisLeft.displayName = "PaginationEllipsisLeft";

// Page Number Button
type PageButtonProps = {
  page: number | string;
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  href?: string;
};

const PageButton = ({ page, isActive, onClick, href }: PageButtonProps) => {
  return (
    <PaginationLink
      href={href}
      isActive={isActive}
      size="icon"
      className="min-w-[28px] flex items-center justify-center rounded-xl  p-2"
      onClick={onClick}
    >
      <span
        className={cn(
          "text-sm rounded-xl border p-2",
          isActive ? "font-medium" : "font-normal"
        )}
      >
        {page}
      </span>
    </PaginationLink>
  );
};
PageButton.displayName = "PageButton";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationEllipsisLeft,
  PageButton,
};
