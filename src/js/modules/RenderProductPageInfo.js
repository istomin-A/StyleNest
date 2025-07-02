class RenderProductPageInfo {
    apiUrl = 'https://dummyjson.com/products/1'

    selectors = {
        root: '[data-js-product-page-info]',
        title: '[data-js-product-page-title]',
        price: '[data-js-product-page-price]',
        brand: '[data-js-product-page-brand]',
        sku: '[data-js-product-page-sku]',
        description: '[data-js-product-page-description]'
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root)
        if (!this.rootElement) return
        this.productTitleOut = this.rootElement.querySelector(this.selectors.title)
        this.productPriceOut = this.rootElement.querySelector(this.selectors.price)
        this.productBrandOut = this.rootElement.querySelector(this.selectors.brand)
        this.productSkuOut = this.rootElement.querySelector(this.selectors.sku)
        this.productDescriptionOut = this.rootElement.querySelector(this.selectors.description)
        this.render()
    }

    renderProductPageInfo(product) {
        this.productTitleOut.innerHTML = product.title
        this.productPriceOut.innerHTML = '$' + product.price
        this.productBrandOut.innerHTML = product.brand
        this.productSkuOut.innerHTML = product.sku
        this.productDescriptionOut.innerHTML = product.description
    }

    render() {
        fetch(this.apiUrl)
            .then((response) => {
                if (!response.ok) {
                    const errorMessageHTML =
                        `<div class="product-page__error">
                            <p class="error-text error-text_small">There are currently no info.</p>
                        </div>`

                    throw new Error(errorMessageHTML)
                }

                return response.json()
            })
            .then((json) => this.renderProductPageInfo(json))
            .catch((error) => {
                this.productTitleOut.insertAdjacentHTML('afterbegin', error.message)
                this.productPriceOut.insertAdjacentHTML('afterbegin', error.message)
                this.productBrandOut.insertAdjacentHTML('afterbegin', error.message)
                this.productSkuOut.insertAdjacentHTML('afterbegin', error.message)
                this.productDescriptionOut.insertAdjacentHTML('afterbegin', error.message)
            })
    }
}

export default RenderProductPageInfo