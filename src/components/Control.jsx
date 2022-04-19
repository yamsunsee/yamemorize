import { useState, useEffect, useContext } from "react"
import { Context, changeLanguage } from "../store"

const Control = () => {
  const [{ language }, dispatch] = useContext(Context)
  const [theme, setTheme] = useState("")

  useEffect(() => {
    const localTheme = JSON.parse(localStorage.getItem("y-theme")) || "light"
    if (localTheme === "dark") {
      document.documentElement.classList.add("dark")
      setTheme("dark")
    } else {
      document.documentElement.classList.remove("dark")
      setTheme("light")
    }

    const localLanguage = JSON.parse(localStorage.getItem("y-language")) || "english"
    dispatch(changeLanguage(localLanguage))
  }, [])

  const toggleMode = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark")
      setTheme("light")
      localStorage.setItem("y-theme", JSON.stringify("light"))
    } else {
      document.documentElement.classList.add("dark")
      setTheme("dark")
      localStorage.setItem("y-theme", JSON.stringify("dark"))
    }
  }

  const toggleLanguage = () => {
    const newLanguage = language === "english" ? "vietnamese" : "english"
    dispatch(changeLanguage(newLanguage))
    localStorage.setItem("y-language", JSON.stringify(newLanguage))
  }

  return (
    <div className="control group absolute bottom-2 right-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg bg-white/10 text-2xl text-blue-300 transition-all hover:text-blue-400 dark:bg-slate-900/90">
      <ion-icon name="settings"></ion-icon>
      <div
        onClick={toggleLanguage}
        className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sm font-bold uppercase opacity-0 transition-all hover:bg-blue-400 hover:text-white group-hover:bottom-[120%] group-hover:opacity-100 dark:bg-slate-900/90 dark:hover:text-blue-200"
      >
        {language === "english" ? "vie" : "eng"}
      </div>
      <div
        onClick={toggleMode}
        className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl font-bold uppercase opacity-0 transition-all hover:bg-blue-400 hover:text-white group-hover:right-[120%] group-hover:opacity-100 dark:bg-slate-900/90 dark:hover:text-blue-200"
      >
        {theme === "dark" ? <ion-icon name="sunny"></ion-icon> : <ion-icon name="moon"></ion-icon>}
      </div>
    </div>
  )
}

export default Control
