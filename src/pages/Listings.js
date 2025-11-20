import React from 'react';
import { Link } from 'react-router-dom';
import ListSidebar from '../components/ListSidebar';
import useIPLocation from '../hooks/useIPLocation';
import './Listings.css';

const Listings = () => {
  const { location, loading } = useIPLocation();
  
  // Use the same listData from Home.js
  const listData = [
    {
      id: 1,
      image: '/image/list_1.jpg',
      user: '/image/team_1.jpg',
      status: 'open',
      featured: true,
      title: 'The Big Bumbble Gym',
      desc: 'Cicero famously orated against his political.',
      call: '+42 515 635 4758',
      loction: 'Tokyo Japan',
      tag: 'Fitness',
      tagIcon: 'fa-solid fa-dumbbell',
      tagIconStyle: 'catIcon me-2 cats-1',
      review: '46 Reviews',
      rating: 'good',
      ratingRate: '4.5',
    },
    {
      id: 2,
      image: '/image/list_2.jpg',
      user: '/image/team_2.jpg',
      status: 'open',
      featured: false,
      title: 'Greenvally Real Estate',
      desc: 'Cicero famously orated against his political.',
      call: '+42 515 635 6150',
      loction: 'Paris France',
      tag: 'Real Estate',
      tagIcon: 'bi bi-house-check',
      tagIconStyle: 'catIcon me-2 cats-2',
      review: '35 Reviews',
      rating: 'midium',
      ratingRate: '4.3',
    },
    {
      id: 3,
      image: '/image/list_3.jpg',
      user: '/image/team_3.jpg',
      status: 'closed',
      featured: true,
      title: 'Shree Wedding Planner',
      desc: 'Cicero famously orated against his political.',
      call: '+42 515 635 4785',
      loction: 'Toronto Canada',
      tag: 'Weddings',
      tagIcon: 'bi bi-lamp',
      tagIconStyle: 'catIcon me-2 cats-3',
      review: '12 Reviews',
      rating: 'excellent',
      ratingRate: '4.8',
    },
    {
      id: 4,
      image: '/image/list_4.jpg',
      user: '/image/team_4.jpg',
      status: 'open',
      featured: false,
      title: 'The Blue Ley Light',
      desc: 'Cicero famously orated against his political.',
      call: '+42 515 635 6358',
      loction: 'Sydney Australia',
      tag: 'Restaurant',
      tagIcon: 'bi bi-cup-straw',
      tagIconStyle: 'catIcon me-2 cats-4',
      review: '72 Reviews',
      rating: 'good',
      ratingRate: '4.6',
    },
    {
      id: 5,
      image: '/image/list_5.jpg',
      user: '/image/team_5.jpg',
      status: 'close',
      featured: true,
      title: 'Shreya Study Center',
      desc: 'Cicero famously orated against his political.',
      call: '+42 515 635 0210',
      loction: 'Berlin Germany',
      tag: 'Education',
      tagIcon: 'bi bi-mortarboard',
      tagIconStyle: 'catIcon me-2 cats-5',
      review: '112 Reviews',
      rating: 'midium',
      ratingRate: '4.2',
    },
    {
      id: 6,
      image: '/image/list_6.jpg',
      user: '/image/team_6.jpg',
      status: 'open',
      featured: false,
      title: 'Mahroom Garage & Workshop',
      desc: 'Cicero famously orated against his political.',
      call: '+42 515 635 3251',
      loction: 'Moscow Russia',
      tag: 'Showroom',
      tagIcon: 'bi bi-backpack',
      tagIconStyle: 'catIcon me-2 cats-6',
      review: '52 Reviews',
      rating: 'excellent',
      ratingRate: '4.8',
    },
    {
      id: 7,
      image: '/image/list_7.jpg',
      user: '/image/team_7.jpg',
      status: 'open',
      featured: true,
      title: 'Creative Wedding Planner',
      desc: 'Cicero famously orated against his political.',
      call: '+42 515 635 4758',
      loction: 'Rome Italy',
      tag: 'Wedding',
      tagIcon: 'fa-solid fa-dumbbell',
      tagIconStyle: 'catIcon me-2 cats-1',
      review: '46 Reviews',
      rating: 'good',
      ratingRate: '4.5',
    },
    {
      id: 8,
      image: '/image/list_8.jpg',
      user: '/image/team_8.jpg',
      status: 'close',
      featured: true,
      title: 'The Great Dream Palace',
      desc: 'Cicero famously orated against his political.',
      call: '+42 515 635 5426',
      loction: 'Mumbai India',
      tag: 'Spa',
      tagIcon: 'bi bi-cup-hot',
      tagIconStyle: 'catIcon me-2 cats-1',
      review: '42 Reviews',
      rating: 'excellent',
      ratingRate: '4.9',
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <div className="image-cover hero-banner bg-primary position-relative" style={{ background: 'url(/image/banner-6.jpg) no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} data-overlay="5">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="position-relative text-center mt-4 pt-lg-0 pt-5">
                <h2 className="mb-0">
                  Get Your Dream Place in{' '}
                  <span>
                    {loading || !location
                      ? 'Loading...' 
                      : location.fullLocation 
                        ? location.fullLocation.split(',')[0].trim() || location.city || location.region || location.country
                        : location.city || location.region || location.country || 'Your Area'
                    }
                  </span>
                </h2>
                <p className="fs-5 fw-light">Discover the best place for your dream place & homes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="position-relative d-flex flex-column z-2 search-box-wrapper" style={{ marginTop: '-4rem' }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-11 col-lg-12 col-md-12 col-12">
              <div className="heroSearch style-01 shadow-sm">
                <div className="row gx-lg-2 gx-md-2 gx-3 gy-sm-2 gy-2">
                  <div className="col-xl-10 col-lg-9 col-md-12">
                    <div className="row gx-lg-2 gx-md-2 gx-3 gy-sm-2 gy-2">
                      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        <div className="form-group">
                          <div className="mobSearch d-flex align-items-center justify-content-start">
                            <div className="flexStart ps-2"><span className="fw-semibold text-dark">Find</span></div>
                            <input type="text" className="form-control fs-6 fw-medium border-0" placeholder="What are you looking for?" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 single-border">
                        <div className="form-group">
                          <div className="mobSearch d-flex align-items-center justify-content-start">
                            <div className="flexStart ps-2"><span className="fw-semibold text-dark">Where</span></div>
                            <input type="text" className="form-control fs-6 fw-medium border-0" placeholder="Location" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-12 col-sm-12">
                    <div className="form-group">
                      <button type="button" className="btn btn-primary full-width fw-medium"><i className="bi bi-search me-2"></i>Search</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section>
        <div className="container">
          <div className="row g-4">
            {/* Sidebar */}
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <ListSidebar />
            </div>

            {/* Listings Grid */}
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              {/* Results Header */}
              <div className="row align-items-center justify-content-between mb-4">
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-6">
                  <h6 className="m-0">64 Listings Found</h6>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-6">
                  <div className="text-end">
                    <div className="dropdown d-inline-flex p-0">
                      <a href="#" className="py-2 px-3 dropdown-toggle toogleDrops" id="shortfilter" data-bs-toggle="dropdown" aria-expanded="false">
                        Short Listings
                      </a>
                      <div className="dropdown-menu border shadow-sm">
                        <ul className="card rounded-0 p-0">
                          <li><a className="dropdown-item" href="#">Default Order</a></li>
                          <li><a className="dropdown-item" href="#">Highest Rated</a></li>
                          <li><a className="active dropdown-item" href="#">Most Reviewed</a></li>
                          <li><a className="dropdown-item" href="#">Newest Listings</a></li>
                          <li><a className="dropdown-item" href="#">Oldest Listings</a></li>
                          <li><a className="dropdown-item" href="#">Featured Listings</a></li>
                          <li><a className="dropdown-item" href="#">Most Viewed</a></li>
                          <li><a className="dropdown-item" href="#">Short By A To Z</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Listings Grid */}
              <div className="row align-items-center justify-content-center g-xl-4 g-3">
                {listData.map((item) => (
                  <div key={item.id} className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="listingitem-container">
                      <div className="singlelisting-item">
                        <div className="listing-top-item">
                          <Link to={`/single-listing-01/${item.id}`} className="topLink">
                            <div className="position-absolute start-0 top-0 ms-3 mt-3 z-2">
                              <div className="d-flex align-items-center justify-content-start gap-2">
                                {item.status === 'open' ? (
                                  <span className="badge badge-xs text-uppercase listOpen">Open</span>
                                ) : (
                                  <span className="badge badge-xs text-uppercase listClose">Closed</span>
                                )}
                              </div>
                            </div>
                            <img className="img-fluid" src={item.image} alt="Listing Image" />
                          </Link>
                          <div className="position-absolute end-0 bottom-0 me-3 mb-3 z-2">
                            <Link to={`/single-listing-01/${item.id}`} className="bookmarkList" data-bs-toggle="tooltip" data-bs-title="Save Listing">
                              <i className="bi bi-suit-heart m-0"></i>
                            </Link>
                          </div>
                        </div>
                        <div className="listing-middle-item">
                          <div className="listing-avatar">
                            <Link to={`/single-listing-01/${item.id}`} className="avatarImg">
                              <img className="img-fluid circle" src={item.user} alt="Avatar" />
                            </Link>
                          </div>
                          <div className="listing-details">
                            <h4 className="listingTitle">
                              <Link to={`/single-listing-01/${item.id}`} className="titleLink">
                                {item.title}
                                <span className="verified">
                                  <i className="bi bi-patch-check-fill m-0"></i>
                                </span>
                              </Link>
                            </h4>
                            <p>{item.desc}</p>
                          </div>
                          <div className="listing-info-details">
                            <div className="d-flex align-items-center justify-content-start gap-3">
                              <div className="list-calls">
                                <i className="bi bi-telephone mb-0 me-2"></i>{item.call}
                              </div>
                              <div className="list-distance">
                                <i className="bi bi-geo-alt mb-0 me-2"></i>{item.loction}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="listing-footer-item">
                          <div className="d-flex align-items-center justify-content-between gap-2">
                            <div className="catdWraps">
                              <div className="flex-start">
                                <Link to={`/single-listing-01/${item.id}`} className="d-flex align-items-center justify-content-start gap-2">
                                  <span className={item.tagIconStyle}>
                                    <i className={item.tagIcon}></i>
                                  </span>
                                  <span className="catTitle">{item.tag}</span>
                                </Link>
                              </div>
                              <div className="flex-end">
                                <span className="moreCatcounter">+2</span>
                              </div>
                            </div>
                            <div className="listing-rates">
                              <div className="d-flex align-items-center justify-content-start gap-1">
                                <span className={`ratingAvarage ${item.rating}`}>{item.ratingRate}</span>
                                <span className="overallrates">{item.review}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="row align-items-center justify-content-center mt-5">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                      <li className="page-item">
                        <a className="page-link" href="#"><i className="fa-solid fa-arrow-left"></i></a>
                      </li>
                      <li className="page-item"><a className="page-link" href="#">1</a></li>
                      <li className="page-item active"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item"><a className="page-link" href="#">4</a></li>
                      <li className="page-item"><a className="page-link" href="#">5</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#"><i className="fa-solid fa-arrow-right"></i></a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Button */}
      <a href="#filterSlider" data-bs-toggle="offcanvas" data-bs-target="#filterSlider" aria-controls="filterSlider" className="fixed-bottom z-sticky d-lg-none filterButtons">
        <i className="bi bi-funnel"></i>Filter Options
      </a>
    </>
  );
};

export default Listings;

