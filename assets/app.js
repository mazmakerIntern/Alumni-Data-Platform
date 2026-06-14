/* ===================================================================
   Alumni Data Platform — shared JS: mock data + UI helpers
   =================================================================== */

/* ---- Mock reference data ---- */
const FACULTIES = ['คณะวิศวกรรมศาสตร์', 'คณะบริหารธุรกิจ', 'คณะวิทยาศาสตร์', 'คณะนิเทศศาสตร์', 'คณะครุศาสตร์', 'คณะนิติศาสตร์'];
const MAJORS = {
  'คณะวิศวกรรมศาสตร์': ['วิศวกรรมคอมพิวเตอร์', 'วิศวกรรมโยธา', 'วิศวกรรมไฟฟ้า'],
  'คณะบริหารธุรกิจ': ['การตลาด', 'การเงิน', 'การจัดการ'],
  'คณะวิทยาศาสตร์': ['วิทยาการคอมพิวเตอร์', 'เคมี', 'ชีววิทยา'],
  'คณะนิเทศศาสตร์': ['วารสารศาสตร์', 'โฆษณา'],
  'คณะครุศาสตร์': ['คณิตศาสตร์ศึกษา', 'ภาษาอังกฤษศึกษา'],
  'คณะนิติศาสตร์': ['นิติศาสตร์']
};
// status: alumni | member | teacher  (ศิษย์เก่าทั่วไป / ศิษย์เก่าสมาชิกสมาคม / ครูสมาชิกสมาคม)
const STATUS_LABEL = { alumni: 'ศิษย์เก่าทั่วไป', member: 'สมาชิกสมาคม', teacher: 'ครู (สมาชิก)' };
const STATUS_BADGE = { alumni: 'badge-ghost', member: 'badge-success', teacher: 'badge-info' };
const LIFE_LABEL = { alive: 'มีชีวิต', deceased: 'เสียชีวิต' };

const FIRST = ['สมชาย', 'สุดารัตน์', 'อนุชา', 'พิมพ์ชนก', 'ธนกร', 'ณัฐริกา', 'วีระพงษ์', 'กมลวรรณ', 'ศุภชัย', 'จิราพร', 'ปกรณ์', 'เบญจวรรณ', 'ธีรเดช', 'อาทิตยา', 'นพดล', 'รุ่งทิวา'];
const LAST = ['ใจดี', 'รักเรียน', 'ศรีสุข', 'วัฒนกุล', 'ทองคำ', 'แสงเดือน', 'พงษ์ไพบูลย์', 'มั่นคง', 'เจริญสุข', 'บุญมา', 'อภิรักษ์', 'สินสมบัติ'];
const COMPANIES = ['บมจ. ปตท.', 'SCB', 'ธนาคารกสิกรไทย', 'Agoda', 'LINE Thailand', 'CP All', 'การไฟฟ้าฯ', 'Lazada', 'True Digital', 'โรงเรียนสาธิตฯ', '—'];
const POSITIONS = ['วิศวกรอาวุโส', 'นักการตลาด', 'ผู้จัดการฝ่าย', 'Software Engineer', 'นักวิเคราะห์', 'ครูชำนาญการ', 'CEO', 'นักบัญชี', 'Data Scientist'];

function pick(arr, i) { return arr[i % arr.length]; }

/* Deterministic mock alumni generator (so list is stable) */
function buildAlumni(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const fac = pick(FACULTIES, i); // even spread across all faculties
    const majors = MAJORS[fac];
    const year = 2545 + (i * 7) % 22; // พ.ศ. ที่จบ (2545–2566 ไม่เกินปีปัจจุบัน)
    const statusRoll = i % 5;
    const status = statusRoll === 0 ? 'teacher' : (statusRoll < 3 ? 'member' : 'alumni');
    const linked = i % 3 !== 2;
    out.push({
      id: 'A' + String(1000 + i),
      photo: 1 + (i * 13) % 70, // 13 is coprime with 70 → unique photos for first 70 records
      first: pick(FIRST, i),
      last: pick(LAST, i * 2 + 3),
      faculty: fac,
      major: pick(majors, i),
      year,
      company: pick(COMPANIES, i + 2),
      position: pick(POSITIONS, i + 1),
      status,
      life: i % 17 === 16 ? 'deceased' : 'alive',
      linked,
      phone: '08' + String(10000000 + ((i + 7) * 1234567) % 89999999),
      email: 'alumni' + (1000 + i) + '@mail.example.ac.th',
      pending: i % 11 === 4, // awaiting approval
      joined: '25' + (67 + i % 3) + '-' + String(1 + i % 12).padStart(2, '0') + '-' + String(1 + i % 27).padStart(2, '0'), // เข้าระบบช่วง 2567–2569 (หลังจบ)
      updated: '2569-' + String(1 + (i * 5) % 12).padStart(2, '0') + '-' + String(1 + (i * 3) % 28).padStart(2, '0'), // อัปเดตล่าสุด (พ.ศ.)
    });
  }
  return out;
}

const ALUMNI = buildAlumni(48);
// เพิ่มโปรไฟล์ที่ตั้งใจให้ "อาจซ้ำ" (ชื่อ+รุ่น+คณะ ตรงกับ record เดิม) เพื่อสาธิต Possible Duplicate Detection
[2, 10].forEach((src, k) => {
  const o = ALUMNI[src];
  ALUMNI.push(Object.assign({}, o, {
    id: 'A' + (2000 + k), photo: 1 + ((50 + k) * 13) % 70,
    email: 'alum' + (2000 + k) + '@gmail.com',
    phone: '09' + String(10000000 + ((k + 2) * 7654321) % 89999999), linked: false, major: o.major,
    updated: '2569-06-' + String(12 - k).padStart(2, '0'), // ตั้งวันอัปเดตให้ต่างจากใบเดิม เพื่อสาธิต "ข้อมูลล่าสุด"
  }));
});

