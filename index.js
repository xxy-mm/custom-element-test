class Typewriter extends HTMLElement {
  cursor
  shadow
  textarea
  keys

  constructor() {
    super()
    this.init()
  }

  init() {
    if (!this.shadow) {
      this.shadow = this.attachShadow({ mode: 'closed' })
      const template = document.getElementById('typewriter-template')
      this.shadow.appendChild(template.content.cloneNode(true))
      this.textarea = this.shadow.querySelector('textarea')
      this.keys = this.shadow.querySelector('div')
    }
  }

  initTextarea() {
    this.textarea.addEventListener('typed', e => {
      this.insert(e.detail.value)
    })

    this.textarea.addEventListener('deleted', () => {
      this.delete()
    })
  }

  typedEvent(value) {
    return new CustomEvent('typed', { detail: { value } })
  }
  deletedEvent() {
    return new CustomEvent('deleted')
  }

  insert(value) {
    this.textarea.value = this.textarea.value.slice(0, -1) + value + this.cursor
  }

  delete() {
    if (this.textarea.value.length === 1) return
    this.textarea.value = this.textarea.value.slice(0, -2) + this.cursor
  }
  intersectionHandler(entries, observer) {
    console.log(entries)
    if (!entries[0].isIntersecting) return
    observer.unobserve(this)

    fetch('./data.json')
      .then(res => res.json())
      .then(data => {
        this.textarea.value = this.cursor = data.value
      })
      .catch(err => {
        console.error(err)
      })
  }

  connectedCallback() {
    this.initTextarea()
    this.generateKeyboard()
    new IntersectionObserver(this.intersectionHandler.bind(this), {
      margin: 0,
    }).observe(this)
  }

  generateKeyboard() {
    for (let i = 97; i <= 122; i++) {
      let key = document.createElement('button')
      key.addEventListener('click', e => {
        this.textarea.dispatchEvent(this.typedEvent(e.target.innerText))
      })
      key.innerText = String.fromCharCode(i)
      this.keys.appendChild(key)
    }

    this.keys.appendChild(this.spaceButton())
    this.keys.appendChild(this.delButton())
  }

  delButton() {
    let del = document.createElement('button')
    del.innerText = 'DEL'
    del.addEventListener('click', () => {
      this.textarea.dispatchEvent(this.deletedEvent())
    })
    return del
  }

  spaceButton() {
    let spc = document.createElement('button')
    spc.innerText = 'SPC'
    spc.addEventListener('click', () => {
      this.textarea.dispatchEvent(this.typedEvent(' '))
    })
    return spc
  }
}

customElements.define('type-writer', Typewriter)
