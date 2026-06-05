<template>
<view class="page">
  <view class="status-bar"><text>◉◉◉◉◉</text><text class="stime">{{ statusTime }}</text><text>⚡ ▮▮▮</text></view>

  <view class="page-header">
    <text class="overline">WORLD WAR II · INTERACTIVE ATLAS</text>
    <text class="title">二战历史地图集</text>
    <text class="subtitle">1939 — 1945 · 回望硝烟，铭记历史</text>
    <view class="divider"></view>
  </view>

  <!-- 地图 -->
  <view class="map-card">
    <view class="map-inner" id="mapContainer"></view>
    <view class="map-bar">
      <text class="year-badge">{{ currentYear }}年</text>
      <text class="map-hint">← 滑动时间轴探索 →</text>
    </view>
  </view>

  <!-- 时间轴 -->
  <view class="card">
    <view class="card-header">
      <text class="card-title">⏳ 时间轴</text>
      <text class="badge-intel">{{ displayDate }}</text>
    </view>
    <slider :value="sliderValue" :min="1939" :max="1945" :step="0.1"
      activeColor="#7a3b31" backgroundColor="#d4c4a8" block-color="#7a3b31"
      @change="onSliderChange" style="width:100%; margin:16rpx 0;" />
    <view class="year-labels">
      <text v-for="y in years" :key="y">{{ y }}</text>
    </view>
  </view>

  <!-- 事件列表 -->
  <view class="card">
    <view class="card-header">
      <text class="card-title">📜 战役记录</text>
      <text class="badge-classified">CLASSIFIED</text>
    </view>
    <view v-for="ev in visibleEvents" :key="ev.id" class="event-item" @click="focusEvent(ev)">
      <view class="event-dot" :class="ev.type"></view>
      <view class="event-info">
        <text class="event-name">{{ ev.title }}</text>
        <text class="event-date">{{ ev.dateStr }}</text>
      </view>
    </view>
  </view>

  <!-- 自定义底部导航 -->
  <view class="tab-bar">
    <view class="tab-item active" @click="noop"><text class="tab-icon">🗺️</text><text>态势图</text></view>
    <view class="tab-item" @click="goTab('/pages/classroom/classroom')"><text class="tab-icon">📖</text><text>课堂</text></view>
    <view class="tab-item" @click="goTab('/pages/explore/explore')"><text class="tab-icon">🧭</text><text>探索</text></view>
    <view class="tab-item" @click="goTab('/pages/my/my')"><text class="tab-icon">🎖️</text><text>档案室</text></view>
  </view>
