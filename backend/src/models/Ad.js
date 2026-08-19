import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller is required"],
      index: true,
    },

    title: {
      type: String,
      required: [true, "Ad title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Ad description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Mobiles",
        "Electronics",
        "Vehicles",
        "Property",
        "Jobs",
        "Services",
        "Fashion",
        "Home & Garden",
        "Other",
      ],
    },

    condition: {
      type: String,
      required: [true, "Condition is required"],
      enum: ["new", "used"],
    },

    location: {
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },

      area: {
        type: String,
        trim: true,
        default: null,
      },
    },

    images: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["active", "sold", "removed"],
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const Ad = mongoose.model("Ad", adSchema);

export default Ad;
