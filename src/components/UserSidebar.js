import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const UserSidebar = () => {
  const location = useLocation();
  const current = location.pathname;
  const [userName, setUserName] = useState('');
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
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
  }, []);

  return (
    <div className="user-dashboard-inner h-100 border-end border-2 py-5 p-3 d-lg-block d-none">
      <div className="dashboard_users mb-4">
        <div className="square--80 circle mx-auto mb-1 d-flex align-items-center justify-content-center bg-primary text-light" style={{ fontSize: '2rem', fontWeight: '600' }}>
          {userInitial}
        </div>
        <div className="user-nameTitle text-center">
          <h4 className="lh-base fw-semibold text-light mb-0">Welcome Back</h4>
          {userName && <h6 className="text-light fw-medium opacity-75 mb-0">{userName}</h6>}
        </div>
      </div>
      <div className="dashboard_Menu">
        <ul>
          <li>
            <Link to="/user" className={current === '/user' ? 'active' : ''}>
              <i className="bi bi-speedometer me-2"></i>Dashboard Area
            </Link>
          </li>
          <li>
            <Link to="/user/profile" className={current === '/user/profile' ? 'active' : ''}>
              <i className="bi bi-person-lines-fill me-2"></i>My Profile
            </Link>
          </li>
          <li>
            <Link to="/user/listings" className={current === '/user/listings' ? 'active' : ''}>
              <i className="bi bi-ui-radios-grid me-2"></i>My Listings
            </Link>
          </li>
          <li>
            <Link to="/user/bookmarks" className={current === '/user/bookmarks' ? 'active' : ''}>
              <i className="bi bi-bookmark-star me-2"></i>Bookmarkes
            </Link>
          </li>
          <li>
            <Link to="/user/reviews" className={current === '/user/reviews' ? 'active' : ''}>
              <i className="bi bi-yelp me-2"></i>Reviews
            </Link>
          </li>
          <li>
            <Link to="/user/add-listing" className={current === '/user/add-listing' ? 'active' : ''}>
              <i className="bi bi-patch-plus me-2"></i>Add Listing
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;

