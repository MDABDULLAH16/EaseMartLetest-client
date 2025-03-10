# EaseMart - E-Commerce Platform

## 🛒 Overview
EaseMart is a full-featured eCommerce platform built with modern web technologies. It allows users to browse products, add items to their shopping cart, and complete transactions securely using AmmarPay. The platform also includes an admin dashboard for managing products, categories, and orders.

## 🚀 Live Demo
🔗 [Live Site](https://easemartletestv2.vercel.app/)
🔗 [Client Repository](https://github.com/MDABDULLAH16/EaseMartLetest-client)
🔗 [Server Repository](https://github.com/MDABDULLAH16/easeMartServer)

## 🛠 Technologies Used
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: NextAuth.js
- **Payments**: AmmarPay
- **State Management**: Redux

## 🔑 Features
- Product listing and categorization
- Shopping cart functionality
- User authentication and role management
- Admin dashboard for product and order management
- Secure online payments with AmmarPay
- Dynamic product search with a modal interface
- Responsive dark mode design

## 📌 Installation & Setup
### 🔹 Prerequisites
- Node.js & npm installed
- MongoDB running locally or cloud instance
- AmmarPay API credentials

### 🔹 Steps to Run
#### Backend Setup
```bash
# Clone the server repository
git clone <server-repo-url>
cd server
npm install

# Create a .env file and configure the following variables:
MONGO_URI=your_mongodb_url
AMMARPAY_API_KEY=your_api_key
PORT=5000

# Start the server
npm start
```

#### Frontend Setup
```bash
# Clone the client repository
git clone <client-repo-url>
cd client
npm install

# Create a .env file and add:
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# Start the development server
npm run dev
```

## 🎯 Usage
- Users can browse and purchase products.
- Admins can add, edit, and delete products and categories.
- Secure checkout with AmmarPay integration.

## 📄 License
This project is open-source and available under the MIT License.

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss.

---
### 📧 Contact
For any inquiries, reach out at **mdabdullah161036@gmail.com**
