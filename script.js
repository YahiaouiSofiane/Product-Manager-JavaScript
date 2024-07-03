// Element Selection
const productCreationInputs = document.querySelectorAll('.productCreationInput');
const productTitle = document.querySelector('#title')
const productCategory = document.querySelector('#category')
const productCurrency = document.querySelector('#currency')
const productPrice = document.querySelector('#price')
const productTaxes = document.querySelector('#tax')
const productDiscount = document.querySelector('#discount')
const productCount = document.querySelector('#count')
const productId = document.querySelector('#productId')
const productDescription = document.querySelector('#description')
const createProductButton = document.querySelector('#create')
const updateProductButton = document.querySelector('#update')

const productContainer = document.querySelector('.products__container')
const noProductsContainer = document.querySelector('.no__products')
const productHolder = document.createElement('div')
const deleteAllButton = document.querySelector('.delete__all') 

const searchBox = document.querySelector('#search')
let radioInputs = document.getElementsByName('checklist')

let products;

if (localStorage.getItem('Products')) {
    products = JSON.parse(localStorage.getItem('Products'))
    createProduct()
} else {
    products = []
}

function requiredValue () {
    productCreationInputs.forEach(input => {
        input.value === '' ? input.style.cssText = 'outline : 1px solid red' : input.style.cssText = 'border : none'
    })
}

function getValue () {
    const regex = /^[A-Za-z]+$/ 
    productCurrency.value.match(regex) ? productCurrency.value : productCurrency.value = ''

    const product = {
        title : productTitle.value,
        category : productCategory.value.toUpperCase(),
        currency : productCurrency.value.toUpperCase(),
        price : `${productPrice.value} ${currency.value.toUpperCase()}`,
        taxes: `${productTaxes.value}%`,
        discount : `${productDiscount.value} ${currency.value.toUpperCase()}`,
        count : productCount.value,
        id : productId.value,
        description : productDescription.value
    }

    productCreationInputs.forEach(input => {input.style.cssText = 'border : none'})

    let arrInput = [...productCreationInputs]
    let checker = arrInput.every(input => input.value !== '')

    createProductButton.onclick = () => {
        if(checker) {
            product.count <= 0 ? product.count = 1 : product.count
            product.total = getTotal()
            product.date = setProductDate()
            products.push(product)
            localStorage.setItem('Products' , JSON.stringify(products))
            clearInputs()
            getValue()
            productHolder.innerHTML = ''
            createProduct()
        } 
        else {requiredValue()}
    }
}

