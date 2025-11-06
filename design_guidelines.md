# Design Guidelines for 雅曼 (Yaman) Hair Salon

## Design Approach

**Primary Reference:** Airbnb's warm hospitality + beauty industry polish (think Glossier, Sephora's approachability)

**Core Principle:** Create a welcoming, family-like atmosphere that makes clients feel at home while maintaining professional credibility. The design should feel like visiting a friend's beautifully curated space.

## Typography

**Font Families:**
- Headings: Noto Serif TC (elegant, warm serif for Chinese characters)
- Body: Noto Sans TC (clean, readable sans-serif)
- Accents: Inter (for modern UI elements, prices, buttons)

**Hierarchy:**
- Hero Headline: 48px/56px (mobile/desktop), font-weight 600
- Section Titles: 32px/40px, font-weight 600
- Service Names: 24px, font-weight 500
- Body Text: 16px/18px, font-weight 400, line-height 1.6
- Small Print: 14px (contact info, footer)

## Layout System

**Spacing Scale:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Micro spacing (between related elements): 2-4
- Component spacing: 6-8
- Section padding: 12-16 (mobile), 20-24 (desktop)
- Major section gaps: 16-20

**Grid Strategy:**
- Single column mobile-first
- 2-column for services/team on tablet (md:)
- 3-column max for service cards on desktop (lg:)
- Asymmetric layouts for visual interest (e.g., 60/40 splits for about sections)

## Page Structure & Components

### Homepage Layout (7 sections)

**1. Hero Section (80vh)**
- Full-width background image showing warm salon interior or stylist interaction
- Centered content overlay with blurred-background button
- Headline: "雅曼美髮沙龍 - 如家般溫馨的美髮體驗"
- Subtext: Contact info + LINE ID prominently displayed
- Primary CTA: "立即預約" (Book Now) with blurred backdrop

**2. Welcome Story Section**
- 2-column layout (image left, text right on desktop)
- Warm introduction to Yaman's family philosophy
- Client testimonial quote integrated

**3. Services Showcase**
- 3-column grid (stacks to 1 on mobile)
- Each service card: icon/image, name, description, price range
- Services: 剪髮 (Haircut), 染髮 (Coloring), 燙髮 (Perming), 護髮 (Treatment), 造型 (Styling), 頭皮護理 (Scalp Care)
- Soft rounded corners (rounded-2xl), subtle shadows

**4. Team Introduction**
- 2-3 column grid with stylist photos
- Circular images, names, specialties
- Friendly, approachable presentation

**5. Booking Process Preview**
- 3-step visual guide (Service → Stylist → Time)
- Simple illustrations/icons
- CTA: "開始預約"

**6. Contact & Location**
- 2-column: Map/location image left, contact details + LINE integration right
- Address: 中和區民德路52號1樓
- Phone: 02-89513058 (clickable)
- LINE button with @377bechg prominently featured
- Opening hours display

**7. Footer**
- Business info, quick links, social proof ("服務客戶超過XX位")
- Newsletter signup (optional engagement tool)

### Booking System Components

**Multi-Step Form:**
- Progress indicator (dots or steps)
- Step 1: Service selection (radio cards with images)
- Step 2: Stylist selection (avatar cards, includes "無指定" option)
- Step 3: Calendar date picker (warm color highlights)
- Step 4: Time slot selection (button grid)
- Step 5: Customer details (name, phone, LINE ID)
- Confirmation summary page

**Admin Dashboard:**
- Clean table view of appointments
- Filters: Date range, service type, stylist
- Action buttons: Confirm, Reschedule, Cancel
- Calendar view toggle option

## Component Library

**Navigation:**
- Sticky header with logo left, menu items center/right
- Mobile: Hamburger menu with slide-in drawer
- Navigation items: 首頁, 服務項目, 設計師團隊, 預約, 聯絡我們

**Buttons:**
- Primary: Rounded-lg, px-8 py-3, soft shadows
- Secondary: Outline style with subtle hover lift
- All buttons on images: backdrop-blur-md background

**Cards:**
- Service cards: rounded-2xl, p-6, hover lift (translate-y-1)
- Stylist cards: rounded-xl, overflow-hidden images
- Appointment cards: Clean borders, organized info hierarchy

**Forms:**
- Rounded-lg inputs with focus states (ring-2)
- Label spacing: mb-2
- Input padding: px-4 py-3
- Error states with gentle color indicators

## Images

**Hero Image:** 
- Full-width salon interior shot showing warm lighting, comfortable styling stations, plants, welcoming atmosphere
- Alternative: Stylist-client interaction showing friendly, family-like service

**Section Images:**
- Welcome section: Cozy salon corner or team group photo
- Service cards: Before/after examples or service-specific imagery
- Stylist photos: Professional headshots with natural, warm lighting
- Location section: Storefront exterior or map integration

**Image Treatment:**
- Soft rounded corners throughout (rounded-xl to rounded-2xl)
- Subtle overlay on hero (20-30% dark overlay for text readability)
- Natural, warm color grading preferred

## Animations

**Minimal, Purposeful Only:**
- Subtle fade-in on scroll for section reveals (once per section)
- Gentle hover lift on cards (translate-y-1)
- Smooth transitions on form steps
- No excessive animations - keep it calm and welcoming

## Accessibility

- Minimum touch targets: 44x44px
- Form labels always visible
- Sufficient color contrast ratios (WCAG AA minimum)
- Keyboard navigation for booking flow
- Screen reader friendly appointment confirmations

---

**Design Philosophy:** Every element should reinforce the feeling of coming home - warm, familiar, comfortable, yet polished and professional. The user should feel welcomed from the first visit, with clear pathways to booking and communication through LINE.