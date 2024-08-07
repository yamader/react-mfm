import { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactNode } from "react"

import "katex/dist/katex.min.css"
import "react-mfm/style.css"
import "~/style.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "react-mfm demo",
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ background: "snow" }}>
        {children}
      </body>
    </html>
  )
}
