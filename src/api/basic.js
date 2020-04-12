import request from '../utils/request'

export function login(username, password, code) {
  return request({
    url: '/common/login',
    method: 'post',
    params: {
      username,
      password,
      code
    }
  })
}

export function register(userInfo) {
  return request({
    url: '/admin/User/updateByUserId',
    method: 'post',
    params: userInfo
  })
}