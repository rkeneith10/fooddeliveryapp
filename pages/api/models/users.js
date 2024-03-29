import mongoose from "mongoose";

const schemaUsers = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  adress: {
    type: String,
  },

  telephone: {
    type: String,
  },
  password: {
    type: String,
  },
});

const users = mongoose.models.users || mongoose.model("users", schemaUsers);
export default users;
