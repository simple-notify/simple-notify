import '../css/simple-notify.scss'
import { fadeIn, fadeOut, slideIn, slideOut } from './effects'
import type { notifyType, notifyStatus, notifyEffect, notifyPosition, IArgs } from './types'
import { stringToHTML } from './utils'

export default class Notify {
  wrapper: HTMLElement
  customWrapper: string
  container: HTMLElement
  status: notifyStatus
  type: notifyType
  effect: notifyEffect
  position: notifyPosition
  title: string
  text: string
  showIcon: boolean
  customIcon: string
  showCloseButton: boolean
  customClass: string
  speed: number
  autoclose: boolean
  autotimeout: number
  gap: number
  distance: number
  selectedNotifyInEffect: (self: Notify) => void
  selectedNotifyOutEffect: (self: Notify) => void

  constructor(args: IArgs) {
    const {
      status,
      type = 1,
      title,
      text,
      showIcon = true,
      customIcon = '',
      customClass = '',
      speed = 500,
      effect = 'fade',
      showCloseButton = true,
      autoclose = false,
      autotimeout = 3000,
      gap = 20,
      distance = 20,
      position = 'right top',
      customWrapper = ''
    } = args

    this.customWrapper = customWrapper
    this.status = status
    this.title = title
    this.text = text
    this.showIcon = showIcon
    this.customIcon = customIcon
    this.customClass = customClass
    this.speed = speed
    this.effect = effect
    this.showCloseButton = showCloseButton
    this.autoclose = autoclose
    this.autotimeout = autotimeout
    this.gap = gap
    this.distance = distance
    this.type = type
    this.position = position

    if (!this.checkRequirements()) {
      console.error("You must specify 'title' or 'text' at least.")
      return
    }

    // set outer container for all Notify's
    this.setContainer()

    // set wrapper for each Notify
    this.setWrapper()

    this.setPosition()

    // set icon in the left
    if (this.showIcon) this.setIcon()

    // set close button
    if (this.showCloseButton) this.setCloseButton()

    // set title, text
    this.setContent()

    // add the Notify to our container
    this.container.prepend(this.wrapper)

    // init effect
    this.setEffect()
    this.notifyIn(this.selectedNotifyInEffect)

    // init autoclose
    if (this.autoclose) this.autoClose()

    // check whether Notify is visible
    this.setObserver()
  }

  private checkRequirements(): boolean {
    return !!(this.title || this.text)
  }

  private setContainer(): void {
    const container: HTMLElement = document.querySelector('.notifications-container')
    if (container) {
      this.container = container
    } else {
      this.container = document.createElement('div')
      this.container.classList.add('notifications-container')
      document.body.appendChild(this.container)
    }

    this.container.style.setProperty('--distance', `${this.distance}px`)
  }

  private setPosition(): void {
    const prefix = 'notify-is-'

    this.position === 'center' ? this.container.classList.add(`${prefix}center`) : this.container.classList.remove(`${prefix}center`)
    this.position.includes('left') ? this.container.classList.add(`${prefix}left`) : this.container.classList.remove(`${prefix}left`)
    this.position.includes('right') ? this.container.classList.add(`${prefix}right`) : this.container.classList.remove(`${prefix}right`)
    this.position.includes('x-center') ? this.container.classList.add(`${prefix}x-center`) : this.container.classList.remove(`${prefix}x-center`)
    this.position.includes('top') ? this.container.classList.add(`${prefix}top`) : this.container.classList.remove(`${prefix}top`)
    this.position.includes('bottom') ? this.container.classList.add(`${prefix}bottom`) : this.container.classList.remove(`${prefix}bottom`)
    this.position.includes('y-center') ? this.container.classList.add(`${prefix}y-center`) : this.container.classList.remove(`${prefix}y-center`)
  }

  private setCloseButton(): void {
    const icon_close =
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m8.94 8 4.2-4.193a.67.67 0 0 0-.947-.947L8 7.06l-4.193-4.2a.67.67 0 1 0-.947.947L7.06 8l-4.2 4.193a.667.667 0 0 0 .217 1.093.666.666 0 0 0 .73-.146L8 8.94l4.193 4.2a.665.665 0 0 0 .947 0 .665.665 0 0 0 0-.947L8.94 8Z" fill="currentColor"/></svg>'
    const closeWrapper = document.createElement('div')
    closeWrapper.classList.add('notify__close')
    closeWrapper.innerHTML = icon_close
    this.wrapper.appendChild(closeWrapper)

    closeWrapper.addEventListener('click', () => {
      this.close()
    })
  }

  private setWrapper(): void {
    if (this.customWrapper) {
      this.wrapper = stringToHTML(this.customWrapper)
    } else {
      this.wrapper = document.createElement('div')
    }

    this.wrapper.style.setProperty('--gap', `${this.gap}px`)
    this.wrapper.style.transitionDuration = `${this.speed}ms`

    // set classes
    this.wrapper.classList.add('notify')
    this.wrapper.classList.add(`notify--type-${this.type}`)
    this.wrapper.classList.add(`notify--${this.status}`)

    if (this.autoclose) this.wrapper.style.setProperty('--timeout', `${this.autotimeout + this.speed}`)
    if (this.autoclose) this.wrapper.classList.add(`notify-autoclose`)

    if (this.customClass) this.wrapper.classList.add(this.customClass)
  }

