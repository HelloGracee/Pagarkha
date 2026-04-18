import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-section">
          <h2 className="logo">Pagarkha.</h2>
          <p>Premium footwear for every step 👟</p>
        </div>

        {/* LINKS */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <p>Home</p>
          <p>Products</p>
          <p>About</p>
        </div>

        {/* SUPPORT */}
        <div className="footer-section">
          <h4>Support</h4>
          <p>Contact Us</p>
          <p>FAQs</p>
          <p>Returns</p>
        </div>

        {/* SOCIAL */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Twitter</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Pagarkha. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;