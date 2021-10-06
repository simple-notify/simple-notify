type notifyType = 1 | 2 | 3
type notifyStatus = 'success' | 'warning' | 'error'
type notifyEffect = 'fade' | 'slide'
type notifyPosition = 'left top' | 'top left' | 'right top' | 'top right' | 'left bottom' | 'bottom left' | 'right bottom' | 'bottom right' |
  'center' | 'left y-center' | 'right y-center' | 'y-center left' | 'y-center right' | 'top x-center' | 'bottom x-center' | 'x-center top' | 'x-center bottom'

export { notifyType, notifyStatus, notifyEffect, notifyPosition }