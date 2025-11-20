import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const UserNavbar = () => {
  const location = useLocation();
  const [scroll, setScroll] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userName, setUserName] = useState('');
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // Get user's name from session
    const getUserName = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const fullName = session.user.user_metadata?.full_name || '';
        if (fullName) {
          const firstName = fullName.split(' ')[0];
          setUserName(firstName);
          setUserInitial(firstName.charAt(0).toUpperCase());
        } else {
          const emailName = session.user.email?.split('@')[0] || '';
          if (emailName) {
            setUserName(emailName);
            setUserInitial(emailName.charAt(0).toUpperCase());
          }
        }
      }
    };
    getUserName();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`header header-dark navdark ${scroll ? 'header-fixed' : ''}`} data-sticky-element="">
        <div className="container-fluid">
          <nav id="navigation" className={windowWidth > 991 ? 'navigation navigation-landscape' : 'navigation navigation-portrait'}>
            <div className="nav-header">
              <Link className="nav-brand" to="/">
                <img src="/image/logo_light.svg" className="logo" alt="" />
              </Link>
              <div className="nav-toggle" onClick={() => setToggle(!toggle)}></div>
              <div className="mobile_nav">
                <ul>
                  <li>
                    <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" className="d-inline-flex py-0 pt-1 px-1">
                      <div className="d-inline-flex w-8 h-8 circle overflow-hidden bg-primary text-light align-items-center justify-content-center" style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                        {userInitial}
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`nav-menus-wrapper ${toggle ? 'nav-menus-wrapper-open' : ''}`} style={{ transitionProperty: toggle ? 'none' : 'left' }}>
              <div className='mobLogos'>
                <img src="/image/logo.svg" className='img-fluid lightLogo' alt='Logo' />
              </div>
              <span className="nav-menus-wrapper-close-button" onClick={() => setToggle(!toggle)}>✕</span>
              <ul className="nav-menu">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/listings">Listings</Link>
                </li>
              </ul>
              <ul className="nav-menu nav-menu-social align-to-right">
                <li>
                  <div className="btn-group account-drop">
                    <a href="#" className="nav-link btn-order-by-filt" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <div className="d-inline-flex w-8 h-8 circle overflow-hidden bg-primary text-light align-items-center justify-content-center" style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                        {userInitial}
                      </div>
                      {userName && <span className="fw-medium d-inline-flex ms-2 text-light">{userName}<i className="fa-solid fa-sort-down ms-1"></i></span>}
                    </a>
                    <div className="dropdown-menu pull-right animated flipInX">
                      <div className="drp_menu_headr bg-primary">
                        {userName && <h4>Hi, {userName}</h4>}
                        <div className="drp_menu_headr-right">
                          <Link to="/user/profile" className="btn btn-whites text-dark">My Profile</Link>
                        </div>
                      </div>
                      <ul>
                        <li className={location.pathname === '/user' ? 'active' : ''}>
                          <Link to="/user"><i className="bi bi-speedometer me-2"></i>Dashboard Area</Link>
                        </li>
                        <li className={location.pathname === '/user/profile' ? 'active' : ''}>
                          <Link to="/user/profile"><i className="bi bi-person-lines-fill me-2"></i>My Profile</Link>
                        </li>
                        <li className={location.pathname === '/user/listings' ? 'active' : ''}>
                          <Link to="/user/listings"><i className="bi bi-ui-radios-grid me-2"></i>My Listings</Link>
                        </li>
                        <li className={location.pathname === '/user/bookmarks' ? 'active' : ''}>
                          <Link to="/user/bookmarks"><i className="bi bi-bookmark-star me-2"></i>Bookmarkes</Link>
                        </li>
                        <li className={location.pathname === '/user/reviews' ? 'active' : ''}>
                          <Link to="/user/reviews"><i className="bi bi-yelp me-2"></i>Reviews</Link>
                        </li>
                        <li className={location.pathname === '/user/add-listing' ? 'active' : ''}>
                          <Link to="/user/add-listing"><i className="bi bi-patch-plus me-2"></i>Add Listing</Link>
                        </li>
                        <li className="border-top mt-2 pt-2">
                          <Link to="/" className="text-danger"><i className="bi bi-box-arrow-right me-2"></i>Logout</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="list-buttons">
                  <Link to="/user/add-listing">
                    <i className="bi bi-geo-alt fs-6 me-1"></i>Add Listing
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="clearfix"></div>

      <div className="offcanvas offcanvas-end offcanvas-menu" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <button type="button" className="btn-closes" data-bs-dismiss="offcanvas" aria-label="Close">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="offcanvas-body" id="offcanvasExampleLabel">
          <ul>
            <li className={location.pathname === '/user' ? 'active' : ''}>
              <Link to="/user"><i className="bi bi-speedometer me-2"></i>Dashboard Area</Link>
            </li>
            <li className={location.pathname === '/user/profile' ? 'active' : ''}>
              <Link to="/user/profile"><i className="bi bi-person-lines-fill me-2"></i>My Profile</Link>
            </li>
            <li className={location.pathname === '/user/listings' ? 'active' : ''}>
              <Link to="/user/listings"><i className="bi bi-ui-radios-grid me-2"></i>My Listings</Link>
            </li>
            <li className={location.pathname === '/user/bookmarks' ? 'active' : ''}>
              <Link to="/user/bookmarks"><i className="bi bi-bookmark-star me-2"></i>Bookmarkes</Link>
            </li>
            <li className={location.pathname === '/user/reviews' ? 'active' : ''}>
              <Link to="/user/reviews"><i className="bi bi-yelp me-2"></i>Reviews</Link>
            </li>
            <li className={location.pathname === '/user/add-listing' ? 'active' : ''}>
              <Link to="/user/add-listing"><i className="bi bi-patch-plus me-2"></i>Add Listing</Link>
            </li>
            <li className="border-top mt-2 pt-2">
              <Link to="/" className="text-danger"><i className="bi bi-box-arrow-right me-2"></i>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserNavbar;

