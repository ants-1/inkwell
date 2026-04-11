import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User, { IUser } from "../features/users/userModel";
import bcrypt from "bcrypt";

// Config Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user: IUser | null = await User.findOne({ username });

        if (!user) {
          return done(null, false, {
            message: "Invalid username or password",
          });
        }

        const isValid = bcrypt.compare(password, user.password);

        if (!isValid) {
          return done(null, false, {
            message: "Invalid username or password",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
