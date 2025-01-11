'use server'

import Footer from "./Footer"
import Header from "./Header"
import { Outlet } from "react-router-dom"

const LoggedInContentWrapper = () => {
  return (
    <div>
      <div className='min-h-[700px]'>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default LoggedInContentWrapper