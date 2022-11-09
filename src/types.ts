import { NOTIFY_ANIMATION_ENUMS, NOTIFY_STATUS_ENUMS, NOTIFY_TYPE_ENUMS } from './consts'

type NotifyPosition =
  | 'left top'
  | 'top left'
  | 'right top'
  | 'top right'
  | 'left bottom'
  | 'bottom left'
  | 'right bottom'
  | 'bottom right'
  | 'center'
  | 'left y-center'
  | 'right y-center'
  | 'y-center left'
  | 'y-center right'
  | 'top x-center'
  | 'bottom x-center'
  | 'x-center top'
  | 'x-center bottom'

type NotifyType = typeof NOTIFY_TYPE_ENUMS[keyof typeof NOTIFY_TYPE_ENUMS]
type NotifyEffect = typeof NOTIFY_ANIMATION_ENUMS[keyof typeof NOTIFY_ANIMATION_ENUMS]
type NotifyStatus = typeof NOTIFY_STATUS_ENUMS[keyof typeof NOTIFY_STATUS_ENUMS]

interface IArgs {
  status?: NotifyStatus
  type?: NotifyType
  effect?: NotifyEffect
  position?: NotifyPosition
  title?: string
  text?: string
  showIcon?: boolean
  customIcon?: string
  showCloseButton?: boolean
  closeOnClick?: boolean
  customClass?: string
  speed?: number
  autoclose?: boolean
  autotimeout?: number
  notificationsGap?: number
  notificationsPadding?: number
  customWrapper?: string
}

export { NotifyType, NotifyEffect, NotifyStatus, NotifyPosition, IArgs }