/* ---- ชุดข้อมูลข่าว/กิจกรรม (ใช้ร่วมกันทั้งเว็บไซต์ และ LINE LIFF) ----
   เก็บใน localStorage เพื่อให้ Admin (CMS) แก้แล้ว เว็บ + LIFF ดึงข้อมูลชุดเดียวกัน (Single Source)
   isEvent: เป็นกิจกรรมที่ลงทะเบียนเข้าร่วมได้ | broadcast: ส่งถึงสมาชิกผ่าน LINE
   body: เนื้อหาเต็ม (อาเรย์ย่อหน้า) | dateShort: ['15','ธ.ค.'] ใช้แสดงบนการ์ดกิจกรรม          */
const DEFAULT_NEWS = [
  {
    id: 'n1', cat: 'กิจกรรม', img: 1011, date: '19 ธ.ค. 2569', dateShort: ['19', 'ธ.ค.'],
    isEvent: true, broadcast: true,
    title: 'งานคืนสู่เหย้า ประจำปี 2569 “รวมใจ คืนถิ่น”',
    summary: 'ขอเชิญศิษย์เก่าทุกรุ่นร่วมงานคืนสู่เหย้า พบปะสังสรรค์ พร้อมมินิคอนเสิร์ตและของที่ระลึกสุดพิเศษ',
    place: 'หอประชุมใหญ่ มหาวิทยาลัยรัตนบุรี', time: '17:00 – 21:00 น.', fee: 'ไม่มีค่าใช้จ่าย (ลงทะเบียนล่วงหน้า)',
    organizer: 'ฝ่ายกิจกรรมสมาคมศิษย์เก่า',
    body: [
      'สมาคมศิษย์เก่าขอเชิญศิษย์เก่าทุกคณะ ทุกรุ่นการศึกษา กลับมาพบปะสังสรรค์ในงานคืนสู่เหย้าประจำปี 2569 ภายใต้แนวคิด “รวมใจ คืนถิ่น” เพื่อรำลึกความหลังและกระชับความสัมพันธ์ระหว่างรุ่นพี่รุ่นน้อง',
      'ภายในงานพบกับซุ้มอาหารจากร้านดังของศิษย์เก่า มินิคอนเสิร์ตจากวงดนตรีศิษย์เก่า การมอบรางวัลศิษย์เก่าดีเด่น และกิจกรรมจับสลากของรางวัลมูลค่ารวมกว่า 100,000 บาท',
      'ผู้สนใจสามารถลงทะเบียนล่วงหน้าผ่าน LINE Official ของสมาคม เพื่อรับของที่ระลึกพิเศษและสำรองที่นั่ง (จำนวนจำกัด 500 ท่าน)'
    ],
    agenda: ['17:00 ลงทะเบียน & ถ่ายรูปรุ่น', '18:00 พิธีเปิด & กล่าวต้อนรับโดยนายกสมาคม', '19:00 มอบรางวัลศิษย์เก่าดีเด่น', '20:00 มินิคอนเสิร์ต & จับสลากรางวัล']
  },
  {
    id: 'n2', cat: 'โครงการ', img: 1024, date: '2 มิ.ย. 2569', dateShort: ['02', 'มิ.ย.'],
    isEvent: false, broadcast: true,
    title: 'เปิดรับบริจาคกองทุนการศึกษา ปีการศึกษา 2569',
    summary: 'ร่วมสมทบทุนการศึกษาให้นักศึกษารุ่นน้องที่เรียนดีแต่ขาดแคลนทุนทรัพย์ เป้าหมาย 50 ทุน',
    place: 'สำนักงานสมาคมศิษย์เก่า', time: 'รับบริจาคถึง 31 ส.ค. 2569', fee: 'ร่วมบริจาคได้ตามกำลังศรัทธา',
    organizer: 'คณะกรรมการกองทุนการศึกษา',
    body: [
      'สมาคมศิษย์เก่าเปิดรับบริจาคเข้ากองทุนการศึกษาประจำปี 2569 โดยมีเป้าหมายมอบทุนการศึกษาจำนวน 50 ทุน ทุนละ 10,000 บาท ให้แก่นักศึกษาปัจจุบันที่มีผลการเรียนดีแต่ขาดแคลนทุนทรัพย์',
      'ทุกยอดบริจาคสามารถนำไปลดหย่อนภาษีได้ และสมาคมจะรายงานความคืบหน้าการมอบทุนให้ผู้บริจาคทราบอย่างโปร่งใส',
      'ศิษย์เก่าที่ประสงค์ร่วมบริจาค สามารถโอนผ่านบัญชีกองทุน หรือสอบถามรายละเอียดเพิ่มเติมผ่าน LINE Official ของสมาคม'
    ],
    agenda: null
  },
  {
    id: 'n3', cat: 'ข่าวสาร', img: 1033, date: '12 พ.ค. 2569', dateShort: ['12', 'พ.ค.'],
    isEvent: true, broadcast: true,
    title: 'ขอเชิญประชุมใหญ่สามัญประจำปี 2569',
    summary: 'เชิญสมาชิกสมาคมเข้าร่วมประชุมใหญ่ รับทราบผลการดำเนินงานและร่วมเลือกตั้งคณะกรรมการชุดใหม่',
    place: 'ห้องประชุมแกรนด์ ชั้น 3 อาคารศิษย์เก่าสัมพันธ์', time: '09:00 – 12:00 น.', fee: 'เฉพาะสมาชิกสมาคม',
    organizer: 'เลขาธิการสมาคมศิษย์เก่า',
    body: [
      'ตามข้อบังคับสมาคม ขอเชิญสมาชิกสมาคมศิษย์เก่าทุกท่านเข้าร่วมการประชุมใหญ่สามัญประจำปี 2569 เพื่อรับทราบรายงานผลการดำเนินงาน งบการเงิน และร่วมพิจารณาวาระสำคัญของสมาคม',
      'ในการประชุมครั้งนี้จะมีการเลือกตั้งคณะกรรมการบริหารชุดใหม่ วาระปี 2569–2571 จึงขอเชิญสมาชิกร่วมใช้สิทธิ์ออกเสียงโดยพร้อมเพรียงกัน',
      'สมาชิกที่ไม่สามารถเข้าร่วมด้วยตนเอง สามารถมอบฉันทะตามแบบฟอร์มที่สมาคมกำหนดได้'
    ],
    agenda: ['09:00 ลงทะเบียน & ตรวจสอบองค์ประชุม', '09:30 รายงานผลการดำเนินงานประจำปี', '10:30 พิจารณางบการเงิน', '11:00 เลือกตั้งคณะกรรมการชุดใหม่']
  },
  {
    id: 'n4', cat: 'กิจกรรม', img: 1041, date: '26 ก.ค. 2569', dateShort: ['26', 'ก.ค.'],
    isEvent: true, broadcast: false,
    title: 'สัมมนาเครือข่ายธุรกิจศิษย์เก่า',
    summary: 'พบปะผู้ประกอบการศิษย์เก่า แลกเปลี่ยนโอกาสทางธุรกิจ พร้อมเวที Pitching สำหรับสตาร์ทอัพรุ่นใหม่',
    place: 'อาคารนวัตกรรม ชั้น 9', time: '18:30 – 21:30 น.', fee: 'สมาชิก 200 บาท / บุคคลทั่วไป 500 บาท',
    organizer: 'ชมรมผู้ประกอบการศิษย์เก่า',
    body: [
      'ชมรมผู้ประกอบการศิษย์เก่าจัดงาน Business Networking Night เพื่อเปิดโอกาสให้ศิษย์เก่าที่เป็นเจ้าของธุรกิจและผู้บริหารได้พบปะ แลกเปลี่ยนประสบการณ์ และต่อยอดความร่วมมือทางธุรกิจ',
      'ไฮไลต์ของงานคือเวที Pitching ให้สตาร์ทอัพศิษย์เก่ารุ่นใหม่นำเสนอไอเดียต่อนักลงทุน พร้อมช่วงจับคู่ธุรกิจ (Business Matching) แบบเป็นกันเอง'
    ],
    agenda: ['18:30 Welcome Reception', '19:00 Keynote: เทรนด์ธุรกิจ 2569', '20:00 Startup Pitching', '20:45 Business Matching']
  },
  {
    id: 'n5', cat: 'ข่าวสาร', img: 1052, date: '20 เม.ย. 2569', dateShort: ['20', 'เม.ย.'],
    isEvent: false, broadcast: false,
    title: 'ประกาศรายชื่อศิษย์เก่าดีเด่น ประจำปี 2569',
    summary: 'สมาคมประกาศเกียรติคุณศิษย์เก่าดีเด่นหลายท่าน ผู้สร้างชื่อเสียงและคุณประโยชน์ต่อสังคม',
    place: '—', time: '—', fee: '—',
    organizer: 'คณะกรรมการสรรหาศิษย์เก่าดีเด่น',
    body: [
      'สมาคมศิษย์เก่าขอแสดงความยินดีกับศิษย์เก่าดีเด่นประจำปี 2569 หลายท่าน ซึ่งได้รับการคัดเลือกจากผลงานอันโดดเด่นใน 4 สาขา ได้แก่ ความสำเร็จในวิชาชีพ การบริการสังคม นวัตกรรม และการสนับสนุนสถาบัน',
      'ศิษย์เก่าดีเด่นทุกท่านจะเข้ารับโล่เกียรติคุณในงานคืนสู่เหย้าประจำปี และจะได้รับการบันทึกเรื่องราวลงในหอเกียรติยศศิษย์เก่าเพื่อเป็นแรงบันดาลใจแก่รุ่นน้อง'
    ],
    agenda: null
  },
  {
    id: 'n6', cat: 'กิจกรรม', img: 1062, date: '8 ก.พ. 2569', dateShort: ['08', 'ก.พ.'],
    isEvent: true, broadcast: true,
    title: 'Alumni Run 2569 เดิน-วิ่งการกุศล',
    summary: 'ร่วมเดิน-วิ่งการกุศลระดมทุนพัฒนาห้องสมุดและกองทุนการศึกษา ระยะ Fun Run 5 กม. และ Mini Marathon 10 กม.',
    place: 'สนามกีฬากลาง มหาวิทยาลัยรัตนบุรี', time: 'เริ่ม 05:30 น.', fee: 'Fun Run 350 บาท / Mini 500 บาท',
    organizer: 'ชมรมกีฬาศิษย์เก่า',
    body: [
      'กลับมาอีกครั้งกับงานเดิน-วิ่งการกุศล Alumni Run 2569 ที่รวมศิษย์เก่า นักศึกษา และครอบครัว มาออกกำลังกายร่วมกันท่ามกลางบรรยากาศภายในมหาวิทยาลัย',
      'รายได้หลังหักค่าใช้จ่ายทั้งหมดสมทบเข้ากองทุนพัฒนาห้องสมุดและกองทุนการศึกษา ผู้สมัครทุกท่านจะได้รับเสื้อวิ่งและเหรียญที่ระลึกดีไซน์พิเศษ'
    ],
    agenda: ['05:30 ปล่อยตัว Mini Marathon 10 กม.', '06:00 ปล่อยตัว Fun Run 5 กม.', '07:30 มอบรางวัล & กิจกรรมหลังวิ่ง']
  },
  {
    id: 'n7', cat: 'โครงการ', img: 1074, date: '15 มี.ค. 2569', dateShort: ['15', 'มี.ค.'],
    isEvent: false, broadcast: false,
    title: 'โครงการ Mentorship รุ่นพี่สู่รุ่นน้อง',
    summary: 'เปิดรับสมัครศิษย์เก่าเป็นพี่เลี้ยง (Mentor) ให้คำปรึกษาด้านอาชีพแก่นักศึกษาปัจจุบัน',
    place: 'รูปแบบออนไลน์ & พบปะรายเดือน', time: 'ระยะเวลา 6 เดือน', fee: 'ไม่มีค่าใช้จ่าย',
    organizer: 'ฝ่ายพัฒนาศักยภาพนักศึกษา',
    body: [
      'โครงการ Mentorship เป็นสะพานเชื่อมระหว่างศิษย์เก่าผู้มีประสบการณ์กับนักศึกษาปัจจุบัน เพื่อให้คำแนะนำด้านการวางแผนอาชีพ การพัฒนาทักษะ และการเตรียมตัวสู่โลกการทำงาน',
      'ศิษย์เก่าที่สมัครเป็น Mentor จะได้รับการจับคู่กับนักศึกษาตามสายอาชีพ และนัดพบปะให้คำปรึกษาเดือนละครั้งตลอดระยะเวลา 6 เดือน'
    ],
    agenda: null
  },
];

