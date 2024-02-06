import { useAtom } from "jotai"
import { atomWithStorage, createJSONStorage } from "jotai/utils"
import { tourl } from "~/utils"

const storage = createJSONStorage<{ host?: string }>(() => sessionStorage)
export const authAtom = atomWithStorage("mfm-example-auth", {}, storage)

export default function Auth() {
  const [auth, setAuth] = useAtom(authAtom)
  const host = auth.host && tourl(auth.host)
  const hostInvalid = host && !URL.canParse(host)

  return (
    <div>
      <input
        defaultValue={auth.host}
        onChange={e => setAuth({ ...auth, host: e.target.value.trim() })}
        placeholder="Custom emoji host (e.g. misskey.io)"
        style={{ width: "100%", ...(hostInvalid && { color: "red" }) }}
      />
      {hostInvalid && <div style={{ marginTop: ".2rem", color: "red" }}>Invalid host</div>}
    </div>
  )
}
