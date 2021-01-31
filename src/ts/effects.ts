export const fadeIn = (self:any) => {
  self.wrapper.classList.add('notify--fade')
  setTimeout(() => {self.wrapper.classList.add('notify--fadeIn')}, 100)
}

export const fadeOut = (self:any) => {
  self.wrapper.classList.remove('notify--fadeIn')
  setTimeout(() => {self.wrapper.remove()}, self.speed)
}

export const slideIn = (self:any) => {
  self.wrapper.classList.add('notify--slide')
  setTimeout(() => {self.wrapper.classList.add('notify--slideIn')}, 100)
}
export const slideOut = (self:any) => {
  self.wrapper.classList.remove('notify--slideIn')
  setTimeout(() => {self.wrapper.remove()}, self.speed)
}
