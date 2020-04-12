export default {
    state: {
        isCollapse: false
    },
    mutations: {
        collapse(state) {
            state.isCollapse = !state.isCollapse
        }
    },
    actions: {
        collapse(ctx) {
            ctx.commit('collapse')
        }
    }
}