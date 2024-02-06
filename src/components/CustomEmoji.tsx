"use client"

import { type MfmEmojiCode } from "mfm-js"
import { useMfmConfigValue } from ".."

export type CustomEmojiProps = MfmEmojiCode["props"]

function DummyCustomEmoji({ name }: CustomEmojiProps) {
  return `:${name}:`
}

export default function CustomEmoji(props: CustomEmojiProps) {
  const { CustomEmoji } = useMfmConfigValue()
  return (CustomEmoji ?? DummyCustomEmoji)(props)
}
