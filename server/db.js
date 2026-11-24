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
  const customerPasswordHash = bcrypt.hashSync('customer123', salt);

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
      address: 'Ulapane, Sri Lanka',
      deliveryFee: 500,
      freeDeliveryThreshold: 999999999,
      bankDetails: {
        bankName: 'Commercial Bank of Ceylon',
        accountName: 'SCENTORY LANKA (PVT) LTD',
        accountNumber: '8012398456',
        branch: 'Kollupitiya Branch (Code: 045)',
        swiftCode: 'CCEYLKX',
        instructions: 'Please use your Order ID as the payment reference or remarks. Once transferred, upload the deposit slip or screenshot of your banking app receipt below.'
      },
      announcement: '✨ Free Island-wide Delivery on orders above Rs. 12,000 | Authentic Luxury Decants & Flacons'
    },
    users: [
      {
        id: 'usr_admin_01',
        name: 'Scentory Admin',
        email: 'admin@scentory.lk',
        password: adminPasswordHash,
        role: 'admin',
        phone: '+94 77 889 9000',
        address: 'Colombo 03',
        createdAt: new Date().toISOString()
      },
      {
        id: 'usr_cust_01',
        name: 'Kamal Perera',
        email: 'customer@scentory.lk',
        password: customerPasswordHash,
        role: 'customer',
        phone: '+94 71 234 5678',
        address: 'No. 12, Flower Road, Colombo 07',
        city: 'Colombo',
        createdAt: new Date().toISOString()
      }
    ],
    products: [
      {
        id: 'prod_amber_oud',
        name: 'Oud Royale Impérial',
        tagline: 'Extrait De Parfum • Rare Cambodian Oud & Warm Amber',
        description: 'An intoxicating symphony of royal Cambodian oud wood, gilded amber resin, smoked Damask rose, and velvety vanilla bean. Crafted for distinguished evenings and everlasting presence.',
        gender: 'unisex',
        scentFamily: 'Oriental Woody',
        isFeatured: true,
        badge: 'Signature Masterpiece',
        salesCount: 42,
        notes: {
          top: ['Rare Saffron', 'Bergamot Zest', 'Damascene Rose'],
          heart: ['Aged Cambodian Oud', 'Amber Resin', 'Nutmeg Spice'],
          base: ['Madagascar Vanilla', 'Rich Sandalwood', 'Smoked Leather']
        },
        images: [
          'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80'
        ],
        variants: [
          { id: 'v_5ml', size: '5ml Pocket Atomizer', price: 2200, discountPrice: 1950, stock: 45, sku: 'ORI-5ML' },
          { id: 'v_10ml', size: '10ml Travel Spray', price: 4200, discountPrice: 3800, stock: 38, sku: 'ORI-10ML' },
          { id: 'v_20ml', size: '20ml Luxury Decant', price: 7900, discountPrice: 7200, stock: 24, sku: 'ORI-20ML' },
          { id: 'v_50ml', size: '50ml Signature Flacon', price: 16500, discountPrice: 14900, stock: 15, sku: 'ORI-50ML' },
          { id: 'v_100ml', size: '100ml Grand Prestige', price: 29500, discountPrice: 26900, stock: 8, sku: 'ORI-100ML' }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'prod_velvet_iris',
        name: 'Velvet Noir Santal',
        tagline: 'Eau De Parfum • Australian Sandalwood, Cardamom & Iris',
        description: 'Smooth, magnetic, and effortlessly seductive. Creamy Australian sandalwood fused with freshly crushed green cardamom, powdery Tuscan iris, and subtle cashmere cedar.',
        gender: 'unisex',
        scentFamily: 'Woody Powdery',
        isFeatured: true,
        badge: 'Best Seller',
        salesCount: 68,
        notes: {
          top: ['Guatemalan Cardamom', 'Violet Leaf', 'Papyrus'],
          heart: ['Tuscan Iris Concrete', 'Cedarwood Virginia', 'Cypress'],
          base: ['Australian Sandalwood', 'White Amber', 'Clean Musks']
        },
        images: [
          'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'
        ],
        variants: [
          { id: 'v_5ml', size: '5ml Pocket Atomizer', price: 1900, discountPrice: 1750, stock: 50, sku: 'VNS-5ML' },
          { id: 'v_10ml', size: '10ml Travel Spray', price: 3600, discountPrice: 3200, stock: 40, sku: 'VNS-10ML' },
          { id: 'v_20ml', size: '20ml Luxury Decant', price: 6800, discountPrice: 6200, stock: 30, sku: 'VNS-20ML' },
          { id: 'v_50ml', size: '50ml Signature Flacon', price: 14500, discountPrice: 13200, stock: 18, sku: 'VNS-50ML' },
          { id: 'v_100ml', size: '100ml Grand Prestige', price: 25500, discountPrice: null, stock: 10, sku: 'VNS-100ML' }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'prod_silk_jasmine',
        name: 'Silk Petals & Gold',
        tagline: 'Extrait De Parfum • Night-Blooming Jasmine & White Amber',
        description: 'An ethereal radiant floral masterpiece. Dewy Sambac jasmine flowers picked at midnight, blended with luscious Italian peach nectar, sunlit neroli, and creamy white amber.',
        gender: 'women',
        scentFamily: 'Floral Amber',
        isFeatured: true,
        badge: 'Limited Edition',
        salesCount: 35,
        notes: {
          top: ['Italian White Peach', 'Neroli Essence', 'Mandarin'],
          heart: ['Midnight Sambac Jasmine', 'Tuberose Absolu', 'Magnolia'],
          base: ['Golden Ambergris', 'Bourbon Vanilla', 'Cashmeran']
        },
        images: [
          'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'
        ],
        variants: [
          { id: 'v_5ml', size: '5ml Pocket Atomizer', price: 1850, discountPrice: 1650, stock: 40, sku: 'SPG-5ML' },
          { id: 'v_10ml', size: '10ml Travel Spray', price: 3500, discountPrice: 3100, stock: 35, sku: 'SPG-10ML' },
          { id: 'v_20ml', size: '20ml Luxury Decant', price: 6500, discountPrice: 5900, stock: 20, sku: 'SPG-20ML' },
          { id: 'v_50ml', size: '50ml Signature Flacon', price: 13900, discountPrice: 12500, stock: 12, sku: 'SPG-50ML' },
          { id: 'v_100ml', size: '100ml Grand Prestige', price: 24000, discountPrice: 21900, stock: 7, sku: 'SPG-100ML' }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'prod_ocean_leather',
        name: 'Cyan Leather & Spice',
        tagline: 'Eau De Parfum • Marine Breeze, Italian Citrus & Soft Suede',
        description: 'Crisp aquatic mineral freshness encountering warm Mediterranean sunlit citrus and sophisticated soft Tuscan suede leather. Clean, charismatic, and intensely masculine.',
        gender: 'men',
        scentFamily: 'Fresh Aromatic',
        isFeatured: false,
        badge: 'Trending Now',
        salesCount: 51,
        notes: {
          top: ['Calabrian Bergamot', 'Sea Salt Spray', 'Pink Pepper'],
          heart: ['Aquatic Lavender', 'Clary Sage', 'Geranium Leaf'],
          base: ['Italian Suede', 'Haitian Vetiver', 'Modern Ambroxan']
        },
        images: [
          'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80'
        ],
        variants: [
          { id: 'v_5ml', size: '5ml Pocket Atomizer', price: 1750, discountPrice: 1550, stock: 60, sku: 'CLS-5ML' },
          { id: 'v_10ml', size: '10ml Travel Spray', price: 3300, discountPrice: 2950, stock: 45, sku: 'CLS-10ML' },
          { id: 'v_20ml', size: '20ml Luxury Decant', price: 6200, discountPrice: 5600, stock: 25, sku: 'CLS-20ML' },
          { id: 'v_50ml', size: '50ml Signature Flacon', price: 13200, discountPrice: null, stock: 16, sku: 'CLS-50ML' },
          { id: 'v_100ml', size: '100ml Grand Prestige', price: 23500, discountPrice: 21000, stock: 9, sku: 'CLS-100ML' }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'prod_tobacco_vanille',
        name: 'Tobacco Havane Privé',
        tagline: 'Extrait De Parfum • Cuban Tobacco Leaf, Tonka & Spiced Honey',
        description: 'Rich cured Cuban tobacco leaves steeped in wild blossom honey, golden amber, roasted tonka bean, and spiced gingerbread. An opulent, warming autumn/winter powerhouse.',
        gender: 'unisex',
        scentFamily: 'Gourmand Tobacco',
        isFeatured: true,
        badge: 'Winter Special',
        salesCount: 59,
        notes: {
          top: ['Tobacco Leaf', 'Spicy Notes', 'Ginger Root'],
          heart: ['Tonka Bean', 'Tobacco Blossom', 'Cacao & Honey'],
          base: ['Dried Fruits Accord', 'Sweet Woody Notes', 'Benzoin']
        },
        images: [
          'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80'
        ],
        variants: [
          { id: 'v_5ml', size: '5ml Pocket Atomizer', price: 2100, discountPrice: 1850, stock: 35, sku: 'THP-5ML' },
          { id: 'v_10ml', size: '10ml Travel Spray', price: 3950, discountPrice: 3500, stock: 28, sku: 'THP-10ML' },
          { id: 'v_20ml', size: '20ml Luxury Decant', price: 7400, discountPrice: 6700, stock: 22, sku: 'THP-20ML' },
          { id: 'v_50ml', size: '50ml Signature Flacon', price: 15500, discountPrice: 13900, stock: 10, sku: 'THP-50ML' },
          { id: 'v_100ml', size: '100ml Grand Prestige', price: 27800, discountPrice: 24900, stock: 5, sku: 'THP-100ML' }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    orders: [
      {
        id: 'SCNT-8942',
        userId: 'usr_cust_01',
        customerDetails: {
          name: 'Kamal Perera',
          email: 'customer@scentory.lk',
          phone: '+94 71 234 5678',
          address: 'No. 12, Flower Road, Colombo 07',
          city: 'Colombo',
          postalCode: '00700',
          notes: 'Please ring the doorbell upon arrival.'
        },
        items: [
          {
            productId: 'prod_amber_oud',
            productName: 'Oud Royale Impérial',
            image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
            variantId: 'v_10ml',
            variantSize: '10ml Travel Spray',
            price: 3800,
            quantity: 2,
            subtotal: 7600
          },
          {
            productId: 'prod_velvet_iris',
            productName: 'Velvet Noir Santal',
            image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
            variantId: 'v_5ml',
            variantSize: '5ml Pocket Atomizer',
            price: 1750,
            quantity: 1,
            subtotal: 1750
          }
        ],
        subtotal: 9350,
        deliveryFee: 450,
        finalTotal: 9800,
        paymentMethod: 'bank_transfer',
        bankSlipUrl: '/uploads/receipts/sample-slip-demo.jpg',
        paymentStatus: 'verified',
        orderStatus: 'processing',
        bankDetailsSnap: {
          bankName: 'Commercial Bank of Ceylon',
          accountName: 'SCENTORY LANKA (PVT) LTD',
          accountNumber: '8012398456',
          branch: 'Kollupitiya Branch (Code: 045)'
        },
        adminNotes: 'Payment verified via online bank statement on 20th Nov.',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
      }
    ],
    reviews: [
      {
        id: 'rev_1',
        customerName: 'Mohamed Rizwan',
        rating: 5,
        location: 'Colombo 03',
        productName: 'Oud Royale Impérial (10ml)',
        comment: 'Unbelievable projection and sillage! The Cambodian oud opens rich and dries down into warm honeyed amber. Lasts over 14 hours on fabric. Fast bank transfer verification and 2-day delivery.',
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
        verifiedBuyer: true,
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
      },
      {
        id: 'rev_2',
        customerName: 'Dinuka Senanayake',
        rating: 5,
        location: 'Kandy',
        productName: 'Velvet Noir Santal (20ml)',
        comment: 'Creamy Australian sandalwood with that cardamom punch. Smells 100% niche like a Rs. 80,000 bottle. The 20ml decant bottle is heavy glass and atomizes very fine mist.',
        image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
        verifiedBuyer: true,
        createdAt: new Date(Date.now() - 3600000 * 72).toISOString()
      },
      {
        id: 'rev_3',
        customerName: 'Ayesha Farook',
        rating: 5,
        location: 'Dehiwala',
        productName: 'Silk Petals & Gold (10ml)',
        comment: 'The night-blooming jasmine and peach accord is magical! Perfect for evening weddings. Got so many compliments. Uploading the Commercial Bank slip was so simple.',
        image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80',
        verifiedBuyer: true,
        createdAt: new Date(Date.now() - 3600000 * 96).toISOString()
      },
      {
        id: 'rev_4',
        customerName: 'Dr. Rohan Jayasinghe',
        rating: 5,
        location: 'Kurunegala',
        productName: 'Tobacco Havane Privé (50ml)',
        comment: 'Magnificent presentation! Warm spicy honey and cured Cuban tobacco. The flacon arrived meticulously bubble wrapped with tamper-evident seal. Scentory is top tier.',
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
        verifiedBuyer: true,
        createdAt: new Date(Date.now() - 3600000 * 120).toISOString()
      },
      {
        id: 'rev_5',
        customerName: 'Shehan Perera',
        rating: 5,
        location: 'Galle',
        productName: 'Cyan Leather & Spice (10ml)',
        comment: 'Super fresh marine salty opening with Italian suede leather base. Extremely versatile for Sri Lankan tropical weather. Will order the 50ml flacon next!',
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
        verifiedBuyer: true,
        createdAt: new Date(Date.now() - 3600000 * 140).toISOString()
      },
      {
        id: 'rev_6',
        customerName: 'Tharindu Wickramasinghe',
        rating: 5,
        location: 'Negombo',
        productName: 'Oud Royale Impérial (5ml)',
        comment: 'Purchased the 5ml pocket atomizer to test first. Incredible value for authentic Extrait. The WhatsApp confirmation was quick and polite.',
        image: null,
        verifiedBuyer: true,
        createdAt: new Date(Date.now() - 3600000 * 180).toISOString()
      }
    ]
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

  save() {
    // 1. Try writing to local disk
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      // In serverless / read-only environment, ignore
    }

    // 2. Persist to MongoDB Atlas if connected
    if (this.mongoCollection) {
      this.mongoCollection.updateOne(
        { _id: 'main_store_data' },
        { $set: { data: this.data, updatedAt: new Date() } },
        { upsert: true }
      ).catch(err => console.error('MongoDB Atlas sync error:', err.message));
    }
  }

  // Users
  getUsers() { return this.data.users || []; }
  getUserById(id) { return this.getUsers().find(u => u.id === id); }
  getUserByEmail(email) { return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()); }
  addUser(user) {
    this.data.users.push(user);
    this.save();
    return user;
  }
  updateUser(id, updates) {
    const idx = this.data.users.findIndex(u => u.id === id);
    if (idx !== -1) {
      this.data.users[idx] = { ...this.data.users[idx], ...updates };
      this.save();
      return this.data.users[idx];
    }
    return null;
  }
  deleteUser(id) {
    const idx = this.data.users.findIndex(u => u.id === id);
    if (idx !== -1) {
      const removed = this.data.users.splice(idx, 1)[0];
      this.save();
      return removed;
    }
    return null;
  }

  // Products
  getProducts() { return this.data.products || []; }
  getProductById(id) { return this.getProducts().find(p => p.id === id); }
  addProduct(product) {
    this.data.products.unshift(product);
    this.save();
    return product;
  }
  updateProduct(id, updates) {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.data.products[idx] = { ...this.data.products[idx], ...updates, updatedAt: new Date().toISOString() };
      this.save();
      return this.data.products[idx];
    }
    return null;
  }
  deleteProduct(id) {
    const idx = this.data.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      const removed = this.data.products.splice(idx, 1);
      this.save();
      return removed[0];
    }
    return null;
  }

  // Orders
  getOrders() { return this.data.orders || []; }
  getOrderById(id) { return this.getOrders().find(o => o.id === id); }
  getUserOrders(userId) { return this.getOrders().filter(o => o.userId === userId); }
  addOrder(order) {
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

    this.save();
    return order;
  }
  updateOrder(id, updates) {
    const idx = this.data.orders.findIndex(o => o.id === id);
    if (idx !== -1) {
      this.data.orders[idx] = { ...this.data.orders[idx], ...updates };
      this.save();
      return this.data.orders[idx];
    }
    return null;
  }
  deleteOrder(id) {
    const idx = this.data.orders.findIndex(o => o.id === id);
    if (idx !== -1) {
      const removed = this.data.orders.splice(idx, 1);
      this.save();
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
  addReview(review) {
    if (!this.data.reviews) {
      this.data.reviews = [];
    }
    this.data.reviews.unshift(review);
    this.save();
    return review;
  }
  deleteReview(id) {
    if (!this.data.reviews) return null;
    const idx = this.data.reviews.findIndex(r => r.id === id);
    if (idx !== -1) {
      const removed = this.data.reviews.splice(idx, 1);
      this.save();
      return removed[0];
    }
    return null;
  }

  // Settings
  getSettings() { return this.data.settings || {}; }
  updateSettings(updates) {
    this.data.settings = { ...this.data.settings, ...updates };
    this.save();
    return this.data.settings;
  }

  // Chat & Custom Perfume Creation Messages
  getChatMessages() {
    if (!this.data.chatMessages) {
      this.data.chatMessages = [];
    }
    return this.data.chatMessages;
  }
  addChatMessage(msg) {
    if (!this.data.chatMessages) {
      this.data.chatMessages = [];
    }
    this.data.chatMessages.unshift(msg);
    this.save();
    return msg;
  }
  deleteChatMessage(id) {
    if (!this.data.chatMessages) return null;
    const idx = this.data.chatMessages.findIndex(m => m.id === id);
    if (idx !== -1) {
      const removed = this.data.chatMessages.splice(idx, 1);
      this.save();
      return removed[0];
    }
    return null;
  }
  markChatMessageRead(id) {
    if (!this.data.chatMessages) return null;
    const msg = this.data.chatMessages.find(m => m.id === id);
    if (msg) {
      msg.read = true;
      this.save();
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
  addNotification(notif) {
    if (!this.data.notifications) {
      this.data.notifications = [];
    }
    this.data.notifications.unshift(notif);
    if (this.data.notifications.length > 100) {
      this.data.notifications = this.data.notifications.slice(0, 100);
    }
    this.save();
    return notif;
  }
  markAllNotificationsRead() {
    if (!this.data.notifications) return [];
    this.data.notifications.forEach(n => { n.read = true; });
    this.save();
    return this.data.notifications;
  }
  markNotificationRead(id) {
    if (!this.data.notifications) return null;
    const notif = this.data.notifications.find(n => n.id === id);
    if (notif) {
      notif.read = true;
      this.save();
      return notif;
    }
    return null;
  }
  clearAllNotifications() {
    this.data.notifications = [];
    this.save();
    return [];
  }
  deleteNotification(id) {
    if (!this.data.notifications) return null;
    const idx = this.data.notifications.findIndex(n => n.id === id);
    if (idx !== -1) {
      const removed = this.data.notifications.splice(idx, 1);
      this.save();
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

  createPasswordResetRequest(email) {
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

    this.save();
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
      this.save();
      return true;
    }
    return false;
  }
}

module.exports = new Database();
