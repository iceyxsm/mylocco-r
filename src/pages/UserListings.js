import React, { useEffect } from 'react';
import UserNavbar from '../components/UserNavbar';
import UserSidebar from '../components/UserSidebar';
import './Admin.css';

const UserListings = () => {
  const year = new Date().getFullYear();

  useEffect(() => {
    document.body.classList.add('admin-page');
    document.documentElement.classList.add('admin-page');
    return () => {
      document.body.classList.remove('admin-page');
      document.documentElement.classList.remove('admin-page');
    };
  }, []);

  const listData = [
    {
      image: '/image/list_1.jpg',
      title: 'The Big Bumbble Gym',
      loction: '410 Apex Avenue, California USA',
      review: '412 Reviews',
      expired: false,
      rate: ['bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-half']
    },
    {
      image: '/image/list_2.jpg',
      title: 'Greenvally Real Estate',
      loction: '410 Apex Avenue, California USA',
      review: '152 Reviews',
      expired: true,
      rate: ['bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-half']
    },
    {
      image: '/image/list_3.jpg',
      title: 'The Blue Ley Light',
      loction: '410 Apex Avenue, California USA',
      review: '302 Reviews',
      expired: false,
      rate: ['bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-half']
    },
    {
      image: '/image/list_4.jpg',
      title: 'Shreya Study Center',
      loction: '410 Apex Avenue, California USA',
      review: '180 Reviews',
      expired: false,
      rate: ['bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-half']
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
              <div className="dashHeader p-xl-5 p-4 pb-xl-0 pb-0 pt-lg-0 pt-5 mt-lg-0 mt-5">
                <h2 className="fw-medium mb-0">My Listings</h2>
              </div>
              <div className="dashCaption p-xl-5 p-3 p-md-4">
                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card rounded-3 shadow-sm">
                      <div className="card-header px-4 py-3">
                        <h4 className="m-0">Manage Listings</h4>
                      </div>
                      <div className="card-body p-0">
                        <ul className="dashboardListgroup">
                          {listData.map((item, index) => (
                            <li key={index}>
                              <div className="mngListings">
                                <div className="d-flex align-items-center justify-content-start gap-3 flex-wrap">
                                  <div className="mngListinfirst">
                                    <div className="d-flex align-items-center justify-content-start gap-3 flex-wrap">
                                      <div className="mngListings-thumb">
                                        <figure className="m-0">
                                          <img src={item.image} className="img-fluid rounded" alt="Avatar" />
                                        </figure>
                                      </div>
                                      <div className="mngListings-caps">
                                        {item.expired && (
                                          <div className="d-flex align-items-center justify-content-start mb-1">
                                            <span className="badge badge-xs bg-danger">Expired</span>
                                          </div>
                                        )}
                                        <h5 className="mnglstTitle">{item.title}</h5>
                                        <span>{item.loction}</span>
                                        <div className="d-flex align-items-center justify-content-start gap-2 mt-3">
                                          <div className="ratingView" data-rating="5.0">
                                            {item.rate.map((el, i) => (
                                              <i key={i} className={el}></i>
                                            ))}
                                          </div>
                                          <div className="text-md">{item.review}</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mngListinlast">
                                    <div className="d-flex align-items-center justify-content-start gap-3">
                                      <a href="#" className="btn btn-sm btn-light-success fw-medium rounded-pill"><i className="bi bi-check2-circle me-1"></i>Edit</a>
                                      <a href="#" className="btn btn-sm btn-light-danger fw-medium rounded-pill"><i className="bi bi-x me-1"></i>Delete</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
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

export default UserListings;

