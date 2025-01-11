'use server'

import AuthWrapper from "@/components/AuthWrapper";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <AuthWrapper>
      <title>Login | Reflect</title>
      <SignIn
        signUpUrl="/sign-up"
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

export default Login