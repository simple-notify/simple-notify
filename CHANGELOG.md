# simple-notify Changelog

## 1.0.4

- Corrected misspelled `transition-properties` to `transition-property`.

## 1.0.2

- Added `grid-auto-rows: min-content` to notifications container.

## 1.0.1

- Fixed tsup `keepNames` config to prevent renaming of css classes.

## 1.0.0

### BREAKING CHANGES:

- All CSS variables renamed.
- All classes renamed.
- `type` values changed to `'outline'` (default) | `'filled'`.
- `autoclose` is `true` by default.

### Others:
- `status` set to `success` by default.

## 0.5.0

- [Feature] Added raw html support for `text` parameter https://github.com/dgknca/simple-notify/pull/5

## 0.4.0

- Added 3 new positions `'(top/bottom) x-center'`, `'(left/right) y-center'` and `'center'`
- Slide effect has been combined with fade

## 0.3.1

- Added custom typescript types

## 0.3.0

- `isIcon` replaced with `showIcon`
- `isCloseButton` replaced with `showCloseButton`

## 0.2.0

### Added

- Added `distance` and `position` parameters.
