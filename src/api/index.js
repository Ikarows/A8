import { get } from '@/config/request'

export const count = p => get('/cov/count', p) // 统计数据
export const news = p => get('/cov/news', p) // 新闻列表
export const team = p => get('/cov/team', p)// 球队状况详情
