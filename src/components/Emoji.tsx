"use client"

import { type MfmUnicodeEmoji } from "mfm-js"
import Twemoji from "./Twemoji"

export default function Emoji({ emoji }: MfmUnicodeEmoji["props"]) {
  return <Twemoji code={emoji} />
}
