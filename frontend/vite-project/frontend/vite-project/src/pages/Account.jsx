import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { useShop } from '../context/ShopContext'
import api from '../utils/api'

const Account = () => {
    const navigate = useNavigate();
    const { wishlist, removeFromWishlist, refreshProfile } = useShop();
    const [userInfo, setUserInfo] = useState(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null);

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [profileName, setProfileName] = useState(userInfo?.name || '');
    const [profileEmail, setProfileEmail] = useState(userInfo?.email || '');
    const [profilePref, setProfilePref] = useState(userInfo?.preference || 'General');

    const [myOrders, setMyOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);

    useEffect(() => {
        const fetchMyOrders = async () => {
            try {
                setOrdersLoading(true);
                const { data } = await api.get('/orders/myorders');
                setMyOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setOrdersLoading(false);
            }
        };
        fetchMyOrders();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        toast.info('Logged out successfully');
        navigate('/login');
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.put('/users/profile', {
                name: profileName,
                email: profileEmail,
                preference: profilePref
            });

            // Sync with local storage
            const updated = { ...userInfo, ...data };
            localStorage.setItem('userInfo', JSON.stringify(updated));
            setUserInfo(updated);
            refreshProfile();

            toast.success('Profile updated successfully');
            setIsSettingsOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        }
    }

    if (!userInfo) return null;

    return (
        <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto w-full font-body selection:bg-primary-container selection:text-on-primary-container">
            {/* Profile Header Section */}
            <section className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-48 h-48 group shadow-lux cursor-pointer"
                    >
                        <img alt={userInfo.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.name)}&background=fdfaf5&color=6e5b44&size=200`} />
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsSettingsOpen(true)}
                            className="absolute bottom-0 right-0 bg-primary text-on-primary p-3 flex items-center justify-center shadow-lg transform translate-x-2 translate-y-2 hover:bg-primary-dim transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm font-bold">edit</span>
                        </motion.button>
                    </motion.div>

                    <div className="text-center md:text-left space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="font-headline text-5xl md:text-7xl tracking-tight italic underline decoration-primary/10 transition-all font-light"
                        >
                            {userInfo.name}
                        </motion.h1>
                        <p className="font-label text-secondary tracking-[0.4em] uppercase text-[10px] font-black opacity-40">
                            Sovra {userInfo.preference} • Member Since {new Date(userInfo.createdAt || Date.now()).getFullYear()}
                        </p>
                        <div className="mt-6 flex gap-4 justify-center md:justify-start">
                            <span className="font-body text-sm text-on-surface/70 italic">{userInfo.email}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsSettingsOpen(true)}
                        className="bg-primary text-on-primary px-10 py-5 font-label uppercase tracking-[0.3em] text-[10px] font-black transition-all duration-700 hover:bg-primary-dim shadow-sm"
                    >
                        Account Settings
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLogout}
                        className="border border-primary/20 text-primary px-10 py-5 font-label uppercase tracking-[0.3em] text-[10px] font-black transition-all duration-700 hover:bg-primary/5 shadow-sm"
                    >
                        Sign Out
                    </motion.button>
                </div>
            </section>

            {/* Settings Modal */}
            <AnimatePresence>
                {isSettingsOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="bg-white max-w-xl w-full p-12 shadow-lux border border-primary/5"
                        >
                            <div className="flex justify-between items-baseline mb-12">
                                <h2 className="font-headline text-4xl italic">Profile Settings</h2>
                                <button onClick={() => setIsSettingsOpen(false)} className="material-symbols-outlined hover:text-primary transition-colors">close</button>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="font-label text-[10px] uppercase tracking-widest font-black opacity-60">Full Name</label>
                                    <input
                                        type="text"
                                        value={profileName}
                                        onChange={(e) => setProfileName(e.target.value)}
                                        className="w-full bg-transparent border-b border-primary/10 py-3 font-body text-lg outline-none focus:border-primary italic"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label text-[10px] uppercase tracking-widest font-black opacity-60">Email Address</label>
                                    <input
                                        type="email"
                                        value={profileEmail}
                                        onChange={(e) => setProfileEmail(e.target.value)}
                                        className="w-full bg-transparent border-b border-primary/10 py-3 font-body text-lg outline-none focus:border-primary italic"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-label text-[10px] uppercase tracking-widest font-black opacity-60">Interest Preference</label>
                                    <select
                                        value={profilePref}
                                        onChange={(e) => setProfilePref(e.target.value)}
                                        className="w-full bg-transparent border-b border-primary/10 py-3 font-body text-lg outline-none focus:border-primary italic cursor-pointer"
                                    >
                                        <option value="General">General Collections</option>
                                        <option value="High Jewelry">High Jewelry</option>
                                        <option value="Timepieces">Timepieces</option>
                                        <option value="Bespoke">Bespoke Commissions</option>
                                    </select>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-primary text-on-primary py-5 font-label uppercase tracking-[0.3em] text-[10px] font-black mt-8"
                                >
                                    Save Master Changes
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Bento Grid Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                {/* Recent Orders */}
                <div className="md:col-span-8 bg-surface-container-low p-12 shadow-sm border border-outline-variant/10">
                    <div className="flex justify-between items-baseline mb-12 border-b border-outline-variant/10 pb-6">
                        <h2 className="font-headline text-3xl tracking-tight italic">Recent Orders</h2>
                        <button className="font-label text-[10px] uppercase tracking-widest font-black opacity-40 hover:opacity-100 hover:text-primary transition-all">Archive</button>
                    </div>

                    <div className="space-y-12">
                        {ordersLoading ? (
                            <p className="font-headline text-xl italic opacity-30">Consulting archives...</p>
                        ) : myOrders.length === 0 ? (
                            <div className="py-10 text-center opacity-30 font-headline text-lg italic">
                                <p>No curations found in your history.</p>
                                <Link to="/shop" className="mt-4 inline-block font-label text-[9px] uppercase tracking-widest underline underline-offset-4">Begin Curation</Link>
                            </div>
                        ) : (
                            myOrders.map(order => (
                                <div key={order._id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group">
                                    <div
                                        className="flex gap-8 items-center cursor-pointer"
                                        onClick={() => navigate(`/order/${order._id}`)}
                                    >
                                        <div className="w-28 h-28 bg-surface-variant overflow-hidden shadow-sm">
                                            <img
                                                alt={order.orderItems[0]?.name}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                                src={order.orderItems[0]?.image || 'https://via.placeholder.com/150'}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="font-label text-[9px] text-primary tracking-[0.25em] font-black uppercase mb-1">Order #{order._id.slice(-6)}</p>
                                            <h3 className="font-headline text-xl italic font-light group-hover:text-primary transition-colors">
                                                {order.orderItems[0]?.name} {order.orderItems.length > 1 && `+ ${order.orderItems.length - 1} more`}
                                            </h3>
                                            <p className="font-body text-[11px] text-on-surface/40 uppercase tracking-widest font-bold">
                                                {order.status} • {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-3 text-right">
                                        <p className="font-headline text-2xl font-light">${order.totalPrice.toLocaleString()}</p>
                                        <span className={`text-[9px] uppercase tracking-widest font-black px-2 py-1 ${order.isPaid ? 'text-[#4caf50] bg-[#4caf50]/10' : 'text-error bg-error/10'}`}>
                                            {order.isPaid ? 'Secured' : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Profile Overview Side */}
                <div className="md:col-span-4 space-y-12">
                    <div className="bg-surface-container p-12 shadow-sm border border-outline-variant/10 h-full flex flex-col justify-between">
                        <div>
                            <h2 className="font-headline text-2xl tracking-tight italic mb-10 border-b border-black/5 pb-4">Concierge Level</h2>
                            <div className="font-body text-base space-y-3 text-on-surface/70 italic leading-relaxed">
                                <p className="font-bold uppercase tracking-widest text-[10px] text-primary not-italic">Level: {userInfo.status}</p>
                                <p>Personal Shopper: Assigning...</p>
                                <p>Priority: High</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ x: 5 }}
                            onClick={() => setIsSettingsOpen(true)}
                            className="mt-10 self-start font-label text-[9px] uppercase tracking-[0.3em] font-black border-b border-on-surface/20 hover:border-primary transition-colors pb-1"
                        >
                            Update Preferences
                        </motion.button>
                    </div>

                    <div className="bg-surface-container p-12 shadow-sm border border-outline-variant/10 h-full flex flex-col justify-between">
                        <div>
                            <h2 className="font-headline text-2xl tracking-tight italic mb-10 border-b border-black/5 pb-4">Payment Methods</h2>
                            <p className="font-body text-sm italic opacity-50">Locked for security.</p>
                        </div>
                        <motion.button
                            whileHover={{ x: 5 }}
                            className="mt-10 self-start font-label text-[9px] uppercase tracking-[0.3em] font-black border-b border-on-surface/20 hover:border-primary transition-colors pb-1"
                        >
                            Manage Vault
                        </motion.button>
                    </div>
                </div>

                {/* Wishlist */}
                <div className="md:col-span-12 mt-12">
                    <div className="flex justify-between items-baseline mb-16 border-b border-outline-variant/10 pb-8">
                        <h2 className="font-headline text-5xl tracking-tight font-light italic underline decoration-primary/5">The SOVRA Wishlist</h2>
                        <span className="font-body text-[10px] uppercase tracking-[0.4em] font-black italic opacity-40">{wishlist.length} Masterworks Saved</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 min-h-[400px]">
                        <AnimatePresence>
                            {wishlist.map((item) => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="relative group overflow-hidden shadow-sm h-[500px]"
                                >
                                    <img alt={item.name} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" src={item.images?.[0] || 'https://via.placeholder.com/500'} />
                                    <div className="veil-overlay absolute inset-0 flex flex-col items-center justify-center text-on-surface bg-black/10 opacity-0 group-hover:opacity-100 transition-all">
                                        <h3 className="font-headline text-2xl mb-4 italic text-white">{item.name}</h3>
                                        <p className="font-body text-xl mb-10 italic text-white/90">${item.price}</p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => navigate(`/product/${item._id}`)}
                                            className="bg-white text-black px-10 py-5 font-label text-[10px] uppercase tracking-[0.3em] font-black"
                                        >
                                            View Piece
                                        </motion.button>
                                    </div>
                                    <motion.button
                                        whileHover={{ rotate: 90, scale: 1.2 }}
                                        onClick={() => removeFromWishlist(item._id)}
                                        className="absolute top-8 right-8 text-white hover:text-error transition-all z-20"
                                    >
                                        <span className="material-symbols-outlined font-bold">close</span>
                                    </motion.button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {wishlist.length === 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-32 text-center border border-dashed border-primary/10">
                                <p className="font-headline text-3xl italic opacity-30 mb-6">Your curations are waiting.</p>
                                <Link to="/shop" className="font-label text-[10px] uppercase tracking-widest underline underline-offset-8">Explore Collections</Link>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account
