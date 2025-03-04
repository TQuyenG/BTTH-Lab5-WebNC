document.addEventListener('DOMContentLoaded', function() {
    // Chỉ thực thi JavaScript nếu trang hiện tại là trang giỏ hàng
    if (!document.getElementById('cart-table')) return;

    const updateQuantity = async (productId, newQuantity) => {
        try {
            const response = await fetch(`/cart/update/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity })
            });
            
            if (!response.ok) {
                throw new Error('Lỗi khi cập nhật');
            }
            
            // Không cần xử lý response vì chúng ta tự cập nhật UI
        } catch (error) {
            console.error('Lỗi:', error);
            alert('Không thể cập nhật số lượng. Vui lòng thử lại.');
        }
    };
    
    const updateCartUI = () => {
        let total = 0;
        const rows = document.querySelectorAll('tr[data-product-id]');
        
        rows.forEach(row => {
            const price = parseInt(row.getAttribute('data-price'));
            const quantity = parseInt(row.querySelector('.quantity-input').value);
            const itemTotal = price * quantity;
            
            row.querySelector('.item-total').textContent = itemTotal.toLocaleString('vi-VN') + ' đ';
            total += itemTotal;
        });
        
        document.getElementById('cart-total').textContent = total.toLocaleString('vi-VN') + ' đ';
    };
    
    // Xử lý nút tăng số lượng
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            const productId = input.getAttribute('data-product-id');
            const newValue = parseInt(input.value) + 1;
            
            input.value = newValue;
            updateCartUI();
            updateQuantity(productId, newValue);
        });
    });
    
    // Xử lý nút giảm số lượng
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            const productId = input.getAttribute('data-product-id');
            const newValue = Math.max(parseInt(input.value) - 1, 1);
            
            input.value = newValue;
            updateCartUI();
            updateQuantity(productId, newValue);
        });
    });
    
    // Xử lý thay đổi trực tiếp trên input
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const productId = this.getAttribute('data-product-id');
            const newValue = Math.max(parseInt(this.value), 1);
            
            this.value = newValue; // Đảm bảo giá trị hợp lệ
            updateCartUI();
            updateQuantity(productId, newValue);
        });
    });
});