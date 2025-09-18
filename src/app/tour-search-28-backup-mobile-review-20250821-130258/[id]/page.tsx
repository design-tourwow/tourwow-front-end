'use client'

import React, { useState, useEffect, use, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Head from 'next/head'
import {
  ArrowLeft, Star, Heart, Share2, MapPin, Clock, Users, Calendar, 
  Phone, MessageCircle, Zap, Flame, Timer, ChevronRight, Eye, 
  Shield, Award, Check, X, ChevronDown, ChevronUp, Play, Camera, 
  CreditCard, CheckCircle, AlertCircle, TrendingUp, Sparkles,
  Navigation, Globe, Wifi, Coffee, Utensils, Car, Plane, Hotel,
  ThumbsUp, BookOpen, Send, Bookmark
} from 'lucide-react'

// Enhanced Mobile-First CSS with Best Practices
const customStyles = `
  /* === Mobile-First CSS Reset & Foundations === */
  :root {
    /* Mobile-first spacing scale */
    --space-xs: 0.25rem;     /* 4px */
    --space-sm: 0.5rem;      /* 8px */
    --space-md: 1rem;        /* 16px */
    --space-lg: 1.5rem;      /* 24px */
    --space-xl: 2rem;        /* 32px */
    --space-2xl: 3rem;       /* 48px */
    --space-3xl: 4rem;       /* 64px */
    
    /* Touch-friendly sizes */
    --touch-target: 44px;
    --touch-target-lg: 48px;
    
    /* Safe areas for mobile devices */
    --safe-area-top: env(safe-area-inset-top);
    --safe-area-bottom: env(safe-area-inset-bottom);
    --safe-area-left: env(safe-area-inset-left);
    --safe-area-right: env(safe-area-inset-right);
    
    /* Enhanced mobile shadows */
    --shadow-touch: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    --shadow-elevated: 0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06);
    --shadow-floating: 0 10px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.05);
  }

  /* === Enhanced Animations with Reduced Motion Support === */
  @media (prefers-reduced-motion: no-preference) {
    @keyframes slide-up {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slide-in-left {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes count-up {
      from { transform: scale(1); }
      50% { transform: scale(1.1); }
      to { transform: scale(1); }
    }
    
    @keyframes pulse-border {
      0%, 100% { border-color: rgb(59 130 246 / 0.5); }
      50% { border-color: rgb(59 130 246 / 1); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    
    @keyframes bounce-gentle {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-2px); }
    }
    
    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: calc(200px + 100%) 0; }
    }
  }
  
  /* Animation classes */
  .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
  .animate-slide-in-left { animation: slide-in-left 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
  .animate-fade-in { animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
  .animate-count-up { animation: count-up 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
  .animate-pulse-border { animation: pulse-border 2s ease-in-out infinite; }
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-bounce-gentle { animation: bounce-gentle 1s ease-in-out infinite; }
  
  /* === Mobile-First Touch Interactions === */
  .touch-target {
    min-height: var(--touch-target);
    min-width: var(--touch-target);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .touch-target-lg {
    min-height: var(--touch-target-lg);
    min-width: var(--touch-target-lg);
  }
  
  /* Enhanced tap states */
  .tap-highlight {
    -webkit-tap-highlight-color: rgba(59, 130, 246, 0.1);
    transition: all 0.15s ease;
  }
  
  .tap-highlight:active {
    transform: scale(0.98);
    opacity: 0.8;
  }
  
  /* === Loading States === */
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200px 100%;
    animation: shimmer 1.5s infinite;
  }
  
  .loading-pulse {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200px 100%;
    animation: shimmer 1.5s infinite;
  }
  
  /* === Scroll & Safe Area Optimizations === */
  .scroll-smooth { scroll-behavior: smooth; }
  .overscroll-none { overscroll-behavior: none; }
  
  .safe-area-top { padding-top: var(--safe-area-top); }
  .safe-area-bottom { padding-bottom: var(--safe-area-bottom); }
  .safe-area-inset { 
    padding-top: var(--safe-area-top);
    padding-bottom: var(--safe-area-bottom);
    padding-left: var(--safe-area-left);
    padding-right: var(--safe-area-right);
  }
  
  /* === Enhanced Mobile Gradients === */
  .gradient-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .gradient-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .gradient-success {
    background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  }
  
  .gradient-glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  /* === Mobile Typography Optimizations === */
  .text-balance { text-wrap: balance; }
  .text-pretty { text-wrap: pretty; }
  
  /* === Focus Management === */
  .focus-ring {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  
  .focus-ring:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  
  /* === Mobile-specific Utilities === */
  @media (max-width: 640px) {
    .mobile-full-width { width: 100vw; margin-left: calc(-50vw + 50%); }
    .mobile-card-spacing { margin: 0 0.75rem; }
    .mobile-section-spacing { margin-bottom: 1rem; }
    
    /* Mobile-optimized touch targets */
    .mobile-touch-optimized {
      min-height: 48px;
      padding: 12px 16px;
    }
    
    /* Mobile text sizing */
    .mobile-text-sm { font-size: 0.875rem; line-height: 1.25rem; }
    .mobile-text-base { font-size: 1rem; line-height: 1.5rem; }
    .mobile-text-lg { font-size: 1.125rem; line-height: 1.75rem; }
    
    /* Mobile spacing scale */
    .mobile-p-3 { padding: 0.75rem; }
    .mobile-p-4 { padding: 1rem; }
    .mobile-mb-3 { margin-bottom: 0.75rem; }
    .mobile-mb-4 { margin-bottom: 1rem; }
  }
  
  /* === Dark Mode Support === */
  @media (prefers-color-scheme: dark) {
    .auto-dark-bg { background-color: #1f2937; }
    .auto-dark-text { color: #f9fafb; }
    .auto-dark-border { border-color: #374151; }
  }
  
  /* === High Contrast Mode === */
  @media (prefers-contrast: high) {
    .contrast-border { border-width: 2px !important; }
    .contrast-text { font-weight: 600 !important; }
  }
  
  /* === Print Optimizations === */
  @media print {
    .print-hidden { display: none !important; }
    .print-visible { display: block !important; }
  }
  
  /* === Scrollbar Styling for Better Mobile UX === */
  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
  
  .scrollbar-thin {
    scrollbar-width: thin;
  }
  
  .scrollbar-thin::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.5);
    border-radius: 2px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.8);
  }
`

// Extended tour data for tour-search-28 specific detail pages
const tourData = [
  {
    id: 'tour-jp-001',
    title: 'ทัวร์ญี่ปุ่น โตเกียว เกียวโต ซากุระบูม',
    subtitle: 'สัมผัสความงามของซากุระในฤดูใบไม้ผลิ',
    destination: 'ญี่ปุ่น',
    cities: ['โตเกียว', 'เกียวโต', 'โอซาก้า'],
    duration: '5 วัน 4 คืน',
    price: 45900,
    originalPrice: 52900,
    rating: 4.8,
    reviewCount: 156,
    bookingCount: 342,
    lastBookedAt: '3 นาทีที่แล้ว',
    viewingNow: 28,
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=800&fit=crop',
    heroVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    flashSale: true,
    flashSaleEnd: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop'
    ],
    highlights: [
      { icon: '🌸', title: 'ชมซากุระ', description: 'ฤดูกาลดอกซากุระบาน มี.ค.-เม.ย.' },
      { icon: '⛩️', title: 'วัดเก่าแก่', description: 'วัดเซ็นโซจิ อายุกว่า 1,400 ปี' },
      { icon: '🚄', title: 'รถไฟชินคันเซน', description: 'ประสบการณ์รถไฟความเร็วสูง 320 กม./ชม.' },
      { icon: '🗾', title: 'ฟูจิซัง', description: 'ภูเขาไฟศักดิ์สิทธิ์ สูง 3,776 เมตร' }
    ],
    available: true,
    availableSeats: 8,
    features: ['ไกด์ไทย', 'รถปรับอากาศ', 'อาหาร 3 มื้อ', 'โรงแรม 4 ดาว', 'ประกันเดินทาง'],
    departures: [
      { 
        id: 1, 
        date: '2025-03-15', 
        dateLabel: '15 มีนาคม 2568', 
        price: 45900, 
        seats: 8, 
        status: 'available',
        specialNote: 'ช่วงซากุระบาน' 
      },
      { 
        id: 2, 
        date: '2025-03-22', 
        dateLabel: '22 มีนาคม 2568', 
        price: 47900, 
        seats: 12, 
        status: 'available',
        specialNote: 'วันหยุดยาว' 
      },
      { 
        id: 3, 
        date: '2025-04-05', 
        dateLabel: '5 เมษายน 2568', 
        price: 49900, 
        seats: 3, 
        status: 'limited',
        specialNote: 'ซากุระเต็มบาน' 
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'เดินทางถึงโตเกียว',
        location: 'โตเกียว',
        highlight: 'ย่านชิบูยา',
        activities: [
          { time: '09:30', activity: 'เดินทางจากสนามบินสุวรรณภูมิ (TG642)' },
          { time: '17:00', activity: 'เดินทางถึงสนามบินนาริตะ โตเกียว' },
          { time: '19:00', activity: 'เช็คอินโรงแรม Shinagawa Prince Hotel (4⭐)' },
          { time: '20:30', activity: 'เดินเล่นย่านชิบูยา ถ่ายรูป Shibuya Crossing' }
        ],
        meals: ['อาหารค่ำ'],
        accommodation: 'Shinagawa Prince Hotel 4⭐'
      },
      {
        day: 2,
        title: 'ชมซากุระ อุเอโนะ',
        location: 'โตเกียว',
        highlight: 'สวนอุเอโนะ',
        activities: [
          { time: '08:00', activity: 'อาหารเช้าที่โรงแรม' },
          { time: '09:30', activity: 'ชมซากุระสวนอุเอโนะ (Ueno Park)' },
          { time: '13:30', activity: 'วัดเซ็นโซจิ อาซากุสะ (Sensoji Temple)' },
          { time: '15:00', activity: 'ช้อปปิ้งถนน Nakamise' },
          { time: '16:30', activity: 'ล่องเรือแม่น้ำสุมิดะ ชมซากุระ' }
        ],
        meals: ['อาหารเช้า', 'อาหารกลางวัน', 'อาหารค่ำ'],
        accommodation: 'Shinagawa Prince Hotel 4⭐'
      },
      {
        day: 3,
        title: 'ภูเขาไฟฟูจิ',
        location: 'ฟูจิ-คาวากุจิ',
        highlight: 'ทะเลสาบคาวากุจิ',
        activities: [
          { time: '07:00', activity: 'อาหารเช้าแบบกล่อง' },
          { time: '08:00', activity: 'เดินทางสู่ภูเขาไฟฟูจิ (2 ชม.)' },
          { time: '10:30', activity: 'ขึ้นกระเช้าไฟฟูจิ ชั้น 5' },
          { time: '14:00', activity: 'ชมทะเลสาบคาวากุจิ (Lake Kawaguchi)' },
          { time: '15:30', activity: 'ถ่ายรูปซากุระพร้อมฟูจิซัง' }
        ],
        meals: ['อาหารเช้า', 'อาหารกลางวัน'],
        accommodation: 'Kyoto Tower Hotel 4⭐'
      },
      {
        day: 4,
        title: 'เกียวโต โบราณ',
        location: 'เกียวโต',
        highlight: 'วัดทองคำ',
        activities: [
          { time: '08:00', activity: 'อาหารเช้าญี่ปุ่น' },
          { time: '09:00', activity: 'วัดทองคำ คินคะคุจิ (Kinkaku-ji)' },
          'สวนไผ่อารชิยามะ',
          'ย่านเก๋อิชะ กิออน',
          'วัดเคียวมิซุเดระ'
        ],
        meals: ['อาหารเช้า', 'อาหารกลางวัน', 'อาหารค่ำ'],
        accommodation: 'Kyoto Tower Hotel 4⭐'
      },
      {
        day: 5,
        title: 'เดินทางกลับ',
        location: 'กลับประเทศไทย',
        highlight: 'ช้อปปิ้งสนามบิน',
        activities: [
          'ช้อปปิ้งของฝากล่าสุด',
          'เดินทางสู่สนามบิน',
          'เดินทางกลับประเทศไทย'
        ],
        meals: ['อาหารเช้า', 'อาหารบนเครื่องบิน'],
        accommodation: '-'
      }
    ],
    included: [
      'ตั๋วเครื่องบิน ไป-กลับ (Thai Airways)',
      'โรงแรม 4 ดาว (2 คืนต่อเมือง)',
      'อาหาร 3 มื้อตามรายการ',
      'รถรับส่งและนำเที่ยวปรับอากาศ',
      'ไกด์ท้องถิ่นพูดไทยได้',
      'ค่าเข้าชมสถานที่ทุกแห่ง',
      'ประกันการเดินทางพื้นฐาน',
      'ภาษีสนามบินทุกแห่ง'
    ],
    excluded: [
      'ค่าทิปไกด์และคนขับ (1,500 บาท/ท่าน)',
      'ค่าวีซ่าญี่ปุ่น (หากจำเป็น)',
      'ประกันการเดินทางเพิ่มเติม',
      'ค่าใช้จ่ายส่วนตัว',
      'อาหารและเครื่องดื่มนอกโปรแกรม',
      'ค่าโทรศัพท์และอินเทอร์เน็ต',
      'ค่าธรรมเนียมกระเป๋าเพิ่ม'
    ],
    policies: {
      deposit: 10000,
      cancellation: 'ยกเลิกฟรี 30 วันก่อนเดินทาง',
      payment: ['เงินสด', 'โอนธนาคาร', 'บัตรเครดิต'],
      documents: ['หนังสือเดินทาง (อายุเหลือ > 6 เดือน)', 'รูปถ่าย 2x2 จำนวน 2 ใบ']
    },
    reviews: [
      {
        id: 1,
        name: 'คุณสมใจ เที่ยวดี',
        rating: 5,
        date: '2025-01-15',
        review: 'ทัวร์ดีมาก ไกด์ดูแลดี ซากุระสวยมาก ประทับใจสุดๆ แนะนำเลย!',
        images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop'],
        verified: true
      },
      {
        id: 2,
        name: 'คุณมาลี รักเที่ยว',
        rating: 4,
        date: '2025-01-10',
        review: 'โรงแรมดี อาหารอร่อย แต่เดินเยอะหน่อย โดยรวมดีมาก คุ้มค่าเงิน',
        verified: true
      }
    ],
    faqs: [
      {
        q: 'ต้องเตรียมเอกสารอะไรบ้าง?',
        a: 'หนังสือเดินทางที่มีอายุเหลือมากกว่า 6 เดือน และรูปถ่าย 2x2 จำนวน 2 ใบ สำหรับการขอวีซ่า (หากจำเป็น)'
      },
      {
        q: 'สามารถยกเลิกการจองได้หรือไม่?',
        a: 'สามารถยกเลิกได้ฟรี 30 วันก่อนเดินทาง หลังจากนั้นจะมีค่าธรรมเนียมตามเงื่อนไข'
      },
      {
        q: 'มีประกันการเดินทางหรือไม่?',
        a: 'รวมประกันการเดินทางพื้นฐานแล้ว แต่แนะนำให้ซื้อประกันเพิ่มเติมเพื่อความคุ้มครองที่ครอบคลุม'
      },
      {
        q: 'อากาศในญี่ปุ่นช่วงนี้เป็นอย่างไร?',
        a: 'อุณหภูมิประมาณ 15-22 องศา เซลเซียส แนะนำให้เตรียมเสื้อแขนยาวและเสื้อกันหนาว'
      }
    ],
    seo: {
      title: 'ทัวร์ญี่ปุ่น โตเกียว เกียวโต ซากุระบูม 5วัน4คืน',
      description: 'ทัวร์ญี่ปุ่นซากุระบูม เที่ยวโตเกียว เกียวโต ชมวัดเก่าแก่ ขึ้นภูเขาไฟฟูจิ พร้อมไกด์ไทย โรงแรม 4 ดาว เริ่มต้น 45,900 บาท',
      keywords: ['ทัวร์ญี่ปุ่น', 'ซากุระ', 'โตเกียว', 'เกียวโต', 'ฟูจิซัง', 'ทัวร์ต่างประเทศ']
    }
  }
  // Add more tours as needed
]

