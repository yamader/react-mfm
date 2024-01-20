import Link from "next/link"
import { ReactNode } from "react"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main style={{ maxWidth: "32rem", margin: "auto" }}>
      <header style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <Link href="/" passHref>
          <h1>react-mfm demo</h1>
        </Link>
        <nav>
          <Link href="/rsc">RSC demo</Link>
        </nav>
      </header>
      {children}
    </main>
  )
}
