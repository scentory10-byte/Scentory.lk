const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

let MongoClient = null;
try {
  MongoClient = require('mongodb').MongoClient;
} catch (e) {}

const DB_PATH = path.join(__dirname, 'data', 'database.json');

// Ensure data folder exists (wrapped safely for serverless runtimes)
try {
  if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
  }
} catch (e) {
  // Read-only filesystem in serverless, fallback handled by MongoDB Atlas
}

// Initial default seed
function getInitialData() {
  const salt = bcrypt.genSaltSync(10);
  const adminPasswordHash = bcrypt.hashSync('admin123', salt);

  return {
    settings: {
      storeName: 'SCENTORY.LK',
      brandSubtitle: 'A New Destination for Your Signature Scent',
      currency: 'LKR',
      currencySymbol: 'Rs. ',
      contactEmail: 'orders@scentory.lk',
      contactPhone: '0763151311',
      whatsappNumber: '0763151311',
      instagramHandle: '@scentory.lk',
      instagramUrl: 'https://www.instagram.com/scentory.lk',
      address: '313, Nawalapitiya Road, Ulapane, Sri Lanka',
      deliveryFee: 500,
      freeDeliveryThreshold: 999999999,
      bankDetails: {
        bankName: 'Commercial Bank of Ceylon',
        accountName: 'SCENTORY LANKA (PVT) LTD',
        accountNumber: '8012398456',
        branch: 'Kollupitiya Branch (Code: 045)',
        swiftCode: 'CCEYLKX',
        instructions: 'Please transfer the exact total amount and use your name or phone number as the payment reference. Upload the screenshot/receipt slip below.'
      },
      announcement: '✨ Free Island-wide Delivery on orders above Rs. 12,000 | Authentic Luxury Decants & Flacons'
    },
    users: [
      {
        id: 'usr_admin',
        name: 'Store Administrator',
        email: 'admin@scentory.lk',
        password: adminPasswordHash,
        role: 'admin',
        phone: '0763151311',
        address: 'SCENTORY Flagship Studio, Ulapane',
        city: 'Kandy',
        createdAt: new Date().toISOString()
      }
    ],
    products: [
      {
        id: 'prod_oud_royale',
        name: 'Oud Royale Impérial',
        gender: 'Unisex',
        scentFamily: 'Oriental Woody Oud',
        badge: 'Signature Masterpiece',
        isFeatured: true,
        rating: 5.0,
        reviewCount: 0,
        description: 'Opulent Cambodian agarwood blended with amber, smoky leather, and Turkish damask rose. Sri Lanka signature luxury extrait de parfum.',
        images: ['/brand-logo.png'],
        variants: [
          { id: 'v_5ml', size: '5ml Pocket Spray', price: 1950, discountPrice: 1750, stock: 50 },
          { id: 'v_10ml', size: '10ml Travel Atomizer', price: 3800, discountPrice: 3400, stock: 40 },
          { id: 'v_20ml', size: '20ml Decant Flacon', price: 7200, discountPrice: 6500, stock: 25 },
          { id: 'v_50ml', size: '50ml Signature Bottle', price: 16500, discountPrice: 14900, stock: 15 },
          { id: 'v_100ml', size: '100ml Pure Extrait', price: 28500, discountPrice: 25900, stock: 10 }
        ],
        createdAt: new Date().toISOString()
      }
    ],
    orders: [],
    reviews: [],
    notifications: [],
    chatMessages: [],
    passwordResetRequests: []
  };
}

class Database {
  constructor() {
    this.mongoCollection = null;
    this.mongoClient = null;
    this.connectPromise = null;
    this.init();
    if (process.env.MONGODB_URI && MongoClient) {
      this.connectPromise = this.connectMongo(process.env.MONGODB_URI);
    }
  }

  async ensureConnected() {
    if (this.connectPromise) {
      try { await this.connectPromise; } catch (e) {}
    } else if (process.env.MONGODB_URI && MongoClient && !this.mongoCollection) {
      this.connectPromise = this.connectMongo(process.env.MONGODB_URI);
      try { await this.connectPromise; } catch (e) {}
    }
  }

