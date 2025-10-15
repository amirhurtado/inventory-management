'use client'

import { ThemeProvider } from "@/components/theme/theme-provider";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "./stack/client"; 

import React, { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'sonner';

const Providers = ({children} : {children : React.ReactNode}) => {
    const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
     
        <Toaster richColors position="top-center" theme="dark" />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StackProvider app={stackClientApp} lang="es-419">
            <StackTheme>{children}</StackTheme>
          </StackProvider>
        </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Providers;