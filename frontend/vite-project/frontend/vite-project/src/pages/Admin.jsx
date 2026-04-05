import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import api from '../utils/api'

const Admin = () => {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [orderSearch, setOrderSearch] = useState('')
    const [orderFilter, setOrderFilter] = useState('All')
    const [loading, setLoading] = useState(true)

    // Real Data States
    const [stats, setStats] = useState({
        totalRevenue: '₹0',
        totalOrders: 0,
        activeBespoke: 0,
        criticalMaterials: 0,
        totalUsers: 0
    })
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [materials, setMaterials] = useState([])
    const [customers, setCustomers] = useState([])
    const [bespokeRequests, setBespokeRequests] = useState([])
    const [revenueData, setRevenueData] = useState([])

<<<<<<< HEAD:frontend/vite-project/frontend/vite-project/src/pages/Admin.jsx
    const [orders] = useState([
        { id: "#ORD-88291", customer: "Julianne Vora", email: "j.vora@luxury.com", items: "Ethereal Band", total: "$1,250", status: "Delivered", date: "Oct 14, 2023" },
        { id: "#ORD-88104", customer: "Julianne Vora", email: "j.vora@luxury.com", items: "Celestial Drop Earrings", total: "$890", status: "Shipped", date: "Nov 02, 2023" },
        { id: "#ORD-88542", customer: "Mark Sterling", email: "mark.s@finance.com", items: "L'Aube Pendant", total: "$4,200", status: "Pending", date: "Dec 12, 2023" },
        { id: "#ORD-88901", customer: "Elena Rossi", email: "elena@SOVRA.it", items: "Solitude Ring", total: "$2,450", status: "Processing", date: "Jan 05, 2024" }
    ])
=======
    // Data Fetching Central
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                setLoading(true)
                const [statsRes, productsRes, ordersRes, materialsRes, usersRes, revenueRes, bespokeRes] = await Promise.all([
                    api.get('/analytics/stats'),
                    api.get('/products'),
                    api.get('/orders'),
                    api.get('/materials'),
                    api.get('/users'),
                    api.get('/analytics/revenue'),
                    api.get('/bespoke')
                ])
>>>>>>> 5203ea7c9517ac06d4a13393e6762ec8b1438799:src/pages/Admin.jsx

                setStats(statsRes.data)
                setProducts(productsRes.data)
                setOrders(ordersRes.data)
                setMaterials(materialsRes.data)
                setCustomers(usersRes.data)
                setBespokeRequests(bespokeRes.data)
                
                // Map revenue data for the chart
                const fullYear = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, revenue: 0 }))
                revenueRes.data.forEach(item => {
                    const index = fullYear.findIndex(f => f.month === item._id)
                    if (index !== -1) fullYear[index].revenue = item.revenue
                })
                setRevenueData(fullYear)

<<<<<<< HEAD:frontend/vite-project/frontend/vite-project/src/pages/Admin.jsx
    const [customers] = useState([
        { id: 1, name: "Julianne Vora", email: "j.vora@luxury.com", orders: 12, spend: "$45,200", preference: "High Jewelry", status: "VIP" },
        { id: 2, name: "Mark Sterling", email: "mark.s@finance.com", orders: 4, spend: "$12,800", preference: "Timepieces", status: "Regular" },
        { id: 3, name: "Elena Rossi", email: "elena@SOVRA.it", orders: 1, spend: "$8,500", preference: "Bespoke", status: "New" }
    ])
=======
            } catch (error) {
                console.error('Fetch admin data failed:', error)
                toast.error('SOVRA archives are temporarily unreachable.')
            } finally {
                setLoading(false)
            }
        }
        fetchAdminData()
    }, [activeTab])
