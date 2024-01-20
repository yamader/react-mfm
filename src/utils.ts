export const id = <T>(x: T) => x

export const intersperse = <T>(a: T[], x: T) => {
  if (a.length <= 1) return a
  const res = [a[0]]
  for (const i of a.slice(1)) res.push(x, i)
  return res
}

export const keys = <T extends { [key: string]: unknown }>(o: T): (keyof T)[] => Object.keys(o)

export const isServer = typeof window === "undefined"
// @ts-ignore
export const isWebpack = typeof __webpack_require__ !== "undefined" && process.env.NODE_ENV !== "development"

export const dirname = (path: string) => path.slice(0, path.lastIndexOf("/"))
