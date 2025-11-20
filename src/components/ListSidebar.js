import React from 'react';

const ListSidebar = () => {
  return (
    <div className="searchingSidebar pe-xl-5">
      <div className="offcanvas offcanvas-start largeshow" data-bs-scroll="true" tabIndex="-1" id="filterSlider" aria-labelledby="filterSliderLabel">
        <div className="offcanvas-header border-bottom py-3">
          <h3 className="h5">Filters</h3>
          <button type="button" className="btn-close text-sm d-lg-none" data-bs-dismiss="offcanvas" data-bs-target="#filterSidebar" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body overflow-x-hidden p-4 p-lg-0" id="filterSliderLabel">
          <div className="searchInner">
            <div className="search-inner">
              {/* Search Box */}
              <div className="filter-search-box mb-4">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search listing.." />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="prtsTypes mb-4">
                <div className="filterButton">
                  <div className="filterFlex">
                    <input type="radio" className="btn-check" name="ratingsfilter" id="all" defaultChecked />
                    <label className="btn" htmlFor="all"><i className="bi bi-star-fill me-1"></i>All</label>
                  </div>
                  <div className="filterFlex">
                    <input type="radio" className="btn-check" name="ratingsfilter" id="threeplus" />
                    <label className="btn" htmlFor="threeplus"><i className="bi bi-star-fill me-1"></i>3.0+</label>
                  </div>
                  <div className="filterFlex">
                    <input type="radio" className="btn-check" name="ratingsfilter" id="fourplus" />
                    <label className="btn" htmlFor="fourplus"><i className="bi bi-star-fill me-1"></i>4.0+</label>
                  </div>
                  <div className="filterFlex">
                    <input type="radio" className="btn-check" name="ratingsfilter" id="fiveplus" />
                    <label className="btn" htmlFor="fiveplus"><i className="bi bi-star-fill me-1"></i>5.0</label>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="filter-search-box mb-4">
                <div className="filtersearch-title"><h6 className="mb-2 lh-base text-sm text-uppercase fw-medium">Categories</h6></div>
                <div className="row align-items-center justify-content-between gy-2">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="d-flex align-items-center justify-content-center flex-wrap gap-2 mb-3">
                      <div className="form-checks flex-fill">
                        <input type="checkbox" className="btn-check" id="eatdrink1" />
                        <label className="btn btn-sm btn-secondary rounded-1 fw-medium full-width" htmlFor="eatdrink1">Eat & Drink</label>
                      </div>
                      <div className="form-checks flex-fill">
                        <input type="checkbox" className="btn-check" id="Apartments" />
                        <label className="btn btn-sm btn-secondary rounded-1 fw-medium full-width" htmlFor="Apartments">Apartments</label>
                      </div>
                      <div className="form-checks flex-fill">
                        <input type="checkbox" className="btn-check" id="classifieds1" />
                        <label className="btn btn-sm btn-secondary rounded-1 fw-medium full-width" htmlFor="classifieds1">Classified</label>
                      </div>
                      <div className="form-checks flex-fill">
                        <input type="checkbox" className="btn-check" id="services1" defaultChecked />
                        <label className="btn btn-sm btn-secondary rounded-1 fw-medium full-width" htmlFor="services1">Services</label>
                      </div>
                      <div className="form-checks flex-fill">
                        <input type="checkbox" className="btn-check" id="gymfitness1" />
                        <label className="btn btn-sm btn-secondary rounded-1 fw-medium full-width" htmlFor="gymfitness1">Gym & Fitness</label>
                      </div>
                      <div className="form-checks flex-fill">
                        <input type="checkbox" className="btn-check" id="nightlife1" />
                        <label className="btn btn-sm btn-secondary rounded-1 fw-medium full-width" htmlFor="nightlife1">Night Life</label>
                      </div>
                      <div className="form-checks flex-fill">
                        <input type="checkbox" className="btn-check" id="coachings1" />
                        <label className="btn btn-sm btn-secondary rounded-1 fw-medium full-width" htmlFor="coachings1">Coaching</label>
                      </div>
                      <div className="form-checks flex-fill">
                        <input type="checkbox" className="btn-check" id="shoppings1" />
                        <label className="btn btn-sm btn-secondary rounded-1 fw-medium full-width" htmlFor="shoppings1">Shopping</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Distance Filter */}
              <div className="filter-search-box mb-4">
                <div className="filtersearch-title"><h6 className="mb-2 lh-base text-sm text-uppercase fw-medium">Distance Filter in Km</h6></div>
                <div className="row align-items-center justify-content-between">
                  <div className="col-12">
                    <div className="searchBar-single-wrap mt-2">
                      <input type="range" className="form-range" min="0" max="100" defaultValue="50" />
                      <div className="d-flex justify-content-between mt-2">
                        <span>0 Km</span>
                        <span>100 Km</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-group filter_button mb-0">
                <button type="submit" className="btn btn-primary fw-medium full-width">Save & Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSidebar;

