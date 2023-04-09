class Tooltip extends HTMLElement {
  constructor() {
    super()
    // this._tooltipContainer
    this._tooltipIcon
    this._tooltipVisible = false
    this._tooltipText = 'Some dummy'
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: relative;
        }
        div {
          font-weight: normal;
          background-color: black;
          color: white;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          z-index: 10;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.26)
        }

        :host(.important) {
          background: var(--color-primary, #ccc);
          padding: 0.15rem;
        }

        :host-context(p) {
          font-weight: bold;
        }

        ::slotted(.highlight) {
          border-bottom: 1px dotted red;
        }

        .icon {
          background: black;
          color: white;
          padding: 0.15rem 0.5rem;
          text-align: center;
          border-radius: 50%;
        }
      </style>

      <slot>Some default</slot>
      <span class="icon">?</span>
    `
    // ::slotted(*) {} -> all slot styled
    // light dom style이 오버라이드 된다.
  }

  // 이 메서드가 호출될 때만 element가 실제 DOM에 mount된다.
  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text')
    }
    this._tooltipIcon = this.shadowRoot.querySelector('span')
    this._tooltipIcon.addEventListener(
      'mouseenter',
      this._showTooltip.bind(this)
    )
    this._tooltipIcon.addEventListener(
      'mouseleave',
      this._hideTooltip.bind(this)
    )
    this.shadowRoot.appendChild(this._tooltipIcon)
    this._render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return
    }
    if (name === 'text') {
      this._tooltipText = newValue
    }
  }

  static get observedAttributes() {
    // text attribute의 변화를 관찰한다는 의미
    return ['text']
  }

  disconnectedCallback() {
    // element가 삭제되면 어차피 브라우저가 이벤트를 자동으로 지워준다.
    // 아래 코드는 이렇게 쓸 수 있다 정도의 기록용이다.
    // HTTP를 끊는다거나에 사용할 수 있다.
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip)
    this._tooltipIcon.removeEventListener('mouseenter', this._hideTooltip)
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector('div')
    if (this._tooltipVisible) {
      tooltipContainer = document.createElement('div')
      tooltipContainer.textContent = this._tooltipText
      this.shadowRoot.appendChild(tooltipContainer)
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer)
      }
    }
  }

  // _ 를 표시한 이유: 클래스 내부에서만 호출 할 메서드이기 때문에 명시적 표시
  // 지금은 # 으로 표시할 수 있다. 모든 브라우저에서 지원되는지 확인 필요
  _showTooltip() {
    // this._tooltipContainer = document.createElement('div')
    // this._tooltipContainer.textContent = this._tooltipText
    // this.shadowRoot.appendChild(this._tooltipContainer)
    this._tooltipVisible = true
    this._render()
  }

  _hideTooltip() {
    // this.shadowRoot.removeChild(this._tooltipContainer)
    this._tooltipVisible = false
    this._render()
  }
}

customElements.define('lily-tooltip', Tooltip)
