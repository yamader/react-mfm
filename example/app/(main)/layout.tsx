import { ReactNode } from "react"

export default function MainLayout({ children }: { children: ReactNode }) {
  // next/linkは意図的に避けている
  return (
    <main style={{ maxWidth: "32rem", margin: "auto" }}>
      <header style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <a href="/">
          <h1>react-mfm demo</h1>
        </a>
        <nav>
          <a href="/rsc">RSC demo</a>
        </nav>
      </header>
      {children}
    </main>
  )
}
