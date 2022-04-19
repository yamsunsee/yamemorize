import { TOGGLE_LANGUAGE, UPDATE_DATA, UPDATE_STATE, UPDATE_LINK } from "./Constants"

export const changeLanguage = (payload) => ({
  type: TOGGLE_LANGUAGE,
  payload,
})

export const updateData = (payload) => ({
  type: UPDATE_DATA,
  payload,
})

export const updateState = (payload, option, key) => ({
  type: UPDATE_STATE,
  option,
  key,
  payload,
})

export const updateLink = (payload) => ({
  type: UPDATE_LINK,
  payload,
})
