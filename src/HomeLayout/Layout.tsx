import { Outlet } from "react-router-dom"
import Navbar from "../Common/Navbar"
import Footer from "../Common/Footer"
import style from "./Layout.module.scss";

function HomeLayout() {

  return (
    <>
    <Navbar />
      <main className={style.mainContent}>
        <Outlet />
      </main>
    <Footer />
  </>
  )
}

export default HomeLayout