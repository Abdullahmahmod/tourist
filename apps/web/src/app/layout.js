import "./globals.css";

export const metadata = {
  title: "Luxor Balloon Hub",
  description:
    "Starter platform for multi-tenant hot air balloon booking and ticketing in Luxor.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  );
}
