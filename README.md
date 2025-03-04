# BTTH-Lab5-WebNC
Sử dụng các kiến thức trong phần Express, MongoDB, View engine để thực hiện 1 phần của website với
những yêu cầu như sau:

- Phần front-end: Sử dụng view engine (chẳng hạn ejs)
• Tạo 3 trang là trang danh sách sản phẩm, trang thông tin chi tiết của một sản phẩm và trang
giỏ hàng.

• Ở trang hiển thị danh sách sản phẩm, người dùng có thể bấm vào nút xem thông tin chi tiết
(liên kết với trang thông tin chi tiết sản phẩm) hoặc thêm vào giỏ hàng từ 1 sản phẩm. Trên
góc phải phía trên có phần giỏ hàng để liên kết với trang giỏ hàng.

• Các trang phải có nút bấm liên kết để di chuyển qua lại với nhau.


- Phần back-end: Sử dụng express, MongoDB và công cụ Postman
• Sử dụng MongoDB để lưu trữ và quản lý DB
• Các API cần có là tạo, sửa, xóa, lấy danh sách sản phẩm.
• Sử dụng Postman để tương tác với API (tạo, sửa, xóa).
• Back end truyền dữ liệu trực tiếp tới view engine thông qua phương thức res.render
• Giỏ hàng được quản lý bằng session hoặc cookie
