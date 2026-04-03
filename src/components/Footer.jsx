import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-[#f6f4ec] dark:bg-[#1a1a18] w-full py-16 px-12 mt-auto border-t border-outline-variant/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-[1720px] mx-auto text-left font-body">
                <div className="space-y-4">
                    <span className="font-headline text-8xl tracking-[0.1em] text-[#373831] dark:text-[#eae9de] uppercase block -ml-1">SOVRA</span>
                    <p className="font-body text-[10px] tracking-widest uppercase leading-[1.6] text-[#6e5b44] dark:text-[#babab0] max-w-xs font-bold">
                        Adorn Your Story • Tuscan Atelier
                    </p>
                    <p className="font-body text-xs tracking-widest uppercase leading-[1.8] text-[#656464] dark:text-[#babab0] max-w-sm font-light opacity-80 pt-4">
                        Crafting timeless elegance for the modern soul. Founded in Paris, inspired by the stars, and forged in the heart of Tuscany.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    <h4 className="font-label text-xs tracking-widest uppercase font-bold text-[#6e5b44] dark:text-[#ead0b3]">Explore</h4>
                    <Link className="text-xs tracking-widest uppercase text-[#656464] dark:text-[#babab0] hover:text-[#6e5b44] transition-colors font-bold" to="/story">About Us</Link>
                    <Link className="text-xs tracking-widest uppercase text-[#656464] dark:text-[#babab0] hover:text-[#6e5b44] transition-colors font-bold" to="/story">Atelier Story</Link>
                </div>

                <div className="flex flex-col gap-6">
                    <h4 className="font-label text-xs tracking-widest uppercase font-bold text-[#6e5b44] dark:text-[#ead0b3]">Assistance</h4>
                    <Link className="text-xs tracking-widest uppercase text-[#656464] dark:text-[#babab0] hover:text-[#6e5b44] transition-colors font-bold" to="#">Customer Care</Link>
                    <Link className="text-xs tracking-widest uppercase text-[#656464] dark:text-[#babab0] hover:text-[#6e5b44] transition-colors font-bold" to="#">Shipping & Returns</Link>
                    <Link className="text-xs tracking-widest uppercase text-[#656464] dark:text-[#babab0] hover:text-[#6e5b44] transition-colors font-bold" to="#">Contact</Link>
                </div>

                <div className="flex flex-col gap-6">
                    <h4 className="font-label text-xs tracking-widest uppercase font-bold text-[#6e5b44] dark:text-[#ead0b3]">Journal</h4>
                    <Link className="text-xs tracking-widest uppercase text-[#656464] dark:text-[#babab0] hover:text-[#6e5b44] transition-colors font-bold" to="#">Instagram</Link>
                    <Link className="text-xs tracking-widest uppercase text-[#656464] dark:text-[#babab0] hover:text-[#6e5b44] transition-colors font-bold" to="#">Pinterest</Link>
                    <p className="mt-12 font-label text-[10px] tracking-widest uppercase text-outline font-bold">© 2024 SOVRA ATELIER. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
