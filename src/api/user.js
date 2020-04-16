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

export function insertUserRole(userRole) {
  return request({
    url: '/admin/UserRole/insertUserRole',
    method: 'post',
    data: userRole
  })
}

export function deleteByUserRole(userRole) {
  return request({
    url: '/admin/UserRole/deleteByUserRole',
    method: 'post',
    data: userRole
  })
}

export function insertUserAddPermission(userAddPermission) {
  return request({
    url: '/admin/UserAddPermission/insertUserAddPermission',
    method: 'post',
    data: userAddPermission
  })
}

export function deleteByUserAddPermission(userAddPermission) {
  return request({
    url: '/admin/UserAddPermission/deleteByUserAddPermission',
    method: 'post',
    data: userAddPermission
  })
}
