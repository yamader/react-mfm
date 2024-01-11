import { FC, HTMLProps } from "react"

const A: FC<HTMLProps<HTMLAnchorElement>> = props => <a {...props} />

export default A
