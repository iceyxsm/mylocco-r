import React, { useEffect } from 'react';
import UserNavbar from '../components/UserNavbar';
import UserSidebar from '../components/UserSidebar';
import './Admin.css';

const UserReviews = () => {
  const year = new Date().getFullYear();

  useEffect(() => {
    document.body.classList.add('admin-page');
    document.documentElement.classList.add('admin-page');
    return () => {
      document.body.classList.remove('admin-page');
      document.documentElement.classList.remove('admin-page');
    };
  }, []);

  const reviewData = [
    {
      image: '/image/team_1.jpg',
      name: 'Karan Shivraj',
      date: '13th Sept 2025',
      desc: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
      rate: ['bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-half']
    },
    {
      image: '/image/team_2.jpg',
      name: 'Karan Shivraj',
      date: '29th Nov 2025',
      desc: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
      rate: ['bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-half']
    },
    {
      image: '/image/team_3.jpg',
      name: 'Karan Shivraj',
      date: '13th March 2025',
      desc: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
      rate: ['bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-fill', 'bi bi-star-half']
    },
    {
      image: '/image/team_4.jpg',
      name: 'Karan Shivraj',
      date: '5th May 2025',
      desc: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
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
                <h2 className="fw-medium mb-0">All Reviews</h2>
              </div>
              <div className="dashCaption p-xl-5 p-3 p-md-4">
                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card rounded-3 shadow-sm">
                      <div className="card-header px-4 py-3">
                        <h4 className="m-0">Reviews</h4>
                      </div>
                      <div className="card-body p-0">
                        <ul className="dashboardListgroup hovereffect">
                          {reviewData.map((item, index) => (
                            <li key={index}>
                              <div className="singleReviewswrap">
                                <div className="singlereviews">
                                  <div className="reviewerAvatar">
                                    <figure className="m-0">
                                      <img src={item.image} className="img-fluid circle avatar-xl" alt="Avatar" />
                                    </figure>
                                  </div>
                                  <div className="reviewsInfo">
                                    <div className="reviewssupper d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                                      <div className="reviewsExtopper">
                                        <div className="reviewrHeadline d-flex align-items-center justify-content-start gap-2">
                                          <h6 className="messageuserTitle">{item.name}</h6> On <a href="#" className="fw-medium text-primary">Blewr Cafe</a>
                                        </div>
                                        <div className="postedDate"><span className="text-md">{item.date}</span></div>
                                      </div>
                                      <div className="flxLast">
                                        <div className="reviewsStar" data-rating="5">
                                          {item.rate.map((el, i) => (
                                            <i key={i} className={el}></i>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="reviewsBody">
                                      <div className="reviewDescription d-block mb-3">
                                        <p className="m-0">{item.desc}</p>
                                      </div>
                                      <div className="reviewreply">
                                        <button type="button" className="btn btn-sm fw-medium btn-light-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#replyModal"><i className="bi bi-reply me-2"></i>Rply to this review</button>
                                      </div>
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

export default UserReviews;

