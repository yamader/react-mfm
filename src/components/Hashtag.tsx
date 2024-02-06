"use client"

import { type MfmHashtag } from "mfm-js"
import { useMfmConfigValue } from ".."

export type HashtagProps = MfmHashtag["props"]

function SimpleHashtag({ hashtag }: HashtagProps) {
  return (
    <a className="mfm_hashtag" href={"/tags/" + hashtag} rel="nofollow noopener">
      #{hashtag}
    </a>
  )
}

export default function Hashtag(props: HashtagProps) {
  const { Hashtag } = useMfmConfigValue()
  return (Hashtag ?? SimpleHashtag)(props)
}
