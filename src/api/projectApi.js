import axios from 'axios'

let testFiles = projectId => {
  return axios.post('/api/project/project', {
    projectId: '123'
  })
}

let testDownload = () => {
  return axios.get('/api/download')
}


const api = {
  testFiles,
  testDownload
}

export default api