exports.addToCart = (req, res) => {
  if (!req.session.cart) {
    req.session.cart = {
      items: {},
      totalQty: 0,
      totalPrice: 0,
    }
  }
  let cart = req.session.cart
  if (!cart.items[req.body._id]) {
    cart.items[req.body._id] = {
      item: req.body,
      qty: 1,
    }
    cart.totalQty = cart.totalQty + 1
    cart.totalPrice = parseInt(cart.totalPrice) + parseInt(req.body.price)
  } else {
    cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
    cart.totalQty = cart.totalQty + 1
    cart.totalPrice = parseInt(cart.totalPrice) + parseInt(req.body.price)
  }
  res.status(200).json({ totalQty: req.session.cart.totalQty })
}
