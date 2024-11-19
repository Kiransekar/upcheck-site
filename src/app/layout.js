import localFont from "next/font/local";
import "./globals.css";

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

export const metadata = {
  title: "Upcheck",
  description: "Official website of Upcheck India\nUpCheck is an innovative aquaculture monitoring and assisting solution designed to optimize shrimp farming. Our platform leverages real-time data and advanced analytics to enhance pond management, predict growth patterns, inventory management, peer and market networks and ensure sustainable practices. Discover how UpCheck is transforming aquaculture with smart, data-driven real-time solutions and start Upchecking now",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
