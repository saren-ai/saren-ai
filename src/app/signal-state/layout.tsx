import SignalStateSubnavWrapper from '@/components/signal-state/SignalStateSubnavWrapper'

export default function SignalStateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignalStateSubnavWrapper />
      {children}
    </>
  )
}
