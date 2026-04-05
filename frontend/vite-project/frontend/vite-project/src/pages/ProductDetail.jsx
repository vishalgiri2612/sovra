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
<<<<<<< HEAD:frontend/vite-project/frontend/vite-project/src/pages/ProductDetail.jsx

            {/* Contextual Storytelling */}
            <section className="mt-24 bg-surface-container py-24">
                <div className="max-w-[1440px] mx-auto px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-24">
                    <div className="relative aspect-[3/4] md:aspect-square overflow-hidden order-2 md:order-1 shadow-2xl">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD_3vYzTSUzuo5mHJrNeJKsIP4I93tf_41jHOFETESLnYU8a1ZdjDoryCSfIaXhOorR0SetoU4A--KkbRPNG7Ob97i_Bfa3gxqvfAppuElAVbnaA57MBe5_HxgCYFwxWZ7Yg5sxdOrEH4gso6PdDo5uNbo-Khm2r5v4uV8Jd2wX8lXlUz03Vaia8Q159MA_KFftOGV82CviGDT7PvWZIoUUa2ovPjFJe47-1eF_5wDHUzmobR9O5Us2XvkAAkkKOmXPly3niJ3l7Yp" alt="Artisan Process" />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                    </div>
                    <div className="order-1 md:order-2 space-y-8">
                        <h3 className="font-headline text-4xl mb-8 font-light italic leading-tight">Artistry in the Infinite</h3>
                        <p className="font-body text-on-surface-variant text-xl leading-relaxed italic opacity-85">
                            Each piece in our Nova collection is handcrafted in our Paris SOVRA. The heart silhouette is achieved through a proprietary laser-engraving technique that creates microscopic facets on the gold surface, allowing it to shimmer even in the lowest light while maintaining its resilience.
                        </p>
                        <Link className="inline-block font-label text-[10px] tracking-widest uppercase border-b border-primary pb-3 text-primary hover:opacity-70 transition-all font-bold" to="/shop">
                            Discover the SOVRA
                        </Link>
                    </div>
                </div>
            </section>

            {/* Complete the Look: Suggested Items */}
            <section className="mt-24 max-w-[1440px] mx-auto px-12 pb-24">
                <div className="flex items-baseline justify-between mb-12 border-b border-outline-variant/10 pb-6">
                    <h3 className="font-headline text-4xl font-light">Complete the Look</h3>
                    <span className="font-label text-[10px] tracking-widest uppercase text-secondary font-bold italic">A Curated Pairing</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                    {/* Suggested Items logic from provided HTML */}
                    {[
                        { name: "Celestial Stud Earrings", price: "$1,100.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBe1TJaSxbCjPeBOwrYEK4VNhCj-0xVe78ZJaC6QgYI1qtnh7AF-fmFo-fXuETFNZ8pUM9n_qWsO3AfMtvCn5uHlMypBEi0GIlopHr49Lbm7R7-2ucWwE0tXurU45Z1x2xiTWYIOA4JaFRxrx5DXIgdEnPkvmGsduNUPoS-gzKudmNiD0SGQGWYcmUzYT949bg4vDSrdZUPTkL2eyYWliaU7pQR5wVb0DOIjGHdSEy1KClZcrKhBHZ__FJc0xszjO4TqTLJxp0L86VE" },
                        { name: "Stardust Band Ring", price: "$850.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2PCFYBtTuIi69pL8WQbuctD84I8LaNlcFxoEXpWmQRh1slwO3IpkmaNJAREf3yeb3OSGPe4rcvquZV56bt2PGTKN04J-I0HLkCYJ6b3e5r0s9zVDRutE3WDzzRslwwI0SiqNf4efbd8dX4J8TrKqgatCrfyDRRPEl6mkfgN8Bua0DUvVaWQu03dz5-2NHLc9bo4u3svAh0akVi3CY1ILvBoEcHrkCyrQqVXq79Y1GD4lPdo-GMFv9j3f1BakMrbeNmo_OyEdymeL6", offset: true },
                        { name: "Cosmic Ray Bangle", price: "$3,200.00", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDP9sY5kV-iT2L0PsRLnDMUX_fNnJVPEPVKmBPfYFNCLKimMzo6yeR-GZj2py7XVplxHlFe9yidum3dNTDPb_cIBc0YCp78mAUFAEC84qC-vaw5ShD2kSjpMqI3StA5AFN7HzbsyMocDpgWh11Kk6CMgSn1NcNjgCRV5OdwW2NpoZPA2M30ZgVHNwmp3zM3qaTg-Qk9PMxX-zYrX5zfAdo7hiYwnpOViwwTXktlgHACKT-FjpiYLBA0slioAv-e7aeRcgfmNy30T3sZ" }
                    ].map((item, idx) => (
                        <div key={item.name} className={`group cursor-pointer ${item.offset ? 'md:translate-y-20' : ''}`}>
                            <div className="aspect-[4/5] bg-surface-container-low mb-8 overflow-hidden relative shadow-sm hover:shadow-xl transition-all duration-700">
                                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={item.img} alt={item.name} />
                                <Link to="/product/1" className="absolute inset-0 bg-surface-container-highest/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center backdrop-blur-[1px]">
                                    <span className="font-label text-[10px] tracking-widest uppercase bg-white py-4 px-8 editorial-shadow font-bold">Quick View</span>
                                </Link>
                            </div>
                            <div className="text-center">
                                <h4 className="font-body font-bold text-sm tracking-widest uppercase mb-2">{item.name}</h4>
                                <p className="font-body text-secondary text-sm italic">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
=======
>>>>>>> 5203ea7c9517ac06d4a13393e6762ec8b1438799:src/pages/ProductDetail.jsx
        </div>
    )
}

export default ProductDetail