/* ---- Shared persistent store (localStorage) — Single Source of Truth ----
   Admin (CMS / Broadcast) เขียน → เว็บ + LIFF อ่านจากที่เดียวกัน                       */
const NEWS_STORE_KEY = 'adp_news_v5';
function loadNews() {
  try { const s = localStorage.getItem(NEWS_STORE_KEY); if (s) { const a = JSON.parse(s); if (Array.isArray(a)) return a; } } catch (e) {}
  return null;
}
function saveNews() { try { localStorage.setItem(NEWS_STORE_KEY, JSON.stringify(NEWS_ITEMS)); return true; } catch (e) { return false; } }
function resetNews() { try { localStorage.removeItem(NEWS_STORE_KEY); } catch (e) {} NEWS_ITEMS.length = 0; DEFAULT_NEWS.forEach(x => NEWS_ITEMS.push(JSON.parse(JSON.stringify(x)))); }
// live array used everywhere (seeded from store, else from defaults)
const NEWS_ITEMS = loadNews() || DEFAULT_NEWS.map(x => JSON.parse(JSON.stringify(x)));

/* ---- SITE content store — เนื้อหาเว็บไซต์ (จัดการผ่าน Admin CMS) ----
   hero, สารนายกสมาคม, แกลเลอรีภาพ, วิดีโอ, สิทธิพิเศษ, ศิษย์เก่าดีเด่น           */
