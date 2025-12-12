# Appscrip Task - Dhruvit Gadhiya

A modern, responsive product listing page built with Next.js 15, featuring server-side rendering and comprehensive SEO optimization.

## 🚀 Features

- **Server-Side Rendering (SSR)** - Fast initial page loads with SEO benefits
- **Responsive Design** - Mobile-first approach supporting mobile, tablet, and desktop
- **Pure CSS** - No external CSS frameworks, custom modular CSS
- **Comprehensive SEO** - Meta tags, structured data, and accessibility features
- **Product Filtering** - Advanced filtering system with multiple categories
- **Real API Integration** - FakeStore API integration for product data
- **Performance Optimized** - Image optimization, efficient rendering
- **Accessibility First** - WCAG compliant with proper ARIA labels

## 🛠️ Tech Stack

- **Framework**: Next.js 15.x with App Router
- **Language**: TypeScript
- **Styling**: Pure CSS with CSS Modules
- **API**: FakeStore API (https://fakestoreapi.com/)
- **Package Manager**: pnpm/npm
- **Build Tool**: Next.js built-in bundler

## 📱 Responsive Breakpoints

- **Mobile**: ≤ 768px - Single column layout with collapsible filters
- **Tablet**: 769px - 1024px - 2-3 column grid layout
- **Desktop**: ≥ 1025px - Multi-column grid with sidebar filters

## 🎨 Design Implementation

The application implements a pixel-perfect design based on the provided Figma mockups with:

- Clean, minimal header with navigation
- Advanced filtering sidebar with expandable sections
- Grid-based product layout with hover effects
- Professional footer with newsletter signup
- Consistent typography and spacing

## 📊 SEO Optimization

### Meta Tags
- Comprehensive meta descriptions and titles
- Open Graph tags for social media sharing
- Twitter Card optimization
- Canonical URLs and proper language attributes

### Structured Data
- Schema.org markup for products and collections
- Rich snippets support for search engines
- Product-specific structured data with ratings and prices

### Technical SEO
- Server-side rendering for better crawlability
- Semantic HTML structure with proper heading hierarchy
- Image optimization with alt texts and SEO-friendly naming
- Fast loading times with Next.js optimization

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/Appscrip-task-Dhruvit-Gadhiya.git
cd Appscrip-task-Dhruvit-Gadhiya
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout with SEO
│   ├── page.tsx                 # Home page with SSR
│   └── page.module.css          # Page-specific styles
├── components/                   # React components
│   ├── Header/                  # Navigation header
│   ├── ProductCard/             # Individual product card
│   ├── ProductListingPage/      # Main listing component
│   └── Sidebar/                 # Filter sidebar
├── lib/                         # Utility functions
│   └── api.ts                   # API service functions
├── types/                       # TypeScript definitions
│   └── product.ts               # Product interfaces
├── public/                      # Static assets
└── README.md                    # Project documentation
```

## 🎯 Key Features Detail

### Server-Side Rendering
- Products are fetched on the server for better SEO
- Faster first contentful paint
- Better social media preview generation

### Performance Optimizations
- Image lazy loading with Next.js Image component
- Efficient re-renders with React useMemo and useCallback
- CSS modules for optimal styling performance
- Minimal bundle size with tree shaking

### Accessibility Features
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management for interactive elements

### Filter System
- Multi-category filtering (price, category, etc.)
- Real-time filter application
- Mobile-responsive collapsible sidebar
- Clear all filters functionality

## 🌐 Deployment

This application can be deployed on various platforms:

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy automatically on git push

### Vercel
1. Connect repository to Vercel
2. Automatic deployment with zero configuration
3. Built-in performance monitoring

### Other Platforms
- AWS Amplify
- GitHub Pages (with appropriate configuration)
- Docker deployment

## 🔍 SEO Checklist

- ✅ Page title optimization
- ✅ Meta descriptions
- ✅ H1/H2 tag structure
- ✅ Schema markup implementation
- ✅ Image alt texts
- ✅ SEO-friendly URLs
- ✅ Sitemap generation (can be added)
- ✅ Mobile-first responsive design
- ✅ Core Web Vitals optimization

## 🧪 Testing

### Manual Testing
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile device testing on various screen sizes
- Accessibility testing with screen readers
- Performance testing with Lighthouse

### Automated Testing
You can add testing frameworks like:
- Jest for unit testing
- Cypress for e2e testing
- React Testing Library for component testing

## 📝 API Integration

The application integrates with the FakeStore API:
- **Endpoint**: `https://fakestoreapi.com/products`
- **Features**: Product fetching, category filtering
- **Caching**: 1-hour revalidation for better performance
- **Error Handling**: Graceful fallbacks for API failures

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created as a technical assessment for Appscrip.

## 👨‍💻 Author

**Dhruvit Gadhiya**
- Email: [your-email@example.com]
- LinkedIn: [your-linkedin-profile]
- GitHub: [your-github-profile]

## 🙏 Acknowledgments

- Appscrip for the opportunity
- FakeStore API for providing test data
- Next.js team for the excellent framework
- The design team for the beautiful Figma mockups