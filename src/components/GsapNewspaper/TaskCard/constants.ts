import type { ReactNode } from 'react'
import { BlockStudioLogo, KdanLogo, TitansoftLogo } from './custom/ImageContainer'

export type TaskType = {
  title: string
  subtitle: string
  content: string
  tipUrl: string
  contributeUrl: string
  TaskLogo: ReactNode | ReactNode[]
  EnterpriseLogo: ReactNode | ReactNode[]
}

export const Tasks = [
  {
    title: '視差滾動 Parallax Scrolling',
    subtitle: 'The F2E 活動網站設計',
    content: '請參考本屆官網的首頁視差滾動技巧，並請您重新 redesign 本頁面來設計。',
    tipUrl: 'https://sleet-berry-8a9.notion.site/GSAP-ddc5d9cf73b94b6fa16bd0d6a637482b',
    contributeUrl: 'https://2022.thef2e.com/works/create',
    ...BlockStudioLogo(),
  },
  {
    title: '線上簽署 Canvas',
    subtitle: '今晚，我想來點點簽',
    content: '每次要 PDF 簽名都要列印出來再掃描好麻煩，自幹一個 Web 版本的簽名服務吧！',
    tipUrl: 'https://eminent-temple-cd0.notion.site/PDF-da0347f450af4f67975e2c2d699c6c3e',
    contributeUrl: 'https://2022.thef2e.com/works/create',
    ...KdanLogo(),
  },
  {
    title: 'Scrum JS draggable',
    subtitle: 'Scrum 新手村',
    content:
      '設計關卡內容與網頁互動效果，透過頁面關卡來呈現知識點，讓挑戰者藉由你設計的內容更了解 Scrum。',
    tipUrl:
      'https://peppermint-hyacinth-b5e.notion.site/HTML-Draggable-API-SortableJS-b9b75a512f114ff8ad72f4076edeca6b',
    contributeUrl: 'https://2022.thef2e.com/works/create',
    ...TitansoftLogo(),
  },
]
