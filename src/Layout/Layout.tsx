import { Outlet } from "react-router-dom"
import Header from "../Common/Header"


function Layout() {

  return (
    <>
      <Header />
      <main className="pt-[60px]">
        <Outlet />
      </main>
  </>
  )
}

export default Layout