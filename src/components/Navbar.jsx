import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/logo.jpg'

const Navbar = () => {
    const location = useLocation()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Collections', path: '/shop' },
        { name: 'Fine Jewelry', path: '/shop' },
        { name: 'Heritage', path: '/story' }
    ]

    return (
        <header
            className={`fixed top-0 w-full z-50 flex justify-center pointer-events-none transition-all duration-700 ${isScrolled ? 'pt-4 lg:pt-6 px-6' : 'pt-0 px-0'
                }`}
        >
            <motion.nav
                initial={false}
                animate={{
                    width: isScrolled ? 'auto' : '100%',
                    maxWidth: isScrolled ? '1100px' : '100%',
                    borderRadius: isScrolled ? '100px' : '0px',
                    backgroundColor: isScrolled ? 'rgba(255, 252, 247, 0.95)' : 'rgba(255, 252, 247, 0.98)',
                    boxShadow: isScrolled ? '0 20px 40px -10px rgba(0,0,0,0.1)' : '0 0px 0px rgba(0,0,0,0)',
                    paddingLeft: isScrolled ? '32px' : '48px',
                    paddingRight: isScrolled ? '32px' : '48px',
                    height: isScrolled ? '56px' : '72px',
                    borderWidth: isScrolled ? '1px' : '0px',
                    borderBottomWidth: isScrolled ? '1px' : '1px'
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                className={`pointer-events-auto flex items-center justify-between backdrop-blur-xl border-primary/5 font-body border-b-primary/10`}
            >
                {/* Left Logo */}
                <div className="flex-initial flex items-center pr-8">
                    <Link to="/" className="flex items-center group">
                        <img
                            src={logo}
                            alt="SOVRA"
                            className={`transition-all duration-700 mix-blend-multiply dark:invert ${isScrolled ? 'h-8' : 'h-14'} w-auto`}
                        />
                    </Link>
                </div>

                {/* Center Links */}
                <div className={`flex-auto hidden md:flex items-center justify-center gap-6 lg:gap-8 font-headline tracking-tight transition-all duration-700 ${isScrolled ? 'text-[15px]' : 'text-lg'}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`whitespace-nowrap transition-colors duration-400 relative group font-medium ${location.pathname === link.path ? 'text-primary' : 'text-[#656464] hover:text-[#373831]'
                                }`}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.span
                                    layoutId="navUnderline"
                                    className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary"
                                />
                            )}
                            {location.pathname !== link.path && (
                                <span className="absolute -bottom-1 left-0 h-[1px] bg-primary w-0 group-hover:w-full transition-all duration-500"></span>
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right Utilities */}
                <div className={`flex-initial flex justify-end items-center text-[#6e5b44] ${isScrolled ? 'pl-10' : 'pl-0'}`}>
                    <div className="flex items-center gap-6">
                        <Link to="/admin" className={`material-symbols-outlined transition-all duration-700 hover:opacity-70 hover:scale-110 ${isScrolled ? 'text-[20px]' : 'text-2xl'}`} title="Admin Control">settings</Link>
                        <Link to="/account" className={`material-symbols-outlined transition-all duration-700 hover:opacity-70 hover:scale-110 ${isScrolled ? 'text-[20px]' : 'text-2xl'}`}>person</Link>
                        <Link to="/bag" className={`material-symbols-outlined transition-all duration-700 hover:opacity-70 relative hover:scale-110 ${isScrolled ? 'text-[20px]' : 'text-2xl'}`}>
                            shopping_bag
                            <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-primary text-on-primary rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold shadow-sm">2</span>
                        </Link>
                    </div>
                </div>
            </motion.nav>
        </header>
    )
}

export default Navbar
