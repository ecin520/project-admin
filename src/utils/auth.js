import Cookies from 'js-cookie'

const key = 'Authorization'

export function getToken() {
  return Cookies.get(key)
}

export function setToken(token) {
  return Cookies.set(key, 'Bearer ' + token)
}

export function clearToken() {
  return Cookies.remove(key)
}

export function clearSessionId() {
  return Cookies.remove('JSESSIONID')
}
