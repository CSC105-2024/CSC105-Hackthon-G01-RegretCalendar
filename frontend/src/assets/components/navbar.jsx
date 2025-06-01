import { useState ,useEffect} from 'react'
import { DropdownProfile } from './DropdownProfile'
import axios from 'axios'
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user,setUser] = useState(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  useEffect(() => {
    const fetchProfile = async () => {
      try{
        const res =  await axios.get("http://localhost:3001/user/api/profile",{withCredentials: true});
        setUser(res.data.user)
        
      }
      catch(err){
        console.log(err);
        
      }
    }
    fetchProfile()
  },[])
  if(!user) return <p>Loading...</p>
  return (
    <nav className="bg-white p-4 shadow-2xl fixed w-full">
      <div className="container mx-auto drop-shadow-lg flex justify-between items-center">
        <div className="text-[#5E8B7E] text-lg font-bold duration-300 hover:scale-110 cursor-pointer" onClick={() => window.location.href = "/"}>CalendarOfRegret</div>
        <button onClick={toggleMenu} className="text-white md:hidden">
          {isOpen ? 'Close' : 'Menu'}
        </button>
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
          <a href="#" className="text-[#5E8B7E] font-bold px-4 py-2" onClick={() => window.location.href = "/"}>Home</a>
          <a href="#" className="text-[#5E8B7E] font-bold px-4 py-2 " onClick={() => window.location.href = "/community"}>Community</a>
          <DropdownProfile id={user.id}/>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar