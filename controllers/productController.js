const Product = require('../models/productModel');

// Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products/list', {
      title: 'Danh sách sản phẩm',
      products
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { 
      title: 'Lỗi',
      message: 'Không thể lấy danh sách sản phẩm'
    });
  }
};

// Lấy chi tiết một sản phẩm
exports.getProductDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).render('error', { 
        title: 'Không tìm thấy',
        message: 'Không tìm thấy sản phẩm' 
      });
    }
    res.render('products/detail', {
      title: product.name,
      product
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { 
      title: 'Lỗi',
      message: 'Không thể lấy thông tin sản phẩm'
    });
  }
};

// Tạo sản phẩm mới (API)
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Cập nhật sản phẩm (API)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Không tìm thấy sản phẩm' 
      });
    }
    res.json({
      success: true,
      product
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Xóa sản phẩm (API)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Không tìm thấy sản phẩm' 
      });
    }
    res.json({ 
      success: true,
      message: 'Xóa sản phẩm thành công' 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};