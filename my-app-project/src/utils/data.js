// ============================================
// Mock 数据层 — 替代 Supabase
// 数据来源：静态 JSON + localStorage
// 接口设计：模拟 Supabase 的调用方式，方便以后无缝替换
// ============================================

// ---------- 静态数据 ----------
const MOCK_ARTICLES = [
  { id:1, title:'闪电战：从波兰到法国的战术革命', content:'', excerpt:'德军如何在不到一年的时间里横扫欧洲大陆？本文深入剖析闪电战的三大核心要素。', coverColor:'ac1', type:'article', duration:'35 分钟', wordCount:12800, viewCount:3200, category:'深度解析', emoji:'⚔️', created_at:'2026-05-01' },
  { id:2, title:'艾森豪威尔：盟军最高统帅的领导艺术', content:'', excerpt:'一个从未指挥过战斗的上校，如何在短短三年内成为欧洲战场最高统帅？', coverColor:'ac2', type:'article', duration:'25 分钟', wordCount:9500, viewCount:2100, category:'人物评传', emoji:'🏛️', created_at:'2026-05-05' },
  { id:3, title:'太平洋战争转折点：中途岛海战全复盘', content:'', excerpt:'五分钟的差距决定国运——日军机动部队为何在短短数小时内全军覆没？', coverColor:'ac3', type:'article', duration:'42 分钟', wordCount:15200, viewCount:5600, category:'战史复盘', emoji:'🌊', created_at:'2026-05-10' },
  { id:4, title:'二战全史：从凡尔赛到冷战', content:'', excerpt:'系统梳理二战全过程', coverColor:'vt1', type:'video', duration:'共24集', rating:'4.9', plays:'12.8万', created_at:'2026-04-20' },
  { id:5, title:'诺曼底登陆：D-Day 全纪实', content:'', excerpt:'90分钟纪录片', coverColor:'vt2', type:'video', duration:'90分钟', rating:'4.8', plays:'8.3万', created_at:'2026-04-25' },
  { id:6, title:'武器解码：二战坦克进化史', content:'', excerpt:'科普系列共8集', coverColor:'vt3', type:'video', duration:'共8集', rating:'4.7', plays:'6.5万', created_at:'2026-05-02' }
]

const MOCK_QUESTIONS = [
  { id:1, question:'第二次世界大战欧洲战场爆发的标志性事件是？', options:['A. 德国入侵波兰','B. 珍珠港事件','C. 诺曼底登陆','D. 斯大林格勒战役'], answer:0, difficulty:'easy', category:'欧洲战场', explanation:'1939年9月1日德国入侵波兰，英法随即对德宣战，标志着二战的全面爆发。' },
  { id:2, question:'中途岛海战发生于哪一年？', options:['A. 1941年','B. 1942年','C. 1943年','D. 1944年'], answer:1, difficulty:'medium', category:'太平洋战场', explanation:'中途岛海战发生于1942年6月，美军击沉日本四艘主力航母。' },
  { id:3, question:'"霸王行动"是哪场战役的代号？', options:['A. 巴巴罗萨行动','B. 市场花园行动','C. 诺曼底登陆','D. 火炬行动'], answer:2, difficulty:'hard', category:'战略分析', explanation:'霸王行动是1944年6月6日诺曼底登陆的代号。' },
  { id:4, question:'斯大林格勒战役持续了大约多长时间？', options:['A. 3个月','B. 5个月','C. 7个月','D. 9个月'], answer:1, difficulty:'medium', category:'东线战场', explanation:'从1942年8月持续到1943年2月，约5个月。' },
  { id:5, question:'日本偷袭珍珠港的日期是？', options:['A. 1941年12月7日','B. 1941年11月7日','C. 1942年1月7日','D. 1940年12月7日'], answer:0, difficulty:'easy', category:'太平洋战场', explanation:'1941年12月7日，日本偷袭珍珠港，美国正式参战。' }
]

const MOCK_POSTS = [
  { id:1, title:'【深度】阿拉曼战役中装甲兵运用的战术得失', content:'从后勤补给线、地形利用和装甲兵协同三个维度，重新审视这场北非战场的转折点。蒙哥马利与隆美尔的博弈，至今仍值得深思...', author:'隆美尔之狐', category:'名将评析', like_count:247, comment_count:83, view_count:1200, tags:['#北非战场#','#装甲战术#'], created_at:'2026-06-04T10:00:00Z', avatar:'🎖️', av:'av1' },
  { id:2, title:'假如南云忠一在中途岛做出了不同的决策？', content:'一个经典的"反事实推演"——如果日军保留了机动部队主力，太平洋战局是否会被改写？', author:'太平洋观察者', category:'太平洋战争', like_count:412, comment_count:156, view_count:2800, tags:['#反事实推演#','#中途岛#'], created_at:'2026-06-04T08:00:00Z', avatar:'📡', av:'av2' },
  { id:3, title:'【资料整理】二战各主要参战国战时工业产能对比', content:'整理了美、苏、德、英、日五国1939-1945年的钢产量、石油产量和飞机产量数据，附原始档案来源...', author:'战史研究生', category:'资源分享', like_count:189, comment_count:42, view_count:956, tags:['#数据#','#工业产能#'], created_at:'2026-06-03T16:00:00Z', avatar:'📚', av:'av3' },
  { id:4, title:'【高清地图】1944年诺曼底登陆作战全貌图', content:'从英国国家档案馆获取的高分辨率扫描件，标注了五个登陆滩头的详细兵力部署...', author:'地图收藏家', category:'资源分享', like_count:531, comment_count:98, view_count:4100, tags:['#地图#','#诺曼底#'], created_at:'2026-06-02T12:00:00Z', avatar:'🗺️', av:'av1' }
]

