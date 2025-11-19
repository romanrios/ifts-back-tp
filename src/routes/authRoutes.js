import express from 'express';
import passport from 'passport';
import authCtrl from '../controllers/authController.js';

const router = express.Router();

router.get('/login', authCtrl.getLogin);
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  })
);
router.get('/register', authCtrl.getRegister);
router.post('/register', authCtrl.register);
router.get('/logout', authCtrl.logout);
router.post('/update', authCtrl.update);
router.get('/delete', authCtrl.delete);

export default router;
