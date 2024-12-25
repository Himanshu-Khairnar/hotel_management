import { Router } from "express";
import multer from "multer";
import Cloudinary from "../Cloudinary.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { upload } from "../multer.js";
const router = Router();
import { Hotel, Guest, User } from "../models/hotel.models.js";
// authMiddleware.js
const auth = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  };
};

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

    // Validate role
    if (!["MainAdmin", "GuestAdmin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be either MainAdmin or GuestAdmin",
      });
    }

    // Validate hotelId for GuestAdmin
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
router.post("/hotels",upload.single("logo"),async (req, res) => {
    let logoPath;
    if (
      req.files &&
      Array.isArray(req.files.coverImage) &&
      req.files.coverImage.length > 0
    )
      logoPath = req.files?.logo[0]?.path;

    const file = await Cloudinary(logoPath);
    console.log(file)
    const hotel = await Hotel.create({
      name: req.body.name,
      address: req.body.address,
      logo: { url: file?.url },
      qrCode: await generateQRCode(
        `${process.env.BASE_URL}/guest/${req.body.name}`
      ),
    });
    await hotel.save();
    res.status(201).json(hotel);
  }
);

router.get("/hotels", auth(["MainAdmin"]), async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
});

router.get(
  "/hotels/:id",
  auth(["MainAdmin", "GuestAdmin"]),
  async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    res.json(hotel);
  }
);

// guestRoutes.js
router.post("/guests", async (req, res) => {
  const guest = await Guest.create({
    hotelId: req.body.hotelId,
    fullName: req.body.fullName,
    mobileNumber: req.body.mobileNumber,
    address: req.body.address,
    purposeOfVisit: req.body.purposeOfVisit,
    stayDates: req.body.stayDates,
    emailId: req.body.emailId,
    idProofNumber: req.body.idProofNumber,
  });

  await VisitorLog.findOneAndUpdate(
    { hotelId: req.body.hotelId, ipAddress: req.ip },
    { formSubmitted: true, guestId: guest._id }
  );

  res.status(201).json({ message: "Registration successful" });
});

router.get("/guests", auth(["GuestAdmin"]), async (req, res) => {
  const guests = await Guest.find({ hotelId: req.user.hotelId });
  res.json(guests);
});

router.put("/guests/:id", auth(["GuestAdmin"]), async (req, res) => {
  const guest = await Guest.findOneAndUpdate(
    { _id: req.params.id, hotelId: req.user.hotelId },
    req.body,
    { new: true }
  );
  res.json(guest);
});

// userRoutes.js
router.post("/users", auth(["MainAdmin"]), async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    role: req.body.role,
    hotelId: req.body.hotelId,
    email: req.body.email,
  });
  await user.save();
  res.status(201).json({ message: "User created successfully" });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
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
  res.json(token).cookie("token", token, options);
});

// visitorLogRoutes.js
router.post("/visitor-logs", async (req, res) => {
  const log = new VisitorLog({
    hotelId: req.body.hotelId,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });
  await log.save();
  res.status(201).json({ message: "Visit logged" });
});

export default router;
