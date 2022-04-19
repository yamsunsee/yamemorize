import { useContext } from "react"
import { Context } from "../store"
import { Route, Routes, NavLink, Link } from "react-router-dom"
import Scan from "./Scan"
import Score from "./Score"

const Option = () => {
  const [{ language }, dispatch] = useContext(Context)

  const navLinkStyles = ({ isActive }) => {
    return (
      (isActive ? "border-b-2 border-blue-400 text-blue-400 bg-blue-100/90 dark:bg-slate-800/90" : "text-gray-400") +
      " px-8 py-4 uppercase font-bold text-2xl"
    )
  }

  return (
    <div className="relative flex w-1/2 flex-col overflow-hidden rounded-lg bg-white/90 shadow-2xl transition duration-300 ease-in-out dark:bg-slate-900/90">
      <Link to="/yamemorize">
        <div className="absolute top-2 left-2 cursor-pointer text-2xl text-blue-300 transition-all hover:text-blue-400">
          <ion-icon name="arrow-back-circle"></ion-icon>
        </div>
      </Link>
      <div className="grid grid-cols-2 text-center">
        <NavLink to="scan" className={navLinkStyles}>
          {language === "english" ? "scan" : `học "nhồi"`}
        </NavLink>
        <NavLink to="score" className={navLinkStyles}>
          {language === "english" ? "score" : `thi "nhét"`}
        </NavLink>
      </div>
      <Routes>
        <Route path="scan" element={<Scan />} />
        <Route path="score" element={<Score />} />
      </Routes>
    </div>
  )
}

export default Option
