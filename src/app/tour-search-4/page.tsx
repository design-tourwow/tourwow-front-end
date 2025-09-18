'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  SlidersHorizontal, X, Star, MapPin, Clock, TrendingUp, Sparkles, Heart, CheckCircle, Plane
} from 'lucide-react'

// Expanded tour data for all countries and cities
const tours = [
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
      'ม.ค.': ['15 ม.ค.', '22 ม.ค.', '29 ม.ค.'],
      'ก.พ.': ['5 ก.พ.', '12 ก.พ.', '19 ก.พ.', '26 ก.พ.'],
      'มี.ค.': ['5 มี.ค.', '12 มี.ค.', '19 มี.ค.', '26 มี.ค.']
    },
    highlights: 'สัมผัสความตื่นตาตื่นใจที่โตเกียวสกายทรี ชมวิวสุดอลังการจากความสูง 634 เมตร เยี่ยมชมวัดเซ็นโซจิอันศักดิ์สิทธิ์ในย่านอาซากุสะ สำรวจพลังความคึกคักของย่านชินจูกุและชิบูย่า ร่วมชื่นชมกับเทศกาลซากุระที่แปรปรวนไปตามฤดูกาล ช้อปปิ้งในเขตกินซ่าย่านหรูหราระดับโลก เดินเล่นในสวนสาธารณะอุเอโนะอันร่มรื่น สัมผัสศิลปะและวัฒนธรรมที่พิพิธภัณฑ์โตเกียว และลิ้มลองความสดใหม่ที่ตลาดปลาสึกิจิ พร้อมสำรวจย่านแฟชั่นฮาราจุกุที่มีสีสันและชีวิตชีวา'
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
      'ก.พ.': ['8 ก.พ.', '15 ก.พ.', '22 ก.พ.'],
      'มี.ค.': ['1 มี.ค.', '8 มี.ค.', '15 มี.ค.', '22 มี.ค.', '29 มี.ค.'],
      'เม.ย.': ['5 เม.ย.', '12 เม.ย.', '19 เม.ย.', '26 เม.ย.']
    },
    highlights: 'เดินทางสู่ปราสาทโอซาก้าอันงดงาม สัญลักษณ์แห่งความยิ่งใหญ่ของเมืองโอซาก้า สำรวจวัดคิโยมิซุเดระในเกียวโต ชมความงามของถนนโดทงโบริที่มีชีวิตชีวาเต็มไปด้วยร้านอาหารและช้อปปิ้ง เดินผ่านป่าไผ่อาราชิยาม่าที่สร้างบรรยากาศสงบและเงียบขรึม สักการะศาลเจ้าฟูชิมิอินาริที่มีประตูโทริอิสีแดงอันโดดเด่น ชื่นชมกับอควาเรียมไคยูคังที่ยิ่งใหญ่ที่สุดในญี่ปุ่น เยี่ยมชมกวางป่าที่นารา และร่วมเฉลิมฉลองเทศกาลดอกซากุระอันโรแมนติก'
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
      'มี.ค.': ['8 มี.ค.', '15 มี.ค.', '22 มี.ค.', '29 มี.ค.'],
      'เม.ย.': ['5 เม.ย.', '12 เม.ย.', '19 เม.ย.', '26 เม.ย.'],
      'พ.ค.': ['3 พ.ค.', '10 พ.ค.', '17 พ.ค.', '24 พ.ค.', '31 พ.ค.']
    },
    highlights: '🏛️ สัมผัสความงดงามของวัดคินคะคุจิ (วัดทอง) อันเป็นสัญลักษณ์แห่งเกียวโต ที่ผนังทั้งหมดหุ้มด้วยทองคำแท้และสะท้อนแสงระยิบระยับในสระน้ำ 🎋 เดินผ่านป่าไผ่อาราชิยาม่าที่มีความสูงตระหง่านและสร้างเงาไผ่ที่สวยงาม 🏘️ สำรวจย่านกิออนที่เต็มไปด้วยบ้านไม้ดั้งเดิมและโอกาสพบเกอิชาแท้ๆ 🎌 เรียนรู้วัฒนธรรมและประเพณีอันล้ำค่าของญี่ปุ่นโบราณ พร้อมชื่นชมกับสถาปัตยกรรมแบบดั้งเดิมที่ได้รับการอนุรักษ์มาอย่างดีเยี่ยม'
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
      'ธ.ค.': ['15 ธ.ค.', '22 ธ.ค.', '29 ธ.ค.'],
      'ม.ค.': ['5 ม.ค.', '12 ม.ค.', '19 ม.ค.', '26 ม.ค.'],
      'ก.พ.': ['2 ก.พ.', '9 ก.พ.', '16 ก.พ.', '23 ก.พ.']
    },
    highlights: '🏔️ ผจญภัยสู่ฮอกไกโดเกาะทางเหนือของญี่ปุ่น 🌸 เยี่ยมชมฟาร์มฟูราโน่ที่มีทุ่งลาเวนเดอร์และดอกไม้หลากสีสันที่ไผ่กิ่งแห่งโลก 🌋 สัมผัสประสบการณ์การปีนภูเขาไฟที่ยังคุกรุ่นอยู่ และชมวิวทิวทัศน์อันน่าประทับใจของธรรมชาติป่าเถื่อน 🍺 ลิ้มลองซัปโปโรเบียร์ต้นตำรับที่มีรสชาติเข้มข้นและหอมกรุ่น ❄️ สัมผัสหิมะและน้ำแข็งในฤดูหนาว หรือชมดอกไม้บานสะพรั่งในฤดูร้อน 🦀 พร้อมลิ้มลองอาหารทะเลสดใหม่ของฮอกไกโด'
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
      'มี.ค.': ['8 มี.ค.', '15 มี.ค.', '22 มี.ค.', '29 มี.ค.'],
      'เม.ย.': ['5 เม.ย.', '12 เม.ย.', '19 เม.ย.', '26 เม.ย.'],
      'พ.ค.': ['3 พ.ค.', '10 พ.ค.', '17 พ.ค.', '24 พ.ค.']
    },
    highlights: '🏯 เยี่ยมชมปราสาทนาโกย่าที่งดงามและเป็นสัญลักษณ์สำคัญของเมืองนาโกย่า 🏛️ ศึกษาประวัติศาสตร์และสถาปัตยกรรมญี่ปุ่นยุคโบราณ 🚗 เดินทางเยี่ยมชมโรงงานโตโยต้าเพื่อเรียนรู้เทคโนโลยีการผลิตรถยนต์ชั้นนำของโลก และกระบวนการผลิตที่เป็นนวัตกรรม 🌸 สำรวจเมืองอัตสึตะที่มีวัฒนธรรมท้องถิ่นและบรรยากาศเงียบสงบ 🍜 ลิ้มลองอาหารท้องถิ่นของนาโกย่าเช่น มิโซะคัตสึและฮิตสึมาบุชิ 🎌 สัมผัสการผสมผสานระหว่างความทันสมัยและประเพณีดั้งเดิม'
  },
  // Korea Tours
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
      'ก.พ.': ['20 ก.พ.', '27 ก.พ.'],
      'มี.ค.': ['6 มี.ค.', '13 มี.ค.', '20 มี.ค.', '27 มี.ค.'],
      'เม.ย.': ['3 เม.ย.', '10 เม.ย.', '17 เม.ย.', '24 เม.ย.']
    },
    highlights: '🏰 สัมผัสความยิ่งใหญ่ของพระราชวังเคียงบกแดน อันเป็นสัญลักษณ์แห่งราชวงศ์โชซอน พร้อมชมการแสดงการเปลี่ยนยามอันโดดเด่น 🏘️ เดินทางสู่หมู่บ้านบุคชอนฮันอกมาอึลที่เต็มไปด้วยบ้านดั้งเดิมสมัยโชซอน 🎭 สัมผัสวัฒนธรรมเกาหลีแท้แท้ 🛍️ ช้อปปิ้งและลิ้มลองอาหารเกาหลีต้นตำรับในย่านเมียงดงที่คึกคักตลอด 24 ชั่วโมง 🏪 เยี่ยมชมตลาดนาmdaeมุนและตลาดdongแดมุนที่เต็มไปด้วยของที่ระลึกและอาหารท้องถิ่น'
  },
  {
    id: 7,
    title: 'ทัวร์เกาหลี ปูซาน ชายหาด 5 วัน 4 คืน',
    location: 'เกาหลี',
    city: 'ปูซาน',
    duration: '5 วัน',
    durationCode: '5D4N',
    days: 5,
    nights: 4,
    price: 24900,
    originalPrice: 29900,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    rating: 4.6,
    reviews: 143,
    groupSize: '18-22',
    hotelStar: 4,
    airline: 'KE',
    airlineName: 'Korean Air',
    airportName: 'อินชอน (ICN)',
    availableSeats: 7,
    travelSeason: 'ก.พ.-เม.ย.',
    nextDate: '28 ก.พ. 2567',
    departureDates: {
      'ก.พ.': ['28 ก.พ.'],
      'มี.ค.': ['7 มี.ค.', '14 มี.ค.', '21 มี.ค.', '28 มี.ค.'],
      'เม.ย.': ['5 เม.ย.', '12 เม.ย.', '19 เม.ย.']
    },
    highlights: '🏖️ พักผ่อนบนหาดแฮอุนแดที่สวยงามและเป็นหาดที่มีชื่อเสียงที่สุดของปูซาน 🌅 พร้อมชมพระอาทิตย์ขึ้นที่งดงาม 🐟 สำรวจตลาดปลาจากัลชีที่ใหญ่ที่สุดในเกาหลี ลิ้มลองซาซิมิสดใหม่และอาหารทะเลหลากหลายชนิด ⛩️ เยี่ยมชมวัดแฮดงยงกุงซาที่ตั้งอยู่บนหน้าผาริมทะเล วัดเก่าแก่ที่สร้างขึ้นในปี ค.ศ. 1376 🏰 ชมความงามของสถาปัตยกรรมแบบเกาหลีโบราณท่ามกลางธรรมชาติอันงดงาม'
  },
  {
    id: 8,
    title: 'ทัวร์เกาหลี เชจู ภูเขาไฟ 4 วัน 3 คืน',
    location: 'เกาหลี',
    city: 'เชจู',
    duration: '4 วัน',
    durationCode: '4D3N',
    days: 4,
    nights: 3,
    price: 23900,
    originalPrice: 28900,
    image: 'https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 178,
    groupSize: '16-20',
    hotelStar: 5,
    airline: 'KE',
    airlineName: 'Korean Air',
    airportName: 'อินชอน (ICN)',
    availableSeats: 11,
    travelSeason: 'มี.ค.-พ.ค.',
    nextDate: '5 มี.ค. 2567',
    departureDates: {
      'มี.ค.': ['5 มี.ค.', '12 มี.ค.', '19 มี.ค.', '26 มี.ค.'],
      'เม.ย.': ['2 เม.ย.', '9 เม.ย.', '16 เม.ย.', '23 เม.ย.'],
      'พ.ค.': ['6 พ.ค.', '13 พ.ค.', '20 พ.ค.']
    },
    highlights: '🏔️ ปีนป่ายสู่ยอดเขาฮัลลาซานที่สูงที่สุดในเกาหลีใต้ 🌊 พร้อมชมทิวทัศน์อันงดงามของเกาะเชจู 🕳️ สำรวจถ้ำแมนจังกุลที่เกิดจากลาวาภูเขาไฟโบราณ ถ้ำหินปูนขนาดใหญ่ที่มีหินงอกหินย้อยอันน่าทึ่ง 🏖️ พักผ่อนบนชายหาดจองจูจองที่มีหาดทรายขาวละเอียดและน้ำทะเลใสสีฟ้า 🌵 สัมผัสวัฒนธรรมพื้นเมืองที่เชจูโดยเยี่ยมชมไร่ชาเขียวและสวนส้มที่ขึ้นชื่อของเกาะ'
  },
  {
    id: 9,
    title: 'ทัวร์เกาหลี อินชอน สนามบิน 3 วัน 2 คืน',
    location: 'เกาหลี',
    city: 'อินชอน',
    duration: '3 วัน',
    durationCode: '3D2N',
    days: 3,
    nights: 2,
    price: 19900,
    originalPrice: 24900,
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop',
    rating: 4.5,
    reviews: 98,
    groupSize: '25-30',
    hotelStar: 3,
    airline: 'KE',
    airlineName: 'Korean Air',
    airportName: 'อินชอน (ICN)',
    availableSeats: 28,
    travelSeason: 'มี.ค.-พ.ค.',
    nextDate: '12 มี.ค. 2567',
    departureDates: {
      'มี.ค.': ['12 มี.ค.', '19 มี.ค.', '26 มี.ค.'],
      'เม.ย.': ['3 เม.ย.', '10 เม.ย.', '17 เม.ย.', '24 เม.ย.', '31 เม.ย.'],
      'พ.ค.': ['7 พ.ค.', '14 พ.ค.', '21 พ.ค.']
    },
    highlights: '🏨 สำรวจไชน่าทาวน์อินชอนที่เก่าแก่ที่สุดในเกาหลี เต็มไปด้วยร้านอาหารจีนต้นตำรับและสถาปัตยกรรมจีนโบราณ 🏝️ เดินทางสู่เกาะวอลมิโดเพื่อชมวิวทิวทัศน์สวยงามของทะเลตะวันตก 🍞 และลิ้มลองขนมปังเมลอนอันโด่งดังของเกาะ 🌉 ชื่นชมสะพานอินชอนที่เป็นสัญลักษณ์ของเมือง 🏛️ พร้อมเรียนรู้ประวัติศาสตร์การเปิดประเทศของเกาหลีใต้ในพิพิธภัณฑ์ท่าเรืออินชอน'
  },
  // Singapore Tours
  {
    id: 10,
    title: 'ทัวร์สิงคโปร์ มารีนา เบย์ 3 วัน 2 คืน',
    location: 'สิงคโปร์',
    city: 'มารีนา เบย์',
    duration: '3 วัน',
    durationCode: '3D2N',
    days: 3,
    nights: 2,
    price: 15900,
    originalPrice: 19900,
    image: 'https://images.unsplash.com/photo-1508964942454-1fdcf0fdcbc1?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 312,
    groupSize: '20-30',
    hotelStar: 5,
    airline: 'SQ',
    airlineName: 'Singapore Airlines',
    airportName: 'ชังกี (SIN)',
    availableSeats: 25,
    travelSeason: 'ตลอดปี',
    nextDate: '10 ก.พ. 2567',
    departureDates: {
      'ก.พ.': ['10 ก.พ.', '17 ก.พ.', '24 ก.พ.'],
      'มี.ค.': ['3 มี.ค.', '10 มี.ค.', '17 มี.ค.', '24 มี.ค.', '31 มี.ค.'],
      'เม.ย.': ['7 เม.ย.', '14 เม.ย.', '21 เม.ย.', '28 เม.ย.']
    },
    highlights: '🏢 ชมความงดงามของมารีนาเบย์แซนด์สที่โด่งดังไปทั่วโลก 🏈 พร้อมลงไปสูดอากาศบนสระว่ายน้ำอินฟินิตี้บนชั้น 57 ที่สูงที่สุดในโลก 🌳 สำรวจการ์เด้นบายเดอะเบย์ ดินแดนแห่งอนาคตที่เต็มไปด้วยซูเปอร์ทรี และโดมกลาสขนาดยักษ์ที่จำลองสภาพอากาศเขตร้อนและเมดิเตอร์เรเนียน 🧜‍♀️ ถ่ายรูปคู่กับเมอร์ไลอ่อนสัญลักษณ์ประจำชาติสิงคโปร์ 🌆 และเดินเล่นในย่านกลางเมืองที่ผสมผสานความทันสมัยและวัฒนธรรมเอเชียอย่างลงตัว'
  },
  {
    id: 11,
    title: 'ทัวร์สิงคโปร์ เซนโตซา ยูนิเวอร์แซล 4 วัน 3 คืน',
    location: 'สิงคโปร์',
    city: 'เซนโตซา',
    duration: '4 วัน',
    price: 18900,
    image: 'https://images.unsplash.com/photo-1508964942454-1fdcf0fdcbc1?w=800&h=600&fit=crop',
    rating: 4.6,
    reviews: 198,
    groupSize: '18-25',
    nextDate: '15 ก.พ. 2567',
    highlights: 'สนุกสนานในยูนิเวอร์แซลสตูดิโอสิงคโปร์ กับเครื่องเล่นระทึกขวัญจากภาพยนตร์ชื่อดัง และพบกับตัวละครการ์ตูนและซูเปอร์ฮีโร่ขวัญใจ ผ่อนคลายบนเกาะเซนโตซาแห่งความสนุกสนาน พร้อมชายหาดทรายขาวและกิจกรรมทางน้ำมากมาย สำรวจเอสอีเอ อควาเรียมที่ใหญ่ที่สุดในโลก ชมสัตว์น้ำหลากหลายสายพันธุ์จากทะเลเซาธ์อีสต์เอเชีย และเดินผ่านอุโมงค์ใต้น้ำยาว 83 เมตร ท่ามกลางฉลามและปลากระเบนยักษ์'
  },
  {
    id: 12,
    title: 'ทัวร์สิงคโปร์ ออร์ชาร์ด ช้อปปิ้ง 3 วัน 2 คืน',
    location: 'สิงคโปร์',
    city: 'ออร์ชาร์ด',
    duration: '3 วัน',
    price: 16900,
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop',
    rating: 4.5,
    reviews: 145,
    groupSize: '22-28',
    nextDate: '18 ก.พ. 2567',
    highlights: 'ช้อปปิ้งในออร์ชาร์ดโร้ดถนนช้อปปิ้งที่ชื่อดังที่สุดของสิงคโปร์ เต็มไปด้วยห้างสรรพสินค้าระดับโลกและร้านแบรนด์เนม สำรวจไอออนออร์ชาร์ดห้างสรรพสินค้าที่ทันสมัยที่สุด พร้อมดาดฟ้าที่ให้วิวพาโนรามาของเมือง เดินเล่นในสวนพฤกศาสตร์สิงคโปร์ที่มีพรรณไม้เขตร้อนหลากหลายชนิด พร้อมการแสดงน้ำพุแสงสีที่สวยงามในยามค่ำคืน และลิ้มลองอาหารริมถนนในฮอว์คเกอร์เซ็นเตอร์ต่าง ๆ'
  },
  // Europe Tours - France
  {
    id: 13,
    title: 'ทัวร์ฝรั่งเศส ปารีส หอไอเฟล 8 วัน 5 คืน',
    location: 'ยุโรป',
    city: 'ปารีส',
    duration: '8 วัน',
    price: 69900,
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 156,
    groupSize: '25-30',
    nextDate: '1 มี.ค. 2567',
    highlights: 'ขึ้นสู่หอไอเฟลสัญลักษณ์แห่งปารีสและฝรั่งเศส ชมวิวพาโนรามาของเมืองแสงจากความสูง 324 เมตร สำรวจพิพิธภัณฑ์ลูฟร์ที่เก็บรวบรวมผลงานศิลปะระดับโลก รวมถึงภาพเขียนโมนาลิซาอันเลื่องชื่อ เดินเล่นบนถนนชองเซลิเซ่ที่หรูหราที่สุดของโลก เต็มไปด้วยร้านแบรนด์เนมและคาเฟ่ในแบบฝรั่งเศส เยี่ยมชมประตูชัยและเขตมงมาร์ตที่มีศิลปินท้องถิ่นและ ซาเคร-เกอร์ โบสถ์สีขาวบนเนินเขา'
  },
  {
    id: 14,
    title: 'ทัวร์อังกฤษ ลอนดอน บิ๊กเบน 7 วัน 5 คืน',
    location: 'ยุโรป',
    city: 'ลอนดอน',
    duration: '7 วัน',
    price: 75900,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 134,
    groupSize: '22-28',
    nextDate: '8 มี.ค. 2567',
    highlights: 'ชมบิ๊กเบนหอนาฬิกาโด่งดังของลอนดอน และอาคารรัฐสภาอังกฤษที่สง่างาม นั่งลอนดอนอายล้อยักษ์ขนาด 135 เมตร ชมวิวทิวทัศน์ 360 องศาของกรุงลอนดอน เยี่ยมชมพระราชวังบัคกิ้งแฮมที่พำนักของราชวงศ์อังกฤษ และชมการเปลี่ยนยามอันโอ่อ่า เดินเล่นในไฮด์ปาร์ค สะพานทาวเวอร์บริดจ์ และย่านโคเวนต์การ์เดนที่เต็มไปด้วยศิลปินท้องถิ่นและตลาดเก่าแก่'
  },
  {
    id: 15,
    title: 'ทัวร์เยอรมนี เบอร์ลิน กำแพง 9 วัน 6 คืน',
    location: 'ยุโรป',
    city: 'เบอร์ลิน',
    duration: '9 วัน',
    price: 82900,
    image: 'https://images.unsplash.com/photo-1587330979470-3016b6702d89?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 89,
    groupSize: '20-25',
    nextDate: '15 มี.ค. 2567',
    highlights: 'เดินผ่านประตูบรานเดนบูร์กสัญลักษณ์แห่งการรวมชาติของเยอรมนี และศูนย์กลางแห่งประวัติศาสตร์ยุโรป สัมผัสประวัติศาสตร์ที่กำแพงเบอร์ลินและอีสต์ไซด์แกลลอรี่ที่เต็มไปด้วยศิลปะกราฟฟิตี้ที่บอกเล่าเรื่องราวการแบ่งแยกประเทศ สำรวจเกาะพิพิธภัณฑ์ที่รวบรวมสมบัติทางวัฒนธรรมและประวัติศาสตร์ของเยอรมนีและยุโรป พร้อมเยี่ยมชมจัตุรัสอเล็กซานเดอร์พลาทซ์และหอคอยโทรทัศน์เบอร์ลิน'
  },
  {
    id: 16,
    title: 'ทัวร์อิตาลี โรม โคลอสเซียม 8 วัน 6 คืน',
    location: 'ยุโรป',
    city: 'โรม',
    duration: '8 วัน',
    price: 78900,
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 201,
    groupSize: '18-24',
    nextDate: '22 มี.ค. 2567',
    highlights: 'สำรวจโคลอสเซียมอัฒจันทร์แห่งกรุงโรมและสนามกีฬาโบราณที่ยิ่งใหญ่ที่สุดในโลก ที่เคยเป็นเวทีการต่อสู้ของนักสู้โบราณ โยนเหรียญที่น้ำพุเทรวีตามตำนานเพื่อความโชคดีและการกลับมาอีกครั้ง เยี่ยมชมนครรัฐวาติกันที่เล็กที่สุดในโลก ชื่นชมงานศิลปะในโบสถ์เซนต์ปีเตอร์และศิสตินชาเปล พร้อมเดินชมเมืองเก่าโรมัน ฟอรัมโรมานุมและแพนธีออน สัมผัสอารยธรรมโรมันโบราณที่ยังคงตราตรึงใจนักท่องเที่ยวจากทั่วโลก'
  },
  // Dubai Tours
  {
    id: 17,
    title: 'ทัวร์ดูไบ บูรจ์คาลิฟา 5 วัน 3 คืน',
    location: 'ดูไบ',
    city: 'ดูไบ',
    duration: '5 วัน',
    price: 35900,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    rating: 4.6,
    reviews: 98,
    groupSize: '15-20',
    nextDate: '25 ก.พ. 2567',
    highlights: 'ขึ้นสู่ยอดบูรจ์คาลิฟาตึกที่สูงที่สุดในโลก ชมวิวพาโนรามาของดูไบจากชั้น 148 ที่ความสูง 555 เมตร ช้อปปิ้งในดูไบมอลล์ห้างสรรพสินค้าที่ใหญ่ที่สุดในโลก พร้อมชมการแสดงน้ำพุเต้นรำที่งดงาม ผจญภัยซาฟารีทะเลทรายด้วยรถ 4WD ขับผ่านเนินทรายที่สูงชัน นั่งอูฐ และลิ้มลองอาหารอาหรับแบบดั้งเดิมในค่ายเบดูอิน พร้อมชมการแสดงระบำหน้าท้องและแทนซูรา ภายใต้แสงดาวในทะเลทราย'
  },
  {
    id: 18,
    title: 'ทัวร์ดูไบ มารีนา เดอะปาล์ม 6 วัน 4 คืน',
    location: 'ดูไบ',
    city: 'ดูไบ มารีนา',
    duration: '6 วัน',
    price: 42900,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 123,
    groupSize: '16-22',
    nextDate: '2 มี.ค. 2567',
    highlights: 'เยี่ยมชมเดอะปาล์มจูมีราห์เกาะเทียมรูปต้นปาล์มที่มหัศจรรย์ที่สุดในโลก เดินเล่นชมสถาปัตยกรรมอันเป็นหนึ่งเดียวในโลก สำรวจดูไบมารีนาย่านที่ทันสมัยริมน้ำ เต็มไปด้วยตึกระฟ้าหรูหราและ yacht marina สุดเลิศ พักผ่อนในรีสอร์ทอตลานติสเดอะปาล์ม สวรรค์แห่งความหรูหรา พร้อมสำรวจสวนน้ำอควาเวนเจอร์และพิพิธภัณฑ์สัตว์น้ำที่ตื่นตาตื่นใจ ชื่นชมวิวทิวทัศน์ของอ่าวเปอร์เซียจากชายหาดทรายขาวสะอาด'
  },
  // Thailand Tours
  {
    id: 19,
    title: 'ทัวร์ไทย เชียงใหม่ ดอยสุเทพ 3 วัน 2 คืน',
    location: 'ไทย',
    city: 'เชียงใหม่',
    duration: '3 วัน',
    price: 8900,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    rating: 4.5,
    reviews: 278,
    groupSize: '25-30',
    nextDate: '18 ก.พ. 2567',
    highlights: 'สักการะวัดพระธาตุดอยสุเทพบนยอดเขาที่ศักดิ์สิทธิ์ที่สุดของเชียงใหม่ ชมวิวพาโนรามาของตัวเมืองเชียงใหม่และเทือกเขาโดยรอบ เดินทางสู่สามเหลี่ยมทองคำจุดพบปะของแม่น้ำโขง ไทย ลาว และเมียนมาร์ สัมผัวประวัติศาสตร์การค้าฝิ่นในอดีต เยี่ยมชมหมู่บ้านชาวเขาที่ยังคงรักษาวิถีชีวิตดั้งเดิม ชมการทอผ้า หัตถกรรมพื้นเมือง และเรียนรู้วัฒนธรรมที่หลากหลายของชนเผ่าต่าง ๆ พร้อมลิ้มลองอาหารพื้นบ้านล้านนาต้นตำรับ'
  },
  {
    id: 20,
    title: 'ทัวร์ไทย ภูเก็ต บิ๊กพุทธา 4 วัน 3 คืน',
    location: 'ไทย',
    city: 'ภูเก็ต',
    duration: '4 วัน',
    price: 12900,
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&h=600&fit=crop',
    rating: 4.6,
    reviews: 345,
    groupSize: '20-25',
    nextDate: '22 ก.พ. 2567',
    highlights: 'สักการะพระใหญ่หรือบิ๊กพุทธาบนเขานาคเกิร์ด ชมพระพุทธรูปขาวขนาดใหญ่ที่สูง 45 เมตร พร้อมวิวทิวทัศน์ 360 องศาของเกาะภูเก็ต พักผ่อนบนหาดป่าตองที่มีชื่อเสียงที่สุด เต็มไปด้วยกิจกรรมทางน้ำ ร้านอาหาร และชีวิตยามค่ำคืนที่คึกคัก เดินทางเที่ยวเกาะพีพีที่งดงามด้วยเรือสปีดโบ๊ท ชมอ่าวมาหยาที่เคยเป็นฉากหนังชื่อดัง สัมผัสน้ำทะเลใสเขียวครามและหาดทรายขาวละเอียด ดำน้ำตื้นชมปะการังที่มีสีสันสวยงาม'
  },
  {
    id: 21,
    title: 'ทัวร์ไทย กรุงเทพ วัดพระแก้ว 2 วัน 1 คืน',
    location: 'ไทย',
    city: 'กรุงเทพ',
    duration: '2 วัน',
    price: 5900,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop',
    rating: 4.4,
    reviews: 456,
    groupSize: '30-35',
    nextDate: '20 ก.พ. 2567',
    highlights: 'สักการะวัดพระแก้วมรกตพระพุทธรูปศักดิ์สิทธิ์ที่สำคัญที่สุดของไทย และชมสถาปัตยกรรมไทยโบราณที่งดงาม เยี่ยมชมพระบรมมหาราชวังที่เป็นสัญลักษณ์แห่งกรุงเทพฯ ชื่นชมความประณีตของงานศิลปกรรมไทย สักการะพระพุทธรูปนอนทองคำขนาดยักษ์ที่วัดโพธิ์ โบสถ์แห่งแรกของกรุงเทพฯ และศึกษาการนวดแผนไทยโบราณ เดินเล่นในย่านเจ้าพระยา ล่องเรือแม่น้ำเจ้าพระยาชมวิวตึกระฟ้าและวัดเก่าแก่ริมน้ำ'
  },
  // USA Tours
  {
    id: 22,
    title: 'ทัวร์อเมริกา นิวยอร์ก เทพีเสรีภาพ 8 วัน 6 คืน',
    location: 'อเมริกา',
    city: 'นิวยอร์ก',
    duration: '8 วัน',
    price: 89900,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
    rating: 4.9,
    reviews: 145,
    groupSize: '18-22',
    nextDate: '2 มี.ค. 2567',
    highlights: 'ถ่ายรูปคู่กับเทพีเสรีภาพสัญลักษณ์แห่งอเมริกาและเสรีภาพของโลก นั่งเรือไปเกาะลิเบอร์ตี้และเรียนรู้ประวัติศาสตร์การอพยพของชาวอเมริกัน สัมผัสความคึกคักของไทม์สแควร์หัวใจกลางของนิวยอร์ก เต็มไปด้วยป้ายไฟ LED ยักษ์และการแสดงบรอดเวย์ระดับโลก เดินเล่นในเซ็นทรัลปาร์คสวนกลางแมนฮัตตัน พร้อมเยี่ยมชมเอ็มไพร์สเตทบิลดิ้ง รูปปั้นอพอลโล และย่านวอลล์สตรีทแห่งการเงินโลก'
  },
  {
    id: 23,
    title: 'ทัวร์อเมริกา ลอสแองเจลิส ฮอลลีวูด 9 วัน 7 คืน',
    location: 'อเมริกา',
    city: 'ลอสแองเจลิส',
    duration: '9 วัน',
    price: 95900,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 112,
    groupSize: '16-20',
    nextDate: '10 มี.ค. 2567',
    highlights: 'ถ่ายรูปคู่กับป้ายฮอลลีวูดไซน์อันโด่งดังบนเนินเขาฮอลลีวูด และเดินตามรอยดาวดังในวอล์กออฟเฟมที่โรงละครไชนีส ขับรถผ่านสะพานโกลเดนเกตสัญลักษณ์ของซานฟรานซิสโกและสะพานแขวนที่สวยที่สุดในโลก สนุกสนานในดิสนีย์แลนด์สวนสนุกแห่งแรกของโลก พบกับมิกกี้เมาส์และตัวละครดิสนีย์ขวัญใจ เยี่ยมชมสตูดิโอยูนิเวอร์แซลฮอลลีวูด สัมผัสเบื้องหลังการสร้างภาพยนตร์และซีรีส์ดัง พร้อมนั่งเครื่องเล่นจากหนังดังอย่าง Transformers และ Jurassic World'
  },
  {
    id: 24,
    title: 'ทัวร์อเมริกา ลาสเวกัส คาสิโน 7 วัน 5 คืน',
    location: 'อเมริกา',
    city: 'ลาสเวกัส',
    duration: '7 วัน',
    price: 78900,
    image: 'https://images.unsplash.com/photo-1605833556294-ea37c2c725ae?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 89,
    groupSize: '20-25',
    nextDate: '18 มี.ค. 2567',
    highlights: 'สัมผัสความตื่นเต้นบนลาสเวกัสสตริปถนนคาสิโนที่มีชื่อเสียงที่สุดในโลก เต็มไปด้วยแสงไฟระยิบระยับและการแสดงสุดอลังการ เดินทางสู่แกรนด์แคนยอนหหนึ่งในสิ่งมหัศจรรย์ของโลก ชมหุบเขาลึกที่สร้างจากธรรมชาติเป็นเวลานับล้านปี และลองบินชมทิวทัศน์จากเฮลิคอปเตอร์ ชื่นชมการแสดงน้ำพุดนตรีและแสงไฟที่เบลลาจิโอ่ พร้อมเดินชมคาสิโนหรูหราและลองเสี่ยงโชคในเมืองแห่งความฝันนี้'
  },
  // Australia Tours
  {
    id: 25,
    title: 'ทัวร์ออสเตรเลีย ซิดนีย์ โอเปร่าเฮาส์ 8 วัน 6 คืน',
    location: 'ออสเตรเลีย',
    city: 'ซิดนีย์',
    duration: '8 วัน',
    price: 85900,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    rating: 4.8,
    reviews: 167,
    groupSize: '18-24',
    nextDate: '25 มี.ค. 2567',
    highlights: 'ชื่นชมโอเปร่าเฮาส์ซิดนีย์อาคารสถาปัตยกรรมไอคอนิกที่มีชื่อเสียงที่สุดของออสเตรเลีย พร้อมเข้าชมการแสดงโอเปร่าระดับโลก เดินข้ามสะพานฮาร์เบอร์บริดจ์เพื่อชมวิวพาโนรามาของเมืองซิดนีย์และท่าเรือ หรือลองปีนขึ้นไปบนยอดสะพานในกิจกรรม BridgeClimb พักผ่อนบนหาดบอนไดที่มีชื่อเสียง สัมผัสวัฒนธรรมการเล่นเซิร์ฟ และเดินเล่นในย่านรอคส์ที่เต็มไปด้วยตลาดวันหยุดสุดสัปดาห์และร้านของที่ระลึก'
  },
  {
    id: 26,
    title: 'ทัวร์ออสเตรเลีย เมลเบิร์น ยูเรก้า 7 วัน 5 คืน',
    location: 'ออสเตรเลีย',
    city: 'เมลเบิร์น',
    duration: '7 วัน',
    price: 79900,
    image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 134,
    groupSize: '20-26',
    nextDate: '1 เม.ย. 2567',
    highlights: 'ขึ้นชมวิวจากยูเรก้าสกายเด็ก 88 จุดชมวิวที่สูงที่สุดในซีกโลกใต้ ชมวิวพาโนรามา 360 องศาของเมืองเมลเบิร์นและเทือกเขา ขับรถเที่ยวเกรตโอเชียนโร้ดเส้นทางชายฝั่งที่สวยที่สุดในโลก ชมหินปูนสิบสองศิษย์ (Twelve Apostles) ที่ตั้งตระหง่านในทะเล เดินเล่นในเซนต์คิลดาบีช พบกับนกเพนกวินป่าใกล้ท่าเรือที่กลางดึก พร้อมสัมผัสวัฒนธรรมกาแฟและอาหารนานาชาติในเลนเวย์ที่มีชื่อเสียงของเมลเบิร์น'
  },
  // China Tours
  {
    id: 27,
    title: 'ทัวร์จีน ปักกิ่ง กำแพงเมืองจีน 6 วัน 4 คืน',
    location: 'จีน',
    city: 'ปักกิ่ง',
    duration: '6 วัน',
    price: 28900,
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=600&fit=crop',
    rating: 4.6,
    reviews: 234,
    groupSize: '25-30',
    nextDate: '15 มี.ค. 2567',
    highlights: 'เดินบนกำแพงเมืองจีนมหาสิ่งก่อสร้างที่ยิ่งใหญ่ที่สุดของมนุษย์ ที่ขึ้นบัดาลิงหรือมู่เถียนหยู ชมทิวทัศน์ของเทือกเขาทอมบ์และ ป่าเลื่อยลึก สำรวจพระราชวังต้องห้าม (เซื่อจิน) อดีตที่ประทับของจักรพรรดิจีน เรียนรู้ประวัติศาสตร์ราชวงศ์หมิงและชิง เดินชมจัตุรัสเทียนอันเหมินจัตุรัสที่ใหญ่ที่สุดในโลก และสุสานประธานเหมา เยี่ยมชมวิหารสวรรค์ (เถียนถาน) สถาปัตยกรรมจีนโบราณที่งดงาม'
  },
  {
    id: 28,
    title: 'ทัวร์จีน เซี่ยงไฮ้ เพิร์ล 5 วัน 3 คืน',
    location: 'จีน',
    city: 'เซี่ยงไฮ้',
    duration: '5 วัน',
    price: 25900,
    image: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=800&h=600&fit=crop',
    rating: 4.5,
    reviews: 189,
    groupSize: '22-28',
    nextDate: '20 มี.ค. 2567',
    highlights: 'ขึ้นชมวิวจากหอไข่มุกตะวันออกสัญลักษณ์ของเซี่ยงไฮ้สมัยใหม่ ชมทิวทัศน์ของเมืองที่ผสมผสานระหว่างตึกระฟ้าใหม่และอาคารเก่าแก่ ช้อปปิ้งบนถนนหนานจิงถนนคนเดินที่คึกคักที่สุด เต็มไปด้วยร้านค้า ร้านอาหาร และแบรนด์นานาชาติ เดินเล่นริมแม่น้ำฮวงโบที่เดอะบันด์ ชมแสงไฟสีสันของตึกระฟ้าในย่านธุรกิจหลูเจียสุ่ย สัมผัสเสน่ห์ของเซี่ยงไฮ้เก่าในฝรั่งเศสคอนเซสชันและยู่หยวน การ์เดน'
  }
]

