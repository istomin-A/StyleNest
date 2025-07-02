class Search {
    selectors = {
        root: '[data-js-header-wrapper]',
        button: '[data-js-search-button]',
        form: '[data-js-search-form]',
        input: '[data-js-search-input]',
        send: '[data-js-search-send]'
    }

    stateClasses = {
        isActive: '_active'
    }

    stateAttributes = {
        ariaExpanded: 'aria-expanded'
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        this.searchButtonElement = this.rootElement.querySelector(this.selectors.button)
        this.searchFormElement = this.rootElement.querySelector(this.selectors.form)
        this.searchInputElement = this.searchFormElement.querySelector(this.selectors.input)
        this.searchSendElement = this.searchFormElement.querySelector(this.selectors.send)
        this.bindEvents()
    }

    UpdateUI() {
        const isActive = this.searchFormElement.classList.contains(this.stateClasses.isActive)

        this.searchFormElement.classList.toggle(this.stateClasses.isActive, !isActive)
        this.searchButtonElement.setAttribute(this.stateAttributes.ariaExpanded, !isActive)
    }

    closeSearchKeyDown = () => {
        this.UpdateUI()
    }

    keyDown = (e) => {
        const { code } = e

        const action = {
            Escape: this.closeSearchKeyDown
        }[code]

        if (action) {
            action()
        }
    }

    closeSearch = (e) => {
        const isActive = this.searchFormElement.classList.contains(this.stateClasses.isActive)

        if (isActive && e.target !== this.searchInputElement && e.target !== this.searchSendElement) {
            this.UpdateUI()
            document.removeEventListener('click', this.closeSearch)
        } else {
            document.removeEventListener('click', this.closeSearch)
        }
    }

    buttonclick = (e) => {
        e.stopPropagation()
        this.UpdateUI()
        this.searchInputElement.focus()
        document.addEventListener('click', this.closeSearch)
    }

    bindEvents() {
        this.searchButtonElement.addEventListener('click', this.buttonclick)
        this.searchFormElement.addEventListener('keydown', this.keyDown)
    }
}

export default Search