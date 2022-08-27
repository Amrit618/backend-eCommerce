import mongoose, { Document, Schema } from 'mongoose'

// import bcrypt from "bcrypt";
export interface ProductDocument extends Document{
  name: string,
  description: string,
  price: number,
  ratings: number,
  images: string[],
  category: string,
  numOfreviews: number,
  stock: number,
  comment: string
}


export const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'enter product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'enter product description'],
  },
  price: {
    type: Number,
    required: [true, 'enter product price'],
    maxlength: [8, 'Price must be of 8 characters'],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please enter product category'],
  },
  Stock: {
    type: Number,
    required: [true, 'cannot be more than 4 characters'],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  /*   user:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  }, */
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
const Product = mongoose.model('product', productSchema)
export default Product
