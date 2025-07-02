import IMask from 'imask'

const inputSelector = '[data-js-mask-phone]'

class MaskPhone {

    constructor(input) {
        this.input = input
        this.initMask()
    }

    initMask() {
        IMask(
            this.input,
            { mask: '+{2} (000) 000-0000' }
        )
    }
}

class MaskPhoneCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(inputSelector).forEach((element) => new MaskPhone(element))
    }
}

export default MaskPhoneCollection