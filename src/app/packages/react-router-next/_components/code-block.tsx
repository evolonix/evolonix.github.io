interface CodeBlockProps {
  code: string;
  className?: string;
}

export function CodeBlock({ code, className }: CodeBlockProps) {
  return (
    <pre
      className={[
        "overflow-x-auto rounded-xl bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-100 ring-1 ring-zinc-800",
        className ?? "",
      ].join(" ")}
    >
      <code>{code}</code>
    </pre>
  );
}
