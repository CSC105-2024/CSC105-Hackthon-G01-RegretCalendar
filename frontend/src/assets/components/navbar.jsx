import { useState } from 'react'
import { FiBook, FiMenu, FiX } from "react-icons/fi"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="bg-white p-4 font-inter relative">
            <div className="container mx-auto drop-shadow-lg flex justify-between items-center">
                <div>
                    <span className="hidden md:block text-[#5E8B7E] text-lg font-bold">CalendarOfRegret</span>
                    <span className="block md:hidden text-[#5E8B7E]">
                        <FiBook size={28} />
                    </span>
                </div>
                <button onClick={toggleMenu} className="text-[#5E8B7E] md:hidden">
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
                {/* Desktop menu */}
                <div className="hidden md:flex">
                    <a
                        href="./"
                        className="bg-[#5E8B7E] text-white font-bold px-6 py-3 rounded-lg mr-4"
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
            {/* Mobile side Nav*/}
            {isOpen && (
                <div className="md:hidden fixed top-0 right-0 h-full w-64 bg-[#5E8B7E] shadow-lg flex flex-col items-end pt-20 z-50 transition-all duration-300">
                    <button
                        onClick={toggleMenu}
                        className="absolute top-4 right-4 text-white"
                    >
                        <FiX size={28} />
                    </button>
                    <hr className="w-full border-t border-gray-200 my-0" />
                    <a
                        href="./"
                        className="w-full text-right text-white  font-bold px-8 py-4 rounded-lg hover:bg-[#e0eae7]"
                        onClick={() => setIsOpen(false)}>Home</a>
                        <hr className="w-full border-t border-gray-200 my-0" />

                    <a
                        href="./Community"
                        className="w-full text-right text-white font-bold px-8 py-4 rounded-lg hover:bg-[#e0eae7]"
                        onClick={() => setIsOpen(false)}>Community</a>
                        <hr className="w-full border-t border-gray-200 my-0" />

                    <a
                        href="./Community"
                        className="w-full text-right text-white font-bold px-8 py-4 rounded-lg hover:bg-[#e0eae7]"
                        onClick={() => setIsOpen(false)}>Logout</a>
                        <hr className="w-full border-t border-gray-200 my-0" />

                </div>
            )}
        </nav>
    )
}

export default Navbar
