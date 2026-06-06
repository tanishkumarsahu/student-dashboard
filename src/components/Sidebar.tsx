'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  type LucideIcon,
} from 'lucide-react'

interface NavItem {
  id: string
  label: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setCollapsed(true)
      } else if (window.innerWidth >= 1024) {
        setCollapsed(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function handleSidebarToggleClick() {
    setCollapsed((prev) => !prev)
  }

  return (
    <>
      <aside
        className={`relative hidden md:flex flex-col shrink-0 bg-bg-surface border-r border-[var(--border-subtle)] h-screen min-h-screen transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-56 lg:w-60'
        }`}
      >
        <div
          className={`flex items-center gap-3 p-4 border-b border-[var(--border-subtle)] ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center shrink-0 border border-accent-primary/20">
            <span className="font-display font-bold text-accent-primary text-sm">
              L
            </span>
          </div>
          {!collapsed && (
            <span className="font-display font-semibold text-text-primary text-sm truncate">
              LearnSpace
            </span>
          )}
        </div>

        <nav className="flex-1 p-2 flex flex-col gap-0.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full transition-colors ${
                  collapsed ? 'justify-center' : ''
                } ${
                  isActive
                    ? 'text-text-primary'
                    : 'text-text-muted hover:text-text-primary hover:bg-bg-elevated'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-xl bg-bg-elevated"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <Icon
                  size={15}
                  strokeWidth={1.5}
                  className={`relative z-10 shrink-0 ${
                    isActive ? 'text-accent-primary' : ''
                  }`}
                />
                {!collapsed && (
                  <span className="relative z-10 font-sans text-sm">
                    {item.label}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        <button
          onClick={handleSidebarToggleClick}
          className="absolute -right-3 top-[52px] w-6 h-6 rounded-full bg-bg-elevated border border-[var(--border-subtle)] flex items-center justify-center text-text-muted hover:text-text-primary transition-colors z-20"
        >
          {collapsed ? (
            <ChevronRight size={11} />
          ) : (
            <ChevronLeft size={11} />
          )}
        </button>

        <div className={`p-3 border-t border-[var(--border-subtle)] ${collapsed ? 'flex justify-center' : ''}`}>
          <div className={`flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-bg-elevated cursor-pointer transition-colors ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-7 h-7 rounded-full bg-accent-primary/20 flex items-center justify-center shrink-0">
              <span className="font-display text-xs font-semibold text-accent-primary">
                A
              </span>
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-medium text-text-primary truncate">
                  Andaz Kumar
                </span>
                <span className="text-[10px] text-text-muted truncate">
                  Pro plan
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 w-9 h-9 rounded-xl bg-bg-surface border border-[var(--border-subtle)] flex items-center justify-center text-text-muted"
      >
        <Menu size={16} />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-64 bg-bg-surface border-r border-[var(--border-subtle)] z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                    <span className="font-display font-bold text-accent-primary text-sm">L</span>
                  </div>
                  <span className="font-display font-semibold text-text-primary text-sm">
                    LearnSpace
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <nav className="flex-1 p-2 flex flex-col gap-0.5 mt-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeItem === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveItem(item.id)
                        setMobileOpen(false)
                      }}
                      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full transition-colors ${
                        isActive
                          ? 'bg-bg-elevated text-text-primary'
                          : 'text-text-muted hover:text-text-primary hover:bg-bg-elevated'
                      }`}
                    >
                      <Icon
                        size={15}
                        strokeWidth={1.5}
                        className={isActive ? 'text-accent-primary' : ''}
                      />
                      <span className="font-sans">{item.label}</span>
                    </button>
                  )
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
