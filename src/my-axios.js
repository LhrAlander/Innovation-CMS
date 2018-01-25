import axios from 'axios'

// download url
const downloadUrl = url => {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

// Add a response interceptor
axios.interceptors.response.use(res => {
  console.log(res, res.headers)
  // 处理excel文件
  if (res.headers && (res.headers['content-type'] === 'application/x-msdownload' || res.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    downloadUrl(res.request.responseURL)
    return
  }
}, error => {
  // Do something with response error
  console.log(error)
  return Promise.reject(error.response.data || error.message)
})

export default axios