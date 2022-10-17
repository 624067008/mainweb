
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
      this.randomBackGround()
    }, 600000)

    setInterval(() => {
      this.time = this.dateFormat(this.data_1h.update_time)
    }, 1000)


    // 随机根颜色
    this.randomMainColor()
    //随机背景图片
    this.randomBackGround()
    //默认打开天气表
    this.openWeather24h()
    this.openWeather1h()
    //默认开始buxianxhi
    this.switchEle()


    window.addEventListener('dblclick', this.switchEle)
    // 禁止页面文本被选中
    document.onselectstart = () => {
      return false
    }
  },
  data: {
    // 元素是否显示
    switch: false,
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
        aUrl: "https://www.douyu.com",
        id: '斗鱼'
      },
      {
        imgUrl: 'img/是天上飞的.jpeg',
        aUrl: 'https://www.douyin.com/user/MS4wLjABAAAAiaGCCWN_wMB-t9IMeSPQsuK9j7i-WnFhhIHc4LVhNB4',
        id: '是天上飞的'
      },
      {
        imgUrl: 'img/碳烧风见.jpeg',
        aUrl: 'https://www.douyin.com/user/MS4wLjABAAAAlkabI-K_kVM0B1lUXaw9RdLpNhGzHDbzqXyzW1rN7PY',
        id: '碳烧风见'
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
    colorList: ['rgb(53,121,68)', 'rgb(47,89,163)', 'rgb(195,71,154)', 'rgb(188,56,35)', 'rgb(176,31,36)', 'rgb(97,95,116)', 'rgb(0,46,166)', 'rgb(215,0,15)', 'rgb(255,119,15)', 'rgb(53,121,68)',],

    colorListO: ['rgba(53,121,68,.5)', 'rgba(47,89,163,.5)', 'rgba(195,71,154,.5)', 'rgba(188,56,35,.5)', 'rgba(176,31,36,.5)', 'rgba(97,95,116,.5)', 'rgba(0,46,166,.5)', 'rgba(215,0,15,.5)', 'rgba(255,119,15,.5)', 'rgba(53.121,68,.5)',],

    mainColor2List: ['rgb(255,165,0)', 'rgb(244,179,194)', 'rgb(246,172,25)', 'rgb(180,189,160)', 'rgb(28,25,37)', 'rgb(199,147,95)', 'rgb(255,231,143)', 'rgb(241,242,229)', 'rgb(0,0,16)', 'rgb(141,183,153)'],

    mainColor2O: ['rgba(255,165,0,.5)', 'rgba(244,179,194,.5)', 'rgba(246,172,25,.5)', 'rgba(180,189,160,.5)', 'rgba(28,25,37,.5)', 'rgba(199,147,95,.5)', 'rgba(255,231,143,.5)', 'rgba(241,242,229,.5)', 'rgba(0,0,16,.5)', 'rgba(141,183,153,.5)'],
    colorIndex: null,
    imgurls: [
      '9月出现31-寒冰.png',
      'aftershock.png',
      'anime girl.png',
      'Anomaly by.png',
      'Arctic Spirit by.png',
      'background city.png',
      'chill study.png',
      'championship.png',
      'Cozy Room.png',
      'Cyberpunk World.png',
      'demon slayer.png',
      'doomsday.png',
      'depth of.png',
      'Dota 2 - Radiant vs Dire.png',
      'fallen dreams.png',
      'Fantasy Girl Mask.png',
      'floating.png',
      'GUNDAM高达.png',
      'Follow The Stingrays.png',
      'Jinx Blue.png',
      'jinx fan.png',
      'just fly.png',
      'Kimetsu no Yaiba.png',
      'laundry day.png',
      'Miko fox.png',
      'Miss Fortune.png',
      'Mushroom Home.png',
      'nexus-01.png',
      'Nier Reincarnation.png',
      'Office Guweiz.png',
      'outset lsland.png',
      'One Of Us.png',
      'Pirates.png',
      'Portal to.png',
      'post.png',
      'rgb spiderman.png',
      'Samurai Doge.png',
      'Samurai Jinx.png',
      'Samurai.png',
      'Sci-Fi Energy Core.png',
      'sealed夜晚.png',
      'sealed白天.png',
      'Shadows Die Twice.png',
      'Stranded.png',
      'Tanjiro Kamado.png',
      'Travelling Ninja.png',
      'Uchiha Sasuke and Uzumaki.png',
      'Volcanonado.png',
      'Venti and Dvalin.png',
      'wake up.png',
      'Water effect.png',
      'Whale In Cloudy.png',
      'Winter Night by Steven.png',
      'wyy1.png',
      'wyy10.png',
      'wyy2.png',
      'wyy3.png',
      'wyy5.png',
      'wyy4.png',
      'wyy6.png',
      'wyy7.png',
      'wyy8.png',
      'wyy9.png',
      '冰公主.png',
      '吾王美如画.png',
      '剑姬原计划.png',
      '和树一起望云.png',
      '太空的少女.png',
      '放逐之刃.png',
      '暴雨已至.png',
      '月神.png',
      '流动星空.png',
      '甘城.png',
      '花与剑资料片.png',
      '电玩少女.png',
      '赛博朋克-集原美动态桌面.png',
      '阳台.png',
      '集原美.png',
      '魔女.png',
      '鲸落.png'
    ],
    imgIndex: -1
  },

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
      if (!this.weath1h_open) {
        this.$refs.weather1h_er.innerText = '>'
        this.weath1h_open = true
      } else {
        this.$refs.weather1h_er.innerText = '<'
        this.weath1h_open = false
      }

    },
    openWeather24h() {
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
      const root = document.documentElement
      this.colorIndex += 1
      this.colorIndex = this.colorIndex >= this.colorList.length ? 0 : this.colorIndex

      root.style.setProperty("--mainColor1", this.colorList[this.colorIndex])
      root.style.setProperty("--mainColor1O", this.colorListO[this.colorIndex])
      root.style.setProperty("--mainColor2", this.mainColor2List[this.colorIndex])
      root.style.setProperty("--mainColor2O", this.mainColor2O[this.colorIndex])
    },
    // 开局自调用
    randomMainColor() {
      const random = Math.floor(Math.random() * this.colorList.length)
      this.colorIndex = random
      document.documentElement.style.setProperty('--mainColor1', this.colorList[this.colorIndex])
      document.documentElement.style.setProperty('--mainColor1O', this.colorListO[this.colorIndex])
    },
    randomColor() {
      document.documentElement.style.setProperty('--mainColor1', `rgb(${this.getRandomRGB()})`)
      document.documentElement.style.setProperty('--mainColor2', `rgb(${this.getRandomRGB()})`)
      document.documentElement.style.setProperty('--textColor', `rgb(${this.getRandomRGB()})`)
      document.documentElement.style.setProperty('--mainColor1O', `rgba(${this.getRandomRGB()},.5)`)
    },
    getRandomRGB() {
      const randomR = Math.ceil(Math.random() * 255);
      const randomG = Math.ceil(Math.random() * 255);
      const randomB = Math.ceil(Math.random() * 255);
      return `${randomR},${randomG},${randomB}`
    },
    randomBackGround() {
      let a = this.imgurls.length
      const i = Math.floor(Math.random() * a)
      if (i == this.imgIndex) return randomBackGround()
      this.imgIndex = i
      let imgUrl = this.imgurls[i]
      // 转义名字中空格  不然背景不显示
      imgUrl = imgUrl.replace(/\s/g, encodeURIComponent(' '))
      document.querySelector('.one').style.backgroundImage = `url(D:/ruanjian/美化/图片/总壁纸库/${imgUrl})`
    },
    // 消失能显现的元素

    switchEle(e) {
      //防止点击其他按钮时触发
      if (e && e.target.className != 'one' && e.target.className != 'box') {
        return
      }

      // e.preventDefault()
      if (!this.switch) {
        this.$refs.circle_container.style.display = 'none'
        this.$refs.box.style.display = 'none'
        this.$refs.weather.style.display = 'none'
        this.switch = true
        return
      }
      this.$refs.circle_container.style.display = 'block'
      this.$refs.box.style.display = 'block'
      this.$refs.weather.style.display = 'block'
      this.switch = false
    },
  },
})


function jump(i) {
  i.style.animation = 'tada 1s'
  setTimeout(() => {
    i.style.animation = 'none'
  }, 1000)
}