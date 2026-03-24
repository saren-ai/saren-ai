import HalcyonSubnavWrapper from '@/components/halcyon/HalcyonSubnavWrapper'

export default function HalcyonLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Subnav shown on sub-pages only; overview page renders it inline after its hero */}
      <HalcyonSubnavWrapper />
      {children}
    </>
  )
}
