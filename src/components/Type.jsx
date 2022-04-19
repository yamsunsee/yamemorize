import { useRef, useState, useEffect, useContext } from "react"
import { Context, updateData, updateState } from "../store"
import { Link } from "react-router-dom"
import Result from "./Result"

const Type = () => {
  const [{ data, language, state }, dispatch] = useContext(Context)
  const [index, setIndex] = useState()
  const [score, setScore] = useState()
  const [checked, setChecked] = useState("unchecked")
  const [isAudioPlay, setIsAudioPlay] = useState(false)
  const fare = useRef()
  const answer = useRef()
  const checkButton = useRef()
  const overlayImage = useRef()
  const overlayAnswer = useRef()
  const nextButton = useRef()

  useEffect(() => {
    dispatch(updateData())
    dispatch(updateState())
  }, [])

  useEffect(() => {
    setIndex(state.type.index)
    setScore(state.type.score)

    answer.current.value = state.type.answer
    answer.current.focus()

    if (state.type.image) {
      overlayImage.current.classList.add("hidden")
    }

    if (state.type.audio) {
      fare.current.classList.add("hidden")
      setIsAudioPlay(true)
    }
  }, [state, data])

  useEffect(() => {
    if (state.type.checked) {
      checkButton.current.click()
    }
  }, [index])

  const nextQuestion = () => {
    if (checked !== "unchecked") {
      dispatch(updateState(index + 1, "type", "index"))
      dispatch(updateState(false, "type", "image"))
      dispatch(updateState(false, "type", "audio"))
      dispatch(updateState(false, "type", "checked"))
      dispatch(updateState("", "type", "answer"))
      nextButton.current.classList.remove(
        "bg-blue-400",
        "dark:bg-blue-600",
        "cursor-pointer",
        "hover:bg-blue-500",
        "dark:hover:bg-blue-700"
      )
      nextButton.current.classList.add("bg-blue-400/50", "dark:bg-blue-600/10", "cursor-default")
    }
    newQuestion()
  }

  const showImage = (fare = true) => {
    if (fare) {
      const newScore = score <= 1 ? 0 : score - 1
      dispatch(updateState(newScore, "type", "score"))
      dispatch(updateState(true, "type", "image"))
    }
    overlayImage.current.classList.add("hidden")
  }

  const showAnswer = () => {
    overlayAnswer.current.classList.add("flex")
    overlayAnswer.current.classList.remove("hidden")
  }

  const checkAnswer = (event) => {
    if (event.target.innerText.toLowerCase() === "check" || event.target.innerText.toLowerCase() === "kiểm tra") {
      event.target.classList.remove(
        "bg-blue-300",
        "hover:bg-blue-400",
        "dark:bg-blue-500",
        "dark:hover:bg-blue-600",
        "cursor-pointer"
      )
      event.target.classList.add("bg-blue-400", "dark:bg-blue-600")
      const answerValue = answer.current.value.trim()
      dispatch(updateState(answerValue, "type", "answer"))
      dispatch(updateState(true, "type", "checked"))
      if (answerValue === data[index].word) {
        setChecked("correct")
        answer.current.classList.add("correct")

        const newScore = state.type.checked ? score : score + 3
        dispatch(updateState(newScore, "type", "score"))
      } else {
        setChecked("incorrect")
        answer.current.classList.add("incorrect")

        const newScore = state.type.checked > 0 ? score : score <= 1 ? 0 : score - 1
        dispatch(updateState(newScore, "type", "score"))
      }
      showImage(false)
      showAnswer()
    }

    nextButton.current.classList.remove("bg-blue-400/50", "dark:bg-blue-600/10", "cursor-default")
    nextButton.current.classList.add(
      "bg-blue-400",
      "dark:bg-blue-600",
      "cursor-pointer",
      "hover:bg-blue-500",
      "dark:hover:bg-blue-700"
    )
  }

  const playAudio = () => {
    if (!isAudioPlay) {
      const newScore = state.type.audio ? score : score <= 2 ? 0 : score - 2
      dispatch(updateState(newScore, "type", "score"))
      fare.current.classList.add("hidden")
      setIsAudioPlay(true)
    }
    playAudioFree()
    dispatch(updateState(true, "type", "audio"))
  }

  const playAudioFree = () => {
    const audio = new Audio(data[index].audio)
    audio.play()
  }

  const saveAnswer = (event) => {
    dispatch(updateState(event.target.value, "type", "answer"))
  }

  const newQuestion = () => {
    overlayImage.current.classList.remove("hidden")
    overlayAnswer.current.classList.add("hidden")
    answer.current.value = ""
    answer.current.classList.remove("correct", "incorrect")
    answer.current.focus()
    checkButton.current.classList.remove("bg-blue-400", "dark:bg-blue-600")
    checkButton.current.classList.add(
      "bg-blue-300",
      "hover:bg-blue-400",
      "dark:bg-blue-500",
      "dark:hover:bg-blue-600",
      "cursor-pointer"
    )
    fare.current.classList.remove("hidden")
    setIsAudioPlay(false)
    setChecked("unchecked")
  }

  const restart = () => {
    setIndex(0)
    setScore(0)
    const shuffledData = [...data].sort(() => Math.random() - 0.5)
    dispatch(updateData(shuffledData))
    localStorage.setItem("y-data", JSON.stringify(shuffledData))
    nextButton.current.classList.add("bg-blue-400/50", "dark:bg-blue-600/10", "cursor-default")
    nextButton.current.classList.remove(
      "bg-blue-400",
      "dark:bg-blue-600",
      "cursor-pointer",
      "hover:bg-blue-500",
      "dark:hover:bg-blue-700"
    )
    newQuestion()
    dispatch(updateState(0, "type", "index"))
    dispatch(updateState(0, "type", "score"))
    dispatch(updateState(false, "type", "image"))
    dispatch(updateState(false, "type", "audio"))
    dispatch(updateState(false, "type", "checked"))
    dispatch(updateState("", "type", "answer"))
  }

  return (
    <div className="shape-small relative flex w-1/2 flex-col items-center justify-center rounded-lg bg-white/90 p-8 text-center shadow-2xl transition duration-300 ease-in-out dark:bg-slate-900/90">
      {index === data.length ? <Result trophy={score} restart={restart} /> : ""}
      <Link to="/yamemorize/option/score">
        <div className="absolute top-2 left-2 cursor-pointer text-2xl text-blue-200 transition-all hover:text-blue-50">
          <ion-icon name="arrow-back-circle"></ion-icon>
        </div>
      </Link>
      <div
        onClick={restart}
        className="absolute top-2 right-2 cursor-pointer text-2xl text-blue-200 transition-all hover:text-blue-50"
      >
        <ion-icon name="reload-circle"></ion-icon>
      </div>
      <div className="grid-progress flex w-full items-center">
        <div
          className="progress mr-2 h-4 w-full overflow-hidden rounded-lg bg-blue-200"
          style={{ "--data": `${((index + 1) * 100) / data.length}%` }}
        ></div>
        <div className="z-10 font-bold text-blue-200">
          {index + 1}/{data.length}
        </div>
      </div>
      <div className="relative mt-4 flex w-full flex-col items-center justify-between rounded-lg bg-white/90 p-8 shadow-2xl dark:bg-slate-900/90">
        <div className="absolute right-2 top-2 flex items-center text-2xl text-amber-400">
          <span className="text-xl font-bold">{score}</span>
          <ion-icon name="trophy"></ion-icon>
        </div>
        <div className="self-start text-xl font-bold text-gray-400">
          {language === "english" ? "Type the word which means" : "Nhập từ vựng có nghĩa là"}
        </div>
        <div className="my-2 text-3xl font-bold text-blue-300">{data[index]?.meaning}</div>
        <div className="mt-2 grid w-full grid-cols-2 gap-2">
          <div className="relative h-64 w-full overflow-hidden rounded-lg border-2 border-blue-300">
            <img className="h-full w-full object-cover" src={data[index]?.image} alt="image" />
            <div
              ref={overlayImage}
              className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-blue-100 p-8 dark:bg-slate-800"
            >
              <div className="absolute top-[-2px] right-[-2px] flex items-center justify-center rounded-lg border-2 border-blue-300 bg-red-100 px-1 py-1 text-red-400 dark:bg-slate-900">
                <div className="text-sm font-bold">-1</div>
                <ion-icon name="trophy"></ion-icon>
              </div>
              <button
                onClick={showImage}
                className="w-full cursor-pointer rounded-lg bg-blue-300 px-4 py-2 font-bold uppercase text-white transition-all hover:bg-blue-400 dark:bg-blue-500 dark:text-blue-200 dark:hover:bg-blue-600"
              >
                {language === "english" ? "Show image" : "Xem hình ảnh"}
              </button>
            </div>
          </div>
          <div className="grid w-full grid-rows-2">
            <div className="relative flex items-center justify-center overflow-hidden rounded-lg border-2 border-blue-300 bg-blue-100 p-8 dark:bg-slate-800">
              <div
                ref={fare}
                className="absolute top-[-2px] right-[-2px] flex items-center justify-center rounded-lg border-2 border-blue-300 bg-red-100 px-1 py-1 text-red-400 dark:bg-slate-900"
              >
                <div className="text-sm font-bold">-2</div>
                <ion-icon name="trophy"></ion-icon>
              </div>
              <button
                onClick={playAudio}
                className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-blue-300 px-4 py-2 font-bold uppercase text-white transition-all hover:bg-blue-400 dark:bg-blue-500 dark:text-blue-200 dark:hover:bg-blue-600"
              >
                <div className="mr-2">{language === "english" ? "Listen" : "Nghe"}</div>
                <ion-icon name="volume-medium"></ion-icon>
              </button>
              <div
                ref={overlayAnswer}
                className="rounder-lg absolute top-0 left-0 hidden h-full w-full flex-col items-center justify-center bg-white p-4 dark:bg-slate-900"
              >
                <div className="text-2xl font-bold uppercase text-red-400">{data[index]?.word}</div>
                <div className="flex items-center text-xl italic text-gray-400 dark:text-blue-200">
                  <span className="mr-2 font-bold">{data[index]?.classes}</span>
                  <span className="mr-2">{data[index]?.ipa}</span>
                  <span
                    onClick={playAudioFree}
                    className="absolute right-2 bottom-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-400 transition-all hover:bg-blue-400 hover:text-white dark:bg-blue-300 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-blue-200"
                  >
                    <ion-icon name="volume-medium"></ion-icon>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2 grid grid-rows-2 gap-2">
              <input
                onInput={saveAnswer}
                ref={answer}
                readOnly={checked !== "unchecked"}
                className="h-full w-full rounded-lg border-2 border-blue-300 px-4 py-2 font-bold text-gray-400 focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-blue-200"
                type="text"
                placeholder={language === "english" ? "Type your answer here..." : "Nhập đáp án ở đây..."}
              />
              <div
                ref={checkButton}
                onClick={checkAnswer}
                className="flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-blue-300 text-xl font-bold uppercase text-white transition-all hover:bg-blue-400 dark:bg-blue-500 dark:text-blue-200 dark:hover:bg-blue-600"
              >
                {language === "english"
                  ? checked === "unchecked"
                    ? "Check"
                    : checked
                  : checked === "unchecked"
                  ? "Kiểm tra"
                  : checked === "correct"
                  ? "Chính xác"
                  : "Không chính xác"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={nextQuestion}
        ref={nextButton}
        className="z-10 mt-4 w-full cursor-default rounded-lg bg-blue-400/50 px-8 py-4 text-2xl font-bold uppercase text-white transition-all dark:bg-blue-600/10 dark:text-blue-200"
      >
        {language === "english" ? "Next" : "Tiếp theo"}
      </button>
    </div>
  )
}

export default Type