function createProduct () {

    products.length > 1 ? deleteAllButton.style.cssText = 'display : inline-block' : deleteAllButton.style.cssText = 'display : none' 

    products.length > 0 ? noProductsContainer.style.cssText = 'display : none' : noProductsContainer.style.cssText = 'display : block'

    for (let i = 0; i < products.length; i++) {
        const productDisplay = `
            <div class="product__info">
                <div class="product product__number">
                    <span class="span__type">Number : </span>
                    <span class="span__details">${i + 1}</span>
                </div>
                <div class="product product__id">
                    <span class="span__type">ID : </span>
                    <span class="span__details">${products[i].id}</span>
                </div>
                <div class="product product__title">
                    <span class="span__type">Title : </span>
                    <span class="span__details">${products[i].title}</span>
                </div>
                <div class="product product__category">
                    <span class="span__type">Category : </span>
                    <span class="span__details">${products[i].category}</span>
                </div>
            </div>
            <div class="product__buttons">
                <button class="product__edit__button buttons" aria-label="edit button" data-index = ${i}>Edit</button>
                <button class="details__button buttons" data-index = ${i}>Details</button>
                <button class="delete__product__button buttons" data-index = ${i} aria-label="delete button">
                <svg data-index = ${i} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16
                     19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114
                    1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
        `
        const productInfo = document.createElement('div')
        productInfo.className = 'products__info__container'
        productInfo.innerHTML = productDisplay
        productHolder.append(productInfo)
        productContainer.append(productHolder)
    }

    const deleteProductButton = document.querySelectorAll('.delete__product__button')
    const detailsButton = document.querySelectorAll('.details__button')
    const editButton = document.querySelectorAll('.product__edit__button')

    const deleteSpecificProduct = (e) => {
        let index = e.target.getAttribute('data-index')
        products.splice(index,1)
        localStorage.removeItem('Products')
        localStorage.setItem('Products' , JSON.stringify(products))
        productHolder.innerHTML = ''
        createProduct()
        if (products.length === 0) localStorage.removeItem('Products')
    }
    
    const getProductDetails = (e) => {
        let index = e.target.getAttribute('data-index')
        let detailsContainer = document.createElement('div')
        detailsContainer.className = 'details__container'

        let productDetails = `
            <div class="details__header">
                <h2>Product Details</h2>
                <button class="close__details" aria-label="details menu close button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47
                        5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>                          
                </button>
            </div>
            <div class="details__row">
                <p class="details__number"><span>Number : </span> ${+index + 1}</p>
                <p class="details__id"><span>ID : </span>${products[index].id}</p>
            </div>
            <div class="details__row">
                <p class="details__title"><span>Title : </span>${products[index].title}</p>
                <p class="details__category"><span>Category : </span>${products[index].category}</p>
            </div>
            <div class="details__row">
                <p class="details__price"><span>Price : </span>${products[index].price}</p>
                <p class="details__discount"><span>Discount : </span>${products[index].discount}</p>
            </div>
            <div class="details__row">
                <p class="details__taxes"><span>Taxes : </span>${products[index].taxes}</p>
                <p class="details__count"><span>Count : </span>${products[index].count}</p>
            </div>
            <div class="details__row">
                <p class="details__total"><span>Total : </span>${products[index].total}</p>
                <p class="details__date__created"><span>Date Created : </span>${products[index].date}</p>
            </div>
            <div class="details__row">
                <p class="details__description"><span>Description : </span><br>${products[index].description}</p>
            </div>
        `

        detailsContainer.innerHTML = productDetails
        productContainer.append(detailsContainer)
        detailsContainer.style.cssText = 'display : block'
    
        const allButtons = document.querySelectorAll('.buttons')
        const closeDetails = document.querySelector('.close__details')
    
        disabelAll ()
        
        closeDetails.onclick = () => {
            allowAll ()
            detailsContainer.style.cssText = 'display : none'
            detailsContainer.innerHTML = ''
        }

        function disabelAll () {
            productCreationInputs.forEach(input => input.setAttribute('disabled' , 'disabled'))
            allButtons.forEach(button => button.setAttribute('disabled' , 'disabled'))
            searchBox.setAttribute('disabled', 'disabled')
            radioInputs.forEach(input => input.setAttribute('disabled', 'disabled'))
        }
        function allowAll () {
            productCreationInputs.forEach(input => input.removeAttribute('disabled'))
            allButtons.forEach(button => button.removeAttribute('disabled'))
            searchBox.removeAttribute('disabled')
            radioInputs.forEach(input => input.removeAttribute('disabled'))
        }
    }
    
    const updateValue = (e) => {

        window.scrollTo({ top: 0, behavior : "smooth"})
        let index = e.target.getAttribute('data-index')
        createProductButton.style.cssText = 'display : none'
        updateProductButton.style.cssText = 'display : inline-block'
    
        productTitle.value = products[index].title
        productCategory.value = products[index].category
        productCurrency.value = products[index].currency
        productPrice.value = products[index].price.replace(products[index].currency, '').trim()
        productTaxes.value = products[index].taxes.replace('%','')
        productDiscount.value = products[index].discount.replace(products[index].currency,'').trim()
        productCount.value = products[index].count
        productId.value = products[index].id
        productDescription.value = products[index].description
    
        disableButtonsAndSearch()
    
        updateProductButton.onclick = () => {
            allowButtonsAndSearch()
            products[index].title = productTitle.value
            products[index].category = productCategory.value.toUpperCase(),
            products[index].currency = productCurrency.value.toUpperCase()
            products[index].price = `${productPrice.value} ${currency.value.toUpperCase()}`
            products[index].taxes = `${productTaxes.value}%`
            products[index].discount = `${productDiscount.value} ${currency.value.toUpperCase()}`
            products[index].count = productCount.value
            products[index].id = productId.value
            products[index].description = productDescription.value
            products[index].total = getTotal()
        
            if (products[index].count <= 0) {
                products.splice(index,1)
                if (products.length === 0) {
                    localStorage.removeItem('Products')
                }
            } else {
                localStorage.removeItem('Products')
                localStorage.setItem('Products' , JSON.stringify(products))
            }

            createProductButton.style.cssText = 'display : inline-block'
            updateProductButton.style.cssText = 'display :none'
            clearInputs()
            getValue()
            productHolder.innerHTML = ''
            createProduct()
        }
    
    }

    function disableButtonsAndSearch () {
        deleteAllButton.setAttribute('disabled','disabled')
        deleteProductButton.forEach(deleteBtn => deleteBtn.setAttribute('disabled','disabled'))
        detailsButton.forEach(detailsBtn => detailsBtn.setAttribute('disabled','disabled'))
        editButton.forEach(editButton => editButton.setAttribute('disabled','disabled'))
        searchBox.setAttribute('disabled','disabled')
        radioInputs.forEach(input => input.setAttribute('disabled', 'disabled'))
    }
    function allowButtonsAndSearch () {
        deleteAllButton.removeAttribute('disabled')
        deleteProductButton.forEach(deleteBtn => deleteBtn.removeAttribute('disabled'))
        detailsButton.forEach(detailsBtn => detailsBtn.removeAttribute('disabled'))
        editButton.forEach(editButton => editButton.removeAttribute('disabled'))
        searchBox.removeAttribute('disabled')
        radioInputs.forEach(input => input.removeAttribute('disabled'))
    }
    
    editButton.forEach(editBtn => editBtn.addEventListener('click' , updateValue))
    deleteProductButton.forEach(deleteBtn => deleteBtn.addEventListener('click' , deleteSpecificProduct))
    detailsButton.forEach(detailBtn => detailBtn.addEventListener('click',getProductDetails))
}

