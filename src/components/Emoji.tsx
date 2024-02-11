import twemoji from "@twemoji/api"
import { type MfmUnicodeEmoji } from "mfm-js"
import { memo } from "react"

// 意味のない最適化だよ

function Emoji({ emoji }: MfmUnicodeEmoji["props"]) {
  const html = twemoji.parse(emoji)
  const res = html.match(/(?<=<).+(?=\/>)/)?.[0].match(/(?<= )[^ >]+/g) ?? []
  const attrs = Object.fromEntries(
    res.map(s => {
      const [key, val] = s.split("=")
      return [key, val.slice(1, -1)]
    }),
  )
  delete attrs.class
  return <img className="mfm-emoji" {...attrs} />
}

export default memo(Emoji)
