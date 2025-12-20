import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/educator/Navbar'
import Sidebar from '../../Components/educator/Sidebar'
import Footer from '../../Components/educator/Footer'

const Educator = () => {
  return (
    <div>

      <Navbar/>
      <div className="flex">
        <div className="w-64 min-h-screen border-r bg-white">
         <Sidebar/>
        </div>
        <div className="flex-1">
          {<Outlet />}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Educator