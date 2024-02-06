import Link from "next/link"
import { ReactNode } from "react"
import { version } from "~/consts"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main style={{ maxWidth: "32rem", margin: "auto" }}>
      <header style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between" }}>
        <Link href="/" passHref>
          <h1>
            react-mfm<small>@{version}</small> demo
          </h1>
        </Link>
        <nav>
          <Link href="/rsc">RSC demo</Link>
        </nav>
      </header>
      {children}
      <footer
        style={{
          padding: ".8rem 0",
          textAlign: "center",
          color: "dimgray",
          fontWeight: "bold",
        }}>
        <small>
          &copy; 2024{" "}
          <a href="https://yamad.me" target="_blank" className="natural">
            YamaD
          </a>
        </small>
      </footer>
    </main>
  )
}
