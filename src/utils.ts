export const id = <T>(x: T) => x

export const intersperse = <T>(a: T[], x: T) => {
  if (a.length <= 1) return a
  const res = [a[0]]
  for (const i of a.slice(1)) res.push(x, i)
  return res
}
