import { useContext } from "react"
import { Context } from "../store"

const Screen = () => {
  const [{ language }, dispatch] = useContext(Context)

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white/90 p-8 text-center text-lg font-bold uppercase text-blue-400 shadow-2xl dark:bg-slate-900/90 md:text-xl lg:text-2xl xl:hidden">
      <div className="text-5xl">
        <ion-icon name="rainy"></ion-icon>
      </div>
      <div>{language === "english" ? "Sorry!" : "Xin lỗi!"}</div>
      <div>
        {language === "english" ? "This screen size is not supported!" : "Kích thước màn hình này không được hỗ trợ!"}
      </div>
    </div>
  )
}

export default Screen
