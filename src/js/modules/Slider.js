import Swiper from 'swiper'
import { Navigation, Autoplay, Thumbs, Zoom } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import 'swiper/css/zoom'
// https://swiperjs.com/ - документация

const rootSelector = '[data-js-slider]'

class Slider {
    selectors = {
        arrowPrev: '[data-js-slider-arrow-prev]',
        arrowNext: '[data-js-slider-arrow-next]'
    }

    constructor(rootElement, options = {}) {
        this.rootElement = rootElement
        this.arrowPrevElement = this.rootElement.querySelector(this.selectors.arrowPrev)
        this.arrowNextElement = this.rootElement.querySelector(this.selectors.arrowNext)
        this.options = options
        this.initSlider()
    }

    initSlider() {
        new Swiper(this.rootElement, {
            modules: [Navigation, Autoplay],

            speed: 800,
            slidesPerView: this.options.slidesPerView || 3,

            navigation: {
                prevEl: this.arrowPrevElement,
                nextEl: this.arrowNextElement
            },

            breakpoints: this.options.breakpoints || {
                320: {
                    slidesPerView: 1,
                },
                767.98: {
                    slidesPerView: 2,
                },
                1023.98: {
                    slidesPerView: 3,
                }
            },

            autoplay: this.options.autoplay || false
        })
    }
}

class ProductSlider {
    selectors = {
        slider: '.product-page__slider',
        sliderThumbs: '.product-page__slider-thumbs',
    }

    constructor(rootElement, options = {}) {
        this.rootElement = rootElement
        this.options = options
        this.initSlider()
    }

    initSlider() {
        const thumbsSwiper = new Swiper(this.selectors.sliderThumbs, {
            modules: [Thumbs],

            speed: this.options.speed,
            spaceBetween: this.options.thumbsSlider.spaceBetween,
            slidesPerView: this.options.thumbsSlider.slidesPerView,
        })
        new Swiper(this.selectors.slider, {
            modules: [Thumbs, Zoom],

            speed: this.options.speed,
            spaceBetween: this.options.slider.spaceBetween,
            slidesPerView: this.options.slider.slidesPerView,
            zoom: this.options.slider.zoom,
            thumbs: {
                swiper: thumbsSwiper,
            },
        })
    }
}

class SliderCollection {
    constructor(options = {}) {
        this.options = options
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((slider, index) => {
            if (slider.dataset.sliderInitialized === 'true') return

            const sliderOptions = typeof this.options === 'function'
                ? this.options(slider, index)
                : this.options

            if (this.options().thumbs) {
                new ProductSlider(slider, sliderOptions)
            } else {
                new Slider(slider, sliderOptions)
            }

            slider.dataset.sliderInitialized = 'true'
        })
    }
}

export default SliderCollection