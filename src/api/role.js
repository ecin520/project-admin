import request from '../utils/request'

export function listAllRoles(pageNum, pageSize) {
  return request({
    url: '/admin/Role/listAllRoles',
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

export function updateByUserId(role) {
  return request({
    url: '/admin/Role/updateByRoleId',
    method: 'post',
    data: role
  })
}

export function insertRole(role) {
  return request({
    url: '/admin/Role/insertRole',
    method: 'post',
    data: role
  })
}

export function countRole() {
  return request({
    url: '/admin/Role/countRole',
    method: 'get'
  })
}

export function deleteByRoleId(id) {
  return request({
    url: '/admin/Role/deleteByRoleId',
    method: 'post',
    params: {id}
  })
}