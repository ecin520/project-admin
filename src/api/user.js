import request from '../utils/request'

export function listAllUsers(pageNum, pageSize) {
  return request({
    url: '/admin/User/listAllUsers',
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

export function updateByUserId(user) {
  return request({
    url: '/admin/User/updateByUserId',
    method: 'post',
    data: user
  })
}

export function insertUser(user) {
  return request({
    url: '/admin/User/insertUser',
    method: 'post',
    data: user
  })
}

export function countUser() {
  return request({
    url: '/admin/User/countUser',
    method: 'get'
  })
}

export function deleteByUserId(id) {
  return request({
    url: '/admin/User/deleteByUserId',
    method: 'post',
    params: {id}
  })
}

