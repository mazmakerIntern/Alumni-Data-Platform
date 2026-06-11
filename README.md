# Alumni Data Platform — UI Prototype

ต้นแบบ UI (HTML/CSS/JS ล้วน ไม่มี build step) ครอบคลุมทุกโมดูลและทุก Role ตาม
**Proposal Alumni Data Platform VER.4** โดยใช้ Design System ที่กำหนด (shadcn/ui style · OKLch · Noto Sans Thai · brand แดง #e60023)

## วิธีเปิดดูผ่าน localhost

ต้องเสิร์ฟผ่าน HTTP (ไม่ใช่เปิดไฟล์ตรง ๆ) เพื่อให้ path ทำงานถูกต้อง

**Windows (ดับเบิลคลิก):** `start.bat`

**หรือสั่งเอง** จากโฟลเดอร์ `app/`:
```bash
python -m http.server 5173
```
แล้วเปิดเบราว์เซอร์ที่ **http://localhost:5173**

## โครงสร้าง

| ส่วน | Role | ไฟล์ | ครอบคลุม |
|------|------|------|----------|
| **หน้าหลัก (Hub)** | — | `index.html` | ทางเข้าทั้ง 3 แพลตฟอร์ม |
| **Admin Web Portal** | Administrator | `admin/index.html` | Login · Dashboard · จัดการศิษย์เก่า (เพิ่ม/นำเข้า/แก้ไข/ลบ/ค้นหา/อนุมัติ/อัปเดตสถานะ) · Broadcast Message · Settings (ข้อมูลพื้นฐาน/LINE API/รหัสผ่าน) |
| **LINE LIFF** | Alumni / Teacher | `liff/index.html` | Welcome & Consent (PDPA) · เชื่อมบัญชี LINE · Profile Form (ลงทะเบียน/อัปเดต) · บันทึกสำเร็จ |
| **Web Information** | สาธารณะ | `web/index.html` | หน้าแรก · เกี่ยวกับเรา · ข่าว/กิจกรรม · สมาชิกศิษย์เก่า · ติดต่อเรา |

## ไฟล์ที่ใช้ร่วมกัน
- `assets/design-system.css` — design tokens + components (จาก design-system.html)
- `assets/app.css` — layout (hub, admin shell, web, LIFF phone)
- `assets/app.js` — mock data ศิษย์เก่า + helper (toast, icons, badges) + SITE/NEWS store (localStorage)

> หมายเหตุ: เป็น UI prototype ใช้ mock data ในฝั่ง client (เก็บใน localStorage ของเบราว์เซอร์) ปุ่มบันทึก/ส่ง เป็นการจำลอง (toast) ยังไม่ได้ต่อ backend/LINE API จริง

---

## Deploy ขึ้น Vercel ผ่าน GitHub

เป็น static site ล้วน → **ไม่ต้อง build** (Framework Preset = Other / Output = root)

### 1) Push ขึ้น GitHub (โฟลเดอร์นี้คือ repo root)
```bash
# ทำครั้งแรกเท่านั้น (รันในโฟลเดอร์ app/)
git init
git add .
git commit -m "Alumni Data Platform UI prototype"
git branch -M main

# สร้าง repo เปล่าบน github.com ก่อน (อย่าติ๊ก add README) แล้วนำ URL มาใส่
git remote add origin https://github.com/<USERNAME>/<REPO>.git
git push -u origin main
```

### 2) Import เข้า Vercel
1. ไปที่ https://vercel.com → **Add New… → Project**
2. **Import** repo จาก GitHub ที่เพิ่ง push
3. ตั้งค่า:
   - **Framework Preset:** `Other`
   - **Build Command:** เว้นว่าง
   - **Output Directory:** เว้นว่าง (ใช้ราก)
   - **Root Directory:** `./` (ถ้า repo คือโฟลเดอร์ app นี้)
4. กด **Deploy** → ได้ URL เช่น `https://<repo>.vercel.app`

> ครั้งต่อไปแค่ `git push` → Vercel จะ auto-deploy ให้เอง

### ทางลัด: Vercel CLI (ไม่ต้องผ่าน GitHub ก็ได้)
```bash
vercel        # ครั้งแรก: login + ตอบ default ทั้งหมด
vercel --prod # deploy production
```
