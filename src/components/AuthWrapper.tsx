import { ReactNode } from "react"

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex justify-center md:my-10 my-4">{ children }</div>
  )
}

export default AuthWrapper