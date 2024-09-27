import { useState } from 'react'

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
      {/* Navigation Toggle */}
      <div className="py-16 text-center">
        <button
          type="button"
          className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 border border-gray-800 text-white text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-gray-950 focus:outline-none focus:bg-gray-900 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200"
          onClick={toggleSidebar}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls="sidebar"
          aria-label="Toggle navigation"
        >
          {'>'}
        </button>
      </div>
      {/* End Navigation Toggle */}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`hs-overlay transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } dark:bg-neutral-800 dark:border-neutral-700`}
        role="dialog"
        aria-label="Sidebar"
      >
        <div className="px-6">
          <a
            className="font-semibold text-xl text-black dark:text-white"
            href="#"
            aria-label="Brand"
          >
            Brand
          </a>
        </div>
        <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap">
          <ul className="space-y-1.5">
            <li>
              <a
                className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:text-white"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <button
                type="button"
                className="w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-400"
                onClick={() => toggleAccordion('users')}
                aria-expanded={activeAccordion === 'users'}
                aria-controls="users-accordion"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Users
                <svg
                  className={`ms-auto size-4 ${
                    activeAccordion === 'users' ? 'block' : 'hidden'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
              <div
                id="users-accordion"
                className={`hs-accordion-content transition-all duration-300 ${
                  activeAccordion === 'users' ? 'block' : 'hidden'
                }`}
              >
                {/* Submenu content */}
              </div>
            </li>
            <li>
              <div className="py-16 text-center">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 border border-gray-800 text-white text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-gray-950 focus:outline-none focus:bg-gray-900 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200"
                  onClick={toggleSidebar}
                  aria-haspopup="dialog"
                  aria-expanded={isOpen}
                  aria-controls="sidebar"
                  aria-label="Toggle navigation"
                >
                  Close
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      {/* End Sidebar */}
    </>
  )
}
