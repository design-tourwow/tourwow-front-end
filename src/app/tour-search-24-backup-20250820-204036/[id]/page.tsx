import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import TourDetailClient from './TourDetailClient'

// Server-side imports (only available during build/server)
const fs = require('fs')
const path = require('path')

// Generate static params for all tours
export async function generateStaticParams() {
  try {
    const indexPath = path.join(process.cwd(), 'data', 'tours', 'index.json')
    const indexData = fs.readFileSync(indexPath, 'utf-8')
    const tours = JSON.parse(indexData)
    
    return tours.map((tour: any) => ({
      id: tour.slug
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    // Fallback to known tour IDs
    return [
      { id: 'tour-jp-001' },
      { id: 'tour-kr-002' },
      { id: 'tour-tw-003' },
      { id: 'tour-tr-004' },
      { id: 'tour-eu-005' },
      { id: 'tour-cn-006' },
      { id: 'tour-sg-007' },
      { id: 'tour-my-008' },
      { id: 'tour-id-009' },
      { id: 'tour-ph-010' },
      { id: 'tour-vn-011' },
      { id: 'tour-kh-012' }
    ]
  }
}

async function getTourData(id: string) {
  try {
    // Read tour data from generated seed file
    const filePath = path.join(process.cwd(), 'data', 'tours', `${id}.json`)
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error loading tour data for ${id}:`, error)
    return null
  }
}

// Fallback mock data for development
const getMockTourData = (id: string) => {
  const tours = {
    'tour-turkey-009': {
      "id": "tour-turkey-009",
      "title": "ทัวร์ตุรกี 9 วัน 7 คืน บินตรง",
      "country": "Turkey",
      "cities": ["Istanbul", "Cappadocia", "Pamukkale"],
      "duration_days": 9,
      "nights": 7,
      "price_from": 39999,
      "currency": "THB",
      "badges": ["Hot", "Promotion"],
      "rating": 4.8,
      "reviews_count": 126,
      "hero_images": [
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
      ],
      "highlights": [
        "บินตรง Full Service",
        "พักโรงแรม 4 ดาว",
        "บอลลูนคัปปาโดเกีย",
        "พามุกคาเล่คอตตันปราสาท"
      ],
      "itinerary": [
        {"day":1,"title":"ออกเดินทางจากกรุงเทพฯ","details":["เช็คอิน 3 ชม.ก่อนเดินทาง","ออกเดินทางด้วยสายการบินตุรกี","มื้ออาหารบนเครื่อง"]},
        {"day":2,"title":"อิสตันบูล - เมืองประวัติศาสตร์","details":["Blue Mosque มัสยิดสีฟ้า","Hagia Sophia พิพิธภัณฑ์ฮาเจียโซเฟีย","Grand Bazaar ตลาดใหญ่","พักโรงแรม 4 ดาว"]},
        {"day":3,"title":"คัปปาโดเกีย - แดนมหัศจรรย์","details":["บินภายในประเทศสู่คัปปาโดเกีย","ชมหินปรากฏการณ์ธรรมชาติ","เมือง Goreme ที่มีชื่อเสียง","พักโรงแรม Cave Hotel"]},
        {"day":4,"title":"บอลลูนคัปปาโดเกีย","details":["ขึ้นบอลลูนชมวิวยามเช้า (ถ้าสภาพอากาศอำนวย)","เยือน Derinkuyu เมืองใต้ดิน","ชมการทำเครื่องปั้นดินเผา","ช้อปปิ้งของฝากพื้นเมือง"]},
        {"day":5,"title":"พามุกคาเล่ - คอตตันปราสาท","details":["เดินทางสู่พามุกคาเล่","ชม Cotton Castle น้ำพุร้อนธรรมชาติ","เยือนเมืองโบราณ Hierapolis","แช่น้ำแร่บำบัด Cleopatra Pool"]}
      ],
      "gallery": [
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=800&h=600&fit=crop"
      ],
      "included": [
        "ตั๋วเครื่องบินไป-กลับ",
        "โรงแรม 4 ดาว",
        "อาหารครบทุกมื้อ",
        "รถรับส่ง VIP",
        "ไกด์ไทยประสบการณ์"
      ],
      "excluded": [
        "ทิปไกด์และคนขับ",
        "ค่าทำวีซ่า (ถ้ามี)",
        "ประกันเสริม",
        "ค่าใช้จ่ายส่วนตัว"
      ],
      "policies": {
        "deposit": 3000,
        "cancellation": "ยกเลิกฟรีภายใน 7 วันหลังจอง",
        "payment_options": ["บัตรเครดิต","โอนเงิน","ผ่อน 0% 6 เดือน"]
      },
      "departures": [
        {"id":"dep-2025-11-12","date_range":"12–20 พ.ย. 2568","price":39999,"seats_left":12,"status":"available"},
        {"id":"dep-2025-12-10","date_range":"10–18 ธ.ค. 2568","price":41999,"seats_left":3,"status":"low"},
        {"id":"dep-2026-01-15","date_range":"15–23 ม.ค. 2569","price":38999,"seats_left":0,"status":"soldout"}
      ],
      "addons": [
        {"code":"INS10","label":"ประกันการเดินทาง","price":899},
        {"code":"HKUP","label":"อัปเกรดโรงแรม","price":2500},
        {"code":"SEAT","label":"เลือกที่นั่งเครื่องบิน","price":500}
      ],
      "faqs": [
        {"q":"💳 ต้องขอวีซ่าหรือไม่? ค่าใช้จ่ายเท่าไหร่?","a":"🇹🇭 คนไทยเข้าตุรกีง่ายมาก! ไม่ต้องขอวีซ่าล่วงหน้า ขอ e-Visa ออนไลน์ก่อนเดินทาง 5 วัน ค่าธรรมเนียม 50 USD (~1,800 บาท) หรือขอ Visa on Arrival ที่สนามบินได้เลย ใช้เวลา 10-15 นาที","helpful":234},
        {"q":"🍽️ อาหารเป็นอย่างไร? มีอาหารเจ/ฮาลาลไหม?","a":"😋 อาหารตุรกีอร่อยมากค่ะ! คล้ายอาหารไทย มีเครื่องเทศ ไม่จัดจ้าน มีข้าว มีไก่ มีปลา 🥘 สำหรับอาหารเจ/ฮาลาล แจ้งตอนจองได้เลย เราจัดให้ฟรี ไม่มีค่าใช้จ่ายเพิ่ม 🆓","helpful":189},
        {"q":"🌡️ อากาศเป็นอย่างไร? เตรียมเสื้อผ้าแบบไหน?","a":"🧥 ช่วง พ.ย.-ก.พ. อุณหภูมิ 5-15°C เย็นสบาย ☀️ กลางวันแดดอุ่น 🌙 กลางคืนหนาว ต้องเตรียม: เสื้อกันหนาวหนา, ผ้าพันคอ, รองเท้าใบ, ถุงมือ 🧤 มี Heater ในโรงแรมทุกที่ค่ะ","helpful":156},
        {"q":"🎈 บอลลูนบินแน่นอนไหม? ถ้าไม่ได้บินทำไง?","a":"✈️ รับประกันบิน 95%! เราใช้บริษัทบอลลูนดีที่สุด มี Safety Record ดี ☁️ หากสภาพอากาศไม่เอื้ออำนวย มีกิจกรรมทดแทน: ATV, Horse Riding, Underground City 💰 และคืนเงินค่าบอลลูน 100% ทันที","helpful":278},
        {"q":"💰 เงินเท่าไหร่พอ? ใช้การ์ดได้ไหม?","a":"💳 ใช้ Visa/Mastercard ได้ทุกที่ 🏪 แนะนำเงินสด 200-300 USD สำหรับ: ทิป, ของฝาก, ค่าเข้าห้องน้ำ, ตลาด Grand Bazaar 🎯 Tips: ต่อราคาได้เกือบทุกอย่าง!","helpful":201},
        {"q":"✈️ กระเป๋าเท่าไหร่? น้ำหนักเท่าไหร่?","a":"🧳 Turkish Airlines: โครเษร 23kg, Hand carry 8kg 👜 แนะนำเหลือน้ำหนักไว้ 5kg สำหรับของฝาก พรมตุรกี, หนัง, Turkish Delight, Baklava 🍯 ของฝากเด็ด!","helpful":167},
        {"q":"👥 ไปกี่คน? เด็กไปได้ไหม? คนแก่ล่ะ?","a":"👨‍👩‍👧‍👦 กลุ่ม 15-25 คน ไม่เยอะ ดูแลทั่วถึง 🧒 เด็ก 2-11 ปี ลดราคา 👵 คนแก่ OK เลย! มีลิฟต์ รถมี step พิเศษ ไกด์ช่วยถือของ เดินช้าๆ 🚶‍♀️","helpful":143},
        {"q":"📱 Internet/WiFi ใช้ได้ไหม? ซิมการ์ดแบบไหน?","a":"📶 WiFi ฟรีทุกโรงแรม, ร้านอาหาร, Mall 🌐 แนะนำ eSIM AIS Roaming 299 บาท/วัน หรือซื้อ Turkcell SIM ที่สนามบิน 25 TL (~200 บาท) Internet เร็วมาก!","helpful":134}
      ],
      "related": [
        {"id":"tour-turkey-011","title":"ทัวร์ตุรกี 8 วัน","price_from":35999,"thumb":"https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop"},
        {"id":"tour-europe-015","title":"ทัวร์สเปน-โปรตุเกส 9 วัน","price_from":45999,"thumb":"https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop"}
      ],
      "reviews": [
        {"id":1,"name":"คุณสมศรี จ.","avatar":"","rating":5,"verified":true,"trip_date":"ต.ค. 2024","comment":"ประทับใจมาก! บอลลูนคัปปาโดเกีย สวยมากจนน้ำตาไหล ไกด์พี่เอ็มใจดี อธิบายประวัติดี ที่พักสะอาด อาหารอร่อยกว่าที่คิด ขอบคุณทีมงานทุกคนเลยค่ะ จะกลับมาใช้บริการอีกแน่นอน 💕","date":"2024-10-15","images":["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop","https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop"],"helpful_count":24},
        {"id":2,"name":"คุณวิชัย ส.","avatar":"","rating":5,"verified":true,"trip_date":"ต.ค. 2024","comment":"เที่ยวกับครอบครัวครั้งแรก กลัวลูกจะเบื่อ แต่ไกด์ดูแลดีมาก มีกิจกรรมให้เด็กทำ ลูกชายติดใจบอลลูน อยากไปอีก Turkish Airlines บินสบาย ไม่เมา Recommend เลยครับ 👨‍👩‍👧‍👦","date":"2024-10-20","images":["https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=300&h=200&fit=crop"],"helpful_count":18},
        {"id":3,"name":"คุณนิตยา ก.","avatar":"","rating":5,"verified":true,"trip_date":"พ.ย. 2024","comment":"ไปกับเพื่อนๆ วัย 60+ ไกด์ดูแลดีมาก เดินช้าๆ ตามได้ ที่พักดี มีลิฟต์ อาหารปรับตามคนไทย Cotton Castle สวยมากจริงๆ ถ่ายรูปออกมาสวยทุกมุม แนะนำสำหรับคนสูงอายุเลยค่ะ 👵","date":"2024-11-02","images":[],"helpful_count":31},
        {"id":4,"name":"คุณธนา ร.","avatar":"","rating":5,"verified":true,"trip_date":"ก.ย. 2024","comment":"ไปฮันนีมูน เซอร์ไพรส์มากที่ได้อัปเกรดห้อง Honeymoon Suite ฟรี! ได้รูปสวยๆ เยอะมาก บอลลูนบินพอดี ไม่ฝนตก Grand Bazaar ของเยอะมาก ต่อราคาได้ เก็บตังไว้เยอะๆ นะครับ 💑","date":"2024-09-28","images":["https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=300&h=200&fit=crop","https://images.unsplash.com/photo-1551248429-40975aa4de74?w=300&h=200&fit=crop"],"helpful_count":45},
        {"id":5,"name":"คุณมาลี ว.","avatar":"","rating":4,"verified":true,"trip_date":"ก.ย. 2024","comment":"โดยรวมดีค่ะ แต่อากาศหนาวกว่าที่คิด เดือนกันยายนยังหนาว เตรียมเสื้อกันหนาวไปเยอะๆ ไกด์บอกแล้วแต่ไม่ฟัง 😅 บอลลูนสวยมากจริงๆ ตื่นตี 4 ก็คุ้ม Cave Hotel นอนสบาย มีฮีตเตอร์","date":"2024-09-25","images":[],"helpful_count":12},
        {"id":6,"name":"คุณสุนันท์ ต.","avatar":"","rating":5,"verified":true,"trip_date":"ส.ค. 2024","comment":"ไปกับคุณแม่วัย 75 ปี เห็นรีวิววา่เหมาะกับผู้สูงอายุ ลองจอง จริงๆ เลย! รถมี step สำหรับขึ้นลง ไกด์ช่วยถือกระเป๋า ที่พักใกล้ลิฟต์ อาหารเม็ดข้าวใหญ่ กินง่าย คุณแม่ชอบมาก ขอบคุณมากครับ 🙏","date":"2024-08-18","images":["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop"],"helpful_count":67}
      ],
      "licenses": {"tourism_license":"11/2564","airline_partners":["TK","QR"]}
    },
    'tour-jp-001': {
      "id": "tour-jp-001", 
      "title": "ทัวร์ญี่ปุ่น โตเกียว เกียวโต 5 วัน 4 คืน",
      "country": "Japan",
      "cities": ["Tokyo", "Kyoto"],
      "duration_days": 5,
      "nights": 4,
      "price_from": 45900,
      "currency": "THB",
      "badges": ["Hot", "ซากุระ"],
      "rating": 4.8,
      "reviews_count": 156,
      "hero_images": [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop"
      ],
      "gallery": [
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop"
      ],
      "highlights": [
        "ชมซากุราบาน",
        "วัดเก่าแก่เกียวโต", 
        "รถไฟความเร็วสูง",
        "ช้อปปิ้งชิบูย่า"
      ],
      "itinerary": [
        {"day":1,"title":"ออกเดินทางจากกรุงเทพฯ","details":["เช็คอิน 3 ชม.ก่อนเดินทาง","ออกเดินทางสู่โตเกียว","มื้ออาหารบนเครื่อง"]},
        {"day":2,"title":"โตเกียว - เมืองหลวง","details":["เยือนวัดเซ็นโซจิ","ตลาดอาซากุสะ","ชิบูย่าครอสซิ่ง","ช้อปปิ้งฮาราจุกุ"]},
        {"day":3,"title":"ฟูจิ - ภูเขาไฟศักดิ์สิทธิ์","details":["เดินทางสู่ภูเขาไฟฟูจิ","ชมทะเลสาบคาวากุจิโกะ","ขึ้นกระเช้าไฟฟ้า","ถ่าย������ับฟูจิซัง"]},
        {"day":4,"title":"เกียวโต - เมืองโบราณ","details":["เดินทางสู่เกียวโต","วัดคิโยมิสึ","ป่าไผ่อาราชิยาม่า","ย่านเกอิชา"]},
        {"day":5,"title":"เกียวโต - กลับกรุงเทพฯ","details":["ช้อปปิ้งของฝาก","เดินทางสู่สนามบิน","กลับถึงกรุงเทพฯ"]}
      ],
      "included": [
        "ตั๋วเครื่องบินไป-กลับ",
        "โรงแรม 4 ดาว",
        "อาหารครบทุกมื้อ",
        "รถรับส่ง VIP",
        "ไกด์ไทยประสบการณ์",
        "JR Pass 3 วัน"
      ],
      "excluded": [
        "ทิปไกด์และคนขับ", 
        "ค่าใช้จ่ายส่วนตัว",
        "ประกันเสริม",
        "วีซ่า (หากต้องการ)"
      ],
      "policies": {
        "deposit": 5000,
        "cancellation": "ยกเลิกฟรีภายใน 7 วันหลังจอง",
        "payment_options": ["บัตรเครดิต","โอนเงิน","ผ่อน 0% 6 เดือน"]
      },
      "departures": [
        {"id":"dep-jp-2025-03-15","date_range":"15–19 มี.ค. 2568","price":45900,"seats_left":8,"status":"available"},
        {"id":"dep-jp-2025-04-10","date_range":"10–14 เม.ย. 2568","price":48900,"seats_left":5,"status":"available"}
      ],
      "addons": [
        {"code":"INS15","label":"ประกันการเดินทาง","price":999},
        {"code":"ONSEN","label":"ออนเซนประสบการณ์","price":1500},
        {"code":"SEAT","label":"เลือกที่นั่งเครื่องบิน","price":800}
      ],
      "faqs": [
        {"q":"ซากุระบานหรือยัง?","a":"ช่วงมีนาคม-เมษายนเป็นช่วงซากุระบาน ขึ้นอยู่กับสภาพอากาศในแต่ละปี"},
        {"q":"อากาศหนาวมากไหม?","a":"ช่วงมีนาคม-เมษายนอุณหภูมิประมาณ 10-20 องศา ควรเตรียมเสื้อกันหนาว"},
        {"q":"มีอาหารเจ/ฮาลาลไหม?","a":"แจ้งล่วงหน้าได้ครับ ทางบริษัทจะจัดหาให้"}
      ],
      "related": [
        {"id":"tour-kr-002","title":"ทัวร์เกาหลีใต้ 6 วัน","price_from":38500,"thumb":"https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400&h=300&fit=crop"},
        {"id":"tour-tw-003","title":"ทัวร์ไต้หวัน 4 วัน","price_from":19900,"thumb":"https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=400&h=300&fit=crop"}
      ],
      "reviews": [
        {"id":1,"name":"คุณน้ำฝน","avatar":"","rating":5,"comment":"ซากุระสวยมาก ไกด์อธิบายดีมาก ประทับใจสุดๆ","date":"2024-03-20","images":["https://images.unsplash.com/photo-1522383225653-ed111181a951?w=300&h=200&fit=crop"]},
        {"id":2,"name":"คุณสมชาย","avatar":"","rating":5,"comment":"ทริปดีมาก วัดสวย อาหารอร่อย ที่พักดี แนะนำเลยครับ","date":"2024-04-15","images":[]},
        {"id":3,"name":"คุณมาลี","avatar":"","rating":4,"comment":"โดยรวมดีค่ะ แต่เวลาไม่ค่อยพอ อยากอยู่นานกว่านี้","date":"2024-04-22","images":[]}
      ],
      "licenses": {"tourism_license":"11/2564","airline_partners":["JAL","ANA"]}
    },
    'tour-kr-002': {
      "id": "tour-kr-002",
      "title": "ทัวร์เกาหลีใต้ โซล ปูซาน 6 วัน 5 คืน", 
      "country": "South Korea",
      "cities": ["Seoul", "Busan"],
      "duration_days": 6,
      "nights": 5,
      "price_from": 38500,
      "currency": "THB",
      "badges": ["ยอดนิยม"],
      "rating": 4.7,
      "reviews_count": 89,
      "hero_images": [
        "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop"
      ],
      "gallery": [
        "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1549693578-d683be217e58?w=800&h=600&fit=crop"
      ],
      "highlights": [
        "วัฒนธรรมเกาหลี",
        "ตลาดมยองดง",
        "ชิมอาหารท้องถิ่น",
        "K-Pop สไตล์"
      ],
      "departures": [
        {"id":"dep-kr-2025-05-01","date_range":"1–6 พ.ค. 2568","price":38500,"seats_left":15,"status":"available"}
      ]
    },
    'tour-tw-003': {
      "id": "tour-tw-003",
      "title": "ทัวร์ไต้หวัน ไทเป เกาสง 4 วัน 3 คืน",
      "country": "Taiwan", 
      "cities": ["Taipei", "Kaohsiung"],
      "duration_days": 4,
      "nights": 3,
      "price_from": 19900,
      "currency": "THB",
      "badges": ["ราคาดี"],
      "rating": 4.6,
      "reviews_count": 234,
      "hero_images": [
        "https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800&h=600&fit=crop"
      ],
      "highlights": [
        "ตลาดกลางคืน",
        "น้ำพุร้อน",
        "รถไฟความเร็วสูง",
        "ชิมติ่มซำ"
      ],
      "departures": [
        {"id":"dep-tw-2025-06-15","date_range":"15–18 มิ.ย. 2568","price":19900,"seats_left":3,"status":"low"}
      ]
    }
  }

  return tours[id as keyof typeof tours] || null
}

export default async function TourDetailPage(props: { 
  params: Promise<{ id: string }>, 
  searchParams: Promise<{ src?: string }>
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const tourId = params.id
  const src = searchParams.src
  
  // Get tour data on the server side
  let tourData = await getTourData(tourId)
  if (!tourData) {
    // Fallback to mock data if seed data not found
    tourData = getMockTourData(tourId)
  }
  
  if (!tourData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบข้อมูลทัวร์</h1>
          <Link href="/tour-search-24" className="text-blue-600 hover:underline">
            กลับไปหน้าค้นหาทัวร์
          </Link>
        </div>
      </div>
    )
  }

  return <TourDetailClient initialTour={tourData} src={src} />
}
