import "./Footer.css";
export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">

                <div className="footer-section">
                    <h2><span id='a'>A</span>YAT</h2>
                    <p>
                        Premium shopping experience
                        with modern technology.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>

                    <ul>
                        <li>Home</li>
                        <li>Products</li>
                        <li>Cart</li>
                        <li>Profile</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact</h3>

                    <p>Email: saimsarkar225@gmail.com</p>
                    <p>Phone: +91 8101667227</p>
                </div>

            </div>

            <div className="footer-bottom">
                © 2026 RedStore. All rights reserved.
            </div>
        </footer>
    );
}