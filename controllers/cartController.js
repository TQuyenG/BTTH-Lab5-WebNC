const Product = require('../models/productModel');

// Hiển thị giỏ hàng
exports.getCart = (req, res) => {
  res.render('cart/cart', {
    title: 'Giỏ hàng',
    cartItems: req.session.cart || []
  });
};

// Thêm sản phẩm vào giỏ hàng từ productController
exports.addToCart = async (req, res) => {
  try {
      const productId = req.params.id;
      const quantity = parseInt(req.body.quantity) || 1;

      // Lấy thông tin sản phẩm từ database
      const product = await Product.findById(productId);

      if (!product) {
          return res.status(404).render('error', {
              title: 'Lỗi',
              message: 'Không tìm thấy sản phẩm'
          });
      }

      // Kiểm tra giỏ hàng trong session
      if (!req.session.cart) {
          req.session.cart = [];
      }
      const cart = req.session.cart;

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingItemIndex = cart.findIndex(item => 
          item.product._id && item.product._id.toString() === productId
      );

      if (existingItemIndex > -1) {
          // Cập nhật số lượng nếu sản phẩm đã tồn tại
          cart[existingItemIndex].quantity += quantity;
      } else {
          // Thêm sản phẩm mới vào giỏ hàng
          cart.push({
              product: {
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.image
              },
              quantity
          });
      }

      // Lưu giỏ hàng vào session
      req.session.cart = cart;

      // Redirect về trang giỏ hàng
      res.redirect('/cart');
  } catch (err) {
      console.error('Lỗi khi thêm vào giỏ hàng:', err);
      res.status(500).render('error', {
          title: 'Lỗi',
          message: 'Không thể thêm sản phẩm vào giỏ hàng'
      });
  }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
exports.updateCartItem = (req, res) => {
  const productId = req.params.id;
  const quantity = parseInt(req.body.quantity);
  
  if (!req.session.cart) {
    req.session.cart = [];
    return res.redirect('/cart');
  }
  
  if (quantity <= 0) {
    // Xóa sản phẩm khỏi giỏ hàng nếu số lượng <= 0
    req.session.cart = req.session.cart.filter(item => 
        item.product._id && item.product._id.toString() !== productId
    );
  } else {
    // Cập nhật số lượng
    const itemIndex = req.session.cart.findIndex(item => 
        item.product._id && item.product._id.toString() === productId
    );
    if (itemIndex > -1) {
      req.session.cart[itemIndex].quantity = quantity;
    }
  }
  
  res.redirect('/cart');
};

// Xóa sản phẩm khỏi giỏ hàng
exports.removeCartItem = (req, res) => {
  const productId = req.params.id;
  
  if (!req.session.cart) {
    return res.redirect('/cart');
  }
  
  req.session.cart = req.session.cart.filter(item => 
      item.product._id && item.product._id.toString() !== productId
  );
  res.redirect('/cart');
};

// Xóa toàn bộ giỏ hàng
exports.clearCart = (req, res) => {
  req.session.cart = [];
  res.redirect('/cart');
};