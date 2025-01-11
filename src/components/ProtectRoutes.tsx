import { useUser } from "@clerk/clerk-react"
import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AppLoader from "./AppLoader"
import ShowToast from "@/lib/ShowToast"

const ProtectRoutes = ({ children }: { children: ReactNode }) => {
    const { isLoaded, isSignedIn, user } = useUser()
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !isSignedIn){ 
            navigate('/login', { replace: true });
            ShowToast("Please login to access all features.", 'error');
        }
    }, [isLoaded, isSignedIn, user])

    if(!isLoaded) return <AppLoader />

    return (
        <div>{children}</div>
    )
}

export default ProtectRoutes