'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowLeft, Calendar, Users, Star, Clock, MapPin, Plane, Hotel, 
  Shield, CreditCard, Heart, Share2, Phone, MessageCircle, CheckCircle,
  Globe, Wifi, Coffee, Camera, Navigation, AlertCircle, Info,
  ThumbsUp, Award, Target, Sparkles, Zap, Crown, Gift, Utensils,
  Home, CalendarDays, Package, Bed, Menu, X
} from 'lucide-react'

// Import tour data from search page - keeping consistency
const toursData = [
  // Japan Tours
  {
    id: 1,
    title: 'ทัวร์ญี่ปุ่น โตเกียว สกายทรี 5 วัน 3 คืน',
    location: 'ญี่ปุ่น',
    city: 'โตเกียว',
    duration: '5 วัน',
    durationCode: '5D4N',
    days: 5,
    nights: 4,
    price: 29900,
    originalPrice: 35900,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 234,
    groupSize: '15-20',
    hotelStar: 4,
    airline: 'TG',
    airlineName: 'Thai Airways',
    airportName: 'สุวรรณภูมิ (BKK)',
    availableSeats: 8,
    travelSeason: 'ม.ค.-มี.ค.',
    nextDate: '15 ก.พ. 2567',
    departureDates: {
      'ม.ค.': ['15 ม.ค. 68 - 19 ม.ค. 68', '22 ม.ค. 68 - 26 ม.ค. 68', '29 ม.ค. 68 - 2 ก.พ. 68'],
      'ก.พ.': ['5 ก.พ. 68 - 9 ก.พ. 68', '12 ก.พ. 68 - 16 ก.พ. 68', '19 ก.พ. 68 - 23 ก.พ. 68', '26 ก.พ. 68 - 2 มี.ค. 68'],
      'มี.ค.': ['5 มี.ค. 68 - 9 มี.ค. 68', '12 มี.ค. 68 - 16 มี.ค. 68', '19 มี.ค. 68 - 23 มี.ค. 68', '26 มี.ค. 68 - 30 มี.ค. 68']
    },
    highlights: 'สัมผัสความตื่นตาตื่นใจที่โตเกียวสกายทรี ชมวิวสุดอลังการจากความสูง 634 เมตร เยี่ยมชมวัดเซ็นโซจิอันศักดิ์สิทธิ์ในย่านอาซากุสะ สำรวจพลังความคึกคักของย่านชินจูกุและชิบูย่า ร่วมชื่นชมกับเทศกาลซากุระที่แปรปรวนไปตามฤดูกาล ช้อปปิ้งในเขตกินซ่าย่านหรูหราระดับโลก เดินเล่นในสวนสาธารณะอุเอโนะอันร่มรื่น สัมผัสศิลปะและวัฒนธรรมที่พิพิธภัณฑ์โตเกียว และลิ้มลองความสดใหม่ที่ตลาดปลาสึกิจิ พร้อมสำรวจย่านแฟชั่นฮาราจุกุที่มีสีสันและชีวิตชีวา',
    accommodation: [
      { day: 1, hotel: 'Shinjuku Washington Hotel', star: 4, location: 'ย่านชินจูกุ', facilities: ['WiFi ฟรี', 'ห้องอาหาร', 'ฟิตเนส'] },
      { day: 2, hotel: 'Shinjuku Washington Hotel', star: 4, location: 'ย่านชินจูกุ', facilities: ['WiFi ฟรี', 'ห้องอาหาร', 'ฟิตเนส'] },
      { day: 3, hotel: 'Shinjuku Washington Hotel', star: 4, location: 'ย่านชินจูกุ', facilities: ['WiFi ฟรี', 'ห้องอาหาร', 'ฟิตเนส'] },
      { day: 4, hotel: 'Shinjuku Washington Hotel', star: 4, location: 'ย่านชินจูกุ', facilities: ['WiFi ฟรี', 'ห้องอาหาร', 'ฟิตเนส'] }
    ],
    detailedItinerary: [
      {
        day: 1,
        title: 'วันที่ 1: เดินทางสู่โตเกียว',
        activities: [
          '06:00 - เช็คอินสนามบินสุวรรณภูมิ',
          '09:00 - ออกเดินทางโดยสายการบิน Thai Airways เที่ยวบิน TG640',
          '17:30 - ถึงสนามบินนาริตะ ประเทศญี่ปุ่น',
          '18:30 - รถรับจากสนามบิน เดินทางสู่โรงแรม',
          '20:00 - เช็คอินโรงแรม Shinjuku Washington Hotel',
          '21:00 - พักผ่อนตามอัธยาศัย'
        ],
        meals: {
          breakfast: { location: 'อิสระ', type: 'ไม่รวม' },
          lunch: { location: 'บนเครื่องบิน', type: 'อาหารเที่ยง Set Menu' },
          dinner: { location: 'ร้าน Yoshinoya', type: 'ข้าวหน้าเนื้อ' }
        }
      },
      {
        day: 2,
        title: 'วันที่ 2: โตเกียว สกายทรี - อาซากุสะ',
        activities: [
          '07:00 - อาหารเช้าที่โรงแรม',
          '08:30 - ออกเดินทางโดยรถโค้ช',
          '09:30 - ขึ้นชมวิวบนโตเกียวสกายทรี ชั้น 350',
          '11:30 - เดินทางสู่วัดเซ็นโซจิ',
          '12:00 - อาหารกลางวัน',
          '13:30 - เดินเล่นถนนนากามิเซะ ช้อปปิ้งของที่ระลึก',
          '16:00 - เดินทางสู่ย่านชิบูย่า',
          '17:00 - อิสระช้อปปิ้งที่ชิบูย่า',
          '19:00 - อาหารเย็น',
          '20:30 - กลับโรงแรม'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'บุฟเฟ่ต์นานาชาติ' },
          lunch: { location: 'ร้าน Tempura Daikokuya', type: 'เทมปุระข้าวหน้าเทมปุระ' },
          dinner: { location: 'ร้าน Ichiran Ramen', type: 'ราเมนต้นตำรับ' }
        }
      },
      {
        day: 3,
        title: 'วันที่ 3: ชินจูกุ - ฮาราจูกุ - โอไดบะ',
        activities: [
          '07:00 - อาหารเช้าที่โรงแรม',
          '09:00 - เดินทางสู่ศาลเจ้าเมจิ',
          '10:30 - ช้อปปิ้งย่านฮาราจูกุ ถนนทาเคชิตะ',
          '12:30 - อาหารกลางวัน',
          '14:00 - เดินทางสู่โอไดบะ',
          '15:00 - ชม Gundam Statue และ Aqua City',
          '17:00 - ชมวิวพระอาทิตย์ตกที่ Rainbow Bridge',
          '19:00 - อาหารเย็น',
          '21:00 - กลับโรงแรม'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'บุฟเฟ่ต์นานาชาติ' },
          lunch: { location: 'Harajuku Gyoza Lou', type: 'เกี๊ยวซ่าทอด' },
          dinner: { location: 'ร้าน Tsukiji Sushiko', type: 'ซูชิสด' }
        }
      },
      {
        day: 4,
        title: 'วันที่ 4: อิสระช้อปปิ้ง หรือ ซื้อทัวร์เสริม',
        activities: [
          '07:00 - อาหารเช้าที่โรงแรม',
          '09:00 - อิสระเต็มวัน หรือซื้อทัวร์เสริม',
          'ทัวร์เสริม A: ดิสนีย์แลนด์ (เพิ่ม 3,500 บาท)',
          'ทัวร์เสริม B: ภูเขาไฟฟูจิ (เพิ่ม 2,900 บาท)',
          'หรืออิสระช้อปปิ้งย่านชินจูกุ, กินซ่า, อากิฮาบาระ',
          '19:00 - นัดพบที่โรงแรม',
          '19:30 - อาหารเย็นอำลา'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'บุฟเฟ่ต์นานาชาติ' },
          lunch: { location: 'อิสระ', type: 'ไม่รวม' },
          dinner: { location: 'ร้าน Kani Doraku', type: 'ปูยักษ์ฮอกไกโด' }
        }
      },
      {
        day: 5,
        title: 'วันที่ 5: เดินทางกลับประเทศไทย',
        activities: [
          '07:00 - อาหารเช้าที่โรงแรม',
          '08:00 - เช็คเอาท์',
          '09:00 - เดินทางสู่สนามบินนาริตะ',
          '11:00 - เช็คอินสายการบิน',
          '13:55 - ออกเดินทางกลับกรุงเทพฯ โดยเที่ยวบิน TG677',
          '18:25 - ถึงสนามบินสุวรรณภูมิโดยสวัสดิภาพ'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'บุฟเฟ่ต์นานาชาติ' },
          lunch: { location: 'บนเครื่องบิน', type: 'อาหารเที่ยง Set Menu' },
          dinner: { location: '-', type: '-' }
        }
      }
    ],
    inclusions: [
      'ตั๋วเครื่องบินไป-กลับ สายการบิน Thai Airways (ชั้นประหยัด)',
      'ที่พัก Shinjuku Washington Hotel หรือเทียบเท่า 4 คืน (พักห้องละ 2 ท่าน)',
      'อาหารตามที่ระบุในโปรแกรม (เช้า 4 มื้อ, กลางวัน 3 มื้อ, เย็น 4 มื้อ)',
      'รถโค้ชปรับอากาศนำเที่ยวตลอดการเดินทาง',
      'ค่าเข้าชมสถานที่ท่องเที่ยวตามโปรแกรม',
      'มัคคุเทศก์ไทยดูแลตลอดการเดินทาง',
      'ประกันการเดินทาง วงเงิน 1,000,000 บาท',
      'น้ำดื่มวันละ 1 ขวด'
    ],
    exclusions: [
      'ค่าทำหนังสือเดินทาง (พาสปอร์ต)',
      'ค่าวีซ่าสำหรับชาวต่างชาติ',
      'ค่าอาหารและเครื่องดื่มนอกเหนือจากรายการ',
      'ค่าใช้จ่ายส่วนตัว เช่น ค่าโทรศัพท์, ค่าซักรีด',
      'ค่าทิปมัคคุเทศก์และคนขับรถ 1,500 บาท/ท่าน/ทริป',
      'ค่าภาษีมูลค่าเพิ่ม 7% และภาษีหัก ณ ที่จ่าย 3%',
      'ค่าทัวร์เสริมนอกโปรแกรม'
    ],
    facilities: [
      { icon: Wifi, label: 'Wi-Fi ฟรี' },
      { icon: Coffee, label: 'อาหารเช้า' },
      { icon: Camera, label: 'จุดถ่ายรูป' },
      { icon: Navigation, label: 'มัคคุเทศก์' }
    ]
  },
  {
    id: 2,
    title: 'ทัวร์ญี่ปุ่น โอซาก้า ปราสาท 4 วัน 3 คืน',
    location: 'ญี่ปุ่น',
    city: 'โอซาก้า',
    duration: '4 วัน',
    durationCode: '4D3N',
    days: 4,
    nights: 3,
    price: 26900,
    originalPrice: 31900,
    image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 189,
    groupSize: '20-25',
    hotelStar: 4,
    airline: 'NH',
    airlineName: 'All Nippon Airways',
    airportName: 'นาริตะ (NRT)',
    availableSeats: 15,
    travelSeason: 'ก.พ.-เม.ย.',
    nextDate: '20 ก.พ. 2567',
    departureDates: {
      'ก.พ.': ['8 ก.พ. 68 - 11 ก.พ. 68', '15 ก.พ. 68 - 18 ก.พ. 68', '22 ก.พ. 68 - 25 ก.พ. 68'],
      'มี.ค.': ['1 มี.ค. 68 - 4 มี.ค. 68', '8 มี.ค. 68 - 11 มี.ค. 68', '15 มี.ค. 68 - 18 มี.ค. 68', '22 มี.ค. 68 - 25 มี.ค. 68', '29 มี.ค. 68 - 1 เม.ย. 68'],
      'เม.ย.': ['5 เม.ย. 68 - 8 เม.ย. 68', '12 เม.ย. 68 - 15 เม.ย. 68', '19 เม.ย. 68 - 22 เม.ย. 68', '26 เม.ย. 68 - 29 เม.ย. 68']
    },
    highlights: 'เดินทางสู่ปราสาทโอซาก้าอันงดงาม สัญลักษณ์แห่งความยิ่งใหญ่ของเมืองโอซาก้า สำรวจวัดคิโยมิซุเดระในเกียวโต ชมความงามของถนนโดทงโบริที่มีชีวิตชีวาเต็มไปด้วยร้านอาหารและช้อปปิ้ง เดินผ่านป่าไผ่อาราชิยาม่าที่สร้างบรรยากาศสงบและเงียบขรึม สักการะศาลเจ้าฟูชิมิอินาริที่มีประตูโทริอิสีแดงอันโดดเด่น ชื่นชมกับอควาเรียมไคยูคังที่ยิ่งใหญ่ที่สุดในญี่ปุ่น เยี่ยมชมกวางป่าที่นารา และร่วมเฉลิมฉลองเทศกาลดอกซากุระอันโรแมนติก',
    accommodation: [
      { day: 1, hotel: 'Osaka Fujiya Hotel', star: 4, location: 'ย่านนัมบะ', facilities: ['WiFi ฟรี', 'สปา', 'ร้านอาหาร 2 แห่ง'] },
      { day: 2, hotel: 'Osaka Fujiya Hotel', star: 4, location: 'ย่านนัมบะ', facilities: ['WiFi ฟรี', 'สปา', 'ร้านอาหาร 2 แห่ง'] },
      { day: 3, hotel: 'Osaka Fujiya Hotel', star: 4, location: 'ย่านนัมบะ', facilities: ['WiFi ฟรี', 'สปา', 'ร้านอาหาร 2 แห่ง'] }
    ],
    detailedItinerary: [
      {
        day: 1,
        title: 'วันที่ 1: เดินทางสู่โอซาก้า',
        activities: [
          '06:30 - เช็คอินสนามบินดอนเมือง',
          '08:30 - ออกเดินทางโดยสายการบิน All Nippon Airways',
          '16:00 - ถึงสนามบินคันไซ',
          '17:00 - เดินทางสู่โรงแรม',
          '18:30 - เช็คอินโรงแรม',
          '19:30 - อาหารเย็น',
          '21:00 - อิสระพักผ่อน'
        ],
        meals: {
          breakfast: { location: 'อิสระ', type: 'ไม่รวม' },
          lunch: { location: 'บนเครื่องบิน', type: 'อาหารเครื่องบิน' },
          dinner: { location: 'ร้าน Ganko Takoyaki', type: 'ทาโกะยากิ & โอโคโนมิยากิ' }
        }
      },
      {
        day: 2,
        title: 'วันที่ 2: โอซาก้า - เกียวโต - นารา',
        activities: [
          '07:00 - อาหารเช้าที่โรงแรม',
          '08:00 - เดินทางสู่เกียวโต',
          '09:00 - ชมวัดคิโยมิสึเดระ',
          '11:00 - ศาลเจ้าฟูชิมิอินาริ',
          '12:30 - อาหารกลางวัน',
          '14:00 - เดินทางสู่นารา',
          '15:00 - ให้อาหารกวางที่สวนนารา',
          '16:30 - ชมวัดโทไดจิ',
          '18:00 - กลับโอซาก้า',
          '19:30 - อาหารเย็น'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'บุฟเฟ่ต์' },
          lunch: { location: 'ร้าน Kyoto Kitcho Arashiyama', type: 'ชุดเบนโตะเกียวโต' },
          dinner: { location: 'ร้าน Kushikatsu Daruma', type: 'คุชิคัตสึ' }
        }
      },
      {
        day: 3,
        title: 'วันที่ 3: ปราสาทโอซาก้า - ช้อปปิ้ง',
        activities: [
          '07:00 - อาหารเช้าที่โรงแรม',
          '08:30 - ชมปราสาทโอซาก้า',
          '10:30 - Osaka Aquarium Kaiyukan',
          '12:30 - อาหารกลางวัน',
          '14:00 - ช้อปปิ้งย่านชินไซบาชิ',
          '16:00 - ถนนโดทงโบริ',
          '18:00 - อิสระช้อปปิ้งต่อ',
          '20:00 - อาหารเย็น'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'บุฟเฟ่ต์' },
          lunch: { location: 'ร้าน Harukoma Sushi', type: 'ซูชิสายพาน' },
          dinner: { location: 'ร้าน Yakiniku Rokkasen', type: 'ปิ้งย่าง A5 Wagyu' }
        }
      },
      {
        day: 4,
        title: 'วันที่ 4: เดินทางกลับ',
        activities: [
          '07:00 - อาหารเช้า',
          '08:00 - เช็คเอาท์',
          '09:00 - ช้อปปิ้งย่านริงกุ พรีเมียม เอาท์เล็ท',
          '11:00 - เดินทางสู่สนามบิน',
          '13:00 - เช็คอิน',
          '15:00 - ออกเดินทางกลับประเทศไทย',
          '19:00 - ถึงสนามบินดอนเมืองโดยสวัสดิภาพ'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'บุฟเฟ่ต์' },
          lunch: { location: 'Rinku Premium Outlets', type: 'อิสระ' },
          dinner: { location: '-', type: '-' }
        }
      }
    ],
    inclusions: [
      'ตั๋วเครื่องบินไป-กลับ All Nippon Airways',
      'ที่พัก 4 ดาว 3 คืน (พักห้องละ 2 ท่าน)',
      'อาหารตามรายการ',
      'รถโค้ชปรับอากาศ',
      'ค่าเข้าชมสถานที่',
      'มัคคุเทศก์ไทย',
      'ประกันการเดินทาง'
    ],
    exclusions: [
      'ค่าทำพาสปอร์ต',
      'ค่าใช้จ่ายส่วนตัว',
      'ค่าทิป 1,200 บาท/ท่าน',
      'ค่าอาหารนอกรายการ'
    ],
    facilities: [
      { icon: Wifi, label: 'Wi-Fi ฟรี' },
      { icon: Coffee, label: 'อาหารเช้า' },
      { icon: Camera, label: 'จุดถ่ายรูป' },
      { icon: Navigation, label: 'มัคคุเทศก์' }
    ]
  },
  {
    id: 3,
    title: 'ทัวร์ญี่ปุ่น เกียวโต วัดทอง 4 วัน 3 คืน',
    location: 'ญี่ปุ่น',
    city: 'เกียวโต',
    duration: '4 วัน',
    durationCode: '4D3N',
    days: 4,
    nights: 3,
    price: 28900,
    originalPrice: 33900,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 201,
    groupSize: '18-22',
    hotelStar: 5,
    airline: 'TG',
    airlineName: 'Thai Airways',
    airportName: 'สุวรรณภูมิ (BKK)',
    availableSeats: 5,
    travelSeason: 'มี.ค.-พ.ค.',
    nextDate: '25 ก.พ. 2567',
    departureDates: {
      'มี.ค.': ['8 มี.ค. 68 - 11 มี.ค. 68', '15 มี.ค. 68 - 18 มี.ค. 68', '22 มี.ค. 68 - 25 มี.ค. 68', '29 มี.ค. 68 - 1 เม.ย. 68'],
      'เม.ย.': ['5 เม.ย. 68 - 8 เม.ย. 68', '12 เม.ย. 68 - 15 เม.ย. 68', '19 เม.ย. 68 - 22 เม.ย. 68', '26 เม.ย. 68 - 29 เม.ย. 68'],
      'พ.ค.': ['3 พ.ค. 68 - 6 พ.ค. 68', '10 พ.ค. 68 - 13 พ.ค. 68', '17 พ.ค. 68 - 20 พ.ค. 68', '24 พ.ค. 68 - 27 พ.ค. 68', '31 พ.ค. 68 - 3 มิ.ย. 68']
    },
    highlights: '🏛️ สัมผัสความงดงามของวัดคินคะคุจิ (วัดทอง) อันเป็นสัญลักษณ์แห่งเกียวโต ที่ผนังทั้งหมดหุ้มด้วยทองคำแท้และสะท้อนแสงระยิบระยับในสระน้ำ 🎋 เดินผ่านป่าไผ่อาราชิยาม่าที่มีความสูงตระหง่านและสร้างเงาไผ่ที่สวยงาม 🏘️ สำรวจย่านกิออนที่เต็มไปด้วยบ้านไม้ดั้งเดิมและโอกาสพบเกอิชาแท้ๆ 🎌 เรียนรู้วัฒนธรรมและประเพณีอันล้ำค่าของญี่ปุ่นโบราณ พร้อมชื่นชมกับสถาปัตยกรรมแบบดั้งเดิมที่ได้รับการอนุรักษ์มาอย่างดีเยี่ยม',
    accommodation: [
      { day: 1, hotel: 'The Ritz-Carlton Kyoto', star: 5, location: 'ริมแม่น้ำคาโมงาวะ', facilities: ['WiFi ฟรี', 'สปา', 'มิชลินสตาร์'] },
      { day: 2, hotel: 'The Ritz-Carlton Kyoto', star: 5, location: 'ริมแม่น้ำคาโมงาวะ', facilities: ['WiFi ฟรี', 'สปา', 'มิชลินสตาร์'] },
      { day: 3, hotel: 'The Ritz-Carlton Kyoto', star: 5, location: 'ริมแม่น้ำคาโมงาวะ', facilities: ['WiFi ฟรี', 'สปา', 'มิชลินสตาร์'] }
    ],
    detailedItinerary: [
      {
        day: 1,
        title: 'วันที่ 1: เดินทางสู่เกียวโต',
        activities: [
          '07:00 - เช็คอินสนามบินสุวรรณภูมิ',
          '10:00 - ออกเดินทางด้วย Thai Airways',
          '18:00 - ถึงสนามบินคันไซ',
          '19:30 - เดินทางสู่เกียวโต',
          '21:00 - เช็คอินโรงแรม The Ritz-Carlton',
          '22:00 - พักผ่อน'
        ],
        meals: {
          breakfast: { location: 'อิสระ', type: 'ไม่รวม' },
          lunch: { location: 'บนเครื่องบิน', type: 'อาหารเครื่องบิน' },
          dinner: { location: 'Kikunoi Honten', type: 'ไคเซกิ 3 มิชลินสตาร์' }
        }
      },
      {
        day: 2,
        title: 'วันที่ 2: วัดทอง - อาราชิยาม่า',
        activities: [
          '07:00 - อาหารเช้าที่โรงแรม',
          '08:30 - วัดคินคะคุจิ (วัดทอง)',
          '10:30 - วัดนินนาจิ',
          '12:00 - อาหารกลางวัน',
          '13:30 - ป่าไผ่อาราชิยาม่า',
          '15:00 - วัดเทนริวจิ',
          '16:30 - ล่องเรือแม่น้ำคัตสึระ',
          '18:00 - กลับเมือง',
          '19:30 - อาหารเย็น'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'ญี่ปุ่น-ตะวันตก' },
          lunch: { location: 'Arashiyama Yoshimura', type: 'โซบะต้นตำรับ' },
          dinner: { location: 'Hyotei', type: 'ไคเซกิ 3 มิชลินสตาร์' }
        }
      },
      {
        day: 3,
        title: 'วันที่ 3: กิออน - ฟูชิมิอินาริ',
        activities: [
          '07:00 - อาหารเช้า',
          '08:30 - ศาลเจ้าฟูชิมิอินาริ',
          '11:00 - วัดซันจูซันเก็นโด',
          '12:30 - อาหารกลางวัน',
          '14:00 - ย่านกิออน',
          '15:30 - ถนนฮานามิโคจิ',
          '17:00 - การแสดงเกอิชา',
          '19:00 - อาหารเย็น',
          '21:00 - กลับโรงแรม'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'ญี่ปุ่น-ตะวันตก' },
          lunch: { location: 'Gion Tanto', type: 'โอคาซุเซ็ต' },
          dinner: { location: 'Gion Karyo', type: 'ไคเซกิพร้อมการแสดงเกอิชา' }
        }
      },
      {
        day: 4,
        title: 'วันที่ 4: เดินทางกลับ',
        activities: [
          '07:00 - อาหารเช้า',
          '08:00 - เช็คเอาท์',
          '09:00 - ช้อปปิ้งสถานีเกียวโต',
          '11:00 - เดินทางสู่สนามบิน',
          '13:00 - เช็คอิน',
          '15:30 - ออกเดินทางกลับ',
          '19:30 - ถึงสุวรรณภูมิโดยสวัสดิภาพ'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'ญี่ปุ่น-ตะวันตก' },
          lunch: { location: 'สนามบิน', type: 'อิสระ' },
          dinner: { location: '-', type: '-' }
        }
      }
    ],
    inclusions: [
      'ตั๋วเครื่องบิน Thai Airways ชั้นประหยัด',
      'โรงแรม 5 ดาว The Ritz-Carlton Kyoto 3 คืน',
      'อาหารมิชลินสตาร์ 3 มื้อ',
      'อาหารตามรายการ',
      'รถโค้ชหรู',
      'ค่าเข้าชมทุกแห่ง',
      'มัคคุเทศก์มืออาชีพ',
      'ประกันเดินทาง 2 ล้านบาท'
    ],
    exclusions: [
      'ค่าทำพาสปอร์ต',
      'ค่าใช้จ่ายส่วนตัว',
      'ค่าทิป 1,500 บาท/ท่าน',
      'ค่าอาหารและเครื่องดื่มนอกรายการ',
      'ค่าวีซ่า (ถ้ามี)'
    ],
    facilities: [
      { icon: Wifi, label: 'Wi-Fi ฟรี' },
      { icon: Coffee, label: 'อาหารเช้า' },
      { icon: Camera, label: 'จุดถ่ายรูป' },
      { icon: Navigation, label: 'มัคคุเทศก์' }
    ]
  },
  {
    id: 4,
    title: 'ทัวร์ญี่ปุ่น ฮอกไกโด ซัปโปโร 6 วัน 4 คืน',
    location: 'ญี่ปุ่น',
    city: 'ฮอกไกโด',
    duration: '6 วัน',
    durationCode: '6D5N',
    days: 6,
    nights: 5,
    price: 35900,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 156,
    groupSize: '16-20',
    hotelStar: 4,
    airline: 'NH',
    airlineName: 'All Nippon Airways',
    airportName: 'นาริตะ (NRT)',
    availableSeats: 12,
    travelSeason: 'ธ.ค.-ก.พ.',
    nextDate: '1 มี.ค. 2567',
    departureDates: {
      'ธ.ค.': ['15 ธ.ค. 67 - 20 ธ.ค. 67', '22 ธ.ค. 67 - 27 ธ.ค. 67', '29 ธ.ค. 67 - 3 ม.ค. 68'],
      'ม.ค.': ['5 ม.ค. 68 - 10 ม.ค. 68', '12 ม.ค. 68 - 17 ม.ค. 68', '19 ม.ค. 68 - 24 ม.ค. 68', '26 ม.ค. 68 - 31 ม.ค. 68'],
      'ก.พ.': ['2 ก.พ. 68 - 7 ก.พ. 68', '9 ก.พ. 68 - 14 ก.พ. 68', '16 ก.พ. 68 - 21 ก.พ. 68', '23 ก.พ. 68 - 28 ก.พ. 68']
    },
    highlights: '🏔️ ผจญภัยสู่ฮอกไกโดเกาะทางเหนือของญี่ปุ่น 🌸 เยี่ยมชมฟาર์มฟูราโน่ที่มีทุ่งลาเวนเดอร์และดอกไม้หลากสีสันที่ไผ่กิ่งแห่งโลก 🌋 สัมผัสประสบการณ์การปีนภูเขาไฟที่ยังคุกรุ่นอยู่ และชมวิวทิวทัศน์อันน่าประทับใจของธรรมชาติป่าเถื่อน 🍺 ลิ้มลองซัปโปโรเบียร์ต้นตำรับที่มีรสชาติเข้มข้นและหอมกรุ่น ❄️ สัมผัสหิมะและน้ำแข็งในฤดูหนาว หรือชมดอกไม้บานสะพรั่งในฤดูร้อน 🦀 พร้อมลิ้มลองอาหารทะเลสดใหม่ของฮอกไกโด',
    accommodation: [
      { day: 1, hotel: 'Sapporo Grand Hotel', star: 4, location: 'ใจกลางซัปโปโร', facilities: ['WiFi ฟรี', 'ออนเซ็น', 'ร้านอาหาร'] },
      { day: 2, hotel: 'Sapporo Grand Hotel', star: 4, location: 'ใจกลางซัปโปโร', facilities: ['WiFi ฟรี', 'ออนเซ็น', 'ร้านอาหาร'] },
      { day: 3, hotel: 'Furano Resort', star: 4, location: 'ฟูราโน', facilities: ['WiFi ฟรี', 'สกี', 'วิวภูเขา'] },
      { day: 4, hotel: 'Furano Resort', star: 4, location: 'ฟูราโน', facilities: ['WiFi ฟรี', 'สกี', 'วิวภูเขา'] },
      { day: 5, hotel: 'Sapporo Grand Hotel', star: 4, location: 'ใจกลางซัปโปโร', facilities: ['WiFi ฟรี', 'ออนเซ็น', 'ร้านอาหาร'] }
    ],
    detailedItinerary: [
      {
        day: 1,
        title: 'วันที่ 1: เดินทางสู่ซัปโปโร',
        activities: [
          '07:00 - เช็คอินสนามบินสุวรรณภูมิ',
          '10:00 - ออกเดินทางด้วย All Nippon Airways',
          '18:00 - ถึงสนามบินชิโตเซะ',
          '19:30 - เดินทางสู่ซัปโปโร',
          '21:00 - เช็คอินโรงแรม',
          '22:00 - พักผ่อน'
        ],
        meals: {
          breakfast: { location: 'อิสระ', type: 'ไม่รวม' },
          lunch: { location: 'บนเครื่องบิน', type: 'อาหารเครื่องบิน' },
          dinner: { location: 'ร้าน Genghis Khan Daruma', type: 'ปิ้งย่างแกะฮอกไกโด' }
        }
      }
    ],
    inclusions: [
      'ตั๋วเครื่องบิน All Nippon Airways',
      'ที่พัก 4 ดาว 5 คืน',
      'อาหารตามรายการ',
      'รถโค้ชปรับอากาศ',
      'ค่าเข้าชมสถานที่',
      'มัคคุเทศก์ไทย',
      'ประกันการเดินทาง'
    ],
    exclusions: [
      'ค่าทำพาสปอร์ต',
      'ค่าใช้จ่ายส่วนตัว',
      'ค่าทิป 1,800 บาท/ท่าน',
      'ค่าอาหารนอกรายการ'
    ],
    facilities: [
      { icon: Wifi, label: 'Wi-Fi ฟรี' },
      { icon: Coffee, label: 'อาหารเช้า' },
      { icon: Camera, label: 'จุดถ่ายรูป' },
      { icon: Navigation, label: 'มัคคุเทศก์' }
    ]
  },
  {
    id: 5,
    title: 'ทัวร์ญี่ปุ่น นาโกย่า ปราสาท 5 วัน 3 คืน',
    location: 'ญี่ปุ่น',
    city: 'นาโกย่า',
    duration: '5 วัน',
    durationCode: '5D3N',
    days: 5,
    nights: 3,
    price: 27900,
    originalPrice: 32900,
    image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800&h=600&fit=crop',
    rating: 4.6,
    reviews: 134,
    groupSize: '20-25',
    hotelStar: 4,
    airline: 'JL',
    airlineName: 'Japan Airlines',
    airportName: 'สุวรรณภูมิ (BKK)',
    availableSeats: 18,
    travelSeason: 'มี.ค.-พ.ค.',
    nextDate: '8 มี.ค. 2567',
    departureDates: {
      'มี.ค.': ['8 มี.ค. 68 - 12 มี.ค. 68', '15 มี.ค. 68 - 19 มี.ค. 68', '22 มี.ค. 68 - 26 มี.ค. 68', '29 มี.ค. 68 - 2 เม.ย. 68'],
      'เม.ย.': ['5 เม.ย. 68 - 9 เม.ย. 68', '12 เม.ย. 68 - 16 เม.ย. 68', '19 เม.ย. 68 - 23 เม.ย. 68', '26 เม.ย. 68 - 30 เม.ย. 68'],
      'พ.ค.': ['3 พ.ค. 68 - 7 พ.ค. 68', '10 พ.ค. 68 - 14 พ.ค. 68', '17 พ.ค. 68 - 21 พ.ค. 68', '24 พ.ค. 68 - 28 พ.ค. 68']
    },
    highlights: '🏯 เยี่ยมชมปราสาทนาโกย่าที่งดงามและเป็นสัญลักษณ์สำคัญของเมืองนาโกย่า 🏛️ ศึกษาประวัติศาสตร์และสถาปัตยกรรมญี่ปุ่นยุคโบราณ 🚗 เดินทางเยี่ยมชมโรงงานโตโยต้าเพื่อเรียนรู้เทคโนโลยีการผลิตรถยนต์ชั้นนำของโลก และกระบวนการผลิตที่เป็นนวัตกรรม 🌸 สำรวจเมืองอัตสึตะที่มีวัฒนธรรมท้องถิ่นและบรรยากาศเงียบสงบ 🍜 ลิ้มลองอาหารท้องถิ่นของนาโกย่าเช่น มิโซะคัตสึและฮิตสึมาบุชิ 🎌 สัมผัสการผสมผสานระหว่างความทันสมัยและประเพณีดั้งเดิม',
    accommodation: [
      { day: 1, hotel: 'Nagoya Marriott Associa Hotel', star: 4, location: 'สถานีนาโกย่า', facilities: ['WiFi ฟรี', 'สปา', 'ห้องอาหาร 5 แห่ง'] },
      { day: 2, hotel: 'Nagoya Marriott Associa Hotel', star: 4, location: 'สถานีนาโกย่า', facilities: ['WiFi ฟรี', 'สปา', 'ห้องอาหาร 5 แห่ง'] },
      { day: 3, hotel: 'Nagoya Marriott Associa Hotel', star: 4, location: 'สถานีนาโกย่า', facilities: ['WiFi ฟรี', 'สปา', 'ห้องอาหาร 5 แห่ง'] }
    ],
    detailedItinerary: [
      {
        day: 1,
        title: 'วันที่ 1: เดินทางสู่นาโกย่า',
        activities: [
          '06:00 - เช็คอินสนามบินสุวรรณภูมิ',
          '09:30 - ออกเดินทางด้วย Japan Airlines',
          '17:00 - ถึงสนามบินชูบุ นาโกย่า',
          '18:30 - เดินทางสู่โรงแรม',
          '20:00 - เช็คอินโรงแรม',
          '21:00 - พักผ่อน'
        ],
        meals: {
          breakfast: { location: 'อิสระ', type: 'ไม่รวม' },
          lunch: { location: 'บนเครื่องบิน', type: 'อาหารเครื่องบิน' },
          dinner: { location: 'ร้าน Atsuta Horaiken', type: 'ฮิตสึมาบุชิต้นตำรับ' }
        }
      },
      {
        day: 2,
        title: 'วันที่ 2: ปราสาทนาโกย่า - โรงงานโตโยต้า',
        activities: [
          '07:00 - อาหารเช้าที่โรงแรม',
          '08:30 - ออกเดินทางสู่ปราสาทนาโกย่า',
          '09:00 - เยี่ยมชมปราสาทนาโกย่าและพิพิธภัณฑ์',
          '11:30 - ช้อปปิ้งที่ Sakae District',
          '12:30 - อาหารกลางวัน',
          '14:00 - เดินทางสู่โรงงานโตโยต้า',
          '15:00 - ทัวร์โรงงานโตโยต้า Commemorative Museum',
          '17:00 - ชมการผลิตรถยนต์โตโยต้า',
          '18:30 - กลับนาโกย่า',
          '19:30 - อาหารเย็น'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'บุฟเฟ่ต์นานาชาติ' },
          lunch: { location: 'ร้าน Misokatsu Yabaton', type: 'มิโซะคัตสึนาโกย่า' },
          dinner: { location: 'ร้าน Yamachan', type: 'ปีกไก่เผ็ดนาโกย่า' }
        }
      },
      {
        day: 3,
        title: 'วันที่ 3: อัตสึตะ - ช้อปปิ้ง',
        activities: [
          '07:00 - อาหารเช้าที่โรงแรม',
          '08:30 - เดินทางสู่ศาลเจ้าอัตสึตะ',
          '09:00 - เยี่ยมชมศาลเจ้าอัตสึตะ Jingu',
          '10:30 - สำรวจสวนอัตสึตะ',
          '12:00 - อาหารกลางวัน',
          '13:30 - ช้อปปิ้งที่ Oasis 21',
          '15:00 - เดินเล่น TV Tower area',
          '16:30 - ช้อปปิ้งที่ Lachic Department Store',
          '18:00 - อิสระช้อปปิ้งต่อ',
          '19:30 - อาหารเย็นอำลา'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'บุฟเฟ่ต์นานาชาติ' },
          lunch: { location: 'ร้าน Kishimen Sumire', type: 'คิชิเมนนาโกย่า' },
          dinner: { location: 'ร้าน Unagi Ibasho', type: 'ปลาไหลย่างฮิตสึมาบุชิ' }
        }
      },
      {
        day: 4,
        title: 'วันที่ 4: อิสระ - ช้อปปิ้งล่าสุด',
        activities: [
          '07:00 - อาหารเช้าที่โรงแรม',
          '08:30 - อิสระช้อปปิ้งที่ Midland Square',
          '10:00 - เยี่ยมชม Sky Promenade',
          '11:30 - ช้อปปิ้งของที่ระลึกล่าสุด',
          '12:30 - อาหารกลางวัน',
          '14:00 - พักผ่อนที่โรงแรม',
          '16:00 - เตรียมของเดินทาง',
          '17:00 - อิสระจนถึงเวลาออกเดินทาง',
          '19:00 - รวมพลที่ Lobby'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'บุฟเฟ่ต์นานาชาติ' },
          lunch: { location: 'ร้าน Sekai no Yamachan', type: 'อาหารนาโกย่า' },
          dinner: { location: 'อิสระ', type: 'ไม่รวม' }
        }
      },
      {
        day: 5,
        title: 'วันที่ 5: เดินทางกลับประเทศไทย',
        activities: [
          '07:00 - อาหารเช้าที่โรงแรม',
          '08:00 - เช็คเอาท์',
          '09:00 - เดินทางสู่สนามบินชูบุ นาโกย่า',
          '10:30 - เช็คอินสายการบิน',
          '12:45 - ออกเดินทางกลับประเทศไทย โดยเที่ยวบิน JL738',
          '17:30 - ถึงสนามบินสุวรรณภูมิโดยสวัสดิภาพ'
        ],
        meals: {
          breakfast: { location: 'โรงแรม', type: 'บุฟเฟ่ต์นานาชาติ' },
          lunch: { location: 'บนเครื่องบิน', type: 'อาหารเครื่องบิน' },
          dinner: { location: '-', type: '-' }
        }
      }
    ],
    inclusions: [
      'ตั๋วเครื่องบิน Japan Airlines',
      'ที่พัก 4 ดาว 3 คืน',
      'อาหารตามรายการ',
      'รถโค้ชปรับอากาศ',
      'ค่าเข้าชมสถานที่',
      'มัคคุเทศก์ไทย',
      'ประกันการเดินทาง'
    ],
    exclusions: [
      'ค่าทำพาสปอร์ต',
      'ค่าใช้จ่ายส่วนตัว',
      'ค่าทิป 1,300 บาท/ท่าน',
      'ค่าอาหารนอกรายการ'
    ],
    facilities: [
      { icon: Wifi, label: 'Wi-Fi ฟรี' },
      { icon: Coffee, label: 'อาหารเช้า' },
      { icon: Camera, label: 'จุดถ่ายรูป' },
      { icon: Navigation, label: 'มัคคุเทศก์' }
    ]
  },
  {
    id: 6,
    title: 'ทัวร์เกาหลี โซล พระราชวัง 4 วัน 3 คืน',
    location: 'เกาหลี',
    city: 'โซล',
    duration: '4 วัน',
    durationCode: '4D3N',
    days: 4,
    nights: 3,
    price: 22900,
    originalPrice: 27900,
    image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 189,
    groupSize: '20-25',
    hotelStar: 4,
    airline: 'TG',
    airlineName: 'Thai Airways',
    airportName: 'สุวรรณภูมิ (BKK)',
    availableSeats: 22,
    travelSeason: 'ก.พ.-เม.ย.',
    nextDate: '20 ก.พ. 2567',
    departureDates: {
      'ก.พ.': ['20 ก.พ. 68 - 23 ก.พ. 68', '27 ก.พ. 68 - 2 มี.ค. 68'],
      'มี.ค.': ['6 มี.ค. 68 - 9 มี.ค. 68', '13 มี.ค. 68 - 16 มี.ค. 68', '20 มี.ค. 68 - 23 มี.ค. 68', '27 มี.ค. 68 - 30 มี.ค. 68'],
      'เม.ย.': ['3 เม.ย. 68 - 6 เม.ย. 68', '10 เม.ย. 68 - 13 เม.ย. 68', '17 เม.ย. 68 - 20 เม.ย. 68', '24 เม.ย. 68 - 27 เม.ย. 68']
    },
    highlights: '🏰 สัมผัสความยิ่งใหญ่ของพระราชวังเคียงบกแดน อันเป็นสัญลักษณ์แห่งราชวงศ์โชซอน พร้อมชมการแสดงการเปลี่ยนยามอันโดดเด่น 🏘️ เดินทางสู่หมู่บ้านบุคชอนฮันอกมาอึลที่เต็มไปด้วยบ้านดั้งเดิมสมัยโชซอน 🎭 สัมผัสวัฒนธรรมเกาหลีแท้แท้ 🛍️ ช้อปปิ้งและลิ้มลองอาหารเกาหลีต้นตำรับในย่านเมียงดงที่คึกคักตลอด 24 ชั่วโมง 🏪 เยี่ยมชมตลาดนาmdaeมุนและตลาดdongแดมุนที่เต็มไปด้วยของที่ระลึกและอาหารท้องถิ่น',
    accommodation: [
      { day: 1, hotel: 'Lotte Hotel Seoul', star: 5, location: 'ย่านเมียงดง', facilities: ['WiFi ฟรี', 'สปา', 'ห้องอาหาร 7 แห่ง'] },
      { day: 2, hotel: 'Lotte Hotel Seoul', star: 5, location: 'ย่านเมียงดง', facilities: ['WiFi ฟรี', 'สปา', 'ห้องอาหาร 7 แห่ง'] },
      { day: 3, hotel: 'Lotte Hotel Seoul', star: 5, location: 'ย่านเมียงดง', facilities: ['WiFi ฟรี', 'สปา', 'ห้องอาหาร 7 แห่ง'] }
    ],
    detailedItinerary: [
      {
        day: 1,
        title: 'วันที่ 1: เดินทางสู่โซล',
        activities: [
          '06:00 - เช็คอินสนามบินสุวรรณภูมิ',
          '08:30 - ออกเดินทางด้วย Thai Airways',
          '15:30 - ถึงสนามบินอินชอน',
          '17:00 - เดินทางสู่โซล',
          '19:00 - เช็คอินโรงแรม',
          '20:00 - อาหารเย็น',
          '21:30 - พักผ่อน'
        ],
        meals: {
          breakfast: { location: 'อิสระ', type: 'ไม่รวม' },
          lunch: { location: 'บนเครื่องบิน', type: 'อาหารเครื่องบิน' },
          dinner: { location: 'ร้าน Myeongdong Kyoja', type: 'มันดูและเกี๊ยวซ่า' }
        }
      }
    ],
    inclusions: [
      'ตั๋วเครื่องบิน Thai Airways',
      'ที่พัก 5 ดาว 3 คืน',
      'อาหารตามรายการ',
      'รถโค้ชปรับอากาศ',
      'ค่าเข้าชมสถานที่',
      'มัคคุเทศก์ไทย',
      'ประกันการเดินทาง'
    ],
    exclusions: [
      'ค่าทำพาสปอร์ต',
      'ค่าใช้จ่ายส่วนตัว',
      'ค่าทิป 1,200 บาท/ท่าน',
      'ค่าอาหารนอกรายการ'
    ],
    facilities: [
      { icon: Wifi, label: 'Wi-Fi ฟรี' },
      { icon: Coffee, label: 'อาหารเช้า' },
      { icon: Camera, label: 'จุดถ่ายรูป' },
      { icon: Navigation, label: 'มัคคุเทศก์' }
    ]
  }
]