// Popular destinations data (Tab 1) - Countries with famous landmark images (2 pages support)
const popularDestinations = [
  { id: 1, name: 'ญี่ปุ่น', image: 'https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 5 },
  { id: 2, name: 'เกาหลี', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 4 },
  { id: 3, name: 'สิงคโปร์', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 3 },
  { id: 4, name: 'ยุโรป', image: 'https://images.unsplash.com/photo-1471623432079-b009d30b6729?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 4 },
  { id: 5, name: 'ดูไบ', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 2 },
  { id: 6, name: 'ไทย', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 3 },
  { id: 7, name: 'อเมริกา', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 3 },
  { id: 8, name: 'ออสเตรเลีย', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 2 },
  { id: 9, name: 'จีน', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 2 }
]

// Popular cities by country (Tab 2) - Cities with famous landmark images (Expanded for 2 page support)
const popularCitiesByCountry = {
  'ญี่ปุ่น': [
    { id: 1, name: 'โตเกียว', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 2, name: 'โอซาก้า', image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 3, name: 'เกียวโต', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 4, name: 'ฮอกไกโด', image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 5, name: 'นาโกย่า', image: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 }
  ],
  'เกาหลี': [
    { id: 6, name: 'โซล', image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 7, name: 'ปูซาน', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 8, name: 'เชจู', image: 'https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 9, name: 'อินชอน', image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 }
  ],
  'สิงคโปร์': [
    { id: 10, name: 'มารีนา เบย์', image: 'https://images.unsplash.com/photo-1508964942454-1fdcf0fdcbc1?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 11, name: 'เซนโตซา', image: 'https://images.unsplash.com/photo-1562503542-2a1e6f03b9e0?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 12, name: 'ออร์ชาร์ด', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 }
  ],
  'ยุโรป': [
    { id: 13, name: 'ปารีส', image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 14, name: 'ลอนดอน', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 15, name: 'เบอร์ลิน', image: 'https://images.unsplash.com/photo-1587330979470-3016b6702d89?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 16, name: 'โรม', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 }
  ],
  'ดูไบ': [
    { id: 17, name: 'ดูไบ', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 18, name: 'ดูไบ มารีนา', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 }
  ],
  'ไทย': [
    { id: 19, name: 'เชียงใหม่', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 20, name: 'ภูเก็ต', image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 21, name: 'กรุงเทพ', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 }
  ],
  'อเมริกา': [
    { id: 22, name: 'นิวยอร์ก', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 23, name: 'ลอสแองเจลิส', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 24, name: 'ลาสเวกัส', image: 'https://images.unsplash.com/photo-1605833556294-ea37c2c725ae?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 }
  ],
  'ออสเตรเลีย': [
    { id: 25, name: 'ซิดนีย์', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 26, name: 'เมลเบิร์น', image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 }
  ],
  'จีน': [
    { id: 27, name: 'ปักกิ่ง', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 },
    { id: 28, name: 'เซี่ยงไฮ้', image: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=500&h=400&fit=crop&crop=entropy&auto=format', tours: 1 }
  ]
}

export default function TourSearch4Page() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState<'popular' | 'interesting' | 'cities'>('popular')
  const [currentPage, setCurrentPage] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [hasScrolledToResults, setHasScrolledToResults] = useState(false)
  const [selectedMonths, setSelectedMonths] = useState<{[tourId: number]: string}>({})
  
  // Auto-select first month for all tours on component mount
  React.useEffect(() => {
    const initialSelections: {[tourId: number]: string} = {}
    tours.forEach(tour => {
      initialSelections[tour.id] = allMonths[0] // Default to first month (ส.ค. 68)
    })
    setSelectedMonths(initialSelections)
  }, [])
  const [expandedDepartures, setExpandedDepartures] = useState<{[tourId: number]: boolean}>({})  
  
  // All available months in order from Aug 68 to Feb 69
  const allMonths = ['ส.ค. 68', 'ก.ย. 68', 'ต.ค. 68', 'พ.ย. 68', 'ธ.ค. 68', 'ม.ค. 69', 'ก.พ. 69']
  
  // Mock departure periods data
  const generateDeparturePeriods = (month: string) => {
    const monthOnly = month.replace(' 68', '').replace(' 69', '')
    const year = month.includes('69') ? '69' : '68'
    const nextMonth = getNextMonth(monthOnly, year)
    
    const periods = [
      `3-10 ${monthOnly} ${year}`,
      `10-17 ${monthOnly} ${year}`, 
      `17-24 ${monthOnly} ${year}`,
      `24-31 ${monthOnly} ${year}`,
      `31 ${monthOnly} - 7 ${nextMonth}`,
      `7-14 ${nextMonth}`,
      `14-21 ${nextMonth}`,
      `21-28 ${nextMonth}`
    ]
    return periods.slice(0, Math.floor(Math.random() * 6) + 5) // 5-10 periods
  }
  
  const getNextMonth = (month: string, currentYear: string) => {
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
    const currentIndex = months.indexOf(month)
    const nextIndex = (currentIndex + 1) % months.length
    
    // If we roll over from ธ.ค. to ม.ค., increment year
    let nextYear = currentYear
    if (month === 'ธ.ค.' && currentYear === '68') {
      nextYear = '69'
    }
    
    return `${months[nextIndex]} ${nextYear}`
  }
  
  const handleMonthSelect = (tourId: number, month: string) => {
    setSelectedMonths(prev => ({ ...prev, [tourId]: month }))
  }

  const toggleDepartureExpanded = (tourId: number) => {
    setExpandedDepartures(prev => ({ ...prev, [tourId]: !prev[tourId] }))
  }

  // Dynamic tour count calculation
  const getTourCountForCountry = (countryName: string) => {
    return tours.filter(tour => tour.location.includes(countryName)).length
  }

  const getTourCountForCity = (countryName: string, cityName: string) => {
    return tours.filter(tour => tour.location.includes(countryName) && tour.city === cityName).length
  }

  // Filter tours based on selected country and city
  const filteredTours = (() => {
    if (!hasScrolledToResults) return tours // Don't filter until user scrolls
    
    if (selectedCity && selectedCountry) {
      // Filter by city if selected
      return tours.filter(tour => tour.location.includes(selectedCountry) && tour.city === selectedCity)
    } else if (selectedCountry) {
      // Filter by country if selected
      return tours.filter(tour => tour.location.includes(selectedCountry))
    }
    return tours
  })()

  // Get current destinations based on active tab with dynamic tour counts
  const currentDestinations = (() => {
    if (activeTab === 'interesting') {
      if (selectedCountry) {
        // Tab 2: Show cities when country is selected with actual tour counts
        const cities = popularCitiesByCountry[selectedCountry as keyof typeof popularCitiesByCountry] || []
        return cities.map(city => ({
          ...city,
          tours: getTourCountForCity(selectedCountry, city.name)
        }))
      } else {
        // Tab 2: Show empty when no country selected (locked state)
        return []
      }
    }
    // Tab 1: Show countries with dynamic tour counts
    return popularDestinations.map(country => ({
      ...country,
      tours: getTourCountForCountry(country.name)
    }))
  })()
  
  // All destinations with "ทั้งหมด" button at the end (only if there are destinations)
  const allDestinations = currentDestinations.length > 0 ? [
    ...currentDestinations,
    { id: 999, name: 'ทั้งหมด', image: null, tours: tours.length }
  ] : []
  
  // Handle country selection
  const handleCountrySelect = (countryName: string | null) => {
    setSelectedCountry(countryName)
    setSelectedCity(null)
    setCurrentPage(0)
    setHasScrolledToResults(false)
    // Always go back to Tab 1 when selecting a new country
    setActiveTab('popular')
  }

  // Handle city selection
  const handleCitySelect = (cityName: string | null) => {
    setSelectedCity(cityName)
    setHasScrolledToResults(false)
  }

  // Reset page when tab changes
  const handleTabChange = (tab: 'popular' | 'interesting') => {
    setActiveTab(tab)
    setCurrentPage(0)
    
    if (tab === 'popular') {
      // Tab 1: Reset city selection, keep country if any
      setSelectedCity(null)
      setHasScrolledToResults(false)
    }
    // Tab 2: Keep both country and city selections
  }

  // Scroll detection
  const handleScroll = () => {
    const resultsSection = document.getElementById('results-section')
    if (resultsSection) {
      const rect = resultsSection.getBoundingClientRect()
      if (rect.top <= window.innerHeight && !hasScrolledToResults) {
        setHasScrolledToResults(true)
      }
    }
  }

  // Add scroll listener
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasScrolledToResults])

  // Calculate pagination for mobile (4 items per page - 2x2 grid)
  const itemsPerPage = 4
  const totalPages = Math.ceil(allDestinations.length / itemsPerPage)
  
  const getCurrentPageItems = () => {
    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const pageItems = allDestinations.slice(startIndex, endIndex)
    
    // Fill remaining slots with empty placeholders to maintain 2x2 grid
    while (pageItems.length < itemsPerPage) {
      pageItems.push({
        id: 0,
        name: '',
        image: null,
        tours: 0
      })
    }
    
    return pageItems
  }

  // Touch handlers for swipe functionality
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1)
    }
    if (isRightSwipe && currentPage > 0) {
      setCurrentPage(prev => prev - 1)
    }
  }

  return (
    <>
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600"
          alt="Beautiful Mountain Landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-center drop-shadow-lg">
            ค้นพบโลกใบใหม่ไปกับเรา
          </h1>
          <p className="text-lg md:text-xl text-white/90 text-center drop-shadow-md max-w-2xl">
            เลือกจุดหมายปลายทางในฝันของคุณ พร้อมแพ็คเกจทัวร์คุณภาพ
          </p>
        </div>
      </div>

      {/* Country Destinations Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">เลือกจุดหมายปลายทางของคุณ</h2>
          <p className="text-gray-600 text-center mb-6">สำรวจแพ็คเกจทัวร์ยอดนิยมจากทั่วโลก</p>
          
          {/* Tab Selector - Enhanced UX */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-1.5 flex max-w-full overflow-x-auto scrollbar-hide shadow-sm border border-gray-200">
              <button
                onClick={() => handleTabChange('popular')}
                className={`px-5 md:px-7 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-2 relative overflow-hidden ${
                  activeTab === 'popular'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-white/80 hover:shadow-md'
                }`}
              >
                {activeTab === 'popular' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 animate-pulse rounded-lg"></div>
                )}
                <CheckCircle className={`w-5 h-5 relative z-10 ${activeTab === 'popular' ? 'animate-bounce' : ''}`} />
                <span className="relative z-10">เลือกประเทศที่ใช่</span>
              </button>
              <button
                onClick={() => selectedCountry ? handleTabChange('interesting') : null}
                disabled={!selectedCountry}
                className={`px-5 md:px-7 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-2 relative overflow-hidden ${
                  !selectedCountry 
                    ? 'text-gray-400 cursor-not-allowed opacity-50 bg-gray-200/50'
                    : activeTab === 'interesting'
                      ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:text-pink-600 hover:bg-white/80 hover:shadow-md'
                }`}
              >
                {activeTab === 'interesting' && selectedCountry && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-rose-400/20 animate-pulse rounded-lg"></div>
                )}
                <Heart className={`w-5 h-5 relative z-10 ${activeTab === 'interesting' && selectedCountry ? 'animate-pulse text-pink-100' : ''}`} />
                <span className="relative z-10">เลือกเมืองที่รัก</span>
              </button>
            </div>
          </div>
          
          {/* Locked Message for Tab 2 */}
          {activeTab === 'interesting' && !selectedCountry && (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600">กรุณาเลือกประเทศก่อน</h3>
                <p className="text-gray-500">ไปที่แท็บ "เลือกประเทศที่ใช่" เพื่อเลือกประเทศก่อนค่ะ</p>
                <button
                  onClick={() => handleTabChange('popular')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <CheckCircle className="w-4 h-4 animate-bounce" />
                  ไปเลือกประเทศ
                </button>
              </div>
            </div>
          )}

          {/* Desktop Grid - Increased Size */}
          <div className={`hidden md:grid grid-cols-4 gap-6 ${activeTab === 'interesting' && !selectedCountry ? 'hidden' : ''}`}>
            <button
              onClick={() => {
                if (activeTab === 'interesting' && selectedCountry) {
                  handleCitySelect(null)
                } else {
                  handleCountrySelect(null)
                }
              }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-110 ring-2 ring-transparent hover:ring-blue-300"
            >
              <div className="relative h-48 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/30"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20m-2 0a2 2 0 1 1 4 0a2 2 0 1 1-4 0M10 10m-2 0a2 2 0 1 1 4 0a2 2 0 1 1-4 0M30 10m-2 0a2 2 0 1 1 4 0a2 2 0 1 1-4 0M10 30m-2 0a2 2 0 1 1 4 0a2 2 0 1 1-4 0M30 30m-2 0a2 2 0 1 1 4 0a2 2 0 1 1-4 0'/%3E%3C/g%3E%3C/svg%3E')] opacity-60"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="relative mb-2">
                    <div className="absolute inset-0 bg-cyan-300/40 rounded-full blur-md animate-pulse"></div>
                    <div className="relative bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 drop-shadow-md">🌍 ทั้งหมด</h3>
                  <div className="flex items-center gap-1 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                    <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
                    <span className="text-white font-bold text-sm">{tours.length}</span>
                    <span className="text-cyan-100 text-xs">ทัวร์</span>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white p-1 rounded-full shadow-lg animate-bounce">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 group-hover:to-white/20 transition-all duration-300"></div>
              </div>
            </button>
            {currentDestinations.slice(0, 9).map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (activeTab === 'interesting' && selectedCountry) {
                    handleCitySelect(item.name)
                  } else {
                    handleCountrySelect(item.name)
                  }
                }}
                className={`group relative overflow-hidden rounded-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-110 ${
                  (
                    (activeTab === 'popular' && selectedCountry === item.name) ||
                    (activeTab === 'interesting' && selectedCountry && selectedCity === item.name)
                  ) 
                    ? 'ring-4 ring-blue-400 shadow-2xl scale-105 bg-blue-50/20' 
                    : 'ring-2 ring-transparent hover:ring-blue-300'
                }`}
              >
                <div className="relative h-52">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                    fill
                    className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 16vw"
                    priority={item.id <= 5}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodeURIComponent(item.name)}`;
                    }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  {/* Selected state highlight - Fixed for proper tab handling */}
                  {(
                    (activeTab === 'popular' && selectedCountry === item.name) ||
                    (activeTab === 'interesting' && selectedCountry && selectedCity === item.name)
                  ) && (
                    <div className="absolute inset-0 bg-blue-500/20 border-4 border-blue-400 rounded-xl animate-pulse"></div>
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                    <h3 className="text-white font-bold text-lg mb-2">{item.name}</h3>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white font-semibold text-sm">{item.tours}</span>
                        <span className="text-white/80 text-xs">ทัวร์</span>
                      </div>
                    </div>
                  </div>
                  {/* Selected indicator removed - using ring highlight instead */}
                </div>
              </button>
            ))}
          </div>

          {/* Mobile Locked Message for Tab 2 */}
          {activeTab === 'interesting' && !selectedCountry && (
            <div className="md:hidden text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="flex flex-col items-center gap-2">
                <Heart className="w-12 h-12 text-gray-400" />
                <h3 className="text-base font-semibold text-gray-600">กรุณาเลือกประเทศก่อน</h3>
                <p className="text-sm text-gray-500">ไปที่แท็บ "เลือกประเทศที่ใช่" เพื่อเลือกประเทศก่อนค่ะ</p>
                <button
                  onClick={() => handleTabChange('popular')}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <CheckCircle className="w-3 h-3 animate-bounce" />
                  ไปเลือกประเทศ
                </button>
              </div>
            </div>
          )}

          {/* Mobile Grid - Improved UX/UI with Original Card Format */}
          <div className={`md:hidden ${activeTab === 'interesting' && !selectedCountry ? 'hidden' : ''}`}>
            <div 
              className="overflow-hidden px-1"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
              >
                {Array.from({ length: totalPages }, (_, pageIndex) => (
                  <div key={pageIndex} className="w-full flex-shrink-0 px-2">
                    <div className="grid grid-cols-2 gap-4">
                      {Array.from({ length: itemsPerPage }, (_, itemIndex) => {
                        const globalIndex = pageIndex * itemsPerPage + itemIndex
                        const item = allDestinations[globalIndex]
                        
                        if (!item) {
                          return <div key={itemIndex} className="h-56"></div> // Empty placeholder
                        }

                        const isSelected = item.name === 'ทั้งหมด' 
                          ? (activeTab === 'interesting' && selectedCountry ? !selectedCity : !selectedCountry)
                          : (
                              (activeTab === 'popular' && selectedCountry === item.name) ||
                              (activeTab === 'interesting' && selectedCountry && selectedCity === item.name)
                            )
                        
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              if (item.name === 'ทั้งหมด') {
                                if (activeTab === 'interesting' && selectedCountry) {
                                  handleCitySelect(null)
                                } else {
                                  handleCountrySelect(null)
                                }
                              } else {
                                if (activeTab === 'interesting' && selectedCountry) {
                                  handleCitySelect(item.name)
                                } else {
                                  handleCountrySelect(item.name)
                                }
                              }
                            }}
                            className={`group relative overflow-hidden rounded-2xl transition-all duration-300 active:scale-95 ${
                              isSelected 
                                ? 'shadow-xl scale-102' 
                                : 'shadow-lg hover:shadow-xl active:shadow-xl'
                            }`}
                            style={{ touchAction: 'manipulation' }}
                          >
                            <div className="relative h-56">
                              {item.name === 'ทั้งหมด' ? (
                                <div className="relative h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800">
                                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/30"></div>
                                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20m-2 0a2 2 0 1 1 4 0a2 2 0 1 1-4 0M10 10m-2 0a2 2 0 1 1 4 0a2 2 0 1 1-4 0M30 10m-2 0a2 2 0 1 1 4 0a2 2 0 1 1-4 0M10 30m-2 0a2 2 0 1 1 4 0a2 2 0 1 1-4 0M30 30m-2 0a2 2 0 1 1 4 0a2 2 0 1 1-4 0'/%3E%3C/g%3E%3C/svg%3E')] opacity-60"></div>
                                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                                    <div className="relative mb-2">
                                      <div className="absolute inset-0 bg-cyan-300/40 rounded-full blur-sm animate-pulse"></div>
                                      <div className="relative bg-white/20 backdrop-blur-sm rounded-full p-2">
                                        <TrendingUp className="w-6 h-6 text-white" />
                                      </div>
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-2 drop-shadow-md text-center">🌍 ทั้งหมด</h3>
                                    <div className="flex items-center gap-1 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                                      <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse"></div>
                                      <span className="text-white font-bold text-sm">{item.tours}</span>
                                      <span className="text-cyan-100 text-xs">ทัวร์</span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  {item.image && (
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                    fill
                                    className="object-cover group-active:scale-110 transition-transform duration-500"
                                    sizes="(max-width: 768px) 33vw, 20vw"
                                    priority={globalIndex < 6}
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = `https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=${encodeURIComponent(item.name)}`;
                                    }}
                                    />
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                  <div className="absolute inset-0 flex flex-col items-center justify-end p-3">
                                    <h3 className="text-white font-bold text-base mb-2 text-center leading-tight drop-shadow-md">{item.name}</h3>
                                    <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                      <span className="text-white font-bold text-sm">{item.tours}</span>
                                      <span className="text-white/90 text-xs">ทัวร์</span>
                                    </div>
                                  </div>
                                </>
                              )}
                              
                              {/* Selected state highlight for mobile - Single border only */}
                              {isSelected && (
                                <div className="absolute inset-0 border-2 border-blue-500 rounded-2xl bg-blue-500/10">
                                  <div className="absolute top-2 right-2">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                      <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Pagination Dots */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 gap-3">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentPage === index 
                        ? 'w-8 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md' 
                        : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 active:bg-gray-500'
                    }`}
                    style={{ touchAction: 'manipulation' }}
                  />
                ))}
              </div>
            )}

            {/* Mobile-specific instructions */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                ปัดซ้าย-ขวา เพื่อดูตัวเลือกเพิ่มเติม
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="results-section" className="max-w-7xl mx-auto px-4 py-12">
        {/* Results Count - Sticky Header */}
        <div className="sticky top-16 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3 md:py-4 mb-6 z-40 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-semibold">
              {selectedCity 
                ? `ทัวร์${selectedCity} ${selectedCountry}` 
                : selectedCountry 
                  ? `ทัวร์${selectedCountry}` 
                  : 'แพ็คเกจทัวร์ทั้งหมด'
              } ({filteredTours.length})
            </h2>
            {(selectedCountry || selectedCity) && (
              <button
                onClick={() => {
                  handleCountrySelect(null)
                  handleCitySelect(null)
                  setHasScrolledToResults(false)
                }}
                className="text-xs text-gray-500 hover:text-red-500 transition-colors duration-200 flex items-center gap-1"
                style={{ touchAction: 'manipulation' }}
              >
                <X className="w-3 h-3" />
                <span>ล้างตัวกรอง</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Additional Info - Non-sticky */}
        <div className="mb-6 -mt-6">
          {selectedCity && selectedCountry && (
            <p className="text-gray-600 mt-1 text-sm md:text-base">กำลังแสดงเฉพาะทัวร์ที่ไป{selectedCity} ประเทศ{selectedCountry}</p>
          )}
          {selectedCountry && !selectedCity && (
            <p className="text-gray-600 mt-1 text-sm md:text-base">กำลังแสดงเฉพาะทัวร์ที่ไป{selectedCountry}</p>
          )}
          {!hasScrolledToResults && (selectedCountry || selectedCity) && (
            <p className="text-blue-600 mt-1 text-sm">💡 เลื่อนลงเพื่อดูผลการค้นหาที่กรองแล้ว</p>
          )}
        </div>

        {/* Tours Grid - Enhanced Mobile First UI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {filteredTours.map(tour => (
            <Link 
              href={`/tour-search-4/${tour.id}`} 
              key={tour.id}
              className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 active:scale-95 touch-manipulation"
              style={{ touchAction: 'manipulation' }}
            >
              {/* Image with Gradient Overlay */}
              <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover group-hover:scale-105 md:group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                


                {/* Price Badge - Compact */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                  <div className="bg-red-500 text-white px-2.5 py-1.5 rounded-lg shadow-lg text-right">
                    {tour.originalPrice && (
                      <p className="text-xs text-red-200 line-through leading-tight">
                        ฿{tour.originalPrice.toLocaleString()}
                      </p>
                    )}
                    <p className="text-sm font-bold leading-tight">
                      ฿{tour.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                <h3 className="font-bold text-lg md:text-xl mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                  {tour.title}
                </h3>
                
                {/* Location */}
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="font-medium ml-1.5">{tour.location}</span>
                </div>

                {/* Airline Full Name */}
                <div className="text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Plane className="w-4 h-4 text-blue-500 mr-1.5" />
                    <span className="font-medium">{tour.airlineName || 'สายการบินชั้นนำ'} ({tour.airline})</span>
                  </div>
                </div>

                {/* Reviews & Rating */}
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <span className="text-xs">({tour.reviews} รีวิว)</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <div className="flex items-center gap-1">
                    {/* 5 Star Rating Display */}
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((starNumber) => {
                        const filled = tour.rating >= starNumber;
                        const partialFill = tour.rating > starNumber - 1 && tour.rating < starNumber;
                        const fillPercentage = partialFill ? ((tour.rating - (starNumber - 1)) * 100) : 0;
                        
                        return (
                          <div key={starNumber} className="relative">
                            <Star 
                              className={`w-3 h-3 ${filled ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} 
                            />
                            {partialFill && (
                              <div 
                                className="absolute top-0 left-0 overflow-hidden"
                                style={{ width: `${fillPercentage}%` }}
                              >
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <span className="text-xs font-bold ml-1">{tour.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {tour.highlights}
                </p>

                {/* Travel Dates Section */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="mb-2">
                    <p className="text-xs font-medium text-gray-600">ช่วงเวลาเดินทาง</p>
                  </div>

                  {tour.departureDates && (
                    <div className="space-y-2">
                      {/* Month Tabs - Horizontal Scroll */}
                      <div className="overflow-x-auto scrollbar-hide">
                        <div className="flex gap-1 w-max pb-1">
                          {allMonths.map(month => (
                            <button
                              key={month}
                              onClick={(e) => {
                                e.preventDefault()
                                handleMonthSelect(tour.id, month)
                              }}
                              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                                selectedMonths[tour.id] === month
                                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {month}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Selected Month Periods - Always Show */}
                      <div className="max-h-32 overflow-y-auto space-y-1 mt-2">
                        {generateDeparturePeriods(selectedMonths[tour.id] || allMonths[0]).slice(0, 5).map((period, index) => {
                          const getAvailabilityStatus = (availableSeats: number) => {
                            if (availableSeats >= 15) return { text: `ว่าง ${availableSeats}`, style: 'bg-green-50 text-green-700 border-green-200' }
                            if (availableSeats >= 8) return { text: `เหลือ ${availableSeats}`, style: 'bg-yellow-50 text-yellow-700 border-yellow-200' }
                            if (availableSeats >= 1) return { text: `ใกล้เต็ม ${availableSeats}`, style: 'bg-red-50 text-red-700 border-red-200' }
                            return { text: 'เต็มแล้ว', style: 'bg-gray-50 text-gray-500 border-gray-200' }
                          }
                          const status = getAvailabilityStatus(tour.availableSeats || 0)
                          return (
                            <div
                              key={index}
                              className={`px-2 py-1.5 rounded-md text-xs font-medium border ${status.style} flex justify-between items-center`}
                            >
                              <span>{period}</span>
                              <span className="ml-2">({status.text})</span>
                            </div>
                          )
                        })}
                      </div>

                    </div>
                  )}
                </div>

                {/* View Details Button - Always Visible */}
                <div className="mt-4">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-2.5 md:py-2 rounded-lg font-semibold text-sm hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                    ดูรายละเอียด
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-100 py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">รับข้อเสนอพิเศษ</h2>
          <p className="text-gray-600 mb-8">
            สมัครรับข่าวสารเพื่อรับโปรโมชั่นและข้อเสนอพิเศษก่อนใคร
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="กรอกอีเมลของคุณ"
              className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
              สมัครรับข่าวสาร
            </button>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-5xl font-bold text-blue-600 mb-2">50k+</h3>
              <p className="text-gray-600">ลูกค้าพึงพอใจ</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-blue-600 mb-2">500+</h3>
              <p className="text-gray-600">แพ็คเกจทัวร์</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-blue-600 mb-2">100+</h3>
              <p className="text-gray-600">จุดหมายปลายทาง</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-blue-600 mb-2">4.8</h3>
              <p className="text-gray-600">คะแนนความพึงพอใจ</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}