const DEFAULT_SITE = {
  hero: {
    title: 'ศูนย์กลางของชุมชน\nศิษย์เก่า / ครู',
    subtitle: 'เชื่อมความสัมพันธ์ตลอดชีวิต รับข่าวสาร และร่วมเป็นส่วนหนึ่งของเครือข่ายศิษย์เก่า',
    image: 99,
  },
  president: {
    name: 'ดร. ประสิทธิ์ มั่นคง', role: 'นายกสมาคมศิษย์เก่า', photo: 13,
    message: 'ในนามของสมาคมศิษย์เก่า ผมขอต้อนรับศิษย์เก่าทุกท่านกลับสู่บ้านหลังเดิมของเรา สมาคมมุ่งมั่นเป็นศูนย์กลางที่เชื่อมโยงพวกเราทุกรุ่นเข้าด้วยกัน ส่งเสริมความสัมพันธ์ แลกเปลี่ยนโอกาส และร่วมกันตอบแทนสถาบันอันเป็นที่รักของเรา หวังเป็นอย่างยิ่งว่าจะได้พบทุกท่านในกิจกรรมต่าง ๆ ของสมาคมครับ',
  },
  videos: [
    { id: 'v1', title: 'ไฮไลต์งานคืนสู่เหย้า 2565', thumb: 201, duration: '3:42', url: '#' },
    { id: 'v2', title: 'สัมภาษณ์ศิษย์เก่าดีเด่น', thumb: 202, duration: '5:10', url: '#' },
    { id: 'v3', title: 'แนะนำสมาคมศิษย์เก่า', thumb: 203, duration: '2:05', url: '#' },
  ],
  gallery: [
    { id: 'g1', img: 211, caption: 'งานคืนสู่เหย้า' }, { id: 'g2', img: 212, caption: 'มอบทุนการศึกษา' },
    { id: 'g3', img: 213, caption: 'สัมมนาเครือข่ายธุรกิจ' }, { id: 'g4', img: 214, caption: 'กิจกรรมจิตอาสา' },
    { id: 'g5', img: 215, caption: 'Alumni Run' }, { id: 'g6', img: 216, caption: 'ประชุมใหญ่สามัญ' },
    { id: 'g7', img: 217, caption: 'พิธีไหว้ครู' }, { id: 'g8', img: 218, caption: 'งานเลี้ยงรุ่น' },
  ],
  outstanding: [
    { id: 'o1', name: 'คุณวีรชัย พัฒนกุล', photo: 50, field: 'ผู้ประกอบการดีเด่น', desc: 'ผู้ก่อตั้งสตาร์ทอัพระดับยูนิคอร์น และกลับมาเป็นที่ปรึกษาให้รุ่นน้อง' },
    { id: 'o2', name: 'ดร. สุนิสา ทองแท้', photo: 47, field: 'นักวิจัยดีเด่น', desc: 'ได้รับรางวัลวิจัยระดับนานาชาติด้านพลังงานสะอาด' },
    { id: 'o3', name: 'คุณอรรถพล ใจกว้าง', photo: 33, field: 'บริการสังคมดีเด่น', desc: 'อุทิศตนช่วยเหลือชุมชนและก่อตั้งมูลนิธิเพื่อการศึกษา' },
  ],
  benefits: [
    { id: 'b1', icon: 'bell', title: 'ข่าวสารแบบเฉพาะเจาะจง', desc: 'รับข่าวสาร ประชาสัมพันธ์ และกิจกรรมผ่าน Broadcast ใน LINE แบบเจาะจงตามรุ่น ปีที่จบ หรือคณะ ไม่พลาดข่าวที่เกี่ยวกับคุณ' },
    { id: 'b2', icon: 'users', title: 'เข้าถึงฐานข้อมูลศิษย์เก่า/ครู', desc: 'ดูรายชื่อศิษย์เก่าแยกตามรุ่น ประวัติ และข้อมูลติดต่อเพื่อนร่วมรุ่นหรือครู จากฐานข้อมูลส่วนกลาง' },
    { id: 'b3', icon: 'ticket', title: 'บัตรสมาชิก & E-Ticket', desc: 'มี Member ID และ QR Code ส่วนตัว ใช้เป็นบัตรสมาชิกหรือตั๋วเข้างานผ่านมือถือ ไม่ต้องพกบัตรกระดาษ' },
    { id: 'b4', icon: 'edit', title: 'จัดการโปรไฟล์ด้วยตนเอง', desc: 'เข้าถึงและแก้ไขข้อมูลส่วนตัว (เช่น เบอร์โทร) ผ่าน LINE LIFF ได้ตลอดเวลา ให้ข้อมูลถูกต้องเป็นปัจจุบัน' },
    { id: 'b5', icon: 'star', title: 'แคมเปญพิเศษ & รางวัล', desc: 'ร่วมแคมเปญตรวจสอบ/อัปเดตข้อมูล (Verify) พร้อมลุ้นรับรางวัลสำหรับสมาชิกที่อัปเดตข้อมูลเป็นปัจจุบัน' },
    { id: 'b6', icon: 'cal', title: 'ลงทะเบียนเข้างานสะดวก', desc: 'จอง/ซื้อบัตรกิจกรรมได้ง่าย ระบบจัดกลุ่มที่นั่งตามรุ่นอัตโนมัติ ให้ได้นั่งกับเพื่อนร่วมรุ่น' },
  ],
};
const SITE_STORE_KEY = 'adp_site_v2';
function loadSite() {
  try { const s = localStorage.getItem(SITE_STORE_KEY); if (s) { const o = JSON.parse(s); if (o && typeof o === 'object') return o; } } catch (e) {}
  return null;
}
function saveSite() { try { localStorage.setItem(SITE_STORE_KEY, JSON.stringify(SITE)); return true; } catch (e) { return false; } }
function resetSite() { try { localStorage.removeItem(SITE_STORE_KEY); } catch (e) {} const d = JSON.parse(JSON.stringify(DEFAULT_SITE)); Object.keys(SITE).forEach(k => delete SITE[k]); Object.assign(SITE, d); }
const SITE = loadSite() || JSON.parse(JSON.stringify(DEFAULT_SITE));

