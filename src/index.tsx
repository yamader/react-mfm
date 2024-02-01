import { atom, useAtom } from "jotai"
import { MfmNode, parse, parseSimple } from "mfm-js"
import Node from "./Node"
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

  // system
  assetsBase?: string
}

const mfmConfigAtom = atom<MfmConfig>({
  advanced: true,
  animation: true,
})
const useMfmConfig = () => useAtom(mfmConfigAtom)

export { Mfm, MfmBasicProps, MfmConfig, MfmSimple, Mfm as default, mfmConfigAtom, useMfmConfig }
