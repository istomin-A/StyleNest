import SliderCollection from "./Slider.js"
import emilyImage from '../../img/article-reviews/emily.png'
import rajeshImage from '../../img/article-reviews/rajesh.png'
import starImage from '../../img/article-reviews/star.svg'
import commaImage from '../../img/article-reviews/icon.svg'

class RenderReviews {
    apiUrl = 'https://dummyjson.com/comments'

    selectors = {
        root: '[data-js-reviews]',
        reviewsOutSlider: '[data-js-reviews-out-slider]',
        reviewsOutSlide: '[data-js-reviews-out-slide]'
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        if (!this.rootElement) return
        this.reviewsOutSliderElement = this.rootElement.querySelector(this.selectors.reviewsOutSlider)
        this.render()
    }

    renderSlider() {
        const sliderHTML = `
                <div class="main-slider swiper" data-js-slider>
                    <div class="main-slider__swiper swiper-wrapper" data-js-reviews-out-slide></div>
                    <div class="main-slider__arrow swiper-button-prev" data-js-slider-arrow-prev></div>
                    <div class="main-slider__arrow swiper-button-next" data-js-slider-arrow-next></div>
                </div>
            `
        this.reviewsOutSliderElement.insertAdjacentHTML('afterbegin', sliderHTML)
    }

    renderSlide(comment) {
        const slideHTML = `<div class="main-slider__slide swiper-slide">
                                <article class="article-reviews">
                                    <div class="article-reviews__body">
                                        <img class="article-reviews__image" src="${comment?.id === 2 || comment?.id === 4 ? rajeshImage : emilyImage}" alt="${comment?.user?.fullName}" width="70"
                                            height="70" loading="lazy">
                                        <div class="article-reviews__inner">
                                            <h5 class="article-reviews__title">${comment?.user?.fullName}</h5>
                                            <div class="article-reviews__wrapper">
                                                <img class="article-reviews__icon" src="${starImage}" alt="" width="20"
                                                    height="20" loading="lazy">
                                                <img class="article-reviews__icon" src="${starImage}" alt="" width="20"
                                                    height="20" loading="lazy">
                                                <img class="article-reviews__icon" src="${starImage}" alt="" width="20"
                                                    height="20" loading="lazy">
                                                <img class="article-reviews__icon" src="${starImage}" alt="" width="20"
                                                    height="20" loading="lazy">
                                                <img class="article-reviews__icon" src="${starImage}" alt="" width="20"
                                                    height="20" loading="lazy">
                                            </div>
                                        </div>
                                        <img class="article-reviews__comma" src="${commaImage}" alt="" width="60" height="60"
                                            loading="lazy">
                                    </div>
                                    <p>${comment?.body}</p>
                                    </article>
                                </div>`

        this.reviewsOutSlideElement.insertAdjacentHTML('beforeend', slideHTML)
    }

    renderReviews(comments) {
        const currentData = comments.slice(0, 5)

        this.renderSlider()

        this.reviewsOutSlideElement = this.rootElement.querySelector(this.selectors.reviewsOutSlide)
        currentData.forEach((comment) => {
            this.renderSlide(comment)
        })

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
                        `<div class="reviews__body">
                            <p class="reviews__text error-text">There are currently no reviews.</p>
                        </div>`

                    throw new Error(errorMessageHTML)
                }

                return response.json()
            })
            .then((json) => this.renderReviews(json.comments))
            .catch((error) => {
                this.reviewsOutSliderElement.insertAdjacentHTML('afterbegin', error.message)
            })
    }
}

export default RenderReviews