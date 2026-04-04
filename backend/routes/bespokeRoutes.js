const express = require('express');
const router = express.Router();
const {
  addBespokeRequest,
  getBespokeRequests,
  getMyBespokeRequests,
  updateBespokeStatus,
} = require('../controllers/bespokeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, addBespokeRequest).get(protect, admin, getBespokeRequests);
router.route('/myrequests').get(protect, getMyBespokeRequests);
router.route('/:id/status').put(protect, admin, updateBespokeStatus);

module.exports = router;
