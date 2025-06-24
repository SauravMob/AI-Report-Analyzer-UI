# Campaign Analyzer UI

A modern, responsive React + TypeScript frontend for the Campaign Analyzer RAG system. Built with Tailwind CSS, Framer Motion, and modern UI patterns.

## 🚀 Features

- **Modern UI Design**: Clean, professional interface with smooth animations
- **Real-time API Integration**: Direct connection to Spring Boot backend
- **Natural Language Queries**: Intuitive query input with example suggestions
- **Interactive Results**: Rich analysis display with extracted metrics
- **Analysis History**: Track and revisit previous analyses
- **Health Monitoring**: Real-time API status indicator
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Smooth loading animations and progress indicators

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Axios** for API calls
- **React Hook Form** for form handling
- **React Hot Toast** for notifications
- **Lucide React** for icons

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- Campaign Analyzer Spring Boot backend running on port 8080

## 🔧 Setup Instructions

### 1. Clone and Install
```bash
# Create new React TypeScript project
npx create-react-app campaign-analyzer-ui --template typescript
cd campaign-analyzer-ui

# Install additional dependencies
npm install axios react-hook-form lucide-react clsx tailwindcss autoprefixer postcss react-hot-toast framer-motion @types/node
```

### 2. Setup Tailwind CSS
```bash
# Install and configure Tailwind
npx tailwindcss init -p

# Copy the tailwind.config.js content from above
# Copy the postcss.config.js content from above
```

### 3. Environment Configuration
```bash
# Create .env file
echo "REACT_APP_API_URL=http://localhost:8080" > .env
```

### 4. Replace Source Files
Replace the generated files with the provided code:
- Copy all TypeScript files to their respective locations
- Replace the default index.css with the provided styles
- Update index.html with the provided version

### 5. Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🎯 Usage Guide

### Basic Analysis
1. **Enter a Query**: Type or select an example query like "Give me analysis for campaign 61 for last week"
2. **Submit**: Click send or press Enter
3. **View Results**: See the AI-generated analysis with extracted metrics
4. **Explore History**: Click on previous analyses to view them again

### Example Queries
- `"Give me analysis for campaign 61 for last week"`
- `"Show performance of campaign_69 yesterday"`
- `"How is campaign 123 doing this month?"`
- `"Analyze campaign_45 for last month"`

### API Integration
The UI automatically connects to your Spring Boot backend and provides:
- **Health Check**: Real-time API status monitoring
- **Error Handling**: Clear error messages for different failure scenarios
- **Loading States**: Visual feedback during analysis processing

## 🎨 UI Components

### Core Components
- **Header**: Logo, title, and API status indicator
- **QueryInput**: Smart input with example suggestions
- **AnalysisResult**: Rich display of analysis results with metrics
- **LoadingSpinner**: Animated loading indicators
- **ErrorAlert**: User-friendly error messages
- **StatusIndicator**: API health visualization

### Design Features
- **Responsive Grid**: Adapts to different screen sizes
- **Smooth Animations**: Framer Motion powered transitions
- **Interactive Elements**: Hover effects and micro-interactions
- **Modern Typography**: Inter font for clean readability
- **Color System**: Consistent primary/secondary color palette

## 🔧 Customization

### Theming
Modify colors in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Update these colors to match your brand
        500: '#3b82f6',
        600: '#2563eb',
        // ...
      }
    }
  }
}
```

### API Configuration
Update the API URL in `.env`:
```env
REACT_APP_API_URL=https://your-api-domain.com
```

### Adding New Features
The component structure is modular and extensible:
- Add new components in `src/components/`
- Extend API calls in `src/services/api.ts`
- Create new hooks in `src/hooks/`

## 📱 Mobile Experience

The UI is fully responsive with:
- **Touch-friendly**: Large tap targets and gestures
- **Mobile Navigation**: Optimized layout for small screens
- **Performance**: Optimized animations and loading
- **Accessibility**: Proper contrast and semantic markup

## 🔍 Testing

Run the test suite:
```bash
npm test
```

Build for production:
```bash
npm run build
```

## 🚀 Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
# Serve the build folder with your preferred web server
```

### Docker (Optional)
```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🛠 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Verify Spring Boot backend is running on port 8080
   - Check CORS configuration in backend
   - Ensure .env file has correct API URL

2. **Styling Issues**
   - Run `npm run build` to regenerate Tailwind styles
   - Check if Tailwind config is properly set up

3. **TypeScript Errors**
   - Ensure all dependencies are installed: `npm install`
   - Check TypeScript version compatibility

### Performance Optimization
- Images are optimized and lazy-loaded
- Components use React.memo where appropriate
- API calls are debounced and cached
- Animations are GPU-accelerated

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React, TypeScript, and modern web technologies**