</view>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const historicalEvents = [
  { id:1,title:"德国入侵波兰",year:1939.7,dateStr:"1939年9月1日",lat:52.06,lng:19.25,type:"axis",desc:"二战欧洲战场爆发的标志。德军闪电战迅速击溃波兰防线。"},
  { id:2,title:"冬季战争",year:1939.9,dateStr:"1939年11月30日",lat:60.17,lng:24.94,type:"neutral",desc:"苏联入侵芬兰，芬兰以弱胜强。"},
  { id:3,title:"威瑟堡行动",year:1940.3,dateStr:"1940年4月9日",lat:55.68,lng:12.57,type:"axis",desc:"德国入侵丹麦和挪威。"},
  { id:4,title:"法国战役",year:1940.4,dateStr:"1940年5月10日",lat:49.50,lng:2.50,type:"axis",desc:"德军绕过马奇诺防线闪击西欧。"},
  { id:5,title:"敦刻尔克大撤退",year:1940.4,dateStr:"1940年5月26日",lat:51.03,lng:2.38,type:"neutral",desc:"33万英法联军成功撤退至英国。"},
  { id:6,title:"不列颠空战",year:1940.6,dateStr:"1940年7月10日",lat:51.50,lng:-0.12,type:"allied",desc:"皇家空军英勇抵抗，希特勒首尝败绩。"},
  { id:7,title:"巴巴罗萨行动",year:1941.5,dateStr:"1941年6月22日",lat:55.75,lng:37.62,type:"axis",desc:"纳粹德国撕毁条约入侵苏联。"},
  { id:8,title:"珍珠港事件",year:1941.9,dateStr:"1941年12月7日",lat:21.36,lng:-157.95,type:"axis",desc:"日本偷袭珍珠港，美国正式参战。"},
  { id:9,title:"中途岛海战",year:1942.5,dateStr:"1942年6月4日",lat:28.20,lng:-177.35,type:"allied",desc:"太平洋战场转折点，美军击沉日本四艘主力航母。"},
  { id:10,title:"斯大林格勒战役",year:1942.6,dateStr:"1942年8月23日",lat:48.70,lng:44.51,type:"allied",desc:"二战最惨烈战役之一，东线转折点。"},
  { id:11,title:"阿拉曼战役",year:1942.8,dateStr:"1942年10月23日",lat:30.83,lng:28.95,type:"allied",desc:"蒙哥马利在北非击败隆美尔。"},
  { id:12,title:"库尔斯克会战",year:1943.6,dateStr:"1943年7月5日",lat:51.72,lng:36.19,type:"allied",desc:"史上最大规模坦克会战。"},
  { id:13,title:"意大利投降",year:1943.7,dateStr:"1943年9月8日",lat:41.90,lng:12.50,type:"allied",desc:"轴心国开始瓦解。"},
  { id:14,title:"诺曼底登陆",year:1944.5,dateStr:"1944年6月6日",lat:49.33,lng:-0.88,type:"allied",desc:"人类历史上最大规模两栖登陆作战。"},
  { id:15,title:"突出部战役",year:1944.9,dateStr:"1944年12月16日",lat:50.25,lng:5.50,type:"allied",desc:"德军西线最后的大规模反攻。"},
  { id:16,title:"雅尔塔会议",year:1945.1,dateStr:"1945年2月4日",lat:44.50,lng:34.17,type:"allied",desc:"三巨头敲定战后世界格局。"},
  { id:17,title:"柏林战役",year:1945.3,dateStr:"1945年4月16日",lat:52.52,lng:13.40,type:"allied",desc:"苏军攻入柏林，欧战迎来终局。"},
  { id:18,title:"德国无条件投降",year:1945.4,dateStr:"1945年5月8日",lat:52.52,lng:13.38,type:"allied",desc:"纳粹德国无条件投降，V-E Day。"},
  { id:19,title:"广岛与长崎原子弹",year:1945.6,dateStr:"1945年8月6日/9日",lat:34.39,lng:132.46,type:"allied",desc:"加速了战争结束。"},
  { id:20,title:"日本无条件投降",year:1945.7,dateStr:"1945年9月2日",lat:35.68,lng:139.76,type:"allied",desc:"二战正式结束，V-J Day。"}
]

