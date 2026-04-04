const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // Clear all existing data
        await User.deleteMany();
        await Product.deleteMany();

        // Create Admin User
        const adminUser = await User.create({
            name: 'Maison Admin',
            email: 'admin@sovra.com',
            password: 'adminpassword123',
            isAdmin: true,
            isVerified: true,
            status: 'Elite',
            preference: 'High Jewelry'
        });

        // High-Fidelity Products
        const products = [
            {
                name: "Nova Heart Necklace",
                category: "Necklaces",
                price: 1250,
                details: "A delicate and timeless heart silhouette, meticulously crafted in 18k solid gold. A core piece for the modern romantic.",
                material: "18k Solid Gold",
                stock: 12,
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5d9EZziKe0Ttlq7_xGCRT8gY2JzCwNSJ69gl87BIqnO6BRp6huNYJZF2z6dvdOvAmefjJDUSIN6tCanfQxWXDD7eODKJu1yRHl17RW21a1RUJti3DSAJYItrFFqDPDEtd19xyakQxKwQk5cwbhAUcjfx_W2_ImhWF8D_fUP-P7HXruHEOKNxMHdHsn798tF11rBswDco-4oJ5BjOVL0vkmRT8Gi5vWD811Vu5MGhgkA3RiAhALV3_HLHXs2B6pdQmH58YV_zzBxmq",
                hero: true
            },
            {
                name: "Midnight Eclipse Ring",
                category: "Rings",
                price: 2400,
                details: "Features a centered deep black onyx stone, representing the void of an eclipse. Hand-hammered texture for an architectural feel.",
                material: "Onyx & 22k Gold Plated Silver",
                stock: 7,
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH0Y4w2GvI55CqP2069E7ZJ3vN492iHhN3NfR8O7339_589-9403-9204-9403-9204-9403-9204",
                hero: false
            },
            {
                name: "Etheria Pearl Drops",
                category: "Earrings",
                price: 850,
                details: "Suspended Grade-AA freshwater pearls that capture the essence of Mediterranean light. Elegant, light, and ethereal.",
                material: "Freshwater Pearl & French Gold Hooks",
                stock: 25,
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH0Y4w2GvI55CqP2069E7ZJ3vN492iHhN3NfR8O7339_589-9403-9204-9403-9204-9403-9204-9403-9204",
                hero: false
            },
            {
                name: "Lumina Gold Cuff",
                category: "Bracelets",
                price: 3200,
                details: "A structural masterpiece inspired by brutalist architecture. Broad surface captures and reflects light at every angle.",
                material: "Matte 18k Yellow Gold",
                stock: 5,
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkVRediPVl1th95jTTHL1VaxEFjeAVdJo7HRqjIWDJPcm19Ff_g-ztUuYHA7YfangLRmNW7ZHRaPzxFtInSJ2wUbgY8zOYArw53LaW5low_wT7A55i-tFqOAUtWz6cte_kqPR0psK-L2CcvmeylQ3pqdJVelBQAo-CJpvEU5ts8gi54EUM2G9X2BOWBUSy8LfP7K3uQnCyN_6yoJmw6LgB97uKV3EcBKdTCLPrgiLMbOs2dgdKNdYtqM9RuMerfkOh9pf1NusKDYHT",
                hero: true
            },
            {
                name: "Velvet Night Studs",
                category: "Earrings",
                price: 1100,
                details: "Minimalist black diamond studs set with delicate prongs. Designed to be a daily staple for the discrete connoisseur.",
                material: "Black Diamond & 18k White Gold",
                stock: 15,
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5d9EZziKe0Ttlq7_xGCRT8gY2JzCwNSJ69gl87BIqnO6BRp6huNYJZF2z6dvdOvAmefjJDUSIN6tCanfQxWXDD7eODKJu1yRHl17RW21a1RUJti3DSAJYItrFFqDPDEtd19xyakQxKwQk5cwbhAUcjfx_W2_ImhWF8D_fUP-P7HXruHEOKNxMHdHsn798tF11rBswDco-4oJ5BjOVL0vkmRT8Gi5vWD811Vu5MGhgkA3RiAhALV3_HLHXs2B6pdQmH58YV_zzBxmq",
                hero: false
            }
        ];

        await Product.insertMany(products);

        console.log('✅ Collection Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error(`❌ Error seeding data: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();

        console.log('🗑️ Data Destroyed');
        process.exit();
    } catch (error) {
        console.error(`❌ Error destroying data: ${error.message}`);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
