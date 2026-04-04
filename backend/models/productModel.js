const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  details: { type: String, required: true },
  material: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  img: { type: String, required: true },
  hero: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
