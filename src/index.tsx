import { MfmNode, parse, parseSimple } from "mfm-js"
import { proxy, useSnapshot } from "valtio"
import Node from "./Node"
import "./style.css"
import { keys } from "./utils"

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

const $mfmConfig = proxy<MfmConfig>({})
const resetMfmConfig = (config: MfmConfig) => {
  keys(config).forEach(key => {
    $mfmConfig[key] = config[key]
  })
}
const useMfmConfig = () => useSnapshot($mfmConfig)

export { $mfmConfig, Mfm, MfmBasicProps, MfmConfig, MfmSimple, Mfm as default, resetMfmConfig, useMfmConfig }