  private setContent(): void {
    const contentWrapper = document.createElement('div')
    contentWrapper.classList.add('notify-content')

    let titleElement, textElement

    if (this.title) {
      titleElement = document.createElement('div')
      titleElement.classList.add('notify__title')
      titleElement.textContent = this.title
      if (!this.showCloseButton) titleElement.style.paddingRight = '0'
    }

    if (this.text) {
      textElement = document.createElement('div')
      textElement.classList.add('notify__text')
      textElement.innerHTML = this.text.trim()
      if (!this.title) textElement.style.marginTop = '0'
    }

    this.wrapper.appendChild(contentWrapper)
    if (this.title) contentWrapper.appendChild(titleElement)
    if (this.text) contentWrapper.appendChild(textElement)
  }

  private setIcon(): void {
    const icon_success =
      '<svg height="32" width="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m19.627 11.72-5.72 5.733-2.2-2.2a1.335 1.335 0 0 0-2.255.381 1.334 1.334 0 0 0 .375 1.5l3.133 3.146a1.333 1.333 0 0 0 1.88 0l6.667-6.667a1.334 1.334 0 1 0-1.88-1.893ZM16 2.667a13.333 13.333 0 1 0 0 26.666 13.333 13.333 0 0 0 0-26.666Zm0 24a10.666 10.666 0 1 1 0-21.333 10.666 10.666 0 0 1 0 21.333Z"/></svg>'
    const icon_error =
      '<svg height="32" width="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M16 2.667a13.333 13.333 0 1 0 0 26.666 13.333 13.333 0 0 0 0-26.666Zm0 24A10.667 10.667 0 0 1 5.333 16a10.56 10.56 0 0 1 2.254-6.533l14.946 14.946A10.56 10.56 0 0 1 16 26.667Zm8.413-4.134L9.467 7.587A10.56 10.56 0 0 1 16 5.333 10.667 10.667 0 0 1 26.667 16a10.56 10.56 0 0 1-2.254 6.533Z"/></svg>'
    const icon_warning =
      '<svg height="32" width="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M13.666 15A1.333 1.333 0 0 0 15 13.667V8.334a1.333 1.333 0 0 0-2.665 0v5.333A1.333 1.333 0 0 0 13.666 15Zm-.507 5.227c.325.134.69.134 1.014 0 .164-.064.314-.159.44-.28a1.56 1.56 0 0 0 .28-.44c.075-.158.111-.332.106-.507a1.333 1.333 0 0 0-.386-.946 1.53 1.53 0 0 0-.44-.28A1.333 1.333 0 0 0 12.334 19a1.4 1.4 0 0 0 .386.947c.127.121.277.216.44.28ZM13.666 27a13.333 13.333 0 1 0 0-26.667 13.333 13.333 0 0 0 0 26.667Zm0-24a10.667 10.667 0 1 1 0 21.333 10.667 10.667 0 0 1 0-21.333Z"/></svg>'
    const icon_info =
      '<svg height="32" width="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M16 14.667A1.333 1.333 0 0 0 14.667 16v5.333a1.333 1.333 0 1 0 2.666 0V16A1.333 1.333 0 0 0 16 14.667Zm.507-5.227a1.333 1.333 0 0 0-1.014 0 1.334 1.334 0 0 0-.44.28c-.117.13-.212.278-.28.44a1.12 1.12 0 0 0-.106.507 1.333 1.333 0 0 0 .386.946c.13.118.279.213.44.28a1.333 1.333 0 0 0 1.84-1.226 1.4 1.4 0 0 0-.386-.947 1.334 1.334 0 0 0-.44-.28ZM16 2.667a13.333 13.333 0 1 0 0 26.666 13.333 13.333 0 0 0 0-26.666Zm0 24a10.666 10.666 0 1 1 0-21.333 10.666 10.666 0 0 1 0 21.333Z"/></svg>'
    const computedIcon = (status: notifyStatus) => {
      switch (status) {
        case 'success':
          return icon_success
        case 'warning':
          return icon_warning
        case 'error':
          return icon_error
        case 'info':
          return icon_info
      }
    }

    const iconWrapper = document.createElement('div')
    iconWrapper.classList.add('notify__icon')
    iconWrapper.innerHTML = this.customIcon || computedIcon(this.status)
    if (this.status || this.customIcon) this.wrapper.appendChild(iconWrapper)
  }

  private setObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!(entries[0].intersectionRatio <= 0)) {
          return
        } else {
          this.close()
        }
      },
      {
        threshold: 0
      }
    )

    setTimeout(() => {
      observer.observe(this.wrapper)
    }, this.speed)
  }

  private notifyIn(callback: (p: Notify) => void): void {
    callback(this)
  }

  private notifyOut = (callback: (p: Notify) => void): void => {
    callback(this)
  }

  private autoClose(): void {
    setTimeout(() => {
      this.close()
    }, this.autotimeout + this.speed)
  }

  public close(): void {
    this.notifyOut(this.selectedNotifyOutEffect)
  }

  private setEffect(): void {
    switch (this.effect) {
      case 'fade':
        this.selectedNotifyInEffect = fadeIn
        this.selectedNotifyOutEffect = fadeOut
        break
      case 'slide':
        this.selectedNotifyInEffect = slideIn
        this.selectedNotifyOutEffect = slideOut
        break
      default:
        this.selectedNotifyInEffect = fadeIn
        this.selectedNotifyOutEffect = fadeOut
    }
  }
}
