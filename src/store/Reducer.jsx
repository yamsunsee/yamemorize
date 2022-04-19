import { TOGGLE_LANGUAGE, UPDATE_DATA, UPDATE_LINK, UPDATE_STATE } from "./Constants"

export const initialState = {
  language: "english",
  data: [],
  state: {
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
      checked: false,
    },
  },
}

export const reducer = (previousState, action) => {
  switch (action.type) {
    case TOGGLE_LANGUAGE:
      return {
        ...previousState,
        language: action.payload,
      }

    case UPDATE_DATA:
      const newData = action.payload || JSON.parse(localStorage.getItem("y-data"))
      if (action.payload) {
        localStorage.setItem("y-data", JSON.stringify(newData))
      }
      return {
        ...previousState,
        data: newData,
      }

    case UPDATE_STATE:
      let newState = action.payload || JSON.parse(localStorage.getItem("y-state"))
      if (action.option) {
        const { option, key, payload } = action
        newState = {
          ...previousState.state,
          [option]: {
            ...previousState.state[option],
            [key]: payload,
          },
        }
      }
      localStorage.setItem("y-state", JSON.stringify(newState))
      return {
        ...previousState,
        state: newState,
      }

    case UPDATE_LINK:
      const newLink = action.payload || JSON.parse(localStorage.getItem("y-link"))
      if (action.payload) {
        localStorage.setItem("y-link", JSON.stringify(newLink))
      }
      return {
        ...previousState,
        link: newLink,
      }

    default:
      break
  }
}
