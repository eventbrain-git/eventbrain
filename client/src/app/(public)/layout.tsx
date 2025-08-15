import PublicLayout from "../(layout)/PublicLayout"

export default function ProductionLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>
}
