import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>FurnitureRentals</h2> {/* Your brand/logo */}
        </div>
        <div className="footer-links">
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
        <div className="footer-socials">
          <a href="https://www.facebook.com/drmuhammadsuleman.ishaq/" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://github.com/sahersuleman143" target="_blank" rel="noopener noreferrer">Github</a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">Whatsapp</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 FurnitureRentals. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