/* วันที่ไทยปัจจุบัน เช่น "11 มิ.ย. 2569" */
function todayTH() {
  const d = new Date();
  const m = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
  return d.getDate() + ' ' + m[d.getMonth()] + ' ' + (d.getFullYear() + 543);
}

function catBadge(cat) {
  return cat === 'กิจกรรม' ? 'badge-warning' : cat === 'ข่าวสาร' ? 'badge-info' : cat === 'โครงการ' ? 'badge-success' : 'badge-secondary';
}

/* ════════════════════════════════════════════════════════════
   Phase 1+2 data models (Payment & Membership, Event & Ticketing)
   ภาพ mock ระดับ session — ตรงตาม Proposal (ฉบับขยาย)
   ════════════════════════════════════════════════════════════ */

/* ---- Payment Queue / Membership (Phase 1) ----
   verify: matched (VerifySlip ตรง) | mismatch (ยอดไม่ตรง) | error (API ล่ม → ตรวจมือ)
   status: pending | approved | rejected                                            */
const MEMBER_FEE = 300; // ค่าสมาชิกที่ต้องชำระ (บาท)
const PAYMENTS = [
  { id:'PM01', first:'ธนกร', last:'สินสมบัติ', photo:1+(4*13)%70, alumniId:'A1004', faculty:'คณะครุศาสตร์', year:2554,
    amount:300, bank:'ธนาคารกสิกรไทย', bankShort:'KB', bankColor:'#138f2d',
    fromName:'นาย ธนกร ส.', fromAcct:'xxx-x-x4938-2', date:'12 มิ.ย. 2569', time:'09:14 น.', ref:'0150621409KB7731', phone:'081-234-5678', linked:true,
    verify:'matched', status:'pending', memberNo:null },
  { id:'PM02', first:'ณัฐริกา', last:'รักเรียน', photo:1+(5*13)%70, alumniId:'A1009', faculty:'คณะนิติศาสตร์', year:2561,
    amount:250, bank:'ธนาคารไทยพาณิชย์', bankShort:'SCB', bankColor:'#4e2a84',
    fromName:'น.ส. ณัฐริกา ร.', fromAcct:'xxx-xx-x712-5', date:'12 มิ.ย. 2569', time:'20:41 น.', ref:'2025061220SCB552', phone:'089-555-1212', linked:false,
    verify:'mismatch', status:'pending', memberNo:null },
  { id:'PM03', first:'อาทิตยา', last:'บุญมา', photo:1+(14*13)%70, alumniId:'A1014', faculty:'คณะครุศาสตร์', year:2555,
    amount:300, bank:'ธนาคารกรุงเทพ', bankShort:'BBL', bankColor:'#1e4598',
    fromName:'น.ส. อาทิตยา บ.', fromAcct:'xxx-x-x2210-9', date:'11 มิ.ย. 2569', time:'18:05 น.', ref:'0110621805BBL118', phone:'062-848-1190', linked:true,
    verify:'error', status:'pending', memberNo:null },
  { id:'PM04', first:'ปกรณ์', last:'วัฒนกุล', photo:1+(26*13)%70, alumniId:'A1026', faculty:'คณะวิทยาศาสตร์', year:2554,
    amount:300, bank:'ธนาคารกสิกรไทย', bankShort:'KB', bankColor:'#138f2d',
    fromName:'นาย ปกรณ์ ว.', fromAcct:'xxx-x-x0042-1', date:'10 มิ.ย. 2569', time:'14:22 น.', ref:'0100621422KB4456', phone:'081-700-4421', linked:true,
    verify:'matched', status:'approved', memberNo:'M-2569-0042' },
];
const VERIFY_LABEL = { matched:'ตรงกับยอด', mismatch:'ยอดไม่ตรง', error:'ตรวจอัตโนมัติไม่ได้' };
const VERIFY_BADGE = { matched:'badge-success', mismatch:'badge-warning', error:'badge-destructive' };
let MEMBER_SEQ = 43; // ลำดับเลขสมาชิกถัดไป
function genMemberNo(){ return 'M-' + (new Date().getFullYear()+543) + '-' + String(MEMBER_SEQ++).padStart(4,'0'); }

