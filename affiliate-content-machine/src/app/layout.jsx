import "./globals.css";

export const metadata = {
  title: "Affiliate Content Machine",
  description: "Generate a full content campaign from any affiliate product link in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
