export const PROPERTIES = [
  {
    id: 1,
    name: "Great Hornbill Thika",
    location: "Michuki Rd, Golf View Estate",
    bedrooms: 3,
    guests: 6,
    price: 60,
    badge: "Popular",
    beds: ["1 King size bed", "1 Double bed", "1 Double decker bed"],
    checkin: "15:00",
    checkout: "11:00",
    amenities: ["Free WiFi", "Smart TV", "Free Parking", "Full Kitchen", "Hot Shower", "Security", "Balcony", "Workspace"],
    amenityIcons: ["📶", "📺", "🚗", "🍳", "🚿", "🔒", "🌿", "💼"],
    images: [
      "/images/great-hornbill/living-room-1.avif",
      "/images/great-hornbill/master-bedroom-1.avif",
      "/images/great-hornbill/exterior.avif",
      "/images/great-hornbill/lounge-netflix.avif",
      "/images/great-hornbill/living-room-2.avif",
      "/images/great-hornbill/bedroom-2.avif",
    ],
    description:
      "A spacious 3-bedroom retreat nestled in the serene Golf View Estate. Featuring a stunning balcony view, modern furnishings, and all the comforts of home.",
  },
  {
    id: 2,
    name: "Green Tourmaline Thika",
    location: "Bogoria Rd, Golf View Estate",
    bedrooms: 3,
    guests: 6,
    price: 70,
    badge: "Premium",
    beds: ["1 King size bed", "2 Double beds"],
    checkin: "15:00",
    checkout: "11:00",
    amenities: ["Free WiFi", "Free Parking", "Netflix", "Ensuite Bathrooms", "Kitchen", "Washing Machine", "Security", "Modern Interior"],
    amenityIcons: ["📶", "🚗", "🎬", "🛁", "🍳", "👕", "🔒", "✨"],
    images: [
      "/images/green-tourmaline/living-room-1.jpg",
      "/images/green-tourmaline/master-bedroom.jpg",
      "/images/green-tourmaline/exterior.jpg",
      "/images/green-tourmaline/dining.jpg",
      "/images/green-tourmaline/kitchen-1.jpg",
    ],
    description:
      "All-ensuite luxury living in the heart of Golf View Estate. Perfect for families and groups seeking premium comfort with Netflix, modern design, and private bathrooms.",
  },
];

export const GALLERY = [
  { label: "Living Room",    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80" },
  { label: "Master Bedroom", url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80" },
  { label: "Kitchen",        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80" },
  { label: "Bathroom",       url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=700&q=80" },
  { label: "Balcony",        url: "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?w=700&q=80" },
  { label: "Dining Area",    url: "https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?w=700&q=80" },
  { label: "Second Bedroom", url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=700&q=80" },
  { label: "Exterior",       url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&q=80" },
];

export const TESTIMONIALS = [
  {
    name: "James Mwangi",
    role: "Diaspora Traveller, UK",
    stars: 5,
    text: "Coming home to Kenya felt like coming home to luxury. The attention to detail, the warm service, and the beautiful property made our family holiday unforgettable. We'll be back every year!",
    avatar: "JM",
  },
  {
    name: "Sarah & Tom Williams",
    role: "Tourists, Australia",
    stars: 5,
    text: "We stayed for 10 days exploring Thika and Central Kenya. The home was spotless, WiFi was great for work calls, and the Golf View Estate location was so peaceful. Highly recommend!",
    avatar: "ST",
  },
  {
    name: "Dr. Wanjiku Kamau",
    role: "Business Traveller, Nairobi",
    stars: 5,
    text: "The workspace setup was perfect for my extended stay. Professional, clean, secure, and the host communication was excellent. A 5-star experience at an incredible price.",
    avatar: "WK",
  },
  {
    name: "The Okonkwo Family",
    role: "Family Stay, Nigeria",
    stars: 5,
    text: "We needed space for 6 people and found exactly that — and more. The kids loved the double decker bed! Karibu Diaspora Homes truly understands African family hospitality.",
    avatar: "OF",
  },
];

export const FEATURES = [
  { icon: "📍", title: "Prime Thika Location",       desc: "Situated in Golf View Estate, perfectly positioned between Nairobi and Central Kenya." },
  { icon: "💎", title: "Affordable Luxury",           desc: "Premium furnishings and amenities at prices that won't break the bank." },
  { icon: "⚡", title: "Fast WiFi",                   desc: "High-speed fibre internet perfect for remote work and streaming." },
  { icon: "👨‍👩‍👧‍👦", title: "Family Friendly",         desc: "Spacious layouts, safe neighbourhoods, and beds for every family member." },
  { icon: "🔒", title: "Secure Environment",          desc: "24/7 security in a gated estate for total peace of mind." },
  { icon: "🗓️", title: "Flexible Stays",              desc: "Short stays, extended visits, or monthly rentals — we accommodate all." },
  { icon: "📱", title: "Easy Booking",                desc: "Book instantly via WhatsApp or our simple online form." },
  { icon: "🌍", title: "Diaspora-Friendly",           desc: "We understand the needs of Kenyans returning home and international guests alike." },
];

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=80",
];

export const NEARBY = [
  { icon: "🛣️", title: "Nairobi CBD",                    dist: "~45 min via Thika Superhighway" },
  { icon: "🏬", title: "Thika Town Centre",               dist: "5–10 minutes" },
  { icon: "🌊", title: "Fourteen Falls",                  dist: "30 minutes" },
  { icon: "🦁", title: "Ol Donyo Sabuk National Park",    dist: "25 minutes" },
  { icon: "🏨", title: "Blue Posts Hotel",                dist: "10 minutes" },
  { icon: "🛒", title: "Thika Greens Mall",               dist: "15 minutes" },
  { icon: "🏥", title: "Thika Level 5 Hospital",          dist: "10 minutes" },
  { icon: "✈️", title: "JKIA Airport",                    dist: "~1 hour" },
];
