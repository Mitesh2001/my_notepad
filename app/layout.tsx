import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          {children}
        </div>
      </body>
    </html>
  );
}