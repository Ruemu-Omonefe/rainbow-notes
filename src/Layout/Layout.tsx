import { Outlet } from "react-router-dom"
import Navbar from "../Common/Navbar"
import Sidemenu from "../Common/Sidemenu"

function Layout() {

  return (
    <>
    {/* <Navbar /> */}
      <Sidemenu />
      <main className="main-content">
        <Outlet />
      </main>
    {/* <Footer /> */}
  </>
  )
}

export default Layout