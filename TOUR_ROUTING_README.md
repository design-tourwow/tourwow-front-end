# Tour Routing System for /tour-search-22

## Overview
ระบบ routing สำหรับแสดงรายละเอียดทัวร์จากหน้า `/tour-search-22` พร้อมข้อมูล seed data ครบถ้วนสำหรับทุกการ์ดทัวร์

## Files Created

### 1. Scripts
- `scripts/seed-tours.js` - Script สำหรับสร้าง seed data จาก tour cards ในหน้า tour-search-22

### 2. Dynamic Route
- `src/app/tour-search-22/[id]/page.tsx` - หน้าแสดงรายละเอียดทัวร์

### 3. Data Files
- `data/tours/index.json` - รายชื่อทัวร์ทั้งหมด (สำหรับ build static pages)
- `data/tours/{id}.json` - ข้อมูลรายละเอียดของแต่ละทัวร์
- `public/data/tours/` - Copy ของไฟล์ข้อมูลสำหรับ client-side fetch

## Usage

### วิธีรัน Seed Script
```bash
# รันสคริปต์เพื่อสร้างข้อมูลทัวร์
node scripts/seed-tours.js

# Copy ข้อมูลไปยัง public directory สำหรับ client access
cp -r data public/
```

### วิธีการทำงาน
1. Script จะสแกน tour data จากหน้า `/tour-search-22` 
2. สร้างข้อมูล seed แบบครบถ้วนสำหรับแต่ละทัวร์:
   - ข้อมูลพื้นฐาน (ชื่อ, ราคา, rating, รูปภาพ)
   - รอบการเดินทาง (departures) - 8 รอบล่วงหน้า 12 เดือน
   - บริการเสริม (addons)
   - FAQ มาตรฐาน
   - รายการทัวร์ (itinerary) ตามจำนวนวัน
   - ทัวร์ที่เกี่ยวข้อง (related tours)

### URL Structure
- หน้าค้นหา: `/tour-search-22`
- หน้ารายละเอียด: `/tour-search-22/{tour-id}?src=search24`

### Tour IDs ที่สร้างแล้ว
- `tour-jp-001` - ทัวร์ญี่ปุ่น โตเกียว เกียวโต
- `tour-kr-002` - ทัวร์เกาหลีใต้ โซล ปูซาน  
- `tour-tw-003` - ทัวร์ไต้หวัน ไทเป เกาสง
- `tour-sg-004` - ทัวร์สิงคโปร์ มาเลเซีย
- `tour-vn-005` - ทัวร์เวียดนาม ฮานอย โฮจิมินห์
- `tour-eu-006` - ทัวร์ยุโรป อิตาลี สวิส ฝรั่งเศส
- `tour-dubai-007` - ทัวร์ดูไบ อาบูดาบี
- `tour-aus-008` - ทัวร์ออสเตรเลีย ซิดนีย์ เมลเบิร์น
- `tour-turkey-009` - ทัวร์ตุรกี อิสตันบูล คัปปาโดเชีย
- `tour-egypt-010` - ทัวร์อียิปต์ ไคโร ลักซอร์
- `tour-india-011` - ทัวร์อินเดีย เดลี อักรา
- `tour-us-012` - ทัวร์อเมริกา นิวยอร์ก ลาสเวกัส
- `tour-russia-013` - ทัวร์รัสเซีย มอสโก ซางต์ปีเตอร์สเบิร์ก
- `tour-nz-014` - ทัวร์นิวซีแลนด์ เกาะเหนือ เกาะใต้
- `tour-spain-015` - ทัวร์สเปน มาดริด บาร์เซโลนา
- `tour-canada-016` - ทัวร์แคนาดา โตรอนโต้ แวนคูเวอร์
- `tour-iceland-017` - ทัวร์ไอซ์แลนด์ เรคยาวิก
- `tour-morocco-018` - ทัวร์โมร็อกโก มาราเกช คาซาบลังกา
- `tour-peru-019` - ทัวร์เปรู มาชูปิชชู คูสโก
- `tour-greece-020` - ทัวร์กรีซ เอเธนส์ ซานโตรินี

## Features Implemented

### 1. Button Linking
- ปุ่ม "จองด่วน" และ "จองทัวร์นี้" ในหน้า `/tour-search-22` จะลิงก์ไปยัง `/tour-search-22/{id}?src=search24`
- Parameter `src=search24` ใช้สำหรับ analytics tracking

### 2. Tour Detail Page
- แสดงข้อมูลครบถ้วนของทัวร์
- เลือกรอบการเดินทางได้
- เลือกบริการเสริมได้
- Modal สำหรับยืนยันการจอง
- FAQ แบบ expandable
- Related tours

### 3. Data Structure
```javascript
{
  id: string,
  slug: string,
  title: string,
  country: string,
  cities: string[],
  duration_days: number,
  nights: number,
  price_from: number,
  currency: "THB",
  badges: string[],
  rating: number,
  reviews_count: number,
  hero_images: string[],
  highlights: string[],
  itinerary: ItineraryDay[],
  gallery: string[],
  included: string[],
  excluded: string[],
  policies: {
    deposit: number,
    cancellation: string,
    payment_options: string[]
  },
  departures: Departure[],
  addons: Addon[],
  faqs: FAQ[],
  related: RelatedTour[],
  licenses: {
    tourism_license: string,
    airline_partners: string[]
  },
  seo: {
    title: string,
    description: string,
    og_image: string
  }
}
```

## Testing

### วิธีทดสอบ
1. เปิดหน้า http://localhost:4000/tour-search-22
2. คลิกปุ่ม "จองด่วน" หรือ "จองทัวร์นี้" ในการ์ดใดก็ได้
3. ตรวจสอบว่าเปิดหน้ารายละเอียดทัวร์ได้ถูกต้อง
4. URL จะมี format: `/tour-search-22/{id}?src=search24`

### การ Debug
- ตรวจสอบว่าไฟล์ข้อมูลอยู่ในโฟลเดอร์ `public/data/tours/`
- เช็ค Network tab ในเบราว์เซอร์ว่า fetch ข้อมูลได้หรือไม่
- ดู console log สำหรับ warning หาก access โดยตรงไม่ผ่าน search page

## Maintenance

### เพื่อเพิ่มทัวร์ใหม่
1. เพิ่มข้อมูลทัวร์ใน `baseTourData` array ในไฟล์ `scripts/seed-tours.js`
2. รัน `node scripts/seed-tours.js`
3. รัน `cp -r data public/`

### เพื่อแก้ไขข้อมูลทัวร์
1. แก้ไขไฟล์ `data/tours/{id}.json` ตรงๆ
2. หรือแก้ไข seed script และ regenerate

---

✅ **Status**: ทำงานได้ครบถ้วนแล้ว - ทุกการ์ดทัวร์ในหน้า /tour-search-22 สามารถคลิกเข้าไปดูรายละเอียดได้

🚀 **Next Steps**: ระบบพร้อมใช้งาน สามารถ integrate กับ booking system จริงได้ในอนาคต