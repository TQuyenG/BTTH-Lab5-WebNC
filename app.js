const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Kết nối MongoDB thành công'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

// Thiết lập store cho session
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Thiết lập Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret_key',
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 ngày
  }
}));

// Middleware để xử lý giỏ hàng
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  res.locals.cartItemCount = req.session.cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  next();
});

// Thiết lập View Engine
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// Routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// Route mặc định
app.get('/', (req, res) => {
  res.redirect('/products');
});

// Xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).render('error', {
    title: 'Không tìm thấy trang',
    message: 'Trang bạn yêu cầu không tồn tại'
  });
});

// Xử lý lỗi server
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    title: 'Lỗi máy chủ',
    message: 'Đã xảy ra lỗi trên máy chủ'
  });
});

module.exports = app;