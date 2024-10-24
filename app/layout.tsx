import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex items-center justify-center min-h-screen bg-[#e9ecf0]">
          {children}
        </div>
      </body>
    </html>
  );
}