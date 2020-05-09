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
    method: 'get',
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

export function deleteByUserAndRoleId(userId, roleId) {
  return request({
    url: '/admin/UserRole/deleteByUserAndRoleId',
    method: 'get',
    params: {userId, roleId}
  })
}

export function insertUserAdditionalPermission(userAdditionalPermission) {
  return request({
    url: '/admin/UserAdditionalPermission/insertUserAdditionalPermission',
    method: 'post',
    data: userAdditionalPermission
  })
}

export function deleteByUserAndAdditionalPermissionId(userId, additionalPermissionId) {
  return request({
    url: '/admin/UserAdditionalPermission/deleteByUserAndAdditionalPermissionId',
    method: 'get',
    params: {
      userId, additionalPermissionId
    }
  })
}
