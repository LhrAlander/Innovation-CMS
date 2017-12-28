import axios from 'axios'

let searchUser = function (userId) {
    return axios.post('/api/searchUser', {
        userId: userId
    })
}

let resetPWD = function (user) {
    return axios.post('/api/changeUser', user)
}

let userAPI = {
    searchUser,
    resetPWD
}

export default userAPI