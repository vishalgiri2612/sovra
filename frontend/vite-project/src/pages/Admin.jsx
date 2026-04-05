import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import api from '../utils/api'

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [orderSearch, setOrderSearch] = useState('')
    const [orderFilter, setOrderFilter] = useState('All')
    const [loading, setLoading] = useState(true)

    // Inventory CRUD States
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [currentProduct, setCurrentProduct] = useState({
        name: '',
        category: 'Necklaces',
        price: '',
        details: '',
        material: 'Stainless Steel',
        plating: 'Gold 18K PVD Plating',
        stone: 'Natural',
        length: '46 cm',
        weight: '6g',
        features: ['Sweatproof', 'Anti Tarnish', 'Water proof', 'Hypoallergenic'],
        stock: 0,
        img: '',
        hero: false
    })
    const [uploading, setUploading] = useState(false)

<<<<<<< HEAD
    // Real Data States
    const [stats, setStats] = useState({
        totalRevenue: '₹0',
        totalOrders: 0,
        activeBespoke: 0,
        totalUsers: 0
    })
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [customers, setCustomers] = useState([])
    const [bespokeRequests, setBespokeRequests] = useState([])
    const [revenueData, setRevenueData] = useState([])
=======
    const [orders] = useState([
        { id: "#ORD-88291", customer: "Julianne Vora", email: "j.vora@luxury.com", items: "Ethereal Band", total: "$1,250", status: "Delivered", date: "Oct 14, 2023" },
        { id: "#ORD-88104", customer: "Julianne Vora", email: "j.vora@luxury.com", items: "Celestial Drop Earrings", total: "$890", status: "Shipped", date: "Nov 02, 2023" },
        { id: "#ORD-88542", customer: "Mark Sterling", email: "mark.s@finance.com", items: "L'Aube Pendant", total: "$4,200", status: "Pending", date: "Dec 12, 2023" },
        { id: "#ORD-88901", customer: "Elena Rossi", email: "elena@SOVRA.it", items: "Solitude Ring", total: "$2,450", status: "Processing", date: "Jan 05, 2024" }
    ])
>>>>>>> 5203ea7c9517ac06d4a13393e6762ec8b1438799

    // Data Fetching Central
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                setLoading(true)
                const [statsRes, productsRes, ordersRes, usersRes, revenueRes, bespokeRes] = await Promise.all([
                    api.get('/analytics/stats'),
                    api.get('/products'),
                    api.get('/orders'),
                    api.get('/users'),
                    api.get('/analytics/revenue'),
                    api.get('/bespoke')
                ])

<<<<<<< HEAD
                setStats(statsRes.data)
                setProducts(productsRes.data)
                setOrders(ordersRes.data)
                setCustomers(usersRes.data)
                setBespokeRequests(bespokeRes.data)
=======
    const [customers] = useState([
        { id: 1, name: "Julianne Vora", email: "j.vora@luxury.com", orders: 12, spend: "$45,200", preference: "High Jewelry", status: "VIP" },
        { id: 2, name: "Mark Sterling", email: "mark.s@finance.com", orders: 4, spend: "$12,800", preference: "Timepieces", status: "Regular" },
        { id: 3, name: "Elena Rossi", email: "elena@SOVRA.it", orders: 1, spend: "$8,500", preference: "Bespoke", status: "New" }
    ])
