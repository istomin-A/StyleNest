import noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'
// https://refreshless.com/nouislider/ - документация

class RangeSlider {
    selectors = {
        root: '[data-js-root-range-slider]',
        rangeSlider: '[data-js-range-slider]',
        inputFrom: '[data-js-input-from]',
        inputTo: '[data-js-input-to]',
        toolTip: '.noUi-tooltip'
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        if (!this.rootElement) return
        this.rangeSliderElement = this.rootElement.querySelector(this.selectors.rangeSlider)
        this.inputFromElement = this.rootElement.querySelector(this.selectors.inputFrom)
        this.inputToElement = this.rootElement.querySelector(this.selectors.inputTo)
        this.inputsElements = [this.inputFromElement, this.inputToElement]
        this.initRangeSlider()
    }

    initRangeSlider() {
        noUiSlider.create(this.rangeSliderElement, {
            start: [Number(this.inputFromElement.value), Number(this.inputToElement.value)],
            step: 200,
            connect: true,
            tooltips: [true, true],
            format: {
                to: value => Math.round(value),
                from: value => Number(value)
            },
            range: {
                'min': Number(this.inputFromElement.min),
                'max': Number(this.inputToElement.max)
            }
        })

        // Включение/Отключение тултипов
        const tooltips = this.rangeSliderElement.querySelectorAll(this.selectors.toolTip)

        tooltips.forEach(tip => tip.style.display = 'none')

        this.rangeSliderElement.noUiSlider.on('start', () => {
            tooltips.forEach(tip => tip.style.display = 'block')
        })

        this.rangeSliderElement.noUiSlider.on('end', () => {
            tooltips.forEach(tip => tip.style.display = 'none')
        })

        // Связка с input полями
        this.rangeSliderElement.noUiSlider.on('update', (values, handle) => {
            this.inputsElements[handle].value = values[handle]
        })
    }
}

export default RangeSlider