// ---------- LocalStorage 工具 ----------
const LS = {
  get(key, fallback) { try { const v = uni.getStorageSync(key); return v || fallback } catch(e) { return fallback } },
  set(key, val) { try { uni.setStorageSync(key, val) } catch(e) {} }
}

// ---------- Auth Mock ----------
export const mockAuth = {
  async signUp({ email, password }) {
    const users = LS.get('wwii_users', [])
    if (users.find(u => u.email === email)) {
      return { data: null, error: { message: '该档案号已存在' } }
    }
    const newUser = { id: 'u_' + Date.now(), email, password, createdAt: new Date().toISOString() }
    users.push(newUser)
    LS.set('wwii_users', users)
    LS.set('wwii_currentUser', newUser)
    return { data: { user: newUser }, error: null }
  },
  async signInWithPassword({ email, password }) {
    const users = LS.get('wwii_users', [])
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) return { data: null, error: { message: '档案号或密令错误' } }
    LS.set('wwii_currentUser', user)
    return { data: { user }, error: null }
  },
  async getUser() {
    const user = LS.get('wwii_currentUser', null)
    return { data: { user } }
  },
  async signOut() {
    LS.set('wwii_currentUser', null)
    return { error: null }
  }
}

// ---------- DB Mock（模拟 Supabase 的 from().select() 链式调用）----------
class MockQuery {
  constructor(collection) {
    this.collection = collection
    this._filters = []
    this._order = null
    this._limit = null
    this._ascending = true
  }
  select(cols) { return this }  // 兼容 Supabase 的 .select('*')
  order(col, { ascending = true } = {}) { this._order = col; this._ascending = ascending; return this }
  limit(n) { this._limit = n; return this }
  eq(col, val) { this._filters.push({ col, op: 'eq', val }); return this }

  async _exec() {
    let data = this._getData()
    // apply filters
    this._filters.forEach(f => {
      if (f.op === 'eq') data = data.filter(d => d[f.col] === f.val)
    })
    // sort
    if (this._order) {
      data.sort((a, b) => {
        const va = a[this._order], vb = b[this._order]
        if (typeof va === 'string') return this._ascending ? va.localeCompare(vb) : vb.localeCompare(va)
        return this._ascending ? va - vb : vb - va
      })
    }
    if (this._limit) data = data.slice(0, this._limit)
    return { data, error: null }
  }

  _getData() {
    switch(this.collection) {
      case 'articles': return [...MOCK_ARTICLES]
      case 'quiz_questions': return [...MOCK_QUESTIONS]
      case 'posts': {
        const saved = LS.get('wwii_posts', [])
        return [...saved, ...MOCK_POSTS]
      }
      default: return []
    }
  }
}

// 模拟 supabase.from('xxx')
export const mockDB = {
  from(collection) {
    return new MockQuery(collection)
  }
}

// 发帖
export async function addPost(post) {
  const posts = LS.get('wwii_posts', [])
  const newPost = {
    id: Date.now(),
    title: post.title,
    content: post.content,
    author: post.author || '匿名用户',
    category: post.category || '其他',
    tags: post.tags || [],
    like_count: 0,
    comment_count: 0,
    view_count: 0,
    created_at: new Date().toISOString(),
    avatar: '📝',
    av: 'av' + ((posts.length % 3) + 1)
  }
  posts.unshift(newPost)
  LS.set('wwii_posts', posts)
  return { data: [newPost], error: null }
}

// 收藏
export function getFavorites() { return LS.get('wwii_favorites', []) }
export function addFavorite(item) {
  const favs = LS.get('wwii_favorites', [])
  if (!favs.find(f => f.targetId === item.targetId && f.targetType === item.targetType)) {
    favs.push({ ...item, id: Date.now(), created_at: new Date().toISOString() })
    LS.set('wwii_favorites', favs)
  }
  return favs
}
export function removeFavorite(targetId, targetType) {
  let favs = LS.get('wwii_favorites', [])
  favs = favs.filter(f => !(f.targetId === targetId && f.targetType === targetType))
  LS.set('wwii_favorites', favs)
  return favs
}

// 测验记录
export function getQuizRecords() { return LS.get('wwii_quizRecords', []) }
export function saveQuizRecord(record) {
  const records = LS.get('wwii_quizRecords', [])
  records.push({ ...record, id: Date.now(), answeredAt: new Date().toISOString() })
  LS.set('wwii_quizRecords', records)
  return records
}
