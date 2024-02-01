import { atom, useAtom } from "jotai"
import { MfmNode, parse, parseSimple } from "mfm-js"
import Node from "./Node"
import "./style.css"

type MfmBasicProps = {
  plain?: boolean
  nowrap?: boolean
  scale?: number
  nyaize?: boolean | "respect"
}

const MfmBase =
  (parser: (input: string) => MfmNode[]) =>
  ({ text, ...props }: MfmBasicProps & { text: string }) => <Node nodes={parser(text)} {...props} />

const Mfm = MfmBase(parse)
const MfmSimple = MfmBase(parseSimple)

type MfmConfig = {
  assetsBase?: string
}

const mfmConfigAtom = atom<MfmConfig>({})
const useMfmConfig = () => useAtom(mfmConfigAtom)

export { Mfm, MfmBasicProps, MfmConfig, MfmSimple, Mfm as default, mfmConfigAtom, useMfmConfig }
