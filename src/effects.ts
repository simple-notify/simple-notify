import { CLASSNAMES } from './consts'
import type Notify from './index'

export const fadeIn = (self: Notify): void => {
  self.wrapper.classList.add(CLASSNAMES.NOTIFY_FADE)
  setTimeout(() => {
    self.wrapper.classList.add(CLASSNAMES.NOTIFY_FADE_IN)
  }, 100)
}

export const fadeOut = (self: Notify): void => {
  self.wrapper.classList.remove(CLASSNAMES.NOTIFY_FADE_IN)
  setTimeout(() => {
    self.wrapper.remove()
  }, self.speed)
}

export const slideIn = (self: Notify): void => {
  self.wrapper.classList.add(CLASSNAMES.NOTIFY_SLIDE)
  setTimeout(() => {
    self.wrapper.classList.add(CLASSNAMES.NOTIFY_SLIDE_IN)
  }, 100)
}
export const slideOut = (self: Notify): void => {
  self.wrapper.classList.remove(CLASSNAMES.NOTIFY_SLIDE_IN)
  setTimeout(() => {
    self.wrapper.remove()
  }, self.speed)
}
