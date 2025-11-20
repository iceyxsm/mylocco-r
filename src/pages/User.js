import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import UserNavbar from '../components/UserNavbar';
import UserSidebar from '../components/UserSidebar';
import './Admin.css';

const User = () => {
  const year = new Date().getFullYear();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    document.body.classList.add('admin-page');
    document.documentElement.classList.add('admin-page');
    
    // Get user's name from session
    const getUserName = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const fullName = session.user.user_metadata?.full_name || '';
        if (fullName) {
          const firstName = fullName.split(' ')[0];
          setUserName(firstName);
        } else {
          const emailName = session.user.email?.split('@')[0] || '';
          if (emailName) {
            setUserName(emailName);
          }
        }
      }
    };
    getUserName();
    
    return () => {
      document.body.classList.remove('admin-page');
      document.documentElement.classList.remove('admin-page');
    };
  }, []);

  const aboutData = [
    {
      icon: 'bi bi-pin-map-fill text-success fs-2',
      value: '23',
      title: 'Active Listings',
      bg: 'bg-light-success'
    },
    {
      icon: 'bi bi-graph-up-arrow text-danger fs-2',
      value: '32K',
      title: 'Total Views',
      bg: 'bg-light-danger'
    },
    {
      icon: 'bi bi-suit-heart text-warning fs-2',
      value: '4K',
      title: 'Total Saved',
      bg: 'bg-light-warning'
    },
    {
      icon: 'bi bi-yelp text-info fs-2',
      value: '88',
      title: 'Total Reviews',
      bg: 'bg-light-info'
    },
  ];



  return (
    <>
      <UserNavbar />
      <section className="p-0">
        <div className="container-fluid p-0">
          <div className="row user-dashboard g-0">
          <div className="col-xl-2 col-lg-3 col-md-12">
            <UserSidebar />
          </div>
          <div className="col-xl-10 col-lg-9 col-md-12">
            <div className="user-dashboard-box bg-light">
              <div className="dashHeader p-3">
                <h4 className="fw-medium mb-0">{userName ? `Hello, ${userName}` : 'Hello'}</h4>
              </div>

              <div className="dashCaption p-3">
                <div className="row align-items-start g-2 mb-3">
                  {aboutData.map((item, index) => (
                    <div key={index} className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                      <div className={`card rounded position-relative p-2`}>
                        <div className={`position-absolute w-25 h-100 start-0 top-0 rounded-end-pill ${item.bg}`}>
                          <div className="position-absolute top-50 start-50 translate-middle">
                            <i className={item.icon.replace('fs-2', 'fs-5')}></i>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-end justify-content-end ht-80">
                          <h4 className="mb-0"><span className="ctr">{item.value}</span></h4>
                          <p className="text-muted-2 fw-medium mb-0 small">{item.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row align-items-start g-2 mb-0">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card rounded shadow-sm">
                      <div className="card-header py-2 px-3">
                        <h5 className="m-0">Recent Activities</h5>
                      </div>
                      <div className="card-body p-0">
                        <ul className="dashboardListgroup">
                          <li>
                            <span className="icons bg-light-warning text-warning"><i className="bi bi-star"></i></span>
                            <div className="listCaps">Mortin Musk left a review<span className="ratting high">4.2</span>on <Link to="/single-listing-01" className="listing-link">Snow Restaurants</Link></div>
                          </li>
                          <li>
                            <span className="icons bg-light-danger text-danger"><i className="bi bi-heart"></i></span>
                            <div className="listCaps">Someone bookmark your <Link to="/single-listing-01" className="listing-link">Pepsco Cafe</Link> Listing</div>
                          </li>
                          <li>
                            <span className="icons bg-light-warning text-warning"><i className="bi bi-star"></i></span>
                            <div className="listCaps">Arun Kovil left a review<span className="ratting mid">3.7</span>on <Link to="/single-listing-01" className="listing-link">Blue Crystel</Link></div>
                          </li>
                          <li>
                            <span className="icons bg-light-warning text-warning"><i className="bi bi-star"></i></span>
                            <div className="listCaps">Arun Kovil left a review<span className="ratting low">2.9</span>on <Link to="/single-listing-01" className="listing-link">Sagar Salon</Link></div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default User;

