import Vue from 'vue'
import Vuex from 'vuex'
import layout from './modules/layout'
import {getToken, setToken, clearToken, clearSessionId} from '../utils/auth'
import {getUserInfo, setUserInfo, clearUserInfo} from '../utils/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: getToken(),
        auth: false,
        userInfo: getUserInfo()
    },
    getters: {
        isCollapse: state => state.layout.isCollapse,
        getToken: state => state.token,
        getUserInfo: state => state.userInfo
    },
    mutations: {
        setAuth (state, flag) {
            state.auth = flag
        },
        setToken (state, token) {
            state.token = token
            setToken(token)
        },
        clearToken (state) {
            state.token = ''
            clearToken()
        },
        setUserInfo (state, userInfo) {
            state.userInfo = userInfo
            setUserInfo(userInfo)
            state.auth = true
        },
        clearUserInfo (state) {
            clearUserInfo()
            state.auth = false
        }
    },
    actions: {
        login (ctx, {token, userInfo}) {
            ctx.commit('setToken', token)
            ctx.commit('setUserInfo', userInfo)
        },
        logout (ctx) {
            ctx.commit('setAuth', false)
            ctx.commit('clearToken')
            ctx.commit('clearUserInfo')
        }
    },
    modules: {
        layout
    }
})

export default store