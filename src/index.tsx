import { atom, useAtom, useAtomValue } from "jotai"
import { parse, parseSimple, type MfmNode } from "mfm-js"
import { type FC } from "react"
import Node from "./Node"
import { type CustomEmojiProps } from "./components/CustomEmoji"
import { type HashtagProps } from "./components/Hashtag"
import { type LinkProps } from "./components/Link"
import { type MentionProps } from "./components/Mention"

////////////////////////////////////////////////////////////////

// for internal use
export type MfmBasicProps = {
  plain?: boolean
  nowrap?: boolean
  nyaize?: boolean | "respect"
}

const MfmBase =
  (parser: (input: string) => MfmNode[]) =>
  ({ text, ...props }: MfmBasicProps & { text: string }) => <Node nodes={parser(text)} {...props} />

export const Mfm = MfmBase(parse)
export const MfmSimple = MfmBase(parseSimple)

export default Mfm

////////////////////////////////////////////////////////////////

export { CustomEmojiProps, HashtagProps, MentionProps }

export type MfmConfig = Partial<{
  // mfm
  advanced: boolean // default: true
  animation: boolean // default: true

  // components
  CustomEmoji: FC<CustomEmojiProps>
  Hashtag: FC<HashtagProps>
  Link: FC<LinkProps>
  Mention: FC<MentionProps>
}>

export const mfmConfigAtom = atom<MfmConfig>({})
export const useMfmConfig = () => useAtom(mfmConfigAtom)
export const useMfmConfigValue = () => useAtomValue(mfmConfigAtom)
