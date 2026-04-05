<<<<<<< HEAD:frontend/vite-project/frontend/vite-project/src/components/EditorialHero.jsx
import React, { useState } from 'react'
=======
import React, { useState, useEffect } from 'react'
>>>>>>> 5203ea7c9517ac06d4a13393e6762ec8b1438799:src/components/EditorialHero.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

const categories = [
<<<<<<< HEAD:frontend/vite-project/frontend/vite-project/src/components/EditorialHero.jsx
    { id: 1, name: 'Necklaces', image: '/nav-necklace.png' },
    { id: 2, name: 'Bracelets', image: '/nav-bracelet.png' },
    { id: 3, name: 'Rings', image: '/nav-ring.png' },
    { id: 4, name: 'Earrings', image: '/nav-earrings.png' }
=======
    { id: 1, name: 'Necklaces', image: '/necklace_hero.png' },
    { id: 2, name: 'Bracelets', image: '/bracelet_hero.png' },
    { id: 3, name: 'Rings', image: '/ring_hero.png' },
    { id: 4, name: 'Earrings', image: '/earring_hero.png' }
>>>>>>> 5203ea7c9517ac06d4a13393e6762ec8b1438799:src/components/EditorialHero.jsx
]

const EditorialHero = () => {
    const [activeTab, setActiveTab] = useState(categories[0])
<<<<<<< HEAD:frontend/vite-project/frontend/vite-project/src/components/EditorialHero.jsx

    return (
        <section className="relative w-full min-h-screen bg-[#f5f0e8] overflow-hidden flex flex-col md:flex-row items-center justify-between cursor-none pt-20">
=======
    const [currentIndex, setCurrentIndex] = useState(0)

    // Auto-cycle effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % categories.length;
                setActiveTab(categories[nextIndex]);
                return nextIndex;
            });
        }, 3000); // 3-second cycle for a more dynamic pace

        return () => clearInterval(interval);
    }, []);

    // Manual selection updates the index too
    const handleTabClick = (item, index) => {
        setActiveTab(item);
        setCurrentIndex(index);
    };

    return (
        <section className="relative w-full min-h-screen bg-[#f5f0e8] overflow-hidden flex flex-col md:flex-row items-center justify-between pt-20">
>>>>>>> 5203ea7c9517ac06d4a13393e6762ec8b1438799:src/components/EditorialHero.jsx
            {/* Topbar Avatars - Positioned below the global navbar */}
            <div className="absolute top-36 left-12 md:left-24 z-30 flex items-center">
                {categories.map((item, i) => (
                    <motion.div
                        key={item.id}
<<<<<<< HEAD:frontend/vite-project/frontend/vite-project/src/components/EditorialHero.jsx
                        onMouseEnter={() => setActiveTab(item)}
                        whileHover={{ y: -5, scale: 1.1 }}
                        className="group relative cursor-pointer"
                    >
                        <div className={`w-14 h-14 rounded-full border-2 border-[#f5f0e8] overflow-hidden ${i > 0 ? '-ml-4' : ''} bg-white shadow-sm transition-all duration-500 group-hover:z-50 group-hover:shadow-xl`}>
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
=======
                        onMouseEnter={() => handleTabClick(item, i)}
                        whileHover={{ y: -5, scale: 1.1 }}
                        className="group relative cursor-pointer"
                    >
                        <div className={`w-14 h-14 rounded-full border-2 border-[#f5f0e8] overflow-hidden ${i > 0 ? '-ml-4' : ''} bg-white shadow-sm transition-all duration-500 ${activeTab.id === item.id ? 'z-50 scale-110 shadow-xl border-[#111110]/20' : 'z-10'} group-hover:z-50 group-hover:shadow-xl`}>
                            <img src={item.image} alt={item.name} className={`w-full h-full object-cover transition-all duration-700 ${activeTab.id === item.id ? 'grayscale-0' : 'grayscale-[0.6]'} group-hover:grayscale-0`} />
                        </div>
                        <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 transition-all duration-500 pointer-events-none ${activeTab.id === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
>>>>>>> 5203ea7c9517ac06d4a13393e6762ec8b1438799:src/components/EditorialHero.jsx
                            <span className="text-[9px] kerning-widest uppercase font-sans text-[#111110] bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
                                {item.name}
                            </span>
                        </div>
                    </motion.div>
                ))}
                <div className="w-10 h-10 rounded-full border border-[#7a7670]/20 flex items-center justify-center ml-4 text-[#7a7670] hover:bg-[#111110] hover:text-white transition-all cursor-pointer">
                    <ArrowRight size={14} />
                </div>
            </div>

            {/* Editorial Nav Preview - Positioned in the "Dashboard" Area (Right Top) */}
            <div className="absolute top-36 right-12 md:right-48 z-30 flex flex-col items-end">
                {/* Image Frame (Updates on interaction) */}
                <div className="relative w-36 h-[90px] rounded-full overflow-hidden mb-6 border border-black/5 shadow-lg bg-white">
<<<<<<< HEAD:frontend/vite-project/frontend/vite-project/src/components/EditorialHero.jsx
                    <AnimatePresence mode="wait">
                        <motion.img 
                            key={activeTab.id}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            src={activeTab.image} 
                            className="w-full h-full object-cover grayscale-[0.2]" 
                            alt="Nav preview" 
=======
                    <AnimatePresence>
                        <motion.img
                            key={activeTab.id}
                            initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', position: 'absolute', top: 0, left: 0 }}
                            transition={{ duration: 1 }}
                            src={activeTab.image}
                            className="w-full h-full object-cover"
                            alt="Nav preview"
>>>>>>> 5203ea7c9517ac06d4a13393e6762ec8b1438799:src/components/EditorialHero.jsx
                        />
                    </AnimatePresence>
                </div>

                {/* Categories List - Positioned "Upward of the ELRY" */}
                <div className="relative mt-8 group">
                    {/* The architectural "L" border from screenshot */}
                    <div className="absolute top-0 right-[-24px] w-[60px] h-[60px] border-r border-t border-[#111110]/10 pointer-events-none"></div>
<<<<<<< HEAD:frontend/vite-project/frontend/vite-project/src/components/EditorialHero.jsx
                    
                    <ul className="flex flex-col items-end gap-5">
                        {categories.map((cat) => (
                            <li 
                                key={cat.id}
                                onMouseEnter={() => setActiveTab(cat)}
                                className="relative pr-6"
                            >
                                <span className={`font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                                    activeTab.id === cat.id ? 'text-[#111110] font-bold' : 'text-[#7a7670] opacity-60'
                                }`}>
=======

                    <ul className="flex flex-col items-end gap-5">
                        {categories.map((cat, index) => (
                            <li
                                key={cat.id}
                                onMouseEnter={() => handleTabClick(cat, index)}
                                className="relative pr-6"
                            >
                                <span className={`font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${activeTab.id === cat.id ? 'text-[#111110] font-bold' : 'text-[#7a7670] opacity-60'
                                    }`}>
>>>>>>> 5203ea7c9517ac06d4a13393e6762ec8b1438799:src/components/EditorialHero.jsx
                                    {cat.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Left Content */}
<<<<<<< HEAD:frontend/vite-project/frontend/vite-project/src/components/EditorialHero.jsx
            <div className="relative z-10 flex flex-col justify-between h-[85vh] pl-24 md:pl-[300px] py-24 order-2 md:order-1">
=======
            <div className="relative z-10 flex flex-col justify-between h-[85vh] pl-24 md:pl-[180px] py-24 order-2 md:order-1">
>>>>>>> 5203ea7c9517ac06d4a13393e6762ec8b1438799:src/components/EditorialHero.jsx
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="font-premium text-[clamp(4.5rem,15vw,13rem)] font-light uppercase text-[#111110] leading-[0.8] tracking-[0.1em]"
                >
                    JEW
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="max-w-[280px] space-y-8"
                >
                    <p className="font-sans text-sm leading-relaxed text-[#7a7670] font-light">
                        Jewelry business is highly competitive. Many new and established companies are competing in the market armed.
                    </p>

                    <a href="/shop" className="group inline-flex items-center gap-6 bg-[#111110] text-[#f5f0e8] px-8 py-5 text-xs tracking-widest uppercase font-sans transition-all duration-500 hover:gap-10">
                        Explore Now
                        <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-transform group-hover:scale-110">
                            <Play size={12} fill="white" stroke="none" />
                        </span>
                    </a>
                </motion.div>
            </div>

            {/* Center Model Frame */}
<<<<<<< HEAD:frontend/vite-project/frontend/vite-project/src/components/EditorialHero.jsx
            <div className="absolute inset-x-0 bottom-0 top-0 md:relative flex items-end justify-center w-full md:w-[45vw] h-screen z-0 order-1 md:order-2">
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative w-full h-[95vh] rounded-t-full overflow-hidden"
                >
                    <img
                        src="/hero-model.png"
                        alt="Editorial Model"
                        className="w-full h-full object-cover object-[center_top] grayscale-[0.2]"
                    />
                </motion.div>
=======
            <div className="absolute inset-x-0 bottom-0 top-0 md:relative flex items-end justify-center w-full md:w-[45vw] h-screen z-0 order-1 md:order-2 md:-translate-x-[40px]">
                <div className="relative w-full h-[95vh] rounded-t-full overflow-hidden">
                    <AnimatePresence>
                        <motion.img
                            key={activeTab.id}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98, position: 'absolute', inset: 0 }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            src={activeTab.image}
                            alt={activeTab.name}
                            className="w-full h-full object-cover object-[center_top]"
                        />
                    </AnimatePresence>
                    {/* Gradient Overlay for better text readability and depth */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#f5f0e8] to-transparent pointer-events-none"></div>
                </div>
>>>>>>> 5203ea7c9517ac06d4a13393e6762ec8b1438799:src/components/EditorialHero.jsx
            </div>

            {/* Right Word Fragment */}
            <div className="relative z-10 flex flex-col justify-end h-[85vh] pr-24 md:pr-56 py-24 order-3 overflow-hidden text-right">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="font-premium text-[clamp(4.5rem,15vw,13rem)] font-light uppercase text-[#111110] leading-[0.8] tracking-[0.1em]"
                >
                    ELRY
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute left-1/2 bottom-0 w-[1px] h-20 bg-gradient-to-t from-[#111110] to-transparent animate-bounce opacity-40"></div>
        </section>
    )
}

export default EditorialHero