/* ---- Event & Ticketing (Phase 2) ----
   tickets: ประเภทบัตร (ชื่อ/ราคา/ขายแล้ว/โควตา)
   เก็บใน localStorage แบบเดียวกับข่าว: Admin สร้าง/แก้ไข → เว็บ + LIFF อ่านที่เดียวกัน    */
/* ราคา 2 ระดับต่อบัตร: price = ราคาทั่วไป (ศิษย์เก่าทั่วไป), priceMember = ราคาสมาชิกสมาคม (พิเศษ) */
const DEFAULT_EVENTS = [
  { id:'EV01', title:'งานคืนสู่เหย้า ประจำปี 2569 “รวมใจ คืนถิ่น”', date:'19 ธ.ค. 2569', dateShort:['19','ธ.ค.'], time:'17:00 – 21:00 น.', place:'หอประชุมใหญ่ มหาวิทยาลัยรัตนบุรี', mapUrl:'https://maps.google.com/?q=หอประชุมใหญ่+มหาวิทยาลัย', img:1011, status:'open',
    desc:'งานพบปะสังสรรค์ศิษย์เก่าทุกรุ่น พร้อมมินิคอนเสิร์ตและของที่ระลึก',
    tickets:[ {id:'T1',name:'บัตรทั่วไป',price:0,priceMember:0,sold:342,quota:500} ] },
  { id:'EV02', title:'สัมมนาเครือข่ายธุรกิจศิษย์เก่า', date:'26 ก.ค. 2569', dateShort:['26','ก.ค.'], time:'18:30 – 21:30 น.', place:'อาคารนวัตกรรม ชั้น 9', mapUrl:'https://maps.google.com/?q=อาคารนวัตกรรม', img:1041, status:'open',
    desc:'พบปะผู้ประกอบการศิษย์เก่า แลกเปลี่ยนโอกาสทางธุรกิจ',
    tickets:[ {id:'T1',name:'บัตรสัมมนา',price:500,priceMember:200,sold:74,quota:120} ] },
  { id:'EV03', title:'Alumni Run 2569 เดิน-วิ่งการกุศล', date:'8 ก.พ. 2569', dateShort:['08','ก.พ.'], time:'เริ่ม 05:30 น.', place:'สนามกีฬากลาง', mapUrl:'https://maps.google.com/?q=สนามกีฬากลาง', img:1062, status:'closed',
    desc:'เดิน-วิ่งการกุศลระดมทุนพัฒนาห้องสมุดและกองทุนการศึกษา (จัดเมื่อต้นปี — ปิดรับลงทะเบียนแล้ว)',
    tickets:[ {id:'T1',name:'Fun Run 5 กม.',price:350,priceMember:300,sold:392,quota:400}, {id:'T2',name:'Mini Marathon 10 กม.',price:500,priceMember:450,sold:288,quota:300} ] },
];
const EVENTS_STORE_KEY = 'adp_events_v4';
function loadEvents() {
  try { const s = localStorage.getItem(EVENTS_STORE_KEY); if (s) { const a = JSON.parse(s); if (Array.isArray(a)) return a; } } catch (e) {}
  return null;
}
function saveEvents() { try { localStorage.setItem(EVENTS_STORE_KEY, JSON.stringify(EVENTS)); return true; } catch (e) { return false; } }
function resetEvents() { try { localStorage.removeItem(EVENTS_STORE_KEY); } catch (e) {} EVENTS.length = 0; DEFAULT_EVENTS.forEach(x => EVENTS.push(JSON.parse(JSON.stringify(x)))); }
const EVENTS = loadEvents() || DEFAULT_EVENTS.map(x => JSON.parse(JSON.stringify(x)));
function ticketsSold(e){ return e.tickets.reduce((s,t)=>s+(t.sold||0),0); }
function ticketsQuota(e){ return e.tickets.reduce((s,t)=>s+(t.quota||0),0); }
// ราคาที่ใช้จริงตามสถานะสมาชิก (true = สมาชิกสมาคม → ราคาพิเศษถ้ามี)
function ticketPrice(t, isMember){ return (isMember && (t.priceMember!=null)) ? t.priceMember : (t.price||0); }
function ticketHasMemberPrice(t){ return t.priceMember!=null && t.priceMember!==t.price; }
// escape HTML สำหรับ interpolate ค่าที่ผู้ใช้กรอก (กัน XSS ในจุดที่ render ด้วย innerHTML)
function escHtml(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
// ค้นหาศิษย์เก่าจากเบอร์โทร (Auto-link เมื่อพบเบอร์ในระบบ) — normalize เฉพาะตัวเลข
function findAlumniByPhone(phone){
  const norm = s => (s||'').replace(/\D/g,'');
  const p = norm(phone); if(p.length < 9) return null;
  return ALUMNI.find(a => norm(a.phone)===p) || null;
}

/* ---- Event Payment Queue (แยกจาก Membership Queue) ----
   ค่าบัตรงาน/ค่าเข้าร่วมกิจกรรม — ตรวจสลิปแยกต่างหาก, อนุมัติแล้ว = ออก E-Ticket (ไม่ออกเลขสมาชิก) */
const EVENT_PAYMENTS = [
  { id:'EP01', first:'สิริพร', last:'วงศ์ทอง', photo:1+(8*13)%70, alumniId:'A1008', year:2558, eventId:'EV02', eventTitle:'สัมมนาเครือข่ายธุรกิจศิษย์เก่า', ticketName:'บัตรสัมมนา', tier:'member', qty:1,
    amount:200, bank:'ธนาคารกสิกรไทย', bankShort:'KB', bankColor:'#138f2d', fromName:'น.ส. สิริพร ว.', fromAcct:'xxx-x-x8841-0', date:'12 มิ.ย. 2569', time:'10:22 น.', ref:'0120621022KB9021', phone:'081-884-1099', linked:true, verify:'matched', status:'pending' },
  { id:'EP02', first:'กิตติพงษ์', last:'แสนสุข', photo:1+(11*13)%70, alumniId:'A1011', year:2552, eventId:'EV02', eventTitle:'สัมมนาเครือข่ายธุรกิจศิษย์เก่า', ticketName:'บัตรสัมมนา', tier:'general', qty:2,
    amount:800, bank:'ธนาคารไทยพาณิชย์', bankShort:'SCB', bankColor:'#4e2a84', fromName:'นาย กิตติพงษ์ ส.', fromAcct:'xxx-xx-x335-8', date:'12 มิ.ย. 2569', time:'19:03 น.', ref:'2025061219SCB880', phone:'083-335-8080', linked:false, verify:'mismatch', status:'pending' },
  { id:'EP03', first:'ชนิกานต์', last:'พูนผล', photo:1+(19*13)%70, alumniId:'A1019', year:2560, eventId:'EV03', eventTitle:'Alumni Run 2569 เดิน-วิ่งการกุศล', ticketName:'Fun Run 5 กม.', tier:'member', qty:1,
    amount:300, bank:'ธนาคารกรุงเทพ', bankShort:'BBL', bankColor:'#1e4598', fromName:'น.ส. ชนิกานต์ พ.', fromAcct:'xxx-x-x1190-4', date:'11 มิ.ย. 2569', time:'21:47 น.', ref:'0110621147BBL553', phone:'062-119-0440', linked:true, verify:'matched', status:'approved' },
  { id:'EP04', first:'ภาคิน', last:'เจริญสุข', photo:1+(22*13)%70, alumniId:'A1022', year:2557, eventId:'EV02', eventTitle:'สัมมนาเครือข่ายธุรกิจศิษย์เก่า', ticketName:'บัตรสัมมนา', tier:'general', qty:1,
    amount:500, bank:'ธนาคารกสิกรไทย', bankShort:'KB', bankColor:'#138f2d', fromName:'นาย ภาคิน จ.', fromAcct:'xxx-x-x7720-3', date:'10 มิ.ย. 2569', time:'13:10 น.', ref:'0100621310KB1180', phone:'081-772-0331', linked:true, verify:'matched', status:'approved' },
];
const EVENT_TIER_LABEL = { member:'ราคาสมาชิก', general:'ราคาทั่วไป' };

/* ---- Admin Activity Log + PDPA Consent Log (Technical) ---- */
const ADMIN_LOGS = [
  { admin:'admin', action:'อนุมัติการชำระเงิน', target:'A1026 (ออกเลข M-2569-0042)', time:'10 มิ.ย. 2569 14:22' },
  { admin:'admin', action:'แก้ไขข้อมูลศิษย์เก่า', target:'A1002', time:'10 มิ.ย. 2569 11:05' },
  { admin:'admin', action:'Merge โปรไฟล์', target:'A1031 → A1007', time:'9 มิ.ย. 2569 16:40' },
  { admin:'admin', action:'ลบ (Soft Delete) ศิษย์เก่า', target:'A1099', time:'9 มิ.ย. 2569 09:12' },
  { admin:'admin', action:'ส่ง Broadcast', target:'กลุ่มสมาชิกสมาคม (20 คน)', time:'8 มิ.ย. 2569 10:30' },
];
function logAction(action, target){ ADMIN_LOGS.unshift({ admin:'admin', action, target, time: todayTH() + ' ' + nowHM() }); }
function nowHM(){ const d=new Date(); return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'); }

/* ---- UI helpers ---- */
function initials(first, last) { return (first?.[0] || '') + (last?.[0] || ''); }

/* Real-people profile photo — รับได้ทั้ง id (1–70 = รูปสต็อก), URL หรือไฟล์อัปโหลด (data URL) */
function face(n) {
  if (typeof n === 'string' && (n.startsWith('http') || n.startsWith('data:') || n.startsWith('blob:'))) return n;
  return 'https://i.pravatar.cc/150?img=' + (((Math.abs(parseInt(n)||1) - 1) % 70) + 1);
}
/* Cover image resolver — รับได้ทั้ง seed(ตัวเลข), URL หรือไฟล์ที่อัปโหลด (data URL) */
function IMG(seed) {
  if (typeof seed === 'string' && (seed.startsWith('http') || seed.startsWith('data:') || seed.startsWith('blob:'))) return seed;
  return 'https://picsum.photos/seed/alumni' + seed + '/600/400';
}
/* avatar with a real photo, sizes: sm|md|lg|xl|2xl */
function avatarOf(p, size) {
  const id = p.photo != null ? p.photo : 1;
  return `<span class="avatar avatar-${size || 'md'}"><img src="${face(id)}" alt="${(p.first||'')} ${(p.last||'')}"></span>`;
}

function toast(msg, type) {
  let wrap = document.querySelector('.toast-wrap');
  if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toast-wrap'; document.body.appendChild(wrap); }
  const t = document.createElement('div');
  t.className = 'toast';
  const color = type === 'success' ? '#06c755' : type === 'error' ? '#e60023' : '#fff';
  const ic = type === 'success' ? 'check' : type === 'error' ? 'x' : 'bell';
  t.innerHTML = `<span style="color:${color};display:inline-flex">${icon(ic, 16)}</span><span>${msg}</span>`;
  wrap.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 300); }, 2600);
}

