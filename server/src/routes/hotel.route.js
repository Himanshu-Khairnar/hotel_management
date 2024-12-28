import { Router } from "express";
import QRCode from "qrcode";
import multer from "multer";
import Cloudinary from "../Cloudinary.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { upload } from "../multer.js";
const router = Router();
import { Hotel, Guest, User, VisitorLog } from "../models/hotel.models.js";

// generating qr code

const generateQRCode = async (text) => {
  try {
    // Generate QR code as a data URL
    const qrCodeDataUrl = await QRCode.toDataURL(text);
    return qrCodeDataUrl;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
};


//register 
router.post("/register/admin", async (req, res) => {
  try {
    const { username, password, email, role, hotelId } = req.body;

    // Basic validation
    if (!username || !password || !email || !role) {
      return res.status(400).json({
        success: false,
        message:
          "Required fields missing: username, password, email, and role are mandatory",
      });
    }

    if (!["MainAdmin", "GuestAdmin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be either MainAdmin or GuestAdmin",
      });
    }

    if (role === "GuestAdmin" && !hotelId) {
      return res.status(400).json({
        success: false,
        message: "hotelId is required for GuestAdmin registration",
      });
    }

    // Check if hotel exists for GuestAdmin
    if (role === "GuestAdmin") {
      const hotelExists = await Hotel.findById(hotelId);
      if (!hotelExists) {
        return res.status(404).json({
          success: false,
          message: "Hotel not found",
        });
      }
    }

    // Check existing username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Check existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object based on schema
    const userData = {
      username,
      password: hashedPassword,
      email,
      role,
      isActive: true,
      createdAt: new Date(),
      lastLogin: new Date(),
    };

    // Add hotelId only for GuestAdmin
    if (role === "GuestAdmin") {
      userData.hotelId = hotelId;
    }

    // Create user
    const newUser = await User.create(userData);

    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: `${role} registered successfully`,
      data: userResponse,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// hotelRoutes.js
router.post("/hotels", upload.single("logo"), async (req, res) => {

  try {
    const { name, street, state, city, zipCode } = req.body;

    //logo url
    let logoPath;
    if (req.file.path) logoPath = req.file.path;
    const urlfile = await Cloudinary(logoPath);
    //qr code
    const qrcode = await generateQRCode(
      `${process.env.BASE_URL}/guest/${req.body.name}`
    );

    const hotel = await Hotel.create({
      name: name,
      address: { city, street, state, zipCode },
      logo: { url: urlfile.url, path: req.file?.path },
      qrCode: qrcode,
    });

    res.status(200).json({ hotel, done: "yes" });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
});

router.get("/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    console.log(error)
  }
});

router.patch('/hotels/:id', async (req, res) => {
  try {

    const { updatename, newStreet, newCity, newState, newCode } = req.body;
    console.log(updatename, newState, newCity, newStreet, newCode)
    const response = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        name: updatename,
        address: {
          street: newStreet,
          city: newCity,
          state: newState,
          zipCode: newCode,
        },
      },
      { new: true });

    // If the hotel is not found
    if (!response) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Return the updated hotel data
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to update hotel" });
  }
});



router.get("/hotels/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    const hotel = await Hotel.findById(req.params.id);
    console.log(hotel)
    res.status(200).json({ hotel });
  } catch (error) {
    console.log(error)
  }
});

router.delete("/hotels/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    return res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});


// guestRoutes.js
router.post("/guests", async (req, res) => {
  try {
    const {
      hotelId,
      fullName,
      mobileNumber,
      city,
      street,
      zipCode,
      state,
      purposeOfVisit,
      from,
      to,
      emailId,
      idProofNumber
    } = req.body;

    // Check for missing fields
    if (!hotelId || !fullName || !mobileNumber || !city || !street || !zipCode || !state || !purposeOfVisit || !from || !to || !emailId || !idProofNumber) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const guest = await Guest.create({
      hotelId,
      fullName,
      mobileNumber,
      address: { city, street, zipCode, state },
      purposeOfVisit,
      stayDates: { from, to },
      emailId,
      idProofNumber,
    });



    res.status(201).json({ message: "Registration successful", guest });
  } catch (error) {
    console.log(error)
  }
});

router.get("/guests/:id", async (req, res) => {
  try {
    const guests = await Guest.findById({ _id: req.params.id });
    res.json(guests);
  } catch (error) {
    console.log(error)
  }
});

router.get("/guest/:hotel", async (req, res) => {
  try {
    const guests = await Guest.find({ hotelId: req.params.hotel })
    res.json(guests)
  } catch (error) {
    console.log(error)
  }
})

router.get("/guests", async (req, res) => {
  try {
    const guest = await Guest.find()
    res.json(guest)
  } catch (error) {
    console.log(error)
  }
})

router.patch("/guests/:id", async (req, res) => {
  try {
    const { status, } = req.body;

    if (status) {
      updateData.status = status;
    }

    // Find the guest by ID and update it with new values from the body
    const guest = await Guest.findByIdAndUpdate(
      req.params.id,
      updateData, // Use the updated data from the request body
      { new: true } // Return the modified document
    );

    if (!guest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    res.json(guest);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name, role: req.body.role });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, hotelId: user.hotelId },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      samesite: "None",
    };
    await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });
    res
      .cookie("token", token, options)
      .status(200)
      .json({ token, message: "Login successful", user });
  } catch (error) {
    console.log(error)
  }
});



export default router;
