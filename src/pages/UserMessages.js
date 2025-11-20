import React, { useState } from 'react';
import UserSidebar from '../components/UserSidebar';
import './Admin.css';

const UserMessages = () => {
  const year = new Date().getFullYear();
  const [selectedMessage, setSelectedMessage] = useState(null);

  const data = [
    {
      image: '/image/team_1.jpg',
      name: 'Karan Shivraj',
      status: 'online',
      time: 'Today',
      unRead: false
    },
    {
      image: '/image/team_2.jpg',
      name: 'Shree Preet',
      status: 'busy',
      time: 'just Now',
      unRead: true
    },
    {
      image: '/image/team_3.jpg',
      name: 'Shikhar Musk',
      status: 'offline',
      time: '30 min ago',
      unRead: false
    },
    {
      image: '/image/team_4.jpg',
      name: 'Mortin Mukkar',
      status: 'online',
      time: 'Yesterday',
      unRead: false
    },
    {
      image: '/image/team_5.jpg',
      name: 'Melly Arjun',
      status: 'online',
      time: 'Today',
      unRead: false
    },
    {
      image: '/image/team_6.jpg',
      name: 'Mortin Mukkar',
      status: 'online',
      time: 'Yesterday',
      unRead: true
    },
  ];

  const showItem = (item) => {
    setSelectedMessage(item);
  };

  return (
    <>
      <section className="p-0">
        <div className="container-fluid p-0">
          <div className="row user-dashboard g-0">
            <div className="col-xl-2 col-lg-3 col-md-12">
              <UserSidebar />
            </div>
            <div className="col-xl-10 col-lg-9 col-md-12">
              <div className="user-dashboard-box bg-light">
                <div className="dashHeader p-xl-5 p-4 pb-xl-0 pb-0 pt-lg-0 pt-5 mt-lg-0 mt-5">
                  <h2 className="fw-medium mb-0">Messages</h2>
                </div>
                <div className="dashCaption p-xl-5 p-3 p-md-4">
                  <div className="row align-items-start g-4 mb-lg-5 mb-4">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div className="card rounded-3 shadow-sm">
                        <div className="card-header px-4 py-3">
                          <h4 className="m-0">All Messages</h4>
                        </div>
                        <div className="card-body p-0">
                          <ul className="dashboardListgroup nospace">
                            {data.map((item, index) => (
                              <li key={index}>
                                <a href="#" className="singleMessageswrap" onClick={(e) => { e.preventDefault(); showItem(item); }} data-bs-toggle="modal" data-bs-target="#conversionModal">
                                  <div className="singleMessages">
                                    <div className="messagesAvatar">
                                      <figure className="m-0">
                                        <img src={item.image} className="img-fluid circle avatar-xl" alt="Avatar" />
                                        <span className={`userStatus ${item.status}`}></span>
                                      </figure>
                                    </div>
                                    <div className="messagesInfo">
                                      <div className="messagesupper d-flex align-items-center justify-content-between gap-2 mb-1">
                                        <div className="messagesupper d-flex align-items-center justify-content-start gap-2">
                                          <h6 className="messageuserTitle">{item.name}</h6>
                                          {item.unRead && <span className="unread">Unread</span>}
                                        </div>
                                        <div className="flxLast"><span className="text-md text-muted">{item.time}</span></div>
                                      </div>
                                      <div className="messagesBody">
                                        <p className="m-0">Hello, I want to disscuss with you regarding my listing <strong>Apolo Hotel</strong> to manage and upgrade it with...</p>
                                      </div>
                                    </div>
                                  </div>
                                </a>
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

      <div className="modal fade" id="conversionModal" tabIndex="-1" aria-labelledby="conversionModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-transparent">
            <div className="chatboxWraper" id="conversionModalLabel">
              <div className="bg-cover chatboxHeader py-5" style={{ background: 'url(/image/avatar-bg-2.jpg) no-repeat' }} data-overlay="5">
                <a href="#" data-bs-dismiss="modal" aria-label="Close" className="close"><i className="bi bi-x"></i></a>
                {selectedMessage && (
                  <>
                    <div className="chatAvatar">
                      <figure><img src={selectedMessage.image} className="img-fluid circle avatar-xl" alt="Chat Avatar" /></figure>
                    </div>
                    <div className="chaterInfo">
                      <h6 className="chatterTitle">{selectedMessage.name}</h6>
                      <p className="subtitle">michelk.deve@gmail.com</p>
                    </div>
                  </>
                )}
              </div>
              <div className="chatboxbody">
                <div id="chat-messages" className="animate">
                  <label>Tuesday 07</label>
                  <div className="message">
                    <img src="/image/team_2.jpg" alt="" />
                    <div className="bubble">
                      Hi dear Michel!
                      <div className="corner"></div>
                      <span>1 min</span>
                    </div>
                  </div>
                  <div className="message right">
                    <img src="/image/team_4.jpg" alt="" />
                    <div className="bubble">
                      Hi, How may i help you?
                      <div className="corner"></div>
                      <span>4 min</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chatfooter">
                <div className="chatAdder">
                  <button type="button" id="add"><i className="bi bi-patch-plus-fill"></i></button>
                  <button type="button" id="gif"><i className="bi bi-emoji-laughing"></i></button>
                </div>
                <div className="sendmessage">
                  <input type="text" className="form-control" defaultValue="Send message..." />
                  <button type="button" id="send"><i className="bi bi-send"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMessages;

