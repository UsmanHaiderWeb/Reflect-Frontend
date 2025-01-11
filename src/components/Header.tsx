'use server'

import { Button } from "./ui/button.tsx";
import { PenBox, FolderOpen } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import UserMenu from "./UserMenu.tsx";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container mx-auto">
      <nav className="py-6 px-4 flex justify-between items-center">
        <Link to="/">
          <img
            src={"/logo.png"}
            alt="Reflct Logo"
            width={150}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center gap-4">
          <SignedIn>
            <Link to="/dashboard#collections">
              <Button variant="outline" className="flex items-center gap-2">
                <FolderOpen size={18} />
                <span className="hidden md:inline">Collections</span>
              </Button>
            </Link>
          </SignedIn>
          <Link to="/journal/write">
            <Button variant='journal' className="flex items-center gap-2 outline-none border-none">
              <PenBox size={18} />
              <span className="hidden md:inline">Write New</span>
            </Button>
          </Link>
          <SignedOut>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}

export default Header

