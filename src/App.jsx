import { Routes, Route } from "react-router-dom"
import Background from "./components/Background"
import Control from "./components/Control"
import Deck from "./components/Deck"
import Home from "./components/Home"
import Meaning from "./components/Meaning"
import Option from "./components/Option"
import Result from "./components/Result"
import Screen from "./components/Screen"
import Type from "./components/Type"
import Word from "./components/Word"

const App = () => {
  return (
    <div className="bg-main relative flex h-screen w-full select-none items-center justify-center overflow-hidden p-20">
      <Control />
      <Screen />
      <div className="hidden h-full w-full items-center justify-center xl:flex">
        <Routes>
          <Route path="yamemorize" element={<Home />} />
          <Route path="yamemorize/option/*" element={<Option />} />
          <Route path="yamemorize/deck" element={<Deck />} />
          <Route path="yamemorize/word" element={<Word />} />
          <Route path="yamemorize/meaning" element={<Meaning />} />
          <Route path="yamemorize/type" element={<Type />} />
          <Route path="yamemorize/result" element={<Result />} />
          <Route path="yamemorize/*" element={<Background />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
