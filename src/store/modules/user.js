import UserService from '@/services/UserService.js'
export const namespaced = true

export const state = {
  users: [],
  usersTotal: 0,
  user: {},
  perPage: 6,
  search: '',
  sortBy: 'username',
  orderDirection: 'asc',
}

export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
  SET_USERS_TOTAL(state, usersTotal) {
    state.usersTotal = usersTotal
  },
  SET_USER(state, user) {
    state.user = user
  },
  SET_SEARCH(state, search) {
    state.search = search
  },
  SET_ORDER_BY(state, orderBy) {
    state.orderBy = orderBy
  },

  SET_ORDER_DIRECTION(state, orderDirection) {
    state.orderDirection = orderDirection
  },
}

export const actions = {
  fetchUsers({ commit, state }, { page }) {
    return UserService.getUsers(state.perPage, page).then((response) => {
      commit('SET_USERS_TOTAL', parseInt(response.headers['x-total-count']))
      commit('SET_USERS', response.data)
    })
  },
  fetchUser({ commit, getters, state }, id) {
    if (id == state.user.id) {
      return state.user
    }

    var user = getters.getUserById(id)

    if (user) {
      commit('SET_USER', user)
      return user
    } else {
      return UserService.getUser(id).then((response) => {
        commit('SET_USER', response.data)
        return response.data
      })
    }
  },
  search({ commit }, search) {
    commit('SET_SEARCH', search)
  },
  updateOrderBy({ commit, state, dispatch }, data) {
    commit('SET_ORDER_BY', data)
    dispatch('orderUsers', {
      order: state.orderBy,
      direction: state.orderDirection,
    })
  },

  updateOrderDirection({ commit }, data) {
    commit('SET_ORDER_DIRECTION', data)
  },

  orderUsers({ commit, state }, data) {
    let localUsers = state.users

    switch (data.order) {
      case 'username':
        localUsers.sort(function (a, b) {
          if (data.direction == 'desc') {
            return a.username == b.username
              ? 0
              : a.username < b.username
              ? 1
              : -1
          } else {
            return a.username == b.username
              ? 0
              : a.username > b.username
              ? 1
              : -1
          }
        })
        break
      case 'location':
        localUsers.sort(function (a, b) {
          if (data.direction == 'desc') {
            return a.location == b.location
              ? 0
              : a.location < b.location
              ? 1
              : -1
          } else {
            return a.location == b.location
              ? 0
              : a.location > b.location
              ? 1
              : -1
          }
        })
        break
    }

    commit('SET_USERS', localUsers)
  },
}
export const getters = {
  getUserById: (state) => (id) => {
    return state.users.find((user) => user.id === id)
  },
  getUserBySearch: (state) => {
    return state.users.filter((user) => {
      return (
        user.username.toLowerCase().indexOf(state.search.toLowerCase()) > -1
      )
    })
  },
  getOrderBy(state) {
    return state.orderBy
  },

  getOrderDirection(state) {
    return state.orderDirection
  },
}
