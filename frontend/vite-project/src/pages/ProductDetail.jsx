import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useShop } from '../context/ShopContext'
import { ArrowLeft, Sparkles, Heart, Minus, Plus, ShoppingBag } from 'lucide-react'
import api from '../utils/api'

const ProductDetail = () => {
    const { id } = useParams()
    const { addToCart, addToWishlist, wishlist, removeFromWishlist } = useShop();
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [activeImg, setActiveImg] = useState(0)

    const isWishlisted = wishlist.some(item => item._id === id || item === id);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const { data } = await api.get(`/products/${id}`)
                setProduct(data)
            } catch (error) {
                console.error('Fetch failed:', error)
                // Fallback for demo
                setProduct({
                    _id: id,
                    name: "Nova Heart Necklace",
                    series: "Celestial Body",
                    price: 1250.00,
                    description: '"A delicate and timeless heart silhouette, meticulously crafted for the modern romantic. The Nova Heart Necklace combines effortless elegance with everyday resilience."',
                    material: "Stainless Steel",
                    plating: "Gold 18K PVD Plating",
                    stone: "Natural",
                    length: "46 cm",
                    weight: "6g",
                    features: ["Sweatproof", "Anti Tarnish", "Water proof", "Hypoallergenic"],
                    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb0ce33e?q=80&w=2070&auto=format&fit=crop"]
                })
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const handleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(id)
        } else {
            addToWishlist(id)
        }
    }

    if (loading) return (
        <div className="pt-64 pb-32 flex flex-col items-center justify-center gap-8 bg-[#fffcf7] min-h-screen">
             <div className="w-12 h-12 border border-[#111110]/10 rounded-full border-t-[#111110] animate-spin"></div>
             <span className="font-premium text-2xl italic text-[#111110]/30 uppercase tracking-[0.2em]">Revealing the Masterpiece...</span>
        </div>
    )

    if (!product) return (
        <div className="pt-64 text-center bg-[#fffcf7] min-h-screen px-12">
            <h2 className="font-premium text-4xl italic mb-8">Piece not found in the archives.</h2>
            <Link to="/shop" className="font-sans text-[10px] tracking-widest uppercase border-b border-[#111110] pb-2 font-black">Return to Gallery</Link>
        </div>
    )

    const displayImages = product.images?.length > 0 ? product.images : [product.img || product.image];

    return (
        <div className="pt-32 pb-24 bg-[#fffcf7] min-h-screen selection:bg-primary/10">
            <main className="max-w-[1920px] mx-auto px-12 md:px-24">
                
                {/* Editorial Top Navigation */}
                <Link to="/shop" className="inline-flex items-center gap-4 font-sans text-[9px] tracking-[0.4em] uppercase text-[#7a7670] mb-16 hover:text-[#111110] transition-colors group font-black">
                    <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-2" />
                    Back to Curation
                </Link>

                <div className="flex flex-col lg:flex-row gap-24 items-start">
                    
                    {/* GALLERY Side */}
                    <div className="w-full lg:w-[45%] flex flex-col gap-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="relative aspect-square bg-[#f5f0e8] rounded-2xl overflow-hidden shadow-lux-sm"
                        >
                            <img 
                                src={displayImages[activeImg]} 
                                alt={product.name} 
                                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-[2.5s] hover:scale-105"
                            />

                            
                            {/* Wishlist Toggle on Image */}
                            <button 
                                onClick={handleWishlist}
                                className={`absolute top-12 right-12 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-500 z-10 ${
                                    isWishlisted ? 'bg-primary text-white shadow-lux' : 'bg-white/20 text-white/60 hover:bg-white/40 border border-white/10 hover:text-white'
                                }`}
                            >
                                <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                            </button>
                        </motion.div>

                        {/* Detail views thumbnails */}
                        {displayImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {displayImages.map((img, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setActiveImg(i)}
                                        className={`relative aspect-square overflow-hidden bg-[#f5f0e8] rounded-2xl transition-all duration-500 border ${
                                            activeImg === i ? 'border-[#111110] p-1 scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <img src={img} alt="Detail" className="w-full h-full object-cover rounded-xl" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* CONTENT SIDE */}
                    <div className="w-full lg:w-[55%] lg:sticky lg:top-40 space-y-12 pt-10">
                        <header>
                            <motion.span 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#7a7670] block mb-6 font-black"
                            >
                                {product.series || product.category || 'Fine Jewellery Archive'}
                            </motion.span>
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="font-premium text-6xl md:text-7xl text-[#111110] leading-none mb-8 italic"
                            >
                                {product.name}
                            </motion.h1>
                            <div className="flex items-center gap-6 mb-8 text-[#111110] font-black italic text-2xl">
                                <span>${product.price?.toLocaleString()}</span>
                                <div className="w-12 h-[1px] bg-[#111110]/10" />
                            </div>
                            <p className="font-body text-lg text-[#656464] leading-relaxed italic opacity-85 font-light">
                                {product.description || product.details}
                            </p>
                        </header>

                        <div className="py-12 border-y border-[#111110]/5 space-y-12">
                            <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                                {[
                                    { label: 'Material', value: product.material || 'Stainless Steel' },
                                    { label: 'Plating', value: product.plating || 'Gold 18K PVD Plating' },
                                    { label: 'Stone/Pearl', value: product.stone || 'Natural' },
                                    { label: 'Length', value: product.length || '46 cm' },
                                    { label: 'Weight', value: product.weight || '6g' }
                                ].map(spec => (
                                    <div key={spec.label} className="space-y-2 group/spec">
                                        <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-[#7a7670] font-black opacity-60 italic group-hover/spec:text-primary transition-colors">{spec.label}</span>
                                        <p className="font-premium text-xl text-[#373831] font-light italic leading-tight">{spec.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-10 border-t border-[#111110]/5">
                                <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-[#7a7670] font-black opacity-60 italic block mb-8 px-1">Maison Standards</span>
                                <div className="flex flex-wrap gap-4">
                                    {(product.features || ['Sweatproof', 'Anti Tarnish', 'Water proof', 'Hypoallergenic']).map(feature => (
                                        <div key={feature} className="bg-primary/5 px-6 py-2 rounded-full border border-primary/10 group/feat hover:bg-primary transition-all duration-700">
                                            <span className="font-sans text-[9px] tracking-widest uppercase text-primary font-black italic group-hover/feat:text-on-primary transition-colors">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 pt-4">
                            <div className="flex items-center gap-12">
                                <div className="flex items-center border border-[#111110]/10 rounded-full px-6 py-3">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:opacity-50 transition-opacity"><Minus size={14}/></button>
                                    <span className="px-8 font-sans font-black text-xs">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:opacity-50 transition-opacity"><Plus size={14}/></button>
                                </div>
                                <span className="font-sans text-[9px] tracking-widest uppercase text-[#7a7670] font-black">Limited Edition Piece</span>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <button 
                                    onClick={() => addToCart(product._id, quantity)}
                                    className="flex-1 bg-[#111110] text-[#f5f0e8] py-6 px-10 text-[10px] tracking-[0.4em] uppercase font-sans font-black flex items-center justify-center gap-4 hover:opacity-95 transition-all rounded-full shadow-lux-sm active:scale-95"
                                >
                                    <ShoppingBag size={14} />
                                    Begin Acquisition
                                </button>
                                <button 
                                    onClick={handleWishlist}
                                    className={`w-full md:w-20 h-20 rounded-full border flex items-center justify-center transition-all duration-500 ${
                                        isWishlisted ? 'bg-primary/5 border-primary/20 text-error shadow-inner' : 'border-[#111110]/10 text-[#111110] hover:bg-[#111110] hover:text-white'
                                    }`}
                                >
                                    <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Narrative Detail Section */}
                <div className="mt-48 pt-32 border-t border-[#111110]/5 max-w-4xl">
                     <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-[#7a7670] block mb-12 font-black">The Visionary Process</span>
                     <p className="font-premium text-4xl md:text-5xl text-[#111110] leading-tight italic font-light">
                        "For every masterpiece, there's a whisper of celestial inspiration. Our artisans spend weeks hand-sculpting each curve to ensure it captures the exact radiance of the London skyline."
                     </p>
                </div>
            </main>
        </div>
    )
}

export default ProductDetail
