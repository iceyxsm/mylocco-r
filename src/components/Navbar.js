import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhoneCode, setSignupPhoneCode] = useState('+1');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showUnverifiedModal, setShowUnverifiedModal] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [storedLoginPassword, setStoredLoginPassword] = useState(''); // Store password for auto-login after verification
  const [userInitial, setUserInitial] = useState('M');

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // Check for existing session only if Supabase is configured
    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        // Check if user's email is verified
        if (session?.user && !session.user.email_confirmed_at) {
          // Sign out unverified users
          supabase.auth.signOut();
          setUser(null);
        } else {
          setUser(session?.user ?? null);
        }
      });

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        // Check if user's email is verified
        if (session?.user && !session.user.email_confirmed_at) {
          // Sign out unverified users
          supabase.auth.signOut();
          setUser(null);
        } else {
          setUser(session?.user ?? null);
        }
      });

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
        subscription.unsubscribe();
      };
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const current = location.pathname;

  const toggleMobileMenu = () => {
    setToggle(!toggle);
    if (!toggle) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  const isListingsActive = ['/grid-layout-01', '/grid-layout-02', '/grid-layout-03', '/grid-layout-04', '/grid-layout-05', '/grid-layout-06', '/list-layout-01', '/list-layout-02', '/list-layout-03', '/list-layout-04', '/list-layout-05', '/half-map-01', '/half-map-02', '/half-map-03', '/half-map-04', '/half-map-05', '/single-listing-01', '/single-listing-02', '/single-listing-03', '/single-listing-04', '/single-listing-05'].includes(current);
  const isDashboardActive = ['/dashboard-user', '/dashboard-my-profile', '/dashboard-my-bookings', '/dashboard-my-listings', '/dashboard-bookmarks', '/dashboard-messages', '/dashboard-reviews', '/dashboard-wallet', '/dashboard-add-listing'].includes(current);
  const isPagesActive = ['/login', '/register', '/forgot-password', '/two-factor-auth', '/checkout-page', '/success-payment', '/invoice-page', '/viewcart', '/author-profile', '/booking-page', '/about-us', '/blog', '/contact-us', '/pricing', '/help-center', '/comingsoon', '/faq', '/error', '/elements'].includes(current);
  const isGridLayoutsActive = ['/grid-layout-01', '/grid-layout-02', '/grid-layout-03', '/grid-layout-04', '/grid-layout-05', '/grid-layout-06'].includes(current);
  const isListLayoutsActive = ['/list-layout-01', '/list-layout-02', '/list-layout-03', '/list-layout-04', '/list-layout-05'].includes(current);
  const isHalfMapActive = ['/half-map-01', '/half-map-02', '/half-map-03', '/half-map-04', '/half-map-05'].includes(current);
  const isSingleListingsActive = ['/single-listing-01', '/single-listing-02', '/single-listing-03', '/single-listing-04', '/single-listing-05'].includes(current);
  const isMyAccountActive = ['/login', '/register', '/forgot-password', '/two-factor-auth'].includes(current);
  const isShopActive = ['/checkout-page', '/success-payment', '/invoice-page', '/viewcart'].includes(current);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured. Please add your credentials to the .env file and restart the server.');
      setLoading(false);
      return;
    }

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (loginError) throw loginError;

      if (data.user) {
        // Check if email is verified
        const isEmailVerified = data.user.email_confirmed_at !== null;
        
        if (!isEmailVerified) {
          // Sign out the user since email is not verified
          await supabase.auth.signOut();
          // Store password for auto-login after verification
          setStoredLoginPassword(loginPassword);
          // Close login modal
          const modalElement = document.getElementById('login');
          if (modalElement) {
            const modal = window.bootstrap?.Modal?.getInstance(modalElement);
            if (modal) {
              modal.hide();
            } else {
              modalElement.classList.remove('show');
              document.body.classList.remove('modal-open');
              const backdrop = document.querySelector('.modal-backdrop');
              if (backdrop) backdrop.remove();
            }
          }
          // Show unverified email modal
          setVerificationEmail(loginEmail);
          setShowUnverifiedModal(true);
          setResendTimer(60); // Start 60 second timer
          setError('');
          setLoading(false);
          return;
        }

        setSuccess('Login successful!');
        // Close modal
        const modalElement = document.getElementById('login');
        if (modalElement) {
          const modal = window.bootstrap?.Modal?.getInstance(modalElement);
          if (modal) {
            modal.hide();
          } else {
            // Fallback: manually hide modal
            modalElement.classList.remove('show');
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
          }
        }
        // Navigate to user dashboard
        navigate('/user');
        // Reset form
        setLoginEmail('');
        setLoginPassword('');
      }
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured. Please add your credentials to the .env file and restart the server.');
      setLoading(false);
      return;
    }

    // Validate passwords match
    if (signupPassword !== signupConfirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    // Validate password length
    if (signupPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    // Validate phone number
    if (!signupPhone || signupPhone.length < 7) {
      setError('Please enter a valid phone number (at least 7 digits).');
      setLoading(false);
      return;
    }

    try {
      // Combine country code and phone number
      const fullPhoneNumber = `${signupPhoneCode}${signupPhone}`;

      const { data, error: signupError } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            full_name: signupName,
            phone: fullPhoneNumber,
            phone_code: signupPhoneCode,
          },
          emailRedirectTo: `${window.location.origin}/user`,
        },
      });

      if (signupError) throw signupError;

      if (data.user) {
        // Close signup modal
        const modalElement = document.getElementById('signup');
        if (modalElement) {
          const modal = window.bootstrap?.Modal?.getInstance(modalElement);
          if (modal) {
            modal.hide();
          } else {
            // Fallback: manually hide modal
            modalElement.classList.remove('show');
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
          }
        }
        // Reset form
        setSignupName('');
        setSignupPassword('');
        setSignupConfirmPassword('');
        setSignupPhone('');
        setSignupPhoneCode('+1');
        // Show verification modal
        setVerificationEmail(signupEmail);
        setShowVerificationModal(true);
        setResendTimer(60); // Start 60 second timer
        setSignupEmail(''); // Clear email from signup form
      }
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async (email = null) => {
    const emailToUse = email || loginEmail || verificationEmail;
    
    if (!emailToUse) {
      setError('Please enter your email address first.');
      return;
    }

    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured. Please add your credentials to the .env file and restart the server.');
      return;
    }

    if (resendTimer > 0) {
      setError(`Please wait ${resendTimer} seconds before requesting another verification email.`);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: emailToUse,
      });

      if (resendError) throw resendError;

      setSuccess('Verification email sent! Please check your inbox.');
      setResendTimer(60); // Reset timer to 60 seconds
    } catch (err) {
      setError(err.message || 'Failed to resend verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Timer countdown effect
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (resendTimer === 0 && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  // Handle body scroll lock when verification modals are open
  useEffect(() => {
    if (showVerificationModal || showUnverifiedModal) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    }
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    };
  }, [showVerificationModal, showUnverifiedModal]);

  // Auto-verification checker - polls for email verification
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    let verificationCheckInterval = null;

    if (showVerificationModal || showUnverifiedModal) {
      // Poll every 5 seconds to check if email is verified
      verificationCheckInterval = setInterval(async () => {
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Error checking session:', error);
            return;
          }

          // Check if user has a verified session
          if (session?.user && session.user.email_confirmed_at) {
            // Email is verified!
            clearInterval(verificationCheckInterval);
            
            // Close verification modal
            setShowVerificationModal(false);
            setShowUnverifiedModal(false);
            setError('');
            setSuccess('');
            setResendTimer(0);
            
            // If we have stored password (from unverified login attempt), try to sign in
            if (showUnverifiedModal && storedLoginPassword && verificationEmail) {
              try {
                const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                  email: verificationEmail,
                  password: storedLoginPassword,
                });

                if (loginError) {
                  // If auto-login fails, user can manually login
                  console.error('Auto-login failed:', loginError);
                  setStoredLoginPassword('');
                  return;
                }

                if (loginData.user) {
                  setSuccess('Email verified! Logging you in...');
                  setUser(loginData.user);
                  navigate('/user');
                  setStoredLoginPassword('');
                  setVerificationEmail('');
                  return;
                }
              } catch (err) {
                console.error('Auto-login error:', err);
                setStoredLoginPassword('');
              }
            } else {
              // For signup flow, session is already created when they click verification link
              setUser(session.user);
              setSuccess('Email verified! Redirecting...');
              setTimeout(() => {
                navigate('/user');
                setVerificationEmail('');
              }, 1000);
            }
          }
        } catch (err) {
          console.error('Error in verification check:', err);
        }
      }, 5000); // Check every 5 seconds
    }

    return () => {
      if (verificationCheckInterval) {
        clearInterval(verificationCheckInterval);
      }
    };
  }, [showVerificationModal, showUnverifiedModal, verificationEmail, storedLoginPassword, navigate]);

  // Helper function to get user's display name (pure function, no side effects)
  const getUserDisplayName = () => {
    if (!user) return '';
    
    // Try to get name from user metadata (from signup)
    const fullName = user.user_metadata?.full_name || '';
    if (fullName) {
      // Get the first name (before the first space)
      const firstName = fullName.split(' ')[0];
      return firstName;
    }
    
    // Fallback to email if no name is available
    const emailName = user.email?.split('@')[0] || '';
    return emailName;
  };

  // Update user initial when user changes
  useEffect(() => {
    if (user) {
      const fullName = user.user_metadata?.full_name || '';
      if (fullName) {
        const firstName = fullName.split(' ')[0];
        setUserInitial(firstName.charAt(0).toUpperCase());
      } else {
        const emailName = user.email?.split('@')[0] || '';
        if (emailName) {
          setUserInitial(emailName.charAt(0).toUpperCase());
        } else {
          setUserInitial('M');
        }
      }
    } else {
      setUserInitial('M');
    }
  }, [user]);

  const handleLogout = async () => {
    if (!isSupabaseConfigured()) {
      setUser(null);
      navigate('/');
      return;
    }
    
    setLoading(true);
    try {
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) throw logoutError;
      setUser(null);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to logout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay panel for mobile menu */}
      {toggle && windowWidth <= 991 && (
        <div className="nav-overlay-panel" onClick={toggleMobileMenu} style={{ display: 'block' }}></div>
      )}
      
      <div data-sticky-element="" className={`header header-light ${scroll ? 'header-fixed' : ''}`}>
        <div className="container-fluid">
          <nav id="navigation" className={windowWidth > 991 ? 'navigation navigation-landscape' : 'navigation navigation-portrait'}>
            <div className="nav-header">
              <Link className="nav-brand" to="/">
                <img src="/image/logo.svg" className="logo" alt="" />
              </Link>
              <div className="nav-toggle" onClick={toggleMobileMenu}></div>
              <div className="mobile_nav">
                <ul>
                  {user ? (
                    <li>
                      <a data-bs-toggle="offcanvas" href="#userMenuOffcanvas" role="button" aria-controls="userMenuOffcanvas" className="d-inline-flex py-0 pt-1 px-1">
                        <div className="d-inline-flex w-8 h-8 circle overflow-hidden bg-primary text-light align-items-center justify-content-center" style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                          {userInitial}
                        </div>
                      </a>
                    </li>
                  ) : (
                    <li>
                      <a href="#" className="d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#login">
                        <i className="bi bi-person-circle me-1"></i>
                      </a>
                    </li>
                  )}
                  <li>
                    <a href="#searchSlider" className="d-flex align-items-center" data-bs-toggle="offcanvas" role="button" aria-controls="searchSlider">
                      <i className="bi bi-search me-1"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`nav-menus-wrapper ${toggle ? 'nav-menus-wrapper-open' : ''}`} style={{ transitionProperty: toggle ? 'none' : 'left' }}>
              <div className="mobLogos">
                <img src="/image/logo.svg" className="img-fluid lightLogo" alt="Logo" />
              </div>
              <span className="nav-menus-wrapper-close-button" onClick={toggleMobileMenu}>✕</span>
              <ul className="nav-menu">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/listings">Listings</Link>
                </li>
                <li>
                  <Link className="mob-addlisting light" to="/"><i className="bi bi-geo-alt-fill me-1"></i>Add Listing</Link>
                </li>
              </ul>

              <ul className="nav-menu nav-menu-social align-to-right">
                {user ? (
                  <>
                    <li>
                      <div className="btn-group account-drop">
                        <a href="#" className="nav-link btn-order-by-filt" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <div className="d-inline-flex w-8 h-8 circle overflow-hidden bg-primary text-light align-items-center justify-content-center" style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                            {userInitial}
                          </div>
                          <span className={`fw-medium d-inline-flex ms-2 ${location.pathname.startsWith('/user') ? 'text-light' : 'text-dark'}`}>{getUserDisplayName()}<i className="fa-solid fa-sort-down ms-1"></i></span>
                        </a>
                        <div className="dropdown-menu pull-right animated flipInX">
                          <div className="drp_menu_headr bg-primary">
                            <h4>Hi, {getUserDisplayName()}</h4>
                            <div className="drp_menu_headr-right">
                              <Link to="/user/profile" className="btn btn-whites text-dark">My Profile</Link>
                            </div>
                          </div>
                          <ul>
                            <li className={location.pathname === '/user' ? 'active' : ''}>
                              <Link to="/user"><i className="bi bi-speedometer me-2"></i>Dashboard Area</Link>
                            </li>
                            <li className={location.pathname === '/user/profile' ? 'active' : ''}>
                              <Link to="/user/profile"><i className="bi bi-person-lines-fill me-2"></i>My Profile</Link>
                            </li>
                            <li className={location.pathname === '/user/listings' ? 'active' : ''}>
                              <Link to="/user/listings"><i className="bi bi-ui-radios-grid me-2"></i>My Listings</Link>
                            </li>
                            <li className={location.pathname === '/user/bookmarks' ? 'active' : ''}>
                              <Link to="/user/bookmarks"><i className="bi bi-bookmark-star me-2"></i>Bookmarkes</Link>
                            </li>
                            <li className={location.pathname === '/user/reviews' ? 'active' : ''}>
                              <Link to="/user/reviews"><i className="bi bi-yelp me-2"></i>Reviews</Link>
                            </li>
                            <li className={location.pathname === '/user/add-listing' ? 'active' : ''}>
                              <Link to="/user/add-listing"><i className="bi bi-patch-plus me-2"></i>Add Listing</Link>
                            </li>
                            <li className="border-top mt-2 pt-2">
                              <button onClick={handleLogout} className="btn btn-link text-danger p-0 w-100 text-start" style={{ textDecoration: 'none' }}>
                                <i className="bi bi-box-arrow-right me-2"></i>Logout
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="list-buttons">
                      <Link to="/user/add-listing">
                        <i className="bi bi-geo-alt fs-6 me-1"></i>Add Listing
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <a href="#" className="d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#login">
                        <i className="bi bi-person-circle fs-6 me-1"></i>
                        <span className="navCl">SignUp or SignIn</span>
                      </a>
                    </li>
                    <li className="list-buttons">
                      <Link to="/register">
                        <i className="bi bi-geo-alt fs-6 me-1"></i>Add Listing
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="clearfix"></div>

      {/* Login Modal */}
      <div className="modal fade" id="login" tabIndex="-1" role="dialog" aria-labelledby="loginmodal" aria-hidden="true">
        <div className="modal-dialog" id="loginmodal">
          <div className="modal-content">
            <div className="modal-header justify-content-end border-0 pb-0">
              <a href="#" className="square--30 circle bg-light-danger text-danger" data-bs-dismiss="modal" aria-label="Close">
                <i className="fa-solid fa-xmark"></i>
              </a>
            </div>
            <div className="modal-body px-4">
              <div className="text-center mb-5">
                <h2>Welcome Back</h2>
                <p className="fs-6">Login to manage your account.</p>
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}
              <form className="needs-validation px-lg-2" noValidate onSubmit={handleLogin}>
                <div className="row align-items-center justify-content-between g-3 mb-4 d-none">
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <a href="#" className="btn btn-outline-secondary border rounded-3 text-md px-lg-2 full-width">
                      <img src="/image/google.png" className="img-fluid me-2" width="16" alt="" />Login with Google
                    </a>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <a href="#" className="btn btn-outline-secondary border rounded-3 text-md px-lg-2 full-width">
                      <img src="/image/facebook.png" className="img-fluid me-2" width="16" alt="" />Login with Facebook
                    </a>
                  </div>
                </div>
                <div className="form-group form-border mb-4">
                  <label className="form-label" htmlFor="email01">Your email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email01" 
                    placeholder="email@site.com" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required 
                  />
                  <span className="invalid-feedback">Please enter a valid email address.</span>
                </div>
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <label className="form-label" htmlFor="pass01">Password</label>
                    <Link className="link fw-medium text-primary" to="/forgot-password">Forgot Password?</Link>
                  </div>
                  <div className="form-group form-border input-group-merge position-relative">
                    <input 
                      type={showLoginPassword ? "text" : "password"}
                      className="form-control" 
                      id="pass01" 
                      placeholder="8+ characters required" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required 
                      style={{ paddingRight: '45px' }}
                    />
                    <button
                      type="button"
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-3"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      style={{ border: 'none', background: 'transparent', zIndex: 10 }}
                    >
                      <i className={showLoginPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                    </button>
                  </div>
                  <span className="invalid-feedback">Please enter a valid password.</span>
                </div>
                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary fw-medium" disabled={loading}>
                    {loading ? 'Logging in...' : 'Log in'}
                  </button>
                </div>
                <div className="text-center">
                  <p>Don't have an account yet? <a href="#" className="link fw-medium text-primary" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#signup">Sign up here</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <div className="modal fade" id="signup" tabIndex="-1" role="dialog" aria-labelledby="signupmodal" aria-hidden="true">
        <div className="modal-dialog" id="signupmodal">
          <div className="modal-content">
            <div className="modal-header justify-content-end border-0 pb-0">
              <a href="#" className="square--30 circle bg-light-danger text-danger" data-bs-dismiss="modal" aria-label="Close">
                <i className="fa-solid fa-xmark"></i>
              </a>
            </div>
            <div className="modal-body px-4 py-2">
              <div className="text-center mb-2">
                <h2 className="mb-1" style={{ fontSize: '1.5rem' }}>Create Account</h2>
                <p className="fs-6 mb-0" style={{ fontSize: '0.875rem' }}>Sign up to get started with your account.</p>
              </div>
              {error && (
                <div className="alert alert-danger" role="alert" style={{ fontSize: '0.875rem', padding: '0.5rem' }}>
                  {error}
                </div>
              )}
              {success && (
                <div className="alert alert-success" role="alert" style={{ fontSize: '0.875rem', padding: '0.5rem' }}>
                  {success}
                </div>
              )}
              <form className="needs-validation px-lg-2" noValidate onSubmit={handleSignup}>
                <div className="row align-items-center justify-content-between g-3 mb-4 d-none">
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <a href="#" className="btn btn-outline-secondary border rounded-3 text-md px-lg-2 full-width">
                      <img src="/image/google.png" className="img-fluid me-2" width="16" alt="" />Sign up with Google
                    </a>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6">
                    <a href="#" className="btn btn-outline-secondary border rounded-3 text-md px-lg-2 full-width">
                      <img src="/image/facebook.png" className="img-fluid me-2" width="16" alt="" />Sign up with Facebook
                    </a>
                  </div>
                </div>
                <div className="form-group form-border mb-2">
                  <label className="form-label mb-1" htmlFor="name01" style={{ fontSize: '0.875rem' }}>Full Name</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    id="name01" 
                    placeholder="John Doe" 
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required 
                  />
                  <span className="invalid-feedback">Please enter your full name.</span>
                </div>
                <div className="form-group form-border mb-2">
                  <label className="form-label mb-1" htmlFor="email02" style={{ fontSize: '0.875rem' }}>Your email</label>
                  <input 
                    type="email" 
                    className="form-control form-control-sm" 
                    id="email02" 
                    placeholder="email@site.com" 
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required 
                  />
                  <span className="invalid-feedback">Please enter a valid email address.</span>
                </div>
                <div className="form-group form-border mb-2">
                  <label className="form-label mb-1" htmlFor="phone01" style={{ fontSize: '0.875rem' }}>Phone Number</label>
                  <div className="d-flex gap-2">
                    <select
                      className="form-select form-select-sm"
                      style={{ width: '100px', flexShrink: 0 }}
                      value={signupPhoneCode}
                      onChange={(e) => setSignupPhoneCode(e.target.value)}
                      required
                    >
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+91">+91 (IN)</option>
                      <option value="+86">+86 (CN)</option>
                      <option value="+81">+81 (JP)</option>
                      <option value="+49">+49 (DE)</option>
                      <option value="+33">+33 (FR)</option>
                      <option value="+39">+39 (IT)</option>
                      <option value="+34">+34 (ES)</option>
                      <option value="+61">+61 (AU)</option>
                      <option value="+55">+55 (BR)</option>
                      <option value="+52">+52 (MX)</option>
                      <option value="+971">+971 (AE)</option>
                      <option value="+966">+966 (SA)</option>
                      <option value="+27">+27 (ZA)</option>
                      <option value="+234">+234 (NG)</option>
                      <option value="+20">+20 (EG)</option>
                      <option value="+60">+60 (MY)</option>
                      <option value="+65">+65 (SG)</option>
                      <option value="+66">+66 (TH)</option>
                      <option value="+84">+84 (VN)</option>
                      <option value="+82">+82 (KR)</option>
                      <option value="+7">+7 (RU)</option>
                      <option value="+90">+90 (TR)</option>
                      <option value="+31">+31 (NL)</option>
                      <option value="+32">+32 (BE)</option>
                      <option value="+41">+41 (CH)</option>
                      <option value="+46">+46 (SE)</option>
                      <option value="+47">+47 (NO)</option>
                      <option value="+45">+45 (DK)</option>
                      <option value="+358">+358 (FI)</option>
                      <option value="+351">+351 (PT)</option>
                      <option value="+353">+353 (IE)</option>
                      <option value="+64">+64 (NZ)</option>
                      <option value="+62">+62 (ID)</option>
                      <option value="+63">+63 (PH)</option>
                      <option value="+92">+92 (PK)</option>
                      <option value="+880">+880 (BD)</option>
                      <option value="+94">+94 (LK)</option>
                      <option value="+977">+977 (NP)</option>
                      <option value="+880">+880 (BD)</option>
                      <option value="+95">+95 (MM)</option>
                      <option value="+855">+855 (KH)</option>
                      <option value="+856">+856 (LA)</option>
                      <option value="+673">+673 (BN)</option>
                    </select>
                    <input 
                      type="tel" 
                      className="form-control form-control-sm flex-fill" 
                      id="phone01" 
                      placeholder="1234567890" 
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value.replace(/\D/g, ''))}
                      required 
                    />
                  </div>
                  <span className="invalid-feedback">Please enter a valid phone number.</span>
                </div>
                <div className="mb-2">
                  <label className="form-label mb-1" htmlFor="pass02" style={{ fontSize: '0.875rem' }}>Password</label>
                  <div className="form-group form-border input-group-merge position-relative">
                    <input 
                      type={showSignupPassword ? "text" : "password"}
                      className="form-control form-control-sm" 
                      id="pass02" 
                      placeholder="8+ characters required" 
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required 
                      style={{ paddingRight: '40px' }}
                    />
                    <button
                      type="button"
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-2"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      style={{ border: 'none', background: 'transparent', zIndex: 10, fontSize: '0.875rem' }}
                    >
                      <i className={showSignupPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                    </button>
                  </div>
                  <span className="invalid-feedback">Please enter a valid password.</span>
                </div>
                <div className="mb-2">
                  <label className="form-label mb-1" htmlFor="pass03" style={{ fontSize: '0.875rem' }}>Confirm Password</label>
                  <div className="form-group form-border input-group-merge position-relative">
                    <input 
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control form-control-sm" 
                      id="pass03" 
                      placeholder="Confirm your password" 
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      required 
                      style={{ paddingRight: '40px' }}
                    />
                    <button
                      type="button"
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{ border: 'none', background: 'transparent', zIndex: 10, fontSize: '0.875rem' }}
                    >
                      <i className={showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                    </button>
                  </div>
                  <span className="invalid-feedback">Passwords do not match.</span>
                </div>
                <div className="d-grid mb-2">
                  <button type="submit" className="btn btn-primary fw-medium btn-sm" disabled={loading}>
                    {loading ? 'Signing up...' : 'Sign up'}
                  </button>
                </div>
                <div className="text-center">
                  <p className="mb-0" style={{ fontSize: '0.875rem' }}>Already have an account? <a href="#" className="link fw-medium text-primary" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#login">Log in here</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Email Verification Modal */}
      {showVerificationModal && (
        <>
          <div 
            className="modal-backdrop fade show" 
            onClick={() => {
              setShowVerificationModal(false);
              setError('');
              setSuccess('');
              setResendTimer(0);
            }}
            style={{ zIndex: 1040 }}
          ></div>
          <div 
            className="modal fade show" 
            id="verificationModal" 
            tabIndex="-1" 
            role="dialog" 
            aria-labelledby="verificationModalLabel" 
            aria-hidden="false" 
            style={{ display: 'block', zIndex: 1050 }}
          >
            <div className="modal-dialog modal-dialog-centered" id="verificationModalLabel">
              <div className="modal-content">
                <div className="modal-header justify-content-end border-0 pb-0">
                  <button 
                    type="button" 
                    className="square--30 circle bg-light-danger text-danger" 
                    onClick={() => {
                      setShowVerificationModal(false);
                      setError('');
                      setSuccess('');
                      setResendTimer(0);
                    }}
                    aria-label="Close"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <div className="modal-body px-4 py-4">
                  <div className="text-center mb-4">
                    <div className="mb-3">
                      <i className="bi bi-envelope-check text-primary" style={{ fontSize: '3rem' }}></i>
                    </div>
                    <h2 className="mb-2">Verify Your Email</h2>
                    <p className="fs-6 text-muted mb-0">
                      We've sent a verification email to
                    </p>
                    <p className="fs-6 fw-semibold text-primary mb-3">{verificationEmail}</p>
                    <p className="fs-6 text-muted">
                      Please check your inbox and click the verification link to continue.
                    </p>
                    <p className="fs-6 text-muted mb-0" style={{ fontSize: '0.875rem', fontStyle: 'italic' }}>
                      <i className="bi bi-arrow-repeat me-1"></i>Checking verification status...
                    </p>
                  </div>
                  {error && (
                    <div className="alert alert-danger" role="alert" style={{ fontSize: '0.875rem' }}>
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="alert alert-success" role="alert" style={{ fontSize: '0.875rem' }}>
                      {success}
                    </div>
                  )}
                  <div className="d-grid gap-2 mb-3">
                    <button
                      type="button"
                      className="btn btn-primary fw-medium"
                      onClick={() => handleResendVerification(verificationEmail)}
                      disabled={loading || resendTimer > 0}
                    >
                      {loading ? (
                        'Sending...'
                      ) : resendTimer > 0 ? (
                        `Resend Verification Email (${resendTimer}s)`
                      ) : (
                        'Resend Verification Email'
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary fw-medium"
                      onClick={() => {
                        setShowVerificationModal(false);
                        setError('');
                        setSuccess('');
                        setResendTimer(0);
                      }}
                    >
                      Close
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="mb-0" style={{ fontSize: '0.875rem' }}>
                      Already verified?{' '}
                      <a 
                        href="#" 
                        className="link fw-medium text-primary" 
                        onClick={(e) => {
                          e.preventDefault();
                          setShowVerificationModal(false);
                          setError('');
                          setSuccess('');
                          setResendTimer(0);
                          // Open login modal
                          const loginModal = document.getElementById('login');
                          if (loginModal) {
                            const bsModal = new window.bootstrap.Modal(loginModal);
                            bsModal.show();
                          }
                        }}
                      >
                        Log in here
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Unverified Email Modal */}
      {showUnverifiedModal && (
        <>
          <div 
            className="modal-backdrop fade show" 
            onClick={() => {
              setShowUnverifiedModal(false);
              setError('');
              setSuccess('');
              setResendTimer(0);
            }}
            style={{ zIndex: 1040 }}
          ></div>
          <div 
            className="modal fade show" 
            id="unverifiedModal" 
            tabIndex="-1" 
            role="dialog" 
            aria-labelledby="unverifiedModalLabel" 
            aria-hidden="false" 
            style={{ display: 'block', zIndex: 1050 }}
          >
            <div className="modal-dialog modal-dialog-centered" id="unverifiedModalLabel">
              <div className="modal-content">
                <div className="modal-header justify-content-end border-0 pb-0">
                  <button 
                    type="button" 
                    className="square--30 circle bg-light-danger text-danger" 
                    onClick={() => {
                      setShowUnverifiedModal(false);
                      setError('');
                      setSuccess('');
                      setResendTimer(0);
                    }}
                    aria-label="Close"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <div className="modal-body px-4 py-4">
                  <div className="text-center mb-4">
                    <div className="mb-3">
                      <i className="bi bi-envelope-exclamation text-warning" style={{ fontSize: '3rem' }}></i>
                    </div>
                    <h2 className="mb-2">Email Not Verified</h2>
                    <p className="fs-6 text-muted mb-0">
                      Your email address has not been verified yet.
                    </p>
                    <p className="fs-6 fw-semibold text-primary mb-3">{verificationEmail}</p>
                    <p className="fs-6 text-muted">
                      Please check your inbox and click the verification link to continue. If you didn't receive the email, you can resend it below.
                    </p>
                    <p className="fs-6 text-muted mb-0" style={{ fontSize: '0.875rem', fontStyle: 'italic' }}>
                      <i className="bi bi-arrow-repeat me-1"></i>Checking verification status...
                    </p>
                  </div>
                  {error && (
                    <div className="alert alert-danger" role="alert" style={{ fontSize: '0.875rem' }}>
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="alert alert-success" role="alert" style={{ fontSize: '0.875rem' }}>
                      {success}
                    </div>
                  )}
                  <div className="d-grid gap-2 mb-3">
                    <button
                      type="button"
                      className="btn btn-primary fw-medium"
                      onClick={() => handleResendVerification(verificationEmail)}
                      disabled={loading || resendTimer > 0}
                    >
                      {loading ? (
                        'Sending...'
                      ) : resendTimer > 0 ? (
                        `Resend Verification Email (${resendTimer}s)`
                      ) : (
                        'Resend Verification Email'
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary fw-medium"
                      onClick={() => {
                        setShowUnverifiedModal(false);
                        setError('');
                        setSuccess('');
                        setResendTimer(0);
                        // Reopen login modal
                        const loginModal = document.getElementById('login');
                        if (loginModal) {
                          const bsModal = new window.bootstrap.Modal(loginModal);
                          bsModal.show();
                        }
                      }}
                    >
                      Back to Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Search Offcanvas */}
      <div className="offcanvas offcanvas-top h-auto" tabIndex="-1" id="searchSlider" aria-labelledby="searchSliderLabel">
        <div className="offcanvas-body" id="searchSliderLabel">
          <div className="searchForm w-100 mb-3">
            <div className="p-2 ps-3 rounded border d-flex align-items-center justify-content-between gap-2">
              <div className="searchicons">
                <span><i className="bi bi-search fs-4 opacity-75"></i></span>
              </div>
              <div className="flex-fill">
                <input type="search" className="form-control border-0 ps-0" placeholder="What are you looking for?" />
              </div>
              <div className="closeSlides">
                <a href="#" className="square--35 circle text-muted-2 border" data-bs-dismiss="offcanvas" aria-label="Close">
                  <i className="bi bi-x"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="popularSearches d-flex align-items-center justify-content-center gap-2 flex-wrap">
            <div className="singleItem">
              <Link to="#" className="badge badge-xs badge-primary rounded-pill">Real Estate</Link>
            </div>
            <div className="singleItem">
              <Link to="#" className="badge badge-xs badge-primary rounded-pill">Eat & Drink</Link>
            </div>
            <div className="singleItem">
              <Link to="#" className="badge badge-xs badge-primary rounded-pill">Shopping</Link>
            </div>
            <div className="singleItem">
              <Link to="#" className="badge badge-xs badge-primary rounded-pill">Nightlife</Link>
            </div>
            <div className="singleItem">
              <Link to="#" className="badge badge-xs badge-primary rounded-pill">Services</Link>
            </div>
          </div>
        </div>
      </div>

      {/* User Menu Offcanvas (Mobile) */}
      {user && (
        <div className="offcanvas offcanvas-end offcanvas-menu" tabIndex="-1" id="userMenuOffcanvas" aria-labelledby="userMenuOffcanvasLabel">
          <div className="offcanvas-header">
            <button type="button" className="btn-closes" data-bs-dismiss="offcanvas" aria-label="Close">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="offcanvas-body" id="userMenuOffcanvasLabel">
            <ul>
              <li className={location.pathname === '/user' ? 'active' : ''}>
                <Link to="/user"><i className="bi bi-speedometer me-2"></i>Dashboard Area</Link>
              </li>
              <li className={location.pathname === '/user/profile' ? 'active' : ''}>
                <Link to="/user/profile"><i className="bi bi-person-lines-fill me-2"></i>My Profile</Link>
              </li>
              <li className={location.pathname === '/user/listings' ? 'active' : ''}>
                <Link to="/user/listings"><i className="bi bi-ui-radios-grid me-2"></i>My Listings</Link>
              </li>
              <li className={location.pathname === '/user/bookmarks' ? 'active' : ''}>
                <Link to="/user/bookmarks"><i className="bi bi-bookmark-star me-2"></i>Bookmarkes</Link>
              </li>
              <li className={location.pathname === '/user/reviews' ? 'active' : ''}>
                <Link to="/user/reviews"><i className="bi bi-yelp me-2"></i>Reviews</Link>
              </li>
              <li className={location.pathname === '/user/add-listing' ? 'active' : ''}>
                <Link to="/user/add-listing"><i className="bi bi-patch-plus me-2"></i>Add Listing</Link>
              </li>
              <li className="border-top mt-2 pt-2">
                <button onClick={handleLogout} className="btn btn-link text-danger p-0 w-100 text-start" style={{ textDecoration: 'none' }}>
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
