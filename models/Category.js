import mongoose from 'mongoose'
import User from './User'

const categoryScheme = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
  },
  { timestamps: true }
)

const Category =
  mongoose.models.Category || mongoose.model('Category', categoryScheme)
export default Category