interface TourDetailPageProps {
  params: Promise<{ id: string }>
}

export default function TourDetailPage({ params }: TourDetailPageProps) {
  const resolvedParams = use(params)
  const searchParams = useSearchParams()
  const source = searchParams.get('src')
  
  // State management
  const [activeImage, setActiveImage] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [selectedDeparture, setSelectedDeparture] = useState(0)
  const [showBookingSheet, setShowBookingSheet] = useState(false)
  const [bookingStep, setBookingStep] = useState(1)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [viewingCount, setViewingCount] = useState(28)
  const [recentBooking, setRecentBooking] = useState('คุณสมใจ จองเมื่อ 3 นาทีที่แล้ว')
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [flashSaleTime, setFlashSaleTime] = useState({
    hours: 23,
    minutes: 45, 
    seconds: 30
  })
  
  // Refs
  const heroRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  
  // Find tour
  const tour = tourData.find(t => t.id === resolvedParams.id)
  
  if (!tour) {
    notFound()
  }

  // Check source parameter
  useEffect(() => {
    if (source !== 'search28') {
      console.warn('Direct access detected - missing src=search28 parameter')
    }
  }, [source])

  // Dynamic viewing count
  useEffect(() => {
    const interval = setInterval(() => {
      setViewingCount(prev => Math.max(15, Math.min(45, prev + Math.floor(Math.random() * 5) - 2)))
    }, 8000)
    
    return () => clearInterval(interval)
  }, [])

  // Flash Sale Timer
  useEffect(() => {
    if (!tour.flashSale) return
    
    const timer = setInterval(() => {
      setFlashSaleTime(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  // Enhanced micro-interactions
  const handleHeartClick = () => {
    setIsBookmarked(!isBookmarked)
    // Heart animation
    const heartBtn = document.querySelector('.heart-btn')
    if (heartBtn) {
      heartBtn.classList.add('animate-count-up')
      setTimeout(() => heartBtn.classList.remove('animate-count-up'), 500)
    }
    trackEvent('bookmark_clicked', { bookmarked: !isBookmarked })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tour.title,
          text: tour.subtitle,
          url: window.location.href
        })
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
    trackEvent('share_clicked')
  }

  // Recent booking updates
  useEffect(() => {
    const bookings = [
      'คุณสมใจ จองเมื่อ 3 นาทีที่แล้ว',
      'คุณมาลี จองเมื่อ 7 นาทีที่แล้ว', 
      'คุณประยุทธ์ จองเมื่อ 12 นาทีที่แล้ว',
      'คุณสุภาพร จองเมื่อ 18 นาทีที่แล้ว'
    ]
    
    const interval = setInterval(() => {
      const randomBooking = bookings[Math.floor(Math.random() * bookings.length)]
      setRecentBooking(randomBooking)
    }, 15000)
    
    return () => clearInterval(interval)
  }, [])

  // Sticky bar visibility
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight
        setShowStickyBar(window.scrollY > heroBottom - 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Gallery swipe handling
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && activeImage < tour.gallery.length - 1) {
      setActiveImage(activeImage + 1)
    } else if (direction === 'right' && activeImage > 0) {
      setActiveImage(activeImage - 1)
    }
  }

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(price)
  }

  // Analytics events
  const trackEvent = (eventName: string, data?: any) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        tour_id: tour.id,
        tour_name: tour.title,
        price: tour.price,
        source: source || 'direct',
        ...data
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Custom Styles */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Enhanced SEO Head */}
      <Head>
        <title>{tour.seo.title} | TourWow</title>
        <meta name="description" content={tour.seo.description} />
        <meta name="keywords" content={tour.seo.keywords.join(', ')} />
        
        {/* Open Graph Enhanced */}
        <meta property="og:title" content={`${tour.title} - ราคาพิเศษ ฿${formatPrice(tour.price)}`} />
        <meta property="og:description" content={tour.seo.description} />
        <meta property="og:image" content={tour.heroImage} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={tour.price.toString()} />
        <meta property="product:price:currency" content="THB" />
        
        {/* Enhanced JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristTrip",
              "name": tour.title,
              "description": tour.seo.description,
              "image": tour.heroImage,
              "offers": {
                "@type": "Offer",
                "price": tour.price,
                "priceCurrency": "THB",
                "availability": tour.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                "url": `https://tourwow.com/tour-search-28/${tour.id}`
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": tour.rating,
                "reviewCount": tour.reviewCount,
                "bestRating": 5
              },
              "itinerary": tour.itinerary?.map(day => ({
                "@type": "Day",
                "name": day.title,
                "description": day.activities.map(act => typeof act === 'string' ? act : act.activity).join(', ')
              }))
            })
          }}
        />
        
        <link rel="canonical" href={`https://tourwow.com/tour-search-28/${tour.id}`} />
      </Head>

      {/* Enhanced Mobile Header with Safe Areas & Progress */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 safe-area-top">
        <div className="relative">
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
               style={{ width: showStickyBar ? '100%' : '0%' }}
          />
          
          <div className="flex items-center justify-between px-4 py-3 min-h-[44px]">
            {/* Back Button - Enhanced Touch Target */}
            <Link 
              href="/tour-search-28" 
              className="flex items-center text-gray-700 hover:text-gray-900 transition-all duration-200 touch-target tap-highlight focus-ring rounded-lg -ml-2"
              onClick={() => trackEvent('back_button_clicked')}
              aria-label="กลับไปหน้าหลัก"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium text-sm">กลับ</span>
            </Link>
            
            {/* Center Title - Shows on Scroll */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
              showStickyBar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              <h1 className="font-semibold text-gray-900 text-sm truncate max-w-[200px] text-balance">
                {tour.title}
              </h1>
            </div>
            
            {/* Action Buttons - Enhanced Touch Targets */}
            <div className="flex items-center space-x-1">
              <button
                onClick={handleHeartClick}
                className={`heart-btn touch-target tap-highlight focus-ring rounded-full transition-all duration-300 ${
                  isBookmarked 
                    ? 'bg-red-100 text-red-600 shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label={isBookmarked ? 'ยกเลิกบันทึก' : 'บันทึกทัวร์'}
                aria-pressed={isBookmarked}
              >
                <Heart className={`w-5 h-5 transition-all duration-300 ${
                  isBookmarked ? 'fill-current scale-110' : ''
                }`} />
              </button>
              
              <button
                onClick={handleShare}
                className="touch-target tap-highlight focus-ring bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all duration-200"
                aria-label="แชร์ทัวร์"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section with Better Mobile Sizing */}
      <section ref={heroRef} className="relative h-[100vh] min-h-[500px] max-h-[700px] sm:min-h-[600px] sm:max-h-[900px] overflow-hidden safe-area-top">
        {/* Loading Skeleton */}
        <div className="absolute inset-0 skeleton animate-pulse bg-gray-200" />
        
        {/* Hero Image with Enhanced Loading */}
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          className="object-cover transition-opacity duration-700"
          priority
          sizes="100vw"
          quality={85}
          onLoad={(e) => {
            e.currentTarget.previousElementSibling?.remove()
          }}
        />
        
        {/* Enhanced Gradient Overlay with Better Mobile Optimization */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        
        {/* Floating Trust Badges */}
        <div className="absolute top-20 left-4 flex flex-wrap gap-2">
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <Flame className="w-4 h-4" />
            HOT
          </div>
          {tour.availableSeats <= 10 && (
            <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              เหลือ {tour.availableSeats} ที่!
            </div>
          )}
        </div>

        {/* Enhanced Gallery & Video Buttons with Better Mobile Touch Targets */}
        <div className="absolute top-16 sm:top-20 right-3 sm:right-4 flex flex-col gap-2 sm:gap-3 animate-fade-in">
          <button
            onClick={() => {
              setShowGallery(true)
              trackEvent('gallery_opened')
            }}
            className="touch-target-lg bg-black/70 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 backdrop-blur-md hover:bg-black/80 transition-all duration-300 tap-highlight focus-ring border border-white/20"
            aria-label={`ดูรูปภาพ ${tour.gallery.length} รูป`}
          >
            <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{tour.gallery.length} รูป</span>
          </button>
          
          {tour.heroVideo && (
            <button
              onClick={() => {
                setShowVideo(true)
                trackEvent('video_play_clicked')
              }}
              className="touch-target-lg bg-red-500/90 text-white rounded-full backdrop-blur-md hover:bg-red-600 hover:scale-105 transition-all duration-300 tap-highlight focus-ring shadow-lg animate-bounce-gentle p-2.5 sm:p-3"
              aria-label="เล่นวิดีโอทัวร์"
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
            </button>
          )}
        </div>

        {/* Enhanced Hero Content with Better Mobile Typography */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 safe-area-bottom text-white">
          {/* Enhanced Real-time Social Proof */}
          <div className="bg-green-500/95 backdrop-blur-md rounded-full px-4 py-2 mb-4 inline-flex items-center gap-2 shadow-md animate-slide-in-left">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium">{viewingCount} คนกำลังดู</span>
            <Eye className="w-3 h-3 opacity-80" />
          </div>

          {/* Enhanced Title with Better Mobile Typography */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight text-balance animate-fade-in">
            {tour.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl opacity-95 mb-6 text-pretty leading-relaxed animate-fade-in">
            {tour.subtitle}
          </p>
          
          {/* Enhanced Meta Info Pills */}
          <div className="flex flex-wrap gap-2 mb-8 animate-slide-up">
            <div className="bg-white/25 backdrop-blur-md px-3 py-2 rounded-full flex items-center gap-2 border border-white/20">
              <MapPin className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">{tour.cities.join(' • ')}</span>
            </div>
            <div className="bg-white/25 backdrop-blur-md px-3 py-2 rounded-full flex items-center gap-2 border border-white/20">
              <Clock className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-medium">{tour.duration}</span>
            </div>
            <div className="bg-white/25 backdrop-blur-md px-3 py-2 rounded-full flex items-center gap-2 border border-white/20">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span className="text-sm font-medium">{tour.rating} ({tour.reviewCount})</span>
            </div>
          </div>

          {/* Enhanced Price & CTA Section */}
          <div className="flex items-end justify-between gap-4 animate-slide-up">
            <div className="flex-1 min-w-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-1 tracking-tight">
                ฿{formatPrice(tour.price)}
                <span className="text-sm sm:text-lg lg:text-xl font-normal opacity-80 ml-1">/คน</span>
              </div>
              {tour.originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-sm opacity-75 line-through">
                    ฿{formatPrice(tour.originalPrice)}
                  </span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    ประหยัด ฿{formatPrice(tour.originalPrice - tour.price)}
                  </span>
                </div>
              )}
            </div>
            
            {/* Enhanced CTA Button with Better Mobile Size */}
            <button
              onClick={() => {
                setShowBookingSheet(true)
                trackEvent('quick_book_clicked', { location: 'hero' })
              }}
              className="touch-target-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 tap-highlight focus-ring border border-white/20 min-w-[100px] sm:min-w-[120px]"
              aria-label="จองทัวร์ทันที"
            >
              <span className="flex items-center gap-1.5 sm:gap-2">
                <span className="whitespace-nowrap">จองเลย</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Main Content Cards with Better Mobile Spacing */}
      <div className="relative -mt-6 sm:-mt-8 z-10 overscroll-none">
        {/* Enhanced Highlights Card */}
        <div className="bg-white rounded-t-3xl shadow-elevated mx-3 sm:mx-4 mb-4 sm:mb-6 p-4 sm:p-6 animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 text-balance">ไฮไลท์ทริป</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tour.highlights.map((highlight, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100 hover:shadow-md transition-all duration-300 tap-highlight"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl mb-3 animate-float" style={{ animationDelay: `${index * 200}ms` }}>
                  {highlight.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-balance leading-snug">
                  {highlight.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed text-pretty">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Recent Booking Alert */}
        <div className="mx-3 sm:mx-4 mb-4 sm:mb-6 animate-slide-up">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/80 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex-shrink-0">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/30" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm text-green-800 font-medium leading-relaxed text-pretty">
                {recentBooking}
              </span>
            </div>
            <div className="flex-shrink-0">
              <ThumbsUp className="w-5 h-5 text-green-600 animate-bounce-gentle" />
            </div>
          </div>
        </div>

        {/* Enhanced Departure Selection Card */}
        <div className="bg-white rounded-2xl shadow-elevated mx-3 sm:mx-4 mb-4 sm:mb-6 p-4 sm:p-6 animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 text-balance flex-1">เลือกวันเดินทาง</h2>
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold animate-pulse">
              จำกัด!
            </div>
          </div>
          
          <div className="space-y-4">
            {tour.departures.map((departure, index) => (
              <button
                key={departure.id}
                onClick={() => {
                  setSelectedDeparture(index)
                  trackEvent('departure_selected', { departure_id: departure.id })
                }}
                className={`w-full p-5 rounded-2xl border-2 transition-all duration-300 tap-highlight focus-ring touch-target ${
                  selectedDeparture === index
                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md animate-pulse-border'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
                aria-label={`เลือกวันเดินทาง ${departure.dateLabel} ราคา ${formatPrice(departure.price)} บาท`}
                aria-pressed={selectedDeparture === index}
              >
                <div className="flex justify-between items-center gap-4">
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 mb-1 text-balance">
                      {departure.dateLabel}
                    </div>
                    <div className="text-sm text-gray-600 mb-2 text-pretty">
                      {departure.specialNote}
                    </div>
                    <div className={`text-sm flex items-center gap-1.5 ${
                      departure.seats <= 5 ? 'text-red-500 font-medium' : 'text-gray-500'
                    }`}>
                      <Users className="w-4 h-4 flex-shrink-0" />
                      <span>เหลือ {departure.seats} ที่นั่ง</span>
                      {departure.seats <= 5 && (
                        <AlertCircle className="w-3 h-3 text-red-500 animate-bounce-gentle" />
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      ฿{formatPrice(departure.price)}
                    </div>
                    <div className="text-sm text-gray-500">ต่อคน</div>
                    {selectedDeparture === index && (
                      <div className="mt-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Floating Timeline - Itinerary */}
        <div className="bg-white rounded-2xl shadow-elevated mx-3 sm:mx-4 mb-4 sm:mb-6 p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Navigation className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-bold">กำหนดการเดินทาง</h2>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            
            {tour.itinerary.map((day, index) => (
              <div key={day.day} className="relative flex gap-4 pb-6 last:pb-0">
                {/* Day Circle */}
                <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {day.day}
                </div>
                
                {/* Day Content */}
                <div className="flex-1 pt-2">
                  <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className="font-bold text-gray-900 mb-1">{day.title}</h3>
                    <p className="text-sm text-blue-600 mb-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {day.location}
                    </p>
                    <div className="text-sm text-gray-600">
                      <div className="font-medium text-orange-600 mb-2 flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        {day.highlight}
                      </div>
                      <div className="space-y-1">
                        {day.activities.slice(0, 3).map((activity, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-2 bg-white/60 rounded-lg">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold mt-0.5 flex-shrink-0">
                              {typeof activity === 'object' ? activity.time : (idx + 1)}
                            </div>
                            <span className="text-gray-700">
                              {typeof activity === 'object' ? activity.activity : activity}
                            </span>
                          </div>
                        ))}
                        {day.activities.length > 3 && (
                          <div className="text-blue-600 text-xs font-medium bg-blue-50 px-2 py-1 rounded-full inline-block">
                            +{day.activities.length - 3} กิจกรรมเพิ่มเติม
                          </div>
                        )}
                      </div>
                      
                      {/* Enhanced Day Details */}
                      <div className="mt-3 pt-3 border-t border-gray-200 flex flex-wrap gap-2">
                        {day.meals && day.meals.map((meal, mealIdx) => (
                          <span key={mealIdx} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <Utensils className="w-3 h-3" />
                            {meal}
                          </span>
                        ))}
                        {day.accommodation && (
                          <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <Hotel className="w-3 h-3" />
                            {day.accommodation}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust & Features Card */}
        <div className="bg-white rounded-2xl shadow-lg mx-4 mb-6 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-bold">ความมั่นใจ & บริการ</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {tour.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-blue-500" />
                <span>รับรอง ททท.</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-500" />
                <span>ประกันเดินทาง</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4 text-purple-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Card */}
        <div className="bg-white rounded-2xl shadow-lg mx-4 mb-6 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-500 fill-current" />
            <h2 className="text-xl font-bold">รีวิวจากลูกค้า</h2>
            <div className="ml-auto bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold">
              {tour.rating}/5
            </div>
          </div>
          
          <div className="space-y-4">
            {tour.reviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {review.name.charAt(2)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{review.name}</div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                      {review.verified && (
                        <div className="ml-2 flex items-center gap-1 text-green-600 text-xs">
                          <CheckCircle className="w-3 h-3" />
                          ยืนยันแล้ว
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{review.review}</p>
                {review.images && (
                  <div className="mt-3 flex gap-2">
                    {review.images.map((img, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image src={img} alt={`Review ${idx + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Card */}
        <div className="bg-white rounded-2xl shadow-lg mx-4 mb-6 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold">คำถามที่พบบ่อย</h2>
          </div>
          
          <div className="space-y-3">
            {tour.faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {expandedFAQ === index && (
                  <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mx-4 mb-20 p-6 text-white">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">ต้องการสอบถามเพิ่มเติม?</h2>
            <p className="opacity-90 mb-4">ทีมงานพร้อมดูแลตลอด 24 ชั่วโมง</p>
            
            <div className="flex gap-3">
              <a 
                href="tel:+66123456789"
                className="flex-1 bg-white/20 backdrop-blur-sm py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-colors"
                onClick={() => trackEvent('phone_clicked')}
              >
                <Phone className="w-5 h-5" />
                โทรเลย
              </a>
              <a 
                href="https://line.me/ti/p/~@tourwow"
                className="flex-1 bg-green-500 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                onClick={() => trackEvent('line_clicked')}
              >
                <MessageCircle className="w-5 h-5" />
                Line Chat
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Sticky Bottom Bar with Safe Area Support */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-floating safe-area-bottom animate-slide-up">
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-lg font-bold text-blue-600 mb-0.5">
                  ฿{formatPrice(tour.departures[selectedDeparture].price)}
                </div>
                <div className="text-sm text-gray-500 truncate text-pretty">
                  {tour.departures[selectedDeparture].dateLabel}
                </div>
                {tour.departures[selectedDeparture].seats <= 5 && (
                  <div className="text-xs text-red-500 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    เหลือ {tour.departures[selectedDeparture].seats} ที่นั่ง
                  </div>
                )}
              </div>
              
              <button
                onClick={() => {
                  setShowBookingSheet(true)
                  trackEvent('sticky_book_clicked')
                }}
                className="touch-target-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 tap-highlight focus-ring border border-white/20 min-w-[120px]"
                aria-label="จองทัวร์ทันที"
              >
                <span className="flex items-center gap-2">
                  จองทัวร์
                  <Calendar className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Gallery Modal with Touch Gestures & Loading States */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center safe-area-inset overscroll-none">
          <div className="relative w-full h-full max-w-4xl">
            {/* Enhanced Close Button */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 z-10 touch-target bg-black/60 text-white rounded-full backdrop-blur-md hover:bg-black/70 transition-all duration-300 tap-highlight focus-ring"
              aria-label="ปิดแกลเลอรี"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Enhanced Image Counter */}
            <div className="absolute top-4 left-4 z-10 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md">
              {activeImage + 1} / {tour.gallery.length}
            </div>
            
            {/* Loading Skeleton for Main Image */}
            <div className="absolute inset-4 rounded-lg skeleton animate-pulse bg-gray-600" />
            
            {/* Enhanced Main Image with Loading State */}
            <div className="relative w-full h-full p-4">
              <Image
                src={tour.gallery[activeImage]}
                alt={`รูปภาพทัวร์ ${activeImage + 1}`}
                fill
                className="object-contain transition-opacity duration-500 rounded-lg"
                quality={90}
                onLoad={(e) => {
                  e.currentTarget.previousElementSibling?.remove()
                }}
              />
            </div>
            
            {/* Enhanced Navigation with Better Touch Targets */}
            {activeImage > 0 && (
              <button
                onClick={() => setActiveImage(activeImage - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 touch-target-lg bg-black/60 text-white rounded-full backdrop-blur-md hover:bg-black/70 transition-all duration-300 tap-highlight focus-ring"
                aria-label="รูปก่อนหน้า"
              >
                <ChevronDown className="w-6 h-6 rotate-90" />
              </button>
            )}
            
            {activeImage < tour.gallery.length - 1 && (
              <button
                onClick={() => setActiveImage(activeImage + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 touch-target-lg bg-black/60 text-white rounded-full backdrop-blur-md hover:bg-black/70 transition-all duration-300 tap-highlight focus-ring"
                aria-label="รูปถัดไป"
              >
                <ChevronDown className="w-6 h-6 -rotate-90" />
              </button>
            )}
            
            {/* Enhanced Thumbnails with Better Scrolling */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md">
              <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-none">
                {tour.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-300 tap-highlight ${
                      index === activeImage 
                        ? 'border-white shadow-lg shadow-white/20 scale-110' 
                        : 'border-white/40 hover:border-white/70'
                    }`}
                    aria-label={`ดูรูปที่ ${index + 1}`}
                  >
                    <Image 
                      src={img} 
                      alt={`ตัวอย่างรูปที่ ${index + 1}`} 
                      fill 
                      className="object-cover transition-opacity duration-300" 
                      quality={60}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Booking Bottom Sheet with Better Form UX */}
      {showBookingSheet && (
        <div className="fixed inset-0 z-50 bg-black/50 safe-area-inset">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90vh] overflow-hidden animate-slide-up">
            {/* Enhanced Header with Progress */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 z-10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900 text-balance">
                  {bookingStep === 1 ? 'ยืนยันการจอง' : 'ขอบคุณสำหรับความสนใจ'}
                </h3>
                <button
                  onClick={() => setShowBookingSheet(false)}
                  className="touch-target text-gray-500 hover:text-gray-700 tap-highlight focus-ring rounded-lg"
                  aria-label="ปิดหน้าต่างการจอง"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Progress Indicator */}
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  bookingStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <div className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                  bookingStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'
                }`} />
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  bookingStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
              </div>
            </div>
            
            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)] overscroll-none">
              <div className="p-6">
            
                {bookingStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Enhanced Tour Summary */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 border border-blue-100">
                      <h4 className="font-semibold text-gray-900 mb-3 text-balance leading-snug">
                        {tour.title}
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600">{tour.departures[selectedDeparture].dateLabel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600">{tour.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Guest Count */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        จำนวนผู้เดินทาง
                      </label>
                      <div className="flex items-center justify-center gap-6 bg-gray-50 rounded-xl p-4">
                        <button 
                          className="touch-target-lg bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-all duration-200 tap-highlight focus-ring"
                          aria-label="ลดจำนวนผู้เดินทาง"
                        >
                          <span className="text-xl font-bold text-gray-600">−</span>
                        </button>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">1</div>
                          <div className="text-xs text-gray-500">ผู้ใหญ่</div>
                        </div>
                        <button 
                          className="touch-target-lg bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all duration-200 tap-highlight focus-ring"
                          aria-label="เพิ่มจำนวนผู้เดินทาง"
                        >
                          <span className="text-xl font-bold">+</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Enhanced Price Summary */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border border-blue-200">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-700">ราคาต่อคน</span>
                        <span className="font-semibold text-gray-900">
                          ฿{formatPrice(tour.departures[selectedDeparture].price)}
                        </span>
                      </div>
                      <div className="border-t border-blue-200 pt-3">
                        <div className="flex justify-between items-center text-xl font-bold text-blue-600">
                          <span>รวมทั้งหมด</span>
                          <span>฿{formatPrice(tour.departures[selectedDeparture].price)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Action Buttons */}
                    <div className="space-y-4 pt-2">
                      <button
                        onClick={() => {
                          setBookingStep(2)
                          trackEvent('booking_continue_clicked')
                        }}
                        className="w-full touch-target-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] tap-highlight focus-ring"
                        aria-label="ดำเนินการจองต่อ"
                      >
                        <span className="flex items-center justify-center gap-2">
                          ดำเนินการต่อ
                          <ChevronRight className="w-5 h-5" />
                        </span>
                      </button>
                      
                      <div className="flex gap-3">
                        <a 
                          href="tel:+66123456789"
                          className="flex-1 touch-target border-2 border-green-500 text-green-600 py-3.5 rounded-xl font-semibold text-center hover:bg-green-50 transition-all duration-200 tap-highlight focus-ring"
                          aria-label="โทรสอบถามข้อมูลเพิ่มเติม"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" />
                            โทรสอบถาม
                          </span>
                        </a>
                        <a 
                          href="https://line.me/ti/p/~@tourwow"
                          className="flex-1 touch-target bg-green-500 text-white py-3.5 rounded-xl font-semibold text-center hover:bg-green-600 transition-all duration-200 tap-highlight focus-ring"
                          aria-label="แชทผ่าน LINE"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            Line Chat
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
            
                {bookingStep === 2 && (
                  <div className="space-y-8 animate-fade-in text-center">
                    {/* Success Animation */}
                    <div className="relative">
                      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-count-up" />
                      <div className="absolute inset-0 animate-ping">
                        <CheckCircle className="w-20 h-20 text-green-500 opacity-20 mx-auto" />
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
                        ขอบคุณสำหรับความสนใจ!
                      </h4>
                      <p className="text-gray-600 leading-relaxed mb-8 text-pretty max-w-sm mx-auto">
                        ระบบจองออนไลน์จะเปิดให้บริการเร็วๆ นี้
                        <br />
                        ขณะนี้สามารถติดต่อทีมงานเพื่อจองได้เลย
                      </p>
                    </div>
                    
                    {/* Enhanced Contact Options */}
                    <div className="space-y-4">
                      <a 
                        href="tel:+66123456789"
                        className="w-full touch-target-lg bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] tap-highlight focus-ring"
                        onClick={() => trackEvent('final_phone_clicked')}
                        aria-label="โทรติดต่อทีมงาน"
                      >
                        <Phone className="w-5 h-5" />
                        <span>โทร 02-123-4567</span>
                      </a>
                      
                      <a 
                        href="https://line.me/ti/p/~@tourwow"
                        className="w-full touch-target-lg border-2 border-green-500 text-green-600 hover:bg-green-50 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 tap-highlight focus-ring"
                        onClick={() => trackEvent('final_line_clicked')}
                        aria-label="แชทผ่าน LINE"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>แชท LINE @tourwow</span>
                      </a>
                    </div>
                    
                    {/* Additional Info */}
                    <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                      <p className="text-sm text-blue-800 text-pretty">
                        💡 <strong>เคล็ดลับ:</strong> บันทึกหน้านี้ไว้เพื่อดูรายละเอียดทัวร์อีกครั้ง
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Video Modal with Better UX */}
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center safe-area-inset overscroll-none">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl animate-slide-up">
            {/* Loading Skeleton */}
            <div className="absolute inset-0 skeleton animate-pulse bg-gray-800" />
            
            {/* Enhanced Close Button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 touch-target bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-all duration-300 tap-highlight focus-ring"
              aria-label="ปิดวิดีโอ"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Video Title */}
            <div className="absolute top-4 left-4 z-10 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md">
              วิดีโอทัวร์: {tour.title}
            </div>
            
            {/* Enhanced Video Player */}
            <video
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover transition-opacity duration-500"
              src={tour.heroVideo}
              onLoad={(e) => {
                e.currentTarget.previousElementSibling?.remove()
              }}
              poster={tour.heroImage}
            >
              <source src={tour.heroVideo} type="video/mp4" />
              <p className="text-white text-center p-8">
                ขออภัย เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
              </p>
            </video>
          </div>
        </div>
      )}
    </div>
  )
}