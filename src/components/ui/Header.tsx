import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut,  UserCog2 } from "lucide-react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-white shadow-sm">
        <Link to={"/"}>
        
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage
            src="/placeholder.svg?height=32&width=32"
            alt="Admin"
          />
          <UserCog2/>
        </Avatar>
        <span className="font-semibold text-lg">Admin Dashboard</span>
      </div>
      <Button variant="ghost" className="flex items-center">
        <LogOut className="mr-2 h-4 w-4" /> Logout
      </Button>
    </div>
        </Link>
  </header>
  )
}

export default Header