>>>>>>> 5203ea7c9517ac06d4a13393e6762ec8b1438799

                // Map revenue data for the chart
                const fullYear = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, revenue: 0 }))
                revenueRes.data.forEach(item => {
                    const index = fullYear.findIndex(f => f.month === item._id)
                    if (index !== -1) fullYear[index].revenue = item.revenue
                })
                setRevenueData(fullYear)

            } catch (error) {
                console.error('Fetch admin data failed:', error)
                toast.error('SOVRA archives are temporarily unreachable.')
            } finally {
                setLoading(false)
            }
        }
        fetchAdminData()
    }, [activeTab])

    const handleUpdateOrderStatus = async (id, status) => {
        try {
            if (status === 'Delivered') {
                await api.put(`/orders/${id}/deliver`)
            } else if (status === 'Processing') {
                await api.put(`/orders/${id}/pay`) // Simplified
            } else {
                toast.warn('Status transition not yet artisanal.')
                return;
            }
            toast.success('Ledger updated.');
            // Refresh orders
            const { data } = await api.get('/orders')
            setOrders(data)
        } catch (error) {
            toast.error('Update failed.')
        }
    }

    const handleAddProduct = () => {
        setEditMode(false)
        setCurrentProduct({
            name: '',
            category: 'Necklaces',
            price: '',
            details: '',
            material: 'Stainless Steel',
            plating: 'Gold 18K PVD Plating',
            stone: 'Natural',
            length: '46 cm',
            weight: '6g',
            features: ['Sweatproof', 'Anti Tarnish', 'Water proof', 'Hypoallergenic'],
            stock: 0,
            img: '',
            hero: false
        })
        setIsModalOpen(true)
    }

    const handleEditProduct = (product) => {
        setEditMode(true)
        setCurrentProduct(product)
        setIsModalOpen(true)
    }

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you certain you wish to remove this masterpiece from the archive? This action is irreversible.')) {
            try {
                await api.delete(`/products/${id}`)
                toast.success('Piece removed from archival.')
                setProducts(products.filter(p => p._id !== id))
            } catch (error) {
                toast.error('Deletion failed.')
            }
        }
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const formData = new FormData()
        formData.append('image', file)

        try {
            setUploading(true)
            const { data } = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            setCurrentProduct({ ...currentProduct, img: data.url })
            toast.success('Image secure in Cloudinary archives.')
        } catch (error) {
            toast.error('Upload failed.')
        } finally {
            setUploading(false)
        }
    }

    const handleSaveProduct = async (e) => {
        e.preventDefault()
        try {
            if (editMode) {
                const { data } = await api.put(`/products/${currentProduct._id}`, currentProduct)
                setProducts(products.map(p => p._id === data._id ? data : p))
                toast.success('Masterpiece refined.')
            } else {
                const { data } = await api.post('/products', currentProduct)
                setProducts([data, ...products])
                toast.success('New Piece cataloged.')
            }
            setIsModalOpen(true); // Temporary keeping open for feedback or just close
            setIsModalOpen(false)
        } catch (error) {
            toast.error('Saving failed.')
        }
    }

    const handleAction = (label) => {
        alert(`${label} simulation initiated.`);
    }

    const renderDashboard = () => (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                {[
                    { label: "Total Revenue", value: stats.totalRevenue, icon: "payments", trend: "+12.5%" },
                    { label: "Total Orders", value: stats.totalOrders, icon: "order_approve", trend: "+4.2%" },
                    { label: "Active Clients", value: stats.totalUsers, icon: "diamond", trend: "High Value" },
                    { label: "Material Alerts", value: `${stats.criticalMaterials} Critical`, icon: "warning", trend: "Action Required" }
                ].map((stat) => (
                    <div key={stat.label} className="bg-surface-container-low p-12 shadow-sm border border-outline-variant/10 group hover:border-primary/40 transition-all duration-700">
                        <div className="flex justify-between items-start mb-8">
                            <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">{stat.icon}</span>
                            <span className="font-label text-[10px] text-primary font-black">{stat.trend}</span>
                        </div>
                        <p className="font-label text-[11px] uppercase tracking-[0.25em] text-secondary mb-4 font-black opacity-60">{stat.label}</p>
                        <h3 className="font-headline text-4xl italic font-light tracking-tight">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8 bg-surface-container-low p-16 border border-outline-variant/10 shadow-sm">
                    <h2 className="font-headline text-3xl italic mb-12 border-b border-black/5 pb-6">Revenue Performance</h2>
                    <div className="h-80 flex items-end gap-1 px-6">
                        {revenueData.map((item, i) => {
                            const maxHeight = Math.max(...revenueData.map(d => d.revenue)) || 1
                            const hRatio = (item.revenue / maxHeight) * 100
                            return (
                                <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${hRatio || 2}%` }} transition={{ delay: i * 0.05, duration: 1 }} className="flex-1 bg-primary/20 hover:bg-primary transition-colors cursor-help group relative">
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-label text-[10px] font-black">${item.revenue.toLocaleString()}</span>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
                <div className="lg:col-span-4 bg-surface-container-low p-16 border border-outline-variant/10 shadow-sm">
                    <h2 className="font-headline text-3xl italic mb-12 border-b border-black/5 pb-6">System Status</h2>
                    <div className="space-y-8">
                        <p className="font-body text-sm opacity-40 italic font-black uppercase tracking-widest text-primary text-center py-20 animate-pulse">All systems are secure.</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )



    const renderCustomers = () => (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-20">
            <section className="space-y-12">
                <h3 className="font-label text-[11px] tracking-[0.5em] uppercase font-black text-primary italic border-b border-primary/10 pb-6">SOVRA Client Registry</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {customers.map(c => (
                        <div key={c._id} className="bg-surface-container-low p-12 border border-outline-variant/10 group hover:border-primary/30 transition-all hover:shadow-lux">
                            <div className="flex justify-between mb-8">
                                <span className={`px-4 py-2 text-[8px] uppercase tracking-[0.25em] font-black ${c.status === 'VIP' ? 'bg-primary text-on-primary' : 'bg-outline-variant/10'}`}>{c.status}</span>
                                <span className="font-label text-[10px] font-black opacity-40">ClientID #{c._id.slice(-6)}</span>
                            </div>
                            <h4 className="font-headline text-3xl italic font-light group-hover:text-primary transition-colors mb-2">{c.name}</h4>
                            <p className="font-body text-[12px] opacity-60 mb-12 italic">{c.email}</p>
                            <div className="grid grid-cols-2 gap-8 border-t border-black/5 pt-8">
                                <div>
                                    <p className="font-label text-[9px] uppercase opacity-40 font-black tracking-widest">Total Spent</p>
                                    <p className="font-headline text-xl italic mt-2">₹{c.spend?.toLocaleString() || 0}</p>
                                </div>
                                <div>
                                    <p className="font-label text-[9px] uppercase opacity-40 font-black tracking-widest">Preference</p>
                                    <p className="font-body text-[11px] font-black mt-2">{c.preference}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-16 bg-surface-container/30 p-16 border border-outline-variant/10 shadow-lux-sm">
                <div className="flex justify-between items-baseline border-b border-outline-variant/10 pb-8">
                    <h3 className="font-headline text-4xl italic font-light">Bespoke Concierge</h3>
                    <p className="font-label text-[11px] uppercase tracking-[0.4em] opacity-40 font-black italic">{bespokeRequests.length} Active Consultations</p>
                </div>
                <div className="space-y-8">
                    {bespokeRequests.map(r => (
                        <div key={r._id} className="bg-white/40 dark:bg-black/20 p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 group hover:bg-white/60 transition-all">
                            <div>
                                <p className="font-label text-[10px] text-primary tracking-[0.3em] font-black uppercase mb-3">Req #{r._id.slice(-6)}</p>
                                <h4 className="font-headline text-2xl italic group-hover:translate-x-2 transition-transform">{r.concept}</h4>
<<<<<<< HEAD
                                <p className="font-body text-[12px] opacity-60 font-black mt-2">SOVRA Client: {r.clientName || r.client?.name} • Target Deadline: {r.deadline}</p>
=======
                                <p className="font-body text-[12px] opacity-60 font-black mt-2">SOVRA Client: {r.client} • Target Deadline: {r.deadline}</p>
>>>>>>> 5203ea7c9517ac06d4a13393e6762ec8b1438799
                            </div>
                            <div className="flex flex-wrap items-center gap-12 w-full lg:w-auto">
                                <div className="text-right">
                                    <p className="font-label text-[9px] uppercase opacity-40 font-black tracking-widest">Target Budget</p>
                                    <p className="font-body text-sm font-black mt-1">₹{r.budget}</p>
                                </div>
                                <span className="px-8 py-4 border border-primary/20 text-primary font-label text-[10px] uppercase tracking-[0.25em] font-black">{r.status}</span>
                                <button onClick={() => handleAction('Open Design File')} className="material-symbols-outlined text-outline hover:text-primary transition-all hover:scale-125">palette</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </motion.div>
    )

    const renderAnalytics = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-24">
            <div className="flex flex-col md:flex-row justify-between items-baseline border-b border-outline-variant/10 pb-12 gap-8">
                <div>
                    <h2 className="font-headline text-6xl italic font-light tracking-tight">Performance Analytics</h2>
                    <p className="font-label text-[11px] uppercase tracking-[0.4em] font-black opacity-40 mt-6 italic">Deep insights into your packaging lab throughput.</p>
                </div>
                <div className="flex gap-4">
                    {['Daily', 'Monthly', 'Yearly'].map(period => (
                        <button key={period} className="px-10 py-3 border border-outline-variant/20 font-label text-[10px] uppercase tracking-[0.2em] font-black hover:bg-primary hover:text-on-primary transition-all">{period}</button>
                    ))}
                </div>
            </div>

            {/* Packaging Lab Throughput Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-8">
                {[
                    { label: "Total Users", value: stats.totalUsers },
                    { label: "Total Orders", value: stats.totalOrders },
                    { label: "Gross Rev", value: stats.totalRevenue },
                    { label: "Active Bespoke", value: stats.activeBespoke },
                    { label: "Growth Index", value: "84.2%" },
                    { label: "Avg Spend", value: `₹${(parseFloat(stats.totalRevenue?.replace(/[^0-9.]/g, '') || 0) / (stats.totalOrders || 1)).toFixed(2)}` },
                    { label: "Fulfillment", value: "98.4%" }
                ].map((kpi) => (
                    <div key={kpi.label} className="bg-surface-container-low p-10 border border-outline-variant/10 shadow-sm text-center group hover:bg-primary transition-all duration-700">
                        <p className="font-label text-[9px] uppercase tracking-[0.2em] font-black opacity-40 mb-4 group-hover:text-on-primary group-hover:opacity-100">{kpi.label}</p>
                        <h4 className="font-headline text-2xl italic font-light group-hover:text-on-primary">{kpi.value}</h4>
                    </div>
                ))}
            </div>

            {/* Growth Velocity Graph */}
            <div className="bg-surface-container-low p-16 border border-outline-variant/10 shadow-lux">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
                    <h3 className="font-headline text-4xl italic font-light">Growth Velocity</h3>
                    <span className="font-label text-[11px] uppercase tracking-[0.3em] text-primary font-black italic">Commercial Momentum: +18.4% YoY</span>
                </div>
                <div className="relative h-96 w-full overflow-hidden px-8">
                    <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <motion.path
                            initial={{ d: "M0 300 L0 250 L100 250 L200 250 L300 250 L400 250 L500 250 L600 250 L700 250 L800 250 L900 250 L1000 250 L1000 300 Z" }}
                            animate={{ d: "M0 300 L0 240 L100 220 L200 250 L300 180 L400 190 L500 120 L600 140 L700 80 L800 100 L900 40 L1000 60 L1000 300 Z" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            fill="url(#gradient)"
                        />
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                            d="M0 240 L100 220 L200 250 L300 180 L400 190 L500 120 L600 140 L700 80 L800 100 L900 40 L1000 60"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-primary opacity-80"
                        />
                        {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((x, i) => {
                            const ys = [240, 220, 250, 180, 190, 120, 140, 80, 100, 40, 60];
                            return (
                                <motion.circle
                                    key={i}
                                    initial={{ opacity: 0, r: 0 }}
                                    animate={{ opacity: 1, r: 5 }}
                                    transition={{ delay: 1.5 + i * 0.1 }}
                                    cx={x}
                                    cy={ys[i]}
                                    className="fill-primary"
                                />
                            );
                        })}
                    </svg>
                    <div className="flex justify-between mt-12 font-label text-[10px] uppercase opacity-40 font-black border-t border-black/5 pt-6 tracking-widest">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                            <span key={m}>{m}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="bg-surface-container-low p-16 border border-outline-variant/10 shadow-lux">
                    <h3 className="font-headline text-3xl italic mb-12">Collection Comparison</h3>
                    <div className="space-y-12">
                        {[
                            { name: 'Necklaces', value: 45, color: 'bg-primary' },
                            { name: 'Rings', value: 30, color: 'bg-secondary' },
                            { name: 'Bracelets', value: 25, color: 'bg-outline' }
                        ].map(c => (
                            <div key={c.name} className="space-y-6">
                                <div className="flex justify-between font-label text-[11px] uppercase font-black opacity-60 tracking-widest">
                                    <span>{c.name}</span>
                                    <span>{c.value}%</span>
                                </div>
                                <div className="h-2 bg-surface-container overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${c.value}%` }} transition={{ duration: 1.5 }} className={`h-full ${c.color}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-surface-container-low p-16 border border-outline-variant/10 shadow-lux-sm">
                    <h3 className="font-headline text-3xl italic mb-12">Sales Heatmap</h3>
                    <div className="grid grid-cols-7 gap-4">
                        {Array.from({ length: 28 }).map((_, i) => (
                            <div key={i} className={`aspect-square opacity-${Math.floor(Math.random() * 5 + 3) * 10} bg-primary transition-all cursor-pointer hover:scale-125 hover:opacity-100 hover:shadow-lux`} />
                        ))}
                    </div>
                    <div className="flex justify-between mt-10 font-label text-[9px] uppercase opacity-40 font-black italic tracking-[0.2em]">
                        <span>Volume: Minimalist</span>
                        <span>Volume: Maximalist</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )

    const renderCMS = () => (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-20">
            <div className="border-b border-outline-variant/10 pb-10">
                <h2 className="font-headline text-6xl italic font-light">Content Studio</h2>
                <p className="font-label text-[11px] uppercase tracking-[0.4em] font-black opacity-40 mt-6 italic">Global Aesthetics & Storytelling Manager</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="bg-surface-container-low p-16 border border-outline-variant/10 space-y-12">
                    <h3 className="font-headline text-3xl italic border-b border-black/5 pb-6">Home Hero Stack</h3>
                    <div className="space-y-10">
                        <div>
                            <label className="block font-label text-[10px] uppercase tracking-widest font-black mb-4">Primary Hero Image</label>
                            <div className="flex gap-6">
                                <input type="text" placeholder="https://assets.sovra.com/hero-01.jpg" className="flex-1 bg-surface border border-outline-variant/20 p-6 font-body text-xs focus:ring-1 focus:ring-primary outline-none" />
                                <button className="material-symbols-outlined p-4 bg-primary text-on-primary hover:bg-primary-dim transition-all">upload</button>
                            </div>
                        </div>
                        <div>
                            <label className="block font-label text-[10px] uppercase tracking-widest font-black mb-4">Hero Headline</label>
                            <input type="text" defaultValue="Celestial Echoes" className="w-full bg-surface border border-outline-variant/20 p-6 font-headline text-2xl italic focus:ring-1 focus:ring-primary outline-none" />
                        </div>
                    </div>
                    <button onClick={() => handleAction('Update Hero')} className="w-full py-6 bg-primary text-on-primary font-label text-[11px] uppercase tracking-[0.4em] font-black shadow-lux hover:scale-[1.02] transition-transform">Publish Changes</button>
                </div>

                <div className="bg-surface-container-low p-16 border border-outline-variant/10 space-y-12">
                    <h3 className="font-headline text-3xl italic border-b border-black/5 pb-6">SOVRA Story Content</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block font-label text-[10px] uppercase tracking-widest font-black mb-4">Story Narrative</label>
                            <textarea rows={8} className="w-full bg-surface border border-outline-variant/20 p-8 font-body text-sm leading-[1.8] focus:ring-1 focus:ring-primary outline-none italic opacity-70" defaultValue="Crafting timeless elegance for the modern soul. Founded in Paris, inspired by the stars, and forged in the heart of Tuscany..." />
                        </div>
                    </div>
                    <button onClick={() => handleAction('Update Story')} className="w-full py-6 bg-primary text-on-primary font-label text-[11px] uppercase tracking-[0.4em] font-black shadow-lux hover:scale-[1.02] transition-transform">Update Narrative</button>
                </div>
            </div>
        </motion.div>
    )

    const filteredOrders = orders.filter(o => {
        const matchesSearch = o._id.toLowerCase().includes(orderSearch.toLowerCase()) ||
            o.user?.name?.toLowerCase().includes(orderSearch.toLowerCase()) ||
            o.user?.email?.toLowerCase().includes(orderSearch.toLowerCase());
        const matchesFilter = orderFilter === 'All' || o.status === orderFilter;
        return matchesSearch && matchesFilter;
    })

    const renderInventoryModal = () => (
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-[#fffcf7] shadow-lux border border-outline-variant/10 p-8 md:p-16 overflow-y-auto max-h-[90vh] no-scrollbar"
                    >
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h2 className="font-headline text-4xl lg:text-5xl italic font-light tracking-tight">{editMode ? 'Refine Masterpiece' : 'Catalog New Piece'}</h2>
                                <p className="font-label text-[10px] uppercase tracking-[0.3em] font-black opacity-40 mt-4 italic">Archive Entry Node</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="material-symbols-outlined text-3xl opacity-20 hover:opacity-100 transition-opacity">close</button>
                        </div>

                        <form onSubmit={handleSaveProduct} className="space-y-10 lg:space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                    <label className="font-label text-[10px] uppercase tracking-widest font-black opacity-40 block">Piece Name</label>
                                    <input 
                                        type="text" required
                                        value={currentProduct.name}
                                        onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                                        className="w-full bg-transparent border-b border-black/10 py-3 font-headline text-2xl italic focus:border-primary outline-none"
                                        placeholder="Archival Title..."
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="font-label text-[10px] uppercase tracking-widest font-black opacity-40 block">Category</label>
                                    <select 
                                        value={currentProduct.category}
                                        onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                                        className="w-full bg-transparent border-b border-black/10 py-3 font-label text-[12px] uppercase font-black"
                                    >
                                        {['Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Collections'].map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="font-label text-[10px] uppercase tracking-widest font-black opacity-40 block">Price (₹)</label>
                                    <input 
                                        type="number" required
                                        value={currentProduct.price}
                                        onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
                                        className="w-full bg-transparent border-b border-black/10 py-3 font-headline text-2xl focus:border-primary outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-black/5">
                                <div className="space-y-4">
                                    <label className="font-label text-[10px] uppercase tracking-widest font-black opacity-40 block">Material</label>
                                    <input 
                                        type="text"
                                        value={currentProduct.material}
                                        onChange={(e) => setCurrentProduct({...currentProduct, material: e.target.value})}
                                        className="w-full bg-transparent border-b border-black/10 py-2 font-body text-xs italic outline-none"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="font-label text-[10px] uppercase tracking-widest font-black opacity-40 block">Plating</label>
                                    <input 
                                        type="text"
                                        value={currentProduct.plating}
                                        onChange={(e) => setCurrentProduct({...currentProduct, plating: e.target.value})}
                                        className="w-full bg-transparent border-b border-black/10 py-2 font-body text-xs italic outline-none"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="font-label text-[10px] uppercase tracking-widest font-black opacity-40 block">Length</label>
                                    <input 
                                        type="text"
                                        value={currentProduct.length}
                                        onChange={(e) => setCurrentProduct({...currentProduct, length: e.target.value})}
                                        className="w-full bg-transparent border-b border-black/10 py-2 font-body text-xs italic outline-none"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="font-label text-[10px] uppercase tracking-widest font-black opacity-40 block">Stock</label>
                                    <input 
                                        type="number"
                                        value={currentProduct.stock}
                                        onChange={(e) => setCurrentProduct({...currentProduct, stock: e.target.value})}
                                        className="w-full bg-transparent border-b border-black/10 py-2 font-body text-xs font-black outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <label className="font-label text-[10px] uppercase tracking-widest font-black opacity-40 block">Imagery (Cloudinary)</label>
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="w-32 h-32 lg:w-40 lg:h-40 bg-surface-container-low border border-outline-variant/10 overflow-hidden relative group">
                                        {currentProduct.img ? (
                                            <img src={currentProduct.img} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center opacity-10">
                                                <span className="material-symbols-outlined text-6xl">image</span>
                                            </div>
                                        )}
                                        {uploading && (
                                            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                                                <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin rounded-full" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-4 text-center md:text-left">
                                        <input 
                                            type="file" 
                                            onChange={handleFileUpload}
                                            id="file-upload"
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <label 
                                            htmlFor="file-upload"
                                            className="inline-block bg-surface-container-high px-8 py-4 font-label text-[10px] uppercase font-black tracking-widest cursor-pointer hover:bg-primary hover:text-on-primary transition-all border border-black/5 shadow-sm"
                                        >
                                            {uploading ? 'Processing...' : 'Upload Archive Asset'}
                                        </label>
                                        <p className="font-body text-[10px] opacity-40 italic">High-fidelity 4:5 aspect ratio recommended for SOVRA aesthetics.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <label className="font-label text-[10px] uppercase tracking-widest font-black opacity-40 block">Artisanal Details</label>
                                <textarea 
                                    required
                                    value={currentProduct.details}
                                    onChange={(e) => setCurrentProduct({...currentProduct, details: e.target.value})}
                                    className="w-full bg-surface-container-low border border-outline-variant/10 p-6 font-body text-sm italic min-h-[120px] focus:ring-1 focus:ring-primary outline-none"
                                    placeholder="Describe the craftsmanship..."
                                />
                            </div>

                            <div className="flex justify-end gap-6 pt-8 border-t border-black/5">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-8 lg:px-12 py-5 font-label text-[10px] uppercase tracking-widest font-black opacity-40 hover:opacity-100 transition-opacity"
                                >Cancel</button>
                                <button 
                                    type="submit"
                                    disabled={uploading}
                                    className="bg-primary text-on-primary px-12 lg:px-16 py-5 font-label text-[10px] uppercase tracking-[0.3em] font-black shadow-lux hover:bg-primary-dim transition-all disabled:opacity-50"
                                >{editMode ? 'Update Masterpiece' : 'Verify & Catalog'}</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )

    const tabs = [
        { id: 'dashboard', name: 'Main', icon: 'grid_view' },
        { id: 'products', name: 'Pieces', icon: 'inventory' },
        { id: 'orders', name: 'Orders', icon: 'shopping_cart' },
        { id: 'customers', name: 'Clients', icon: 'diversity_1' },
        { id: 'analytics', name: 'Insights', icon: 'query_stats' },
        { id: 'cms', name: 'Studio', icon: 'auto_fix_high' }
    ];

    return (
        <div className="flex flex-col lg:flex-row bg-[#fffcf7] min-h-screen selection:bg-primary-container selection:text-on-primary-container">
            {renderInventoryModal()}
            {/* Premium Sidebar */}
            <aside className="lg:w-80 lg:fixed lg:left-0 lg:top-0 lg:h-screen bg-white/40 backdrop-blur-3xl border-b lg:border-b-0 lg:border-r border-outline-variant/10 z-20 pt-28 lg:pt-44 flex flex-col">
                <div className="px-8 lg:px-12 mb-8 lg:mb-20 text-center lg:text-left">
                    <h1 className="font-headline text-3xl lg:text-5xl italic font-light tracking-tighter opacity-85 leading-tight">Admin Control</h1>
                    <div className="flex items-center justify-center lg:justify-start gap-3 text-primary mt-2 lg:mt-4">
                        <span className="material-symbols-outlined text-[12px] lg:text-sm animate-pulse">lock</span>
                        <p className="font-label text-8px lg:text-[9px] uppercase tracking-[0.4em] font-black opacity-30 italic">Secure Node</p>
                    </div>
                </div>

                <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible px-4 lg:px-8 space-x-2 lg:space-x-0 lg:space-y-3 pb-4 lg:pb-0 no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-shrink-0 flex items-center gap-4 lg:gap-6 px-6 lg:px-8 py-3 lg:py-5 transition-all duration-500 group relative ${
                                activeTab === tab.id 
                                ? 'bg-primary text-on-primary shadow-lux-sm scale-[1.02] lg:scale-100' 
                                : 'text-secondary hover:bg-black/5 hover:text-primary'
                            }`}
                        >
                            <span className="material-symbols-outlined text-base lg:text-xl relative z-10 group-hover:scale-110 transition-transform">{tab.icon}</span>
                            <span className="font-label text-[9px] lg:text-[10px] uppercase tracking-[0.3em] font-black relative z-10 whitespace-nowrap">{tab.name}</span>
                        </button>
                    ))}
                </nav>

                <div className="hidden lg:block p-12 mt-auto border-t border-black/5">
                    <div className="bg-primary/5 p-6 border border-primary/10">
                        <p className="font-label text-[8px] uppercase tracking-widest font-black opacity-40 mb-2">Authenticated As</p>
                        <p className="font-headline text-lg italic opacity-80">Maison Admin</p>
                    </div>
                </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1 lg:ml-80 pt-12 lg:pt-44 pb-32 px-6 md:px-16 lg:px-24">
                <div className="max-w-[1500px] mx-auto">
                    {loading ? (
                        <div className="py-32 text-center opacity-40">
                            <p className="font-headline text-8xl transition-all animate-pulse">...</p>
                            <p className="font-label text-[14px] uppercase tracking-[0.4em] font-black italic mt-8">Consulting the Ledger</p>
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            {activeTab === 'dashboard' && renderDashboard()}
                            {activeTab === 'customers' && renderCustomers()}
                            {activeTab === 'analytics' && renderAnalytics()}
                            {activeTab === 'cms' && renderCMS()}
                            {activeTab === 'products' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
                                    <div className="flex flex-col md:flex-row justify-between items-baseline border-b border-outline-variant/10 pb-12 gap-8">
                                        <div>
                                            <h2 className="font-headline text-6xl italic font-light tracking-tight">Inventory Manager</h2>
                                            <p className="font-label text-[11px] uppercase opacity-40 font-black mt-6 italic tracking-[0.3em]">{products.length} Masterpieces cataloged</p>
                                        </div>
                                        <button 
                                            onClick={handleAddProduct}
                                            className="bg-primary text-on-primary px-16 py-6 font-label uppercase tracking-[0.3em] text-[10px] font-black shadow-lux hover:bg-primary-dim transition-all"
                                        >+ Catalog Piece</button>
                                    </div>
                                    <div className="overflow-x-auto bg-surface-container-low p-12 border border-outline-variant/10">
                                        <table className="w-full text-left min-w-[800px]">
                                            <thead>
                                                <tr className="border-b border-outline-variant/10 text-outline uppercase tracking-[0.3em] text-[11px] font-black">
                                                    <th className="py-12 pl-6">Piece</th>
                                                    <th className="py-12 px-6">SKU</th>
                                                    <th className="py-12 px-6">Category</th>
                                                    <th className="py-12 px-6 text-right">Price</th>
                                                    <th className="py-12 px-6 text-right">Stock</th>
                                                    <th className="py-12 pr-6 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-black/5">
                                                {products.map(p => (
                                                    <tr key={p._id} className="group hover:bg-surface-container/50 transition-all duration-700">
                                                        <td className="py-12 pl-6 flex items-center gap-8">
                                                            <div className="w-24 h-24 bg-surface-container overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-sm border border-black/5">
                                                                <img src={p.img || p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                                                            </div>
                                                            <h3 className="font-headline text-2xl italic group-hover:text-primary transition-colors underline decoration-transparent group-hover:decoration-primary/30 underline-offset-8">{p.name}</h3>
                                                        </td>
                                                        <td className="py-12 px-6 font-mono text-[10px] tracking-wider opacity-60">{p.sku || 'N/A'}</td>
                                                        <td className="py-12 px-6 font-label text-[10px] uppercase font-black opacity-60 italic">{p.category}</td>
                                                        <td className="py-12 px-6 text-right font-headline text-2xl font-light">₹{p.price?.toLocaleString()}</td>
                                                        <td className="py-12 px-6 text-right font-label text-[11px] font-black tracking-widest">{p.stock || 0} Units</td>
                                                        <td className="py-12 pr-6 text-right">
                                                            <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button 
                                                                    onClick={() => handleEditProduct(p)}
                                                                    className="material-symbols-outlined text-xl text-primary/60 hover:text-primary transition-colors"
                                                                >edit</button>
                                                                <button 
                                                                    onClick={() => handleDeleteProduct(p._id)}
                                                                    className="material-symbols-outlined text-xl text-outline/40 hover:text-red-500 transition-colors"
                                                                >delete</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                            )}
                            {activeTab === 'orders' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
                                    <div className="border-b border-outline-variant/10 pb-12 flex flex-col md:flex-row justify-between items-baseline gap-12">
                                        <h2 className="font-headline text-6xl italic font-light tracking-tight">Active Shipments</h2>
                                        <div className="flex-1 w-full max-w-2xl">
                                            <input
                                                type="text"
                                                placeholder="Search by Order ID, Name or Email..."
                                                value={orderSearch}
                                                onChange={(e) => setOrderSearch(e.target.value)}
                                                className="w-full bg-surface-container-low border border-outline-variant/20 p-6 font-body text-sm focus:ring-1 focus:ring-primary outline-none italic tracking-wide"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 border-b border-outline-variant/5 pb-12">
                                        {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => setOrderFilter(status)}
                                                className={`px-10 py-4 font-label text-[10px] uppercase tracking-[0.3em] font-black transition-all ${orderFilter === status ? 'bg-primary text-on-primary shadow-lux' : 'bg-surface-container-low text-secondary hover:text-primary'}`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="space-y-8">
                                        {filteredOrders.length > 0 ? filteredOrders.map(o => (
                                            <motion.div layout key={o._id} className="bg-surface-container-low p-12 border border-outline-variant/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 group hover:shadow-lux transition-all duration-700">
                                                <div className="space-y-2">
                                                    <p className="font-label text-[10px] text-primary tracking-[0.3em] font-black uppercase mb-3">Order #{o._id.slice(-6)}</p>
                                                    <h3 className="font-headline text-3xl italic font-light group-hover:text-primary transition-colors">{o.user?.name || 'Guest Member'}</h3>
                                                    <p className="font-label text-[11px] uppercase tracking-[0.2em] opacity-40 font-black italic">
                                                        {o.orderItems?.length || 0} Pieces • {new Date(o.createdAt).toLocaleDateString()}
                                                    </p>
                                                    <p className="font-body text-[11px] opacity-30 mt-3 font-medium">{o.user?.email}</p>
                                                </div>
                                                <div className="flex items-center gap-20 w-full md:w-auto">
                                                    <div className="text-right">
                                                        <p className="font-label text-[10px] uppercase opacity-40 font-black tracking-widest">Grand Total</p>
                                                        <p className="font-headline text-3xl font-light mt-2">₹{o.totalPrice.toLocaleString()}</p>
                                                    </div>
                                                    <select
                                                        value={o.status}
                                                        onChange={(e) => handleUpdateOrderStatus(o._id, e.target.value)}
                                                        className={`px-8 py-4 border border-primary/20 text-primary font-label text-[10px] uppercase tracking-[0.3em] font-black italic min-w-[160px] text-center bg-transparent cursor-pointer hover:bg-primary/5 transition-all outline-none ${o.status === 'Cancelled' ? 'border-red-200 text-red-500' : ''}`}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </div>
                                            </motion.div>
                                        )) : (
                                            <div className="py-32 text-center opacity-40">
                                                <span className="material-symbols-outlined text-8xl mb-6">search_off</span>
                                                <p className="font-label text-[14px] uppercase tracking-[0.4em] font-black italic">No records unearthed for your search</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Admin
