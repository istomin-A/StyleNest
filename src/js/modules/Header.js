class Header {
    selectors = {
        root: '[data-js-header]',
        headerWrapperBurger: '[data-js-header-wrapper-burger]',
        headerPromo: '[data-js-header-promo]',
        headerMain: '[data-js-header-main]',
        menuBody: '[data-js-menu-body]',
        burger: '[data-js-burger]',
        menuLinks: '[data-js-menu-link]'
    }

    stateClasses = {
        isActive: '_active',
        isLock: '_lock',
        isScroll: '_scroll'
    }

    ariaAttribute = {
        ariaExpanded: 'aria-expanded',
        ariaLabel: 'aria-label'
    }

    stateAriaAttribute = {
        ariaLabelOpen: 'Open menu',
        ariaLabelClose: 'Close menu',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        this.headerWrapperBurgerElement = this.rootElement.querySelector(this.selectors.headerWrapperBurger)
        this.headerPromoElement = this.rootElement.querySelector(this.selectors.headerPromo)
        this.headerMainElement = this.rootElement.querySelector(this.selectors.headerMain)
        this.burgerElement = this.rootElement.querySelector(this.selectors.burger)
        this.menuLinksElements = this.rootElement.querySelectorAll(this.selectors.menuLinks)
        this.bindEvents()
    }

    toggleBurger = () => {
        const isActive = this.burgerElement.classList.contains(this.stateClasses.isActive)

        this.burgerElement.classList.toggle(this.stateClasses.isActive)
        this.headerWrapperBurgerElement.classList.toggle(this.stateClasses.isActive)
        document.body.classList.toggle(this.stateClasses.isLock)

        this.burgerElement.setAttribute(this.ariaAttribute.ariaExpanded, String(!isActive))
        this.burgerElement.setAttribute(this.ariaAttribute.ariaLabel, !isActive ? this.stateAriaAttribute.ariaLabelClose : this.stateAriaAttribute.ariaLabelOpen)
    }

    scrollHeader = () => {
        const scrollPosition = window.scrollY >= 50

        this.rootElement.classList.toggle(this.stateClasses.isScroll, scrollPosition)
        this.headerPromoElement.classList.toggle(this.stateClasses.isScroll, scrollPosition)
        this.headerMainElement.classList.toggle(this.stateClasses.isScroll, scrollPosition)
    }

    bindEvents() {
        this.burgerElement.addEventListener('click', this.toggleBurger)
        window.addEventListener('scroll', this.scrollHeader)
    }
}

export default Header