// 📦 Dependencies
const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// 🚀 Server setup
const app = express();
const port = process.env.PORT || 3000;

// 🧩 Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// 🗂️ Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// 🛠️ Multer config
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadsDir),
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// 🗄️ MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'thejas@2004', // consider moving to .env
  database: 'project'
});

db.connect(err => {
  if (err) {
    console.error('❌ DB Connection failed:', err.message);
    return;
  }
  console.log('✅ MySQL Connected...');
});

// 👤 Signup
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword],
    (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Email already exists.' });
        }
        return res.status(500).json({ message: 'Database error.' });
      }

      res.json({ message: 'User registered successfully!' });
    }
  );
});

// 🔐 Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB error.' });
    if (result.length === 0) return res.status(401).json({ message: 'User not found.' });

    const user = result[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

    res.json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email }
    });
  });
});

// 📄 Resume Upload (No file saved; only form fields)
app.post('/api/resume', (req, res) => {
  const { name, email, phone, education, skills, work_experience } = req.body;

  if (!name || !email || !phone || !education || !skills || !work_experience) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  db.query(
    `INSERT INTO resumes (name, email, phone, education, skills, work_experience)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, phone, education, skills, work_experience],
    (err) => {
      if (err) {
        console.error('❌ Resume DB Error:', err.message);
        return res.status(500).json({ message: 'Database insert error' });
      }
      res.json({ message: '✅ Resume saved successfully!' });
    }
  );
});

// 📢 Job Posting
app.post('/api/jobs', (req, res) => {
  const { title, company, location, type, skills, description } = req.body;
  if (!title || !company || !location || !type || !skills || !description) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  db.query(
    'INSERT INTO jobs (title, company, location, type, skills, description) VALUES (?, ?, ?, ?, ?, ?)',
    [title, company, location, type, skills, description],
    err => {
      if (err) {
        console.error('❌ Job DB Error:', err.message);
        return res.status(500).json({ message: 'Failed to post job.' });
      }
      res.json({ message: 'Job posted successfully!' });
    }
  );
});

// 📂 Get All Jobs
app.get('/api/jobs', (req, res) => {
  db.query('SELECT * FROM jobs', (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch jobs.' });
    res.json(result);
  });
});

// 🧑‍💼 Save Profile
app.post('/api/profile', (req, res) => {
  const { name, age, phone, address, preference } = req.body;
  if (!name || !age || !phone || !address || !preference) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  db.query(
    'INSERT INTO profiles (name, age, phone, address, preference) VALUES (?, ?, ?, ?, ?)',
    [name, age, phone, address, preference],
    err => {
      if (err) {
        console.error('❌ Profile DB Error:', err.message);
        return res.status(500).json({ message: 'Failed to save profile.' });
      }
      res.json({ message: '✅ Profile saved successfully!' });
    }
  );
});

// 🔎 Get Latest Profile
app.get('/api/profile', (req, res) => {
  db.query('SELECT * FROM profiles ORDER BY id DESC LIMIT 1', (err, result) => {
    if (err) return res.status(500).json({ message: 'Error fetching profile.' });
    res.json(result[0]);
  });
});

// 📜 Get All Resumes
app.get('/api/resumes', (req, res) => {
  db.query('SELECT * FROM resumes', (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

// 🏁 Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});