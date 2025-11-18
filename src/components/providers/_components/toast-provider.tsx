"use client";

import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Toaster
      toastOptions={{
        position: "bottom-right",
      }}
    />
  );
}
