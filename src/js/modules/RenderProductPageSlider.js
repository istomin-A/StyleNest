import SliderCollection from "./Slider.js"

class RenderProductPageSlider {
    apiUrl = 'https://dummyjson.com/products'

    selectors = {
        root: '[data-js-product-page-slider]',
        out: '[data-js-product-page-out]',
        slide: '[data-js-product-slider-slide]',
        thumbs: '[data-js-product-slider-thumbs]'
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        if (!this.rootElement) return
        this.productSliderOutElement = this.rootElement.querySelector(this.selectors.out)
        this.render()
    }

    renderSlide(product) {
        const slideHTML = `
                    <div class="product-page__slide swiper-slide ">
                        <div class="swiper-zoom-container">
                            <img class="product-page__image" src="${product?.images[0]}" alt="${product?.title}" width="613" height="613">
                        </div>
                    </div>
            `

        const slideThumbsHTML = `
                    <div class="product-page__slide product-page__slide_thumbs swiper-slide ">
                                    <img class="product-page__image-thumbs" src="${product?.thumbnail}" alt="${product?.title}" width="87"
                                        height="87">
                                </div>
            `

        this.productSliderOutSlideElement.insertAdjacentHTML('beforeend', slideHTML)
        this.productSliderOutThumbsElement.insertAdjacentHTML('beforeend', slideThumbsHTML)
    }

    renderSlider() {
        const sliderHTML = `
                        <div class="product-page__slider swiper" data-js-slider>
                            <div class="product-page__swiper swiper-wrapper" data-js-product-slider-slide>
                                
                            </div>
                        </div>
                        <div class="product-page__slider-thumbs swiper" data-js-slider>
                            <div class="product-page__swiper-thumbs swiper-wrapper" data-js-product-slider-thumbs>
                                
                            </div>
                        </div>
            `
        this.productSliderOutElement.insertAdjacentHTML('afterbegin', sliderHTML)
    }

    renderProductPageSlider(products) {
        const currentData = products.slice(0, 4)

        this.renderSlider()

        this.productSliderOutSlideElement = this.rootElement.querySelector(this.selectors.slide)
        this.productSliderOutThumbsElement = this.rootElement.querySelector(this.selectors.thumbs)
        currentData.forEach((product) => this.renderSlide(product))

        new SliderCollection(() => ({
            thumbs: true,
            speed: 800,
            thumbsSlider: {
                spaceBetween: 12,
                slidesPerView: 3
            },
            slider: {
                spaceBetween: 40,
                slidesPerView: 1,
                zoom: {
                    maxRatio: 3,
                    minRatio: 1,
                },
            }
        })) // инициализация слайдера
    }

    render() {
        fetch(this.apiUrl)
            .then((response) => {
                if (!response.ok) {
                    const errorMessageHTML =
                        `<div class="product-page__error">
                            <p class="error-text">There are currently no products.</p>
                        </div>`

                    throw new Error(errorMessageHTML)
                }

                return response.json()
            })
            .then((json) => this.renderProductPageSlider(json.products))
            .catch((error) => {
                this.productSliderOutElement.insertAdjacentHTML('afterbegin', error.message)
            })
    }
}

export default RenderProductPageSlider