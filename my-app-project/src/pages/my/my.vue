<template>
<view class="page">
  <view class="status-bar"><text>◉◉◉◉◉</text><text class="stime">档案中心</text><text>⚡ ▮▮▮</text></view>

  <!-- 个人信息 -->
  <view class="profile-banner">
    <view class="avatar-lg">🎖️</view>
    <text class="p-name">{{ user ? user.email : '战史研究员' }}</text>
    <text class="p-title">LEVEL 12 · 资深战史学者</text>
  </view>

  <!-- 统计数据 -->
  <view class="card stat-card">
    <view class="stat-cell" v-for="s in stats" :key="s.label">
      <text class="stat-num">{{ s.num }}</text>
      <text class="stat-desc">{{ s.label }}</text>
    </view>
  </view>

  <!-- 菜单 -->
  <view class="card menu-list">
    <view class="menu-row" v-for="m in menus" :key="m.label" @click="clickMenu(m)">
      <view class="menu-left"><text class="menu-icon">{{ m.icon }}</text><text>{{ m.label }}</text></view>
      <text class="menu-arrow">›</text>
    </view>
  </view>

  <view class="btn-outline" @click="handleLogout">◂ 退出档案室</view>

  <!-- 底部导航 -->
  <view class="tab-bar">
    <view class="tab-item" @click="goTab('/pages/home/home')"><text class="tab-icon">🗺️</text><text>态势图</text></view>
    <view class="tab-item" @click="goTab('/pages/classroom/classroom')"><text class="tab-icon">📖</text><text>课堂</text></view>
    <view class="tab-item" @click="goTab('/pages/explore/explore')"><text class="tab-icon">🧭</text><text>探索</text></view>
    <view class="tab-item active" @click="noop"><text class="tab-icon">🎖️</text><text>档案室</text></view>
  </view>
</view>
</template>

<script>
import { mockAuth } from '@/utils/data.js'

export default {
  data() {
    return {
      user: null,
      stats: [
        { num: 342, label: '已学战役' },
        { num: '89%', label: '测验正确率' },
        { num: 156, label: '论坛发帖' }
      ],
      menus: [
        { icon:'📊', label:'学习报告' },
        { icon:'🏅', label:'我的勋章' },
        { icon:'📝', label:'学习笔记' },
        { icon:'⭐', label:'我的收藏' },
        { icon:'⚙️', label:'档案设置' },
        { icon:'ℹ️', label:'关于二战历史地图集' }
      ]
    }
  },
  async mounted() {
    const { data: { user } } = await mockAuth.getUser()
    this.user = user
  },
  methods: {
    noop() {},
    goTab(url) { uni.switchTab({ url }) },
    clickMenu(m) { uni.showToast({ title: m.icon + ' ' + m.label + '（原型演示）', icon: 'none' }) },
    async handleLogout() {
      await mockAuth.signOut()
      uni.redirectTo({ url: '/pages/auth/auth' })
    }
  }
}
</script>

<style scoped>
.page { min-height:100vh; padding:32rpx; padding-bottom:140rpx; background:var(--parchment-light); }
.status-bar { display:flex; justify-content:space-between; font-size:22rpx; color:var(--ink-muted); font-family:'Georgia',serif; margin-bottom:24rpx; }
.stime { font-weight:bold; color:var(--ink-body); }

.profile-banner { text-align:center; padding:40rpx 0 32rpx; }
.avatar-lg { width:144rpx; height:144rpx; border-radius:50%; background:linear-gradient(135deg,#d4c4a8,#a08868); margin:0 auto 20rpx; display:flex; align-items:center; justify-content:center; font-size:60rpx; border:6rpx solid var(--brass); }
.p-name { font-family:'Georgia',serif; font-size:36rpx; font-weight:700; color:var(--ink-dark); display:block; }
.p-title { font-size:22rpx; color:var(--ink-muted); letter-spacing:2rpx; font-family:'Georgia',serif; display:block; margin-top:8rpx; }

.stat-card { display:flex; padding:0; }
.stat-cell { flex:1; text-align:center; padding:24rpx 16rpx; }
.stat-cell:not(:last-child) { border-right:1px solid rgba(196,182,157,0.3); }
.stat-num { font-family:'Georgia',serif; font-size:48rpx; font-weight:700; color:var(--archive-red); display:block; }
.stat-desc { font-size:20rpx; color:var(--ink-muted); display:block; margin-top:4rpx; }

.menu-list { padding:0; }
.menu-row { display:flex; align-items:center; justify-content:space-between; padding:28rpx 0; border-bottom:1px solid rgba(196,182,157,0.25); font-size:28rpx; color:var(--ink-body); cursor:pointer; }
.menu-row:active { color:var(--archive-red); }
.menu-row:last-child { border-bottom:none; padding:28rpx 24rpx; }
.menu-row:first-child { padding-top:28rpx; }
.menu-left { display:flex; align-items:center; gap:24rpx; margin-left:24rpx; }
.menu-icon { font-size:36rpx; width:44rpx; text-align:center; }
.menu-arrow { color:var(--ink-soft); font-size:32rpx; margin-right:24rpx; }

.btn-outline { display:flex; align-items:center; justify-content:center; width:100%; padding:24rpx; border:1.5px solid #7a3b31; border-radius:8rpx; color:#7a3b31; font-size:28rpx; font-weight:700; font-family:'Georgia',serif; margin-top:32rpx; background:transparent; box-sizing:border-box; }
.btn-outline:active { background:rgba(122,59,49,0.06); }

.tab-bar { position:fixed; bottom:0; left:0; right:0; height:120rpx; background:linear-gradient(180deg,#faf7ef,#f0e8d5); display:flex; align-items:flex-start; justify-content:space-around; border-top:1px solid #d4c4a8; z-index:999; padding-top:16rpx; }
.tab-item { display:flex; flex-direction:column; align-items:center; gap:4rpx; font-size:22rpx; color:var(--ink-muted); }
.tab-item.active { color:var(--archive-red); font-weight:700; }
.tab-icon { font-size:40rpx; }
</style>
