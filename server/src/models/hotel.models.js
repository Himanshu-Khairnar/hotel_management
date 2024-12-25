// Hotel Model
import { Schema,model } from "mongoose";
const hotelSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true }
    },
    logo: {
      url: { type: String, required: true }
    },
    qrCode: {
      type: String,
      required: true,
      unique: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  // Guest Model
  const guestSchema = new Schema({
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    mobileNumber: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /\d{10}/.test(v);
        }
      }
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true }
    },
    purposeOfVisit: {
      type: String,
      enum: ['Business', 'Personal', 'Tourist'],
      required: true
    },
    stayDates: {
      from: { type: Date, required: true },
      to: { type: Date, required: true }
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function(v) {
          return /^\S+@\S+\.\S+$/.test(v);
        }
      }
    },
    idProofNumber: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: String,
      enum: ['Active', 'Checked-out', 'Cancelled'],
      default: 'Active'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  // User Model (for Main Admin and Guest Admin)
  const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['MainAdmin', 'GuestAdmin'],
      required: true
    },
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      // Required only for GuestAdmin
      required: function() {
        return this.role === 'GuestAdmin';
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  // For tracking QR code scans and form submissions
  const visitorLogSchema = new Schema({
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true
    },
    ipAddress: {
      type: String,
      required: true
    },
    userAgent: {
      type: String,
      required: true
    },
    scanTime: {
      type: Date,
      default: Date.now
    },
    formSubmitted: {
      type: Boolean,
      default: false
    },
    guestId: {
      type: Schema.Types.ObjectId,
      ref: 'Guest'
    }
  });
  
  const Hotel = model("Hotel", hotelSchema);
  const Guest = model("Guest", guestSchema);
  const User = model("User", userSchema);
  const VisitorLog = model("VisitorLog", visitorLogSchema);
  
  export { Hotel, Guest, User, VisitorLog };