import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });



export const metadata = {
  title: "CuePlay",
  description: "Movie Steaming",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="data-scroll-container">
      <body 
        className={`${josefin.className} antialiased `}
      >
      <ErrorBoundary>
   {children}
      </ErrorBoundary>
      </body>
    
    </html>
  );
}
