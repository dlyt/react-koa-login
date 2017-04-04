import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwtDecode from 'jwt-decode'
import * as types from './types'

export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthorizationToken(false)
    dispatch(setCurrentUser({}))
  }
}

export function login(user) {
  return dispatch => {
    return axios.post('/api/auth', user).then(res => {
      const token = res.data.token
      localStorage.setItem('jwtToken', token)
      setAuthorizationToken(token)
      dispatch(setCurrentUser(jwtDecode(token)))
    })
  }
}
