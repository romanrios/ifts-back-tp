import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export default function initialize(passport) {
  passport.use(new LocalStrategy(
    { usernameField: 'username' }, 
    async (username, password, done) => {
      try {

        const user = await User.findOne({
          $or: [
            { username: username },
            { email: username }
          ]
        });

        if (!user) {
          return done(null, false, { message: 'Usuario o email no encontrado' });
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }

        return done(null, user);

      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
}
