import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useShop } from '../context/ShopContext'
import { Search, Filter, X, ChevronDown, ArrowRight, Sparkles, Heart } from 'lucide-react'
import api from '../utils/api'

const Shop = () => {
    const { category } = useParams()
    const { addToWishlist, removeFromWishlist, wishlist } = useShop();
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [hoveredProduct, setHoveredProduct] = useState(null)

    const activeFilter = category || 'all'

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const { data } = await api.get('/products')
                if (activeFilter === 'all') {
                    setProducts(data)
                } else {
                    setProducts(data.filter(p => p.category?.toLowerCase() === activeFilter.toLowerCase()))
                }
            } catch (error) {
                console.error('Fetch products failed:', error)
                const fallback = [
                    { _id: '1', name: 'Celestial Ring', price: 1200, category: 'rings', series: 'Archive I', img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop' },
                    { _id: '2', name: 'Luna Necklace', price: 1800, category: 'necklaces', series: 'Celestial Body', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb0ce33e?q=80&w=2070&auto=format&fit=crop' },
                    { _id: '3', name: 'Aether Chain', price: 950, category: 'bracelets', series: 'Archive II', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop' },
                    { _id: '4', name: 'Solar Earrings', price: 1550, category: 'earrings', series: 'Nova', img: 'https://images.unsplash.com/photo-1535633302704-b02f4faad747?q=80&w=2070&auto=format&fit=crop' },
                    { _id: '5', name: 'London Cuff', price: 2100, category: 'bracelets', series: 'Heritage', img: 'https://images.unsplash.com/photo-1611085583191-a3b136313402?q=80&w=2070&auto=format&fit=crop' },
                    { _id: '6', name: 'Opal Horizon', price: 3200, category: 'necklaces', series: 'Archive III', img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2070&auto=format&fit=crop' }
                ];
                setProducts(fallback.filter(p => activeFilter === 'all' || p.category === activeFilter))
            } finally {
                setTimeout(() => setLoading(false), 800) // Aesthetic delay
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
        { id: 'all', name: 'The Archive', subtitle: 'Our Complete Curation' },
        { id: 'necklaces', name: 'Necklaces', subtitle: 'Celestial Silhouettes' },
        { id: 'bracelets', name: 'Bracelets', subtitle: 'Fluid Movements' },
        { id: 'rings', name: 'Rings', subtitle: 'Eternal Sigils' },
        { id: 'earrings', name: 'Earrings', subtitle: 'Luminous Accents' }
    ]

    const activeCategoryInfo = categories.find(c => c.id === activeFilter) || categories[0]

    return (
        <div className="pt-24 bg-[#fffcf7] min-h-screen selection:bg-primary/10 overflow-hidden relative">
            {/* Grainy Texture Overlay */}
            <div 
                className="fixed inset-0 opacity-[0.02] pointer-events-none z-[100]" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            <main className="max-w-[1920px] mx-auto px-6 md:px-16 lg:px-32">
                
                {/* Immersive Hero Section */}
                <section className="relative py-20 mb-12 border-b border-[#111110]/5 overflow-hidden">
                    <div className="flex flex-col items-center text-center relative z-10">

                        
                        <div className="inline-flex flex-col items-center">
                            <motion.span 
                                key={`sub-${activeFilter}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-sans text-[10px] tracking-[0.6em] uppercase text-[#7a7670] mb-6 block font-black italic"
                            >
                                {activeCategoryInfo.subtitle}
                            </motion.span>
                            <motion.h1 
                                key={`title-${activeFilter}`}
                                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="font-premium text-7xl md:text-[10rem] text-[#111110] leading-[0.8] mb-12 italic font-light tracking-tighter"
                            >
                                {activeCategoryInfo.name.split(' ').map((word, i) => (
                                    <span key={i} className={i % 2 === 1 ? 'not-italic font-normal' : ''}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </motion.h1>
                        </div>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="max-w-2xl font-body text-lg leading-relaxed text-[#656464] font-light italic"
                        >
                            Discover the intersection of celestial inspiration and British craftsmanship. Each piece is a testament to eternal elegance, forged for the discerning individual.
                        </motion.p>
                    </div>

                    {/* Background Decorative Fragment */}
                    <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.02] pointer-events-none select-none">
                        <span className="font-premium text-[30rem] leading-none absolute top-[-5rem] right-[-5rem] italic">S.</span>
                    </div>
                </section>

                {/* Refined Navigation & Filter Bar */}
                <div className="sticky top-[108px] z-40 bg-[#fffcf7]/80 backdrop-blur-xl border-b border-[#111110]/5 -mx-32 px-32 mb-20">
                    <div className="flex flex-col md:flex-row justify-between items-center py-8 gap-8">
                        <div className="flex items-center gap-10 lg:gap-16">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    to={cat.id === 'all' ? '/shop' : `/shop/${cat.id}`}
                                    className={`font-sans text-[10px] tracking-[0.4em] uppercase transition-all duration-500 relative group font-black ${
                                        activeFilter === cat.id ? 'text-[#111110]' : 'text-[#7a7670]/40 hover:text-[#111110]'
                                    }`}
                                >
                                    {cat.name}
                                    {activeFilter === cat.id && (
                                        <motion.div 
                                            layoutId="shopFilterLinePremium" 
                                            className="absolute -bottom-8 left-0 w-full h-[2px] bg-primary" 
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-12">
                            <div className="hidden lg:flex items-center gap-6">
                                <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#7a7670] font-black">Showing {products.length} Masterworks</span>
                            </div>
                            <div className="h-5 w-[1px] bg-[#111110]/10 hidden lg:block" />
                            <div className="flex items-center gap-8">
                                <button className="flex items-center gap-3 font-sans text-[10px] tracking-[0.4em] uppercase text-[#111110] font-black group">
                                     <Filter size={14} strokeWidth={1.5} />
                                     Filter
                                </button>
                                <button className="flex items-center gap-3 font-sans text-[10px] tracking-[0.4em] uppercase text-[#111110] font-black group">
                                     Sort
                                     <ChevronDown size={14} strokeWidth={1.5} className="group-hover:translate-y-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Catalog Grid */}
                <div className="relative pb-40">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-12">
                             {[1, 2, 3, 4, 5, 6].map((i) => (
                                 <div key={i} className="animate-pulse space-y-10">
                                     <div className="aspect-[4/5] bg-primary/5 rounded-sm" />
                                     <div className="space-y-4 px-10">
                                        <div className="h-2 w-20 bg-primary/5 mx-auto" />
                                        <div className="h-8 w-48 bg-primary/5 mx-auto" />
                                        <div className="h-4 w-24 bg-primary/5 mx-auto" />
                                     </div>
                                 </div>
                             ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-40 gap-x-16">
                            <AnimatePresence mode="popLayout">
                                {products.map((product, idx) => (
                                    <motion.div
                                        key={product._id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 1.2, delay: (idx % 3) * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                        className="group"
                                        onMouseEnter={() => setHoveredProduct(product._id)}
                                        onMouseLeave={() => setHoveredProduct(null)}
                                    >
                                        <Link to={`/product/${product._id}`} className="block text-center px-4">
                                            {/* Architectural Frame with Hover Interaction */}
                                            <div className="relative aspect-[4/5] overflow-hidden bg-white mb-12 shadow-sm transition-all duration-[1.5s] group-hover:shadow-lux group-hover:-translate-y-2 rounded-sm border border-[#111110]/5 p-0.5">
                                                <div className="w-full h-full rounded-[inherit] overflow-hidden relative">
                                                    <img
                                                        alt={product.name}
                                                        className="w-full h-full object-cover transition-all duration-[3s] scale-[1.02] group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                                                        src={product.img || product.image}
                                                    />
                                                    
                                                    {/* Glass Overlay on Hover */}
                                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                                    
                                                    {/* Floating Action Buttons */}
                                                    <button
                                                        onClick={(e) => toggleWishlist(e, product._id)}
                                                        className="absolute top-10 right-10 p-5 bg-white/20 backdrop-blur-md border border-white/10 rounded-full shadow-lg z-20 transition-all hover:scale-110 group-hover:bg-white/30"
                                                    >
                                                        <Heart 
                                                            size={18} 
                                                            className={`${isWishlisted(product._id) ? 'fill-red-500 text-red-500' : 'text-white/60 group-hover:text-white'}`} 
                                                            strokeWidth={2}
                                                        />
                                                    </button>

                                                    {/* Quick Add / Details Label */}
                                                    <div className="absolute inset-x-0 bottom-0 py-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-10">
                                                        <div className="mx-auto w-fit bg-[#111110] text-[#f5f0e8] px-10 py-4 text-[9px] tracking-[0.5em] uppercase font-black shadow-2xl backdrop-blur-md">
                                                            View Masterpiece
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Product Details with Premium Typography */}
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <span className="font-sans text-[8px] tracking-[0.5em] uppercase text-[#7a7670] block font-black opacity-60">
                                                        {product.series || product.category || 'Collective'}
                                                    </span>
                                                    <h2 className="font-premium text-4xl text-[#111110] font-light italic leading-tight group-hover:opacity-50 transition-opacity">
                                                        {product.name}
                                                    </h2>
                                                </div>
                                                
                                                <div className="flex items-center justify-center gap-6">
                                                    <div className="w-10 h-[1px] bg-[#111110]/5 transition-all group-hover:w-16 duration-700" />
                                                    <span className="font-premium text-xl text-[#373831] font-light italic">
                                                        ${product.price?.toLocaleString()}
                                                    </span>
                                                    <div className="w-10 h-[1px] bg-[#111110]/5 transition-all group-hover:w-16 duration-700" />
                                                </div>
                                                
                                                <div className="pt-2">
                                                    <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-primary font-black opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                                         Available for Acquisition
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            
                            {products.length === 0 && (
                                <div className="col-span-full py-64 text-center flex flex-col items-center gap-10">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Sparkles size={64} strokeWidth={0.5} className="text-primary/20" />
                                    </motion.div>
                                    <p className="font-premium text-5xl italic font-light text-[#111110]/40">The vault is currently silent.</p>
                                    <Link to="/shop" className="font-sans text-[10px] tracking-[0.6em] uppercase text-primary border-b border-primary/30 pb-4 font-black hover:tracking-[0.8em] transition-all">
                                        Return to Source
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Bottom Utility Area */}
                    {!loading && products.length > 0 && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="mt-32 flex flex-col items-center gap-12"
                        >
                            <div className="w-[1px] h-40 bg-gradient-to-b from-[#111110]/20 to-transparent" />
                            <div className="text-center space-y-6">
                                <p className="font-body text-sm text-[#656464] italic opacity-60">You have explored deep into the archive.</p>
                                <button className="group flex items-center gap-12 font-sans text-[10px] tracking-[0.6em] uppercase text-[#111110] font-black group">
                                    <span className="border-b border-[#111110]/10 group-hover:border-[#111110] pb-2 transition-all">Catalogue No. 001 - 048</span>
                                    <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>
            
            {/* Architectural Grid Markers (Premium Branding) */}
            <div className="fixed top-0 bottom-0 left-12 w-[1px] bg-[#111110]/5 pointer-events-none hidden 2xl:block" />
            <div className="fixed top-0 bottom-0 right-12 w-[1px] bg-[#111110]/5 pointer-events-none hidden 2xl:block" />
            
            <div className="fixed top-1/2 left-0 -translate-y-1/2 -rotate-90 origin-left pl-20 pointer-events-none opacity-20 hidden 2xl:block">
                <span className="font-sans text-[8px] tracking-[1em] uppercase font-black">SOVRA LONDON ARCHIVE</span>
            </div>
            
            {/* Floating Decorative Elements */}
            <div className="absolute top-[20%] left-[5%] opacity-[0.03] pointer-events-none">
                 <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
                    <circle cx="200" cy="200" r="199" stroke="#111110" strokeWidth="1" strokeDasharray="10 10" />
                 </svg>
            </div>
        </div>
    )
}

export default Shop
