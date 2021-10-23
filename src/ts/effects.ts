import type Notify from './index'

export const fadeIn = (self: Notify): void => {
  self.wrapper.classList.add('notify--fade')
  setTimeout(() => {
    self.wrapper.classList.add('notify--fadeIn')
  }, 100)
}

export const fadeOut = (self: Notify): void => {
  self.wrapper.classList.remove('notify--fadeIn')
  setTimeout(() => {
    self.wrapper.remove()
  }, self.speed)
}

export const slideIn = (self: Notify): void => {
  self.wrapper.classList.add('notify--slide')
  setTimeout(() => {
    self.wrapper.classList.add('notify--slideIn')
  }, 100)
}
export const slideOut = (self: Notify): void => {
  self.wrapper.classList.remove('notify--slideIn')
  setTimeout(() => {
    self.wrapper.remove()
  }, self.speed)
}
