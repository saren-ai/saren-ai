interface StatusPillProps {
  status: string
  variant: 'sequence' | 'touch'
}

const touchConfig: Record<string, { cls: string; label: string }> = {
  sent:    { cls: 'bg-slate text-white',                                          label: 'Sent' },
  opened:  { cls: 'bg-lavender text-white',                                       label: 'Opened' },
  replied: { cls: 'bg-copper text-white',                                         label: 'Replied' },
  pending: { cls: 'border border-border text-foreground-muted bg-transparent',    label: 'Pending' },
  bounced: { cls: 'bg-ember/20 text-ember',                                       label: 'Bounced' },
}

const sequenceConfig: Record<string, { cls: string; label: string }> = {
  queued:    { cls: 'border border-border text-foreground-muted bg-transparent',  label: 'Queued' },
  active:    { cls: 'bg-copper text-white',                                       label: 'Active' },
  paused:    { cls: 'bg-slate text-white',                                        label: 'Paused' },
  completed: { cls: 'bg-lavender text-white',                                     label: 'Completed' },
  dead:      { cls: 'bg-ember/20 text-ember',                                     label: 'Dead' },
}

export default function StatusPill({ status, variant }: StatusPillProps) {
  const map = variant === 'touch' ? touchConfig : sequenceConfig
  const cfg = map[status] ?? { cls: 'bg-foreground/10 text-foreground-muted', label: status }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${cfg.cls}`}>
      {cfg.label}
    </span>
  )
}
