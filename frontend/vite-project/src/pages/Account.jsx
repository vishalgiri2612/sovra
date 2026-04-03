import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Account = () => {
    const [wishlist, setWishlist] = useState([
        { id: 1, name: "L'Aube Solitaire", price: "$4,200", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCU6cPjrkW2-8npFq9bV9zi6FMMx8ckG_yRRdvnxvqtgmoFRgGGCkFv_meAR3kC1tn3ndhoqfA4Sh1aq9dMh7fx_zoy81NzSzLn0bkT1FBTcZhAoKLaI0qzX55bm0NX3rpj7yKnfsc1jCvPneVCMAZiqhH5Izv9RrnOEUrI3OB5zzfyaBh9CFHAxDkw75B0pFFcUJHFxcSdVz_hyNOMxmmdaFuAbQOhKeFxbUSaS2dcJOwrujQiIjJVgIUqOusEpc5_MiTI3H9vsz_P", hero: true },
        { id: 2, name: "Aura Link", price: "$1,850", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxNlot9HyqSqwqOjUX8eMAUytJ2BYf6vdJXKepbSV_dxf-u4zBLqAc4nWFKscNXSAySf7Y3gd20Jnu5KAOa5uYBcyIE56OJxOccGkWsRvAMsbbVWMxI26dIrPAFT-xNGr4uThPbemekOsRqc0zXElxRh_I0dOo3KJpw2Bm4jTz3qsCxvPaiSvURGsNhxZzOYaa_fI62vUQ9h2vX-A3Ul-CCFKTGtOHXyql17ulAAbLoJEziTZK22u3tIHuX887jXgFxzgpTbu56J5t" },
        { id: 3, name: "Petite Hoops", price: "$450", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDy82uhb-e81m2ZdHXGz0cR-hTJ0zyUjewJg0MbGY_GM4IrwAh13ta2OB1agqjxOHKMijq7ooPz85C6RNgIQPz4hhyfsbaArDZCJETQizl3OcJszuFFwJexRKeefA2iSOnorc4T7yuzy5BcJHbMgOMYh4uEhivP5QArKdVY3ZD5k0ml3hhoNNgD0tLnTChbpFR5i7Xa1A9PHgxmTJi34Vqn7elmCvCBoLBZ77szoGSm7jc4miRXT9e70wwstKTUbJsrai6B4baCDkOD" }
    ])

    const handleAction = (label) => {
        console.log(`Action triggered: ${label}`)
        alert(`${label} action initiated for Julianne Vora.`);
    }

    const removeFromWishlist = (id) => {
        setWishlist(wishlist.filter(item => item.id !== id))
    }

    return (
        <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto w-full font-body selection:bg-primary-container selection:text-on-primary-container">
            {/* Profile Header Section */}
            <section className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-48 h-48 group shadow-lux cursor-pointer"
                        onClick={() => handleAction('Change Avatar')}
                    >
                        <img alt="Julianne Vora" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDLgqOYpy1kex3OEj3kddtBRqTY4b3tHe-uK667J1bH_Eo8JiR2I010B54bxgBtf7gFyuenTuX3ay3_5VLnwTzyAj7oH9TwhsII6A6vJBAI7gCAjAxzNroYZd1_yjl0wR9C2d7y41fvnbO64zipYsWl2sI18lBnZ2C6KyVlZI3Ir-PZbuXvoGrhh_ybis7FELowzmGYrA1OVGgL3KM_noY_DH_6St1-Y8fmazUhmzvfBdX4XgDmglyXMw1tE2sln7gh2dLbOw4mUyV" />
                        <motion.button 
                            whileTap={{ scale: 0.9 }}
                            className="absolute bottom-0 right-0 bg-primary text-on-primary p-3 flex items-center justify-center shadow-lg transform translate-x-2 translate-y-2 hover:bg-primary-dim transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm font-bold">edit</span>
                        </motion.button>
                    </motion.div>
                    
                    <div className="text-center md:text-left space-y-4">
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="font-headline text-5xl md:text-7xl tracking-tight italic italic underline decoration-primary/10 transition-all font-light"
                        >
                            Julianne Vora
                        </motion.h1>
                        <p className="font-label text-secondary tracking-[0.4em] uppercase text-[10px] font-black opacity-40">Sovra Member Since 2022</p>
                        <div className="mt-6 flex gap-4 justify-center md:justify-start">
                            <span className="font-body text-sm text-on-surface/70 italic">julianne.v@sovra.com</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-6">
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAction('Edit Profile')}
                        className="bg-primary text-on-primary px-10 py-5 font-label uppercase tracking-[0.3em] text-[10px] font-black transition-all duration-700 hover:bg-primary-dim shadow-sm"
                    >
                        Edit Profile
                    </motion.button>
                </div>
            </section>

            {/* Bento Grid Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                
                {/* Recent Orders (Large Span) */}
                <div className="md:col-span-8 bg-surface-container-low p-12 shadow-sm border border-outline-variant/10">
                    <div className="flex justify-between items-baseline mb-12 border-b border-outline-variant/10 pb-6">
                        <h2 className="font-headline text-3xl tracking-tight italic">Recent Orders</h2>
                        <button onClick={() => handleAction('View All Orders')} className="font-label text-[10px] uppercase tracking-widest font-black opacity-40 hover:opacity-100 hover:text-primary transition-all">View All</button>
                    </div>
                    
                    <div className="space-y-12">
                        {/* Order 1 */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group">
                            <div className="flex gap-8 items-center cursor-pointer" onClick={() => handleAction('View Order #88291')}>
                                <div className="w-28 h-28 bg-surface-variant overflow-hidden shadow-sm">
                                    <img alt="Ethereal Band" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5d9EZziKe0Ttlq7_xGCRT8gY2JzCwNSJ69gl87BIqnO6BRp6huNYJZF2z6dvdOvAmefjJDUSIN6tCanfQxWXDD7eODKJu1yRHl17RW21a1RUJti3DSAJYItrFFqDPDEtd19xyakQxKwQk5cwbhAUcjfx_W2_ImhWF8D_fUP-P7HXruHEOKNxMHdHsn798tF11rBswDco-4oJ5BjOVL0vkmRT8Gi5vWD811Vu5MGhgkA3RiAhALV3_HLHXs2B6pdQmH58YV_zzBxmq" />
                                </div>
                                <div className="space-y-2">
                                    <p className="font-label text-[9px] text-primary tracking-[0.25em] font-black uppercase mb-1">Order #88291</p>
                                    <h3 className="font-headline text-xl italic font-light group-hover:text-primary transition-colors">Ethereal Band in 18k Gold</h3>
                                    <p className="font-body text-[11px] text-on-surface/40 uppercase tracking-widest font-bold font-bold">Delivered • Oct 14, 2023</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                <p className="font-headline text-2xl font-light">$1,250</p>
                                <motion.button 
                                    whileHover={{ x: 3 }}
                                    onClick={() => handleAction('Track Order #88291')}
                                    className="text-[9px] uppercase tracking-[0.2em] font-black flex items-center gap-3 opacity-40 hover:opacity-100 group-hover:text-primary transition-all"
                                >
                                    <span className="material-symbols-outlined text-sm">local_shipping</span>
                                    Track Order
                                </motion.button>
                            </div>
                        </div>

                        {/* Order 2 */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group pt-12 border-t border-outline-variant/10">
                            <div className="flex gap-8 items-center cursor-pointer" onClick={() => handleAction('View Order #88104')}>
                                <div className="w-28 h-28 bg-surface-variant overflow-hidden shadow-sm">
                                    <img alt="Celestial Drop Earrings" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbhzhBhzgtYquljs_6huPLr52PPsvgFZOfENhx00JK-jpwSuHXfHI1qTowZOVDJr7ZS7VhM2WKeA70ZqlRFuZSbUIhMIXF0fH3_USftpE9rK5UDx3Nkglls92wr628La15SN5MlbpzJxOIjJTFBdf_BiHpAPDtq8o4Hf48FfzDhn7gKrk9JJJl_Aqapqvnsi8HNMOqCUKQgRSE493w34SqRkR-gcjb1z6086ReD1sFhy1gqfRVMX5mOQuCGI_k9AdBeIjAiZvK9vbk" />
                                </div>
                                <div className="space-y-2">
                                    <p className="font-label text-[9px] text-primary tracking-[0.25em] font-black uppercase mb-1">Order #88104</p>
                                    <h3 className="font-headline text-xl italic font-light group-hover:text-primary transition-colors">Celestial Drop Earrings</h3>
                                    <p className="font-body text-[11px] text-on-surface/40 uppercase tracking-widest font-bold font-bold">In Transit • Nov 02, 2023</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                <p className="font-headline text-2xl font-light">$890</p>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => handleAction('View Processing Info')}
                                    className="text-[9px] uppercase tracking-[0.2em] font-black flex items-center gap-3 text-primary animate-pulse"
                                >
                                    <span className="material-symbols-outlined text-sm">sync</span>
                                    Processing
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Overview Side (Small Span) */}
                <div className="md:col-span-4 space-y-12">
                    {/* Quick Info */}
                    <div className="bg-surface-container p-12 shadow-sm border border-outline-variant/10 h-full flex flex-col justify-between">
                        <div>
                            <h2 className="font-headline text-2xl tracking-tight italic mb-10 border-b border-black/5 pb-4">Shipping Address</h2>
                            <div className="font-body text-base space-y-3 text-on-surface/70 italic leading-relaxed">
                                <p className="font-bold uppercase tracking-widest text-[10px] text-primary not-italic">Julianne Vora</p>
                                <p>1280 Lexington Avenue</p>
                                <p>Suite 4B</p>
                                <p>New York, NY 10028</p>
                                <p>United States</p>
                            </div>
                        </div>
                        <motion.button 
                            whileHover={{ x: 5 }}
                            onClick={() => handleAction('Edit Shipping Address')}
                            className="mt-10 self-start font-label text-[9px] uppercase tracking-[0.3em] font-black border-b border-on-surface/20 hover:border-primary transition-colors pb-1"
                        >
                            Edit Address
                        </motion.button>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-surface-container p-12 shadow-sm border border-outline-variant/10 h-full flex flex-col justify-between">
                        <div>
                            <h2 className="font-headline text-2xl tracking-tight italic mb-10 border-b border-black/5 pb-4">Payment Methods</h2>
                            <div className="flex items-center gap-6 group cursor-pointer" onClick={() => handleAction('Switch Default Payment')}>
                                <div className="w-14 h-10 bg-on-surface flex items-center justify-center text-surface text-[9px] tracking-[0.3em] font-black group-hover:bg-primary transition-colors">VISA</div>
                                <div>
                                    <p className="font-headline text-lg font-light italic">Visa ending in 4492</p>
                                    <p className="font-body text-[10px] uppercase tracking-widest font-black opacity-30 mt-1">Expires 08/26</p>
                                </div>
                            </div>
                        </div>
                        <motion.button 
                            whileHover={{ x: 5 }}
                            onClick={() => handleAction('Manage Payment Methods')}
                            className="mt-10 self-start font-label text-[9px] uppercase tracking-[0.3em] font-black border-b border-on-surface/20 hover:border-primary transition-colors pb-1"
                        >
                            Manage Payment
                        </motion.button>
                    </div>
                </div>

                {/* Wishlist (Full Width Editorial) */}
                <div className="md:col-span-12 mt-12">
                    <div className="flex justify-between items-baseline mb-16 border-b border-outline-variant/10 pb-8">
                        <h2 className="font-headline text-5xl tracking-tight font-light italic italic underline decoration-primary/5">The Wishlist</h2>
                        <span className="font-body text-[10px] uppercase tracking-[0.4em] font-black italic opacity-40">{wishlist.length} Items Saved</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 min-h-[550px]">
                        <AnimatePresence>
                            {wishlist.map((item, idx) => (
                                <motion.div 
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5 }}
                                    className={`${item.hero ? 'md:col-span-2' : ''} relative group overflow-hidden shadow-sm h-[550px]`}
                                >
                                    <img alt={item.name} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" src={item.img} />
                                    <div className="veil-overlay absolute inset-0 flex flex-col items-center justify-center text-on-surface">
                                        <h3 className={`font-headline ${item.hero ? 'text-3xl' : 'text-2xl'} mb-4 italic italic`}>{item.name}</h3>
                                        <p className="font-body text-xl mb-10 italic opacity-85">{item.price}</p>
                                        <motion.button 
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleAction(`Moving ${item.name} to Bag`)}
                                            className="bg-primary text-on-primary px-10 py-5 font-label text-[10px] uppercase tracking-[0.3em] font-black shadow-lux"
                                        >
                                            Move to Bag
                                        </motion.button>
                                    </div>
                                    <motion.button 
                                        whileHover={{ rotate: 90, scale: 1.2 }}
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="absolute top-8 right-8 text-on-surface-variant hover:text-error transition-all z-20"
                                    >
                                        <span className="material-symbols-outlined font-bold">close</span>
                                    </motion.button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {wishlist.length === 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center italic opacity-40">
                                Your wishlist is currently empty.
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account
