import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useShop } from '../context/ShopContext'


const Navbar = () => {
    const { isAdmin } = useShop()
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
        { name: 'Collections', path: '/collections' },
        { name: 'Find Jewelry', path: '/shop' },
        { name: 'Magazine', path: '/magazine' },
        { name: 'Heritage', path: '/story' }
    ]

    return (
        <header
            className="fixed top-0 w-full z-50 flex justify-center pointer-events-none"
        >
            <motion.nav
                initial={false}
                animate={{
                    width: isScrolled ? '92%' : '100%',
                    maxWidth: isScrolled ? '1200px' : '2500px',
                    borderRadius: isScrolled ? '100px' : '0px',
                    marginTop: isScrolled ? '1.5rem' : '0rem',
                    backgroundColor: isScrolled ? 'rgba(255, 252, 247, 0.95)' : 'rgba(255, 252, 247, 0.98)',
                    boxShadow: isScrolled ? '0 20px 40px -10px rgba(0,0,0,0.1)' : '0 0px 0px rgba(0,0,0,0)',
                    paddingLeft: isScrolled ? '48px' : '80px',
                    paddingRight: isScrolled ? '48px' : '80px',
                    height: isScrolled ? '76px' : '108px',
                    borderWidth: '1px',
                    borderColor: isScrolled ? 'rgba(110, 91, 68, 0.1)' : 'rgba(110, 91, 68, 0.05)'
                }}
                transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                }}
                className={`pointer-events-auto flex items-center justify-between backdrop-blur-xl border-primary/5 font-body border-b-primary/10`}
            >
                {/* Left Logo */}
                <div className="flex-initial flex items-center pr-8">
                    <Link to="/" className="flex items-center group">
                        <motion.img
                            initial={false}
                            animate={{
                                height: isScrolled ? 56 : 96 // h-14 (56px) and h-24 (96px)
                            }}
                            transition={{
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            src="/logo.jpg"
                            alt="SOVRA"
                            className="mix-blend-multiply w-auto"
                        />
                    </Link>
                </div>

                {/* Center Links */}
                <motion.div
                    initial={false}
                    animate={{
                        fontSize: isScrolled ? '15px' : '18px'
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    className="flex-auto hidden md:flex items-center justify-center gap-6 lg:gap-8 font-headline tracking-tight"
                >
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
                </motion.div>

                {/* Right Utilities */}
                <div className={`flex-initial flex justify-end items-center text-[#6e5b44] ${isScrolled ? 'pl-10' : 'pl-0'}`}>
                    <div className="flex items-center gap-6">
                        {isAdmin && (
                            <Link to="/admin" className="material-symbols-outlined hover:opacity-70 transition-all hover:scale-110" title="Admin Control">
                                <motion.span
                                    initial={false}
                                    animate={{ fontSize: isScrolled ? '20px' : '24px' }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                >
                                    settings
                                </motion.span>
                            </Link>
                        )}
                        <Link to="/account" className="material-symbols-outlined hover:opacity-70 transition-all hover:scale-110">
                            <motion.span
                                initial={false}
                                animate={{ fontSize: isScrolled ? '20px' : '24px' }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                            >
                                person
                            </motion.span>
                        </Link>
                        <Link to="/bag" className="material-symbols-outlined hover:opacity-70 transition-all relative hover:scale-110">
                            <motion.span
                                initial={false}
                                animate={{ fontSize: isScrolled ? '20px' : '24px' }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="block"
                            >
                                shopping_bag
                            </motion.span>
                            <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-primary text-on-primary rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold shadow-sm">2</span>
                        </Link>
                    </div>
                </div>
            </motion.nav>
        </header>
    )
}

export default Navbar
