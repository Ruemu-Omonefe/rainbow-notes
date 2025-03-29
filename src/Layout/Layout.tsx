import { Outlet } from "react-router-dom"
import Navbar from "../Common/Navbar"
import styles from './Layout.module.scss'
import Sidemenu from "../Common/Sidemenu"

function Layout() {

  return (
    <>
    <Navbar />
    <div className={styles.appContainer}>
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