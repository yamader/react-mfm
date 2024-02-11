"use client"

import { type MfmMention } from "mfm-js"
import { useMfmConfigValue } from ".."

export type MentionProps = MfmMention["props"]

const SimpleMention = ({ username, host, acct }: MentionProps) => (
  <a className="mfm-mention" href={`${host ? "https://" + host : ""}/@${username}`} rel="nofollow noopener">
    {acct}
  </a>
)

export default function Mention(props: MentionProps) {
  const { Mention } = useMfmConfigValue()
  return (Mention ?? SimpleMention)(props)
}
