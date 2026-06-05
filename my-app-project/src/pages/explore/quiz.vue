<template>
<view class="page">
  <view class="page-header">
    <text class="overline">INTELLIGENCE BRIEFING</text>
    <text class="title">情报测验</text>
    <text class="subtitle">测测你的二战知识储备</text>
    <view class="divider"></view>
  </view>

  <!-- 进度 -->
  <view class="progress-bar-wrap">
    <view class="progress-bar"><view class="fill" :style="{ width: progress + '%' }"></view></view>
    <text class="progress-text">{{ answered }}/{{ questions.length }}</text>
  </view>

  <!-- 题目 -->
  <view class="quiz-card" v-for="(q, qi) in questions" :key="q.id">
    <view class="q-meta">
      <text class="q-diff" :class="q.difficulty">{{ diffLabel(q.difficulty) }}</text>
      <text class="q-cat">{{ q.category }}</text>
    </view>
    <text class="q-text">{{ qi + 1 }}. {{ q.question }}</text>
    <view class="q-options">
      <view class="q-opt" v-for="(opt, oi) in q.options" :key="oi"
        :class="{ correct: q.selected !== undefined && oi === q.answer, wrong: q.selected === oi && oi !== q.answer }"
        @click="selectAnswer(q, oi)">
        {{ opt }}
      </view>
    </view>
    <view class="q-explanation" v-if="q.selected !== undefined">
      <text class="q-exp-title">{{ q.selected === q.answer ? '✅ 回答正确！' : '❌ 回答错误' }}</text>
      <text class="q-exp-text">{{ q.explanation }}</text>
    </view>
  </view>

  <view class="btn-primary" @click="submitQuiz">{{ submitted ? '已提交' : '✦ 提交情报答卷' }}</view>
</view>
</template>

<script>
import { mockDB, saveQuizRecord } from '@/utils/data.js'

export default {
  data() {
    return {
      questions: [],
      submitted: false
    }
  },
  computed: {
    answered() { return this.questions.filter(q => q.selected !== undefined).length },
    progress() { return this.questions.length ? (this.answered / this.questions.length) * 100 : 0 }
  },
  async mounted() {
    const { data } = await mockDB.from('quiz_questions').select('*').limit(5)._exec()
    if (data) this.questions = data.map(q => ({ ...q, selected: undefined }))
  },
  methods: {
    diffLabel(d) { return d === 'easy' ? '初级' : d === 'medium' ? '中级' : '高级' },
    selectAnswer(q, idx) { if (q.selected === undefined) q.selected = idx },
    submitQuiz() {
      if (this.submitted) return
      this.submitted = true
      const correct = this.questions.filter(q => q.selected === q.answer).length
      uni.showToast({ title: `答对 ${correct}/${this.questions.length} 题！`, icon: 'success', duration: 2500 })
    }
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

.progress-bar-wrap { display:flex; align-items:center; gap:20rpx; margin-bottom:28rpx; }
.progress-bar { flex:1; height:6rpx; background:var(--parchment-deep); border-radius:3rpx; overflow:hidden; }
.fill { height:100%; background:var(--archive-red); border-radius:3rpx; transition:width 0.3s; }
.progress-text { font-size:22rpx; color:var(--ink-muted); font-family:'Georgia',serif; }

.quiz-card { background:var(--parchment-white); border:1px solid rgba(196,182,157,0.5); border-radius:16rpx; padding:36rpx; margin-bottom:24rpx; }
.q-meta { display:flex; justify-content:space-between; margin-bottom:20rpx; }
.q-diff { font-size:20rpx; padding:6rpx 20rpx; border-radius:20rpx; font-weight:700; font-family:'Georgia',serif; }
.q-diff.easy { background:#e8ecf2; color:var(--navy); }
.q-diff.medium { background:#f4ecd8; color:#8b6d3f; }
.q-diff.hard { background:#f0dede; color:var(--axis-red); }
.q-cat { font-size:20rpx; color:var(--ink-muted); font-family:'Georgia',serif; }
.q-text { font-size:28rpx; font-weight:600; color:var(--ink-dark); line-height:1.6; display:block; margin-bottom:24rpx; }
.q-options { display:flex; flex-direction:column; gap:16rpx; }
.q-opt { padding:22rpx 28rpx; border:1.5px solid var(--parchment-deep); border-radius:8rpx; font-size:26rpx; color:var(--ink-body); background:var(--parchment-white); }
.q-opt.correct { border-color:#3a6b4a; background:#eaf2ec; color:#2a4a35; font-weight:600; }
.q-opt.wrong { border-color:var(--axis-red); background:#faf0f0; color:#7a2a2a; }
.q-explanation { margin-top:24rpx; padding:24rpx; background:rgba(196,182,157,0.15); border-radius:8rpx; }
.q-exp-title { font-size:26rpx; font-weight:700; color:var(--ink-dark); display:block; margin-bottom:8rpx; }
.q-exp-text { font-size:24rpx; color:var(--ink-muted); line-height:1.5; }

.btn-primary { margin-top:16rpx; }
</style>
