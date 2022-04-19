import { useRef, useEffect, useContext } from "react"
import { Context, updateData, updateState, updateLink } from "../store"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const DEFAULT_DATASHEET_LINK =
    "https://docs.google.com/spreadsheets/d/17fa_cvfE7EoNRPN_xLzumvuRbgRSdKLymPsIgl6BIFY/edit#gid=0"

  const [{ link, language }, dispatch] = useContext(Context)
  const navigate = useNavigate()
  const message = useRef()
  const input = useRef()

  useEffect(() => {
    dispatch(updateLink())
  }, [link])

  const initialState = {
    deck: {
      index: 0,
    },
    word: {
      index: 0,
      score: 0,
      answers: [],
      select: -1,
    },
    meaning: {
      index: 0,
      score: 0,
      answers: [],
      select: -1,
    },
    type: {
      index: 0,
      score: 0,
      image: false,
      audio: false,
      answer: "",
    },
  }

  const fetchData = async () => {
    const inputLink = input.current.value.trim()
    if (!inputLink) {
      message.current.innerText = "Please enter your datasheet link!"
      message.current.classList.remove("hidden")
      input.current.value = ""
      input.current.focus()
      return
    }
    try {
      let response = await fetch(inputLink.split("edit")[0] + "gviz/tq?tqx=out:html")
      let data = await response.arrayBuffer()
      let workbook = XLSX.read(new Uint8Array(data), {
        type: "array",
      })
      let sheet = workbook.SheetNames[0]
      let words = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet])
      let unduplicatedWords = Array.from(new Set(words.map((item) => item.word + item.meaning))).map(
        (unduplicatedWord) => {
          return words.find((word) => word.word + word.meaning === unduplicatedWord)
        }
      )
      if (unduplicatedWords.length) {
        let shuffledWords = [...unduplicatedWords].sort(() => Math.random() - 0.5)
        navigate("/yamemorize/option/scan", { replace: true })
        dispatch(updateData(shuffledWords))
        dispatch(updateState(initialState))
        dispatch(updateLink(inputLink))
      } else {
        message.current.innerText = "Your datasheet is empty!"
        message.current.classList.remove("hidden")
      }
    } catch (error) {
      message.current.innerText = "Failed to generate flashcards from your datasheet!"
      message.current.classList.remove("hidden")
    }
  }

  const latestLink = () => {
    const newLink = link || DEFAULT_DATASHEET_LINK
    input.current.value = newLink
    message.current.classList.add("hidden")
  }

  const checkInput = () => {
    message.current.classList.add("hidden")
  }

  const handleKeydown = ({ code }) => {
    if (code === "Enter" || code === "NumpadEnter") {
      fetchData()
    }
  }

  return (
    <div className="shape-small grid-home w-3/4 gap-8 rounded-lg bg-white/90 p-8 shadow-2xl transition duration-300 ease-in-out dark:bg-slate-900/90">
      <div className="min-h-96 z-10 w-full overflow-hidden rounded-lg  shadow-2xl">
        <div className="hero"></div>
      </div>
      <div className="z-10 flex flex-col items-center justify-center rounded-lg bg-white/90 p-8 text-center shadow-2xl dark:bg-slate-900/90">
        <h1 className="text-5xl font-bold capitalize text-blue-400">
          {language === "english" ? "Learning vocabs in a softer way!" : "Học từ vựng bằng một cách đơn giản hơn!"}
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          {language === "english"
            ? "This website will generate more attractive flashcards from your datasheet! Hope you enjoy it!"
            : "Website này sẽ giúp các thẻ từ vựng được tạo ra từ dữ liệu của bạn trở nên thu hút hơn! Hi vọng bạn sẽ thích chúng!"}
        </p>
        <button
          onClick={latestLink}
          className="mt-4 w-full cursor-pointer rounded-lg bg-blue-400 p-4 text-sm font-bold uppercase text-white transition-all hover:bg-blue-500 dark:bg-blue-600 dark:text-blue-200 dark:hover:bg-blue-700"
        >
          {language === "english"
            ? link
              ? "Use your latest datasheet link"
              : "Use sample datasheet link"
            : link
            ? "Dùng đường dẫn dữ liệu gần đây nhất"
            : "Dùng đường dẫn dữ liệu mẫu"}
        </button>
        <input
          onChange={checkInput}
          onKeyDown={handleKeydown}
          ref={input}
          className="mt-4 w-full rounded-lg border-2 border-blue-300 p-4 text-gray-400 focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-blue-200"
          type="text"
          placeholder={
            language === "english"
              ? "Enter your datasheet link here..."
              : "Nhập đường dẫn đến dữ liệu của bạn tại đây..."
          }
        />
        <p ref={message} className="mt-2 hidden self-start text-sm font-bold italic text-red-500">
          {language === "english"
            ? "Failed to generate flashcards from your datasheet!"
            : "Không thể tạo các thẻ từ vựng từ dữ liệu của bạn!"}
        </p>
        <button
          onClick={fetchData}
          className="mt-4 w-full cursor-pointer rounded-lg bg-blue-400 px-8 py-4 text-2xl font-bold uppercase text-white transition-all hover:bg-blue-500 dark:bg-blue-600 dark:text-blue-200 dark:hover:bg-blue-700"
        >
          {language === "english" ? "Generate" : "Bắt đầu"}
        </button>
        <div className="flex w-full justify-evenly">
          <a className="mt-4 text-blue-500 underline" href={DEFAULT_DATASHEET_LINK} target="_blank">
            {language === "english" ? "Sample datasheet" : "Dữ liệu mẫu"}
          </a>
          <a className="mt-4 text-blue-500 underline" href="https://facebook.com/phamthehien0410" target="_blank">
            {language === "english" ? "Any question?" : "Tìm hiểu thêm?"}
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home
