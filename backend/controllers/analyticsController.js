const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Bespoke = require('../models/bespokeModel');
const Material = require('../models/materialModel');

// @desc    Get dashboard stats
// @route   GET /api/analytics/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ isAdmin: false });
    const activeBespoke = await Bespoke.countDocuments({ status: { $ne: 'Completed' } });
    const criticalMaterials = await Material.countDocuments({ status: 'Critical' });

    const orders = await Order.find({ isPaid: true });
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.json({
      totalRevenue: `₹${totalRevenue.toLocaleString()}`,
      totalOrders,
      activeBespoke,
      criticalMaterials,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get revenue chart data
// @route   GET /api/analytics/revenue
// @access  Private/Admin
const getRevenueData = async (req, res) => {
  try {
    // Basic implementation: grouping by month
    const revenueByMonth = await Order.aggregate([
      {
        $match: { isPaid: true }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalPrice" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json(revenueByMonth);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getStats,
  getRevenueData,
};
