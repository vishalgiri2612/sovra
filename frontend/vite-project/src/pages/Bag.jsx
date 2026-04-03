import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Bag = () => {
    const [items, setItems] = useState([
        { 
            id: 1, 
            name: "Ethereal Solitaire Ring", 
            price: 2450.00, 
            details: "18k Recycled Yellow Gold, 0.5ct Conflict-Free Diamond. Size: 6.5",
            qty: 1,
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhnNEapNqvup54lBJYOPHSmTcMMPCdrMkBS6VOENzS9BpTSkEA1s-o6WiTqsCiz77M2RRsdY9K47-zLhStw6X5OnxudVYE8Lauy9hCUi5jLO8P5NWecylSkOXLzanuFVsszK19wWIdi0XitNKVwTLzlthnTl-G56XUYooQGU774Dy-SmHV_9qw8ZZ3Nku619pqZJGJ1HiMyLL7ZTVrMpYPlbpykpjq9yVpIDqYxtpnBpxCQnhK74_B7ws5VhkLbhy8du1ufoWjTUPp"
        },
        { 
            id: 2, 
            name: "Luminous Pearl Drops", 
            price: 850.00, 
            details: "Natural Akoya Pearls, 14k Vermeil. Pair.",
            qty: 1,
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNUpAkmODuPG7dwOg5zLxDU1xyXQKYCs_6NPiMzajNMNbEYCkzjlV1Z24UcMaEv1ftMPa3Xqt5JOQgLH8q5GV5_6aalbi_XrwYDth27_n3fSdAuHkagBgMRXOXGdzRM0Mjt6A_hodXcYIMF3OQlIgw2iQKpkY0yFeGMKgWvmSHF0kR8CU_eMOttjrNpGLHTSMSJ6iFfX5pIb4hH0Ih7NqNYXKGBw0VZ3kV3qgUtmEmk6XUQQqxYuDf0XEt_a5ox-N8nje50JKxuPxO"
        }
    ])

    const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0)
    const taxes = subtotal * 0.08
    const total = subtotal + taxes

    const updateQty = (id, delta) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        ))
    }

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id))
    }

    return (
        <div className="pt-40 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto min-h-screen font-body selection:bg-primary-container selection:text-on-primary-container">
            <header className="mb-20">
                <h1 className="font-headline text-5xl md:text-6xl font-light tracking-tight mb-6 italic italic">Your Shopping Bag</h1>
                <p className="text-secondary font-body tracking-[0.25em] uppercase text-[10px] font-bold opacity-60">
                    {items.length} pieces curated for your collection
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                {/* Cart Items List */}
                <section className="lg:col-span-7 space-y-16">
                    {items.map((item, idx) => (
                        <motion.div 
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex flex-col md:flex-row gap-10 pb-16 ${idx > 0 ? 'border-t border-outline-variant/10 pt-16' : ''}`}
                        >
                            <div className="w-full md:w-56 aspect-[3/4] bg-surface-container overflow-hidden group relative shadow-sm">
                                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={item.img} alt={item.name} />
                                <div className="absolute inset-0 bg-surface-container-highest/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                            </div>
                            
                            <div className="flex-1 flex flex-col justify-between py-2">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-3xl font-light tracking-tight italic italic">{item.name}</h3>
                                        <span className="text-xl font-light text-primary">${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <p className="text-secondary text-base leading-relaxed max-w-sm italic opacity-85">{item.details}</p>
                                </div>
                                
                                <div className="flex justify-between items-center mt-12">
                                    <div className="flex items-center space-x-10 border-b border-outline-variant/20 pb-3">
                                        <span className="text-[10px] uppercase tracking-widest text-secondary font-bold opacity-60">Quantity</span>
                                        <div className="flex items-center gap-6">
                                            <button onClick={() => updateQty(item.id, -1)} className="hover:text-primary transition-colors hover:scale-120 duration-300">
                                                <span className="material-symbols-outlined text-sm">remove</span>
                                            </button>
                                            <span className="text-sm font-bold tracking-widest">{item.qty}</span>
                                            <button onClick={() => updateQty(item.id, 1)} className="hover:text-primary transition-colors hover:scale-120 duration-300">
                                                <span className="material-symbols-outlined text-sm">add</span>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={() => removeItem(item.id)}
                                        className="text-[10px] uppercase tracking-[0.25em] text-secondary hover:text-error transition-all flex items-center gap-4 font-bold italic opacity-60 hover:opacity-100"
                                    >
                                        <span className="material-symbols-outlined text-lg">delete</span>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Gift Wrapping Section */}
                    <div className="bg-surface-container p-12 mt-16 shadow-sm border border-outline-variant/5">
                        <div className="flex items-center gap-6 mb-10">
                            <div className="relative flex items-center justify-center">
                                <input 
                                    className="peer h-6 w-6 border-outline border-2 rounded-none bg-transparent checked:bg-primary checked:border-primary appearance-none cursor-pointer transition-all duration-300" 
                                    id="gift_wrap" 
                                    type="checkbox"
                                />
                                <span className="material-symbols-outlined absolute text-on-primary pointer-events-none scale-0 peer-checked:scale-100 transition-transform text-xs font-bold">check</span>
                            </div>
                            <label className="text-xl font-light tracking-tight cursor-pointer italic" htmlFor="gift_wrap">Complementary Gift Wrapping</label>
                        </div>
                        <div className="space-y-6">
                            <label className="block text-[10px] uppercase tracking-[0.3em] text-secondary font-black opacity-60 italic" htmlFor="gift_message">Personalized Message (Optional)</label>
                            <textarea 
                                className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-6 font-body italic resize-none transition-all duration-400 placeholder:text-outline-variant/40 text-lg opacity-80" 
                                id="gift_message" 
                                placeholder="Enter your message here..." 
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                </section>

                {/* Order Summary Sidebar */}
                <aside className="lg:col-span-5 sticky top-36">
                    <div className="bg-surface-container-low p-12 space-y-12 shadow-lux border border-outline-variant/5">
                        <h2 className="font-headline text-4xl font-light tracking-tight italic">Order Summary</h2>
                        <div className="space-y-8">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-secondary uppercase tracking-[0.2em] font-bold opacity-60">Subtotal</span>
                                <span className="font-bold tracking-widest text-primary">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-secondary uppercase tracking-[0.2em] font-bold opacity-60">Shipping</span>
                                <span className="font-black italic text-primary">Complimentary</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-secondary uppercase tracking-[0.2em] font-bold opacity-60">Estimated Taxes</span>
                                <span className="font-bold tracking-widest text-primary">${taxes.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                        
                        <div className="pt-10 border-t border-outline-variant/20">
                            <div className="flex justify-between items-end mb-16">
                                <span className="text-2xl font-light tracking-tight italic">Total</span>
                                <span className="text-4xl text-primary font-light">${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            </div>
                            
                            <button 
                                onClick={() => alert("Redirecting to secure payment gateway...")}
                                className="w-full bg-primary text-on-primary py-7 px-10 flex justify-between items-center group transition-all duration-700 hover:bg-primary-dim hover:pr-14"
                            >
                                <span className="text-[10px] uppercase tracking-[0.4rem] font-black">Proceed to Checkout</span>
                                <span className="material-symbols-outlined group-hover:translate-x-4 transition-transform duration-700">arrow_forward</span>
                            </button>
                            
                            <p className="mt-10 text-[9px] text-center text-secondary uppercase tracking-widest leading-loose font-bold opacity-40 italic">
                                Secure Checkout provided by Sovra.<br/>All transactions are encrypted and private.
                            </p>
                        </div>
                        
                        <div className="bg-surface-container-highest/20 p-8 flex items-start gap-6 border-l-2 border-primary/20">
                            <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest mb-2 italic">Sovra Guarantee</p>
                                <p className="text-[11px] text-secondary leading-relaxed italic opacity-80">Lifetime authenticity guarantee and free professional cleaning for all pieces.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-10 text-center">
                        <Link className="text-[10px] uppercase tracking-[0.3em] text-secondary hover:text-primary transition-all underline underline-offset-[8px] decoration-1 font-bold opacity-60 hover:opacity-100" to="/shop">
                            Continue Shopping
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Bag
