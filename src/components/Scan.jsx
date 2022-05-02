import { useState, useEffect, useContext } from "react"
import { Context, updateState } from "../store"
import { Link } from "react-router-dom"

const Scan = () => {
  const [{ state, language }, dispatch] = useContext(Context)
  const [isContinue, setContinue] = useState(false)

  useEffect(() => {
    dispatch(updateState())
  }, [])

  useEffect(() => {
    setContinue(state.deck.index !== 0)
  }, [state])

  return (
    <div className="bg-blue-100/90 p-8 transition duration-300 ease-in-out dark:bg-slate-800/90">
      <div className="grid grid-cols-2 overflow-hidden rounded-lg shadow-2xl">
        <div className="flex flex-col items-center justify-center bg-white/50 p-4 shadow-2xl dark:bg-slate-900/50">
          <div className="text-center text-2xl italic text-blue-400">
            {language === "english" ? "Quickly look through all flashcards!" : "Lướt nhanh qua tất cả các thẻ từ vựng!"}
          </div>
          <Link to="/yamemorize/deck">
            <button className="mt-4 w-full cursor-pointer rounded-lg bg-blue-400 px-8 py-4 text-2xl font-bold uppercase text-white transition-all hover:bg-blue-500 dark:bg-blue-600 dark:text-blue-200 dark:hover:bg-blue-700">
              {isContinue
                ? language === "english"
                  ? "Continue"
                  : "Tiếp tục"
                : language === "english"
                ? "Start"
                : "Bắt đầu"}
            </button>
          </Link>
        </div>
        <div className="min-h-[25rem] w-full">
          <div className="banner right"></div>
        </div>
      </div>
    </div>
  )
}

export default Scan
