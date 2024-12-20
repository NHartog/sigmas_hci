import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/app/theme';
import Header from "@/Component/Header";
import { Box } from "@mui/material";
import {usePathname} from "next/navigation";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "SIGMAS",
    description: "Better TAAS system",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ height: '100vh' }}>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <Header  />
                        <Box sx={{ width: '100vw', height: 'calc(100% - 64px)' }}>
                            {children}
                        </Box>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
