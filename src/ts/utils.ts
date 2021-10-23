export const stringToHTML = (strHTML: string): HTMLElement => {
  const parser = new DOMParser(),
    content = 'text/html',
    DOM = parser.parseFromString(strHTML, content)

  return DOM.body.childNodes[0] as HTMLElement
}
