import { NOTIFY_TYPE_ENUMS, NOTIFY_ANIMATION_ENUMS, NOTIFY_STATUS_ENUMS } from './consts'

type notifyPosition =
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

type notifyType = typeof NOTIFY_TYPE_ENUMS[keyof typeof NOTIFY_TYPE_ENUMS]
type notifyEffect = typeof NOTIFY_ANIMATION_ENUMS[keyof typeof NOTIFY_ANIMATION_ENUMS]
type notifyStatus = typeof NOTIFY_STATUS_ENUMS[keyof typeof NOTIFY_STATUS_ENUMS]

interface IArgs {
  status: notifyStatus
  type?: notifyType
  effect?: notifyEffect
  position?: notifyPosition
  title?: string
  text?: string
  showIcon?: boolean
  customIcon?: string
  showCloseButton?: boolean
  customClass?: string
  speed?: number
  autoclose?: boolean
  autotimeout?: number
  notificationsGap?: number
  notificationsPadding?: number
  customWrapper?: string
}

export { notifyType, notifyEffect, notifyStatus, notifyPosition, IArgs }
