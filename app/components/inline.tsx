// Renders `backticked` spans as <code>; everything else stays plain text.
export function Inline({ text }: { text: string }) {
  return text.split(/(`[^`]+`)/).map((part, i) =>
    part.startsWith("`") ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: static split of a constant string, never reordered
      <code key={i}>{part.slice(1, -1)}</code>
    ) : (
      part
    ),
  );
}
