const rootElement = '[data-js-spoller]'

class Spoller {
    timeAnimationMS = 300 // 300 мс соответствует длительности transition

    selectors = {
        root: rootElement,
        button: '[data-js-spoller-button]',
        icon: '[data-js-spoller-icon]',
        body: '[data-js-spoller-body]'
    }

    stateClases = {
        isActive: '_active'
    }

    stateAttributes = {
        style: 'style',
        open: 'open'
    }

    inlineStyles = {
        hidden: 'hidden',
        transition: `max-height ${this.timeAnimationMS}ms ease-in-out`,
        block: 'block',
        none: 'none'
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.spollerButton = this.rootElement.querySelector(this.selectors.button)
        this.spollerIcon = this.rootElement.querySelector(this.selectors.icon)
        this.spollerBody = this.rootElement.querySelector(this.selectors.body)
        this.initSpoller()
    }

    updateSpollerClasses(isOpen) {
        this.spollerButton.classList.toggle(this.stateClases.isActive, isOpen)
        this.spollerBody.classList.toggle(this.stateClases.isActive, isOpen)
        this.spollerIcon?.classList.toggle(this.stateClases.isActive, isOpen)
    }

    toggleSpoller = (e) => {
        e.preventDefault()
        const isOpen = this.rootElement.hasAttribute(this.stateAttributes.open)

        // Общие стили для анимации споллера
        this.spollerBody.style.overflow = this.inlineStyles.hidden
        this.spollerBody.style.transition = this.inlineStyles.transition

        this.updateSpollerClasses(!isOpen)

        if (!isOpen) {
            // Анимация открытия споллера
            this.rootElement.open = !isOpen
            this.spollerBody.style.display = this.inlineStyles.block
            this.spollerBody.style.maxHeight = '0px'
            this.spollerBody.style.maxHeight = this.spollerBody.scrollHeight + 'px'
            setTimeout(() => this.spollerBody.removeAttribute(this.stateAttributes.style), this.timeAnimationMS)
        } else {
            // Анимация закрытия споллера
            this.spollerBody.style.maxHeight = this.spollerBody.scrollHeight + 'px'
            this.spollerBody.offsetHeight // reflow
            this.spollerBody.style.maxHeight = '0px'
            setTimeout(() => {
                this.spollerBody.removeAttribute(this.stateAttributes.style)
                this.spollerBody.style.display = this.inlineStyles.none
                this.rootElement.removeAttribute(this.stateAttributes.open)
            }, this.timeAnimationMS)
        }
    }

    initSpoller() {
        const isOpen = this.rootElement.hasAttribute(this.stateAttributes.open)
        if (!isOpen) this.spollerBody.style.display = this.inlineStyles.none
        this.updateSpollerClasses(isOpen)

        this.spollerButton.addEventListener('click', this.toggleSpoller)
    }
}

class SpollerCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootElement).forEach((element) => new Spoller(element))
    }
}

export default SpollerCollection