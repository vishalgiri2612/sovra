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
    const [activeTab, setActiveTab] = useState('dashboard');

    const [profileName, setProfileName] = useState(userInfo?.name || '');
    const [profileEmail, setProfileEmail] = useState(userInfo?.email || '');
    const [profilePhone, setProfilePhone] = useState(userInfo?.phone || '');
    const [profilePref, setProfilePref] = useState(userInfo?.preference || 'General');

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
                phone: profilePhone,
                preference: profilePref
            });
            const updated = { ...userInfo, ...data };
            localStorage.setItem('userInfo', JSON.stringify(updated));
            setUserInfo(updated);
            refreshProfile();
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return toast.error('Passwords do not match');
        }
        try {
            await api.put('/users/profile', { password: newPassword });
            toast.success('Password updated successfully');
            setPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update password');
        }
    }

    if (!userInfo) return null;

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
        { id: 'orders', label: 'Orders', icon: 'shopping_bag' },
        { id: 'addresses', label: 'Addresses', icon: 'location_on' },
        { id: 'details', label: 'Account Details', icon: 'person' },
        { id: 'wishlist', label: 'Wishlist', icon: 'favorite' },
        { id: 'password', label: 'Change Password', icon: 'lock' },
    ];

    return (
        <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto w-full font-body selection:bg-primary/10">
            {/* Header Area */}
            <header className="mb-20">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#7a7670] mb-4 block font-black"
                >
                    Private Archive
                </motion.span>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#111110]/5 pb-12">
                    <div className="space-y-4">
                        <h1 className="font-premium text-6xl md:text-8xl text-[#111110] italic font-light tracking-tighter leading-none">
                            Studio <span className="not-italic font-normal">Account</span>
                        </h1>
                        <p className="font-body text-base italic text-[#656464] max-w-xl opacity-60">
                            Welcome back, {userInfo.name}. Manage your curated selections, orders, and personal details from your private dashboard.
                        </p>
                    </div>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-20">
                {/* Sidebar Navigation */}
                <aside className="w-full lg:w-72 flex-shrink-0">
                    <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-hidden pb-4 lg:pb-0 scrollbar-hide">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`flex items-center gap-4 px-6 py-4 text-[10px] tracking-[0.3em] uppercase font-black transition-all duration-500 whitespace-nowrap lg:whitespace-normal w-full text-left rounded-sm ${activeTab === item.id
                                        ? 'bg-[#111110] text-white shadow-lux'
                                        : 'text-[#7a7670] hover:bg-[#111110]/5 hover:text-[#111110]'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                        <div className="h-[1px] bg-[#111110]/10 my-4 hidden lg:block" />
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-4 px-6 py-4 text-[10px] tracking-[0.3em] uppercase font-black text-red-500 hover:bg-red-500/5 transition-all w-full text-left"
                        >
                            <span className="material-symbols-outlined text-lg">logout</span>
                            Sign Out
                        </button>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 min-h-[600px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'dashboard' && (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-12"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-[#111110]/2 p-10 border border-[#111110]/5 rounded-sm">
                                        <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#7a7670] font-black block mb-4">Account Portfolio</span>
                                        <h3 className="font-premium text-3xl italic mb-6">Profile Snapshot</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between border-b border-[#111110]/5 pb-3">
                                                <span className="text-[10px] uppercase tracking-widest font-black opacity-40">Client Nomenclature</span>
                                                <span className="text-sm italic">{userInfo.name}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-[#111110]/5 pb-3">
                                                <span className="text-[10px] uppercase tracking-widest font-black opacity-40">Digital Correspondence</span>
                                                <span className="text-sm italic">{userInfo.email}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-[#111110]/5 pb-3">
                                                <span className="text-[10px] uppercase tracking-widest font-black opacity-40">Telephony</span>
                                                <span className="text-sm italic">{userInfo.phone || 'Not Listed'}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-[#111110]/5 pb-3">
                                                <span className="text-[10px] uppercase tracking-widest font-black opacity-40">Status</span>
                                                <span className="text-[10px] uppercase tracking-widest font-black text-primary bg-primary/5 px-3 py-1 rounded-full">{userInfo.status || 'Elite'}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-[#111110]/5 pb-3">
                                                <span className="text-[10px] uppercase tracking-widest font-black opacity-40">Preference</span>
                                                <span className="text-sm italic">{userInfo.preference || 'General'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-primary/5 p-10 border border-primary/10 rounded-sm flex flex-col justify-between">
                                        <div>
                                            <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-primary font-black block mb-4">Active Curations</span>
                                            <h3 className="font-premium text-3xl italic mb-4">The Wishlist</h3>
                                            <p className="text-sm italic opacity-60 mb-6">You have {wishlist.length} masterworks saved in your private archive.</p>
                                        </div>
                                        <button onClick={() => setActiveTab('wishlist')} className="w-full bg-[#111110] text-white py-4 text-[10px] tracking-[0.4em] uppercase font-black hover:opacity-90 transition-all">
                                            View Archive
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white p-10 border border-[#111110]/5 shadow-sm">
                                    <div className="flex justify-between items-center mb-10 border-b border-[#111110]/5 pb-6">
                                        <h3 className="font-premium text-3xl italic">Recent Activity</h3>
                                        <button onClick={() => setActiveTab('orders')} className="text-[10px] uppercase tracking-widest font-black opacity-40 hover:opacity-100 transition-all">View All</button>
                                    </div>
                                    {ordersLoading ? (
                                        <div className="py-20 text-center animate-pulse italic opacity-30">Consulting archives...</div>
                                    ) : myOrders.length === 0 ? (
                                        <div className="py-10 text-center italic opacity-30 text-sm">No acquisitions found in history.</div>
                                    ) : (
                                        <div className="space-y-8">
                                            {myOrders.slice(0, 3).map(order => (
                                                <div key={order._id} className="flex justify-between items-center group cursor-pointer" onClick={() => navigate(`/order/${order._id}`)}>
                                                    <div className="flex gap-6 items-center">
                                                        <div className="w-16 h-16 bg-[#f5f0e8] overflow-hidden rounded-sm">
                                                            <img src={order.orderItems[0]?.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-sm italic leading-none">{order.orderItems[0]?.name}</p>
                                                            <p className="text-[9px] uppercase tracking-widest font-black opacity-40">#{order._id.slice(-6)} • {new Date(order.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                    <span className="font-premium text-xl font-light">${order.totalPrice.toLocaleString()}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'orders' && (
                            <motion.div
                                key="orders"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10"
                            >
                                <h3 className="font-premium text-4xl italic mb-10 border-b border-[#111110]/5 pb-6">Order History</h3>
                                {ordersLoading ? (
                                    <div className="py-40 text-center animate-pulse italic opacity-30">Retrieving records...</div>
                                ) : myOrders.length === 0 ? (
                                    <div className="py-20 text-center italic opacity-30 text-lg">No orders found. Explore our <Link to="/shop" className="underline">archive</Link> for inspiration.</div>
                                ) : (
                                    <div className="space-y-12">
                                        {myOrders.map(order => (
                                            <div key={order._id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 border border-[#111110]/5 hover:shadow-lux transition-all duration-700 bg-white group cursor-pointer" onClick={() => navigate(`/order/${order._id}`)}>
                                                <div className="flex gap-10 items-center">
                                                    <div className="w-32 h-32 bg-[#f5f0e8] overflow-hidden rounded-sm shadow-sm">
                                                        <img src={order.orderItems[0]?.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s]" alt="" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <p className="text-[9px] uppercase tracking-[0.3em] font-black text-primary">Masterwork acquisition</p>
                                                        <h4 className="font-premium text-2xl italic leading-none">{order.orderItems[0]?.name} {order.orderItems.length > 1 && `+ ${order.orderItems.length - 1} pieces`}</h4>
                                                        <div className="flex gap-4 items-center">
                                                            <span className="text-[10px] uppercase tracking-widest font-black opacity-30">#{order._id.slice(-6)}</span>
                                                            <div className="w-1 h-1 bg-[#111110]/20 rounded-full" />
                                                            <span className="text-[10px] uppercase tracking-widest font-black opacity-30">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-3 mt-6 md:mt-0 text-right">
                                                    <p className="font-premium text-3xl font-light">${order.totalPrice.toLocaleString()}</p>
                                                    <span className={`text-[9px] uppercase tracking-[0.4em] font-black px-4 py-2 border ${order.isPaid ? 'border-[#4caf50]/20 text-[#4caf50] bg-[#4caf50]/5' : 'border-red-500/20 text-red-500 bg-red-500/5'
                                                        }`}>
                                                        {order.isPaid ? 'Secured' : 'Awaiting Payment'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'addresses' && (
                            <motion.div
                                key="addresses"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10"
                            >
                                <h3 className="font-premium text-4xl italic mb-10 border-b border-[#111110]/5 pb-6">Shipping Residencies</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="border border-[#111110]/5 p-10 bg-white hover:shadow-lux transition-all duration-700 group">
                                        <span className="text-[10px] uppercase tracking-widest font-black text-primary block mb-6">Primary Residency</span>
                                        <p className="font-premium text-xl italic mb-2">{userInfo.name}</p>
                                        <p className="text-sm italic opacity-60 leading-relaxed">
                                            123 Mayfair Mews, Studio 4A<br />
                                            London, W1J 7BR<br />
                                            United Kingdom
                                        </p>
                                        <div className="mt-10 pt-6 border-t border-[#111110]/5 flex gap-8">
                                            <button className="text-[9px] uppercase tracking-widest font-black opacity-40 hover:opacity-100 hover:text-primary transition-all">Edit Details</button>
                                            <button className="text-[9px] uppercase tracking-widest font-black opacity-40 hover:opacity-100 text-red-500 transition-all">Remove</button>
                                        </div>
                                    </div>
                                    <button className="border border-dashed border-[#111110]/20 p-10 flex flex-col items-center justify-center gap-4 hover:border-primary/40 hover:bg-primary/5 transition-all group">
                                        <span className="material-symbols-outlined text-4xl text-[#111110]/10 group-hover:text-primary/40 transition-all">add_location_alt</span>
                                        <span className="text-[10px] uppercase tracking-[0.3em] font-black opacity-40 group-hover:opacity-100">Add New Destination</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'details' && (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="max-w-2xl"
                            >
                                <h3 className="font-premium text-4xl italic mb-10 border-b border-[#111110]/5 pb-6">Account Details</h3>
                                <form onSubmit={handleUpdateProfile} className="space-y-10">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40">Client Nomenclature</label>
                                        <input
                                            type="text"
                                            value={profileName}
                                            onChange={(e) => setProfileName(e.target.value)}
                                            className="w-full bg-transparent border-b border-[#111110]/10 py-4 font-body text-xl outline-none focus:border-[#111110] italic"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40">Digital Correspondence</label>
                                        <input
                                            type="email"
                                            value={profileEmail}
                                            onChange={(e) => setProfileEmail(e.target.value)}
                                            className="w-full bg-transparent border-b border-[#111110]/10 py-4 font-body text-xl outline-none focus:border-[#111110] italic"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40">Client Telephony</label>
                                        <input
                                            type="tel"
                                            value={profilePhone}
                                            onChange={(e) => setProfilePhone(e.target.value)}
                                            className="w-full bg-transparent border-b border-[#111110]/10 py-4 font-body text-xl outline-none focus:border-[#111110] italic"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40">Curated Interests</label>
                                        <select
                                            value={profilePref}
                                            onChange={(e) => setProfilePref(e.target.value)}
                                            className="w-full bg-transparent border-b border-[#111110]/10 py-4 font-body text-xl outline-none focus:border-[#111110] italic cursor-pointer appearance-none"
                                        >
                                            <option value="General">General Collections</option>
                                            <option value="High Jewellery">High Jewellery Selection</option>
                                            <option value="Timepieces">Horology & Timepieces</option>
                                            <option value="Bespoke">Bespoke Commissions</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-[#111110] text-white px-12 py-5 text-[10px] tracking-[0.5em] uppercase font-black hover:opacity-90 transition-all mt-4"
                                    >
                                        Synchronize Master Changes
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {activeTab === 'wishlist' && (
                            <motion.div
                                key="wishlist"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <div className="flex justify-between items-baseline mb-12 border-b border-[#111110]/5 pb-6">
                                    <h3 className="font-premium text-4xl italic">Private Wishlist</h3>
                                    <span className="text-[10px] uppercase tracking-widest font-black opacity-30 italic">{wishlist.length} Items Saved</span>
                                </div>

                                {wishlist.length === 0 ? (
                                    <div className="py-32 text-center border border-dashed border-[#111110]/10 bg-[#fffcf7]">
                                        <p className="font-premium text-3xl italic opacity-30 mb-8">Your sanctuary is currently empty.</p>
                                        <Link to="/shop" className="text-[10px] uppercase tracking-[0.5em] font-black text-primary border-b border-primary/20 pb-4 inline-block">Explore Collections</Link>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {wishlist.map((item) => (
                                            <div key={item._id} className="group relative h-[450px] overflow-hidden bg-[#f5f0e8] transition-all duration-[1.5s] hover:shadow-lux">
                                                <img
                                                    alt={item.name}
                                                    className="w-full h-full object-cover transition-transform duration-[3s] scale-100 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                                                    src={item.images?.[0] || item.img || item.image}
                                                />
                                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col items-center justify-center p-8 text-center uppercase tracking-[0.3em]">
                                                    <h4 className="text-white font-premium text-2xl italic normal-case mb-4">{item.name || 'Untitled Piece'}</h4>
                                                    <p className="text-white/80 text-[10px] font-black mb-8">${item.price?.toLocaleString() || '0'}</p>
                                                    <button onClick={() => navigate(`/product/${item._id}`)} className="bg-white text-black px-8 py-4 text-[9px] font-black">View Piece</button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromWishlist(item._id)}
                                                    className="absolute top-6 right-6 text-white/40 hover:text-red-500 transition-all z-10"
                                                >
                                                    <span className="material-symbols-outlined text-sm font-bold">close</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'password' && (
                            <motion.div
                                key="password"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="max-w-2xl"
                            >
                                <h3 className="font-premium text-4xl italic mb-10 border-b border-[#111110]/5 pb-6">Security & Vault Access</h3>
                                <form onSubmit={handleChangePassword} className="space-y-10">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40">Previous Authentication</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-transparent border-b border-[#111110]/10 py-4 font-body text-xl outline-none focus:border-[#111110]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40">New Master Password</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full bg-transparent border-b border-[#111110]/10 py-4 font-body text-xl outline-none focus:border-[#111110]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40">Witness Re-entry</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-transparent border-b border-[#111110]/10 py-4 font-body text-xl outline-none focus:border-[#111110]"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-[#111110] text-white px-12 py-5 text-[10px] tracking-[0.5em] uppercase font-black hover:opacity-90 transition-all mt-4"
                                    >
                                        Update Vault Security
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Decorative Background Elements */}
            <div className="fixed top-1/2 right-12 -translate-y-1/2 rotate-90 origin-right pl-20 pointer-events-none opacity-10 hidden 2xl:block">
                <span className="font-sans text-[8px] tracking-[1.5em] uppercase font-black">SOVRA SECURE STUDIO PORTAL</span>
            </div>
        </div>
    )
}

export default Account;
