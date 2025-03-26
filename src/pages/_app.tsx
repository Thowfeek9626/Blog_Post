
import type { AppProps } from "next/app";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from "../components/Header"; 
import ReduxProvider from "../components/ReduxProvider";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={`${geistSans.variable} ${geistMono.variable}`} style={{ userSelect: "none" }}>
          <Header />
          {/* Added padding-top to prevent content from being hidden when header is fixed */}
          <div style={{ paddingTop: "64px" }}>  
            <Component {...pageProps} />
          </div>
        </div>
      </ThemeProvider>
    </ReduxProvider>
  );
}
