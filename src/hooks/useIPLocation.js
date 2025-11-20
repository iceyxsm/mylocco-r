import { useState, useEffect } from 'react';

const useIPLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reverse geocoding function to get city name from coordinates
  const reverseGeocode = async (lat, lon) => {
    try {
      // Using BigDataCloud API (free, CORS-friendly, no API key needed)
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const data = await response.json();
      
      if (data && (data.city || data.locality || data.principalSubdivision)) {
        return {
          city: data.city || data.locality || '',
          region: data.principalSubdivision || data.administrativeArea || '',
          country: data.countryName || '',
          zip: data.postcode || '',
        };
      }
      return null;
    } catch (err) {
      console.error('Reverse geocoding error:', err);
      // Fallback: try ip-api.com reverse geocoding
      try {
        const fallbackResponse = await fetch(
          `http://ip-api.com/json/?fields=status,message,country,regionName,city,lat,lon,zip,timezone,query&lat=${lat}&lon=${lon}`
        );
        const fallbackData = await fallbackResponse.json();
        
        if (fallbackData.status === 'success') {
          return {
            city: fallbackData.city || '',
            region: fallbackData.regionName || '',
            country: fallbackData.country || '',
            zip: fallbackData.zip || '',
          };
        }
      } catch (fallbackErr) {
        console.error('Fallback reverse geocoding error:', fallbackErr);
      }
      return null;
    }
  };

  // IP-based location fallback
  const getIPLocation = async () => {
    try {
      const response = await fetch('https://ip-api.com/json/?fields=status,message,country,regionName,city,lat,lon,zip,timezone,query');
      const data = await response.json();
      
      if (data.status === 'success') {
        return {
          city: data.city || '',
          region: data.regionName || '',
          country: data.country || '',
          latitude: data.lat,
          longitude: data.lon,
          zip: data.zip || '',
          timezone: data.timezone || '',
          ip: data.query,
          fullLocation: `${data.city || ''}, ${data.regionName || ''}, ${data.country || ''}`.replace(/^,\s*|,\s*$/g, '').replace(/,\s*,/g, ',')
        };
      }
      return null;
    } catch (err) {
      console.error('IP location error:', err);
      return null;
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);

        // First, try browser Geolocation API (GPS/WiFi - most accurate)
        if (navigator.geolocation) {
          // Check if we're in a secure context (HTTPS or localhost) - required for geolocation
          if (window.isSecureContext || window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;
                
                // Get city name from coordinates using reverse geocoding
                const addressData = await reverseGeocode(latitude, longitude);
                
                if (addressData && addressData.city) {
                  setLocation({
                    city: addressData.city,
                    region: addressData.region,
                    country: addressData.country,
                    latitude: latitude,
                    longitude: longitude,
                    zip: addressData.zip,
                    timezone: '',
                    ip: '',
                    fullLocation: `${addressData.city || ''}, ${addressData.region || ''}, ${addressData.country || ''}`.replace(/^,\s*|,\s*$/g, '').replace(/,\s*,/g, ',')
                  });
                  setLoading(false);
                  return;
                }
                
                // If reverse geocoding fails, try IP fallback
                const ipLocation = await getIPLocation();
                if (ipLocation && (ipLocation.city || ipLocation.region || ipLocation.country)) {
                  setLocation(ipLocation);
                } else {
                  setError('Unable to determine location');
                }
                setLoading(false);
              },
              async (geoError) => {
                // Geolocation denied or failed, fallback to IP
                console.log('Geolocation error:', geoError.code, geoError.message);
                console.log('Error codes: 1=PERMISSION_DENIED, 2=POSITION_UNAVAILABLE, 3=TIMEOUT');
                
                // If permission was denied, user might have blocked it - use IP
                if (geoError.code === 1) {
                  console.log('Location permission denied by user, using IP fallback');
                }
                
                const ipLocation = await getIPLocation();
                
                if (ipLocation && (ipLocation.city || ipLocation.region || ipLocation.country)) {
                  setLocation(ipLocation);
                } else {
                  setError('Unable to determine location');
                }
                setLoading(false);
              },
              {
                enableHighAccuracy: true, // Use GPS if available
                timeout: 15000, // 15 seconds timeout (longer for mobile)
                maximumAge: 0 // Don't use cached location, always get fresh
              }
            );
          } else {
            // Not in secure context, skip geolocation and use IP
            console.log('Not in secure context, using IP location');
            const ipLocation = await getIPLocation();
            
            if (ipLocation && (ipLocation.city || ipLocation.region || ipLocation.country)) {
              setLocation(ipLocation);
            } else {
              setError('Unable to determine location');
            }
            setLoading(false);
          }
        } else {
          // Browser doesn't support geolocation, use IP
          console.log('Geolocation not supported, using IP fallback');
          const ipLocation = await getIPLocation();
          
          if (ipLocation && (ipLocation.city || ipLocation.region || ipLocation.country)) {
            setLocation(ipLocation);
          } else {
            setError('Unable to determine location');
          }
          setLoading(false);
        }
      } catch (err) {
        console.error('Location fetch error:', err);
        // Final fallback to IP
        const ipLocation = await getIPLocation();
        
        if (ipLocation && (ipLocation.city || ipLocation.region || ipLocation.country)) {
          setLocation(ipLocation);
        } else {
          setError(err.message || 'Failed to fetch location');
        }
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { location, loading, error };
};

export default useIPLocation;
