import SliderCollection from "./Slider.js"

class RenderIntroSlider {
    apiUrl = 'https://dummyjson.com/products'

    selectors = {
        root: '[data-js-intro]',
        introSliderOut: '[data-js-intro-out-slider]',
        introSliderSlide: '[data-js-intro-slider-slide]'
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        if (!this.rootElement) return
        this.introSliderOutElement = this.rootElement.querySelector(this.selectors.introSliderOut)
        this.render()
    }

    renderSlide(product) {
        const slideHTML = `<div class="main-slider__slide swiper-slide">
                    <article class="product">
                        <div class="product__inner product__inner_margin-null">
                            <a href="#">
                                <img class="product__image product__image_big" src="${product?.images[0]}" alt="${product?.title}" width="430" height="590">
                            </a>
                        </div>
                        <div class="product__info product__info_pos-top">Best Seller</div>
                        <div class="product__wrapper">
                            <a href="#" class="product__button product__button_width-max button">Add To Cart</a>
                            <a href="#" class="product__info product__info_link">
                                View Similar
                                <svg class="product__icon">
                                    <use xlink:href="img/sprite/sprite.svg#arrow"></use>
                                </svg>
                            </a>
                        </div>
                    </article>
                </div>`

        this.introSliderOutSlideElement.insertAdjacentHTML('beforeend', slideHTML)
    }

    renderSlider() {
        const sliderHTML = `
                <div class="main-slider main-slider_no-padding swiper" data-js-slider>
                    <div class="main-slider__swiper swiper-wrapper" data-js-intro-slider-slide></div>
                </div>
            `
        this.introSliderOutElement.insertAdjacentHTML('afterbegin', sliderHTML)
    }

    renderIntroSlider(products) {
        const currentData = products.slice(0, 4)

        this.renderSlider()

        this.introSliderOutSlideElement = this.rootElement.querySelector(this.selectors.introSliderSlide)
        currentData.forEach((product) => this.renderSlide(product))

        new SliderCollection(() => ({
            thumbs: false,
            slidesPerView: 1,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                767.98: {
                    slidesPerView: 2,
                },
                1023.98: {
                    slidesPerView: 1,
                }
            },
            autoplay: { delay: 4000 }
        })) // инициализация слайдера
    }

    render() {
        fetch(this.apiUrl)
            .then((response) => {
                if (!response.ok) {
                    const errorMessageHTML =
                        `<div class="intro__none">
                            <p class="error-text">There are currently no products.</p>
                        </div>`

                    throw new Error(errorMessageHTML)
                }

                return response.json()
            })
            .then((json) => this.renderIntroSlider(json.products))
            .catch((error) => {
                this.introSliderOutElement.insertAdjacentHTML('afterbegin', error.message)
            })
    }
}

export default RenderIntroSlider