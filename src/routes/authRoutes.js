import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

// GET /auth/login
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

// POST /auth/login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

// GET /auth/register
router.get('/register', (req, res) => {
  res.render('register', { message: req.flash('error') });
});

// POST /auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      passwordHash
    });

    res.redirect('/auth/login');

  } catch (error) {
    if (error.code === 11000) {
      req.flash('error', 'El nombre de usuario o email ya existe.');
      return res.redirect('/auth/register');
    }

    req.flash('error', 'Error al registrar el usuario.');
    res.redirect('/auth/register');
  }
});

// GET /auth/logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/auth/login');
  });
});

export default router;
