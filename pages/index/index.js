// index.js
// 获取应用实例
const app = getApp()
import {
  request
} from '../../request/request'
Page({
  data: {
    // 空气质量
    airText: '请求中',
    // 城市
    city: '请求中',
    // 地区
    area: '请求中',
    airValue: '请求中',
    weather: '请求中',
    weatherAdvice: '请求中'
  },
  onLoad() {
    this.getWeather()
  },
  getWeather() {
    const that = this
    wx.getLocation({
      type: "wgs84",
      success(res) {
        const latitude = res.latitude; // 纬度
        const longitude = res.longitude; // 经度
        const key = "879ca4bc3cac4d74b5924dd1d9411280"; // 和风天气请求的key
        // 发起天气请求
        // 获取天气数据的api接口地址
        request({
          url: `https://free-api.qweather.com/s6/weather/now?location=${longitude},${latitude}&key=${key}`
        }).then(res => {
          console.log(res)
          if (!res) return
          const {
            basic,
            now
          } = res.data.HeWeather6[0];
          that.setData({
            area: basic.location,
            city: basic.parent_city,
            weather: now.cond_txt
          })
        })
        // 发起空气质量请求
        request({
          url: `https://devapi.qweather.com/v7/air/now?location=${longitude},${latitude}&key=${key}`
        }).then(res => {
          if (!res) return
          that.setData({
            airText: res.data.now.category,
            airValue: res.data.now.aqi
          })
        })
        // // 新版接口返回的是json数据,直接取
        // 生活指数请求
        request({
          url: `https://devapi.qweather.com/v7/indices/1d?type=3&location=${longitude},${latitude}&key=${key}`
        }).then(res => {
          if (!res) return
          that.setData({
            weatherAdvice: res.data.daily[0].category + ", " + res.data.daily[0].text
          })
        })
      },
    });
  }
})
