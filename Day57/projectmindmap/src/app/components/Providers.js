"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function Providers({ children }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return <>{children}</>;
    }
    return (
        <NextUIProvider>
            <NextThemesProvider
                attribute="class"
                defaultTheme="light"
                themes={["dark", "light", "system"]}
            >
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    );
}
