import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../utils/api';

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const { data } = await api.get(`/orders/${id}`);
                setOrder(data);
            } catch (error) {
                toast.error('Could not retrieve order details from the archives.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) return <div className="pt-40 text-center font-headline text-2xl italic opacity-30">Consulting the Ledger...</div>;
    if (!order) return <div className="pt-40 text-center">Order not found in House Sovra records.</div>;

    const statusSteps = [
        { label: 'Pending', icon: 'pending_actions' },
        { label: 'Processing', icon: 'precision_manufacturing' },
        { label: 'Shipped', icon: 'local_shipping' },
        { label: 'Delivered', icon: 'verified' }
    ];

    const currentStepIndex = statusSteps.findIndex(s => s.label === order.status);

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
            <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
                <div>
                    <Link to="/account" className="font-label text-[9px] uppercase tracking-widest text-primary/60 hover:text-primary mb-6 inline-flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">arrow_back</span> Return to Vault
                    </Link>
                    <h1 className="font-headline text-5xl md:text-6xl italic font-light tracking-tight mb-4">Curation Detail</h1>
                    <p className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary font-black opacity-40">Identification: {order._id}</p>
                </div>
                <div className="text-right">
                    <span className="font-label text-[10px] uppercase tracking-widest text-primary bg-primary/5 px-4 py-2 border border-primary/10">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                </div>
            </header>

            {/* Tracking Timeline */}
            <section className="mb-20 bg-surface-container-low p-12 shadow-sm border border-black/5">
                <h2 className="font-headline text-2xl italic mb-12 border-b border-black/5 pb-4">Artisanal Progress</h2>
                <div className="flex flex-col md:flex-row justify-between relative gap-12">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[22px] left-0 w-full h-[1px] bg-black/5 -z-10"></div>

                    {statusSteps.map((step, index) => {
                        const isCompleted = index <= currentStepIndex;
                        const isCurrent = index === currentStepIndex;

                        return (
                            <div key={step.label} className="flex flex-col items-center gap-4 flex-1">
                                <div className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-1000 ${isCompleted ? 'bg-primary text-white shadow-lg' : 'bg-white border border-black/5 text-black/20'}`}>
                                    <span className="material-symbols-outlined text-xl">{step.icon}</span>
                                </div>
                                <div className="text-center">
                                    <p className={`font-label text-[10px] uppercase tracking-widest font-black mb-1 ${isCompleted ? 'opacity-100' : 'opacity-20'}`}>{step.label}</p>
                                    {isCurrent && <p className="text-[9px] italic text-primary animate-pulse">In Progress</p>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Items & Shipping */}
                <div className="lg:col-span-8 space-y-16">
                    <div>
                        <h2 className="font-headline text-3xl italic mb-10 border-b border-black/5 pb-6">Curated Pieces</h2>
                        <div className="space-y-10">
                            {order.orderItems.map((item) => (
                                <div key={item.product} className="flex flex-col md:flex-row gap-8 items-center group">
                                    <div className="w-full md:w-32 aspect-[3/4] bg-surface-container overflow-hidden shadow-sm">
                                        <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={item.name} />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <h3 className="font-headline text-2xl italic">{item.name}</h3>
                                        <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Ref: {item.product}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-body text-lg italic opacity-80">${item.price.toLocaleString()} × {item.qty}</p>
                                        <p className="font-headline text-2xl font-light text-primary">${(item.price * item.qty).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-surface-container-low p-10 border border-black/5">
                            <h3 className="font-label text-[10px] uppercase tracking-[0.2em] font-black opacity-40 mb-8 pb-4 border-b border-black/5">Delivery Destination</h3>
                            <div className="font-body italic text-secondary leading-relaxed">
                                <p>{order.shippingAddress.address}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                <p>{order.shippingAddress.country}</p>
                            </div>
                        </div>
                        <div className="bg-surface-container-low p-10 border border-black/5">
                            <h3 className="font-label text-[10px] uppercase tracking-[0.2em] font-black opacity-40 mb-8 pb-4 border-b border-black/5">Payment Method</h3>
                            <div className="font-body italic text-secondary leading-relaxed">
                                <p>{order.paymentMethod}</p>
                                <p className={order.isPaid ? 'text-primary font-bold not-italic font-label text-[10px] uppercase' : 'text-error font-bold not-italic font-label text-[10px] uppercase'}>
                                    {order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}` : 'Payment Pending'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Financial Summary Overlay */}
                <div className="lg:col-span-4">
                    <div className="bg-primary text-on-primary p-12 shadow-lux space-y-12 sticky top-40">
                        <h2 className="font-headline text-3xl italic tracking-tight opacity-90">Order Value</h2>
                        <div className="space-y-6">
                            <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] font-bold opacity-60"><span>Curation Subtotal</span><span>${order.totalPrice.toLocaleString()}</span></div>
                            <div className="flex justify-between text-[11px] uppercase tracking-[0.2em] font-bold opacity-60"><span>White-Glove Shipping</span><span>$0.00</span></div>
                            <div className="pt-8 border-t border-white/10">
                                <div className="flex justify-between items-baseline mb-4">
                                    <span className="font-headline text-2xl italic font-light opacity-80">Total</span>
                                    <span className="font-headline text-5xl font-light">${order.totalPrice.toLocaleString()}</span>
                                </div>
                                <p className="text-[9px] uppercase tracking-widest opacity-40 animate-pulse">Ref: Transaction Verified</p>
                            </div>
                        </div>

                        <div className="pt-10">
                            <p className="font-body text-xs italic leading-relaxed opacity-60 text-center">
                                "The value of a piece is measured by the heritage it represents and the moments it commemorates."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
