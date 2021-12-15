// 加载次数，每调用request一次就让其+1，用于一个页面中有多次请求，只执行一次wx.hideLoading()
let loadTimes = 0
export const request = (params) =>{
  loadTimes++
  // 每次请求时展示加载页面
  wx.showLoading({
    title: '加载中',
  })

  let baseURL = ''
  return new Promise((resolve,reject) => {
    wx.request({
      ...params,
      url: baseURL + params.url,
      success:(res) => {
        resolve(res)
      },
      file:(err) =>{
        reject(err)
      },
      complete:() => {
        // 判断loadTime，等于0时触发
        loadTimes--
        if(loadTimes === 0){
          wx.hideLoading()
        }
      }
    });
  })
}