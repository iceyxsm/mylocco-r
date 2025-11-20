import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const categorySliderRef = useRef(null);
  const popularListRef = useRef(null);
  const reviewsSlideRef = useRef(null);
  // Data from Angular app
  const categoryData = [
    { icon: 'bi bi-backpack', title: 'Showroom', list: '103 Lists' },
    { icon: 'bi bi-basket2', title: 'Fashion & Beauty', list: '110 Lists' },
    { icon: 'bi bi-house-check', title: 'Real Estate', list: '35 Lists' },
    { icon: 'fa-solid fa-dumbbell', title: 'Health & Fitness', list: '120 Lists' },
    { icon: 'bi bi-shop', title: 'Business Shop', list: '69 Lists' },
    { icon: 'bi bi-cup-straw', title: 'Restaurants', list: '78 Lists' },
    { icon: 'bi bi-lungs', title: 'Hospital & Med', list: '69 Lists' },
    { icon: 'bi bi-lamp', title: 'Wedding & Events', list: '75 Lists' },
    { icon: 'bi bi-mortarboard', title: 'Education', list: '16 Lists' },
    { icon: 'bi bi-cup-hot', title: 'Coffe Shop', list: '62 Lists' },
    { icon: 'bi bi-layers', title: 'Account Finance', list: '103 Lists' },
    { icon: 'bi bi-code-slash', title: 'Web Development', list: '103 Lists' },
  ];

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
    {
      id: 9,
      image: '/image/list_9.jpg',
      user: '/image/team_9.jpg',
      status: 'open',
      featured: true,
      title: 'Agroo Spa & Massage Center',
      desc: 'Cicero famously orated against his political.',
      call: '+42 515 635 2136',
      loction: 'Athens Greece',
      tag: 'Eat & Drink ',
      tagIcon: 'bi bi-basket2',
      tagIconStyle: 'catIcon me-2 cats-8',
      review: '76 Reviews',
      rating: 'good',
      ratingRate: '4.7',
    },
  ];

  const reviewData = [
    {
      rate: ['fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star'],
      title: '"One of the Superb Platform"',
      desc: `Absolutely love Advertize! whenever I'm in need of finding a job, Advertize is my #1 go to! wouldn't look anywhere else.`,
      image: '/image/team_1.jpg',
      name: 'Aman Diwakar',
      position: 'General Manager'
    },
    {
      rate: ['fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star'],
      title: '"One of the Superb Platform"',
      desc: `Overall, the Advertize application is a powerful tool for anyone in the job market. Its reliability, extensive job listings, and user-friendly..`,
      image: '/image/team_2.jpg',
      name: 'Ridhika K. Sweta',
      position: 'CEO of Agreeo'
    },
    {
      rate: ['fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star'],
      title: '"One of the Superb Platform"',
      desc: `I love this Advertize app. it's more legit than the other ones with advertisement. Once I uploaded my resume, then employers...`,
      image: '/image/team_3.jpg',
      name: 'Shushil Kumar Yadav',
      position: 'Brand Manager'
    },
    {
      rate: ['fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star'],
      title: '"One of the Superb Platform"',
      desc: `Advertize the best job finder app out there right now.. they also protect you from spammers so the only emails I get due to...`,
      image: '/image/team_4.jpg',
      name: 'Ritika K. Mishra',
      position: 'HR Head at Google'
    },
    {
      rate: ['fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star'],
      title: '"One of the Superb Platform"',
      desc: `Advertize the best job finder app out there right now.. they also protect you from spammers so the only emails I get due to...`,
      image: '/image/team_5.jpg',
      name: 'Shree K. Patel',
      position: 'Chief Executive'
    },
    {
      rate: ['fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star', 'fa-solid fa-star'],
      title: '"One of the Superb Platform"',
      desc: `Advertize the best job finder app out there right now.. they also protect you from spammers so the only emails I get due to...`,
      image: '/image/team_6.jpg',
      name: 'Sarwan Kumar Patel',
      position: 'Chief Executive'
    },
  ];

  const blogData = [
    {
      id: 1,
      image: '/image/blog_2.jpg',
      title: '10 Must-Have Bootstrap Templates for Modern Web Design',
      desc: "Think of a news blog that's filled with content political against opponent Lucius Sergius Catilina. Hourly on the day of going live.",
      date: '13th Sept 2025',
      views: '12k Views'
    },
    {
      id: 2,
      image: '/image/blog_3.jpg',
      title: 'Top 5 Bootstrap Themes for E-commerce Websites.',
      desc: "Think of a news blog that's filled with content political against opponent Lucius Sergius Catilina. Hourly on the day of going live.",
      date: '29th Nov 2025',
      views: '33k Views'
    },
    {
      id: 3,
      image: '/image/blog_4.jpg',
      title: 'The Ultimate Guide to Customizing Bootstrap Templates',
      desc: "Think of a news blog that's filled with content political against opponent Lucius Sergius Catilina. Hourly on the day of going live.",
      date: '13th March 2025',
      views: '15k Views'
    },
  ];

  useEffect(() => {
    // Wait for Swiper to be available from the script
    const initSwipers = () => {
      if (typeof window !== 'undefined' && window.Swiper) {
        // Category Slider
        const categorySlider = document.querySelector('.categorySlider');
        if (categorySlider) {
          new window.Swiper(categorySlider, {
            slidesPerView: 1,
            spaceBetween: 15,
            autoplay: true,
            breakpoints: {
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 6 },
            },
          });
        }

        // Popular Listings Slider
        const popularList = document.querySelector('.popularList');
        if (popularList) {
          new window.Swiper(popularList, {
            slidesPerView: 4,
            spaceBetween: 15,
            autoplay: true,
            breakpoints: {
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
              1400: { slidesPerView: 4 },
            },
            pagination: {
              el: '.popularList-pagination',
              clickable: true,
            },
          });
        }

        // Reviews Slider
        const reviewsSlide = document.querySelector('.reviewsSlide');
        if (reviewsSlide) {
          new window.Swiper(reviewsSlide, {
            slidesPerView: 4,
            spaceBetween: 15,
            autoplay: true,
            breakpoints: {
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              991: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            },
            pagination: {
              el: '.reviews-pagination',
              clickable: true,
            },
          });
        }

        // Initialize Bootstrap tooltips
        if (window.bootstrap) {
          const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
          tooltipElements.forEach((element) => {
            new window.bootstrap.Tooltip(element);
          });
        }
      } else {
        // Retry if Swiper not loaded yet
        setTimeout(initSwipers, 100);
      }
    };

    // Start initialization
    initSwipers();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="image-cover hero-header position-relative" style={{ background: 'url(/image/banner-1.jpg) no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} data-overlay="6">
        <div className="container">
          <div className="row justify-content-center align-items-center mb-5 pt-lg-0 pt-5">
            <div className="col-xl-10 col-lg-11 col-md-12 col-sm-12">
              <div className="position-relative text-center">
                <h1>Explore Your Perfect Places</h1>
                <p className="subtitle">Browse high-rated hotels, restaurants, attractions, activities and more!</p>
              </div>
            </div>
          </div>
          
          <div className="row align-items-start justify-content-center mb-lg-5 mb-4">
            <div className="col-xl-11 col-lg-12 col-md-12 col-sm-12">
              <div className="heroSearch style-01 shadow">
                <div className="row gx-lg-2 gx-md-2 gx-3 gy-sm-2 gy-2">
                  <div className="col-xl-4 col-lg-3 col-md-12 col-sm-12">
                    <div className="form-group position-relative">
                      <input type="text" className="form-control fs-6 fw-medium border-0 ps-md-2" placeholder="What are you looking for?" />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 side-border">
                    <div className="form-group position-relative">
                      <input type="text" className="form-control fs-6 fw-medium border-0" placeholder="Location" />
                      <span className="position-absolute top-50 end-0 translate-middle me-2">
                        <i className="fa-solid fa-location-dot text-muted opacity-50 fs-5"></i>
                      </span>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                    <div className="form-group fw-medium lights-bg no-border">
                      <select className="form-control">
                        <option>All Categories</option>
                        <option>Real Estate</option>
                        <option>Eat & Drink</option>
                        <option>Shopping</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-12 col-sm-12">
                    <div className="form-group">
                      <button type="button" className="btn btn-primary full-width fw-medium">
                        <i className="bi bi-search me-2"></i>Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-2">
              <div className="text-center">
                <h6 className="fw-semibold">Explore Popular Categories</h6>
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-md-12 col-12">
              <div className="popularSearches d-flex align-items-center justify-content-center column-gap-3 row-gap-1 flex-wrap">
                <div className="singleItem">
                  <a className="badge badge-transparent rounded-pill" href="/">Real Estate</a>
                </div>
                <div className="singleItem">
                  <a className="badge badge-transparent rounded-pill" href="/">Eat & Drink</a>
                </div>
                <div className="singleItem">
                  <a className="badge badge-transparent rounded-pill" href="/">Shopping</a>
                </div>
                <div className="singleItem">
                  <a className="badge badge-transparent rounded-pill" href="/">Nightlife</a>
                </div>
                <div className="singleItem">
                  <a className="badge badge-transparent rounded-pill" href="/">Services</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mousedrop z-1">
          <a href="#mains" className="mousewheel">
            <i className="bi bi-mouse"></i>
          </a>
        </div>
      </div>

      {/* Categories Section */}
      <section className="pb-0" id="mains">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
              <div className="secHeading-wrap text-center">
                <h3 className="sectionHeading">Hot & Trending <span className="text-primary">Categories</span></h3>
                <p>Explore all types of popular category for submit your listings</p>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center overflow-hidden">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="categorySlider swiper" ref={categorySliderRef}>
                <div className="swiper-wrapper">
                  {categoryData.map((item, index) => (
                    <div key={index} className="swiper-slide singleCategory">
                      <div className="category-small-wrapper light">
                        <a className="categoryBox" href="/">
                          <div className="categoryCapstions">
                            <div className="catsIcons">
                              <div className="icoBoxx">
                                <i className={item.icon}></i>
                              </div>
                            </div>
                            <div className="catsTitle">
                              <h5>{item.title}</h5>
                            </div>
                            <div className="CatsLists">
                              <span className="categorycounter">{item.list}</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Listings Section */}
      <section>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
              <div className="secHeading-wrap text-center">
                <h3 className="sectionHeading">Trending & Popular <span className="text-primary">Listings</span></h3>
                <p>Explore Hot & Popular Business Listings</p>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center overflow-hidden">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="popularList swiper" ref={popularListRef}>
                <div className="swiper-wrapper">
                  {listData.map((item) => (
                    <div key={item.id} className="swiper-slide singleItem">
                      <div className="listingitem-container">
                        <div className="singlelisting-item">
                          <div className="listing-top-item">
                            <Link className="topLink" to="/single-listing-01">
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
                              <Link className="bookmarkList" to="/single-listing-01" data-bs-toggle="tooltip" data-bs-title="Save Listing">
                                <i className="bi bi-suit-heart m-0"></i>
                              </Link>
                            </div>
                          </div>
                          <div className="listing-middle-item">
                            <div className="listing-avatar">
                              <Link className="avatarImg" to="/single-listing-01">
                                <img className="img-fluid circle" src={item.user} alt="Avatar" />
                              </Link>
                            </div>
                            <div className="listing-details">
                              <h4 className="listingTitle">
                                <Link className="titleLink" to="/single-listing-01">
                                  {item.title}
                                  <span className="verified">
                                    <i className="bi bi-patch-check-fill m-0"></i>
                                  </span>
                                </Link>
                              </h4>
                              <p>{item.desc}</p>
                            </div>
                            <div className="listing-info-details">
                              <div className="d-flex align-items-center justify-content-start gap-2">
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
                                  <Link className="d-flex align-items-center justify-content-start gap-2" to="/single-listing-01">
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
                <div className="popularList-pagination d-flex justify-content-center"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-light">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
              <div className="secHeading-wrap text-center">
                <h3 className="sectionHeading">Our Great <span className="text-primary">Reviews</span></h3>
                <p>Our cliens love our services and give great & positive reviews</p>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center overflow-hidden">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="reviewsSlide swiper" ref={reviewsSlideRef}>
                <div className="swiper-wrapper">
                  {reviewData.map((item, index) => (
                    <div key={index} className="swiper-slide singleItem">
                      <div className="reviews-wrappers">
                        <div className="reviewsBox card border-0 rounded-4 shadow-sm">
                          <div className="card-body p-xl-5 p-lg-5 p-4">
                            <div className="reviews-topHeader d-flex flex-column mb-3">
                              <div className="d-flex align-items-center justify-content-center mb-2">
                                {item.rate.map((star, i) => (
                                  <span key={i} className="me-1 text-sm text-warning">
                                    <i className={star}></i>
                                  </span>
                                ))}
                              </div>
                              <div className="revws-desc text-center">
                                <p className="text-dark fw-semibold mb-1">{item.title}</p>
                                <p className="m-0 text-dark">{item.desc}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="reviewsers d-flex flex-column mt-5">
                          <div className="d-flex align-items-center flex-column flex-thumbes gap-2">
                            <div className="revws-pic">
                              <img className="img-fluid circle" src={item.image} width="55" alt="" />
                            </div>
                            <div className="revws-caps text-center">
                              <h6 className="fw-medium fs-6 m-0">{item.name}</h6>
                              <p className="text-muted-2 text-md m-0">{item.position}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="reviews-pagination d-flex justify-content-center"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
              <div className="secHeading-wrap text-center">
                <h3 className="sectionHeading">Latest Updates <span className="text-primary">News</span></h3>
                <p>Join mylocco and get latest & trending updates about listing</p>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center g-4">
            {blogData.map((blog) => (
              <div key={blog.id} className="col-xl-4 col-lg-4 col-md-6">
                <div className="card rounded-4 shadow-sm h-100">
                  <Link className="d-block bg-gradient rounded-top" to={`/blog-detail/${blog.id}`}>
                    <img className="card-img-top hover-fade-out" src={blog.image} alt="blog image" />
                  </Link>
                  <div className="card-body">
                    <Link to={`/blog-detail/${blog.id}`}>
                      <h4 className="fw-medium fs-5 lh-base mb-3">{blog.title}</h4>
                    </Link>
                    <p>{blog.desc}</p>
                    <div className="d-flex align-items-center justify-content-start mt-4">
                      <Link className="badge badge-primary rounded-pill" to={`/blog-detail/${blog.id}`}>
                        Continue Reading
                      </Link>
                    </div>
                  </div>
                  <div className="card-footer bg-white d-flex justify-content-between align-items-center py-3">
                    <Link className="text-dark fw-medium text-md" to={`/blog-detail/${blog.id}`}>
                      <i className="bi bi-calendar-check me-2"></i>{blog.date}
                    </Link>
                    <div className="text-muted text-md">
                      <i className="bi bi-eye-fill me-2"></i>{blog.views}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
