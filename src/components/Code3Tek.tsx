/** CODE3TEK wordmark — bold caps with the red "3", matching other Code3Tek product sites. */
export default function Code3Tek({ className = '' }: { className?: string }) {
  return (
    <span className={`font-mono font-bold tracking-[0.08em] text-off ${className}`}>
      CODE<span className="text-flare">3</span>TEK
    </span>
  )
}
