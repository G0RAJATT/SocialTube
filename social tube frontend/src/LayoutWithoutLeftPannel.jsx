import React, { useState } from 'react'
import {  LeftPanel, Navbar } from './Components'
import { Outlet } from 'react-router-dom'

function LayoutWithoutLeftPannel() {

  const [openMenu, setOpenMenu] = useState(false);
  
    const toggleMenu = () => {
      setOpenMenu((prev) => !prev);
    }
  
  
  return (
   <>
   
     <Navbar toggleMenu={toggleMenu}></Navbar>

     <div className='flex'>
     
            <LeftPanel openMenu={openMenu}></LeftPanel>
             {openMenu && (
               <div
                 onClick={toggleMenu}
                 className="fixed inset-0 bg-black/50 z-50 md:hidden"
               />
             )}
     
             <div className='flex-1'>
               <Outlet></Outlet>
             </div>
     
           </div>
  
 
   
   </>
  )
}

export default LayoutWithoutLeftPannel
