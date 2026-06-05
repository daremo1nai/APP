<template>
<view class="page">
  <view class="status-bar"><text>◉◉◉◉◉</text><text class="stime">战区探索中心</text><text>⚡ ▮▮▮</text></view>

  <view class="page-header">
    <text class="overline">THEATER EXPLORATION · DISCOVER</text>
    <text class="title">战区探索</text>
    <text class="subtitle">发现更多好玩的历史玩法</text>
    <view class="divider"></view>
  </view>

  <!-- Banner -->
  <view class="explore-banner">
    <text class="ban-title">⚜️ 欢迎来到探索中心</text>
    <text class="ban-sub">沉浸式体验二战历史 · 测验、研讨、推演一网打尽</text>
  </view>

  <!-- 功能入口 2x2 网格 -->
  <view class="feature-grid">
    <view class="fe-card" @click="goPage('/pages/explore/quiz')">
      <text class="fe-icon">📋</text>
      <text class="fe-title">情报测验</text>
      <text class="fe-desc">500+精选二战题目\n测测你的战史段位</text>
      <text class="fe-badge">HOT</text>
    </view>
    <view class="fe-card" @click="goPage('/pages/explore/forum')">
      <text class="fe-icon">⚔️</text>
      <text class="fe-title">战史研讨</text>
      <text class="fe-desc">军事爱好者社区\n深度讨论每一场战役</text>
    </view>
    <view class="fe-card" @click="comingSoon('战役推演')">
      <text class="fe-icon">🗡️</text>
      <text class="fe-title">战役推演</text>
      <text class="fe-desc">沙盘推演经典战役\n如果你是指挥官...</text>
      <text class="fe-badge new">NEW</text>
    </view>
    <view class="fe-card" @click="comingSoon('英雄榜')">
      <text class="fe-icon">🏆</text>
      <text class="fe-title">英雄榜</text>
      <text class="fe-desc">测验排名·知识达人\n看看谁是战史王</text>
    </view>
  </view>

  <!-- 热门讨论 -->
  <view class="section-title">🔥 本周热门讨论</view>
  <view class="post-card" v-for="p in hotPosts" :key="p.id" @click="goPage('/pages/explore/forum')">
    <view class="post-top">
      <view class="avatar" :class="p.av">{{ p.avatar }}</view>
      <view><text class="author">{{ p.author }}</text><text class="ptime">{{ p.time }}</text></view>
    </view>
    <text class="post-title">{{ p.title }}</text>
    <text class="post-excerpt">{{ p.excerpt }}</text>
    <view class="post-stats"><text>❤️ {{ p.likes }}</text><text>💬 {{ p.comments }}</text><text>📌 {{ p.views }}</text></view>
  </view>

  <!-- 底部导航 -->
  <view class="tab-bar">
    <view class="tab-item" @click="goTab('/pages/home/home')"><text class="tab-icon">🗺️</text><text>态势图</text></view>
    <view class="tab-item" @click="goTab('/pages/classroom/classroom')"><text class="tab-icon">📖</text><text>课堂</text></view>
    <view class="tab-item active" @click="noop"><text class="tab-icon">🧭</text><text>探索</text></view>
    <view class="tab-item" @click="goTab('/pages/my/my')"><text class="tab-icon">🎖️</text><text>档案室</text></view>
  </view>
</view>
</template>

<script>
export default {
  data() {
    return {
      hotPosts: [
        { id:1,av:'av1',avatar:'🎖️',author:'隆美尔之狐',time:'2小时前',title:'【深度】阿拉曼战役中装甲兵运用的战术得失',excerpt:'从后勤补给线、地形利用和装甲兵协同三个维度，重新审视这场北非战场的转折点...',likes:247,comments:83,views:'1.2k'},
        { id:2,av:'av2',avatar:'📡',author:'太平洋观察者',time:'5小时前',title:'假如南云忠一在中途岛做出了不同的决策？',excerpt:'经典反事实推演——如果日军保留了机动部队主力，太平洋战局是否会被改写？',likes:412,comments:156,views:'2.8k'}
      ]
    }
  },
  methods: {
    noop() {},
    goTab(url) { uni.switchTab({ url }) },
    goPage(url) { uni.navigateTo({ url }) },
    comingSoon(name) { uni.showToast({ title: '🎲 ' + name + ' 开发中', icon: 'none' }) }
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

.explore-banner { background:linear-gradient(135deg,#2c221a,#3e3024,#4a3828); border-radius:24rpx; padding:40rpx; margin-bottom:36rpx; border:1px solid rgba(184,147,90,0.3); position:relative; overflow:hidden; }
.ban-title { font-family:'Georgia',serif; font-size:36rpx; font-weight:700; color:#f4ebd8; display:block; }
.ban-sub { font-size:22rpx; color:var(--brass-light); margin-top:8rpx; display:block; opacity:0.8; }

.feature-grid { display:grid; grid-template-columns:1fr 1fr; gap:24rpx; margin-bottom:36rpx; }
.fe-card { background:var(--parchment-white); border:1px solid rgba(196,182,157,0.5); border-radius:16rpx; padding:40rpx 28rpx; text-align:center; position:relative; }
.fe-icon { font-size:72rpx; display:block; margin-bottom:16rpx; }
.fe-title { font-family:'Georgia',serif; font-size:28rpx; font-weight:700; color:var(--ink-dark); display:block; margin-bottom:8rpx; }
.fe-desc { font-size:20rpx; color:var(--ink-muted); line-height:1.4; white-space:pre-line; }
.fe-badge { position:absolute; top:12rpx; right:12rpx; font-size:18rpx; padding:4rpx 14rpx; border-radius:16rpx; background:var(--archive-red); color:#f4ebd8; font-weight:700; font-family:'Georgia',serif; }
.fe-badge.new { background:#3a6b4a; }

.section-title { font-family:'Georgia',serif; font-size:28rpx; font-weight:700; color:var(--ink-dark); margin-bottom:20rpx; }

.post-card { background:var(--parchment-white); border:1px solid rgba(196,182,157,0.5); border-radius:16rpx; padding:28rpx; margin-bottom:20rpx; }
.post-top { display:flex; align-items:center; gap:20rpx; margin-bottom:16rpx; }
.avatar { width:72rpx; height:72rpx; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:32rpx; border:2px solid var(--parchment-deep); }
.avatar.av1 { background:#d4c4a8; } .avatar.av2 { background:#c4b89a; }
.author { font-size:26rpx; font-weight:700; color:var(--ink-dark); display:block; }
.ptime { font-size:20rpx; color:var(--ink-muted); font-family:'Georgia',serif; }
.post-title { font-family:'Georgia',serif; font-size:28rpx; font-weight:700; color:var(--ink-dark); display:block; margin-bottom:8rpx; }
.post-excerpt { font-size:24rpx; color:var(--ink-muted); line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.post-stats { display:flex; gap:32rpx; margin-top:16rpx; font-size:22rpx; color:var(--ink-soft); font-family:'Georgia',serif; }

.tab-bar { position:fixed; bottom:0; left:0; right:0; height:120rpx; background:linear-gradient(180deg,#faf7ef,#f0e8d5); display:flex; align-items:flex-start; justify-content:space-around; border-top:1px solid #d4c4a8; z-index:999; padding-top:16rpx; }
.tab-item { display:flex; flex-direction:column; align-items:center; gap:4rpx; font-size:22rpx; color:var(--ink-muted); }
.tab-item.active { color:var(--archive-red); font-weight:700; }
.tab-icon { font-size:40rpx; }
</style>
