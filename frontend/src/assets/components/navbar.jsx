import { useState } from 'react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-white p-4 font-inter">
      <div className="container mx-auto drop-shadow-lg flex justify-between items-center">
        <div className="text-[#5E8B7E] text-lg font-bold">CalendarOfRegret</div>
        <button onClick={toggleMenu} className="text-[#5E8B7E] md:hidden">
          {isOpen ? 'Close' : 'Menu'}
        </button>
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
          <a
            href="./"
            className="text-[#5E8B7E] font-bold px-6 py-3 rounded-lg mr-4"
          >
            Home
          </a>
          <a
            href="./Community"
            className="text-[#5E8B7E] font-bold px-4 py-2 flex items-center"
          >
            Community
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar   