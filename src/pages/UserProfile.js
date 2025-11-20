import React, { useEffect, useState } from 'react';
import UserNavbar from '../components/UserNavbar';
import UserSidebar from '../components/UserSidebar';
import { supabase } from '../lib/supabase';
import './Admin.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    phone: '',
    phoneCode: '',
  });
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    phoneCode: '',
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [userInitial, setUserInitial] = useState('M');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    document.body.classList.add('admin-page');
    document.documentElement.classList.add('admin-page');
    return () => {
      document.body.classList.remove('admin-page');
      document.documentElement.classList.remove('admin-page');
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          
          // Get user metadata
          const fullName = session.user.user_metadata?.full_name || '';
          const email = session.user.email || '';
          const phone = session.user.user_metadata?.phone || '';
          const phoneCode = session.user.user_metadata?.phone_code || '';
          
          // Split full name into first and last name
          const nameParts = fullName.split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';
          
          setUserData({
            firstName,
            lastName,
            fullName,
            email,
            phone,
            phoneCode,
          });
          
          // Set edit data
          setEditData({
            firstName,
            lastName,
            email,
            phone,
            phoneCode,
          });
          
          // Set initial
          if (firstName) {
            setUserInitial(firstName.charAt(0).toUpperCase());
          } else if (email) {
            setUserInitial(email.charAt(0).toUpperCase());
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateUserProfile = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setMessage({ type: 'error', text: 'You must be logged in to update your profile.' });
        setSaving(false);
        return;
      }

      // Combine first and last name
      const fullName = `${editData.firstName} ${editData.lastName}`.trim();
      
      // Update user metadata
      const { data, error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone: editData.phone,
          phone_code: editData.phoneCode,
        }
      });

      if (error) throw error;

      // Email cannot be changed - removed email update logic
      setMessage({ type: 'success', text: 'Profile updated successfully!' });

      // Refresh user data
      const { data: { session: newSession } } = await supabase.auth.getSession();
      if (newSession?.user) {
        const fullName = newSession.user.user_metadata?.full_name || '';
        const email = newSession.user.email || '';
        const phone = newSession.user.user_metadata?.phone || '';
        const phoneCode = newSession.user.user_metadata?.phone_code || '';
        
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        setUserData({
          firstName,
          lastName,
          fullName,
          email,
          phone,
          phoneCode,
        });
        
        setEditData({
          firstName,
          lastName,
          email,
          phone,
          phoneCode,
        });

        if (firstName) {
          setUserInitial(firstName.charAt(0).toUpperCase());
        } else if (email) {
          setUserInitial(email.charAt(0).toUpperCase());
        }
      }

      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);

    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update profile. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const updatePassword = async () => {
    setChangingPassword(true);
    setMessage({ type: '', text: '' });

    // Validation
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill in all password fields.' });
      setChangingPassword(false);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New password and confirm password do not match.' });
      setChangingPassword(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      setChangingPassword(false);
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setMessage({ type: 'error', text: 'You must be logged in to change your password.' });
        setChangingPassword(false);
        return;
      }

      // Verify old password by attempting to sign in
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: session.user.email,
        password: passwordData.oldPassword,
      });

      if (verifyError) {
        setMessage({ type: 'error', text: 'Old password is incorrect.' });
        setChangingPassword(false);
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (updateError) throw updateError;

      setMessage({ type: 'success', text: 'Password updated successfully!' });
      
      // Clear password fields
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);

    } catch (error) {
      console.error('Error updating password:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update password. Please try again.' });
    } finally {
      setChangingPassword(false);
    }
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
            <div className="user-dashboard-box bg-light">
              <div className="dashHeader p-3">
                <h2 className="fw-medium mb-0" style={{ fontSize: '1.25rem' }}>My Profile</h2>
              </div>
              <div className="dashCaption p-3" style={{ paddingBottom: '2rem', marginBottom: '2rem' }}>
                {message.text && (
                  <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'} alert-dismissible fade show py-2 mb-2`} role="alert">
                    {message.text}
                    <button type="button" className="btn-close" onClick={() => setMessage({ type: '', text: '' })} aria-label="Close"></button>
                  </div>
                )}
                <div className="row align-items-start g-2 mb-2">
                  <div className="col-xl-8 col-lg-8 col-md-7">
                    <div className="card rounded-3 shadow-sm mb-2">
                      <div className="card-body p-3">
                        <div className="row align-items-start g-2">
                          <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="form-group form-border mb-2">
                              <label className="small mb-1">First Name</label>
                              <input 
                                type="text" 
                                className="form-control form-control-sm" 
                                value={editData.firstName} 
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="form-group form-border mb-2">
                              <label className="small mb-1">Last Name</label>
                              <input 
                                type="text" 
                                className="form-control form-control-sm" 
                                value={editData.lastName} 
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="form-group form-border mb-2">
                              <label className="small mb-1">Phone</label>
                              <input 
                                type="tel" 
                                className="form-control form-control-sm" 
                                value={editData.phone || ''} 
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="Enter phone number"
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="form-group form-border mb-2">
                              <label className="small mb-1">Email</label>
                              <input 
                                type="email" 
                                className="form-control form-control-sm" 
                                value={editData.email} 
                                readOnly
                                disabled
                                style={{ backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
                              />
                            </div>
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12">
                            <button 
                              className="btn btn-primary btn-sm fw-medium" 
                              type="button"
                              onClick={updateUserProfile}
                              disabled={saving}
                            >
                              {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card rounded-3 shadow-sm mb-4">
                      <div className="card-body p-3">
                        <div className="row align-items-start">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                            <div className="cardTitle d-flex align-items-center justify-content-start mb-2">
                              <h6 className="fw-semibold mb-0" style={{ fontSize: '0.9rem' }}>Update Password</h6>
                            </div>
                          </div>
                        </div>
                        <div className="row align-items-start g-2">
                          <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="form-group form-border mb-2">
                              <label className="small mb-1">Old Password</label>
                              <input 
                                type="password" 
                                className="form-control form-control-sm" 
                                placeholder="Enter current password"
                                value={passwordData.oldPassword}
                                onChange={(e) => handlePasswordChange('oldPassword', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="form-group form-border mb-2">
                              <label className="small mb-1">New Password</label>
                              <input 
                                type="password" 
                                className="form-control form-control-sm" 
                                placeholder="Enter new password"
                                value={passwordData.newPassword}
                                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6">
                            <div className="form-group form-border mb-2">
                              <label className="small mb-1">Confirm Password</label>
                              <input 
                                type="password" 
                                className="form-control form-control-sm" 
                                placeholder="Confirm new password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="text-end mt-2 mb-2">
                              <button 
                                className="btn btn-primary btn-sm fw-medium" 
                                type="button"
                                onClick={updatePassword}
                                disabled={changingPassword}
                              >
                                {changingPassword ? 'Updating...' : 'Update Password'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-4 col-lg-4 col-md-5">
                    <div className="card rounded-3 shadow-sm">
                      <div className="card-body p-3">
                        <div className="dash-prf-start d-flex flex-column align-items-start justify-content-start">
                          <div className="dash-prf-start-upper mx-auto">
                            <div className="dash-prf-start-thumb w-40 h-40 mb-2">
                              <div className="square--80 circle mx-auto bg-primary text-white fw-bold d-flex align-items-center justify-content-center" style={{ fontSize: '2rem', fontWeight: '600' }}>
                                {userInitial}
                              </div>
                            </div>
                          </div>
                          <div className="dash-prf-start-bottom mx-auto mt-2 text-center">
                            <h6 className="fw-semibold mb-1" style={{ fontSize: '0.95rem' }}>{userData.fullName || 'User'}</h6>
                            {userData.phone && (
                              <p className="text-muted mb-1 small" style={{ fontSize: '0.75rem' }}>
                                {userData.phoneCode ? `${userData.phoneCode} ` : ''}{userData.phone}
                              </p>
                            )}
                            {userData.email && (
                              <p className="text-muted mb-0 small" style={{ fontSize: '0.75rem' }}>{userData.email}</p>
                            )}
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
    </>
  );
};

export default UserProfile;

