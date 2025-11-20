import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <>
      {/* Footer One - Main Footer */}
      <footer className="footer skin-dark-footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-5 col-lg-12 col-xl-4">
              <div className="footer-widget pe-xl-4 mb-5">
                <div className="footerLogo">
                  <img width="160" alt="Footer Logo" className="img-fluid" src="/image/logo_light.svg" />
                </div>
                <div className="footerSocialwrap">
                  <ul className="footersocial">
                    <li>
                      <Link to="#" className="social-link">
                        <i className="fa-brands fa-facebook-f"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="social-link">
                        <i className="fa-brands fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="social-link">
                        <i className="fa-brands fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="social-link">
                        <i className="fa-brands fa-linkedin"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 offset-md-3 col-lg-3 offset-lg-0 col-xl-2">
              <div className="footer-widget mb-5 mb-md-5 mb-lg-0">
                <h4 className="widget-title text-pri">Community</h4>
                <ul className="footer-menu">
                  <li><Link to="/">About mylocco</Link></li>
                  <li><Link to="/">Submit Listing</Link></li>
                  <li><Link to="/">mylocco Report</Link></li>
                  <li><Link to="/">Careers</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 col-xl-2">
              <div className="footer-widget mb-5 mb-md-5 mb-lg-0">
                <h4 className="widget-title">Getting Started</h4>
                <ul className="footer-menu">
                  <li><Link to="/">Trust & Safety</Link></li>
                  <li><Link to="/">Investor Relations</Link></li>
                  <li><Link to="/">Terms of Services</Link></li>
                  <li><Link to="/">Paid Advertising</Link></li>
                  <li><Link to="/">mylocco Blog</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 col-xl-2">
              <div className="footer-widget">
                <h4 className="widget-title">mylocco Business</h4>
                <ul className="footer-menu">
                  <li><Link to="/">mylocco for Business</Link></li>
                  <li><Link to="/">Advertise on mylocco</Link></li>
                  <li><Link to="/">Login on mylocco</Link></li>
                  <li><Link to="/">Claim for Business Page</Link></li>
                  <li><Link to="/">Support for B2B</Link></li>
                  <li><Link to="/">Table Management</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 col-xl-2">
              <div className="footer-widget">
                <h4 className="widget-title">Get In Touch</h4>
                <div className="contactInfowrap">
                  <div className="singleinfo">
                    <div className="icons">
                      <i className="bi bi-geo-alt-fill"></i>
                    </div>
                    <div className="caps">
                      <h5 className="title">Angraster 7, Greenhorst<br />Los Angeles QTC564</h5>
                      <p className="subs">Reach Us</p>
                    </div>
                  </div>
                  <div className="singleinfo">
                    <div className="icons">
                      <i className="bi bi-telephone-outbound"></i>
                    </div>
                    <div className="caps">
                      <h5 className="title">042 - 526 - 5263</h5>
                      <p className="subs">Mon - Sat 10am - 6PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;


