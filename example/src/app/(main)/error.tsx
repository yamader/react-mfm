"use client"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <>
      <h2 style={{ display: "flex", alignItems: "baseline" }}>
        Oops!
        <button onClick={reset} style={{ marginLeft: "auto" }}>
          Reset
        </button>
      </h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{error.message}</pre>
    </>
  )
}
