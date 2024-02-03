import { atom, useAtom, useAtomValue } from "jotai"
import { MfmNode, parse, parseSimple } from "mfm-js"
import { FC } from "react"
import Node from "./Node"
import { CustomEmojiProps } from "./components/CustomEmoji"
import { HashtagProps } from "./components/Hashtag"
import { MentionProps } from "./components/Mention"
import "./style.css"

type MfmBasicProps = {
  plain?: boolean
  nowrap?: boolean
  nyaize?: boolean | "respect"
}

const MfmBase =
  (parser: (input: string) => MfmNode[]) =>
  ({ text, ...props }: MfmBasicProps & { text: string }) => <Node nodes={parser(text)} {...props} />

const Mfm = MfmBase(parse)
const MfmSimple = MfmBase(parseSimple)

type MfmConfig = {
  // mfm
  advanced: boolean
  animation: boolean

  // components
  CustomEmoji?: FC<CustomEmojiProps>
  Hashtag?: FC<HashtagProps>
  Mention?: FC<MentionProps>

  // system
  assetsBase?: string
}

const mfmConfigAtom = atom<MfmConfig>({
  advanced: true,
  animation: true,
})
const useMfmConfig = () => useAtom(mfmConfigAtom)
const useMfmConfigValue = () => useAtomValue(mfmConfigAtom)

export { Mfm, MfmBasicProps, MfmConfig, MfmSimple, Mfm as default, mfmConfigAtom, useMfmConfig, useMfmConfigValue }
