const Bespoke = require('../models/bespokeModel');

// @desc    Create new bespoke request
// @route   POST /api/bespoke
// @access  Private
const addBespokeRequest = async (req, res) => {
  const { concept, budget, deadline } = req.body;

  try {
    const bespoke = new Bespoke({
      client: req.user._id,
      clientName: req.user.name,
      concept,
      budget,
      deadline,
    });

    const createdBespoke = await bespoke.save();
    res.status(201).json(createdBespoke);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

// @desc    Get all bespoke requests
// @route   GET /api/bespoke
// @access  Private/Admin
const getBespokeRequests = async (req, res) => {
  const requests = await Bespoke.find({}).populate('client', 'id name email');
  res.json(requests);
};

// @desc    Get logged in user bespoke requests
// @route   GET /api/bespoke/myrequests
// @access  Private
const getMyBespokeRequests = async (req, res) => {
  const requests = await Bespoke.find({ client: req.user._id });
  res.json(requests);
};

// @desc    Update bespoke status
// @route   PUT /api/bespoke/:id/status
// @access  Private/Admin
const updateBespokeStatus = async (req, res) => {
  const bespoke = await Bespoke.findById(req.params.id);

  if (bespoke) {
    bespoke.status = req.body.status || bespoke.status;
    const updatedBespoke = await bespoke.save();
    res.json(updatedBespoke);
  } else {
    res.status(404).json({ message: 'Request not found' });
  }
};

module.exports = {
  addBespokeRequest,
  getBespokeRequests,
  getMyBespokeRequests,
  updateBespokeStatus,
};
