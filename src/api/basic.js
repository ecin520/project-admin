import request from '../utils/request'

export function login(username, password, code) {
  return request({
    url: '/common/login',
    method: 'get',
    params: {username, password, code}
  })
}
