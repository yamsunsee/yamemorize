import { useRef, useState, useEffect, useContext } from "react"
import { Context, updateData, updateState } from "../store"
import { Link } from "react-router-dom"
import Confirm from "./Confirm"

const Deck = () => {
  const [{ data, language, audio, state }, dispatch] = useContext(Context)
  const [index, setIndex] = useState()
  const [isConfirm, setConfirm] = useState(false)
  const card = useRef()

  useEffect(() => {
    dispatch(updateData())
    dispatch(updateState())
  }, [])

  useEffect(() => {
    setIndex(state.deck.index)
  }, [state])

  useEffect(() => {
    if (audio === "autoplay") {
      playAudio()
    }
  }, [index])

  const playAudio = (event) => {
    event?.stopPropagation()
    const audio = new Audio(data[index]?.audio)
    audio.play()
  }

  const nextCard = () => {
    const newIndex = index === data.length - 1 ? 0 : index + 1
    if (card.current.classList.contains("flip")) {
      card.current.classList.remove("flip")
      setTimeout(() => {
        dispatch(updateState(newIndex, "deck", "index"))
      }, 100)
    } else {
      dispatch(updateState(newIndex, "deck", "index"))
    }
  }

  const flipCard = () => {
    card.current.classList.toggle("flip")
  }

  const restart = () => {
    setConfirm(false)
    if (card.current.classList.contains("flip")) {
      card.current.classList.remove("flip")
      setTimeout(() => {
        dispatch(updateState(0, "deck", "index"))
      }, 100)
    } else {
      dispatch(updateState(0, "deck", "index"))
    }
    const shuffledData = [...data].sort(() => Math.random() - 0.5)
    dispatch(updateData(shuffledData))
  }

  return (
    <div className="shape relative flex h-full max-h-[54rem] w-1/2 max-w-2xl flex-col items-center justify-center rounded-lg bg-white/90 p-8 text-center shadow-2xl transition duration-300 ease-in-out dark:bg-slate-900/90">
      {isConfirm ? <Confirm resolve={restart} reject={() => setConfirm(false)} isShuffle={true} /> : ""}
      <Link to="/yamemorize/option/scan">
        <div className="absolute top-2 left-2 cursor-pointer text-2xl text-blue-200 transition-all hover:text-blue-50 2xl:text-3xl">
          <ion-icon name="arrow-back-circle"></ion-icon>
        </div>
      </Link>
      <div
        onClick={() => setConfirm(true)}
        className="absolute top-2 right-2 cursor-pointer text-2xl text-blue-200 transition-all hover:text-blue-50 2xl:text-3xl"
      >
        <ion-icon name="reload-circle"></ion-icon>
      </div>
      <div className="grid-progress flex w-full items-center ">
        <div
          className="progress mr-2 h-4 w-full overflow-hidden rounded-lg bg-blue-200"
          style={{ "--data": `${((index + 1) * 100) / data.length}%` }}
        ></div>
        <div className="z-10 font-bold text-blue-100">
          {index + 1}/{data.length}
        </div>
      </div>
      <div className="card h-full w-full" onClick={flipCard}>
        <div ref={card} className="card-container relative h-full w-full transition duration-1000 ease-out">
          <div className="card-front absolute mt-2 grid h-full w-full grid-rows-2 overflow-hidden rounded-lg bg-white/90 shadow-2xl dark:bg-slate-900/90">
            <div>
              <img className="h-full w-full object-cover" src={data[index]?.image} alt="image" />
            </div>
            <div className="relative flex flex-col items-center justify-center p-4">
              <div className="text-3xl font-bold uppercase text-red-400 2xl:text-4xl">{data[index]?.word}</div>
              <div className="flex items-center text-xl italic text-gray-400 dark:text-blue-200 2xl:text-2xl">
                <span className="mr-2 font-bold">{data[index]?.classes}</span>
                <span className="mr-2">{data[index]?.ipa}</span>
                <span
                  onClick={playAudio}
                  className="absolute right-2 bottom-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-400 transition-all hover:bg-blue-400 hover:text-white dark:bg-blue-300 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-blue-200 2xl:h-10 2xl:w-10 2xl:text-3xl"
                >
                  <ion-icon name="volume-medium"></ion-icon>
                </span>
              </div>
            </div>
          </div>
          <div className="card-back absolute mt-2 grid h-full w-full grid-rows-2 overflow-hidden rounded-lg bg-white/90 shadow-2xl dark:bg-slate-900/90">
            <div className="relative flex flex-col items-center justify-center border-b-2 border-gray-200 p-4 dark:border-gray-500">
              <div className="text-3xl font-bold uppercase text-red-400 2xl:text-4xl">{data[index]?.word}</div>
              <div className="flex items-center text-xl italic text-gray-400 dark:text-blue-200 2xl:text-2xl">
                <span className="mr-2 font-bold">{data[index]?.classes}</span>
                <span className="mr-2">{data[index]?.ipa}</span>
                <span
                  onClick={playAudio}
                  className="absolute right-2 bottom-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-400 transition-all hover:bg-blue-400 hover:text-white dark:bg-blue-300 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-blue-200 2xl:h-10 2xl:w-10 2xl:text-3xl"
                >
                  <ion-icon name="volume-medium"></ion-icon>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center p-4 text-3xl font-bold text-blue-300 2xl:text-4xl">
              {data[index]?.meaning}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={nextCard}
        className="z-10 mt-4 w-full cursor-pointer rounded-lg bg-blue-400 px-8 py-4 text-2xl font-bold uppercase text-white transition-all hover:bg-blue-500 dark:bg-blue-600 dark:text-blue-200 dark:hover:bg-blue-700 2xl:py-6 2xl:text-4xl"
      >
        {language === "english"
          ? index === data.length - 1
            ? "Again"
            : "Next"
          : index === data.length - 1
          ? "Xem lại"
          : "Tiếp tục"}
      </button>
    </div>
  )
}

export default Deck
