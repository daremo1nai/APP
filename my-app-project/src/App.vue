<script>
export default {
  onLaunch() { console.log('二战历史地图集 · App Launch') },
  onShow() { console.log('App Show') },
  onHide() { console.log('App Hide') }
}
</script>

<style>
/* ============================================
   全局样式 — 羊皮纸档案室主题
   ============================================ */
page {
  --ink-black:    #1a1410;
  --ink-dark:     #2c221a;
  --ink-body:     #3e362c;
  --ink-muted:    #6e6150;
  --ink-soft:     #9b8d7a;
  --parchment:    #e8dcc8;
  --parchment-deep: #d4c4a8;
  --parchment-light: #f4ebd8;
  --parchment-white: #faf7ef;
  --archive-red:      #7a3b31;
  --archive-red-dark: #5c2a23;
  --brass:         #b8935a;
  --brass-light:   #d4b87a;
  --navy:          #2c4a6e;
  --axis-red:      #8b2a2a;
  --radius-sm: 4px;
  --radius-md: 8px;

  background-color: var(--parchment-light);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: var(--ink-body);
  -webkit-font-smoothing: antialiased;
}

.card {
  background: var(--parchment-white);
  border: 1px solid rgba(196,182,157,0.5);
  border-radius: var(--radius-md);
  padding: 24rpx;
  margin-bottom: 20rpx;
}
.card-title {
  font-family: 'Georgia', serif;
  font-size: 30rpx;
  font-weight: 700;
  color: var(--ink-dark);
}

.btn-primary {
  display: flex; align-items: center; justify-content: center;
  width: 100%; padding: 24rpx;
  background: var(--archive-red); color: #f4ebd8;
  border: 2px solid var(--archive-red-dark);
  border-radius: var(--radius-sm);
  font-size: 28rpx; font-weight: 700;
  font-family: 'Georgia', serif; letter-spacing: 2rpx;
  box-shadow: 4rpx 4rpx 0px rgba(92,42,35,0.6);
}
.btn-primary:active { transform: translate(2rpx,2rpx); box-shadow: 2rpx 2rpx 0px rgba(92,42,35,0.6); }

.input-group { margin-bottom: 24rpx; }
.input-group label {
  display: block; font-size: 22rpx; color: var(--ink-muted);
  margin-bottom: 10rpx; text-transform: uppercase; letter-spacing: 3rpx;
  font-family: 'Georgia', serif; font-weight: 700;
}
.input-group input {
  width: 100%; padding: 24rpx 28rpx;
  border: 1.5px solid var(--parchment-deep); border-radius: var(--radius-sm);
  font-size: 28rpx; background: var(--parchment-white); color: var(--ink-dark); outline: none;
}

.page-header { margin-bottom: 32rpx; }
.page-header .overline {
  font-size: 20rpx; text-transform: uppercase; letter-spacing: 6rpx;
  color: var(--archive-red); font-family: 'Georgia', serif; margin-bottom: 8rpx;
}
.page-header .title {
  font-family: 'Georgia', serif; font-size: 48rpx;
  color: var(--ink-dark); font-weight: 700; line-height: 1.2;
}
.page-header .subtitle { font-size: 24rpx; color: var(--ink-muted); margin-top: 8rpx; font-style: italic; }
.page-header .divider {
  width: 80rpx; height: 4rpx; background: var(--archive-red); margin-top: 20rpx; opacity: 0.6;
}

.tab-bar {
  position: fixed; bottom: 0; left: 0; right: 0; height: 120rpx;
  background: linear-gradient(180deg, #faf7ef 0%, #f0e8d5 100%);
  display: flex; align-items: flex-start; justify-content: space-around;
  border-top: 1px solid #d4c4a8; z-index: 999; padding-top: 16rpx;
  box-shadow: 0 -4rpx 24rpx rgba(26,20,16,0.06);
}
.tab-item {
  display: flex; flex-direction: column; align-items: center; gap: 4rpx;
  padding: 8rpx 24rpx; background: none; border: none;
  font-size: 22rpx; color: var(--ink-muted); position: relative;
}
.tab-item.active { color: var(--archive-red); font-weight: 700; }
.tab-item.active::before {
  content: ''; position: absolute; top: -2rpx; left: 50%; transform: translateX(-50%);
  width: 40rpx; height: 4rpx; background: var(--archive-red); border-radius: 2rpx;
}
.tab-icon { font-size: 40rpx; }
</style>
