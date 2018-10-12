const storage = {
  // 设置本地存储
  setLocalStorage (name, value) {
    const curTime = new Date().getTime() + 600 * 60 * 1000
    localStorage.setItem(name, JSON.stringify({
      data: value,
      time: curTime
    }))
  },
  // 获取本地存储
  getLocalStorage (name) {
    const data = localStorage.getItem(name)
    const dataObj = JSON.parse(data)
    if (dataObj) {
      if (new Date().getTime() - dataObj.time > 0) {
        console.log('已过期')
        localStorage.removeItem(name)
        return null
      } else {
        return dataObj.data
      }
    }
  },
  // 删除本地存储
  delLocalStorage (name) {
    localStorage.removeItem('name')
  }
}

export { storage }
