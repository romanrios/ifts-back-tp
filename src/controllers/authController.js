import bcrypt from 'bcrypt';
import User from '../models/User.js';

async function getLogin(req, res) {
  res.render('inicio/login');
}

async function getRegister(req, res) {
  res.render('inicio/register');
}

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ username, email, passwordHash });

    req.flash('success', 'Cuenta creada con éxito. Ahora podés iniciar sesión.');
    return res.redirect('/auth/login');

  } catch (error) {

    if (error.code === 11000) {
      req.flash('error', 'El nombre de usuario o email ya existe.');
      return res.redirect('/auth/register');
    }

    req.flash('error', 'Error al registrar el usuario.');
    return res.redirect('/auth/register');
  }
}

async function logout(req, res, next) {
  req.logout(err => {
    if (err) return next(err);
    req.flash('info', 'Sesión cerrada correctamente.');
    res.redirect('/auth/login');
  });
}

async function update(req, res) {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
      _id: { $ne: req.user._id }
    });

    if (existingUser) {
      req.flash('error', 'El nombre de usuario o email ya está en uso.');
      return res.redirect('/');
    }

    const updates = { username, email };

    if (password?.trim()) {
      updates.passwordHash = await bcrypt.hash(password, 10);
    }

    await User.findByIdAndUpdate(req.user._id, updates);

    req.flash('success', 'Datos actualizados correctamente.');
    res.redirect('/');

  } catch (err) {
    req.flash('error', 'Error al actualizar el usuario.');
    res.redirect('/');
  }
}

async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.user._id);

    req.flash('info', 'Tu cuenta fue eliminada correctamente.');

    req.logout(() => {});
    res.redirect('/auth/login');

  } catch (err) {
    req.flash('error', 'Error al eliminar la cuenta.');
    res.redirect('/');
  }
}

export default {
  getLogin,
  getRegister,
  register,
  logout,
  update,
  delete: deleteUser
};
