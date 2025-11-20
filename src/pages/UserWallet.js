import React from 'react';
import UserSidebar from '../components/UserSidebar';
import './Admin.css';

const UserWallet = () => {
  const year = new Date().getFullYear();

  const aboutData = [
    {
      bg: 'bg-danger',
      icon: 'bi bi-wallet text-white fs-2',
      value: '510',
      title: 'Your Balance in USD'
    },
    {
      bg: 'bg-warning',
      icon: 'bi bi-coin text-white fs-2',
      value: '720',
      title: 'Total Earning in USD'
    },
    {
      bg: 'bg-purple',
      icon: 'bi bi-basket2 text-white fs-2',
      value: '7',
      title: 'Total Orders'
    },
  ];

  const earning = [
    {
      name: 'Swarna Apartment',
      id: '#PC01362',
      date: 'Dec 10,2023',
      amount: '$200 USD',
      free: '$17.10 USD'
    },
    {
      name: 'Blue Cafe',
      id: '#PC01363',
      date: 'Jan 12,2024',
      amount: '$150 USD',
      free: '$12.30 USD'
    },
    {
      name: 'Kanoop Barbar Shop',
      id: '#PC013642',
      date: 'Sep 22,2023',
      amount: '$75.50 USD',
      free: '$10.20 USD'
    },
    {
      name: 'Classic Casino',
      id: '#PC01365',
      date: 'Dec 16,2024',
      amount: '$652 USD',
      free: '$80.90 USD'
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
                <h2 className="fw-medium mb-0">Wallet</h2>
              </div>
              <div className="dashCaption p-xl-5 p-3 p-md-4">
                <div className="row align-items-start g-4 mb-4">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      Your last payout <strong>$450 USD</strong> has been withdrawa!.
                      <button type="button" className="btn-close text-sm text-primary" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  </div>
                </div>
                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                  {aboutData.map((item, index) => (
                    <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                      <div className={`card rounded-3 position-relative p-4`}>
                        <div className={`position-absolute w-30 h-100 start-0 top-0 rounded-end-pill ${item.bg}`}>
                          <div className="position-absolute top-50 start-50 translate-middle">
                            <i className={item.icon}></i>
                          </div>
                        </div>
                        <div className="d-flex flex-column align-items-end justify-content-end ht-80">
                          <h2 className="mb-0"><span className="ctr">{item.value}</span></h2>
                          <p className="text-muted-2 fw-medium mb-0">{item.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card rounded-3 shadow-sm">
                      <div className="card-header flex-wrap gap-3 px-4">
                        <div className="cardTitle"><h4>Your Earning</h4></div>
                        <div className="headerInformations">
                          <div className="d-flex align-items-center justify-content-start justify-content-md-between flex-wrap gap-3">
                            <div className="singleCaps">
                              <div className="form-group position-relative m-0">
                                <input type="text" className="form-control form-control-md bg-light border-0 ps-5" placeholder="Search any parameters..." />
                                <span className="position-absolute top-50 start-0 translate-middle-y ms-3">
                                  <i className="fa-solid fa-magnifying-glass"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body p-3">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Order ID</th>
                              <th scope="col">Date</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Fee</th>
                            </tr>
                          </thead>
                          <tbody>
                            {earning.map((item, index) => (
                              <tr key={index}>
                                <td data-label="Name">{item.name}</td>
                                <td data-label="Order ID">{item.id}</td>
                                <td data-label="Date"><span className="text-normal">{item.date}</span></td>
                                <td data-label="Amount"><span className="fw-medium text-dark">{item.amount}</span></td>
                                <td data-label="View"><span className="fw-medium text-danger">{item.free}</span></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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

export default UserWallet;

