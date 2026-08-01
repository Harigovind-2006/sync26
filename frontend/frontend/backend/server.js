/**
 * Lakxam Rekha - Backend Security Server
 * Express.js, MongoDB, JWT Auth, Multer upload
 */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'lr_cryptographic_secret_key_8109';

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lakxam_rekha';
mongoose.connect(MONGO_URI)
  .then(() => console.log('[db] MongoDB connected successfully.'))
  .catch((err) => console.error('[db] MongoDB connection error:', err));

// Schemas & Models
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ImageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  watermarkId: { type: String, required: true, unique: true },
  resolution: { type: String, required: true },
  pixelsCount: { type: String, required: true },
  secureUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Image = mongoose.model('Image', ImageSchema);

// Multer Disk storage for mock upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) return cb(null, true);
    cb(new Error('Only images (jpg, png, webp) are supported.'));
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access token missing' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalid or expired' });
    req.user = user;
    next();
  });
};

// --- ROUTES ---

// 1. User Registration
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered.' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// 2. User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password.' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    
    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// 3. Protected Image Upload & Watermark Embedding
app.post('/api/images/secure', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image file uploaded.' });

    // Mock embedding steganography pixels logic here
    const watermarkId = `LR-SIG-${Math.floor(1000 + Math.random() * 9000)}B`;

    const newImage = new Image({
      userId: req.user.id,
      fileName: req.file.originalname,
      watermarkId,
      resolution: '4000 x 4000', // Mock resolution
      pixelsCount: '16,000,000',
      secureUrl: `/uploads/${req.file.filename}`
    });
    await newImage.save();

    res.status(201).json({
      message: 'Image secured successfully.',
      image: newImage
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error securing image.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`[server] Lakxam Rekha API listening on port ${PORT}`);
});
