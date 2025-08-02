# RootsReach - Artisan Management System

RootsReach is a comprehensive platform designed to connect artisans with distributors and buyers, streamlining the process of selling handcrafted products while preserving traditional craftsmanship.

## Features

- **Multi-role Authentication**: Secure login for artisans, distributors, buyers, and administrators
- **Product Management**: Create, update, and manage artisan products
- **Order Processing**: Track and manage orders from creation to delivery
- **AI-powered Product Descriptions**: Generate professional product descriptions with AI assistance
- **Voice Instructions**: Convert text to speech for illiterate artisans
- **Translation Services**: Translate content to multiple languages
- **Raw Material Management**: Track and order raw materials
- **Inventory Management**: Keep track of product inventory
- **Dashboard Analytics**: Visual representation of sales, earnings, and performance

## Tech Stack

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Passport.js for OAuth
- Twilio for OTP verification

### Frontend
- React with Hooks
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests
- React Toastify for notifications

### DevOps
- Docker for containerization
- Docker Compose for orchestration

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Rohitrraj01/RootsReach.git
   cd RootsReach
   ```

2. Set up the backend:
   ```
   cd Backend
   npm install
   cp env.template .env
   ```
   Edit the `.env` file with your configuration.

3. Set up the frontend:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

#### Development Mode

1. Start both servers with the provided script:
   ```
   ./start.sh
   ```

   This will start:
   - Backend server on port 12000
   - Frontend server on port 12001

2. Access the application:
   - Frontend: http://localhost:12001
   - Backend API: http://localhost:12000/api

#### Using Docker

1. Build and start the containers:
   ```
   docker-compose up -d
   ```

2. Access the application:
   - Frontend: http://localhost:12001
   - Backend API: http://localhost:12000/api

## API Documentation

Detailed API documentation is available in the Backend directory:
- [API Documentation](./Backend/API_DOCUMENTATION.md)
- [Authentication Documentation](./Backend/AUTHENTICATION_DOCUMENTATION.md)
- [RBAC Implementation](./Backend/RBAC_IMPLEMENTATION_SUMMARY.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgements

- All the artisans who inspired this project
- The open-source community for the amazing tools and libraries