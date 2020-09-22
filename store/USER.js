export const state = () => ({
    user: null
})

export const mutations = {
    SET_USER: (state, user) => {
        state.user = user
    },

    DELETE_USER: (state) => {
        state.user = null
    }
}

export const getters = {
    GET_USER: state => {
        return state.user
    }
}
