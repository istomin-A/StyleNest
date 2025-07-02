class Quantity {
    selectors = {
        root: '[data-js-quantity]',
        buttonMinus: '[data-js-button-minus]',
        buttonPlus: '[data-js-button-plus]',
        input: '[data-js-input]'
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        if (!this.rootElement) return
        this.buttonMinusElement = this.rootElement.querySelector(this.selectors.buttonMinus)
        this.buttonPlusElement = this.rootElement.querySelector(this.selectors.buttonPlus)
        this.inputElement = this.rootElement.querySelector(this.selectors.input)
        this.init()
    }

    quantityMinus = (e) => {
        let textQuantityCurrent = Number(this.inputElement.getAttribute('value'))
        if (textQuantityCurrent > 1) {
            let quantityMinus = textQuantityCurrent -= 1
            this.inputElement.setAttribute('value', quantityMinus)
        }
    }

    quantityPlus = (e) => {
        let textQuantityCurrent = Number(this.inputElement.getAttribute('value'))
        if (textQuantityCurrent < 30) {
            let quantityPlus = textQuantityCurrent += 1
            this.inputElement.setAttribute('value', quantityPlus)
        }
    }

    init() {
        this.buttonMinusElement.addEventListener('click', this.quantityMinus)
        this.buttonPlusElement.addEventListener('click', this.quantityPlus)
    }
}

export default Quantity