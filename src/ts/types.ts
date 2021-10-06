export type Type = 1 | 2 | 3
export type Status = 'success' | 'warning' | 'error' | 'info'
export type Effect = 'fade' | 'slide'
export type Position = 'left top' | 'top left' | 'right top' | 'top right' | 'left bottom' | 'bottom left' | 'right bottom' | 'bottom right' |
 'center' | 'left y-center' | 'right y-center' | 'y-center left' | 'y-center right' | 'top x-center' | 'bottom x-center' | 'x-center top' | 'x-center bottom'

export interface IArgs {
    status?: Status
    type?: Type
    effect?: Effect
    position?: Position
    title?: string
    text?: string
    showIcon?: Boolean
    customIcon?: string
    showCloseButton?: Boolean
    customClass?: string
    speed?: number
    autoclose?: Boolean
    autotimeout?: number
    gap?: number
    distance?: number
  }