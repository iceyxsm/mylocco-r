import React from 'react';
import UserSidebar from '../components/UserSidebar';
import './Admin.css';

const UserBookings = () => {
  const year = new Date().getFullYear();

  const booking = [
    {
      image: '/image/team_2.jpg',
      title: 'Mubarak Barbar Shop',
      tag: 'Salon',
      pending: true,
      unpaid: true,
      approved: false,
      cancelled: false,
      date: '12.05.2024 at 11:30 AM',
      info: '02 Adults, 01 Child',
      clientName: 'Kallay Mortin',
      contact: '41 125 254 2563',
      price: '$25.50',
      reject: true,
      approve: true,
      sendMsg: true,
      playNow: false
    },
    {
      image: '/image/team_1.jpg',
      title: 'Sunrise Apartment',
      tag: 'Apartment',
      pending: false,
      unpaid: false,
      approved: true,
      cancelled: false,
      date: '14.06.2024 - 15.06.2025 at 11:30 AM',
      info: '02 Adults, 02 Child',
      clientName: 'Kalla Adroise',
      contact: '41 125 254 6258',
      price: '$17,00',
      reject: false,
      approve: false,
      sendMsg: true,
      playNow: false
    },
    {
      image: '/image/team_4.jpg',
      title: 'Blue Star Cafe',
      tag: 'Restaurants',
      pending: false,
      unpaid: false,
      approved: false,
      cancelled: true,
      date: '12.05.2024 at 16:30 AM',
      info: '02 Adults, 01 Child',
      clientName: 'Sorika Michel',
      contact: '41 125 254 625',
      price: '$245.00',
      reject: false,
      approve: false,
      sendMsg: false,
      playNow: false
    },
    {
      image: '/image/team_5.jpg',
      title: 'Snow Valley Resort',
      tag: 'Hotel',
      pending: true,
      unpaid: true,
      approved: false,
      cancelled: false,
      date: '14.10.2024 at 08:30 PM',
      info: '03 Adults, 01 Child',
      clientName: 'Arun Govil',
      contact: '41 125 254 3265',
      price: '$190.00',
      reject: false,
      approve: false,
      sendMsg: true,
      playNow: true
    },
  ];

  return (
    <section className="p-0">
      <div className="container-fluid p-0">
        <div className="row user-dashboard g-0">
          <div className="col-xl-2 col-lg-3 col-md-12">
            <UserSidebar />
          </div>
          <div className="col-xl-10 col-lg-9 col-md-12">
            <div className="user-dashboard-box bg-light">
              <div className="dashHeader p-xl-5 p-4 pb-xl-0 pb-0 pt-lg-0 pt-5 mt-lg-0 mt-5">
                <h2 className="fw-medium mb-0">Recent Bookings</h2>
              </div>
              <div className="dashCaption p-xl-5 p-3 p-md-4">
                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card rounded-3 shadow-sm">
                      <div className="card-header px-4 py-3">
                        <h4 className="m-0">Recent Bookings</h4>
                      </div>
                      <div className="card-body p-0">
                        <ul className="dashboardListgroup">
                          {booking.map((item, index) => (
                            <li key={index}>
                              <div className="bookingActivities">
                                <div className="d-flex align-items-start justify-content-start gap-3 flex-wrap">
                                  <div className="bookingAvatar">
                                    <figure className="m-0">
                                      <img src={item.image} className="img-fluid circle avatar-xl" alt="Avatar" />
                                    </figure>
                                  </div>
                                  <div className="bookingInfo">
                                    <div className="bookingTitle">
                                      <h5 className="titlesName">{item.title}<span className="Bookscats">{item.tag}</span></h5>
                                      <div className="d-flex align-items-center justify-content-start gap-2">
                                        {item.pending && <span className="badge badge-xs pending rounded-pill">Pending</span>}
                                        {item.unpaid && <span className="badge badge-xs unpaid rounded-pill">Unpaid</span>}
                                        {item.approved && <span className="badge badge-xs approved rounded-pill">Approved</span>}
                                        {item.cancelled && <span className="badge badge-xs cancelled rounded-pill">Cancelled</span>}
                                      </div>
                                    </div>
                                    <div className="bookingDetails">
                                      <div className="singledetailInfo"><span className="listTitle">Booking Date</span>{item.date}</div>
                                      <div className="singledetailInfo"><span className="listTitle">Booking Info</span>{item.info}</div>
                                      <div className="singledetailInfo"><span className="listTitle">Client Name</span>{item.clientName}</div>
                                      <div className="singledetailInfo"><span className="listTitle">Contact</span>{item.contact}</div>
                                      <div className="singledetailInfo"><span className="listTitle">Price</span>{item.price}</div>
                                    </div>
                                    <div className="bookingAction">
                                      <div className="d-flex align-items-center justify-content-start flex-wrap gap-3">
                                        {item.reject && <a href="#" className="btn btn-sm btn-light-danger fw-medium rounded-pill"><i className="bi bi-x me-1"></i>Reject</a>}
                                        {item.approve && <a href="#" className="btn btn-sm btn-light-success fw-medium rounded-pill"><i className="bi bi-check2-circle me-1"></i>Approve</a>}
                                        {item.playNow && <a href="#" className="btn btn-sm btn-light-success fw-medium rounded-pill"><i className="bi bi-send-check me-1"></i>Pay Now</a>}
                                        {item.sendMsg && <a href="#" className="btn btn-sm btn-secondary fw-medium rounded-pill" data-bs-toggle="modal" data-bs-target="#messageModal"><i className="bi bi-envelope-dash me-1"></i>Send Message</a>}
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
  );
};

export default UserBookings;

