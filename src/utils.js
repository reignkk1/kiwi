export function createElement(tag, attr) {
  /** @type {Element|null} */
  const element = document.createElement(tag);

  if (attr) {
    for (const [prop, value] of Object.entries(attr)) {
      if (prop === "innerText") {
        element.innerText = value;
      } else {
        element.setAttribute(prop, value);
      }
    }
  }

  return element;
}
