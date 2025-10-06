# ✨ Sparkle Your Way

A sophisticated jewellery storefront + ordering system with an **Admin Panel**, built on modern web technologies.
Supports **product display, orders, Razorpay payments, Shiprocket deliveries, SMS/email alerts**, and a robust **admin management dashboard**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)  
![Express.js](https://img.shields.io/badge/Express.js-4.18-lightgrey?logo=express)  
![Firebase](https://img.shields.io/badge/Firebase-Realtime%20DB-orange?logo=firebase)  
![Razorpay](https://img.shields.io/badge/Payments-Razorpay-blue?logo=razorpay)  
![Shiprocket](https://img.shields.io/badge/Shipping-Shiprocket-purple)  
![Twilio](https://img.shields.io/badge/SMS-Twilio-red?logo=twilio)

---

## 🌟 Features

- 🛍 **Public Storefront**

  - Browse jewellery collections
  - Product detail pages with images from Firebase Storage
  - Cart & secure checkout with Razorpay
  - Order tracking with Shiprocket

- 🛠 **Admin Panel**

  - Manage products (CRUD + image uploads)
  - Manage offers & daily specials
  - View, filter, export orders
  - Shipment creation & tracking
  - Role-based access

- 💳 **Payments & Shipping**

  - Razorpay payment gateway integration
  - Cash on Delivery (COD) option
  - Shiprocket API for automated shipments

- 📩 **Notifications**

  - SMS alerts (Twilio / MSG91)
  - Transactional emails (SendGrid / Mailgun)

- 🔐 **Security & Reliability**

  - Firebase Authentication (Users + Admin roles)
  - Firebase Realtime Database rules
  - Encrypted environment variables
  - Webhook verification for Razorpay

---

## 🏗️ High-Level Architecture

```
Frontend (Next.js + Tailwind)
       |
       | API calls (Axios)
       v
Backend (Express.js on Firebase Functions / Cloud Run)
       |
       |---> Firebase Realtime Database (products, users, orders)
       |---> Firebase Storage (product images)
       |---> Razorpay API (payments)
       |---> Shiprocket API (shipments)
       |---> Twilio / SendGrid (SMS + Email)
```

---

## 📊 Firebase Data Model (Simplified)

```json
{
  "products": {
    "prod_123": {
      "title": "Gold Pendant",
      "price": 2500,
      "stock": 12,
      "images": ["gs://.../pendant.jpg"],
      "category": "pendants",
      "metal": "gold"
    }
  },
  "orders": {
    "order_abc": {
      "userId": "user_123",
      "items": [{ "productId": "prod_123", "qty": 2 }],
      "amounts": {
        "subtotal": 5000,
        "tax": 250,
        "deliveryCharge": 30,
        "total": 5280
      },
      "payment": {
        "method": "razorpay",
        "status": "paid",
        "paymentId": "pay_xyz"
      },
      "shipping": {
        "name": "Jane Doe",
        "pin": "700001",
        "shiprocket": { "awb": "SR123" }
      },
      "status": "shipped"
    }
  }
}
```

---

## ⚙️ Tech Stack

**Frontend**

- [Next.js](https://nextjs.org/) (React framework, SEO-friendly)
- [TailwindCSS](https://tailwindcss.com/) (modern styling)
- Axios for API calls

**Backend**

- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- Hosted on Firebase Functions / Google Cloud Run

**Services**

- **Database**: Firebase Realtime Database
- **Storage**: Firebase Storage
- **Payments**: Razorpay
- **Shipping**: Shiprocket API
- **Notifications**: Twilio (SMS)

---

## 📦 Folder Structure

```
SparkleYourWay/
│── frontend/      # Next.js frontend (storefront + admin panel)
│── backend/       # Express.js backend APIs
│   ├── src/
│   │   ├── routes/        # Orders, Products, Admin
│   │   ├── controllers/   # Business logic
│   │   ├── services/      # Razorpay, Shiprocket, Notifications
│   │   └── utils/         # Validation, helpers
│   └── .env               # Environment variables
│── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/RatnadeepParya/SparkleYourWay.git
cd SparkleYourWay
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
vi .env   # Add your secrets
node src/server.js
```

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at 👉 `http://localhost:3000`
Backend runs at 👉 `http://localhost:4000`

---

## 🔑 Environment Variables

Create a `.env` in **backend/**:

```
PORT=4000
RZP_KEY_ID=""
RZP_KEY_SECRET=""
RZP_WEBHOOK_SECRET=""
SHIPROCKET_EMAIL=""
SHIPROCKET_PASSWORD=""
FIREBASE_DB_URL=""
```

Create a `.env` in **frontend/**:

```
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_DATABASE_URL=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""
```

---

## 🔑 Environment Variables

Edit Firebase Realtime Database rules to:

```
{
  "rules": {
    "admins": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && root.child('admins').child(auth.uid).exists()"
      }
    },
    "products": {
      ".read": "auth != null && root.child('admins').child(auth.uid).exists()",
      ".write": "auth != null && root.child('admins').child(auth.uid).exists()"
    }
  }
}
```

Edit Firebase Storage rules to:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allImages=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 📬 API Endpoints (Example)

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| POST   | `/api/orders/create`     | Create order + Razorpay |
| POST   | `/api/webhooks/razorpay` | Handle Razorpay webhook |
| GET    | `/api/products`          | List all products       |
| POST   | `/api/admin/product`     | Add new product (Admin) |

---

## 🔐 Security

- Firebase Auth with **custom admin claims**
- Validation on backend (never trust client prices)
- Secure Razorpay webhooks with signature verification
- Restrictive Firebase Database rules

---

## 🚢 Deployment

- **Frontend**: Firebase Hosting
- **Backend**: Firebase Functions
- **Database/Storage**: Firebase
- **CI/CD**: GitHub Actions (build & deploy on push)

---

## 🛠 Future Enhancements

- Wishlist & Favorites
- Coupons & Gift Cards
- Advanced Analytics Dashboard
- Multi-language & Multi-currency

---

## 📜 License

Apache License © 2025 [Ratnadeep Parya](https://github.com/RatnadeepParya)
