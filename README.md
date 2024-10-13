# Simple Notify

Simple Notify is a pure Javascript library to show nice and customizable alert notifications.

[Live Demo](https://simple-notify.github.io/simple-notify/)

![](./demo/assets/types.png)

## Install

```bash
npm i simple-notify
```

```js
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.css'
```

## Include

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simple-notify/dist/simple-notify.css" />

<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/simple-notify/dist/simple-notify.min.js"></script>
```

## Parameters

| Parameter                                   | Type    | Values                                                                                                                                       |    Default    |
| :------------------------------------------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------- | :-----------: |
| `status`                                    | String  | `'error'`, `'warning'`, `'success'`, `'info'`                                                                                                |    `null`     |
| `title`                                     | String  |                                                                                                                                              |    `null`     |
| `text`                                      | String  | You can send any type of html.                                                                                                               |    `null`     |
| `customIcon`                                | String  | You can send any type of html.                                                                                                               |    `null`     |
| `customClass`                               | String  |                                                                                                                                              |    `null`     |
| `speed`                                     | Number  | transition-duration in milliseconds.                                                                                                         |      300      |
| `effect`                                    | String  | `'fade'`, `'slide'`                                                                                                                          |   `'fade'`    |
| `showIcon`                                  | Boolean |                                                                                                                                              |     true      |
| `showCloseButton`                           | Boolean |                                                                                                                                              |     true      |
| `autoclose`                                 | Boolean |                                                                                                                                              |     true     |
| `autotimeout` (with `autoclose: true`) | Number  |                                                                                                                                              |     3000      |
| `gap` (margin between notifications)        | Number  |                                                                                                                                              |      20       |
| `distance` (distance to edges)              | Number  |                                                                                                                                              |      20       |
| `type`                   | String  | `'outline'`, `'filled'`                                                                                                                                     |       `'outline'`       |
| `position`                                  | String  | Combine x and y position. `'left'`, `'right'`, `'top'`, `'bottom'`, `'x-center'`, `'y-center'` or use only `'center'` to center both x and y | `'right top'` |

<sub>All parameters are optional but you must specify 'title' or 'text' at least.</sub>

## Functions

| Function | Description                                                       |
| :------- | :---------------------------------------------------------------- |
| close()  | You can close the notification manually using the close function. |

## How to use

Just create a new instance, notification will be sent immediately. Simple example:

```js
function pushNotify() {
  new Notify({
    title: 'Notify Title',
    text: 'Notify text lorem ipsum',
  })
}
```

Full example:

```js
function pushNotify() {
  new Notify({
    status: 'success',
    title: 'Notify Title',
    text: 'Notify text lorem ipsum',
    effect: 'fade',
    speed: 300,
    customClass: null,
    customIcon: null,
    showIcon: true,
    showCloseButton: true,
    autoclose: true,
    autotimeout: 3000,
    gap: 20,
    distance: 20,
    type: 'outline',
    position: 'right top'
  })
}
```

Close manually:

```js
let myNotify

function pushNotify() {
  myNotify = new Notify({
    status: 'success',
    title: 'Notify Title',
    text: 'notify text',
    effect: 'slide',
    type: 'filled'
  })
}

function close() {
  myNotify.close()
}
```

## CSS

These styles can be customized easily using CSS variables. You can overwrite them in `.sn-notifications-container` or your custom class.

```css
.sn-notifications-container {
  /* colors */
  --sn-success-color: rgb(111, 207, 151);
  --sn-success-progress-color: rgb(84, 170, 120);
  --sn-error-color: rgb(235, 87, 87);
  --sn-error-progress-color: rgb(192, 69, 69);
  --sn-warning-color: rgb(242, 201, 76);
  --sn-warning-progress-color: rgb(196, 166, 79);
  --sn-info-color: rgb(81, 205, 243);
  --sn-info-progress-color: rgb(84, 169, 196);

  /* container */
  --sn-notifications-gap: 20px; /* controlled by js */
  --sn-notifications-padding: 20px; /* controlled by js */

  /* notify */
  --sn-notify-width: 320px;
  --sn-notify-radius: 6px;
  --sn-notify-transition-timing-function: ease;
  --sn-notify-transition-duration: 500ms; /* controlled by js */
  --sn-notify-autoclose-timeout: 30000ms; /* controlled by js */
  --sn-notify-padding: 0.75em;
  --sn-notify-icon-size: 2em;
  --sn-notify-close-icon-size: 1em;
  --sn-notify-border-size: 1px;
  --sn-notify-border-color: transparent;
  --sn-notify-border-style: solid;
  --sn-notify-progress-color: rgb(51, 51, 51);
  --sn-notify-close-icon-color: rgb(51, 51, 51);
  --sn-notify-title-color: rgb(51, 51, 51);
  --sn-notify-text-color: rgb(77, 77, 77);
  --sn-notify-shadow-color: transparent;
  --sn-notify-progress-height: 5px;
}
```

## Credits

Designed by [Prabesh Shakya](https://www.figma.com/@prabesh)
