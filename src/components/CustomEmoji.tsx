"use client"

import { type MfmEmojiCode } from "mfm-js"
import { useMfmConfigValue } from ".."

export type CustomEmojiProps = MfmEmojiCode["props"]

const DummyCustomEmoji = ({ name }: CustomEmojiProps) => `:${name}:`

export default function CustomEmoji(props: CustomEmojiProps) {
  const { CustomEmoji } = useMfmConfigValue()
  return (CustomEmoji ?? DummyCustomEmoji)(props)
}
