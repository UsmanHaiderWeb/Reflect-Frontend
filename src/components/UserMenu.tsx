import { Building2, ChartNoAxesGantt } from "lucide-react";
import { UserButton } from '@clerk/clerk-react'
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const navigate = useNavigate();

  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-10 h-10",
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Action label="Dashboard" labelIcon={<ChartNoAxesGantt size={15} />} onClick={() => navigate('/dashboard')} />
        <UserButton.Action label="Write a Journal" labelIcon={<Building2 size={15} />} onClick={() => navigate('/journal/write')} />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  )
}

export default UserMenu