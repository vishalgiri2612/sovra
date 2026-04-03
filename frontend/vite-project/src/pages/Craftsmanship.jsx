import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Craftsmanship = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        service: '',
        message: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Thank you for beginning your story. Our curator will contact you shortly.')
    }

    return (
        <div className="bg-background min-h-screen selection:bg-primary-container selection:text-on-primary-container overflow-hidden">
            <main className="pt-24">
                {/* Hero Section - Bespoke Creations */}
                <section className="min-height-[921px] grid grid-cols-1 md:grid-cols-12 items-center px-12 lg:px-24 py-24 bg-surface gap-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="col-span-12 md:col-span-5 z-10 space-y-8"
                    >
                        <span className="font-label text-xs tracking-[0.4em] uppercase text-primary mb-6 block font-bold">The Atelier Experience</span>
                        <h1 className="font-headline text-[clamp(3.5rem,8vw,6rem)] leading-[0.9] text-on-surface mb-10 -ml-1 italic font-light">Bespoke Creations</h1>
                        <p className="font-body text-xl text-secondary max-w-md leading-relaxed mb-12 font-light italic">
                            A collaborative journey into the heart of fine jewelry. We translate your story into an eternal artifact through the hands of master artisans.
                        </p>
                        <a 
                            className="inline-block bg-primary text-on-primary px-14 py-6 font-label tracking-[0.3em] text-xs uppercase hover:bg-primary-dim transition-all duration-500 ease-out shadow-lux font-bold" 
                            href="#inquiry"
                        >
                            Commence Your Journey
                        </a>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="col-span-12 md:col-span-7 mt-12 md:mt-0 relative h-[600px] md:h-[800px]"
                    >
                        <img 
                            alt="Luxury diamond ring on marble" 
                            className="w-full h-full object-cover shadow-2xl" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4RZo9pWNBbc52Niqwdg9Fe7C0dTzhQIDbXXiZxlZAkqnHVFyuCRmFOR86a6sy5F8Z49iZxdl7Q_mvOcmWp6Ev6Aez1N3AWT6zK043nh57Ez4UPPu0UroMkwG_jc50eYasDfC7HZpZ_X-SX3N-sa3QsSsJnWip_nSE0QiPVbrxpRZ1YyZvK7ISG6i4GNVWf_e4cG107_yQofozdBvw3Cw-jjOiVKtAZvr7za66PQfj8GEwL3BZUhtQv88swPi8l_aCMYvl1y6Km1se" 
                        />
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="absolute -bottom-12 -left-12 w-80 h-auto hidden md:block bg-surface-container p-10 border-l-[6px] border-primary shadow-lux backdrop-blur-md bg-white/90"
                        >
                            <p className="font-headline text-2xl italic text-primary leading-snug font-light">"Every stone tells a silent story; our task is to give it a voice."</p>
                            <div className="mt-6 font-label text-[10px] tracking-[0.4em] text-outline uppercase font-bold">— The Curator</div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Process Intro - The Alchemy */}
                <section className="py-48 px-12 bg-surface-container-low">
                    <div className="max-w-6xl mx-auto text-center">
                        <motion.h2 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="font-headline text-5xl mb-24 italic font-light"
                        >
                            The Alchemy of Creation
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 relative">
                            {/* Decorative Line */}
                            <div className="absolute top-10 left-0 w-full h-[1px] bg-outline-variant/20 hidden md:block"></div>
                            
                            {[
                                { num: '01', title: 'Consultation' },
                                { num: '02', title: 'The Design' },
                                { num: '03', title: 'The Reveal' }
                            ].map((step, idx) => (
                                <motion.div 
                                    key={step.num}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="flex flex-col items-center relative z-10"
                                >
                                    <span className="font-headline text-7xl text-primary/10 mb-6 font-light italic">{step.num}</span>
                                    <h3 className="font-label text-xs tracking-[0.3em] uppercase mb-4 font-bold text-on-surface">{step.title}</h3>
                                    <div className="w-8 h-[1px] bg-primary"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* The Consultation - Stage One */}
                <section className="py-48 bg-surface overflow-hidden" id="consultation">
                    <div className="max-w-[1720px] mx-auto px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
                                <img 
                                    alt="Gems selection" 
                                    className="w-full h-full object-cover transition-transform duration-[4s] hover:scale-110" 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp87BUvML1X3uJvRFMB5Tm2IJl23dUXnIUTgUULLTKjM3QJWvAIUYaRal3wDysmMIBBAlGbFeGJPKiT_4HIgOiN52d5p7D0YHSY53l38YgkZasthdx0tQ-_7gkYbLdlOm3u7HZhcPuxUsnggPS_g0m1XKflqhRz_fUmU99iIPaoDmPAOZVxUmyOXUcBBPijFgqgLkWRyThLtyHLhdFA3y_yywDEXbNkvfbHiifGdCN6pgq4F35vDZah8a7Jp_8tieqaqioz5Cp2iht" 
                                />
                                <div className="absolute inset-0 bg-primary/5"></div>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 md:order-2 space-y-10"
                        >
                            <span className="font-label text-xs tracking-[0.5em] uppercase text-primary mb-4 block font-bold">Stage One</span>
                            <h2 className="font-headline text-6xl mb-10 italic font-light text-on-surface">The Consultation</h2>
                            <p className="font-body text-xl text-secondary leading-relaxed mb-12 font-light italic">
                                The journey begins with an intimate conversation. Whether in our Tuscan atelier or via a private digital gallery, we discuss your inspirations, the occasion, and the spirit you wish to capture.
                            </p>
                            
                            <div className="space-y-12">
                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 flex items-center justify-center bg-surface-container border border-outline-variant/10 group-hover:bg-primary transition-all duration-700">
                                        <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-xl">diamond</span>
                                    </div>
                                    <div>
                                        <span className="block font-label text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-on-surface">Stone Curation</span>
                                        <p className="text-sm text-secondary font-light leading-relaxed max-w-sm">Sourcing the rarest, ethically-mined gemstones that align exactly with your personal vision and values.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 flex items-center justify-center bg-surface-container border border-outline-variant/10 group-hover:bg-primary transition-all duration-700">
                                        <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-xl">auto_awesome</span>
                                    </div>
                                    <div>
                                        <span className="block font-label text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-on-surface">Aesthetic Vision</span>
                                        <p className="text-sm text-secondary font-light leading-relaxed max-w-sm">Defining the metalwork, silhouette, and artistic direction that will transform metal into a legacy.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* The Design - Stage Two */}
                <section className="py-48 bg-surface-container relative" id="design">
                    <div className="max-w-[1720px] mx-auto px-12 lg:px-24 grid grid-cols-1 md:grid-cols-12 gap-20 items-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="md:col-span-5 md:pr-16 space-y-12"
                        >
                            <span className="font-label text-xs tracking-[0.5em] uppercase text-primary mb-4 block font-bold">Stage Two</span>
                            <h2 className="font-headline text-6xl mb-10 italic font-light text-on-surface">The Design</h2>
                            <p className="font-body text-xl text-secondary leading-relaxed mb-12 font-light italic">
                                Our artisans translate your concept into detailed gouache renderings. These traditional paintings capture the play of light and shadow, allowing you to visualize your treasure before it is forged.
                            </p>
                            <div className="p-10 bg-white shadow-lux border-l-[4px] border-primary">
                                <p className="font-body italic text-secondary leading-relaxed opacity-80">"The design phase is where the dream takes a physical shape. We focus on the architectural balance of the setting, ensuring it resonates with your narrative."</p>
                                <div className="mt-4 font-label text-[9px] tracking-widest uppercase font-bold text-outline opacity-50">— Master Designer</div>
                            </div>
                        </motion.div>
                        
                        <div className="md:col-span-7 grid grid-cols-2 gap-8">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.2 }}
                                className="aspect-[3/4] overflow-hidden shadow-2xl mt-20"
                            >
                                <img 
                                    alt="Sketching" 
                                    className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110" 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtM8_vTuYZnXin3O_YjGEez5_j0JuxQTGASW8iTgU9H1NVuunhcsDhQ7AvHEheE8Veg_6JyMWrckW_hD1MlukfUch1R8D4rjVF3aJ5vWdaDNetxJeYuJzFBxGGONAQd8j702_v2mSQ8BnkqoaX_-26e9kxNi6Jz5AAQGi_GJ158zZt9tBYoVDYn1lyFj18bwLqzsvs-r9AqiUHr86ABkP7mNFp3rEFggn4Rlf1AiReMUOLx15XXb_0CcbMy4PSRC4LsbRDgSu-UvS1" 
                                />
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.2, delay: 0.3 }}
                                className="aspect-[3/4] overflow-hidden shadow-2xl"
                            >
                                <img 
                                    alt="Drafting tools" 
                                    className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110" 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX5dly_jhRmaXCyoJYGIdoABxs2yrOgk22okQCgitrB6rdyyYl13tvOk1SHW0eFvji7zpqKQuHnCM3f6G-5R0ktwEn8F-dxFWgd5GqapKaKM9JeOwl3Aid17LYDjXgKe7qFSQ3fda0s-ENDz-F8ENSlKb-ndkTisT9Q-_PDRVtOsHI-T4dh5ujPqfP3_Yq-PnTAJsS_PimPpTJD4JmauZuTynb_mvLd6Kug8pMMiP8LbjZWNZ7lvbbjlhOWSme1FofqqrpJBOiFcFU" 
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* The Reveal - Stage Three */}
                <section className="py-48 bg-background overflow-hidden" id="reveal">
                    <div className="max-w-[1720px] mx-auto px-12 lg:px-24">
                        <div className="text-center mb-24">
                            <motion.span 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="font-label text-xs tracking-[0.5em] uppercase text-primary mb-4 block font-bold"
                            >
                                Stage Three
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="font-headline text-6xl italic font-light text-on-surface"
                            >
                                The Reveal
                            </motion.h2>
                        </div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5 }}
                            className="relative group overflow-hidden bg-black shadow-lux"
                        >
                            <img 
                                alt="Final Jewelry Reveal" 
                                className="w-full h-[800px] object-cover opacity-80 group-hover:scale-105 transition-transform duration-[4000ms] ease-out" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhHBromAvJcv2rjPBQfbfBXiOkfQnie2cA3qhhR_ayj9dOxbE8Ofp7xcHZuRcRT96mgRgw42dC7XmWegf65A9cp_v8IhOYC-wsSEXrdZ-1RqNNLut8IaeNmHb-m1fWK2EFXcy1P2MBp6HXGlgfUUv7oZNkHk41mnmM7iyP6PmtUvL5tS-m0oIeMn4vmqgmzedp3uRagSIKsShc4PObL8yrRQSIXu8st-l1z3rHOK4jus09maR2YMPOVTx-vgoti7OhXHTlxo3z0D6X" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                                <div className="text-center text-on-primary px-12 max-w-3xl">
                                    <h3 className="font-headline text-5xl mb-8 italic font-light">A Legacy is Born</h3>
                                    <p className="font-body text-xl opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-500 font-light leading-relaxed italic">
                                        The final piece is presented in a custom-crafted walnut case, accompanied by a certificate of origin and the original gouache sketches that birthed it.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Inquiry Form - The Commencement */}
                <section className="py-48 bg-surface-container border-t border-outline-variant/10 relative" id="inquiry">
                    <div className="max-w-4xl mx-auto px-12">
                        <div className="text-center mb-24">
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="font-headline text-6xl mb-6 italic font-light"
                            >
                                Begin Your Bespoke Story
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="font-body text-xl text-secondary font-light italic"
                            >
                                Our bespoke specialists will contact you within 48 hours to schedule a private consultation.
                            </motion.p>
                        </div>
                        
                        <motion.form 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-16"
                            onSubmit={handleSubmit}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                <div className="relative group">
                                    <input 
                                        className="peer w-full bg-transparent border-0 border-b border-outline-variant py-6 focus:ring-0 focus:border-primary placeholder-transparent outline-none transition-all font-label text-sm uppercase tracking-widest text-on-surface font-bold" 
                                        id="name" 
                                        placeholder=" " 
                                        type="text"
                                        required
                                    />
                                    <label 
                                        className="absolute left-0 top-6 font-label text-xs uppercase tracking-[0.3em] text-outline transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary font-bold" 
                                        for="name"
                                    >
                                        Your Full Name
                                    </label>
                                </div>
                                <div className="relative group">
                                    <input 
                                        className="peer w-full bg-transparent border-0 border-b border-outline-variant py-6 focus:ring-0 focus:border-primary placeholder-transparent outline-none transition-all font-label text-sm uppercase tracking-widest text-on-surface font-bold" 
                                        id="email" 
                                        placeholder=" " 
                                        type="email"
                                        required
                                    />
                                    <label 
                                        className="absolute left-0 top-6 font-label text-xs uppercase tracking-[0.3em] text-outline transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary font-bold" 
                                        for="email"
                                    >
                                        Email Address
                                    </label>
                                </div>
                            </div>
                            
                            <div className="relative group">
                                <select 
                                    className="peer w-full bg-transparent border-0 border-b border-outline-variant py-6 focus:ring-0 focus:border-primary outline-none transition-all font-label text-xs uppercase tracking-[0.3em] text-outline font-bold appearance-none cursor-pointer" 
                                    id="service"
                                    required
                                >
                                    <option disabled selected value="">Nature of Inquiry</option>
                                    <option value="engagement">Engagement & Bridal</option>
                                    <option value="heirloom">Heirloom Re-imagining</option>
                                    <option value="statement">One-of-a-kind Statement</option>
                                    <option value="anniversary">Anniversary Commemoration</option>
                                </select>
                                <span className="absolute right-0 top-6 material-symbols-outlined text-outline pointer-events-none group-hover:text-primary transition-colors">expand_more</span>
                            </div>
                            
                            <div className="relative group">
                                <textarea 
                                    className="peer w-full bg-transparent border-0 border-b border-outline-variant py-6 focus:ring-0 focus:border-primary placeholder-transparent outline-none transition-all font-body text-lg text-on-surface italic font-light" 
                                    id="message" 
                                    placeholder=" " 
                                    rows="4"
                                    required
                                ></textarea>
                                <label 
                                    className="absolute left-0 top-6 font-label text-xs uppercase tracking-[0.3em] text-outline transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary font-bold" 
                                    for="message"
                                >
                                    Tell us your vision
                                </label>
                            </div>
                            
                            <div className="text-center pt-12">
                                <button 
                                    className="inline-block bg-primary text-on-primary px-20 py-7 font-label tracking-[0.4em] text-xs uppercase hover:bg-primary-dim transition-all duration-700 ease-out shadow-2xl font-bold" 
                                    type="submit"
                                >
                                    Send Inquiry
                                </button>
                            </div>
                        </motion.form>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Craftsmanship
