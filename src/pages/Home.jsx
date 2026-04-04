import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
    useEffect(() => {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const featuredWorks = [
        {
            id: 1,
            title: "Astral Bangle Stack",
            tag: "Bangle Stack",
            specs: "18k Gold & Engraved Diamonds",
            price: "$4,500",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDP9sY5kV-iT2L0PsRLnDMUX_fNnJVPEPVKmBPfYFNCLKimMzo6yeR-GZj2py7XVplxHlFe9yidum3dNTDPb_cIBc0YCp78mAUFAEC84qC-vaw5ShD2kSjpMqI3StA5AFN7HzbsyMocDpgWh11Kk6CMgSn1NcNjgCRV5OdwW2NpoZPA2M30ZgVHNwmp3zM3qaTg-Qk9PMxX-zYrX5zfAdo7hiYwnpOViwwTXktlgHACKT-FjpiYLBA0slioAv-e7aeRcgfmNy30T3sZ"
        },
        {
            id: 2,
            title: "Solstice Sunburst",
            tag: "Sunburst Necklace",
            specs: "18k Solid Gold & Brilliant Diamond",
            price: "$2,100",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBv9_mVnLSdhf6SKw5pIeTcYIvJXoOVoSa3qX3Fbfwt7dcHmW79gcV-3lACiTAMsFuMPhTLN7iT1UvcGV6unWAXJzBmsLWHtD0xKd2wi8WUHB4rhedHLKd4EbgqUxag1Kj2te7n9rgHRaSOdu7zeQfwnR4vYLs8bGvJ1xaqDiVyO5oX7GCdOY8QAxZpNJeskhYjfpiBwwlQLeDQatcAatJ8eT85s48qrZI2QAvi1qLGZx3XDXh2gor68pmQ7382lMBdZA7OT3SGPKm0"
        },
        {
            id: 3,
            title: "Celestial Star Drops",
            tag: "Star Drops",
            specs: "18k Gold, Opal & Diamond",
            price: "$1,850",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBe1TJaSxbCjPeBOwrYEK4VNhCj-0xVe78ZJaC6QgYI1qtnh7AF-fmFo-fXuETFNZ8pUM9n_qWsO3AfMtvCn5uHlMypBEi0GIlopHr49Lbm7R7-2ucWwE0tXurU45Z1x2xiTWYIOA4JaFRxrx5DXIgdEnPkvmGsduNUPoS-gzKudmNiD0SGQGWYcmUzYT949bg4vDSrdZUPTkL2eyYWliaU7pQR5wVb0DOIjGHdSEy1KClZcrKhBHZ__FJc0xszjO4TqTLJxp0L86VE"
        }
    ]

    return (
        <div className="bg-surface selection:bg-primary/10 font-body">
            {/* Enhanced Hero Section */}
            <section className="relative h-screen flex items-center overflow-hidden bg-surface-container-low pt-20">
                <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBluJKo47CVOKnlTyQgCTqmwyBwn4oyI9Fbp5JIpO0UCpHxwG_CtUeMxjf4DrSihEEU8jVSLRAwJ4esRp4Tk2QaH26bXp0coam9A_4stPTbT08iMlwzRMu5IGikVbJvpmaMjfh8iNxVfB8zWqOiKTfWV05fm9qhUMzDPnbqP9092aQq5Vd-GRCj-YVD_AsG_LZQY-WV014vgGalBflPHI5cL7lqGqEQZjR22_BK8NBYEfLjt31ep2Ywk9DDZw65dYVJrWKRRfWKwamh')] bg-cover bg-center opacity-10 animate-slow-zoom"></div>
                <div className="max-w-[1720px] mx-auto w-full px-8 md:px-16 grid grid-cols-12 gap-0 items-center relative z-10">
                    <div className="col-span-12 lg:col-span-5 py-12">
                        <span className="font-label text-[10px] kerning-widest uppercase text-primary mb-6 block opacity-80 animate-reveal-down">Season MMXXIV Collection</span>
                        <h1 className="font-headline text-[clamp(4.5rem,10vw,8rem)] leading-[0.8] tracking-[-0.05em] mb-8 italic font-light animate-reveal-up" style={{ animationDelay: '0.2s' }}>
                            Celestial<br />
                            <span className="ml-16 md:ml-24 text-shimmer">Echoes</span>
                        </h1>
                        <p className="font-body text-base leading-relaxed text-secondary-dim max-w-[340px] mb-10 font-light animate-reveal-up" style={{ animationDelay: '0.4s' }}>
                            A symphony of light hand-sculpted in gold. Where the ancient art of Tuscan goldsmiths meets the infinite geometry of the stars.
                        </p>
                        <div className="animate-reveal-up" style={{ animationDelay: '0.6s' }}>
                            <Link to="/shop" className="group relative inline-block px-12 py-5 border border-primary text-primary overflow-hidden transition-all duration-700">
                                <span className="relative z-10 font-label text-[11px] kerning-widest uppercase transition-colors duration-500 group-hover:text-white">Discover Collection</span>
                                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden lg:col-span-7 lg:flex justify-end relative">
                        <div className="relative w-full max-w-[720px] aspect-[4/5] overflow-hidden shadow-2xl animate-reveal-up" style={{ animationDelay: '0.3s' }}>
                            <img alt="High-end jewelry model" className="w-full h-full object-cover animate-slow-zoom" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBluJKo47CVOKnlTyQgCTqmwyBwn4oyI9Fbp5JIpO0UCpHxwG_CtUeMxjf4DrSihEEU8jVSLRAwJ4esRp4Tk2QaH26bXp0coam9A_4stPTbT08iMlwzRMu5IGikVbJvpmaMjfh8iNxVfB8zWqOiKTfWV05fm9qhUMzDPnbqP9092aQq5Vd-GRCj-YVD_AsG_LZQY-WV014vgGalBflPHI5cL7lqGqEQZjR22_BK8NBYEfLjt31ep2Ywk9DDZw65dYVJrWKRRfWKwamh" />
                            <div className="shimmer-effect absolute inset-0 pointer-events-none opacity-40"></div>
                        </div>
                        {/* Floating Art Label */}
                        <div className="absolute bottom-16 -left-16 bg-white/90 backdrop-blur-md p-10 max-w-[240px] shadow-lg animate-reveal-up" style={{ animationDelay: '0.8s' }}>
                            <span className="font-headline italic text-2xl text-primary block mb-2">Nº 01</span>
                            <p className="text-[10px] font-label kerning-widest uppercase text-secondary leading-loose">The Ethereal Gaze • Heritage Series</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Manifesto Section */}
            <section className="py-32 px-8">
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-16 scroll-reveal text-on-surface">
                    <div className="w-full md:w-1/3 flex justify-center">
                        <div className="w-32 h-[1px] bg-primary/30 rotate-90 md:rotate-0"></div>
                    </div>
                    <div className="w-full md:w-2/3">
                        <span className="font-headline italic text-2xl text-primary mb-6 block opacity-70">The SOVRA</span>
                        <h2 className="font-headline text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] mb-8 font-light">Poetry in Metal & Stone</h2>
                        <p className="font-body text-2xl leading-relaxed text-secondary-dim font-light italic max-w-2xl">
                            "Born from the golden silence of the Tuscan hills, SOVRA represents the intersection of ancestral craftsmanship and ethereal vision. Every piece is a whispered secret between the artisan and the earth."
                        </p>
                    </div>
                </div>
            </section>

            {/* Curated Gallery Grid */}
            <section className="pb-32 px-8 md:px-16">
                <div className="max-w-[1720px] mx-auto">
                    <div className="flex justify-between items-baseline mb-20 scroll-reveal">
                        <h3 className="font-headline text-5xl font-light">The Archive</h3>
                        <Link to="/shop" className="font-label text-[11px] kerning-widest uppercase border-b border-primary/20 pb-2 hover:border-primary transition-all duration-500">Explore All Masterpieces</Link>
                    </div>
                    <div className="grid grid-cols-12 gap-8 lg:gap-16 items-stretch">
                        {/* Rings Category */}
                        <div className="col-span-12 md:col-span-4 flex flex-col scroll-reveal">
                            <Link to="/shop/rings" className="relative group overflow-hidden bg-surface-container aspect-[3/4]">
                                <img alt="Rings" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkXJLhnNmK6xvBpC0QYgMtgFm4EjXPbd1mChYNGxRizSftvUBqJpKAY_ZDce4SNeaccK64kFO5_5Yv_nbMHt52UZRQ1oRTgfv1My8JfbfFCwc6WxDGYLK-7gfr89S19Du1aYqUAsw0g5QaPy2AjEHLkuoglqa6550Cb6iw1G6VFS_a6GiN5lpBApPlJ1aVRiyuin5AtoszSKQ7gTXXMf_fzoAxHctQnZcxr13MiwUAjTFt7h-_H1nsd9cu3yf6_4Adm9Fnx7VIwHhb" />
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            </Link>
                            <div className="mt-6 space-y-2 px-2">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-headline text-2xl italic text-primary">The Circle</h4>
                                    <span className="font-label text-[10px] kerning-widest uppercase opacity-40">12 Pieces</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-black/5 pt-3">
                                    <span className="font-label text-[9px] kerning-widest uppercase text-secondary font-bold">Collection Alpha</span>
                                    <span className="font-label text-[9px] kerning-widest uppercase text-secondary">Masterpiece</span>
                                </div>
                            </div>
                        </div>

                        {/* Earrings Category */}
                        <div className="col-span-12 md:col-span-4 flex flex-col scroll-reveal" style={{ transitionDelay: '0.1s' }}>
                            <Link to="/shop/earrings" className="relative group overflow-hidden bg-surface-container aspect-[3/4]">
                                <img alt="Earrings" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe1TJaSxbCjPeBOwrYEK4VNhCj-0xVe78ZJaC6QgYI1qtnh7AF-fmFo-fXuETFNZ8pUM9n_qWsO3AfMtvCn5uHlMypBEi0GIlopHr49Lbm7R7-2ucWwE0tXurU45Z1x2xiTWYIOA4JaFRxrx5DXIgdEnPkvmGsduNUPoS-gzKudmNiD0SGQGWYcmUzYT949bg4vDSrdZUPTkL2eyYWliaU7pQR5wVb0DOIjGHdSEy1KClZcrKhBHZ__FJc0xszjO4TqTLJxp0L86VE" />
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            </Link>
                            <div className="mt-6 space-y-2 px-2">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-headline text-2xl italic text-primary">Earrings</h4>
                                    <span className="font-label text-[10px] kerning-widest uppercase opacity-40">08 Pieces</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-black/5 pt-3">
                                    <span className="font-label text-[9px] kerning-widest uppercase text-secondary font-bold">Ornaments</span>
                                    <span className="font-label text-[9px] kerning-widest uppercase text-secondary">Signature</span>
                                </div>
                            </div>
                        </div>

                        {/* Stacked Necklaces/Bracelets */}
                        <div className="col-span-12 md:col-span-4 flex flex-col gap-8 scroll-reveal" style={{ transitionDelay: '0.2s' }}>
                            <div className="flex flex-col">
                                <Link to="/shop/necklaces" className="relative group overflow-hidden bg-surface-container aspect-[16/10]">
                                    <img alt="Necklaces" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv9_mVnLSdhf6SKw5pIeTcYIvJXoOVoSa3qX3Fbfwt7dcHmW79gcV-3lACiTAMsFuMPhTLN7iT1UvcGV6unWAXJzBmsLWHtD0xKd2wi8WUHB4rhedHLKd4EbgqUxag1Kj2te7n9rgHRaSOdu7zeQfwnR4vYLs8bGvJ1xaqDiVyO5oX7GCdOY8QAxZpNJeskhYjfpiBwwlQLeDQatcAatJ8eT85s48qrZI2QAvi1qLGZx3XDXh2gor68pmQ7382lMBdZA7OT3SGPKm0" />
                                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                </Link>
                                <div className="mt-4 space-y-2 px-2">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-headline text-xl italic text-primary">Necklaces</h4>
                                        <span className="font-label text-[9px] kerning-widest uppercase opacity-40">15 Pieces</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-black/5 pt-3">
                                        <span className="font-label text-[9px] kerning-widest uppercase text-secondary font-bold">Necklines</span>
                                        <Link to="/shop/necklaces" className="material-symbols-outlined text-sm opacity-40 group-hover:opacity-100 transition-opacity">arrow_forward</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <Link to="/shop/bracelets" className="relative group overflow-hidden bg-surface-container aspect-[16/10]">
                                    <img alt="Bracelets" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP9sY5kV-iT2L0PsRLnDMUX_fNnJVPEPVKmBPfYFNCLKimMzo6yeR-GZj2py7XVplxHlFe9yidum3dNTDPb_cIBc0YCp78mAUFAEC84qC-vaw5ShD2kSjpMqI3StA5AFN7HzbsyMocDpgWh11Kk6CMgSn1NcNjgCRV5OdwW2NpoZPA2M30ZgVHNwmp3zM3qaTg-Qk9PMxX-zYrX5zfAdo7hiYwnpOViwwTXktlgHACKT-FjpiYLBA0slioAv-e7aeRcgfmNy30T3sZ" />
                                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                </Link>
                                <div className="mt-4 space-y-2 px-2">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-headline text-xl italic text-primary">Bracelets</h4>
                                        <span className="font-label text-[9px] kerning-widest uppercase opacity-40">10 Pieces</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-black/5 pt-3">
                                        <span className="font-label text-[9px] kerning-widest uppercase text-secondary font-bold">Cuffs</span>
                                        <Link to="/shop/bracelets" className="material-symbols-outlined text-sm opacity-40">arrow_forward</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Systematic Selected Works Showcase */}
            <section className="py-40 bg-surface-container-low/30 overflow-hidden">
                <div className="max-w-[1720px] mx-auto px-8 md:px-16">
                    <div className="text-center mb-24 scroll-reveal">
                        <span className="font-label text-[11px] kerning-widest uppercase text-secondary mb-6 block">Masterwork Showcase</span>
                        <h2 className="font-headline text-6xl md:text-7xl font-light tracking-tight italic text-primary">Ethereal Essentials</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                        {featuredWorks.map((work, index) => (
                            <div key={work.id} className="group flex flex-col scroll-reveal" style={{ transitionDelay: `${index * 0.15}s` }}>
                                <Link to="/shop" className="relative aspect-[3/4] overflow-hidden mb-8 bg-white shadow-lux-sm group-hover:shadow-lux transition-all duration-[1s]">
                                    <img alt={work.title} className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]" src={work.image} />
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                                    {/* Hover Overlay Button */}
                                    <div className="absolute inset-0 flex items-center justify-center translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                                        <div className="bg-primary text-on-primary px-16 py-6 text-[10px] kerning-widest uppercase font-label tracking-[0.3em] font-black shadow-lux">Details</div>
                                    </div>
                                </Link>

                                <div className="space-y-4 px-2">
                                    <div className="flex justify-between items-baseline border-b border-black/5 pb-4">
                                        <h4 className="font-headline text-2xl italic font-light text-primary">{work.title}</h4>
                                        <span className="font-label text-[10px] text-primary kerning-widest font-black uppercase">{work.price}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-label text-[11px] text-primary tracking-[0.2em] uppercase font-bold">{work.tag}</span>
                                        <span className="font-body text-[11px] opacity-60 italic">{work.specs}</span>
                                    </div>
                                    <Link to="/shop" className="inline-block font-label text-[9px] kerning-widest uppercase border-b border-primary/20 pb-1 hover:border-primary transition-all font-bold opacity-60 hover:opacity-100 pt-4">View Collection</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Subscription */}
            <section className="py-40 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f8dec1_0%,transparent_70%)] opacity-20"></div>
                <div className="max-w-[800px] mx-auto text-center px-8 relative z-10 scroll-reveal">
                    <h2 className="font-headline text-5xl mb-8 font-light italic text-primary">The Inner Circle</h2>
                    <p className="font-body text-secondary-dim text-[11px] kerning-widest uppercase mb-12 opacity-80 leading-loose">
                        A sanctuary for connoisseurs. Be the first to witness new collections<br />and read our seasonal SOVRA journal.
                    </p>
                    <form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="relative group max-w-md mx-auto w-full">
                            <input className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-6 text-[11px] font-label kerning-widest focus:ring-0 focus:border-primary transition-all placeholder:text-outline/40 uppercase text-center" placeholder="YOUR EMAIL ADDRESS" type="email" />
                            <div className="absolute bottom-0 left-0 h-[1px] bg-primary scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700 origin-center"></div>
                        </div>
                        <div className="flex justify-center">
                            <button className="font-label text-[11px] kerning-widest uppercase text-primary border border-primary/30 px-24 py-6 hover:bg-primary hover:text-on-primary transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] shadow-sm hover:shadow-xl">
                                Request Access
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Home
