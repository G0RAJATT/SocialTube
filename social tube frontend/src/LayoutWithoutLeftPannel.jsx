import React from 'react'
import {  Navbar } from './Components'
import { Outlet } from 'react-router-dom'

function LayoutWithoutLeftPannel() {
  return (
   <>
   
     <Navbar></Navbar>
     <Outlet></Outlet>
 
   
   </>
  )
}

export default LayoutWithoutLeftPannel
