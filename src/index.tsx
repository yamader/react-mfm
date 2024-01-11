import { MfmNode, parse, parseSimple } from "mfm-js"
import { createContext } from "react"
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

const MfmConfigContext = createContext<{
  host?: string
}>({})

const MfmConfigProvider = MfmConfigContext.Provider

export { Mfm, MfmBasicProps, MfmConfigContext, MfmConfigProvider, MfmSimple, Mfm as default }
