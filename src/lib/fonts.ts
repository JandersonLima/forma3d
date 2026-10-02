import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });

/** Classes do <html> que definem --font-inter e --font-grotesk (pontes em globals.css). */
export const fontVariables = `${inter.variable} ${display.variable}`;
