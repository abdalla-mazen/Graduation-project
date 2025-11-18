"use client";

import { useWishlist } from "@/hooks/use-wishlist";
import { HeartPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

// Types
type HeartButtonProps = {
  _id: string;
};

export default function HeartButton({ _id }: HeartButtonProps) {
  // Translations
  const t = useTranslations();

  // Hooks
  const { isPending, addToWishList } = useWishlist();

  // Functions
  const handleAddToWishlist = () => {
    addToWishList(_id);
  };

  return (
    <button
      onClick={handleAddToWishlist}
      disabled={isPending}
      className="group relative flex items-center bg-white justify-center min-w-7 rounded-full p-1.5 text-center shadow-md hover:px-2.5 hover:shadow-lg transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* Heart Icon */}
      <HeartPlus
        size={18}
        className="text-maroon-600 transition-all duration-300 group-hover:me-1 text-center"
      />
      {/* Heart Text */}
      <span className="max-w-0 opacity-0 text-maroon-600 font-medium text-xs whitespace-nowrap transition-all duration-300 group-hover:max-w-xs group-hover:opacity-100 overflow-hidden first-letter:capitalize">
        {isPending ? t("loading") : t("add-wishlist")}{" "}
      </span>
    </button>
  );
}
