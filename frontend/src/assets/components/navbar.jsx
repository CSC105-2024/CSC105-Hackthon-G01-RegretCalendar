<<<<<<< Updated upstream
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
=======
import { useState, useEffect } from 'react'
import { DropdownProfile } from './DropdownProfile'
import axios from 'axios'
import { FiX, FiBook } from "react-icons/fi";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState(null);
    const toggleMenu = () => setIsOpen(!isOpen)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://localhost:3001/user/api/profile", { withCredentials: true });
                setUser(res.data.user.user)
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchProfile()
    }, [])

    if (!user) return <p>Loading...</p>

    return (
        <nav className="bg-white p-4 shadow-2xl fixed w-full z-50">
            <div className="container mx-auto drop-shadow-lg flex justify-between items-center">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => window.location.href = "/"}
                >
                    {/* Desktop Logo */}
                    <span className="hidden md:block text-[#5E8B7E] text-lg font-bold duration-300 hover:scale-110 tracking-wide">
                        CalendarOfRegret
                    </span>
                    {/* Mobile Logo */}
                    <FiBook className="md:hidden text-[#5E8B7E] w-7 h-7 duration-300 hover:scale-110" />
                </div>
                <button
                    className="md:hidden text-[#5E8B7E] ml-2 transition-transform duration-300 hover:scale-110"
                    onClick={toggleMenu}
                    aria-label="Open menu"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                {/* Desktop */}
                <div className="hidden md:flex items-center space-x-2">
                    <a href="#" className="text-[#5E8B7E] font-bold px-4 py-2 rounded-lg hover:bg-[#F0F4F5] transition" onClick={() => window.location.href = "/"}>Home</a>
                    <a href="#" className="text-[#5E8B7E] font-bold px-4 py-2 rounded-lg hover:bg-[#F0F4F5] transition" onClick={() => window.location.href = "/community"}>Community</a>
                    <DropdownProfile id={user.id} />
                </div>
            </div>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-opacity-30 z-40 transition-opacity duration-300"
                    onClick={toggleMenu}
                />
            )}
            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed top-0 right-0 h-full w-64 bg-[#5E8B7E] shadow-lg flex flex-col items-end pt-20 z-50 transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
                style={{ willChange: "transform" }}
            >
                <hr className="w-full border-t border-white my-2 opacity-30" />
                <button
                    onClick={toggleMenu}
                    className="absolute top-4 right-4 text-white hover:rotate-90 transition-transform duration-300"
                    aria-label="Close menu"
                >
                    <FiX size={28} />
                </button>
                <a
                    href="#"
                    className="text-white font-bold px-6 py-4 w-full text-right hover:bg-[#4A6B5F] rounded transition"
                    onClick={() => { window.location.href = "/"; toggleMenu(); }}
                >
                    Home
                </a>
                <hr className="w-full border-t border-white my-2 opacity-30" />
                <a
                    href="#"
                    className="text-white font-bold px-6 py-4 w-full text-right hover:bg-[#4A6B5F] rounded transition"
                    onClick={() => { window.location.href = "/community"; toggleMenu(); }}
                >
                    Community
                </a>                
                <hr className="w-full border-t border-white my-2 opacity-30" />
                <button
                    className="text-white font-bold px-6 py-4 w-full text-right hover:bg-red-600 rounded transition"
                    onClick={() => {
                        localStorage.removeItem("token");
                        document.cookie = "token=; Max-Age=0";
                        window.location.href = "/login";
                    }}
                >
                    Logout
                </button>
            </div>
>>>>>>> Stashed changes
        </nav>
    )
}

export default Navbar
