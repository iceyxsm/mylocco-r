import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const SingleListing = () => {
  const { id } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
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

  const data = listData.find((item) => item.id === parseInt(id)) || listData[0];

  // Price list data
  const priceListData = [
    { image: '/image/list_1.jpg', name: 'Potato Slice', title: 'Spicy', price: '$20' },
    { image: '/image/list_2.jpg', name: 'Tasty Tandoori', title: 'Dyno', price: '$45' },
    { image: '/image/list_3.jpg', name: 'Indian Thali', title: 'Tasty', price: '$120' },
    { image: '/image/list_4.jpg', name: 'Slice Burger', title: 'Spicy', price: '$60' },
    { image: '/image/list_5.jpg', name: 'Cheese Burger', title: 'Cold', price: '$50' },
    { image: '/image/list_6.jpg', name: 'Cold Coffee', title: 'Taste', price: '$35' },
  ];

  // Sidebar data
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [openGuests, setOpenGuests] = useState(false);

  const openings = [
    { title: 'Monday', time: '8:00 Am To 10:00 PM' },
    { title: 'Tuesday', time: '8:00 Am To 10:00 PM' },
    { title: 'Wednesday', time: '8:00 Am To 10:00 PM' },
    { title: 'Thursday', time: '8:00 Am To 10:00 PM' },
    { title: 'Friday', time: '8:00 Am To 10:00 PM' },
    { title: 'Saturday', time: '8:00 Am To 10:00 PM' },
    { title: 'Sunday', time: '10:00 Am To 16:00 PM' },
  ];

  const personal = [
    { icon: 'bi bi-envelope', title: 'Email', desc: 'shree.patel@gmail.com' },
    { icon: 'bi bi-phone', title: 'Phone No.', desc: '+41 256 254 5487' },
    { icon: 'bi bi-browser-chrome', title: 'Website', desc: 'www.ListingHub.co.in' },
  ];

  const social = [
    { icon: 'bi bi-facebook', color: 'color--facebook' },
    { icon: 'bi bi-twitter', color: 'color--twitter' },
    { icon: 'bi bi-instagram', color: 'color--instagram' },
    { icon: 'bi bi-youtube', color: 'color--pinterest' },
    { icon: 'bi bi-whatsapp', color: 'color--whatsapp' },
  ];

  const timeSlots = [
    { id: '1', name: '07:00 AM' },
    { id: '2', name: '07:30 AM' },
    { id: '3', name: '08:00 AM' },
    { id: '4', name: '08:30 AM' },
    { id: '5', name: '09:00 AM' },
    { id: '6', name: '09:30 AM' },
    { id: '7', name: '10:30 AM' },
    { id: '8', name: '11:30 AM' },
    { id: '9', name: '12:00 AM' },
  ];

  const specialRequests = [
    { id: '1', name: 'Slice' },
    { id: '2', name: 'Burger' },
    { id: '3', name: 'Coffee' },
    { id: '4', name: 'Indian Thali' },
    { id: '5', name: 'Tandoori' },
    { id: '6', name: 'Chips' },
  ];

  const galleryImages = [
    '/image/list_1.jpg',
    '/image/list_2.jpg',
    '/image/list_3.jpg',
    '/image/list_4.jpg',
    '/image/list_5.jpg',
    '/image/list_6.jpg',
  ];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <section 
        className="bg-cover position-relative ht-500 py-0" 
        style={{
          backgroundImage: data ? `url(${data.image})` : 'url(/image/list_1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
        data-overlay="4"
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1 }}></div>
        <div className="container h-100" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row align-items-start">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div className="mainlistingInfo">
                <div className="d-flex align-items-end justify-content-between flex-wrap gap-3">
                  <div className="firstColumn">
                    <div className="listingFirstinfo d-flex align-items-center justify-content-start gap-3 flex-wrap">
                      <div className="listingAvatar">
                        <a href="#" className="d-block">
                          <img 
                            src={data?.user || '/image/logo_1.png'} 
                            className="img-fluid rounded-3" 
                            width="95" 
                            alt="Avatar" 
                          />
                        </a>
                      </div>
                      <div className="listingCaptioninfo">
                        <div className="propertyTitlename d-flex align-items-center gap-2 mb-1">
                          <h2 className="fw-semibold text-light mb-0">
                            {data && data.title ? data.title : 'Liman Restaurant'}
                          </h2>
                          <span className="verified mt-1">
                            <img 
                              src="/image/logo_1.png" 
                              className="img-fluid" 
                              width="22" 
                              alt="Verified Listing" 
                            />
                          </span>
                        </div>
                        <div className="listingsbasicInfo">
                          <div className="d-flex align-items-center justify-content-start flex-wrap gap-2">
                            <div className="flexItem me-2">
                              <span className="text-md fw-medium text-light">
                                <i className="fa-solid fa-location-dot me-2"></i>
                                {data && data.loction ? data.loction : 'Old Paris, France'}
                              </span>
                            </div>
                            <div className="flexItem me-2">
                              <span className="text-md fw-medium text-light">
                                <i className="bi bi-briefcase me-2"></i>
                                {data && data.tag ? data.tag : 'Eat & Drink'}
                              </span>
                            </div>
                            <div className="flexItem">
                              <div className="d-flex align-items-center justify-content-start gap-2">
                                <div className="d-flex align-items-center justify-content-start gap-1">
                                  <i className="bi bi-star-fill text-warning text-sm"></i>
                                  <i className="bi bi-star-fill text-warning text-sm"></i>
                                  <i className="bi bi-star-fill text-warning text-sm"></i>
                                  <i className="bi bi-star-fill text-warning text-sm"></i>
                                  <i className="bi bi-star-half text-warning text-sm"></i>
                                </div>
                                <span className="text-md fw-medium text-light">
                                  {data && data.review ? data.review : '(42k Reviews)'}
                                </span>
                              </div>
                            </div>
                          </div>
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

      <section className="gray-simple pt-4 pt-xl-5">
        <div className="container">
          <div className="row align-items-start gx-xl-5 g-4">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              {/* Description Section */}
              <div className="listingSingleblock mb-4" id="descriptions">
                <div className="SingleblockHeader">
                  <a data-bs-toggle="collapse" data-parent="#description" data-bs-target="#description" aria-controls="description" href="#" aria-expanded="false" className="collapsed">
                    <h4 className="listingcollapseTitle">Description</h4>
                  </a>
                </div>
                <div id="description" className="panel-collapse collapse show">
                  <div className="card-body p-4 pt-2">
                    <p>Welcome to ListingHub Directory, a breathtaking retreat nestled in the heart of Las Vegas. This exquisite villa offers a perfect blend of luxury, comfort, and tranquility, providing an unparalleled escape for those seeking an idyllic haven.</p>
                    <p>Enjoy panoramic views of lush landscapes, rolling hills, and distant mountains from the expansive windows and private balconies. Watch the sunrise or sunset paint the sky in a myriad of colors, creating a daily masterpiece just for you. Retreat to the sumptuous bedrooms, each thoughtfully designed for ultimate comfort. Crisp linens, plush pillows, and tasteful decor create a haven of relaxation, ensuring restful nights and rejuvenating mornings.</p>
                  </div>
                </div>
              </div>

              {/* Gallery Section */}
              <div className="listingSingleblock mb-4" id="Galleries">
                <div className="SingleblockHeader">
                  <a data-bs-toggle="collapse" data-parent="#gallery" data-bs-target="#gallery" aria-controls="gallery" href="#" aria-expanded="false" className="collapsed">
                    <h4 className="listingcollapseTitle">Gallery</h4>
                  </a>
                </div>
                <div id="gallery" className="panel-collapse collapse show">
                  <div className="card-body p-4 pt-2">
                    <ul className="row align-items-center justify-content-center g-3 p-0">
                      {galleryImages.map((item, index) => (
                        <li key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                          <a 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              openLightbox(index);
                            }}
                            className="d-block"
                            style={{ cursor: 'pointer' }}
                          >
                            <img src={item} className="img-fluid rounded" alt={`Gallery Img ${index + 1}`} />
                          </a>
                        </li>
                      ))}
                    </ul>
                    <Lightbox
                      open={lightboxOpen}
                      close={() => setLightboxOpen(false)}
                      index={lightboxIndex}
                      slides={galleryImages.map(img => ({ src: img }))}
                    />
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="listingSingleblock mb-4" id="maps">
                <div className="SingleblockHeader">
                  <a data-bs-toggle="collapse" data-parent="#map" data-bs-target="#map" aria-controls="map" href="#" aria-expanded="false" className="collapsed">
                    <h4 className="listingcollapseTitle">Map</h4>
                  </a>
                </div>
                <div id="map" className="panel-collapse collapse show">
                  <div className="card-body p-4 pt-2">
                    <div className="map-container rounded-3 overflow-hidden">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15090.183774083564!2d72.82822336977539!3d18.99565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cef0d17ace6f%3A0xba0d758b25d8b289!2sICICI%20Bank%20Curry%20Road%2C%20Mumbai-Branch%20%26%20ATM!5e0!3m2!1sen!2sin!4v1624183548415!5m2!1sen!2sin" 
                        className="full-width" 
                        height="450" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy"
                        title="Location Map"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>

              {/* Similar Lists Section */}
              <div className="listingSingleblock">
                <div className="SingleblockHeader">
                  <a data-bs-toggle="collapse" data-parent="#similar" data-bs-target="#similar" aria-controls="similar" href="#" aria-expanded="false" className="collapsed">
                    <h4 className="listingcollapseTitle">Similar Lists</h4>
                  </a>
                </div>
                <div id="similar" className="panel-collapse collapse show">
                  <div className="card-body p-4 pt-2">
                    <div className="itemslider overflow-hidden">
                      <Swiper
                        modules={[Autoplay, Pagination]}
                        slidesPerView={2}
                        spaceBetween={15}
                        autoplay={{
                          delay: 3000,
                          disableOnInteraction: false,
                        }}
                        pagination={{
                          clickable: true,
                        }}
                        breakpoints={{
                          0: {
                            slidesPerView: 1,
                          },
                          768: {
                            slidesPerView: 2,
                          },
                        }}
                        className="swiper"
                      >
                        <div className="swiper-wrapper">
                          {listData.filter(item => item.id !== data.id).slice(0, 6).map((item) => (
                            <SwiperSlide key={item.id} className="singleItem">
                              <div className="listingitem-container">
                                <div className="singlelisting-item bg-light border-0">
                                  <div className="listing-top-item">
                                    <div className="position-absolute end-0 top-0 me-3 mt-3 z-2">
                                      <Link to={`/single-listing-01/${item.id}`} className="bookmarkList" data-bs-toggle="tooltip" data-bs-title="Save Listing">
                                        <i className="bi bi-suit-heart m-0"></i>
                                      </Link>
                                    </div>
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
                                      <img src={item.image} className="img-fluid" alt="Listing Image" />
                                    </Link>
                                    <div className="opssListing position-absolute start-0 bottom-0 ms-3 z-2">
                                      <div className="d-flex align-items-center justify-content-between gap-4">
                                        <div className="listing-avatar">
                                          <Link to={`/single-listing-01/${item.id}`} className="avatarImg">
                                            <img src={item.user} className="img-fluid circle" alt="Avatar" />
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
                                          <div className="list-infos">
                                            <div className="mt-1">
                                              <div className="list-distance text-light my-2">
                                                <i className="bi bi-geo-alt mb-0 me-2"></i>{item.loction}
                                              </div>
                                              <div className="list-calls text-light hide-mob">
                                                <i className="bi bi-telephone mb-0 me-2"></i>{item.call}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="listing-footer-item border-0">
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
                                      </div>
                                      <div className="listing-rates">
                                        <div className="">
                                          <span className="d-flex align-items-center justify-content-start gap-1 text-sm">
                                            <i className="bi bi-star-fill mb-0 text-warning"></i>
                                            <i className="bi bi-star-fill mb-0 text-warning"></i>
                                            <i className="bi bi-star-fill mb-0 text-warning"></i>
                                            <i className="bi bi-star-fill mb-0 text-warning"></i>
                                            <i className="bi bi-star-half mb-0 text-warning"></i>
                                          </span>
                                          <span className="text-md text-muted-2 hide-mob">({item.review})</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                        </div>
                      </Swiper>
                      <div className="itemslider-pagination d-flex justify-content-center"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="sidebarGroups d-flex flex-column gap-4">
                {/* Author Card */}
                <div className="card">
                  <div className="bg-cover card-header ht-150" style={{ background: 'url(/image/list_1.jpg) no-repeat' }}></div>
                  <div className="card-body mt-n3 p-0">
                    <div className="avatarBox position-relative mb-4">
                      <div className="square--100 circle bg-transparents mx-auto p-2 z-2">
                        <img src="/image/team_4.jpg" className="img-fluid circle" alt="Avatar" />
                      </div>
                      <div className="listingInfo text-center">
                        <p className="text-md text-muted mb-0">Added By</p>
                        <h6 className="mb-0">Shree K. Patel</h6>
                      </div>
                    </div>
                    <div className="avatarInfo mb-2">
                      {personal.map((item, index) => (
                        <div key={index} className="py-3 px-3 border-top">
                          <div className="infoFlexio d-flex align-items-center justify-content-start gap-2">
                            <div className="square--40 rounded bg-light-primary">
                              <i className={`text-primary ${item.icon}`}></i>
                            </div>
                            <div className="infoDetails">
                              <p className="text-muted lh-base mb-0">{item.title}</p>
                              <p className="text-dark lh-base fw-medium fs-6 mb-0">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card-footer bg-white border-top">
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      {social.map((item, index) => (
                        <div key={index} className="flexSocial">
                          <a href="#" className={`square--40 circle border ${item.color}`}>
                            <i className={item.icon}></i>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="card">
                  <div className="card-header py-3">
                    <div className="headerFirst"><h6>Openings Hours</h6></div>
                    <div className="headerLast">
                      <span className="badge badge-xs badge-success rounded-pill">Now Open</span>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="openingsInfo">
                      {openings.map((item, index) => (
                        <div key={index} className="py-3 px-3 border-top">
                          <div className="infoFlexio d-flex align-items-center justify-content-between">
                            <p className="text-dark text-md fw-medium lh-base mb-0">{item.title}</p>
                            <p className="text-dark text-sm fw-medium lh-base mb-0">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bookmark & Share */}
                <div className="card">
                  <div className="card-body px-3">
                    <div className="form-group mb-1">
                      <button type="button" className="btn btn-whites border rounded-pill fw-medium w-100">
                        <i className="bi bi-suit-heart me-2"></i>Bookmark This Listing
                      </button>
                    </div>
                    <div className="form-group text-center mb-4">
                      <p className="text-md">45 People Bookmark This Place</p>
                    </div>
                    <div className="form-group m-0">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <button type="button" className="btn btn-md btn-whites border rounded-pill color--facebook flex-fill">
                          <i className="bi bi-facebook me-1"></i>Facebook
                        </button>
                        <button type="button" className="btn btn-md btn-whites border rounded-pill color--twitter flex-fill">
                          <i className="bi bi-twitter me-1"></i>Twitter
                        </button>
                        <button type="button" className="btn btn-md btn-whites border rounded-pill color--instagram flex-fill">
                          <i className="bi bi-instagram me-1"></i>Instagram
                        </button>
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

export default SingleListing;

