'use server'

import AuthWrapper from "@/components/AuthWrapper";
import { SignUp } from "@clerk/clerk-react";

const Signup = () => {
  return (
    <AuthWrapper>
      <title>Signup | Reflect</title>
      <SignUp
        signInUrl="/login"
        forceRedirectUrl="/"
        fallbackRedirectUrl="/"
        appearance={{
          elements: {
            cardBox: 'md:w-[420px]'
          }
        }}
      />
    </AuthWrapper>
  )
}

export default Signup