"use client"

import { type HTMLProps } from "react"
import { useMfmConfigValue } from ".."

export type LinkProps = HTMLProps<HTMLAnchorElement>

const SimpleLink = (props: LinkProps) => <a className="mfm-link" {...props} />

export default function Link(props: LinkProps) {
  const { Link } = useMfmConfigValue()
  return (Link ?? SimpleLink)(props)
}
