import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    name: localStorage.getItem('name') || null,
    username: localStorage.getItem('username') || null,
    image: localStorage.getItem('image') || null,
    phoneNumber: localStorage.getItem('phoneNumber') || null,
    listUser: [],
    friendList: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      state.userId = payload.id
      state.name = payload.name
      state.username = payload.username
      state.image = payload.image
      state.phoneNumber = payload.phoneNumber
    },
    setListUser (state, payload) {
      state.listUser = payload
    },
    setLocation (state, payload) {
      state.location = payload
    }
  },
  actions: {
    interceptorsResponse (context) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        console.log(error.response.data.result.message)
        if (error.response.status === 401) {
          console.log(error.response)
          if (error.response.data.result.message === 'invalid token') {
            context.commit('setToken', null)
            localStorage.removeItem('token')
            router.push('/login')
            alert('maaf anda tidak boleh merubah token dengan sendirinya')
          } else if (error.response.data.result.message === 'token expired') {
            context.commit('setToken', null)
            localStorage.removeItem('token')
            router.push('/login')
            alert('maaf session habis silahkan login kembali')
          }
        }
        return Promise.reject(error)
      })
    },
    interceptorsRequest (context) {
      axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers.Authorization = `Bearer ${context.state.token}`
        return config
      }, function (error) {
        // Do something with request error
        return Promise.reject(error)
      })
    },
    registerUser (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_URL}/users/register/`, payload)
          .then((res) => {
            // console.log(res)
            resolve(res.result)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_URL}/users/login/`, payload)
          .then((res) => {
            const result = res.data.result
            console.log('isi result login', result)
            localStorage.setItem('token', result.token)
            localStorage.setItem('id', result.id)
            context.commit('setUser', result)
            resolve(result)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    // getAllUser (context, payload) {
    //   return new Promise((resolve, reject) => {
    //     axios.get(`${process.env.VUE_APP_BASE_URL}/users/`, payload)
    //       .then((res) => {
    //         const result = res.data.result
    //         console.log('user', result)
    //         context.commit('SET_USER', result)
    //         // context.commit('SET_FRIENDS',result)
    //         resolve(result)
    //       })
    //       .catch((err) => {
    //         reject(err)
    //       })
    //   })
    // },
    getFriendsById (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_BASE_URL}/users/friends/${localStorage.getItem('id')}`,payload)
          .then((res) => {
            const result = res.data.result
            console.log('isi get by id', result)
            context.commit('SET_FRIENDS', result.users)
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
  getters: {
    isLogin (state) {
      return state.token !== null
    },
    listUser (state) {
      return state.listUser
    },
    token (state) {
      return state.token
    },
    getUserId (state) {
      return state.userId
    },
    getFriendsById(state) {
      return state.FriendsById
    },
    name (state) {
      return state.name
    },
    username (state) {
      return state.username
    },
    image (state) {
      return state.image
    },
    phoneNumber (state) {
      return state.phoneNumber
    }
  },
  modules: {
  }
})
