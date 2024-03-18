# HTML Custom

## custom element & autonomous element

### autonomous element

```js
class Typewriter extends HTMLElement {
  constructor() {
    super()
  }
}
customElements.define('type-writer', Typewriter)
```

```html
<type-writer></type-writer>
```

### custom element

```js
class Typewriter extends HTMLParagraphElement {
  constructor() {
    super()
  }
}
customElements.define('type-writer', Typewriter, { extends: 'p' })
```

```html
<p is="type-writer"></p>
```

### lifecycle callbacks

- connectedCallback: called each time the element is added to the document
- disconnectedCallback: called each time the element is removed from the document
- adoptedCallback: called each time the element is moved to a new document
- attributeChangedCallback: called when attributes are changed, added, removed, or replaced
  - prerequisite: static observedAttributes: array of attribute names
  - arguments
    - attribute name
    - old value
    - new value

```js
class MyCustomElement extends HTMLElement {
  static observedAttributes = ['size']

  constructor() {
    super()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      `Attribute ${name} has changed from ${oldValue} to ${newValue}.`
    )
  }
}

customElements.define('my-custom-element', MyCustomElement)
```

## custom event

```js
const customEvent = new CustomEvent('custom')
const anotherEvent = new CustomEvent('another', {
  detail: { value: 'another' },
})

someElement.addEventListener('another', e => {
  console.log(e.detail.value)
})

someElement.dispatchEvent(anotherEvent)
```

> Inspired by the blog: [A Quick Guide to Custom HTML Elements](https://dev.to/zippcodder/a-quick-guide-to-custom-html-elements-5f3b)