/* Toggle helpers for checkbox / switch built from markup */
function bindToggles(root) {
  (root || document).querySelectorAll('[data-toggle]').forEach(el => {
    el.addEventListener('click', () => {
      const cls = el.classList.contains('ds-switch') ? 'on' : 'checked';
      el.classList.toggle(cls);
      el.dispatchEvent(new CustomEvent('toggled', { detail: { on: el.classList.contains(cls) }, bubbles: true }));
    });
  });
}

const CHECK_SVG = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

/* ---- Entrance animations (count-up numbers, growing bars, donut reveal) ---- */
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  if (isNaN(target)) return;
  const suffix = el.dataset.suffix || '';
  const dur = 950, start = performance.now();
  function step(now) {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased).toLocaleString() + suffix;
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function animateCharts(root) {
  const r = root || document;
  // bars grow from 0 to target height, staggered
  r.querySelectorAll('.bar[data-h]').forEach((b, i) => {
    b.style.height = '0%';
    setTimeout(() => { b.style.height = b.dataset.h + '%'; }, 90 + i * 90);
  });
  // numbers count up
  r.querySelectorAll('[data-count]').forEach(countUp);
  // donut sweep / reveal (re-trigger keyframe)
  r.querySelectorAll('.donut-anim').forEach(d => { d.classList.remove('play'); void d.offsetWidth; d.classList.add('play'); });
}

/* Simple icon set (lucide-style inline) */
const ICON = {
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  chart:'<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  grid:'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  settings:'<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  plus:'<path d="M5 12h14"/><path d="M12 5v14"/>',
  upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
  edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/>',
  trash:'<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  check:'<polyline points="20 6 9 17 4 12"/>',
  x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
  phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z"/>',
  pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  cal:'<rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
  graduation:'<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  back:'<path d="m15 18-6-6 6-6"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  menu:'<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  briefcase:'<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  facebook:'<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  linkedin:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  instagram:'<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
  trendUp:'<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  trendDown:'<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
  card:'<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
  ticket:'<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>',
  scan:'<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" x2="17" y1="12" y2="12"/>',
  qr:'<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>',
};
function icon(name, size) {
  const s = size || 18;
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[name] || ''}</svg>`;
}
