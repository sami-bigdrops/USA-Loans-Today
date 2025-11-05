import Navbar from "@/app/ult/Navbar"
import Footer from "@/app/ult/Footer"



export default function FormLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    )
  }