const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const { sendEmail, getOTPTemplate } = require('../utils/sendEmail');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        status: user.status,
        preference: user.preference,
        spend: user.spend,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await User.create({
      name,
      email,
      password,
      otp,
      otpExpire,
    });

    if (user) {
      // Send real email
      try {
        await sendEmail({
          email: user.email,
          subject: 'Your SOVRA Access Code',
          html: getOTPTemplate(otp, user.name),
        });
        console.log(`OTP sent to ${email}: ${otp}`);
      } catch (emailError) {
        console.error('Email failed to send:', emailError.message);
        // We still return 201 so the user can try "resend" if they set up .env later
      }

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        message: 'A verification code has been sent to your email.',
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/users/verify-otp
// @access  Private
const verifyOTP = async (req, res) => {
  const { otp } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User already verified' });
    }

    if (user.otp === otp && user.otpExpire > Date.now()) {
      user.isVerified = true;
      user.otp = undefined;
      user.otpExpire = undefined;
      await user.save();

      res.json({ message: 'Email verified successfully', isVerified: true });
    } else {
      res.status(400).json({ message: 'Invalid or expired OTP' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Resend OTP
// @route   POST /api/users/resend-otp
// @access  Private
const resendOTP = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpire = otpExpire;
    await user.save();

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your New SOVRA Access Code',
        html: getOTPTemplate(otp, user.name),
      });
      console.log(`New OTP sent to ${user.email}: ${otp}`);
      res.json({ message: 'A new verification code has been sent to your email.' });
    } catch (emailError) {
      console.error('Email failed to send:', emailError.message);
      res.status(500).json({ message: 'Failed to send email. Check server configuration.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist').populate('cart.product');

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      status: user.status,
      preference: user.preference,
      spend: user.spend,
      wishlist: user.wishlist,
      cart: user.cart,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.preference = req.body.preference || user.preference;
    
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isVerified: updatedUser.isVerified,
      status: updatedUser.status,
      preference: updatedUser.preference,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// --- Wishlist Controllers ---

// @desc    Add to wishlist
// @route   POST /api/users/wishlist
// @access  Private
const addToWishlist = async (req, res) => {
  const { productId } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    res.status(201).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove from wishlist
// @route   DELETE /api/users/wishlist/:id
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.wishlist = user.wishlist.filter((id) => id.toString() !== req.params.id);
    await user.save();
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Cart Controllers ---

// @desc    Add to cart
// @route   POST /api/users/cart
// @access  Private
const addToCart = async (req, res) => {
  const { productId, qty } = req.body;

  try {
    const user = await User.findById(req.user._id);
    const existItem = user.cart.find((item) => item.product.toString() === productId);

    if (existItem) {
      existItem.qty += (qty || 1);
    } else {
      user.cart.push({ product: productId, qty: qty || 1 });
    }

    await user.save();
    res.status(201).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update cart quantity
// @route   PUT /api/users/cart/:id
// @access  Private
const updateCartQty = async (req, res) => {
  const { qty } = req.body;

  try {
    const user = await User.findById(req.user._id);
    const item = user.cart.find((item) => item.product.toString() === req.params.id);

    if (item) {
      item.qty = qty;
      await user.save();
      res.json(user.cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove from cart
// @route   DELETE /api/users/cart/:id
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter((item) => item.product.toString() !== req.params.id);
    await user.save();
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Admin Controllers ---

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user (Admin)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;
    user.status = req.body.status || user.status;
    user.preference = req.body.preference || user.preference;
    user.spend = req.body.spend || user.spend;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      status: updatedUser.status,
      preference: updatedUser.preference,
      spend: updatedUser.spend,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Forgot Password - Send OTP
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User with this email does not exist' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpire = otpExpire;
    await user.save();

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset - SOVRA',
        html: getOTPTemplate(otp, user.name),
      });
      res.json({ message: 'OTP sent successfully to your email' });
    } catch (error) {
      res.status(500).json({ message: 'Error sending email' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Reset Password
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp === otp && user.otpExpire > Date.now()) {
      user.password = password;
      user.otp = undefined;
      user.otpExpire = undefined;
      await user.save();

      res.json({ message: 'Password reset successful. You can now login.' });
    } else {
      res.status(400).json({ message: 'Invalid or expired OTP' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  authUser,
  registerUser,
  verifyOTP,
  resendOTP,
  getUserProfile,
  updateUserProfile,
  addToWishlist,
  removeFromWishlist,
  addToCart,
  updateCartQty,
  removeFromCart,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  forgotPassword,
  resetPassword,
};
