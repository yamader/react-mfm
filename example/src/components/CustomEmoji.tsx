"use client"

import { atom, useAtom, useAtomValue } from "jotai"
import { Suspense, use, useEffect } from "react"
import { CustomEmojiProps } from "react-mfm"
import { tourl } from "~/utils"
import { authAtom } from "./Auth"

const cacheAtom = atom<{ [name: string]: string }>({})
const cachedHostAtom = atom<string | undefined>(undefined)

const EmojiImg = ({ name, url }: { name: string; url?: string }) =>
  !url ? `:${name}:` : <img src={url} alt={name} className="mfm-customEmoji" />

function CustomEmoji({ name }: CustomEmojiProps) {
  const cache = useAtomValue(cacheAtom)
  return (
    <Suspense fallback={<EmojiImg name={name} url={cache[name]} />}>
      <FetchEmoji name={name} />
    </Suspense>
  )
}

export default CustomEmoji

function FetchEmoji({ name }: { name: string }) {
  const { host } = useAtomValue(authAtom)
  const [cache, setCache] = useAtom(cacheAtom)
  const [cachedHost, setCachedHost] = useAtom(cachedHostAtom)

  useEffect(() => {
    if (host != cachedHost) {
      setCache({})
      setCachedHost(host)
    }
  }, [host, cachedHost, setCache, setCachedHost])

  if (name in cache && host == cachedHost) return <EmojiImg name={name} url={cache[name]} />
  if (!host || host != cachedHost) return <EmojiImg name={name} />

  const { url } = use(
    fetch(`${tourl(host)}/api/emoji?name=${name}`)
      .then(res => res.json())
      .catch(e => (console.warn(e), {})),
  )
  setCache(cache => ({ ...cache, [name]: url }))

  return <EmojiImg name={name} url={url} />
}
