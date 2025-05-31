import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";

export function DropdownProfile({ id }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/user/${id}`);
        

        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [id]);
  if (!user) return null;
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/user/api/logout",
        {},
        { withCredentials: true }
      );
      console.log();

      localStorage.removeItem("token");

      window.location.href = "/login";
    } catch (err) {
      console.error("Logout Failed : ", err.response?.data || err.message);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <a href="#" className="text-[#5E8B7E] font-bold px-4 py-2" >{user.username}</a>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleLogout} className={"cursor-pointer"}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
