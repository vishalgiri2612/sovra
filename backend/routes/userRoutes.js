const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/', registerUser);
router.post('/login', authUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// User specific private routes
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/verify-otp').post(protect, verifyOTP);
router.route('/resend-otp').post(protect, resendOTP);

// Wishlist routes
router.route('/wishlist').post(protect, addToWishlist);
router.route('/wishlist/:id').delete(protect, removeFromWishlist);

// Cart routes
router.route('/cart').post(protect, addToCart);
router.route('/cart/:id').put(protect, updateCartQty).delete(protect, removeFromCart);

// Admin routes
router.route('/').get(protect, admin, getUsers);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);

module.exports = router;
