import { Router } from "express";
import multer from "multer";


const upload = multer({ dest: 'uploads/' })
const router =Router()
// authMiddleware.js
const auth = (roles = []) => {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      next();
    };
  };
  
  // hotelRoutes.js
  router.post('/hotels', auth(['MainAdmin']), upload.single('logo'), async (req, res) => {
    const hotel = new Hotel({
      name: req.body.name,
      address: req.body.address,
      logo: { url: req.file.path, filename: req.file.filename },
      qrCode: await generateQRCode(`${process.env.BASE_URL}/guest/${req.body.name}`)
    });
    await hotel.save();
    res.status(201).json(hotel);
  });
  
  router.get('/hotels', auth(['MainAdmin']), async (req, res) => {
    const hotels = await Hotel.find();
    res.json(hotels);
  });
  
  router.get('/hotels/:id', auth(['MainAdmin', 'GuestAdmin']), async (req, res) => {
    const hotel = await Hotel.findById(req.params.id);
    res.json(hotel);
  });
  
  // guestRoutes.js
  router.post('/guests', async (req, res) => {
    const guest = new Guest({
      hotelId: req.body.hotelId,
      fullName: req.body.fullName,
      mobileNumber: req.body.mobileNumber,
      address: req.body.address,
      purposeOfVisit: req.body.purposeOfVisit,
      stayDates: req.body.stayDates,
      emailId: req.body.emailId,
      idProofNumber: req.body.idProofNumber
    });
    await guest.save();
    
    await VisitorLog.findOneAndUpdate(
      { hotelId: req.body.hotelId, ipAddress: req.ip },
      { formSubmitted: true, guestId: guest._id }
    );
    
    res.status(201).json({ message: 'Registration successful' });
  });
  
  router.get('/guests', auth(['GuestAdmin']), async (req, res) => {
    const guests = await Guest.find({ hotelId: req.user.hotelId });
    res.json(guests);
  });
  
  router.put('/guests/:id', auth(['GuestAdmin']), async (req, res) => {
    const guest = await Guest.findOneAndUpdate(
      { _id: req.params.id, hotelId: req.user.hotelId },
      req.body,
      { new: true }
    );
    res.json(guest);
  });
  
  // userRoutes.js
  router.post('/users', auth(['MainAdmin']), async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
      hotelId: req.body.hotelId,
      email: req.body.email
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  });
  
  router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user._id, role: user.role, hotelId: user.hotelId },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });
    res.json({ token });
  });
  
  // visitorLogRoutes.js
  router.post('/visitor-logs', async (req, res) => {
    const log = new VisitorLog({
      hotelId: req.body.hotelId,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });
    await log.save();
    res.status(201).json({ message: 'Visit logged' });
  });


  export default router