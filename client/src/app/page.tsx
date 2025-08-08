import Production from "@/app/production/page";
import { ThemeProvider } from "./context/ThemeContext";

export default function Home() {
  return (
    <>
      <ThemeProvider>
        <Production />
      </ThemeProvider>
    </>
  )
}
