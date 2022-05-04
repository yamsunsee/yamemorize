import { useContext } from "react"
import { Context } from "../store"

const Screen = () => {
  const [{ language }, dispatch] = useContext(Context)

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white/90 p-8 text-center text-lg font-bold text-blue-400 shadow-2xl dark:bg-slate-900/90 md:text-xl lg:text-2xl xl:hidden">
      <div className="text-5xl">
        <ion-icon name="rainy"></ion-icon>
      </div>
      <div className="uppercase">{language === "english" ? "So sorry!" : "Xin lỗi!"}</div>
      <div className="uppercase">
        {language === "english"
          ? "Your device resolution is not supported!"
          : "Độ phân giải màn hình của bạn không được hỗ trợ!"}
      </div>
      <i className="text-xs">
        {language === "english"
          ? "Please use appropriate devices! (with minimum resolution is 1280 pixels)"
          : "Vui lòng sử dụng thiết bị có độ phân giải tối thiểu là 1280 pixels!"}
      </i>
    </div>
  )
}

export default Screen
