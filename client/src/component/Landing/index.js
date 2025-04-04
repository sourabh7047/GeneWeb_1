import React from 'react';
import Navigation from '../Navigation';
import './styles.css';
import * as ROUTES from '../../routes';

const Landing = () => (
  // <div>
  //   <Navigation/>
  //   <hr/>
  //   <h1>Landing</h1>
  // </div>

  <div>
  <header>
    <div class="container">
      <div class="logo">
        <img src="logo.png" alt="Biology Hub Logo"/>
      </div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#tools">Tools & Services</a></li>
          <li><a href="#databases">Databases</a></li>
          <li><a href="#resources">Resources</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <a href={ROUTES.SIGN_UP} ><button class="lp-cta-button">Sign Up</button></a>
    </div>
  </header>

  <section id="hero">
    <div class="container">
      <h1>Empowering Biological Research with Combined NCBI & EBI Resources</h1>
      <p>Access curated databases, advanced tools, and comprehensive biological data—all in one place.</p>
      <a href={ROUTES.SEARCH} ><button class="lp-cta-button">Start Exploring</button></a>
    </div>
  </section>

  <section id="features">
    <div class="container">
      <h2>Key Features</h2>
      <div class="feature-grid">
        <div class="feature-item">
          <i class="fas fa-search"></i>
          <h3>Integrated Search Engine</h3>
          <p>Search across NCBI and EBI databases simultaneously.</p>
        </div>
        <div class="feature-item">
          <i class="fas fa-chart-line"></i>
          <h3>Advanced Analytical Tools</h3>
          <p>Perform sequence analysis, BLAST searches, and more with ease.</p>
        </div>
        <div class="feature-item">
          <i class="fas fa-database"></i>
          <h3>Curated Biological Data</h3>
          <p>Access reliable datasets from both NCBI and EBI repositories.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="why-choose-us">
    <div class="container">
      <h2>Why Researchers Trust Us</h2>
      <ul>
        <li>Backed by leading bioinformatics institutions.</li>
        <li>Secure and reliable data access.</li>
        <li>User-friendly interface for researchers of all levels.</li>
        <li>Regular updates and new features.</li>
      </ul>
    </div>
  </section>

  <section id="newsletter">
    <div class="container">
      <h2>Subscribe to Our Newsletter</h2>
      <form>
        <input type="text" placeholder="Your Name" required/>
        <input type="email" placeholder="Your Email" required/>
        <button type="submit">Subscribe Now</button>
      </form>
    </div>
  </section>

  <footer>
    <div class="container">
      <div class="footer-links">
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">FAQs</a></li>
        </ul>
      </div>
      <div class="social-media">
        <a href="#"><i class="fab fa-linkedin"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-youtube"></i></a>
      </div>
      <div class="partners">
        <img src="ncbi-logo.png" alt="NCBI Logo"/>
        <img src="ebi-logo.png" alt="EBI Logo"/>
      </div>
    </div>
  </footer>
  </div>

);

export default Landing;
