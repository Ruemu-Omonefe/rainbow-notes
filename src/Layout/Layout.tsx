import { Outlet } from "react-router-dom"
import Navbar from "../Common/Navbar"
import Sidemenu from "../Common/Sidemenu"

function Layout() {

  return (
    <>
    <Navbar />
    <div className="md:mt-0 mt-18">
      <Sidemenu />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
    {/* <Footer /> */}
  </>
  )
}

export default Layout