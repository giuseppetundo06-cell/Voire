import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Voire — L'università online che ti sceglie",
  description: "Lauree d'élite in Architettura, Automotive Design e Gioielleria. Riconosciuta MIUR.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          defer
        />
      </head>
      <body className="min-h-full flex flex-col bg-noir">
        {children}
      </body>
    </html>
  )
}