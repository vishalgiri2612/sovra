import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Shop = () => {
    const { category } = useParams()
    const [isFilterOpen, setIsFilterOpen] = useState(true)

    // Robust editorial product data
    const allProducts = [
        { 
            id: 1, 
            name: "The Solaris Pendant", 
            category: "necklaces", 
            price: "$4,850.00", 
            details: "18k Yellow Gold • VVS Diamonds",
            hero: true,
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWTyCO7hauxZpDW7GduM3p9lIQTJEtruSNpt1GdnyvDza8E0AwI7aL2OLIPpPDF300vmE6LBLNxGRbT1mVWogRPsNVjqwlDJ5qFy5phLlWmsNFG230imuNgQTjlXV6c0CoH0N2bU66v0ygp17QYr98ye8oxn-NhUIzr5yLiwBz4mzki1i9GrCuydqIuBCP1RmrbC-QhgEDMwsmnBn-kHw4S2iMddz7jX94VM4N_zFAmtoOOmD8xvBMz--kNCcYmhcfx2QajUdurjj_" 
        },
        { 
            id: 2, 
            name: "Emerald Cascade", 
            category: "necklaces", 
            price: "$3,200.00", 
            details: "White Gold • Colombian Emeralds",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0AUXF-HX4HK5W5VZioXOD1qvrt3XNpXG_32W2ZP8NcEufQUvz36o1Q3zHaJd_MLzyllqb4TBxYc3f56q9Zy2holbowDNard_lk01Yl10fU0TBNb9tEGUd8b5wXtur-MkWCPpsldTMk5f6xXlh7ZerK-HMap3YbBOmsyuQ5YjCJHg8429UYrPiZUBIJcdPeT9udo7HGVkIZjr_XxpJCwzjqjY-G1d_clsZoI1CsRYUr9loFcjd1dxs1-w25vcGoY9bxwiMEdI-LMkC" 
        },
        { 
            id: 3, 
            name: "Baroque Muse", 
            category: "necklaces", 
            price: "$1,950.00", 
            details: "Rose Gold • South Sea Pearl",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbmQbh7s4c4BzTpHaJsKqQJm2mDULFBb0FT6xGczgy9K8X7_KlTktSw3CFuWz_8LiYgS9Xq7siHf9MjOLZ4v2UE2T-yPQ6pvkQc7wx6oREBJohmHDLQEGvcmhjNi66Auukb81N4Z7KBdJ_CU82rWgmUNbuDPYWg0ITeekpqU54L-8CZv9jdNE4O9uD8ITdDzHrPbRUxvlff3UdJIcK64R-UQC_Ujj_ALZ1YhOZmOwmy12XAJQSyeMDv_LNv6CUo5r5etatAWigQHXu" 
        },
        { 
            id: 4, 
            name: "Astra Locket", 
            category: "necklaces", 
            price: "$2,400.00", 
            details: "Hand-engraved 18k Gold",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTvPAtaAmTcE62KUXO06NCuKBIfGj69_Yae_ZLvF5JXCcr7_k5yEV70RcU9npRR0ExkXFCEAV8Va1imipGIpHsoPhLXb0YB7TcErSBeb3FOP7DjU3pVmXIuCqaAjzHu_04AlUubtQMfcx_jsUQMyrTljjqiDTTxGKr2lvrzXYDnj-oKIf0pDIfOnn-zVjHvjVWh8qDSkNzSuIKAiTytnMyjyvn4SvN58B-9cciGKV74yBwkNv-TAHGgr2MZdQFUCCjG5zQYslMhwu-" 
        },
        { 
            id: 5, 
            name: "Ethereal Tier", 
            category: "necklaces", 
            price: "$6,100.00", 
            details: "Triple Layer • Diamond Accents",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDtkcUBMQ3wiBMOh50jcKVzgD4-D_lxQos_yymUtKDrIX6D_XeSXNb4CKQhRv5xn5x1uuzMlBl7VqRTo_TUG3GPyXjtbf8xaYYa-Bv3OSfcFwROT_mK66uR6PYl4t--GkTcEbaTq30Vc0p8a52n0F-FFgvofFE6W-4x0bdP3uxZxK2Izr4-fCOd33-2g8N0LvIjlH30i-zdpEIBEtOZBs1lZbHJ6ZZ_Gd3klf1aKvKsO4dK3oVwpJNoYQXNXaCk14n5xipLG8alwG4" 
        },
        { 
            id: 6, 
            name: "Ethereal Solitaire Ring", 
            category: "rings", 
            price: "$2,450.00", 
            details: "18k Yellow Gold • VVS Diamonds",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhnNEapNqvup54lBJYOPHSmTcMMPCdrMkBS6VOENzS9BpTSkEA1s-o6WiTqsCiz77M2RRsdY9K47-zLhStw6X5OnxudVYE8Lauy9hCUi5jLO8P5NWecylSkOXLzanuFVsszK19wWIdi0XitNKVwTLzlthnTl-G56XUYooQGU774Dy-SmHV_9qw8ZZ3Nku619pqZJGJ1HiMyLL7ZTVrMpYPlbpykpjq9yVpIDqYxtpnBpxCQnhK74_B7ws5VhkLbhy8du1ufoWjTUPp" 
        },
        { 
            id: 7, 
            name: "Nova Star Band", 
            category: "rings", 
            price: "$1,850.00", 
            details: "Engraved 18k White Gold",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2PCFYBtTuIi69pL8WQbuctD84I8LaNlcFxoEXpWmQRh1slwO3IpkmaNJAREf3yeb3OSGPe4rcvquZV56bt2PGTKN04J-I0HLkCYJ6b3e5r0s9zVDRutE3WDzzRslwwI0SiqNf4efbd8dX4J8TrKqgatCrfyDRRPEl6mkfgN8Bua0DUvVaWQu03dz5-2NHLc9bo4u3svAh0akVi3CY1ILvBoEcHrkCyrQqVXq79Y1GD4lPdo-GMFv9j3f1BakMrbeNmo_OyEdymeL6" 
        },
        { 
            id: 8, 
            name: "Luminous Cuff", 
            category: "bracelets", 
            price: "$3,600.00", 
            details: "18k Gold • Star-set Diamonds",
            img: "/src/assets/bracelet_category.png" 
        }
    ]

    const activeFilter = category || 'all'
    const filteredProducts = activeFilter === 'all' 
        ? allProducts 
        : allProducts.filter(p => p.category === activeFilter)

    const categories = [
        { id: 'necklaces', name: 'Necklaces', img: "/src/assets/necklace_category.png" },
        { id: 'bracelets', name: 'Bracelets', img: "/src/assets/bracelet_category.png" },
        { id: 'rings', name: 'Rings', img: "/src/assets/ring_category.png" }
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
                            An exploration of form and light. Each piece in our celestial collection is handcrafted using ethically sourced 18k gold and high-clarity gemstones in our Tuscan atelier.
                        </p>
                    </div>
                    {activeFilter !== 'all' && (
                        <Link to="/shop" className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface border-b border-primary/40 pb-2 hover:border-primary transition-all duration-700 font-bold mb-2">
                            View All Collections
                        </Link>
                    )}
                </header>

                {/* Categories Section */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map((cat) => (
                            <Link 
                                key={cat.id} 
                                to={`/shop/${cat.id}`}
                                className={`group relative aspect-[5/2] overflow-hidden bg-surface-container-low border border-outline-variant/10 ${activeFilter === cat.id ? 'ring-1 ring-primary ring-offset-8 ring-offset-surface' : ''}`}
                            >
                                <img 
                                    src={cat.img} 
                                    alt={cat.name} 
                                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <span className="font-label text-[10px] uppercase tracking-[0.4em] text-outline mb-2">Category</span>
                                    <h3 className="font-headline text-3xl text-on-surface italic font-light group-hover:translate-x-2 transition-transform duration-700">
                                        {cat.name}
                                    </h3>
                                    <div className="mt-6 w-0 group-hover:w-16 h-px bg-primary transition-all duration-700" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filter */}
                    <aside className="w-full lg:w-72 shrink-0 space-y-12">
                        <div>
                            <h3 className="font-label text-xs uppercase tracking-[0.2em] text-on-surface mb-8 font-bold">Material</h3>
                            <div className="space-y-5">
                                {['18K Yellow Gold', 'Rose Gold', 'White Gold'].map(material => (
                                    <label key={material} className="flex items-center group cursor-pointer">
                                        <input className="w-4 h-4 rounded-none border-outline-variant text-primary focus:ring-0 bg-transparent" type="checkbox"/>
                                        <span className="ml-4 font-label text-xs uppercase tracking-widest text-secondary group-hover:text-primary transition-colors font-medium">{material}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-label text-xs uppercase tracking-[0.2em] text-on-surface mb-8 font-bold">Collection</h3>
                            <div className="space-y-5">
                                {['Celestial Body', 'Ether Essence', 'Heritage Atelier'].map(collection => (
                                    <label key={collection} className="flex items-center group cursor-pointer">
                                        <input className="w-4 h-4 rounded-none border-outline-variant text-primary focus:ring-0 bg-transparent" name="collection" type="radio"/>
                                        <span className="ml-4 font-label text-xs uppercase tracking-widest text-secondary group-hover:text-primary transition-colors font-medium">{collection}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-label text-xs uppercase tracking-[0.2em] text-on-surface mb-8 font-bold">Price Range</h3>
                            <div className="px-2">
                                <input className="w-full h-px bg-outline-variant appearance-none cursor-pointer accent-primary" type="range" min="500" max="15000"/>
                                <div className="flex justify-between mt-6 font-label text-[10px] tracking-widest text-outline uppercase font-bold">
                                    <span>$500</span>
                                    <span>$15,000+</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-label text-xs uppercase tracking-[0.2em] text-on-surface mb-8 font-bold">Occasion</h3>
                            <div className="flex flex-wrap gap-3">
                                {['Bridal', 'Evening', 'Everyday'].map(occasion => (
                                    <button key={occasion} className="px-6 py-3 bg-surface-container-low border border-outline-variant/10 text-[10px] font-label uppercase tracking-widest text-secondary hover:bg-primary hover:text-on-primary transition-all duration-500 font-bold">
                                        {occasion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex justify-between items-end mb-12 pb-6 border-b border-outline-variant/10">
                            <span className="font-label text-[10px] uppercase tracking-[0.25em] text-outline font-bold">{filteredProducts.length} Pieces Found</span>
                            <div className="flex items-center gap-10">
                                <button className="flex items-center gap-3 font-label text-[10px] uppercase tracking-widest text-on-surface font-bold hover:text-primary transition-colors">
                                    Sort By: Newest
                                    <span className="material-symbols-outlined text-sm">expand_more</span>
                                </button>
                            </div>
                        </div>

                        {/* Catalog Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, idx) => (
                                    <motion.div 
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                                        className="product-card cursor-pointer group"
                                    >
                                        <Link to={`/product/${product.id}`}>
                                            <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low">
                                                <img 
                                                    alt={product.name} 
                                                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                                                    src={product.img}
                                                />
                                                <div className="absolute inset-0 bg-primary/5 product-veil flex items-center justify-center backdrop-blur-[2px]">
                                                    <span className="font-label text-[10px] uppercase tracking-[0.3em] text-on-primary bg-primary px-10 py-5 shadow-2xl">Quick View</span>
                                                </div>
                                            </div>
                                            <div className="mt-10 flex justify-between items-start px-2">
                                                <div>
                                                    <h2 className="font-headline text-2xl text-on-surface font-light group-hover:text-primary transition-colors italic">{product.name}</h2>
                                                    <p className="font-label text-[10px] uppercase tracking-[0.2em] text-outline mt-3 font-bold">{product.details}</p>
                                                </div>
                                                <span className="font-body text-lg text-primary font-bold italic line-through-none">{product.price}</span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Pagination/Load More */}
                        <div className="mt-24 flex justify-center border-t border-outline-variant/10 pt-16">
                            <button className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface border-b border-primary/40 pb-2 hover:border-primary transition-all duration-700 font-bold">
                                View All Masterpieces
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Shop

