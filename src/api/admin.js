import request from '../utils/request'

export function listAllRolesById(id) {
  return request({
    url: '/admin/listAllRoles',
    method: 'post',
    params: {id}
  })
}

export function listAllAddPermissionsById(id) {
  return request({
    url: '/admin/listUserAddPermissions',
    method: 'post',
    params: {id}
  })
}

export function listRolePermissions(id) {
  return request({
    url: '/admin/listRolePermissions',
    method: 'post',
    params: {id}
  })
}

export function listAllWebLogs() {
  return request({
    url: '/admin/WebLog/listAllWebLogs',
    method: 'get'
  })
}

export function deleteAllWebLogs() {
  return request({
    url: '/admin/WebLog/deleteAllWebLogs',
    method: 'get'
  })
}

export function listAllErrorLogs() {
  return request({
    url: '/admin/WebLog/listAllErrorLogs',
    method: 'get'
  })
}

export function deleteAllErrorLogs() {
  return request({
    url: '/admin/WebLog/deleteAllErrorLogs',
    method: 'get'
  })
}


