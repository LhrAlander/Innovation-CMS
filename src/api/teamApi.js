import axios from 'axios'

//  获取所有团队 
let getAllTeams = () => {
  return axios.get('/api/team/teams')
}

export default {
  getAllTeams
}