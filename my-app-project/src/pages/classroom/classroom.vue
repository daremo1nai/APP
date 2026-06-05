<template>
<view class="page">
  <view class="status-bar"><text>◉◉◉◉◉</text><text class="stime">军事学院 · 知识库</text><text>⚡ ▮▮▮</text></view>

  <view class="page-header">
    <text class="overline">WAR COLLEGE · LECTURE HALL</text>
    <text class="title">战史课堂</text>
    <text class="subtitle">从入门到精通，系统学习二战史</text>
    <view class="divider"></view>
  </view>

  <!-- 文章/视频切换 -->
  <view class="class-tabs">
    <view class="class-tab" :class="{ active: tab === 'articles' }" @click="tab='articles'">📖 精选文章</view>
    <view class="class-tab" :class="{ active: tab === 'videos' }" @click="tab='videos'">🎬 视频课程</view>
  </view>

  <!-- 文章列表 -->
  <view v-if="tab === 'articles'">
    <view class="article-card" v-for="a in articles" :key="a.id" @click="openArticle(a)">
      <view class="art-cover" :class="a.coverColor"><text class="art-emoji">{{ a.emoji }}</text><text class="art-tag">{{ a.category }}</text></view>
      <view class="art-body">
        <text class="art-title">{{ a.title }}</text>
        <text class="art-excerpt">{{ a.excerpt }}</text>
        <view class="art-meta"><text>📖 {{ a.wordCount }} 字</text><text>🕐 {{ a.duration }}</text><text>👁️ {{ a.viewCount }}</text></view>
      </view>
    </view>
  </view>

  <!-- 视频列表 -->
  <view v-if="tab === 'videos'">
    <view class="video-card" v-for="v in videos" :key="v.id" @click="openVideo(v)">
      <view class="vid-thumb" :class="v.thumbClass"><text class="vid-emoji">🎥</text><view class="play-btn">▶</view></view>
      <view class="vid-info">
        <text class="vid-title">{{ v.title }}</text>
        <text class="vid-meta">{{ v.meta }}</text>
        <text class="vid-rating">⭐ {{ v.rating }} · {{ v.plays }}播放</text>
      </view>
    </view>
  </view>

  <!-- 自定义底部导航 -->
  <view class="tab-bar">
    <view class="tab-item" @click="goTab('/pages/home/home')"><text class="tab-icon">🗺️</text><text>态势图</text></view>
    <view class="tab-item active" @click="noop"><text class="tab-icon">📖</text><text>课堂</text></view>
    <view class="tab-item" @click="goTab('/pages/explore/explore')"><text class="tab-icon">🧭</text><text>探索</text></view>
    <view class="tab-item" @click="goTab('/pages/my/my')"><text class="tab-icon">🎖️</text><text>档案室</text></view>
  </view>
</view>
</template>

<script>
import { mockDB } from '@/utils/data.js'

export default {
  data() {
    return {
      tab: 'articles',
      articles: [],
      videos: []
    }
  },
  async mounted() {
    const { data } = await mockDB.from('articles').select('*').order('created_at', { ascending: false })._exec()
    if (data) {
      this.articles = data.filter(d => d.type === 'article').map(d => ({ ...d, emoji: d.emoji || '📖' }))
      this.videos = data.filter(d => d.type === 'video').map((d, i) => ({ ...d, thumbClass: 'vt' + ((i%3)+1), plays: d.plays || '10万', rating: d.rating || '4.5' }))
    }
  },
  methods: {
    noop() {},
    goTab(url) { uni.switchTab({ url }) },
    openArticle(a) { uni.showToast({ title: '📖 ' + a.title, icon: 'none', duration: 2000 }) },
    openVideo(v) { uni.showToast({ title: '🎬 ' + v.title, icon: 'none', duration: 2000 }) }
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

.class-tabs { display:flex; margin-bottom:32rpx; border:1px solid var(--parchment-deep); border-radius:8rpx; overflow:hidden; }
.class-tab { flex:1; padding:18rpx; text-align:center; font-size:24rpx; font-weight:700; background:var(--parchment-light); color:var(--ink-muted); font-family:'Georgia',serif; }
.class-tab.active { background:var(--archive-red); color:#f4ebd8; }

.article-card { background:var(--parchment-white); border:1px solid rgba(196,182,157,0.5); border-radius:16rpx; overflow:hidden; margin-bottom:24rpx; }
.art-cover { height:240rpx; display:flex; align-items:center; justify-content:center; font-size:84rpx; position:relative; }
.art-cover.ac1 { background:linear-gradient(135deg,#4a3828,#6b5240); }
.art-cover.ac2 { background:linear-gradient(135deg,#3a4a3a,#5a6b4a); }
.art-cover.ac3 { background:linear-gradient(135deg,#2c3a4a,#4a5a6b); }
.art-tag { position:absolute; top:16rpx; left:20rpx; background:rgba(0,0,0,0.5); color:var(--brass-light); padding:6rpx 16rpx; border-radius:6rpx; font-size:18rpx; font-family:'Georgia',serif; }
.art-body { padding:24rpx 28rpx; }
.art-title { font-family:'Georgia',serif; font-size:28rpx; font-weight:700; color:var(--ink-dark); display:block; margin-bottom:8rpx; }
.art-excerpt { font-size:22rpx; color:var(--ink-muted); line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.art-meta { display:flex; justify-content:space-between; margin-top:16rpx; font-size:20rpx; color:var(--ink-soft); font-family:'Georgia',serif; }

.video-card { background:var(--parchment-white); border:1px solid rgba(196,182,157,0.5); border-radius:16rpx; overflow:hidden; margin-bottom:24rpx; display:flex; }
.vid-thumb { width:220rpx; min-height:156rpx; flex-shrink:0; display:flex; align-items:center; justify-content:center; position:relative; }
.vid-thumb.vt1 { background:linear-gradient(135deg,#3a3030,#5a4040); }
.vid-thumb.vt2 { background:linear-gradient(135deg,#2a3a3a,#3a5a5a); }
.vid-thumb.vt3 { background:linear-gradient(135deg,#3a3028,#5a4a38); }
.play-btn { position:absolute; width:64rpx; height:64rpx; border-radius:50%; background:rgba(255,255,255,0.9); display:flex; align-items:center; justify-content:center; font-size:28rpx; color:var(--archive-red); }
.vid-info { padding:20rpx 24rpx; flex:1; display:flex; flex-direction:column; justify-content:center; }
.vid-title { font-size:26rpx; font-weight:700; color:var(--ink-dark); font-family:'Georgia',serif; display:block; margin-bottom:6rpx; }
.vid-meta { font-size:20rpx; color:var(--ink-muted); }
.vid-rating { font-size:20rpx; color:var(--ink-soft); margin-top:4rpx; }
.vid-emoji { font-size:56rpx; }

.tab-bar { position:fixed; bottom:0; left:0; right:0; height:120rpx; background:linear-gradient(180deg,#faf7ef,#f0e8d5); display:flex; align-items:flex-start; justify-content:space-around; border-top:1px solid #d4c4a8; z-index:999; padding-top:16rpx; }
.tab-item { display:flex; flex-direction:column; align-items:center; gap:4rpx; font-size:22rpx; color:var(--ink-muted); }
.tab-item.active { color:var(--archive-red); font-weight:700; }
.tab-icon { font-size:40rpx; }
</style>
