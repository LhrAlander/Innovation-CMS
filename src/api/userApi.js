import axios from 'axios'

let searchUser = function (userId) {
    return axios.post('/api/user/searchUser', {
        userId: userId
    })
}

let resetPWD = function (user) {
    return axios.post('/api/user/changeUser', user)
}

let userAPI = {
    searchUser,
    resetPWD
}

export default userAPI