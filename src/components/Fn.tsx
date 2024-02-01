"use client"

import { useAtomValue } from "jotai"
import { MfmFn } from "mfm-js"
import { CSSProperties, ReactNode } from "react"
import { mfmConfigAtom } from ".."

type Arg = string | true

// https://developer.mozilla.org/ja/docs/Web/CSS/time
function timstr(s: Arg) {
  if (typeof s == "string") {
    const match = /.+(?=ms$)|.+(?=s$)/.exec(s)?.[0]
    if (!isNaN(Number(match))) return s
  }
  return null
}

function numstr(s: Arg) {
  if (typeof s == "string" && s) {
    const n = Number(s)
    if (!isNaN(n)) return n
  }
  return null
}

function ccodestr(s: Arg) {
  if (typeof s == "string") {
    const match = /^([\da-f]{3}|[\da-f]{6})$/i.test(s)
    if (match) return "#" + s
  }
  return null
}

export default function Fn({ name, args, children }: MfmFn["props"] & { children: ReactNode }) {
  const { advanced, animation } = useAtomValue(mfmConfigAtom)
  const anim = advanced && animation

  switch (name) {
    case "sparkle":
    case "ruby":
    case "unixtime":
    case "clickable":
      return (
        <span>
          {"$[" + name + "(wip) "}
          {children}
          {"]"}
        </span>
      )

    default: {
      const res = composeStyle(name, args, advanced, anim)
      // falsy
      if (res == null)
        return (
          <span>
            {"$[" + name + " "}
            {children}
            {"]"}
          </span>
        )
      const [sty, cls] = res,
        style = sty || undefined
      return (
        <span className={cls} style={style}>
          {children}
        </span>
      )
    }
  }
}

function composeStyle(
  name: MfmFn["props"]["name"],
  args: MfmFn["props"]["args"],
  advanced: boolean,
  anim: boolean,
): [CSSProperties | undefined | false, string?] | null {
  const speed = timstr(args.speed)
  const delay = timstr(args.delay)

  switch (name) {
    case "tada":
      return [
        {
          fontSize: "150%",
          ...(anim && {
            animation: `mfm-tada ${speed ?? "1s"} linear infinite both`,
            animationDelay: delay ?? "0s",
          }),
        },
      ]

    case "jelly":
      return [
        anim && {
          animation: `mfm-jelly ${speed ?? "1s"} linear infinite both`,
          animationDelay: delay ?? "0s",
        },
      ]

    case "twitch":
      return [
        anim && {
          animation: `mfm-twitch ${speed ?? ".5s"} ease infinite`,
          animationDelay: delay ?? "0s",
        },
      ]

    case "shake":
      return [
        anim && {
          animation: `mfm-shake ${speed ?? ".5s"} ease infinite`,
          animationDelay: delay ?? "0s",
        },
      ]

    case "spin": {
      const aname = args.x ? "mfm-spin-x" : args.y ? "mfm-spin-y" : "mfm-spin"
      return [
        anim && {
          animation: `${aname} ${speed ?? "1.5s"} linear infinite`,
          animationDelay: delay ?? "0s",
          animationDirection: args.left ? "reverse" : args.alternate ? "alternate" : "normal",
        },
      ]
    }

    case "jump":
      return [
        anim && {
          animation: `mfm-jump ${speed ?? ".75s"} linear infinite`,
          animationDelay: delay ?? "0s",
        },
      ]

    case "bounce":
      return [
        anim && {
          animation: `mfm-bounce ${speed ?? ".75s"} linear infinite`,
          animationDelay: delay ?? "0s",
          transformOrigin: "center bottom",
        },
      ]

    case "flip":
      return [
        anim && {
          transform: args.h && args.v ? "scale(-1, -1)" : args.v ? "scaleY(-1)" : "scaleX(-1)",
        },
      ]

    case "x2":
      return [, "mfm-x2"]

    case "x3":
      return [, "mfm-x3"]

    case "x4":
      return [, "mfm-x4"]

    case "font":
      for (const e of ["serif", "monospace", "cursive", "fantasy", "emoji", "math"])
        if (args[e]) return [{ fontFamily: e }]
      return null

    case "blur":
      return [, "mfm-blur"]

    case "rainbow":
      return anim
        ? [
            {
              animation: `mfm-rainbow ${speed ?? "1s"} linear infinite`,
              animationDelay: delay ?? "0s",
            },
          ]
        : [, "mfm-gpl-rainbow-static"]

    case "rotate":
      return [
        {
          transform: `rotate(${numstr(args.deg) ?? 90}deg)`,
          transformOrigin: "center",
        },
      ]

    case "position":
      return [
        advanced && {
          transform: `translateX(${numstr(args.x) ?? 0}em) translateY(${numstr(args.y) ?? 0}em)`,
        },
      ]

    case "scale": {
      const x = Math.min(numstr(args.x) ?? 1, 5)
      const y = Math.min(numstr(args.y) ?? 1, 5)
      return [advanced && { transform: `scale(${x}, ${y})` }]
    }

    case "fg":
      return [
        {
          color: ccodestr(args.color) ?? "red",
          overflowWrap: "anywhere",
        },
      ]

    case "bg":
      return [
        {
          color: ccodestr(args.color) ?? "red",
          overflowWrap: "anywhere",
        },
      ]

    case "border": {
      const line = typeof args.style === "string" ? args.style : "solid"
      return [
        {
          border: `${numstr(args.width) ?? 1}px ${line} ${ccodestr(args.color) ?? "var(--mfm-border)"}`,
          borderRadius: `${numstr(args.radius) ?? 0}px`,
          ...(!args.noclip && { overflow: "clip" }),
        },
      ]
    }

    default:
      return null
  }
}
