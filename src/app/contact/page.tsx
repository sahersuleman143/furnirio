import React from 'react';
import './contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your Name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Your Email" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="Your Message" />
        </div>
        <button type="submit" className="submit-btn">Send Message</button>
      </form>

      <div className="social-links">
        <p>Connect with us:</p>
        <a href="https://www.facebook.com" className="social-icon facebook" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href="https://wa.me/923242304044" className="social-icon whatsapp" target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        <a href="https://www.linkedin.com/in/sabiha-suleman-9a0b65300/" className="social-icon linkedin" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default Contact;
