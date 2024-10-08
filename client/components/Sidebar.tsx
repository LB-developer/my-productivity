import { useState } from "react"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id)
  }

  return (
    <>
      <div className="d-flex w-25 bg-light bg-opacity-75"> Hello </div>
    </>
  )
}
