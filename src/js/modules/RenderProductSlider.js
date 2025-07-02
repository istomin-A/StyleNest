import SliderCollection from "./Slider.js"

class RenderProductSlider {
    apiUrl = 'https://dummyjson.com/products'

    selectors = {
        root: '[data-js-product-slider]',
        productSliderOut: '[data-js-product-slider-out]',
        productSliderSlide: '[data-js-product-slider-slide]'
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        if (!this.rootElement) return
        this.productSliderOutElement = this.rootElement.querySelector(this.selectors.productSliderOut)
        this.render()
    }

    renderSlide(product) {
        const slideHTML = `<div class="main-slider__slide swiper-slide">
                        <article class="product">
                            <div class="product__inner">
                                <a href="#">
                                    <img class="product__image" src="${product?.images[0]}" alt="${product?.title}" width="377" height="384">
                                </a>
                            </div>
                            <h4 class="product__title">
                                <a href="#">
                                    ${product?.title}
                                </a>
                            </h4>
                            <p class="product__text">${product?.description}</p>
                            <p class="product__price">$${product?.price}</p>
                            <a href="#" class="product__button button">Add To Cart</a>
                        </article>
                    </div>`

        this.productSliderOutSlideElement.insertAdjacentHTML('beforeend', slideHTML)
    }

    renderSlider() {
        const sliderHTML = `
                <div class="main-slider swiper" data-js-slider>
                    <div class="main-slider__swiper swiper-wrapper" data-js-product-slider-slide></div>
                    <div class="main-slider__arrow main-slider__arrow_bottom swiper-button-prev" data-js-slider-arrow-prev></div>
                    <div class="main-slider__arrow main-slider__arrow_bottom swiper-button-next" data-js-slider-arrow-next></div>
                </div>
            `
        this.productSliderOutElement.insertAdjacentHTML('afterbegin', sliderHTML)
    }

    renderProductSlider(products) {
        const currentData = products.slice(0, 8)

        this.renderSlider()

        this.productSliderOutSlideElement = this.rootElement.querySelector(this.selectors.productSliderSlide)
        currentData.forEach((product) => this.renderSlide(product))

        new SliderCollection(() => ({
            thumbs: false,
            slidesPerView: 3,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                767.98: {
                    slidesPerView: 2,
                },
                1023.98: {
                    slidesPerView: 3,
                }
            }
        })) // инициализация слайдера
    }

    render() {
        fetch(this.apiUrl)
            .then((response) => {
                if (!response.ok) {
                    const errorMessageHTML =
                        `<div class="product-slider__body">
                            <p class="error-text">There are currently no products.</p>
                        </div>`

                    throw new Error(errorMessageHTML)
                }

                return response.json()
            })
            .then((json) => this.renderProductSlider(json.products))
            .catch((error) => {
                this.productSliderOutElement.insertAdjacentHTML('afterbegin', error.message)
            })
    }
}

export default RenderProductSlider