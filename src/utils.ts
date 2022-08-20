export const stringToHTML = (strHTML: string): HTMLElement => {
  const parser = new DOMParser(),
    content = 'text/html',
    DOM = parser.parseFromString(strHTML, content)

  return DOM.body.childNodes[0] as HTMLElement
}

export const getSvgNode = (svg: string) => {
  const doc = new DOMParser().parseFromString(svg, 'application/xml')
  const node = document.importNode(doc.documentElement, true)
  return node.outerHTML
}
