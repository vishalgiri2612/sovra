import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useShop } from '../context/ShopContext'
import api from '../utils/api'

const Shop = () => {
    const { category } = useParams()
    const { addToWishlist, removeFromWishlist, wishlist } = useShop();
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const activeFilter = category || 'all'

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const { data } = await api.get('/products')
                if (activeFilter === 'all') {
                    setProducts(data)
                } else {
                    setProducts(data.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase()))
                }
            } catch (error) {
                console.error('Fetch products failed:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [activeFilter])

    const isWishlisted = (id) => wishlist.some(item => item._id === id || item === id);

    const toggleWishlist = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        if (isWishlisted(id)) {
            removeFromWishlist(id);
        } else {
            addToWishlist(id);
        }
    }

    const categories = [
        { id: 'necklaces', name: 'Necklaces', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWTyCO7hauxZpDW7GduM3p9lIQTJEtruSNpt1GdnyvDza8E0AwI7aL2OLIPpPDF300vmE6LBLNxGRbT1mVWogRPsNVjqwlDJ5qFy5phLlWmsNFG230imuNgQTjlXV6c0CoH0N2bU66v0ygp17QYr98ye8oxn-NhUIzr5yLiwBz4mzki1i9GrCuydqIuBCP1RmrbC-QhgEDMwsmnBn-kHw4S2iMddz7jX94VM4N_zFAmtoOOmD8xvBMz--kNCcYmhcfx2QajUdurjj_" },
        { id: 'bracelets', name: 'Bracelets', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxNlot9HyqSqwqOjUX8eMAUytJ2BYf6vdJXKepbSV_dxf-u4zBLqAc4nWFKscNXSAySf7Y3gd20Jnu5KAOa5uYBcyIE56OJxOccGkWsRvAMsbbVWMxI26dIrPAFT-xNGr4uThPbemekOsRqc0zXElxRh_I0dOo3KJpw2Bm4jTz3qsCxvPaiSvURGsNhxZzOYaa_fI62vUQ9h2vX-A3Ul-CCFKTGtOHXyql17ulAAbLoJEziTZK22u3tIHuX887jXgFxzgpTbu56J5t" },
        { id: 'rings', name: 'Rings', img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhnNEapNqvup54lBJYOPHSmTcMMPCdrMkBS6VOENzS9BpTSkEA1s-o6WiTqsCiz77M2RRsdY9K47-zLhStw6X5OnxudVYE8Lauy9hCUi5jLO8P5NWecylSkOXLzanuFVsszK19wWIdi0XitNKVwTLzlthnTl-G56XUYooQGU774Dy-SmHV_9qw8ZZ3Nku619pqZJGJ1HiMyLL7ZTVrMpYPlbpykpjq9yVpIDqYxtpnBpxCQnhK74_B7ws5VhkLbhy8du1ufoWjTUPp" }
    ]

    return (
        <div className="pt-24 pb-16 bg-surface min-h-screen selection:bg-primary-container selection:text-on-primary-container">
            <main className="max-w-[1920px] mx-auto px-12">
                {/* Editorial Header */}
                <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-10">
                    <div className="max-w-2xl">
                        <h1 className="font-headline text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] -tracking-[0.02em] text-on-surface mb-6 capitalize italic font-light">
                            The {activeFilter === 'all' ? 'Entire' : activeFilter} Curations
                        </h1>
                        <p className="font-body text-lg text-secondary leading-[1.7] font-light">
                            An exploration of form and light. Each piece in our celestial collection is handcrafted using ethically sourced 18k gold and high-clarity gemstones in our Tuscan SOVRA.
                        </p>
                    </div>
                    {activeFilter !== 'all' && (
                        <Link to="/shop" className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface border-b border-primary/40 pb-2 hover:border-primary transition-all duration-700 font-bold mb-2">
                            Back to All Collections
                        </Link>
                    )}
                </header>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filter */}
                    <aside className="w-full lg:w-72 shrink-0 space-y-12">
                        {/* Categories List */}
                        <div>
                            <h3 className="font-label text-xs uppercase tracking-[0.2em] text-on-surface mb-8 font-bold font-bold">Categories</h3>
                            <div className="space-y-4">
                                {categories.map(cat => (
                                    <Link
                                        key={cat.id}
                                        to={`/shop/${cat.id}`}
                                        className={`block font-label text-[10px] uppercase tracking-widest hover:text-primary transition-colors ${activeFilter === cat.id ? 'text-primary font-black scale-105 origin-left' : 'text-secondary font-bold'}`}
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-label text-xs uppercase tracking-[0.2em] text-on-surface mb-8 font-bold">Collection</h3>
                            <div className="space-y-5">
                                {['Celestial Body', 'Ether Essence', 'Heritage SOVRA'].map(collection => (
                                    <label key={collection} className="flex items-center group cursor-pointer">
                                        <input className="w-4 h-4 rounded-none border-outline-variant text-primary focus:ring-0 bg-transparent" name="collection" type="radio" />
                                        <span className="ml-4 font-label text-xs uppercase tracking-widest text-secondary group-hover:text-primary transition-colors font-medium">{collection}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex justify-between items-end mb-12 pb-6 border-b border-outline-variant/10">
                            <span className="font-label text-[10px] uppercase tracking-[0.25em] text-outline font-bold">{products.length} Pieces Found</span>
                            <div className="flex items-center gap-10">
                                <button className="flex items-center gap-3 font-label text-[10px] uppercase tracking-widest text-on-surface font-bold hover:text-primary transition-colors">
                                    Sort By: Newest
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </button>
                            </div>
                        </div>

                        {/* Catalog Grid */}
                        {loading ? (
                            <div className="py-20 text-center font-headline text-2xl italic opacity-30">Revealing...</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
                                <AnimatePresence mode="popLayout">
                                    {products.map((product, idx) => (
                                        <motion.div
                                            key={product._id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                                            className="product-card cursor-pointer group relative"
                                        >
                                            <Link to={`/product/${product._id}`}>
                                                <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low mb-8 shadow-sm">
                                                    <img
                                                        alt={product.name}
                                                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                                        src={product.img || product.image || product.images?.[0] || 'https://via.placeholder.com/500'}
                                                    />

                                                    {/* Wishlist Shortcut */}
                                                    <button
                                                        onClick={(e) => toggleWishlist(e, product._id)}
                                                        className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md z-10 transition-all hover:scale-110"
                                                    >
                                                        <span className={`material-symbols-outlined text-lg ${isWishlisted(product._id) ? 'text-error fill-current font-variation-fill' : 'text-primary'}`}>
                                                            {isWishlisted(product._id) ? 'favorite' : 'favorite'}
                                                        </span>
                                                    </button>

                                                    <div className="absolute inset-0 bg-primary/5 product-veil flex items-center justify-center backdrop-blur-[2px]">
                                                        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-on-primary bg-primary px-10 py-5 shadow-2xl">The Curated View</span>
                                                    </div>
                                                </div>
                                                <div className="px-2">
                                                    <div className="flex justify-between items-baseline mb-3">
                                                        <h2 className="font-headline text-2xl text-on-surface font-light group-hover:underline group-hover:decoration-primary/20 transition-all italic">{product.name}</h2>
                                                        <span className="font-body text-lg text-primary font-bold italic line-through-none">${product.price?.toLocaleString()}</span>
                                                    </div>
                                                    <p className="font-label text-[10px] uppercase tracking-[0.2em] text-outline font-bold opacity-60">{product.series || product.category || 'Fine Jewellery'}</p>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {products.length === 0 && (
                                    <div className="col-span-full py-32 text-center border border-dashed border-primary/10">
                                        <p className="font-headline text-3xl italic opacity-30">Our vaults are closed for this curation.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Pagination/Load More */}
                        <div className="mt-24 flex justify-center border-t border-outline-variant/10 pt-16">
                            <button className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface border-b border-primary/40 pb-3 hover:border-primary transition-all duration-700 font-bold">
                                View Entire Archive
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Shop

