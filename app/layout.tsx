import "./globals.css"

export const metadata = {
  title: "Weather App",
  description: "Simple and beautiful weather application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body>
        <main className="min-h-screen bg-slate-900">
          {children}
        </main>
      </body>
    </html>
  )
}
