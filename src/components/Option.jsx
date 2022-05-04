import { useState, useContext } from "react"
import { Context } from "../store"
import { Route, Routes, NavLink, Link, useNavigate } from "react-router-dom"
import Scan from "./Scan"
import Score from "./Score"
import Confirm from "./Confirm"

const Option = () => {
  const [isConfirm, setConfirm] = useState(false)
  const [{ language }, dispatch] = useContext(Context)
  const navigate = useNavigate()

  const navLinkStyles = ({ isActive }) => {
    return (
      (isActive ? "border-b-2 border-blue-400 text-blue-400 bg-blue-100/90 dark:bg-slate-800/90" : "text-gray-400") +
      " px-8 py-4 uppercase font-bold text-2xl 2xl:text-4xl 2xl:py-6"
    )
  }

  return (
    <div className="relative flex h-full max-h-[50rem] w-1/2 max-w-6xl flex-col overflow-hidden rounded-lg bg-white/90 shadow-2xl transition duration-300 ease-in-out dark:bg-slate-900/90">
      {isConfirm ? (
        <Confirm
          resolve={() => navigate("/yamemorize", { replace: true })}
          reject={() => setConfirm(false)}
          isReset={false}
        />
      ) : (
        ""
      )}
      <div
        onClick={() => setConfirm(true)}
        className="absolute top-2 left-2 cursor-pointer text-2xl text-blue-300 transition-all hover:text-blue-400 2xl:text-3xl"
      >
        <ion-icon name="arrow-back-circle"></ion-icon>
      </div>
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
