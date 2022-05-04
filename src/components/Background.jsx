import { useContext } from "react"
import { Context } from "../store"
import { Link } from "react-router-dom"

const Background = () => {
  const [{ language }, dispatch] = useContext(Context)

  return (
    <div>
      <Link to="/yamemorize">
        <div className="absolute top-2 left-2 flex cursor-pointer items-center justify-center text-2xl text-blue-200 transition-all hover:text-blue-50 2xl:text-4xl">
          <ion-icon name="arrow-back-circle"></ion-icon>
          <div className="ml-2 text-sm font-bold uppercase 2xl:text-xl">
            {language === "english" ? "Back to home" : "Trở về trang chủ"}
          </div>
        </div>
      </Link>
      <div className="absolute right-2 top-2 text-sm font-bold text-blue-300/50 2xl:text-xl">
        {language === "english" ? "Special thanks to" : "Gửi lời cảm ơn đặc biệt đến"}
        <a
          className="mx-2 italic text-blue-400/60 transition-all hover:text-blue-400"
          href="https://www.facebook.com/momoko8794"
          target="_blank"
        >
          Momo Art (Ngo Anh Van)
        </a>
        {language === "english" ? "for cute backgrounds" : "vì những hình nền dễ thương"}
      </div>
    </div>
  )
}

export default Background
