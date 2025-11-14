import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },

    passwordHash: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    role: {
      type: String,
      enum: ["admin", "empleado", "cliente"],
      default: "empleado"
    }
  },
  {
    timestamps: true
  }
);

// Método para validar contraseña
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

// Quitar datos sensibles al enviar JSON
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
    return ret;
  }
});

const User = mongoose.model("User", userSchema);
export default User;
