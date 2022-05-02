import { useContext } from "react"
import { Context } from "../store"

const Confirm = ({ resolve, reject, isReset = true, isShuffle = false }) => {
  let [{ language }, dispatch] = useContext(Context)

  return (
    <div className="shape-small absolute z-20 flex h-full w-full flex-col items-center justify-center bg-white p-8 text-center dark:bg-slate-900 dark:text-blue-200">
      <div className="z-0 flex w-full flex-col items-center justify-center rounded-lg bg-white/50 px-8 py-12 shadow-2xl dark:bg-slate-900/50">
        <div className="text-6xl text-amber-400">
          <ion-icon name="warning"></ion-icon>
        </div>
        <div className="text-3xl font-bold text-amber-400">
          {isShuffle
            ? language === "english"
              ? `Your flashcards will be shuffled again!`
              : `Tất cả các thẻ từ vựng của bạn sẽ được xáo trộn lại!`
            : isReset
            ? language === "english"
              ? `All of your achieved trophies will be lost when you reset this process!`
              : `Tất cả cúp đạt được sẽ bị mất khi bạn bắt đầu lại!`
            : language === "english"
            ? `Your current progress and achieved trophies will NOT be saved when you exit the session!`
            : `Tiến trình hiện tại và tất cả cúp đạt được sẽ không được lưu khi bạn thoát!`}
        </div>
        <div>
          <button
            onClick={reject}
            className="mt-8 w-full cursor-pointer rounded-lg bg-blue-400 px-8 py-4 text-2xl font-bold uppercase text-white transition-all hover:bg-blue-500 dark:bg-blue-600 dark:text-blue-200 dark:hover:bg-blue-700"
          >
            {isReset
              ? language === "english"
                ? "Continue the process"
                : "Tiếp tục"
              : language === "english"
              ? "Continue the session"
              : "Tiếp tục"}
          </button>
          <button
            onClick={resolve}
            className="mt-4 w-full cursor-pointer rounded-lg bg-blue-400 px-8 py-4 text-2xl font-bold uppercase text-white transition-all hover:bg-blue-500 dark:bg-blue-600 dark:text-blue-200 dark:hover:bg-blue-700"
          >
            {isShuffle
              ? language === "english"
                ? "Shuffle anyway"
                : "Xáo trộn"
              : isReset
              ? language === "english"
                ? "Reset anyway"
                : "Bắt đầu lại"
              : language === "english"
              ? "Exit anyway"
              : "Thoát"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirm
