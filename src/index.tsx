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

export * from "./ctx"
export { Mfm, MfmBasicProps, MfmSimple, Mfm as default }
