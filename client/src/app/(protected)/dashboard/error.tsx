"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <Alert variant="destructive" className="max-w-md">
        <Terminal className="h-5 w-5" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.message || "Ocurrió un error inesperado. Intenta de nuevo más tarde."}
        </AlertDescription>
      </Alert>

      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Reintentar
      </button>
    </div>
  );
}
