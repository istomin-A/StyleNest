const rootElement = '[data-js-tabs]'

class Tabs {
    selectors = {
        root: rootElement,
        button: '[data-js-tab-button]',
        content: '[data-js-tab-content]'
    }

    stateClasses = {
        isActive: '_active'
    }

    stateAttributes = {
        ariaSelected: 'aria-selected',
        tabIndex: 'tabindex'
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)
        this.state = {
            activeButton: [...this.buttonElements].findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.isActive))
        }
        this.limitTabsIndex = this.buttonElements.length - 1
        this.initTabs()
    }

    updateUI() {
        const { activeButton } = this.state

        this.buttonElements.forEach((buttonElement, index) => {
            const isActive = index === activeButton

            buttonElement.classList.toggle(this.stateClasses.isActive, isActive)
            buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString())
            buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? '0' : '-1')
        })

        this.contentElements.forEach((contentElement, index) => {
            const isActive = index === activeButton

            contentElement.classList.toggle(this.stateClasses.isActive, isActive)
            if (!contentElement.classList.contains('_active')) {
                contentElement.style.display = 'none'
            } else {
                contentElement.removeAttribute('style')
            }
        })
    }

    buttonClick(buttonIndex) {
        this.state.activeButton = buttonIndex
        this.updateUI()
    }

    activateTab(newTabIndex) {
        this.state.activeButton = newTabIndex
        this.buttonElements[newTabIndex].focus()
    }

    previousTab = () => {
        const newTabIndex = this.state.activeButton === 0 ? this.limitTabsIndex : this.state.activeButton - 1

        this.activateTab(newTabIndex)
    }

    nextTab = () => {
        const newTabIndex = this.state.activeButton === this.limitTabsIndex ? 0 : this.state.activeButton + 1

        this.activateTab(newTabIndex)
    }

    keyDown = (event) => {
        const { code } = event

        const action = {
            ArrowLeft: this.previousTab,
            ArrowRight: this.nextTab
        }[code]

        if (action) {
            action()
            this.updateUI()
        }
    }

    initTabs() {
        this.updateUI()
        this.buttonElements.forEach((buttonElement, index) => buttonElement.addEventListener('click', () => this.buttonClick(index)))
        this.rootElement.addEventListener('keydown', this.keyDown)
    }
}

class TabsCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootElement).forEach((element) => new Tabs(element))
    }
}

export default TabsCollection