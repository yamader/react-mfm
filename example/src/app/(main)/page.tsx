"use client"

import { useEffect, useState } from "react"
import Mfm, { useMfmConfig } from "react-mfm"
import Auth from "~/components/Auth"
import CustomEmoji from "~/components/CustomEmoji"
import { basePath } from "~/consts"

const usage = `
\`\`\`tsx
import Mfm from "react-mfm"
import "react-mfm/style.css"

const text = \`
  <center>
    **hello, world**
  </center>
\`.trim()

export default function Page() {
  return <Mfm text={text} />
}
\`\`\`
`.trim()

const example = String.raw`
react-mfm [search]
hi @user@example.org ! #React #MFM
<center>
  **hello, world!**
  $[x2 🐔🍹🍣🍦]
  https://example.com:3000/hoge
</center>
\[
  (v\cdot\nabla)v
\]
`.trim()

export default function IndexPage() {
  const [text, setText] = useState(example)
  const [mfmConfig, setMfmConfig] = useMfmConfig()

  useEffect(() => {
    // どこ置けばええんやろ(Client Componentに置く必要有)
    setMfmConfig({ ...mfmConfig, assetsBase: basePath, CustomEmoji })
  }, [])

  return (
    <>
      <h2>Usage of react-mfm</h2>
      <div className="box">
        <Mfm text={usage} />
      </div>
      <h2 style={{ display: "flex", alignItems: "baseline" }}>
        Live Editor
        <button onClick={() => setText(example)} style={{ marginLeft: "auto" }}>
          Reset
        </button>
      </h2>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
        }}>
        <Auth />
        <textarea
          placeholder="**try MFM here**"
          value={text}
          onChange={e => setText(e.target.value)}
          style={{
            width: "100%",
            minHeight: "16em",
            padding: ".4rem",
            resize: "none",
            border: "1px solid gray",
            borderRadius: ".4em",
          }}
        />
        <div className="box">
          <Mfm text={text} />
        </div>
      </section>
    </>
  )
}
