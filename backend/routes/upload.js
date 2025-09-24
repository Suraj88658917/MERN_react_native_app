const express = require('express');
const router = express.Router();
const multer = require('multer');  // ✅ multer import
const csv = require('csv-parser'); // optional, agar CSV parse karni hai
const fs = require('fs');
const auth = require('../middleware/auth');
const DistributedItem = require('../models/DistributedItem');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// POST upload CSV
router.post('/', auth, upload.single('file'), async (req, res) => {
  // CSV parsing and distribute logic
});

module.exports = router;
