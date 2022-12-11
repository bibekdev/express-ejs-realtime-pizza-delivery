let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cart-counter')

addToCart.forEach(btn => {
  btn.addEventListener('click', () => {
    let pizza = btn.dataset.pizza
    updateCart(JSON.parse(pizza))
  })
})

const updateCart = async pizza => {
  try {
    const { data } = await axios.post('/add-to-cart', pizza)
    cartCounter.innerText = data.totalQty
  } catch (error) {
    console.log(error)
  }
}
