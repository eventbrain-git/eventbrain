import PrivateLayout from "../(layout)/PrivateLayout"

export default function ProductionLayout({ children }: { children: React.ReactNode }) {
  return <PrivateLayout>{children}</PrivateLayout>
}
