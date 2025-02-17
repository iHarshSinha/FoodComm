import React from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './MaterialUISwitch'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const [darkMode, setDarkMode] = React.useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    document.body.classList.toggle('dark:bg-gray-900');
    document.body.classList.toggle('bg-white');
  }
  

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const getLinkClass = (path) => {
    const baseClass = "px-3 py-2 rounded-md transition-colors block"
    const isActive = location.pathname === path
    return `${baseClass} ${
      isActive 
        ? "bg-black text-white dark:bg-white dark:text-black" 
        : "text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/assets/images/logo.png" 
                alt="Food-e Logo" 
                className="h-8 w-8 mr-2"
              />
              <span className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">Food-e</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-4">
              <Link to="/" className={getLinkClass('/')}>
                Home
              </Link>
              <div className="flex space-x-4">
                <Link to="/weeks-menu" className={getLinkClass('/weeks-menu')}>
                  Week's Menu
                </Link>
                <Link to="/sick-meal" className={getLinkClass('/sick-meal')}>
                  Sick Meal
                </Link>
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
          {/* Mobile Menu - Sliding from right */}
          <div 
            className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            } md:hidden`}
            style={{ zIndex: 1000 }}
          >
            <div className="flex justify-end p-4">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col px-4 pt-2 pb-3 space-y-3 dark:text-white">
              <Link
                to="/"
                className={getLinkClass('/')}
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/weeks-menu"
                className={getLinkClass('/weeks-menu')}
                onClick={toggleMenu}
              >
                Week's Menu
              </Link>
              <Link
                to="/sick-meal"
                className={getLinkClass('/sick-meal')}
                onClick={toggleMenu}
              >
                Sick Meal
              </Link>
            </div>
          </div>
        {/* Overlay when mobile menu is open */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden" 
            onClick={toggleMenu}
            style={{ zIndex: 999 }}
          />
        )}
      </div>
    </nav>
  )
}

export default Navbar