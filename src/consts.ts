import SvgClose from './icons/close.svg'
import SvgError from './icons/error.svg'
import SvgInfo from './icons/info.svg'
import SvgSuccess from './icons/success.svg'
import SvgWarning from './icons/warning.svg'
import { getSvgNode } from './utils'

export const CLASSNAMES = {
  CONTAINER: 'sn-notifications-container',
  NOTIFY: 'sn-notify',
  NOTIFY_CONTENT: 'sn-notify-content',
  NOTIFY_ICON: 'sn-notify-icon',
  NOTIFY_CLOSE: 'sn-notify-close',
  NOTIFY_TITLE: 'sn-notify-title',
  NOTIFY_TEXT: 'sn-notify-text',
  IS_X_CENTER: 'sn-is-x-center',
  IS_Y_CENTER: 'sn-is-y-center',
  IS_CENTER: 'sn-is-center',
  IS_LEFT: 'sn-is-left',
  IS_RIGHT: 'sn-is-right',
  IS_TOP: 'sn-is-top',
  IS_BOTTOM: 'sn-is-bottom',
  NOTIFY_OUTLINE: 'sn-notify-outline',
  NOTIFY_FILLED: 'sn-notify-filled',
  NOTIFY_ERROR: 'sn-notify-error',
  NOTIFY_WARNING: 'sn-notify-warning',
  NOTIFY_SUCCESS: 'sn-notify-success',
  NOTIFY_INFO: 'sn-notify-info',
  NOTIFY_FADE: 'sn-notify-fade',
  NOTIFY_FADE_IN: 'sn-notify-fade-in',
  NOTIFY_SLIDE: 'sn-notify-slide',
  NOTIFY_SLIDE_IN: 'sn-notify-slide-in',
  NOTIFY_AUTOCLOSE: 'sn-notify-autoclose'
} as const

export const NOTIFY_STATUS_ENUMS = {
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success',
  INFO: 'info'
} as const

export const NOTIFY_TYPE_ENUMS = {
  OUTLINE: 'outline',
  FILLED: 'filled'
} as const

export const NOTIFY_ANIMATION_ENUMS = {
  FADE: 'fade',
  SLIDE: 'slide'
} as const

export const ICONS = {
  CLOSE: getSvgNode(SvgClose),
  SUCCESS: getSvgNode(SvgSuccess),
  ERROR: getSvgNode(SvgError),
  WARNING: getSvgNode(SvgWarning),
  INFO: getSvgNode(SvgInfo)
}
