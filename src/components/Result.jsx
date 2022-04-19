import { useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../store"

const Result = ({ trophy, restart }) => {
  let [{ language }, dispatch] = useContext(Context)

  return (
    <div className="shape-small absolute z-20 flex h-full w-full flex-col items-center justify-center bg-white p-8 dark:bg-slate-900 dark:text-blue-200">
      <div className="z-0 flex w-full flex-col items-center justify-center rounded-lg bg-white/50 px-8 py-12 shadow-2xl dark:bg-slate-900/50">
        <div className="text-9xl text-amber-400">
          <ion-icon name="trophy"></ion-icon>
        </div>
        <div className="text-3xl font-bold uppercase text-amber-400">
          {language === "english"
            ? `You won ${trophy} ${parseInt(trophy) < 2 ? "trophy" : "trophies"}!`
            : `Bạn đã đạt được ${trophy} cúp!`}
        </div>
        <div>
          <button
            onClick={restart}
            className="mt-8 w-full cursor-pointer rounded-lg bg-blue-400 px-8 py-4 text-2xl font-bold uppercase text-white transition-all hover:bg-blue-500 dark:bg-blue-600 dark:text-blue-200 dark:hover:bg-blue-700"
          >
            {language === "english" ? "Try again" : "Thử lại"}
          </button>
          <Link to="/yamemorize/option/score">
            <button className="mt-4 w-full cursor-pointer rounded-lg bg-blue-400 px-8 py-4 text-2xl font-bold uppercase text-white transition-all hover:bg-blue-500 dark:bg-blue-600 dark:text-blue-200 dark:hover:bg-blue-700">
              {language === "english" ? "Back to option" : "Trở lại tùy chọn"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Result
