export interface QuestionTemplate {
  question: string
  type: 'wheel' | 'dice' | 'card' | 'coin'
  options: string[]
  category: string
}

export const questionTemplates: QuestionTemplate[] = [
  // 食物类
  {
    question: '今晚吃什么？',
    type: 'wheel',
    options: ['火锅', '日料', '麦当劳', '中餐', '西餐', '烧烤'],
    category: '食物'
  },
  {
    question: '今天午餐吃什么？',
    type: 'dice',
    options: ['拉面', '盖饭', '沙拉', '三明治', '意面', '炒饭'],
    category: '食物'
  },
  {
    question: '周末去哪吃？',
    type: 'card',
    options: ['新开的餐厅', '常去的那家', '朋友推荐', '随机探索'],
    category: '食物'
  },
  
  // 旅行类
  {
    question: '下次旅行去哪？',
    type: 'wheel',
    options: ['北京', '上海', '广州', '深圳', '成都', '杭州'],
    category: '旅行'
  },
  {
    question: '周末去哪玩？',
    type: 'dice',
    options: ['公园', '博物馆', '电影院', '咖啡厅', '商场', '图书馆'],
    category: '旅行'
  },
  
  // 决定类
  {
    question: '要不要联系TA？',
    type: 'coin',
    options: ['联系', '不联系'],
    category: '决定'
  },
  {
    question: '今天要不要运动？',
    type: 'coin',
    options: ['运动', '不运动'],
    category: '决定'
  },
  {
    question: '要不要买这个？',
    type: 'coin',
    options: ['买', '不买'],
    category: '决定'
  },
  
  // 工作类
  {
    question: '今天先做什么？',
    type: 'card',
    options: ['重要紧急', '重要不紧急', '紧急不重要', '不紧急不重要'],
    category: '工作'
  },
  {
    question: '选择哪个项目？',
    type: 'wheel',
    options: ['项目A', '项目B', '项目C', '项目D'],
    category: '工作'
  },
  
  // 娱乐类
  {
    question: '看什么电影？',
    type: 'dice',
    options: ['动作片', '喜剧片', '爱情片', '科幻片', '恐怖片', '悬疑片'],
    category: '娱乐'
  },
  {
    question: '听什么音乐？',
    type: 'card',
    options: ['流行', '摇滚', '爵士', '古典'],
    category: '娱乐'
  },
  
  // 社交类
  {
    question: '谁买单？',
    type: 'dice',
    options: ['我', '朋友A', '朋友B', '朋友C', 'AA', '轮流'],
    category: '社交'
  },
  {
    question: '选哪个礼物？',
    type: 'card',
    options: ['选项A', '选项B', '选项C', '选项D'],
    category: '社交'
  }
]

export function getTemplatesByCategory(): Record<string, QuestionTemplate[]> {
  return questionTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = []
    }
    acc[template.category].push(template)
    return acc
  }, {} as Record<string, QuestionTemplate[]>)
}

export function getTemplatesByType(): Record<string, QuestionTemplate[]> {
  return questionTemplates.reduce((acc, template) => {
    if (!acc[template.type]) {
      acc[template.type] = []
    }
    acc[template.type].push(template)
    return acc
  }, {} as Record<string, QuestionTemplate[]>)
}



