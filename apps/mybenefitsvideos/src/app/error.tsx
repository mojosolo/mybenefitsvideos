"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: 24 }}>
      <h2>Something went wrong</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{String(error?.message || "")}</pre>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

