import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

    useEffect(() => {
        if (userInfo && userInfo.isVerified) {
            fetchUserProfile();
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/users/profile');
            setCart(data.cart || []);
            setWishlist(data.wishlist || []);
        } catch (error) {
            console.error('Failed to fetch profile:', error);
            // Clear state on error (e.g., 401 Unauthorized)
            setCart([]);
            setWishlist([]);
        } finally {
            setLoading(false);
        }
    };

    // --- Wishlist Actions ---
    const addToWishlist = async (productId) => {
        if (!userInfo) {
            toast.info('Please sign in to save items to your wishlist');
            return;
        }
        try {
            const { data } = await api.post('/users/wishlist', { productId });
            setWishlist(data);
            toast.success('Added to wishlist');
        } catch (error) {
            toast.error('Failed to add to wishlist');
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const { data } = await api.delete(`/users/wishlist/${productId}`);
            setWishlist(data);
        } catch (error) {
            toast.error('Failed to remove from wishlist');
        }
    };

    // --- Cart Actions ---
    const addToCart = async (productId, qty = 1) => {
        if (!userInfo) {
            toast.info('Please sign in to shop with us');
            return;
        }
        try {
            const { data } = await api.post('/users/cart', { productId, qty });
            setCart(data);
            toast.success('Added to bag');
        } catch (error) {
            toast.error('Failed to add to bag');
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const { data } = await api.delete(`/users/cart/${productId}`);
            setCart(data);
        } catch (error) {
            toast.error('Failed to remove from bag');
        }
    };

    const updateCartQty = async (productId, qty) => {
        try {
            const { data } = await api.put(`/users/cart/${productId}`, { qty });
            setCart(data);
        } catch (error) {
            toast.error('Failed to update quantity');
        }
    };

    return (
        <ShopContext.Provider value={{
            cart,
            wishlist,
            loading,
            addToWishlist,
            removeFromWishlist,
            addToCart,
            removeFromCart,
            updateCartQty,
            refreshProfile: fetchUserProfile
        }}>
            {children}
        </ShopContext.Provider>
    );
};
