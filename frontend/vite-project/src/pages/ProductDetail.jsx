import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useShop } from '../context/ShopContext'
import api from '../utils/api'

const ProductDetail = () => {
    const { id } = useParams()
    const { addToCart, addToWishlist, wishlist } = useShop();
    const [specOpen, setSpecOpen] = useState(true)
    const [shippingOpen, setShippingOpen] = useState(false)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    const isWishlisted = wishlist.some(item => item._id === id || item === id);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const { data } = await api.get(`/products/${id}`)
                setProduct(data)
            } catch (error) {
                console.error('Fetch failed:', error)
                // Fallback to mock if fetch fails for demo purposes
                setProduct({
                    _id: 'nova-heart',
                    name: "Nova Heart Necklace",
                    series: "The Celestial Series",
                    price: 1250.00,
                    description: '"A delicate and timeless heart silhouette, meticulously crafted for the modern romantic. The Nova Heart Necklace combines effortless elegance with everyday resilience."',
                    features: ["Sweatproof", "Anti Tarnish", "Water proof", "Hypoallergenic"],
                    specs: [
                        { label: "Material", value: "Stainless Steel" },
                        { label: "Plating", value: "Gold 18K PVD Plating" },
                        { label: "Stone/Pearl", value: "Natural" },
                        { label: "Length", value: "46 cm" },
                        { label: "Weight", value: "6g" },
                    ],
                    images: [
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCH0Y4w2GvI55CqP2069E7ZJ3vN492iHhN3NfR8O7339_589-9403-9204-9403-9204-9403-9204",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuBkVRediPVl1th95jTTHL1VaxEFjeAVdJo7HRqjIWDJPcm19Ff_g-ztUuYHA7YfangLRmNW7ZHRaPzxFtInSJ2wUbgY8zOYArw53LaW5low_wT7A55i-tFqOAUtWz6cte_kqPR0psK-L2CcvmeylQ3pqdJVelBQAo-CJpvEU5ts8gi54EUM2G9X2BOWBUSy8LfP7K3uQnCyN_6yoJmw6LgB97uKV3EcBKdTCLPrgiLMbOs2dgdKNdYtqM9RuMerfkOh9pf1NusKDYHT",
                    ]
                })
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    if (loading) return <div className="pt-40 text-center font-headline text-2xl italic opacity-30">Revealing the Masterpiece...</div>
    if (!product) return <div className="pt-40 text-center">Piece not found in the archives.</div>

    return (
        <div className="pt-24 pb-16 bg-background font-body selection:bg-primary-container selection:text-on-primary-container">
            {/* Breadcrumbs */}
            <div className="max-w-[1440px] mx-auto px-12 mb-8">
                <nav className="flex text-xs uppercase tracking-widest text-secondary gap-4 font-bold">
                    <Link className="hover:text-primary transition-colors" to="/shop">Collection</Link>
                    <span>/</span>
                    <Link className="hover:text-primary transition-colors" to="/shop">{product.category || 'Celestial Series'}</Link>
                    <span>/</span>
                    <span className="text-on-surface opacity-100">{product.name}</span>
                </nav>
            </div>

            {/* Product Hero Section */}
            <section className="max-w-[1440px] mx-auto px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Gallery Grid */}
                <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="col-span-2 aspect-[4/5] bg-surface-container overflow-hidden group shadow-sm"
                    >
                        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={product.img || product.images?.[0] || product.image || 'https://via.placeholder.com/800'} alt={product.name} />
                    </motion.div>
                    {product.images?.slice(1, 3).map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * (index + 1) }}
                            className="aspect-square bg-surface-container overflow-hidden group shadow-sm"
                        >
                            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={img} alt="Detail View" />
                        </motion.div>
                    ))}
                </div>

                {/* Product Details Sidebar */}
                <div className="lg:col-span-5 flex flex-col pt-8">
                    <div className="sticky top-40">
                        <span className="font-label text-xs tracking-[0.3em] uppercase text-primary mb-4 block font-bold">
                            {product.series || product.brand}
                        </span>
                        <h2 className="font-headline text-4xl lg:text-5xl tracking-tight leading-tight mb-6">
                            {product.name}
                        </h2>
                        <p className="text-2xl font-light text-on-surface mb-8">
                            ${product.price?.toLocaleString()}
                        </p>

                        <div className="space-y-4 mb-8">
                            <p className="font-body text-lg leading-relaxed text-secondary italic opacity-85">
                                {product.details || product.description}
                            </p>
                            {product.features && (
                                <div className="pt-4">
                                    <h4 className="font-label text-[10px] tracking-widest uppercase text-primary mb-6 font-bold">Core Features</h4>
                                    <ul className="grid grid-cols-2 gap-y-4 gap-x-4 text-[10px] tracking-widest uppercase text-on-surface-variant font-bold">
                                        {product.features.map(feature => (
                                            <li key={feature} className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-4 mb-8">
                            <button
                                onClick={() => addToCart(product._id)}
                                className="bg-primary text-on-primary py-5 px-10 text-[10px] tracking-widest uppercase transition-all duration-400 hover:opacity-90 active:scale-[0.99] editorial-shadow font-bold"
                            >
                                Add to Bag
                            </button>
                            <button
                                onClick={() => addToWishlist(product._id)}
                                className={`border ${isWishlisted ? 'bg-primary/5 border-primary/40' : 'border-outline-variant/30'} py-5 px-10 text-[10px] tracking-widest uppercase text-on-surface transition-all duration-400 hover:bg-surface-container-low active:scale-[0.99] font-bold`}
                            >
                                {isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
                            </button>
                        </div>

                        {/* Accordion Specifications */}
                        <div className="border-t border-outline-variant/20 pt-8 space-y-6">
                            <details className="group cursor-pointer" open={specOpen} onToggle={(e) => setSpecOpen(e.currentTarget.open)}>
                                <summary className="list-none flex justify-between items-center font-label text-[10px] tracking-widest uppercase font-bold">
                                    Specifications
                                    <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="pt-8 grid grid-cols-2 gap-y-6 text-sm font-body text-secondary italic">
                                    {product.specs ? product.specs.map(spec => (
                                        <React.Fragment key={spec.label}>
                                            <span className="font-bold uppercase text-[10px] tracking-widest text-on-surface not-italic">{spec.label}</span>
                                            <span>{spec.value}</span>
                                        </React.Fragment>
                                    )) : (
                                        <>
                                            <span className="font-bold uppercase text-[10px] tracking-widest text-on-surface not-italic">Material</span>
                                            <span>{product.material || '18k Fine Gold'}</span>
                                            <span className="font-bold uppercase text-[10px] tracking-widest text-on-surface not-italic">Availability</span>
                                            <span>{product.countInStock > 0 ? 'In Stock' : 'Upon Request'}</span>
                                        </>
                                    )}
                                </div>
                            </details>
                            <div className="border-t border-outline-variant/10"></div>
                            <details className="group cursor-pointer" open={shippingOpen} onToggle={(e) => setShippingOpen(e.currentTarget.open)}>
                                <summary className="list-none flex justify-between items-center font-label text-[10px] tracking-widest uppercase font-bold">
                                    Shipping & Returns
                                    <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="pt-8 text-sm font-body text-secondary leading-relaxed italic opacity-80">
                                    Complimentary express shipping on all orders. Returns accepted within 14 days of receipt in original condition.
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductDetail
