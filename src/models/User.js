const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

//-------Add Bcrypt Hashing so the model hashes password automatically-------//

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

module.exports = mongoose.model("User", userSchema);
