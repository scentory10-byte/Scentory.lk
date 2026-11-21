# SCENTORY.LK — Luxury Perfume E-Commerce Platform (Sri Lanka)

A complete, high-end, responsive luxury fragrance e-commerce web platform designed for **SCENTORY.LK** ("A New Destination For Your Signature Scent"). Built with an obsidian black and warm gold aesthetic matching the official brand identity, featuring an interactive **Three.js 3D perfume bottle** with golden vapor mist, customer account security, dynamic bottle variant pricing (5ml, 10ml, 20ml, 50ml, 100ml), **mandatory bank transfer receipt slip upload**, and a comprehensive **Admin Panel**.

---

## 🌟 Key Features

### 1. Luxury Theme & 3D Interactive Design
- **Brand Palette**: Onyx Matte Black (`#08080a`), Champagne Gold (`#D4AF37`), and Warm Amber glowing accents.
- **3D Flacon Visualizer**: Interactive **Three.js 3D Perfume Bottle** with crystal glass refraction, metallic gold collar and atomizer, floating animation, golden fragrance mist particles, and mouse/touch drag-to-rotate.
- **Ultra-Responsive**: Precision-crafted layout optimized for Mobile, Tablet, and Desktop screens.

### 2. Multi-Variant Fragrance Selection & Dynamic Pricing
- **Volume Variants**: Handcrafted decants and flacons:
  - `5ml Pocket Spray`
  - `10ml Travel Spray`
  - `20ml Luxury Decant`
  - `50ml Signature Flacon`
  - `100ml Grand Prestige`
- **Dynamic Live Price Changes**: Selecting any variant immediately recalculates the price, shows discount savings in Sri Lankan Rupees (Rs. / LKR), and updates stock availability badges in real-time.
- **Olfactory Pyramid**: Detailed display of Top Notes, Heart Notes, and Base Notes for every perfume.

### 3. Customer Authentication & Security
- **Mandatory Login/Register for Orders**: Customers must create an account or sign in to complete their purchase.
- **Customer Profile**: Captures Full Name, WhatsApp Contact Number, Email (Gmail), and Sri Lankan Delivery Address (District/City).
- **Customer Portal**: Order history with uploaded slip preview and live status tracking (*Pending Verification* ➔ *Payment Verified* ➔ *Processing* ➔ *Shipped* ➔ *Delivered*).

### 4. Sri Lankan Bank Transfer Checkout Flow
- **Sri Lanka Currency**: All prices rendered in Sri Lankan Rupees (**LKR / Rs.**).
- **Bank Details Displayed**: Clear presentation of Commercial Bank of Ceylon account name, account number, branch, and narration reference instructions.
- **Mandatory Payment Slip Upload**: Built-in file uploader supporting images and PDFs. The order cannot be placed without uploading the payment proof.
- **Direct WhatsApp Confirmation**: One-click button after checkout to open WhatsApp chat with the customer's Order ID and slip proof.

### 5. Full Admin Panel
- **Secure Access**: Protected admin route and separate credentials.
  - **Email**: `admin@scentory.lk`
  - **Password**: `admin123`
- **Dashboard**:
  - Total verified revenue (LKR)
  - Total order counts
  - Pending bank slip verifications alert counter
  - Low stock variant alerts (&le; 10 bottles)
  - Automatic trending perfumes calculated from order counts
- **Order & Slip Management**:
  - Filter orders by status (*Pending Verification*, *Verified*, *Rejected*, *Placed*, *Processing*, *Shipped*, *Delivered*)
  - One-click **WhatsApp Chat** with the customer
  - **Full-Resolution Bank Slip Viewer** with payment approval/rejection buttons
  - Order fulfillment workflow and admin notes
- **Product & Variant Management**:
  - Create, update, or remove fragrances
  - **Dual Image Support**: Upload local image files via Multer **or** paste direct image URLs!
  - **Dynamic Variant Editor**: Add/remove bottle sizes (5ml, 10ml, etc.), custom LKR price, discount price, SKU, and stock
  - **Featured Toggle**: Checkbox to feature or unfeature fragrances on the Home page
- **Fast Stock Inventory**: Spreadsheet-style editor to adjust variant stocks instantly.
- **Reports & Analytics**: Daily sales breakdown, product unit volumes, and **Export to CSV**.
- **Store & Bank Settings**: Update bank name, account holder, account number, branch, WhatsApp contact, and shipping fees anytime without touching code.

---

## 🚀 How to Run the Website

### Step 1: Start the Server
Open a terminal in `C:\Shuhail Pefume Website`:
```bash
npm start
```
The server will start on **http://localhost:5000**.
The frontend is already built into `client/dist` and served directly by the Express server.

### Step 2: Access the Application
- **Customer Storefront**: Open [http://localhost:5000](http://localhost:5000)
- **Admin Panel**: Click **Admin Portal** in the footer, or sign in using:
  - **Email**: `admin@scentory.lk`
  - **Password**: `admin123`

### Step 3: Development Mode (Optional)
If you wish to edit frontend code with Vite Hot Reload:
```bash
# Terminal 1: Backend
npm run server

# Terminal 2: Frontend Vite
npm run client
```
Vite dev server will run on **http://localhost:5173** and proxy API requests automatically to port 5000.
