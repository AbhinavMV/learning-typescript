import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false,
      min: 5
    }
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
