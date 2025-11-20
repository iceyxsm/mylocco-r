import React, { useEffect, useState } from 'react';
import UserNavbar from '../components/UserNavbar';
import UserSidebar from '../components/UserSidebar';
import './Admin.css';

const UserAddListing = () => {
  const year = new Date().getFullYear();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const [workingHours, setWorkingHours] = useState(
    days.reduce((acc, day) => {
      acc[day] = { opening: '', closing: '' };
      return acc;
    }, {})
  );
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    document.body.classList.add('admin-page');
    document.documentElement.classList.add('admin-page');
    return () => {
      document.body.classList.remove('admin-page');
      document.documentElement.classList.remove('admin-page');
    };
  }, []);

  const handleOpeningTimeChange = (day, value) => {
    setWorkingHours(prev => {
      const updated = {
        ...prev,
        [day]: {
          opening: value,
          closing: value === 'closed' ? 'closed' : prev[day].closing
        }
      };
      return updated;
    });
  };

  const handleClosingTimeChange = (day, value) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        closing: value
      }
    }));
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          file: file,
          preview: reader.result
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (id) => {
    setGalleryImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <>
      <UserNavbar />
      <section className="p-0" style={{ paddingBottom: '3rem', marginBottom: '2rem' }}>
      <div className="container-fluid p-0">
        <div className="row user-dashboard g-0">
          <div className="col-xl-2 col-lg-3 col-md-12">
            <UserSidebar />
          </div>
          <div className="col-xl-10 col-lg-9 col-md-12">
            <div className="user-dashboard-box pt-lg-0 pt-5 mt-lg-0 mt-5" style={{ backgroundColor: '#f5f5f5' }}>
              <div className="dashHeader p-xl-5 p-4 pb-xl-0 pb-0">
                <h2 className="fw-medium mb-0">Add Listing</h2>
              </div>
              <div className="dashCaption p-xl-5 p-3 p-md-4" style={{ paddingBottom: '3rem', marginBottom: '2rem' }}>
                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card rounded-3 shadow-sm">
                      <div className="card-header py-4 px-4">
                        <h4 className="fs-5 fw-medium"><i className="fa fa-file text-primary me-2"></i>Basic Informations</h4>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group form-border">
                              <label className="lableTitle">Listing Tile<i className="lableTip bi bi-patch-question-fill" data-bs-toggle="tooltip" data-bs-title="Name of your business"></i></label>
                              <input type="text" className="form-control rounded" placeholder="Decathlon Sport House" />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                            <div className="form-group form-border">
                              <label className="lableTitle">Category</label>
                              <select className="form-control rounded">
                                <option>All Categories</option>
                                <option>Restaurants</option>
                                <option>Hotels</option>
                                <option>Shops</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group form-border">
                              <label className="lableTitle">About Listing</label>
                              <textarea className="form-control rounded ht-150" placeholder="Describe your self"></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card rounded-3 shadow-sm">
                      <div className="card-header py-4 px-4">
                        <h4 className="fs-5 fw-medium"><i className="bi bi-geo-alt text-primary me-2"></i>Add Location</h4>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group form-border">
                              <label className="lableTitle">Address</label>
                              <input type="text" className="form-control rounded" placeholder="202 Near houset market" />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                            <div className="form-group form-border">
                              <label className="lableTitle">City</label>
                              <input type="text" className="form-control rounded" placeholder="City, Country or zip" />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                            <div className="form-group form-border">
                              <label className="lableTitle">State</label>
                              <input type="text" className="form-control rounded" placeholder="" />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                            <div className="form-group form-border">
                              <label className="lableTitle">Postal Code</label>
                              <input type="text" className="form-control rounded" placeholder="" />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                            <div className="form-group form-border">
                              <label className="lableTitle">Country</label>
                              <input type="text" className="form-control rounded" placeholder="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card rounded-3 shadow-sm">
                      <div className="card-header py-4 px-4">
                        <h4 className="fs-5 fw-medium"><i className="bi bi-images text-primary me-2"></i>Logo & Gallery</h4>
                      </div>
                      <div className="card-body">
                        <div className="row g-4">
                          <div className="col-lg-4 col-md-6">
                            <label className="lableTitle">Upload Logo</label>
                            <div className="dropzone border rounded p-4 text-center" style={{ minHeight: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                              <i className="bi bi-patch-plus fs-1 text-muted"></i>
                              <p className="text-muted mb-0 mt-2">Click to upload</p>
                            </div>
                            <label className="smart-text text-md">Maximum file size: 2 MB.</label>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <label className="lableTitle">Featured Image</label>
                            <div className="dropzone border rounded p-4 text-center" style={{ minHeight: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                              <i className="bi bi-patch-plus fs-1 text-muted"></i>
                              <p className="text-muted mb-0 mt-2">Click to upload</p>
                            </div>
                            <label className="smart-text text-md">Maximum file size: 2 MB.</label>
                          </div>
                          <div className="col-lg-4 col-md-12">
                            <label className="lableTitle">Gallery</label>
                            <div className="gallery-upload-container">
                              <input
                                type="file"
                                id="gallery-upload"
                                multiple
                                accept="image/*"
                                onChange={handleGalleryUpload}
                                style={{ display: 'none' }}
                              />
                              {galleryImages.length === 0 ? (
                                <label
                                  htmlFor="gallery-upload"
                                  className="dropzone border rounded p-4 text-center d-block"
                                  style={{ minHeight: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                >
                                  <i className="bi bi-patch-plus fs-1 text-muted"></i>
                                  <p className="text-muted mb-0 mt-2">Click to upload multiple images</p>
                                </label>
                              ) : (
                                <div className="gallery-preview-container">
                                  <div className="row g-2">
                                    {galleryImages.map((image) => (
                                      <div key={image.id} className="col-6 col-md-4 position-relative">
                                        <div className="gallery-image-wrapper border rounded p-2" style={{ position: 'relative' }}>
                                          <img
                                            src={image.preview}
                                            alt="Gallery"
                                            className="img-fluid rounded"
                                            style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                                          />
                                          <button
                                            type="button"
                                            className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                                            style={{ borderRadius: '50%', width: '24px', height: '24px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            onClick={() => removeGalleryImage(image.id)}
                                          >
                                            <i className="bi bi-x" style={{ fontSize: '12px' }}></i>
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                    <div className="col-6 col-md-4">
                                      <label
                                        htmlFor="gallery-upload"
                                        className="dropzone border rounded p-4 text-center d-block"
                                        style={{ minHeight: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                      >
                                        <i className="bi bi-plus-circle fs-4 text-muted"></i>
                                        <p className="text-muted mb-0 mt-2 small">Add more</p>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <label className="smart-text text-md">Maximum file size: 2 MB per image.</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="card rounded-3 shadow-sm">
                      <div className="card-header py-4 px-4">
                        <h4 className="fs-5 fw-medium"><i className="bi bi-stopwatch text-primary me-2"></i>Working Hours</h4>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          {days.map((day, index) => (
                            <div key={index} className="form-group mb-3">
                              <div className="row align-items-center g-3">
                                <label className="lableTitle col-lg-2 col-md-2">{day}</label>
                                <div className="col-lg-5 col-md-5">
                                  <div className="selects border rounded">
                                    <select 
                                      className="form-control border-0"
                                      value={workingHours[day].opening}
                                      onChange={(e) => handleOpeningTimeChange(day, e.target.value)}
                                    >
                                      <option value="">Opening Time</option>
                                      <option value="closed">Closed</option>
                                      <option value="00:00">12:00 AM</option>
                                      <option value="01:00">1:00 AM</option>
                                      <option value="02:00">2:00 AM</option>
                                      <option value="03:00">3:00 AM</option>
                                      <option value="04:00">4:00 AM</option>
                                      <option value="05:00">5:00 AM</option>
                                      <option value="06:00">6:00 AM</option>
                                      <option value="07:00">7:00 AM</option>
                                      <option value="08:00">8:00 AM</option>
                                      <option value="09:00">9:00 AM</option>
                                      <option value="10:00">10:00 AM</option>
                                      <option value="11:00">11:00 AM</option>
                                      <option value="12:00">12:00 PM</option>
                                      <option value="13:00">1:00 PM</option>
                                      <option value="14:00">2:00 PM</option>
                                      <option value="15:00">3:00 PM</option>
                                      <option value="16:00">4:00 PM</option>
                                      <option value="17:00">5:00 PM</option>
                                      <option value="18:00">6:00 PM</option>
                                      <option value="19:00">7:00 PM</option>
                                      <option value="20:00">8:00 PM</option>
                                      <option value="21:00">9:00 PM</option>
                                      <option value="22:00">10:00 PM</option>
                                      <option value="23:00">11:00 PM</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-lg-5 col-md-5">
                                  <div className="selects border rounded">
                                    <select 
                                      className="form-control border-0"
                                      value={workingHours[day].closing}
                                      onChange={(e) => handleClosingTimeChange(day, e.target.value)}
                                      disabled={workingHours[day].opening === 'closed'}
                                    >
                                      <option value="">Closing Time</option>
                                      <option value="closed">Closed</option>
                                      <option value="00:00">12:00 AM</option>
                                      <option value="01:00">1:00 AM</option>
                                      <option value="02:00">2:00 AM</option>
                                      <option value="03:00">3:00 AM</option>
                                      <option value="04:00">4:00 AM</option>
                                      <option value="05:00">5:00 AM</option>
                                      <option value="06:00">6:00 AM</option>
                                      <option value="07:00">7:00 AM</option>
                                      <option value="08:00">8:00 AM</option>
                                      <option value="09:00">9:00 AM</option>
                                      <option value="10:00">10:00 AM</option>
                                      <option value="11:00">11:00 AM</option>
                                      <option value="12:00">12:00 PM</option>
                                      <option value="13:00">1:00 PM</option>
                                      <option value="14:00">2:00 PM</option>
                                      <option value="15:00">3:00 PM</option>
                                      <option value="16:00">4:00 PM</option>
                                      <option value="17:00">5:00 PM</option>
                                      <option value="18:00">6:00 PM</option>
                                      <option value="19:00">7:00 PM</option>
                                      <option value="20:00">8:00 PM</option>
                                      <option value="21:00">9:00 PM</option>
                                      <option value="22:00">10:00 PM</option>
                                      <option value="23:00">11:00 PM</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-start g-4 mb-5">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="d-flex align-items-center justify-content-start flex-wrap gap-3 mb-4">
                      <button type="button" className="btn btn-primary fw-medium">Submit Listing</button>
                      <button type="button" className="btn btn-light-primary fw-medium">Save as Draft</button>
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

export default UserAddListing;