>>>>>>> 5203ea7c9517ac06d4a13393e6762ec8b1438799:src/pages/Admin.jsx

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
                    <h2 className="font-headline text-3xl italic mb-12 border-b border-black/5 pb-6">Urgent Alerts</h2>
                    <div className="space-y-8">
                        {materials.filter(m => m.status !== 'Stable').slice(0, 4).map(m => (
                            <div key={m._id} className="flex items-center gap-6 p-6 bg-primary/5 border border-primary/10 transition-transform hover:translate-x-2 duration-500">
                                <span className="material-symbols-outlined text-primary text-2xl">priority_high</span>
                                <div>
                                    <p className="font-label text-[10px] uppercase font-black tracking-widest">{m.name}</p>
                                    <p className="font-label text-[9px] uppercase text-primary font-black mt-1">{m.status}</p>
                                    <p className="font-body text-[11px] opacity-60 mt-2">Current: {m.amount} | Min: {m.threshold}</p>
                                </div>
                            </div>
                        ))}
                        {materials.filter(m => m.status !== 'Stable').length === 0 && (
                            <p className="font-body text-sm opacity-40 italic">All treasures are secure.</p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )

    const renderInventory = () => (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-16">
            <div className="flex justify-between items-end border-b border-outline-variant/10 pb-12">
                <div>
                    <h2 className="font-headline text-6xl italic font-light tracking-tight underline decoration-primary/5 underline-offset-[12px]">Raw Materials</h2>
                    <p className="font-label text-[11px] uppercase tracking-[0.4em] font-black opacity-40 mt-6">Precious Metals & Gemstone Analytics</p>
                </div>
                <button onClick={() => handleAction('Restock Request')} className="bg-primary text-on-primary px-16 py-6 font-label uppercase tracking-[0.3em] text-[10px] font-black shadow-lux hover:bg-primary-dim transition-colors">Log Shipment</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {materials.map(m => (
                    <div key={m._id} className={`p-10 border ${m.status === 'Critical' ? 'border-primary bg-primary/5' : 'border-outline-variant/10'} shadow-sm transition-all hover:shadow-lux`}>
                        <div className="flex justify-between mb-8">
                            <span className="font-label text-[10px] uppercase tracking-[0.2em] font-black opacity-40">{m.type}</span>
                            <span className={`w-3 h-3 rounded-full ${m.status === 'Critical' ? 'bg-red-500 animate-ping' : m.status === 'Low Stock' ? 'bg-amber-500' : 'bg-green-500'}`} />
                        </div>
                        <h3 className="font-headline text-2xl italic mb-3">{m.name}</h3>
                        <p className="font-headline text-4xl font-light mb-8">{m.amount}</p>
                        <div className="flex justify-between border-t border-black/5 pt-6">
                            <span className="font-label text-[10px] uppercase font-black opacity-40 tracking-widest">Min Req.</span>
                            <span className="font-label text-[10px] uppercase font-black">{m.threshold}</span>
                        </div>
                    </div>
                ))}
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
<<<<<<< HEAD:frontend/vite-project/frontend/vite-project/src/pages/Admin.jsx
                                <p className="font-body text-[12px] opacity-60 font-black mt-2">SOVRA Client: {r.client} • Target Deadline: {r.deadline}</p>
=======
                                <p className="font-body text-[12px] opacity-60 font-black mt-2">SOVRA Client: {r.clientName || r.client?.name} • Target Deadline: {r.deadline}</p>
>>>>>>> 5203ea7c9517ac06d4a13393e6762ec8b1438799:src/pages/Admin.jsx
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
                    { label: "Critical Mtl", value: stats.criticalMaterials },
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

    return (
        <div className="pt-24 pb-32 px-8 md:px-16 lg:px-24 max-w-[1920px] mx-auto min-h-screen selection:bg-primary-container selection:text-on-primary-container bg-[#fffcf7]">
            <header className="mb-12 flex flex-col xl:flex-row justify-between items-center border-b border-outline-variant/10 pb-8 gap-8">
                <div className="space-y-4 text-center xl:text-left">
                    <h1 className="font-headline text-5xl md:text-7xl leading-[0.85] italic font-light tracking-tighter transition-all opacity-85">Admin Control</h1>
                    <div className="flex items-center justify-center xl:justify-start gap-4 text-primary">
                        <span className="material-symbols-outlined animate-pulse text-2xl">lock</span>
                        <p className="font-label text-[10px] uppercase tracking-[0.6em] font-black opacity-40 italic font-bold">Secure Administrator Node</p>
                    </div>
                </div>

                <nav className="flex flex-wrap items-center justify-center gap-2 bg-white/50 backdrop-blur-md p-3 border border-outline-variant/10 shadow-lux-sm">
                    {[
                        { id: 'dashboard', name: 'Maint', icon: 'grid_view' },
                        { id: 'products', name: 'Pieces', icon: 'inventory' },
                        { id: 'orders', name: 'Orders', icon: 'shopping_cart' },
                        { id: 'inventory', name: 'Metals', icon: 'diamond' },
                        { id: 'customers', name: 'Clients', icon: 'diversity_1' },
                        { id: 'analytics', name: 'Insights', icon: 'query_stats' },
                        { id: 'cms', name: 'Studio', icon: 'auto_fix_high' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-4 px-8 md:px-10 py-6 transition-all duration-700 group ${activeTab === tab.id ? 'bg-primary text-on-primary shadow-lux scale-[1.05] z-10' : 'text-secondary hover:text-primary hover:bg-black/5'}`}
                        >
                            <span className="material-symbols-outlined text-base group-hover:scale-125 transition-transform">{tab.icon}</span>
                            <span className="font-label text-[11px] uppercase tracking-[0.4em] font-black">{tab.name}</span>
                        </button>
                    ))}
                </nav>
            </header>

            <main className="max-w-[1720px] mx-auto">
                {loading ? (
                    <div className="py-32 text-center opacity-40">
                        <p className="font-headline text-8xl transition-all animate-pulse">...</p>
                        <p className="font-label text-[14px] uppercase tracking-[0.4em] font-black italic mt-8">Consulting the Ledger</p>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'inventory' && renderInventory()}
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
                                <button className="bg-primary text-on-primary px-16 py-6 font-label uppercase tracking-[0.3em] text-[10px] font-black shadow-lux hover:bg-primary-dim transition-all">+ Catalog Piece</button>
                            </div>
                            <div className="overflow-x-auto bg-surface-container-low p-12 border border-outline-variant/10">
                                <table className="w-full text-left min-w-[800px]">
                                    <thead>
                                        <tr className="border-b border-outline-variant/10 text-outline uppercase tracking-[0.3em] text-[11px] font-black">
                                            <th className="py-12 pl-6">Piece</th>
                                            <th className="py-12 px-6">Category</th>
                                            <th className="py-12 px-6">Material</th>
                                            <th className="py-12 px-6 text-right">Price</th>
                                            <th className="py-12 pr-6 text-right">Stock</th>
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
                                                <td className="py-12 px-6 font-label text-[10px] uppercase font-black opacity-60 italic">{p.category}</td>
                                                <td className="py-12 px-6 font-label text-[10px] uppercase font-black opacity-40">{p.material || 'Fine Metal'}</td>
                                                <td className="py-12 px-6 text-right font-headline text-2xl font-light">₹{p.price.toLocaleString()}</td>
                                                <td className="py-12 pr-6 text-right font-label text-[11px] font-black tracking-widest">{p.stock || p.countInStock} Units</td>
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
            </main>
        </div>
    )
}

export default Admin
