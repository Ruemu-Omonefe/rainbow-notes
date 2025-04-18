import { Outlet } from "react-router-dom"
import Header from "../Common/Header"

function Layout() {

  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
  </>
  )
}

export default Layout