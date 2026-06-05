<template>
<view class="page">
  <view class="logo-area">
    <text class="logo-icon">⚜️</text>
    <text class="logo-title">二战历史地图集</text>
    <view class="logo-line"><view class="ll"></view><text class="ls">✦</text><view class="ll"></view></view>
    <text class="logo-sub">1939 – 1945</text>
  </view>

  <view class="tab-row">
    <view class="tab" :class="{ on: mode==='login' }" @click="mode='login'">调取档案</view>
    <view class="tab" :class="{ on: mode==='register' }" @click="mode='register'">建立新档</view>
  </view>

  <view v-if="mode==='login'">
    <view class="field">
      <text class="flabel">档案号（账号）</text>
      <input class="finp" v-model="loginForm.username" placeholder="请输入档案编号" />
    </view>
    <view class="field">
      <text class="flabel">密令（密码）</text>
      <input class="finp" type="password" v-model="loginForm.password" placeholder="请输入密令" />
    </view>
    <view class="btn" @click="handleLogin">{{ loading ? '调取中...' : '✦ 调取档案' }}</view>
  </view>

  <view v-if="mode==='register'">
    <view class="field">
      <text class="flabel">档案号（账号）</text>
      <input class="finp" v-model="regForm.username" placeholder="请创建档案编号" />
    </view>
    <view class="field">
      <text class="flabel">密令（密码）</text>
      <input class="finp" type="password" v-model="regForm.password" placeholder="请设置密令（6-20位）" />
    </view>
    <view class="field">
      <text class="flabel">确认密令</text>
      <input class="finp" type="password" v-model="regForm.password2" placeholder="请再次输入密令" />
    </view>
    <view class="btn" @click="handleRegister">{{ loading ? '建立中...' : '✦ 建立档案并进入' }}</view>
  </view>

  <view class="bottom"><text>本系统仅供战史研究使用 · 严守保密条例</text></view>
</view>
</template>

<script>
import { mockAuth } from '@/utils/data.js'
export default {
  data() {
    return { mode:'login', loading:false, loginForm:{username:'',password:''}, regForm:{username:'',password:'',password2:''} }
  },
  methods: {
    handleLogin() {
      const { username, password } = this.loginForm
      if (!username || !password) { uni.showToast({ title:'请填写完整', icon:'none' }); return }
      this.loading = true
      mockAuth.signInWithPassword({ email: username+'@wwii.internal', password }).then(r => {
        this.loading = false
        if (r.error) { uni.showToast({ title:r.error.message, icon:'none' }); return }
        uni.switchTab({ url:'/pages/home/home' })
      })
    },
    handleRegister() {
      const { username, password, password2 } = this.regForm
      if (!username || !password) { uni.showToast({ title:'请填写完整', icon:'none' }); return }
      if (password !== password2) { uni.showToast({ title:'两次密令不一致', icon:'none' }); return }
      if (password.length < 6) { uni.showToast({ title:'密令至少6位', icon:'none' }); return }
      this.loading = true
      mockAuth.signUp({ email: username+'@wwii.internal', password }).then(r => {
        this.loading = false
        if (r.error) { uni.showToast({ title:r.error.message, icon:'none' }); return }
        uni.showToast({ title:'档案建立成功！', icon:'success' })
        setTimeout(() => uni.switchTab({ url:'/pages/home/home' }), 800)
      })
    }
  }
}
</script>

<style scoped>
.page { min-height:100vh; padding:80rpx 32rpx 32rpx; background:#f4ebd8; }

.logo-area { text-align:center; margin-bottom:60rpx; }
.logo-icon { font-size:100rpx; }
.logo-title { display:block; font-family:Georgia,serif; font-size:48rpx; color:#2c221a; font-weight:700; margin-top:20rpx; }
.logo-line { display:flex; align-items:center; justify-content:center; gap:24rpx; margin-top:20rpx; }
.ll { width:48rpx; height:2rpx; background:#7a3b31; opacity:0.5; }
.ls { font-size:16rpx; color:#b8935a; }
.logo-sub { display:block; font-size:22rpx; color:#6e6150; margin-top:16rpx; font-style:italic; }

.tab-row { display:flex; margin-bottom:48rpx; border:1px solid #d4c4a8; border-radius:8rpx; overflow:hidden; }
.tab { flex:1; padding:22rpx; text-align:center; font-size:28rpx; font-weight:700; font-family:Georgia,serif; background:#f4ebd8; color:#6e6150; }
.tab.on { background:#7a3b31; color:#f4ebd8; }

.field { margin-bottom:28rpx; }
.flabel { display:block; font-size:24rpx; color:#6e6150; margin-bottom:12rpx; font-family:Georgia,serif; font-weight:700; }
.finp { display:block; width:100%; padding:26rpx; border:1.5px solid #d4c4a8; border-radius:8rpx; font-size:30rpx; background:#faf7ef; color:#2c221a; }

.btn { padding:26rpx; background:#7a3b31; color:#f4ebd8; border:2px solid #5c2a23; border-radius:8rpx; font-size:30rpx; font-weight:700; font-family:Georgia,serif; text-align:center; box-shadow:4rpx 4rpx 0px rgba(92,42,35,0.6); }

.bottom { text-align:center; margin-top:48rpx; padding-top:32rpx; border-top:1px solid rgba(196,182,157,0.4); font-size:22rpx; color:#9b8d7a; }
</style>
