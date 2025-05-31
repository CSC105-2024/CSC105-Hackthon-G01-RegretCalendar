import { useState } from 'react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto drop-shadow-lg flex justify-between items-center">
        <div className="text-[#5E8B7E] text-lg font-bold">CalendarOfRegret</div>
        <button onClick={toggleMenu} className="text-white md:hidden">
          {isOpen ? 'Close' : 'Menu'}
        </button>
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
          <a href="#" className="text-[#5E8B7E] font-bold px-4 py-2">Home</a>
          <a href="#" className="text-[#5E8B7E] font-bold px-4 py-2">Community</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar