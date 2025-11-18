# 🏗️ STACKED – A Custom CRM Platform

**STACKED** is a multi-tenant CRM SaaS platform tailored for four distinct user groups:

* **Real Estate Agents**
* **Wholesalers**
* **Probate Specialists**
* **Home Flippers**

Built using the **MERN stack** with **MongoDB + JWT authentication** and **Firebase Google OAuth**, the platform delivers personalized workflows, payment flows via Stripe, and protected admin/affiliate dashboards — all deployed using **Vite** for lightning-fast performance.

---

## ⚙️ Tech Stack

| Layer          | Tech                       |
| -------------- | -------------------------- |
| **Frontend**   | React + Vite, Tailwind CSS |
| **Backend**    | Node.js + Express (MERN)   |
| **Database**   | MongoDB (Primary), Firebase Firestore (Secondary) |
| **Auth**       | MongoDB + JWT (Backend), Firebase Auth (Google OAuth) |
| **Payments**   | Stripe                     |
| **Storage**    | DigitalOcean Spaces, Firebase Storage |
| **Messaging**  | Twilio (SMS/Voice)         |
| **Analytics**  | Firebase Analytics         |
| **Routing**    | React Router DOM           |
| **Deployment** | Vercel (Frontend) / Render (Backend) |

---

## 📦 Features Overview

* 🔐 **Authentication** – MongoDB + JWT with Firebase Google OAuth integration.
* 📂 **4 Profession-Specific CRMs** – With tailored dashboards and route access.
* 💳 **Stripe Integration** – For pricing page and real-time payment processing.
* 🔑 **Protected Routes** – Role-based access control using custom route guards.
* 🧩 **Lazy Loaded Routes** – Faster initial load time using `React.lazy`.
* 🧠 **Admin Dashboard** – For email management, payments, newsletters, and calendar.
* 📊 **Affiliate Dashboard** – For affiliate marketing and referral management.
* 📧 **Email Integration** – Gmail API integration for customer service.
* 📱 **SMS/Voice** – Twilio integration for messaging and voice calls.
* 🔥 **Firebase Services** – Firestore for newsletters/calendar, Storage for files, Analytics for tracking.
* ⚡ **Vite + Tailwind** – Fast builds, instant HMR, and modern styling.

---

## 🔍 File Structure (Simplified)

```
src/
│
├── components/
│   ├── loaders/FullPageLoader.jsx
│   ├── Form/OAuth.jsx (Firebase Google OAuth)
│   └── RealEstate/...
│
├── pages/
│   ├── Login.jsx
│   ├── Landing.jsx
│   ├── PricingSummary.jsx
│   ├── Pricepackages/
│   ├── Admin/
│   └── RealEstate/
│
├── services/
│   ├── newsletterService.js (Firebase Firestore)
│   ├── calendarService.js (Firebase Firestore)
│   ├── affiliateService.js (Firebase Firestore)
│   └── propertyService.js (RentCast API)
│
├── utils/
│   ├── ProtectedRoute.jsx
│   └── fileUpload.js (Firebase Storage)
│
├── App.jsx
├── firebase-config.js
└── index.js
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```env
# Backend API URL
VITE_API_URL=http://localhost:5001/api/v1

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Firebase Configuration
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_APP_ID=your_firebase_app_id
VITE_MEASUREMENT_ID=your_firebase_measurement_id

# Intercom Chat
VITE_INTERCOM_APP_ID=your_intercom_app_id
```

### 3. Run the App

```bash
npm run dev
```

Your app will be live at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

---

## 🔒 Role-Based Routing Overview

| User Type       | Routes Protected By                     |
| --------------- | --------------------------------------- |
| Admin           | `<ProtectedRoute type="admin" />`       |
| Real Estate CRM | `<ProtectedRoute type="real_estate" />` |
| Affiliate       | `<ProtectedRoute type="affiliate" />`   |
| Public Users    | Unprotected                             |

---

## 💳 Stripe Integration

* Uses `@stripe/react-stripe-js` and `@stripe/stripe-js`
* Handles dynamic payment flows for each CRM type
* Payment intents created on backend, confirmed on frontend
* Webhook support for payment status updates
* Checkout is available at: `/payment`

---

## 🔥 Firebase Integration

### Firebase Services Used:

1. **Firebase Auth** - Google OAuth authentication (`components/Form/OAuth.jsx`)
2. **Firestore** - Secondary database for:
   - Newsletters (Admin)
   - Calendar Events (Admin)
   - Affiliate Data (Referrals, Payouts, Clawbacks)
3. **Firebase Storage** - File uploads (`utils/fileUpload.js`)
4. **Firebase Analytics** - User behavior tracking

### Firestore Collections:
- `newsletters` - Newsletter management
- `calendar_events` - Calendar events
- `affiliates` - Affiliate profiles
- `affiliate_referrals` - Referral tracking
- `affiliate_payouts` - Payout records
- `affiliate_clawbacks` - Clawback records

---

## 📢 Admin Features

* Email Management (Gmail API)
* Payment Records
* Newsletter Distribution (Firebase Firestore)
* Account Look-up
* Calendar View (Firebase Firestore)
* Affiliate Management

Accessible at `/admin/dashboard` (admin login required).

---

## 📂 CRMs Included

Each CRM has a dedicated dashboard, calendar, document center, client list, and pricing tools:

| CRM Type      | Entry Route      |
| ------------- | ---------------- |
| Real Estate   | `/real-estate`   |
| Wholesalers   | `/wholesalers`   |
| Probate       | `/probate`       |
| Home Flippers | `/home-flippers` |

---

## 🛠️ Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 📝 Notes

* **Authentication**: Primary authentication uses MongoDB + JWT tokens. Google OAuth uses Firebase Auth but integrates with the backend API.
* **Database**: MongoDB is the primary database. Firebase Firestore is used for specific features (newsletters, calendar, affiliates).
* **File Storage**: DigitalOcean Spaces for backend uploads, Firebase Storage for frontend uploads.
* **Environment Variables**: All sensitive credentials are stored in `.env` file (not committed to git).

---

## 🧪 Future Enhancements

* ✅ Role-based registration
* 📬 In-app notifications
* 📈 CRM performance analytics
* 📁 Drag & drop document uploads
