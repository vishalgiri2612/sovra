const Product = require('../models/productModel');

// Helper function to generate SKU
const generateSKU = (category, productCount = 0) => {
  const prefix = category.substring(0, 3).toUpperCase();
  const date = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SOV-${prefix}-${date}-${random}`;
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { name, price, details, img, category, stock, material, plating, stone, length, weight, features, hero } = req.body;

    const sku = generateSKU(category);

    const product = new Product({
      sku,
      name,
      price,
      details,
      img,
      category,
      stock: stock || 0,
      material: material || 'Stainless Steel',
      plating: plating || 'Gold 18K PVD Plating',
      stone: stone || 'Natural',
      length: length || '46 cm',
      weight: weight || '6g',
      features: features || ['Sweatproof', 'Anti Tarnish', 'Water proof', 'Hypoallergenic'],
      hero: hero || false
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data', error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { name, price, details, img, category, stock, material, plating, stone, length, weight, features, hero } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price !== undefined ? price : product.price;
      product.details = details || product.details;
      product.img = img || product.img;
      product.category = category || product.category;
      product.stock = stock !== undefined ? stock : product.stock;
      product.material = material || product.material;
      product.plating = plating || product.plating;
      product.stone = stone || product.stone;
      product.length = length || product.length;
      product.weight = weight || product.weight;
      product.features = features || product.features;
      product.hero = hero !== undefined ? hero : product.hero;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid update data', error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
