<template>
  <div>
    <div class="pad">
      <label class="filter-label">Order By: </label>
      <select v-model="orderBy">
        <option value="username">Username</option>
        <option value="location">Location</option>
      </select>
    </div>
    <UserCard v-for="user in getUserBySearch" :key="user.id" :user="user" />

    <template v-if="page != 1">
      <router-link
        :to="{ name: 'user-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page</router-link
      >
      <template v-if="hasNextPage"> | </template>
    </template>
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'user-list', query: { page: page + 1 } }"
      rel="next"
    >
      Next Page</router-link
    >
  </div>
</template>

<script>
import UserCard from '@/components/UserCard.vue'
import { mapState, mapGetters } from 'vuex'
import store from '@/store/store'

function getPageUsers(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1
  store
    .dispatch(
      'user/fetchUsers',
      {
        page: currentPage,
      },
      { root: true }
    )
    .then(() => {
      routeTo.params.page = currentPage
      next()
    })
}

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    UserCard,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageUsers(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageUsers(routeTo, next)
  },
  computed: {
    search() {
      return this.$store.getters.getUserBySearch
    },
    orderBy: {
      set(orderBy) {
        this.$store.dispatch('user/updateOrderBy', orderBy)
      },

      get() {
        return this.$store.getters.getOrderBy
      },
      orderDirection() {
        return this.$store.getters.getOrderDirection
      },
    },

    hasNextPage() {
      return this.user.usersTotal > this.page * this.user.perPage
    },
    ...mapState(['user', 'users']),
    ...mapGetters(
      'user',
      ['getUserBySearch'],
      ['getOrderBy'],
      ['getOrderDirection']
    ),
  },
}
</script>


<style scoped>
.pad {
  padding-block: 20px;
}
</style>