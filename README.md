# mylocco - React Business Directory & Listing Template

This is a React version of the mylocco business directory template, converted from the original Angular/HTML version.

## Features

- 🏢 Business Directory & Listings
- 📱 Fully Responsive Design
- 🎨 Modern UI with Bootstrap 5
- 🔍 Advanced Search Functionality
- 📍 IP-based Geolocation (GPS/WiFi with IP fallback)
- 📍 Dynamic Location Detection
- 🗺️ Single Listing Pages with Gallery & Maps
- 📍 Category Browsing
- ⭐ Featured Listings
- 💬 Customer Reviews Section
- 📰 Blog/News Section
- 🛒 Shopping Cart Integration
- 📧 Newsletter Subscription
- 👤 User Dashboard & Profile Management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
mylocco-r/
├── public/
│   ├── css/          # CSS files (Bootstrap, Swiper, Leaflet, etc.)
│   ├── js/           # JavaScript libraries
│   ├── image/        # Image assets
│   ├── index.html    # HTML template
│   └── manifest.json
├── src/
│   ├── components/   # React components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   └── ...
│   ├── pages/        # Page components
│   │   ├── Home.js
│   │   └── ...
│   ├── App.js        # Main App component
│   ├── App.css
│   ├── index.js      # Entry point
│   └── index.css
├── package.json
└── README.md
```

## Technologies Used

- **React** 18.2.0
- **React Router** 6.20.0
- **Bootstrap** 5.3.2
- **Swiper** 11.0.5 (for sliders)
- **Leaflet** 1.9.4 (for maps)
- **Lightgallery** 2.7.2 (for image galleries)
- **Dropzone** 6.0.0-beta.2 (for file uploads)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Features Implemented

✅ Responsive Navigation Bar with Cart & Search
✅ Mobile Navigation with Fixed Overlay Z-Index
✅ Hero Section with Advanced Search Form
✅ Dynamic Location Display (IP Geolocation)
✅ Single Listing Pages with:
   - Hero Section with Logo/Avatar
   - Description Section
   - Image Gallery with Lightbox (Swipe Navigation)
   - Google Maps Integration
   - Similar Listings Carousel
   - Sidebar with Author Info, Opening Hours, Social Links
✅ Brand/Logo Slider Section
✅ Categories Grid with Icons
✅ Popular Listings Grid
✅ Customer Reviews Section
✅ Blog/News Section
✅ Footer with Newsletter Subscription
✅ User Dashboard & Profile Management
✅ React Router Setup
✅ Bootstrap 5 Integration

## Customization

### Changing Colors

Edit the CSS variables in `public/css/styles.css`:

```css
--bs-primary: #c71f37; /* Change this to your brand color */
```

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add a route in `src/App.js`
3. Add a navigation link in `src/components/Navbar.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This template is for use in your projects.

## Support

For issues and questions, please refer to the documentation or contact support.


