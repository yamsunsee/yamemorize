import { useRef, useState, useEffect, useContext } from "react"
import { Context, updateData, updateState } from "../store"
import { Link } from "react-router-dom"
import Result from "./Result"
import Confirm from "./Confirm"

const Word = () => {
  const [{ data, language, audio, state }, dispatch] = useContext(Context)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [isAnswer, setAnswer] = useState(false)
  const [isConfirm, setConfirm] = useState(false)
  const [randomAnswers, setRandomAnswers] = useState([])
  const answers = useRef([])
  const nextButton = useRef()

  useEffect(() => {
    dispatch(updateData())
    dispatch(updateState())
  }, [])

  useEffect(() => {
    setIndex(state.word.index)
    setScore(state.word.score)

    const currentWord = data[state.word.index]?.word
    if (currentWord) {
      if (state.word.answers.includes(currentWord)) {
        setRandomAnswers(state.word.answers)
      } else {
        const newRandomAnswers = chooseRandomAnswers([currentWord])
        dispatch(updateState(newRandomAnswers, "word", "answers"))
      }
    }
  }, [state, data])

  useEffect(() => {
    const previouseAnswer = answers.current[state.word.select]
    if (previouseAnswer) {
      previouseAnswer.click()
    }
  })

  const playAudio = () => {
    if (audio === "autoplay") {
      const audio = new Audio(data[index]?.audio)
      audio.play()
    }
  }

  const handleClick = (event) => {
    if (event.target.classList.contains("before-select")) {
      dispatch(updateState(answers.current.indexOf(event.target), "word", "select"))
      answers.current.map((answer) => {
        answer.classList.remove("before-select", "cursor-pointer")
        answer.classList.add("unselected")
      })
      if (event.target.innerText === data[index].word) {
        event.target.classList.remove("unselected")
        event.target.classList.add("correct")
        event.target.innerText += ` ${data[index].classes || ""} ${data[index].ipa || ""}`

        const newScore = state.word.select !== -1 ? score : score + 3
        dispatch(updateState(newScore, "word", "score"))
      } else {
        event.target.classList.remove("unselected")
        event.target.classList.add("incorrect")
        const correctAnswer = answers.current.find((answer) => answer.innerText === data[index].word)
        correctAnswer.classList.remove("unselected")
        correctAnswer.classList.add("correct")
        correctAnswer.innerText += ` ${data[index].classes || ""} ${data[index].ipa || ""}`

        const newScore = state.word.select !== -1 ? score : score <= 1 ? 0 : score - 1
        dispatch(updateState(newScore, "word", "score"))
      }
      playAudio()
    }

    setAnswer(true)
    nextButton.current.classList.remove("bg-blue-400/50", "dark:bg-blue-600/10", "cursor-default")
    nextButton.current.classList.add(
      "bg-blue-400",
      "dark:bg-blue-600",
      "cursor-pointer",
      "hover:bg-blue-500",
      "dark:hover:bg-blue-700"
    )
  }

  const chooseRandomAnswers = (answers) => {
    if (answers.length === Math.min(4, data.length)) return answers.sort(() => Math.random() - 0.5)
    let randomIndex = Math.floor(Math.random() * data.length)
    let newAnswer = data[randomIndex].word
    while (answers.some((answer) => answer === newAnswer)) {
      randomIndex = Math.floor(Math.random() * data.length)
      newAnswer = data[randomIndex].word
    }
    return chooseRandomAnswers([...answers, newAnswer])
  }

  const nextQuestion = () => {
    if (isAnswer) {
      dispatch(updateState(index + 1, "word", "index"))
      dispatch(updateState(-1, "word", "select"))
      setAnswer(false)
      setRandomAnswers([])
      answers.current.map((answer) => {
        answer.classList.remove("unselected", "correct", "incorrect")
        answer.classList.add("before-select", "cursor-pointer")
      })
      nextButton.current.classList.remove(
        "bg-blue-400",
        "dark:bg-blue-600",
        "cursor-pointer",
        "hover:bg-blue-500",
        "dark:hover:bg-blue-700"
      )
      nextButton.current.classList.add("bg-blue-400/50", "dark:bg-blue-600/10", "cursor-default")
    }
  }

  const restart = () => {
    setIndex(0)
    setScore(0)
    setConfirm(false)
    const shuffledData = [...data].sort(() => Math.random() - 0.5)
    dispatch(updateData(shuffledData))
    localStorage.setItem("y-data", JSON.stringify(shuffledData))
    dispatch(updateState(0, "word", "index"))
    dispatch(updateState(0, "word", "score"))
    dispatch(updateState(-1, "word", "select"))
    dispatch(updateState([], "word", "answers"))
  }

  const handleReset = () => {
    setConfirm(true)
  }

  return (
    <div className="shape-small relative flex h-fit max-h-[54rem] w-1/2 max-w-6xl flex-col items-center justify-center rounded-lg bg-white/90 p-8 text-center shadow-2xl transition duration-300 ease-in-out dark:bg-slate-900/90 2xl:h-full">
      {isConfirm ? <Confirm resolve={restart} reject={() => setConfirm(false)} /> : ""}
      {index === data.length ? <Result trophy={score} restart={restart} /> : ""}
      <Link to="/yamemorize/option/score">
        <div className="absolute top-2 left-2 cursor-pointer text-2xl text-blue-200 transition-all hover:text-blue-50 2xl:text-3xl">
          <ion-icon name="arrow-back-circle"></ion-icon>
        </div>
      </Link>
      <div
        onClick={handleReset}
        className="absolute top-2 right-2 cursor-pointer text-2xl text-blue-200 transition-all hover:text-blue-50 2xl:text-3xl"
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
      <div className="relative mt-4 flex h-full w-full flex-col items-center justify-between rounded-lg bg-white/90 p-8 shadow-2xl dark:bg-slate-900/90">
        <div className="absolute right-2 top-2 flex text-amber-400">
          <span className="text-xl font-bold 2xl:text-2xl">{score}</span>
          <div className="flex items-center text-2xl 2xl:text-3xl">
            <ion-icon name="trophy"></ion-icon>
          </div>
        </div>
        <div className="self-start text-xl font-bold text-gray-400 2xl:text-3xl">
          {language === "english" ? "Choose the word which means" : "Chọn từ vựng có nghĩa là"}
        </div>
        <div className="my-2 text-3xl font-bold text-blue-300 2xl:text-5xl">{data[index]?.meaning}</div>
        <div className="w-full">
          {randomAnswers.length
            ? randomAnswers.map((randomAnswer, index) => {
                return (
                  <div
                    ref={(element) => {
                      answers.current[index] = element
                    }}
                    key={randomAnswers[index]}
                    onClick={handleClick}
                    className="before-select mt-2 flex w-full cursor-pointer items-center rounded-lg border-2 border-gray-300 px-4 py-2 text-left text-xl font-bold text-gray-400 transition-all 2xl:py-4 2xl:text-3xl"
                  >
                    {randomAnswer}
                  </div>
                )
              })
            : ["a", "b", "c", "d"].slice(0, Math.min(4, data?.length)).map((randomAnswer) => {
                return (
                  <div
                    key={randomAnswer}
                    className="before-select mt-2 flex w-full cursor-pointer items-center rounded-lg border-2 border-gray-300 px-4 py-2 text-left text-xl font-bold text-gray-400 transition-all 2xl:py-4 2xl:text-3xl"
                  >
                    {randomAnswer}
                  </div>
                )
              })}
        </div>
      </div>
      <button
        onClick={nextQuestion}
        ref={nextButton}
        className="z-10 mt-4 w-full cursor-default rounded-lg bg-blue-400/50 px-8 py-4 text-2xl font-bold uppercase text-white transition-all dark:bg-blue-600/10 dark:text-blue-200 2xl:py-6 2xl:text-4xl"
      >
        {language === "english" ? "Next" : "Tiếp theo"}
      </button>
    </div>
  )
}

export default Word
