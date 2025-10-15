"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-dvh w-full">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  );
}
