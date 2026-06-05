<template>
<view class="page">
  <view class="page-header">
    <text class="overline">WAR COLLEGE · DISCUSSION</text>
    <text class="title">战史研讨</text>
    <text class="subtitle">以史为鉴，可以知兴替</text>
    <view class="divider"></view>
  </view>

  <input class="search-input" v-model="search" placeholder="🔍  检索战役、人物、话题..." />

  <view class="tag-row">
    <text class="tag" :class="{ active: activeTag === t }" v-for="t in tags" :key="t" @click="activeTag=t">{{ t }}</text>
  </view>

  <view class="post-card" v-for="p in posts" :key="p.id" @click="openPost(p)">
    <view class="post-top">
      <view class="avatar" :class="p.av"><text>{{ p.avatar }}</text></view>
      <view><text class="author">{{ p.author }}</text><text class="ptime">{{ p.time }}</text></view>
    </view>
    <text class="post-title">{{ p.title }}</text>
    <text class="post-excerpt">{{ p.excerpt }}</text>
    <view class="post-stats"><text>❤️ {{ p.likes }}</text><text>💬 {{ p.comments }}</text><text>📌 {{ p.views }} 阅读</text></view>
  </view>

  <view class="fab" @click="newPost">✚</view>
</view>
</template>

<script>
import { mockDB } from '@/utils/data.js'

export default {
  data() {
    return {
      search: '',
      activeTag: '#欧洲战场#',
      tags: ['#欧洲战场#', '#太平洋战争#', '#名将评析#', '#武器装备#', '#战术推演#'],
      posts: []
    }
  },
  async mounted() {
    const { data } = await mockDB.from('posts').select('*').order('created_at', { ascending: false }).limit(10)._exec()
    if (data) {
      this.posts = data.map(p => ({
        ...p,
        author: p.author || '未知用户',
        time: this.timeAgo(p.created_at),
        excerpt: p.content ? p.content.slice(0, 100) + '...' : '',
        likes: p.like_count || 0,
        comments: p.comment_count || 0,
        views: (p.view_count || 0) >= 1000 ? ((p.view_count/1000).toFixed(1) + 'k') : (p.view_count || 0)
      }))
    }
  },
  methods: {
    timeAgo(d) { if (!d) return '刚刚'; const diff = Date.now() - new Date(d).getTime(); const h = Math.floor(diff/3600000); return h < 1 ? '刚刚' : h < 24 ? h + '小时前' : Math.floor(h/24) + '天前' },
    openPost(p) { uni.showToast({ title: '📖 ' + p.title, icon: 'none', duration: 2000 }) },
    newPost() { uni.showToast({ title: '✏️ 发帖功能开发中', icon: 'none' }) }
  }
}
</script>

<style scoped>
.page { min-height:100vh; padding:32rpx; background:var(--parchment-light); }
.page-header { margin-bottom:32rpx; }
.overline { font-size:20rpx; letter-spacing:6rpx; color:var(--archive-red); font-family:'Georgia',serif; display:block; margin-bottom:8rpx; }
.title { font-family:'Georgia',serif; font-size:48rpx; color:var(--ink-dark); font-weight:700; display:block; }
.subtitle { font-size:24rpx; color:var(--ink-muted); font-style:italic; display:block; margin-top:8rpx; }
.divider { width:80rpx; height:4rpx; background:var(--archive-red); margin-top:20rpx; opacity:0.6; }

.search-input { width:100%; padding:20rpx 28rpx; border:1px solid var(--parchment-deep); border-radius:40rpx; font-size:26rpx; background:var(--parchment-white); color:var(--ink-dark); margin-bottom:28rpx; }

.tag-row { display:flex; gap:12rpx; flex-wrap:wrap; margin-bottom:28rpx; }
.tag { padding:10rpx 24rpx; border-radius:24rpx; font-size:22rpx; font-family:'Georgia',serif; border:1px solid var(--parchment-deep); color:var(--ink-muted); background:transparent; }
.tag.active { background:var(--archive-red); color:#f4ebd8; border-color:var(--archive-red-dark); }

.post-card { background:var(--parchment-white); border:1px solid rgba(196,182,157,0.5); border-radius:16rpx; padding:28rpx; margin-bottom:20rpx; cursor:pointer; }
.post-card:active { transform:scale(0.985); }
.post-top { display:flex; align-items:center; gap:20rpx; margin-bottom:16rpx; }
.avatar { width:60rpx; height:60rpx; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:28rpx; border:2px solid var(--parchment-deep); flex-shrink:0; }
.avatar.av1 { background:#d4c4a8; } .avatar.av2 { background:#c4b89a; } .avatar.av3 { background:#b8a888; }
.author { font-size:26rpx; font-weight:700; color:var(--ink-dark); display:block; }
.ptime { font-size:20rpx; color:var(--ink-muted); font-family:'Georgia',serif; }
.post-title { font-family:'Georgia',serif; font-size:28rpx; font-weight:700; color:var(--ink-dark); display:block; margin-bottom:8rpx; }
.post-excerpt { font-size:24rpx; color:var(--ink-muted); line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.post-stats { display:flex; gap:32rpx; margin-top:16rpx; font-size:22rpx; color:var(--ink-soft); font-family:'Georgia',serif; }

.fab { position:fixed; bottom:180rpx; right:32rpx; width:96rpx; height:96rpx; border-radius:50%; background:var(--archive-red); color:#fff; font-size:48rpx; display:flex; align-items:center; justify-content:center; box-shadow:0 8rpx 32rpx rgba(122,59,49,0.4); z-index:100; }
</style>