export default {
  data() {
    return {
      statusTime: '',
      sliderValue: 1939,
      currentYear: 1939,
      years: [1939,1940,1941,1942,1943,1944,1945],
      map: null,
      markers: []
    }
  },
  computed: {
    displayDate() {
      const y = Math.floor(this.sliderValue)
      const m = Math.floor((this.sliderValue - y) * 12) + 1
      return `${y}年${m}月`
    },
    visibleEvents() {
      return historicalEvents.filter(e => e.year <= this.sliderValue).reverse()
    }
  },
  mounted() {
    const now = new Date()
    this.statusTime = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}Z · ARCHIVE`
    this.$nextTick(() => { setTimeout(() => this.initMap(), 300) })
  },
  beforeDestroy() {
    if (this.map) { this.map.remove(); this.map = null }
  },
  methods: {
    noop() {},
    goTab(url) { uni.switchTab({ url }) },
    initMap() {
      this.map = L.map('mapContainer', { center:[35,25], zoom:3, minZoom:2, maxZoom:7, zoomControl:false, attributionControl:false })
      L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        subdomains:'1234', className:'map-tiles'
      }).addTo(this.map)
      L.control.zoom({ position:'bottomright' }).addTo(this.map)
      setTimeout(() => this.map.invalidateSize(), 500)
      this.map.on('moveend zoomend', () => this.updateMarkers())
      this.updateMarkers()
    },
    updateMarkers() {
      if (!this.map) return
      this.markers.forEach(m => this.map.removeLayer(m))
      this.markers = []
      this.visibleEvents.forEach(ev => {
        const copies = this.getLngCopies(ev.lng)
        copies.forEach(lng => {
          const color = ev.type === 'allied' ? '#2c4a6e' : ev.type === 'axis' ? '#8b2a2a' : '#b8935a'
          const m = L.circleMarker([ev.lat, lng], { radius:7, fillColor:color, color:'#fff', weight:1.5, fillOpacity:0.85 }).addTo(this.map)
          m.bindPopup(`<b>${ev.title}</b><br>${ev.dateStr}<br>${ev.desc}`)
          this.markers.push(m)
        })
      })
    },
    getLngCopies(lng) {
      if (!this.map) return [lng]
      const b = this.map.getBounds(), w = b.getWest(), e = b.getEast()
      let base = lng
      while (base - this.map.getCenter().lng > 180) base -= 360
      while (base - this.map.getCenter().lng < -180) base += 360
      const copies = []
      for (let o = -720; o <= 720; o += 360) { const c = base + o; if (c >= w-5 && c <= e+5) copies.push(c) }
      return copies.length ? copies : [base]
    },
    onSliderChange(e) {
      this.sliderValue = e.detail.value
      this.$nextTick(() => this.updateMarkers())
    },
    focusEvent(ev) {
      let base = ev.lng
      while (base - this.map.getCenter().lng > 180) base -= 360
      while (base - this.map.getCenter().lng < -180) base += 360
      this.map.flyTo([ev.lat, base], 6)
      uni.showToast({ title: ev.title + '\n' + ev.desc, icon: 'none', duration: 3000 })
    }
  }
}
</script>

<style scoped>
.page { min-height:100vh; padding:32rpx; padding-bottom:140rpx; background:var(--parchment-light); }
.status-bar { display:flex; justify-content:space-between; font-size:22rpx; color:var(--ink-muted); font-family:'Georgia',serif; margin-bottom:24rpx; }
.stime { font-weight:bold; color:var(--ink-body); }
.page-header { margin-bottom:32rpx; }
.overline { font-size:20rpx; letter-spacing:6rpx; color:var(--archive-red); font-family:'Georgia',serif; display:block; margin-bottom:8rpx; }
.title { font-family:'Georgia',serif; font-size:48rpx; color:var(--ink-dark); font-weight:700; display:block; }
.subtitle { font-size:24rpx; color:var(--ink-muted); font-style:italic; display:block; margin-top:8rpx; }
.divider { width:80rpx; height:4rpx; background:var(--archive-red); margin-top:20rpx; opacity:0.6; }
.map-card { background:var(--parchment-white); border:1px solid rgba(196,182,157,0.5); border-radius:16rpx; overflow:hidden; margin-bottom:20rpx; }
.map-inner { width:100%; height:440rpx; }
.map-bar { display:flex; justify-content:space-between; padding:20rpx 28rpx; background:var(--parchment-light); border-top:1px solid rgba(196,182,157,0.3); }
.year-badge { font-family:'Georgia',serif; font-size:36rpx; font-weight:700; color:var(--archive-red); }
.map-hint { font-size:20rpx; color:var(--ink-muted); font-style:italic; }
.card-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:20rpx; }
.card-title { font-family:'Georgia',serif; font-size:30rpx; font-weight:700; color:var(--ink-dark); }
.badge-intel { font-size:20rpx; padding:6rpx 20rpx; border-radius:20rpx; background:var(--ink-dark); color:var(--brass-light); border:1px solid var(--brass); font-family:'Georgia',serif; font-weight:700; }
.badge-classified { font-size:20rpx; padding:6rpx 20rpx; border-radius:20rpx; background:var(--archive-red); color:#f4ebd8; font-family:'Georgia',serif; font-weight:700; }
.year-labels { display:flex; justify-content:space-between; font-size:20rpx; color:var(--ink-muted); font-family:'Georgia',serif; padding:0 4rpx; }
.event-item { display:flex; align-items:center; gap:20rpx; padding:20rpx 0; border-bottom:1px solid rgba(196,182,157,0.25); cursor:pointer; }
.event-item:last-child { border-bottom:none; }
.event-dot { width:20rpx; height:20rpx; border-radius:50%; flex-shrink:0; }
.event-dot.allied { background:var(--navy); }
.event-dot.axis { background:var(--axis-red); }
.event-dot.neutral { background:#b8935a; }
.event-info { flex:1; min-width:0; }
.event-name { font-size:26rpx; font-weight:600; color:var(--ink-dark); display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.event-date { font-size:20rpx; color:var(--ink-muted); font-family:'Georgia',serif; }
.tab-bar { position:fixed; bottom:0; left:0; right:0; height:120rpx; background:linear-gradient(180deg,#faf7ef,#f0e8d5); display:flex; align-items:flex-start; justify-content:space-around; border-top:1px solid #d4c4a8; z-index:999; padding-top:16rpx; }
.tab-item { display:flex; flex-direction:column; align-items:center; gap:4rpx; font-size:22rpx; color:var(--ink-muted); }
.tab-item.active { color:var(--archive-red); font-weight:700; }
.tab-icon { font-size:40rpx; }
</style>