const checkRadioInputs = () => {
    radioInputs.forEach(input => {
        input.addEventListener('click',  (e) => {
            e.target.setAttribute('checked' , 'checked')
            radioInputs.forEach(otherInput => {
                if (otherInput !== input) {
                    otherInput.removeAttribute('checked')
                }
            })
        })
    })
}

checkRadioInputs()

function searchForProduct () {
    if (searchBox.value === '') return
    let porductSearch = document.querySelectorAll('.products__info__container')
    let searchValue = searchBox.value
    let selectedSearchValue = ''
    radioInputs.forEach(input => {
        if (input.getAttribute('checked')) {
            selectedSearchValue += input.value
        }
    })  
    porductSearch.forEach(product => product.classList.remove('display__none'))
    for (let i = 0; i < products.length; i++) {
        if (products[i][selectedSearchValue].toLowerCase().includes(searchValue.toLowerCase())) continue
        else{porductSearch[i].classList.add('display__none')}
    }
}

const cancelSearch = () => {
    let porductSearch = document.querySelectorAll('.products__info__container')
    if (searchBox.value === '') porductSearch.forEach(product => product.classList.remove('display__none'))
}

function getTotal () {
    if (productCount.value <= 0) productCount.value = 1
    let fullPrice = productPrice.value - productDiscount.value
    let percentage = (fullPrice * productTaxes.value) / 100;
    let result = ( fullPrice - percentage ) * productCount.value
    let total = `${result} ${productCurrency.value}`
    return total
}

const setProductDate = () => {
    let date = new Date();
    let day = date.getDate()
    let month = `0${date.getMonth() + 1}`
    let year = date.getFullYear()
    let fullDate = `${day}/${month}/${year}`
    return fullDate
}

const deleteAllProducts = () => {
    clearInputs()
    localStorage.removeItem('Products')
    products = []
    productHolder.innerHTML = ""
    deleteAllButton.style.cssText = 'display : none' 
    noProductsContainer.style.cssText = 'display : block'
    getValue ()
}

function clearInputs () {
    productCreationInputs.forEach(input => input.value = '')
}

createProductButton.addEventListener('click' , requiredValue)
deleteAllButton.addEventListener('click' , deleteAllProducts)