  init() {
    try {
      if (!fs.existsSync(DB_PATH)) {
        const initial = getInitialData();
        try { fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), 'utf-8'); } catch (e) {}
        this.data = initial;
      } else {
        const raw = fs.readFileSync(DB_PATH, 'utf-8');
        this.data = JSON.parse(raw);
      }
    } catch (err) {
      console.warn('Using in-memory/seed data:', err.message);
      this.data = getInitialData();
    }
  }

  async connectMongo(uri) {
    try {
      this.mongoClient = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
      await this.mongoClient.connect();
      console.log('✅ Connected to MongoDB Atlas Cloud Database!');
      const db = this.mongoClient.db('scentory');
      this.mongoCollection = db.collection('store_data');

      const doc = await this.mongoCollection.findOne({ _id: 'main_store_data' });
      if (doc && doc.data) {
        this.data = doc.data;
        console.log('✅ Synced live store data from MongoDB Atlas!');
      } else {
        await this.mongoCollection.updateOne(
          { _id: 'main_store_data' },
          { $set: { data: this.data, updatedAt: new Date() } },
          { upsert: true }
        );
        console.log('✅ Seeded initial store data to MongoDB Atlas!');
      }
    } catch (err) {
      console.error('MongoDB Atlas connection error, using fallback:', err.message);
    }
  }

  async save() {
    try { fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2), 'utf-8'); } catch (e) {}
    if (this.mongoCollection) {
      try {
        const op = {};
        op['$set'] = { data: this.data, updatedAt: new Date() };
        await this.mongoCollection.updateOne({ _id: 'main_store_data' }, op, { upsert: true });
      } catch (err) {
        console.error('MongoDB Atlas sync error:', err.message);
      }
    }
  }

  getUsers() { return this.data.users || []; }
  getUserById(id) { return this.getUsers().find(u => u.id === id); }
  getUserByEmail(email) { return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()); }
  async addUser(user) {
    this.data.users.push(user);
    await this.save();
    return user;
  }
  async updateUser(id, updates) {
    const idx = this.data.users.findIndex(u => u.id === id);
    if (idx !== -1) {
      this.data.users[idx] = { ...this.data.users[idx], ...updates };
      await this.save();
      return this.data.users[idx];
    }
    return null;
  }
  async deleteUser(id) {
    const idx = this.data.users.findIndex(u => u.id === id);
    if (idx !== -1) {
      const removed = this.data.users.splice(idx, 1)[0];
      await this.save();
      return removed;
    }
    return null;
  }

  // Products
  getProducts() { return this.data.products || []; }
  getProductById(id) { return this.getProducts().find(p => p.id === id); }
  async addProduct(product) {
    this.data.products.unshift(product);
    await this.save();
    return product;
  }
  async updateProduct(id, updates) {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.data.products[idx] = { ...this.data.products[idx], ...updates, updatedAt: new Date().toISOString() };
      await this.save();
      return this.data.products[idx];
    }
    return null;
  }
  async deleteProduct(id) {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      const removed = this.data.products.splice(idx, 1);
      await this.save();
      return removed[0];
    }
    return null;
  }

  // Orders
  getOrders() { return this.data.orders || []; }
  getOrderById(id) { return this.getOrders().find(o => o.id === id); }
  getUserOrders(userId) { return this.getOrders().filter(o => o.userId === userId); }
  async addOrder(order) {
    this.data.orders.unshift(order);

    // Increment salesCount and decrement stock for purchased variants
    order.items.forEach(item => {
      const prod = this.getProductById(item.productId);
      if (prod) {
        prod.salesCount = (prod.salesCount || 0) + item.quantity;
        const variant = prod.variants?.find(v => v.id === item.variantId);
        if (variant && variant.stock >= item.quantity) {
          variant.stock -= item.quantity;
        }
      }
    });

    await this.save();
    return order;
  }
  async updateOrder(id, updates) {
    const idx = this.data.orders.findIndex(o => o.id === id);
    if (idx !== -1) {
      this.data.orders[idx] = { ...this.data.orders[idx], ...updates };
      await this.save();
      return this.data.orders[idx];
    }
    return null;
  }
  async deleteOrder(id) {
    const idx = this.data.orders.findIndex(o => o.id === id);
    if (idx !== -1) {
      const removed = this.data.orders.splice(idx, 1);
      await this.save();
      return removed[0];
    }
    return null;
  }

  // Reviews
  getReviews() {
    if (!this.data.reviews) {
      this.data.reviews = [];
    }
    return this.data.reviews;
  }
  async addReview(review) {
    if (!this.data.reviews) {
      this.data.reviews = [];
    }
    this.data.reviews.unshift(review);
    await this.save();
    return review;
  }
  async deleteReview(id) {
    if (!this.data.reviews) return null;
    const idx = this.data.reviews.findIndex(r => r.id === id);
    if (idx !== -1) {
      const removed = this.data.reviews.splice(idx, 1);
      await this.save();
      return removed[0];
    }
    return null;
  }

  // Settings
  getSettings() { return this.data.settings || {}; }
  async updateSettings(updates) {
    this.data.settings = { ...this.data.settings, ...updates };
    await this.save();
    return this.data.settings;
  }

  // Chat & Custom Perfume Creation Messages
  getChatMessages() {
    if (!this.data.chatMessages) {
      this.data.chatMessages = [];
    }
    return this.data.chatMessages;
  }
  async addChatMessage(msg) {
    if (!this.data.chatMessages) {
      this.data.chatMessages = [];
    }
    this.data.chatMessages.unshift(msg);
    await this.save();
    return msg;
  }
  async deleteChatMessage(id) {
    if (!this.data.chatMessages) return null;
    const idx = this.data.chatMessages.findIndex(m => m.id === id);
    if (idx !== -1) {
      const removed = this.data.chatMessages.splice(idx, 1);
      await this.save();
      return removed[0];
    }
    return null;
  }
  markChatMessageRead(id) {
    if (!this.data.chatMessages) return null;
    const msg = this.data.chatMessages.find(m => m.id === id);
    if (msg) {
      msg.read = true;
      await this.save();
      return msg;
    }
    return null;
  }

  // Admin Notifications
  getNotifications() {
    if (!this.data.notifications) {
      this.data.notifications = [];
    }
    return this.data.notifications;
  }
  async addNotification(notif) {
    if (!this.data.notifications) {
      this.data.notifications = [];
    }
    this.data.notifications.unshift(notif);
    if (this.data.notifications.length > 100) {
      this.data.notifications = this.data.notifications.slice(0, 100);
    }
    await this.save();
    return notif;
  }
  async markAllNotificationsRead() {
    if (!this.data.notifications) return [];
    this.data.notifications.forEach(n => { n.read = true; });
    await this.save();
    return this.data.notifications;
  }
  async markNotificationRead(id) {
    if (!this.data.notifications) return null;
    const notif = this.data.notifications.find(n => n.id === id);
    if (notif) {
      notif.read = true;
      await this.save();
      return notif;
    }
    return null;
  }
  async clearAllNotifications() {
    this.data.notifications = [];
    await this.save();
    return [];
  }
  async deleteNotification(id) {
    if (!this.data.notifications) return null;
    const idx = this.data.notifications.findIndex(n => n.id === id);
    if (idx !== -1) {
      const removed = this.data.notifications.splice(idx, 1);
      await this.save();
      return removed[0];
    }
    return null;
  }

  // Password Reset Code Verification System
  getPasswordResetRequests() {
    if (!this.data.passwordResetRequests) {
      this.data.passwordResetRequests = [];
    }
    return this.data.passwordResetRequests;
  }

  async createPasswordResetRequest(email) {
    if (!this.data.passwordResetRequests) {
      this.data.passwordResetRequests = [];
    }
    const user = this.getUserByEmail(email);
    if (!user) return null;

    // Generate random secure 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Clear old pending requests for this email
    this.data.passwordResetRequests = this.data.passwordResetRequests.filter(
      r => r.email.toLowerCase() !== email.toLowerCase()
    );

    const request = {
      id: 'rst_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      userId: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      code: code,
      status: 'pending',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString()
    };

    this.data.passwordResetRequests.unshift(request);

    // Real-time Admin Notification with Code and Customer Details
    this.addNotification({
      id: 'notif_' + Date.now(),
      type: 'user',
      title: `🔑 Reset Code: ${code}`,
      message: `Customer ${user.name} (${user.email} | Phone: ${user.phone || 'N/A'}) requested password reset. Verification Code: ${code}`,
      dataId: request.id,
      code: code,
      customerEmail: user.email,
      customerPhone: user.phone || '',
      read: false,
      createdAt: new Date().toISOString()
    });

    await this.save();
    return { request, user, code };
  }

  getResetRequestByEmail(email) {
    if (!this.data.passwordResetRequests) return null;
    return this.data.passwordResetRequests.find(
      r => r.email.toLowerCase() === email.toLowerCase() && r.status === 'pending'
    );
  }

  consumeResetRequest(email, code) {
    if (!this.data.passwordResetRequests) return false;
    const reqIndex = this.data.passwordResetRequests.findIndex(
      r => r.email.toLowerCase() === email.toLowerCase() && String(r.code).trim() === String(code).trim() && r.status === 'pending'
    );
    if (reqIndex !== -1) {
      this.data.passwordResetRequests.splice(reqIndex, 1);
      await this.save();
      return true;
    }
    return false;
  }
}

module.exports = new Database();
