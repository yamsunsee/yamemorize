import { useState, useEffect, useContext } from "react"
import { Context, updateState } from "../store"
import { Link } from "react-router-dom"

const Score = () => {
  const [{ state, language }, dispatch] = useContext(Context)
  const [option, setOption] = useState("word")
  const [isContinue, setContinue] = useState(false)

  useEffect(() => {
    dispatch(updateState())
  }, [])

  useEffect(() => {
    setContinue(state[option].index !== 0 || state[option].score !== 0)
  }, [state, option])

  return (
    <div className="bg-blue-100/90 p-8 transition duration-300 ease-in-out dark:bg-slate-800/90">
      <div className="grid grid-cols-2 overflow-hidden rounded-lg shadow-2xl">
        <div className="min-h-[25rem] w-full">
          <div className="banner"></div>
        </div>
        <div className="flex flex-col items-center justify-center bg-white/50 p-4 shadow-2xl dark:bg-slate-900/50">
          <div className="text-center text-2xl italic text-blue-400">
            {language === "english" ? "Let's check your result!" : "Cùng kiểm tra kết quả học tập nào!"}
          </div>
          <div className="my-4 flex flex-col">
            <div className="flex items-center text-sm text-gray-400 dark:text-blue-200">
              <input
                onChange={() => setOption("word")}
                type="radio"
                name="option"
                id="word"
                checked={option === "word"}
              />
              <label htmlFor="word" className="ml-2">
                {language === "english" ? "Choose the correct word" : "Chọn từ vựng đúng"}
              </label>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-400 dark:text-blue-200">
              <input
                onChange={() => setOption("meaning")}
                type="radio"
                name="option"
                id="meaning"
                checked={option === "meaning"}
              />
              <label htmlFor="meaning" className="ml-2">
                {language === "english" ? "Choose the correct meaning" : "Chọn nghĩa đúng"}
              </label>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-400 dark:text-blue-200">
              <input
                onChange={() => setOption("type")}
                type="radio"
                name="option"
                id="type"
                checked={option === "type"}
              />
              <label htmlFor="type" className="ml-2">
                {language === "english" ? "Enter the word by its meaning" : "Điền từ vựng theo nghĩa"}
              </label>
            </div>
          </div>
          <Link to={`/yamemorize/${option}`}>
            <button className="w-full cursor-pointer rounded-lg bg-blue-400 px-8 py-4 text-2xl font-bold uppercase text-white transition-all hover:bg-blue-500 dark:bg-blue-600 dark:text-blue-200 dark:hover:bg-blue-700">
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
      </div>
    </div>
  )
}
export default Score
