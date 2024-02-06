import { type HTMLProps } from "react"

type AProps = HTMLProps<HTMLAnchorElement>

const A = (props: AProps) => <a {...props} />

export default A