export default function TourDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [tour, setTour] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedDate, setSelectedDate] = useState('')
  const [showBooking, setShowBooking] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showStickyNav, setShowStickyNav] = useState(false)
  
  // Refs for scrolling
  const overviewRef = useRef<HTMLDivElement>(null)
  const itineraryRef = useRef<HTMLDivElement>(null)
  const accommodationRef = useRef<HTMLDivElement>(null)
  const inclusionsRef = useRef<HTMLDivElement>(null)
  const facilitiesRef = useRef<HTMLDivElement>(null)
  const datesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('Searching for tour with ID:', id)
    console.log('Available tour IDs:', toursData.map(t => t.id))
    const foundTour = toursData.find(t => t.id.toString() === id)
    console.log('Found tour:', foundTour)
    setTour(foundTour)
  }, [id])

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyNav(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดข้อมูลทัวร์...</p>
        </div>
      </div>
    )
  }

  const quickNavItems = [
    { id: 'overview', label: 'ภาพรวม', icon: Info, ref: overviewRef },
    { id: 'itinerary', label: 'รายการเดินทาง', icon: Calendar, ref: itineraryRef },
    { id: 'accommodation', label: 'ที่พัก', icon: Bed, ref: accommodationRef },
    { id: 'inclusions', label: 'สิ่งที่รวม', icon: CheckCircle, ref: inclusionsRef },
    { id: 'facilities', label: 'สิ่งอำนวยความสะดวก', icon: Award, ref: facilitiesRef },
    { id: 'dates', label: 'วันเดินทาง', icon: CalendarDays, ref: datesRef }
  ]

  const tabs = [
    { id: 'overview', label: 'ภาพรวม', icon: Info },
    { id: 'itinerary', label: 'รายการเดินทาง', icon: Calendar },
    { id: 'inclusions', label: 'สิ่งที่รวม', icon: CheckCircle },
    { id: 'terms', label: 'เงื่อนไข', icon: Shield }
  ]

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Sticky Navigation */}
      {showStickyNav && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-transparent">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-800 hidden md:block truncate max-w-[300px]">
                  {tour.title}
                </h2>
                <div className="text-2xl font-bold text-blue-600 md:hidden">
                  ฿{tour.price.toLocaleString()}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBooking(true)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md"
                >
                  จองเลย
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Floating Elements */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image 
          src={tour.image} 
          alt={tour.title}
          fill
          className="object-cover"
          priority
        />
        
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-blue-600/40 to-transparent">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
          
          {/* Floating Particles */}
          <div className="absolute top-20 left-10 w-3 h-3 bg-cyan-300/60 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-32 right-16 w-2 h-2 bg-blue-300/60 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-40 left-20 w-4 h-4 bg-indigo-300/60 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Back Button */}
        <Link 
          href="/tour-search-4"
          className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </Link>

        {/* Actions */}
        <div className="absolute top-6 right-6 z-20 flex gap-3">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
          </button>
          <button className="bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-105">
            <Share2 className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            {/* Tour Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-cyan-400/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                {tour.location}
              </span>
              <span className="bg-blue-500/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                {tour.durationCode}
              </span>
              <span className="bg-indigo-500/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                โรงแรม {tour.hotelStar} ดาว
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-2xl">
              {tour.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{tour.rating}</span>
                <span className="text-white/80">({tour.reviews} รีวิว)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-300" />
                <span>{tour.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-300" />
                <span>{tour.groupSize} คน</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Content - Tour Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Modern Tab Navigation */}
            <div className="sticky top-20 z-30 mb-6">
              <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-1">
                <div 
                  className="flex gap-1 overflow-x-auto scrollbar-hide"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  {tabs.map((tab, index) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium flex-shrink-0
                          transition-all duration-200 ease-out whitespace-nowrap min-w-fit
                          ${isActive 
                            ? 'bg-blue-500 text-white shadow-md scale-[1.02]' 
                            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/80'
                          }
                        `}
                      >
                        <Icon className={`w-4 h-4 transition-colors duration-200 ${
                          isActive ? 'text-white' : 'text-gray-500'
                        }`} />
                        <span className="text-sm font-medium">
                          {tab.label}
                        </span>
                        {isActive && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 -z-10"></div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Enhanced Tab Content */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/30 min-h-[600px]">
              
              {activeTab === 'overview' && (
                <div ref={overviewRef} className="space-y-6 animate-fadeIn">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                      <Sparkles className="w-7 h-7 text-blue-500" />
                      ไฮไลท์ของทัวร์
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {tour.highlights}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl text-center border border-blue-100">
                      <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">{tour.duration}</div>
                      <div className="text-sm text-gray-600">{tour.nights} คืน</div>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 rounded-xl text-center border border-cyan-100">
                      <Plane className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">{tour.airlineName}</div>
                      <div className="text-sm text-gray-600">{tour.airportName}</div>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl text-center border border-indigo-100">
                      <Hotel className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">โรงแรม {tour.hotelStar} ดาว</div>
                      <div className="text-sm text-gray-600">พักสบาย</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl text-center border border-emerald-100">
                      <Users className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">{tour.groupSize} คน</div>
                      <div className="text-sm text-gray-600">กรุ๊ปขนาดเล็ก</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && tour.detailedItinerary && (
                <div ref={itineraryRef} className="space-y-6 animate-fadeIn">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Calendar className="w-7 h-7 text-blue-500" />
                    รายการเดินทางแบบละเอียด
                  </h2>
                  
                  {tour.detailedItinerary.map((dayItem: any) => (
                    <div key={dayItem.day} className="border-l-4 border-blue-500 pl-6 pb-6">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-xl mb-4">
                        <h3 className="text-xl font-semibold">{dayItem.title}</h3>
                      </div>
                      
                      {/* Activities */}
                      <div className="space-y-3 mb-6">
                        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          กิจกรรม
                        </h4>
                        {dayItem.activities.map((activity: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                            <span className="text-gray-700">{activity}</span>
                          </div>
                        ))}
                      </div>

                      {/* Meals */}
                      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-100">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <Utensils className="w-5 h-5 text-orange-600" />
                          มื้ออาหาร
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Coffee className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium text-gray-700">เช้า:</span>
                            <span className="text-sm text-gray-600">{dayItem.meals.breakfast.location} - {dayItem.meals.breakfast.type}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Utensils className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium text-gray-700">กลางวัน:</span>
                            <span className="text-sm text-gray-600">{dayItem.meals.lunch.location} - {dayItem.meals.lunch.type}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Utensils className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium text-gray-700">เย็น:</span>
                            <span className="text-sm text-gray-600">{dayItem.meals.dinner.location} - {dayItem.meals.dinner.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'inclusions' && (
                <div ref={inclusionsRef} className="space-y-8 animate-fadeIn">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <CheckCircle className="w-7 h-7 text-green-500" />
                      รายการที่รวมในแพ็คเกจ
                    </h2>
                    <div className="grid gap-3">
                      {tour.inclusions.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <AlertCircle className="w-7 h-7 text-red-500" />
                      รายการที่ไม่รวมในแพ็คเกจ
                    </h2>
                    <div className="grid gap-3">
                      {tour.exclusions.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100 hover:shadow-md transition-all duration-300">
                          <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Accommodation Section */}
                  {tour.accommodation && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <Bed className="w-7 h-7 text-purple-500" />
                        ที่พักตลอดการเดินทาง
                      </h2>
                      
                      <div className="grid gap-4">
                        {tour.accommodation.map((acc: any) => (
                          <div key={acc.day} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-800">คืนที่ {acc.day}</h3>
                                <p className="text-xl font-bold text-purple-700 mt-1">{acc.hotel}</p>
                              </div>
                              <div className="flex gap-1">
                                {[...Array(acc.star)].map((_, i) => (
                                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 mb-3">
                              <MapPin className="w-4 h-4 text-purple-600" />
                              <span>{acc.location}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {acc.facilities.map((facility: string, idx: number) => (
                                <span key={idx} className="bg-white/80 px-3 py-1 rounded-full text-sm text-purple-700 border border-purple-200">
                                  {facility}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Facilities Section */}
                  {tour.facilities && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <Award className="w-7 h-7 text-indigo-500" />
                        สิ่งอำนวยความสะดวก
                      </h2>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {tour.facilities.map((facility: any, idx: number) => {
                          const Icon = facility.icon
                          return (
                            <div key={idx} className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl text-center border border-indigo-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                              <Icon className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                              <div className="font-medium text-gray-800">{facility.label}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'terms' && (
                <div className="space-y-8 animate-fadeIn">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                    <Shield className="w-8 h-8 text-blue-500" />
                    เกี่ยวกับรายละเอียดและเงื่อนไข
                  </h2>
                  
                  <div className="space-y-8">
                    {/* Booking Terms */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                      <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                        <Calendar className="w-6 h-6" />
                        เงื่อนไขการจอง
                      </h3>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <span>ท่านสามารถจองล่วงหน้าได้ตั้งแต่ 45 วันก่อนเดินทาง</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <span>มัดจำขั้นต่ำ 10,000 บาทต่อท่าน ภายใน 3 วันหลังจองเพื่อยืนยันที่นั่ง</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <span>ชำระเงินส่วนที่เหลือก่อนเดินทาง 21 วัน</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                          <span>หากท่านต้องการออกบิลใบกำกับภาษี กรุณาแจ้งในวันที่ทำการจอง</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Terms */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                      <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                        <CreditCard className="w-6 h-6" />
                        เงื่อนไขการชำระเงิน
                      </h3>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                          <span>รับชำระเงินสด โอนเงิน หรือบัตรเครดิต (เพิ่ม 3%)</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                          <span>การโอนเงิน กรุณาโอนภายใน 15.30 น. เพื่อให้สามารถตรวจสอบได้ในวันเดียวกัน</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                          <span>หากชำระเงินล่าช้าจากกำหนด ทางบริษัทขอสงวนสิทธิ์ในการยกเลิกการจอง</span>
                        </div>
                      </div>
                    </div>

                    {/* Cancellation Policy */}
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-100">
                      <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-6 h-6" />
                        เงื่อนไขการยกเลิก
                      </h3>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex items-start gap-3">
                          <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                          <span>ยกเลิกก่อนเดินทาง 45 วัน - คืนเงิน 100% หักค่าใช้จ่ายในการดำเนินการ 3,000 บาท</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                          <span>ยกเลิกก่อนเดินทาง 31-44 วัน - คืนเงิน 75% ของค่าทัวร์</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                          <span>ยกเลิกก่อนเดินทาง 21-30 วัน - คืนเงิน 50% ของค่าทัวร์</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                          <span>ยกเลิกก่อนเดินทาง 11-20 วัน - คืนเงิน 25% ของค่าทัวร์</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                          <span>ยกเลิกก่อนเดินทาง 0-10 วัน - ไม่คืนเงิน</span>
                        </div>
                      </div>
                    </div>

                    {/* Document Requirements */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                      <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
                        <Globe className="w-6 h-6" />
                        เอกสารในการเดินทาง
                      </h3>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                          <span>หนังสือเดินทาง (Passport) ที่มีอายุเหลือไม่น้อยกว่า 6 เดือน</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                          <span>วีซ่าท่องเที่ยว (สำหรับประเทศที่ต้องใช้วีซ่า)</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                          <span>ใบรับรองการฉีดวัคซีน Covid-19 (หากมีข้อกำหนด)</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                          <span>กรมธรรม์ประกันการเดินทางที่ครอบคลุม Covid-19</span>
                        </div>
                      </div>
                    </div>

                    {/* Health and Safety */}
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-100">
                      <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                        <Shield className="w-6 h-6" />
                        ข้อมูลสุขภาพและความปลอดภัย
                      </h3>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                          <span>ท่านควรมีสุขภาพร่างกายที่แข็งแรง เหมาะสำหรับการเดินทาง</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                          <span>หากท่านมีโรคประจำตัว กรุณาแจ้งมาก่อนเดินทาง</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                          <span>ผู้ที่มีอายุ 70 ปีขึ้นไป ต้องมีใบรับรองแพทย์ และญาติที่สามารถเดินทางไปด้วยได้</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                          <span>หญิงมีครรภ์ กรุณาปรึกษาแพทย์ก่อนตัดสินใจเดินทาง</span>
                        </div>
                      </div>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200">
                      <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <Info className="w-6 h-6" />
                        หมายเหตุเพิ่มเติม
                      </h3>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                          <span>บริษัทขอสงวนสิทธิ์ในการเปลี่ยนแปลงรายการ เนื่องจากสภาพอากาศ การเมือง และความปลอดภัย</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                          <span>ราคาทัวร์อาจมีการเปลี่ยนแปลงตามอัตราแลกเปลี่ยนเงินตรา และราคาน้ำมัน</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                          <span>การจัดห้องพัก เป็นแบบ Twin Share หากต้องการ Single Room กรุณาติดต่อเจ้าหน้าที่</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                          <span>กรุณาอ่านเงื่อนไขทั้งหมดอย่างละเอียดก่อนทำการจอง</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
                      <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                        <Phone className="w-6 h-6" />
                        ติดต่อสอบถาม
                      </h3>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">โทร: 02-234-5678</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MessageCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium">Line: @tourwow</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-indigo-600" />
                          <span className="font-medium">www.tourwow.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Departure Dates Section */}
            <div ref={datesRef} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <CalendarDays className="w-7 h-7 text-indigo-500" />
                วันเดินทางทั้งหมด
              </h2>
              
              <div className="space-y-4">
                {Object.entries(tour.departureDates).map(([month, dates]: [string, any]) => (
                  <div key={month} className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
                    <h3 className="font-semibold text-indigo-700 mb-3">{month}</h3>
                    <div className="space-y-3">
                      {dates.map((date: string) => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(`${month}-${date}`)}
                          className={`w-full p-3 rounded-lg text-center transition-all ${
                            selectedDate === `${month}-${date}`
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                              : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                          }`}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Sidebar - Booking */}
          <div className="space-y-6">
            
            {/* Price Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-gray-500 line-through text-lg">฿{tour.originalPrice?.toLocaleString()}</span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    ลด {Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)}%
                  </span>
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  ฿{tour.price.toLocaleString()}
                </div>
                <div className="text-gray-600">ต่อท่าน</div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">เลือกวันเดินทาง</label>
                <select 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">เลือกวันเดินทาง</option>
                  {Object.entries(tour.departureDates).map(([month, dates]: [string, any]) => 
                    dates.map((date: string) => (
                      <option key={`${month}-${date}`} value={`${month}-${date}`}>
                        {date}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Available Seats */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-yellow-800">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">เหลือที่นั่ง {tour.availableSeats} ที่</span>
                </div>
              </div>

              {/* Book Now Button */}
              <button 
                onClick={() => setShowBooking(true)}
                disabled={!selectedDate}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                จองทัวร์นี้เลย
              </button>

              {/* Contact Options */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition-all duration-300">
                  <Phone className="w-4 h-4" />
                  โทร
                </button>
                <button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition-all duration-300">
                  <MessageCircle className="w-4 h-4" />
                  แชท
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>ปลอดภัย</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CreditCard className="w-4 h-4 text-blue-500" />
                    <span>จ่ายปลอดภัย</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                ข้อมูลสำคัญ
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">สายการบิน:</span>
                  <span className="font-medium">{tour.airlineName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">สนามบิน:</span>
                  <span className="font-medium">{tour.airportName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">จำนวนผู้เดินทาง:</span>
                  <span className="font-medium">{tour.groupSize} คน</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">โรงแรม:</span>
                  <span className="font-medium">{tour.hotelStar} ดาว</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">จองทัวร์</h2>
              <p className="text-gray-600">{tour.title}</p>
              {selectedDate && (
                <p className="text-blue-600 font-semibold mt-2">
                  วันที่: {selectedDate.split('-')[1]}
                </p>
              )}
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
                <input type="email" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
                <input type="tel" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">จำนวนผู้เดินทาง</label>
                <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                  <option>1 ท่าน</option>
                  <option>2 ท่าน</option>
                  <option>3 ท่าน</option>
                  <option>4 ท่าน</option>
                  <option>5 ท่าน</option>
                  <option>6+ ท่าน</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowBooking(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl transition-all duration-300"
              >
                ยกเลิก
              </button>
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-xl transition-all duration-300">
                ยืนยันการจอง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}