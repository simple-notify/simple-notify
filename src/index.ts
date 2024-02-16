import { CLASSNAMES, ICONS, NOTIFY_ANIMATION_ENUMS, NOTIFY_STATUS_ENUMS, NOTIFY_TYPE_ENUMS } from './consts'
import { fadeIn, fadeOut, slideIn, slideOut } from './effects'
import './style.css'
import type { IArgs, NotifyEffect, NotifyPosition, NotifyStatus, NotifyType } from './types'
import { stringToHTML } from './utils'

export default class Notify {
  wrapper: HTMLElement
  customWrapper: string
  container: HTMLElement
  status: NotifyStatus
  type: NotifyType
  effect: NotifyEffect
  position: NotifyPosition
  title: string
  text: string
  showIcon: boolean
  customIcon: string
  showCloseButton: boolean
  customClass: string
  speed: number
  autoclose: boolean
  autotimeout: number
  notificationsGap: number
  notificationsPadding: number
  selectedNotifyInEffect: (self: Notify) => void
  selectedNotifyOutEffect: (self: Notify) => void

  constructor(args: IArgs) {
    const {
      notificationsGap = 20,
      notificationsPadding = 20,
      status = 'success',
      effect = NOTIFY_ANIMATION_ENUMS.FADE,
      type = 'outline',
      title,
      text,
      showIcon = true,
      customIcon = '',
      customClass = '',
      speed = 500,
      showCloseButton = true,
      autoclose = true,
      autotimeout = 3000,
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
    this.notificationsGap = notificationsGap
    this.notificationsPadding = notificationsPadding
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
    const container: HTMLElement = document.querySelector(`.${CLASSNAMES.CONTAINER}`)
    if (container) {
      this.container = container
    } else {
      this.container = document.createElement('div')
      this.container.classList.add(CLASSNAMES.CONTAINER)
      document.body.appendChild(this.container)
    }

    if (this.notificationsPadding) {
      this.container.style.setProperty('--sn-notifications-padding', `${this.notificationsPadding}px`)
    }

    if (this.notificationsGap) {
      this.container.style.setProperty('--sn-notifications-gap', `${this.notificationsGap}px`)
    }
  }

  private setPosition(): void {
    this.container.classList[this.position === 'center' ? 'add' : 'remove'](CLASSNAMES.IS_CENTER)
    this.container.classList[this.position.includes('left') ? 'add' : 'remove'](CLASSNAMES.IS_LEFT)
    this.container.classList[this.position.includes('right') ? 'add' : 'remove'](CLASSNAMES.IS_RIGHT)
    this.container.classList[this.position.includes('top') ? 'add' : 'remove'](CLASSNAMES.IS_TOP)
    this.container.classList[this.position.includes('bottom') ? 'add' : 'remove'](CLASSNAMES.IS_BOTTOM)
    this.container.classList[this.position.includes('x-center') ? 'add' : 'remove'](CLASSNAMES.IS_X_CENTER)
    this.container.classList[this.position.includes('y-center') ? 'add' : 'remove'](CLASSNAMES.IS_Y_CENTER)
  }

  private setCloseButton(): void {
    const closeWrapper = document.createElement('div')
    closeWrapper.classList.add(CLASSNAMES.NOTIFY_CLOSE)
    closeWrapper.innerHTML = ICONS.CLOSE
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
    this.wrapper.style.setProperty('--sn-notify-transition-duration', `${this.speed}ms`)

    // set classes
    this.wrapper.classList.add(CLASSNAMES.NOTIFY)

    switch (this.type) {
      case NOTIFY_TYPE_ENUMS.OUTLINE:
        this.wrapper.classList.add(CLASSNAMES.NOTIFY_OUTLINE)
        break
      case NOTIFY_TYPE_ENUMS.FILLED:
        this.wrapper.classList.add(CLASSNAMES.NOTIFY_FILLED)
        break
      default:
        this.wrapper.classList.add(CLASSNAMES.NOTIFY_OUTLINE)
    }

    switch (this.status) {
      case NOTIFY_STATUS_ENUMS.SUCCESS:
        this.wrapper.classList.add(CLASSNAMES.NOTIFY_SUCCESS)
        break
      case NOTIFY_STATUS_ENUMS.ERROR:
        this.wrapper.classList.add(CLASSNAMES.NOTIFY_ERROR)
        break
      case NOTIFY_STATUS_ENUMS.WARNING:
        this.wrapper.classList.add(CLASSNAMES.NOTIFY_WARNING)
        break
      case NOTIFY_STATUS_ENUMS.INFO:
        this.wrapper.classList.add(CLASSNAMES.NOTIFY_INFO)
        break
    }

    if (this.autoclose) {
      this.wrapper.classList.add(CLASSNAMES.NOTIFY_AUTOCLOSE)
      this.wrapper.style.setProperty('--sn-notify-autoclose-timeout', `${this.autotimeout + this.speed}ms`)
    }

    if (this.customClass) {
      const classes = this.customClass.split(' ')
      classes.forEach((className) => {
        this.wrapper.classList.add(className)
      })
    }
  }

  private setContent(): void {
    const contentWrapper = document.createElement('div')
    contentWrapper.classList.add(CLASSNAMES.NOTIFY_CONTENT)

    let titleElement, textElement

    if (this.title) {
      titleElement = document.createElement('div')
      titleElement.classList.add(CLASSNAMES.NOTIFY_TITLE)
      titleElement.textContent = this.title.trim()
      if (!this.showCloseButton) titleElement.style.paddingRight = '0'
    }

    if (this.text) {
      textElement = document.createElement('div')
      textElement.classList.add(CLASSNAMES.NOTIFY_TEXT)
      textElement.innerHTML = this.text.trim()
      if (!this.title) textElement.style.marginTop = '0'
    }

    this.wrapper.appendChild(contentWrapper)
    if (this.title) contentWrapper.appendChild(titleElement)
    if (this.text) contentWrapper.appendChild(textElement)
  }

  private setIcon(): void {
    const computedIcon = (status: NotifyStatus) => {
      switch (status) {
        case NOTIFY_STATUS_ENUMS.SUCCESS:
          return ICONS.SUCCESS
        case NOTIFY_STATUS_ENUMS.ERROR:
          return ICONS.ERROR
        case NOTIFY_STATUS_ENUMS.WARNING:
          return ICONS.WARNING
        case NOTIFY_STATUS_ENUMS.INFO:
          return ICONS.INFO
      }
    }

    const iconWrapper = document.createElement('div')
    iconWrapper.classList.add(CLASSNAMES.NOTIFY_ICON)
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
      case NOTIFY_ANIMATION_ENUMS.FADE:
        this.selectedNotifyInEffect = fadeIn
        this.selectedNotifyOutEffect = fadeOut
        break
      case NOTIFY_ANIMATION_ENUMS.SLIDE:
        this.selectedNotifyInEffect = slideIn
        this.selectedNotifyOutEffect = slideOut
        break
      default:
        this.selectedNotifyInEffect = fadeIn
        this.selectedNotifyOutEffect = fadeOut
    }
  }
}

;(globalThis as any).Notify = Notify
