import "./AddToCartToast.css";

export default function AddToCartToast({ show }) {

    if (!show) return null;

    return (
        <div className="cart-toast">
            <span className="cart-icon">🛒</span>
            <span>Item added to cart</span>
        </div>
    );
}