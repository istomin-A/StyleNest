class RenderCatalog {
    apiUrl = 'https://dummyjson.com/products'

    selectors = {
        root: '[data-js-catalog]'
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        if (!this.rootElement) return
        this.render()
    }

    renderCatalog(products) {
        const currentData = products.slice(0, 15)

        currentData.forEach((product) => {
            const articleHTML = `
                        <article class="product back-color">
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
                        </article>`

            this.rootElement.insertAdjacentHTML('beforeend', articleHTML)
        })
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
            .then((json) => this.renderCatalog(json.products))
            .catch((error) => {
                this.rootElement.insertAdjacentHTML('afterbegin', error.message)
            })
    }
}

export default RenderCatalog