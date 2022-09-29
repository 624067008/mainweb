// vue实例
const vm = new Vue({
  el: '#app',
  mounted() {

    // 旋转导航栏
    const open = document.getElementById('open')
    const close = document.getElementById('close')
    const container = document.querySelector('.one')
    open.addEventListener('click', () => container.classList.add('show-nav'))
    close.addEventListener('click', () => container.classList.remove('show-nav'))


    //获取天气数据
    this.jsonp('https://wis.qq.com/weather/common?callback=vm.myJsonp1h', this.params_1h)
    this.jsonp('https://wis.qq.com/weather/common?callback=vm.myJsonp24h', this.params_24h)
    // 每格10分种获取最新数据
    setInterval(() => {
      this.jsonp('https://wis.qq.com/weather/common?callback=vm.myJsonp1h', this.params_1h)
      this.jsonp('https://wis.qq.com/weather/common?callback=vm.myJsonp24h', this.params_24)
    }, 600000)

    setInterval(() => {
      this.time = this.dateFormat(this.data_1h.update_time)
    }, 1000)


    // 随机根颜色
    this.randomMainColor()
  },
  data: {
    //常用网站数据
    itemlist: [
      {
        imgUrl: 'img/10wmt-master1050-v4.jpg',
        aUrl: "https://www.twitter.com",
        id: '推特'
      },
      {
        imgUrl: 'img/bili.png',
        aUrl: "https://www.bilibili.com/",
        id: 'b站'
      },
      {
        imgUrl: 'img/bili.png',
        aUrl: "https://www.bilibili.com/account/history",
        id: '历史记录'
      },
      {
        imgUrl: 'img/油管.png',
        aUrl: "https://www.youtube.com",
        id: '油管'
      },
      {
        imgUrl: 'img/腾讯视频.png',
        aUrl: "https://v.qq.com/",
        id: '腾讯视频'
      },
      {
        imgUrl: 'img/学习通.jpg',
        aUrl: "http://i.chaoxing.com/base?t=1632306938158",
        id: '学习通'
      },
      {
        imgUrl: 'img/ins.jpg',
        aUrl: "https://www.ikanins.com/",
        id: 'ins美女推荐'
      },
      {
        imgUrl: 'img/抖音.png',
        aUrl: "https://www.douyin.com/",
        id: '抖音'
      },
      {
        imgUrl: 'img/虎牙.jpg',
        aUrl: "https://www.huya.com/",
        id: '虎牙'
      },
      {
        imgUrl: 'img/斗鱼.jpg',
        aUrl: "http://www.douyu.com",
        id: '斗鱼'
      }
    ],
    // 查询1h参数对象
    params_1h: {
      source: 'pc',
      province: '湖南',
      city: '长沙',
      county: '天心区',
      weather_type: 'forecast_1h'
    },

    // 设置获取24小时预测请求参数
    params_24h: {
      source: 'pc',
      province: '湖南',
      city: '长沙',
      county: '天心区',
      weather_type: 'forecast_24h'
    },
    //当前时间
    time: '',
    //1h数据
    data_1h: {},
    data_24h: {},

    //1h状态
    weath1h_open: false,
    weath24h_open: false,

    //调色板
    colorList: ['rgb(83, 59, 215)', 'rgb(0, 204, 255)', 'rgb(0, 47, 168)', 'rgb(254, 51, 107)'],
    // 透明50% 调色板
    colorListO: ['rgba(83, 59, 215,.5)', 'rgba(0, 204, 255,.5)', 'rgba(0, 47, 168,.5)', 'rgba(254, 51, 107,.5)'],
    mainColor2List: [],
    colorIndex: null,
  },
  // mounted() {

  // },
  methods: {
    //jsonp请求函数
    jsonp(url, options) {
      var $script = document.createElement('script')
      // var f = url.indexof('?') > -1 ? '&' : '?'
      // url += f + '_=' + Date.now()
      for (var i in options) {
        url += '&' + i + '=' + options[i]
      }
      $script.src = url
      document.body.appendChild($script)
      $script.onload = function () {
        this.remove()
      }
    },

    // 格式化获取到的时间
    dateFormat(date) {
      let time = new Date()
      var year = date.substr(0, 4)
      var b = date.substr(4, 2)
      var c = this.padzero(time.getDate())
      var d = this.padzero(time.getHours())
      var min = this.padzero(time.getMinutes())
      var second = this.padzero(time.getSeconds())
      return year + '-' + b + '-' + c + ' ' + d + ':' + min + ':' + second
    },
    // 时间补零
    padzero(n) {
      return n > 9 ? n : '0' + n
    },
    // 请求后触发的callback函数
    myJsonp1h(res) {
      this.data_1h = res.data.forecast_1h[0]
      this.time = this.dateFormat(this.data_1h.update_time)
    },
    myJsonp24h(res) {
      this.data_24h = res.data.forecast_24h[1]
    },

    // 打开天气
    openWeather1h() {
      // js实现
      // if (!this.weath1h_open) {
      //   let a = -461
      //   let timer = setInterval(() => {
      //     a -= a / 20
      //     if (a > -2) {
      //       a = 0
      //       this.$refs.weather1h.style.right = a + 'px'
      //       this.$refs.weather1h_er.innerText = '>'
      //       this.weath1h_open = true
      //       clearInterval(timer)
      //     }
      //     this.$refs.weather1h.style.right = a + 'px'
      //   }, 20)
      // }
      // else {
      //   let a = -461, b = 0
      //   let timer = setInterval(() => {
      //     b += a / 20
      //     a -= a / 20
      //     if (a > -2) {
      //       b = -461
      //       this.$refs.weather1h.style.right = b + 'px'
      //       this.$refs.weather1h_er.innerText = '<'
      //       this.weath1h_open = false
      //       clearInterval(timer)
      //     }
      //     this.$refs.weather1h.style.right = b + 'px'
      //   }, 20)
      // }


      if (!this.weath1h_open) {
        this.$refs.weather1h.classList.add('open')
        this.$refs.weather1h_er.innerText = '>'
        this.weath1h_open = true
      } else {
        this.$refs.weather1h.classList.remove('open')
        this.$refs.weather1h_er.innerText = '<'
        this.weath1h_open = false
      }

    },
    openWeather24h() {
      // js实现
      // if (!this.weath24h_open) {
      //   console.log(1);
      //   let a = -461
      //   let timer = setInterval(() => {
      //     a -= a / 20
      //     if (a > -2) {
      //       a = 0
      //       this.$refs.weather24h.style.right = a + 'px'
      //       this.$refs.weather24h_er.innerText = '>'
      //       this.weath24h_open = true
      //       clearInterval(timer)
      //     }
      //     this.$refs.weather24h.style.right = a + 'px'
      //   }, 20)
      // } 
      // else {
      //   let a = -461, b = 0
      //   let timer = setInterval(() => {
      //     b += a / 20
      //     a -= a / 20
      //     if (a > -2) {
      //       b = -461
      //       this.$refs.weather24h.style.right = b + 'px'
      //       this.$refs.weather24h_er.innerText = '<'
      //       this.weath24h_open = false
      //       clearInterval(timer)
      //     }
      //     this.$refs.weather24h.style.right = b + 'px'
      //   }, 20)
      // }


      if (!this.weath24h_open) {
        this.$refs.weather24h.classList.add('open')
        this.$refs.weather24h_er.innerText = '>'
        this.weath24h_open = true
      } else {
        this.$refs.weather24h.classList.remove('open')
        this.$refs.weather24h_er.innerText = '<'
        this.weath24h_open = false
      }

    },
    changeMainColor() {
      const root = document.querySelector(':root')
      this.colorIndex += 1
      this.colorIndex = this.colorIndex >= this.colorList.length ? 0 : this.colorIndex
      root.style.setProperty("--mainColor1", this.colorList[this.colorIndex])
      root.style.setProperty("--mainColor1O", this.colorListO[this.colorIndex])
    },
    randomMainColor() {
      const random = Math.floor(Math.random() * this.colorList.length)
      this.colorIndex = random
      document.querySelector(':root').style.setProperty('--mainColor1', this.colorList[this.colorIndex])
      document.querySelector(':root').style.setProperty('--mainColor1O', this.colorListO[this.colorIndex])
    },
    randomColor() {
      const randomR = Math.ceil(Math.random() * 255);
      const randomG = Math.ceil(Math.random() * 255);
      const randomB = Math.ceil(Math.random() * 255);
      document.querySelector(':root').style.setProperty('--mainColor1', `rgb(${randomR},${randomG},${randomB})`)
      document.querySelector(':root').style.setProperty('--mainColor2', `rgb(${randomB},${randomR},${randomG})`)
      document.querySelector(':root').style.setProperty('--textColor', `rgb(${randomG},${randomB},${randomR})`)
      document.querySelector(':root').style.setProperty('--mainColor1O', `rgba(${randomR},${randomG},${randomB},.5)`)
    }
  },
})