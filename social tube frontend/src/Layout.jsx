
import { Outlet } from 'react-router-dom'
import { Navbar, LeftPanel } from './Components'

function Layout() {
  return (
    <>



      <Navbar></Navbar>

      <div className='flex'>

        <LeftPanel></LeftPanel>

        <div className='flex-1'>
          <Outlet></Outlet>
        </div>

      </div>

    </>
  )
}

export default Layout
