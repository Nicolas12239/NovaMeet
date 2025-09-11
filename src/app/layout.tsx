import "./globals.css"
import { Providers } from "@/components/providers"
import Navigation from "@/components/Navigation"

export const metadata = {
  title: "NovaMeet+",
  description: "Adult dating platform with privacy and moderation"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navigation />
          <main className="pt-16">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
