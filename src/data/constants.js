export const GOLD = "#c9a227";
export const NAVY = "#0d1f3c";

export const PROPERTIES = [
  {
    id: 1,
    slug: "great-hornbill",
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
    description: "A spacious 3-bedroom retreat in Golf View Estate. Featuring a king-size four-poster bed, Smart TV, modern furnishings, balcony, and all the comforts of home.",
    longDescription: "Great Hornbill Thika is your perfect home away from home. Nestled in the serene Golf View Estate on Michuki Road, this beautifully furnished 3-bedroom house sleeps up to 6 guests in comfort and style. Featuring a king-size four-poster bed, Smart TV lounge, fully equipped kitchen, hot shower, secure parking, and a private balcony with estate views.",
  },
  {
    id: 2,
    slug: "green-tourmaline",
    name: "Green Tourmaline Thika",
    location: "Bogoria Rd, Golf View Estate",
    bedrooms: 3,
    guests: 6,
    price: 70,
    badge: "Premium",
    beds: ["1 King size bed", "2 Double beds"],
    checkin: "15:00",
    checkout: "11:00",
    amenities: ["Free WiFi", "Free Parking", "Netflix", "Ensuite Bathrooms", "Full Kitchen", "Washing Machine", "Security", "Rooftop Terrace"],
    amenityIcons: ["📶", "🚗", "🎬", "🛁", "🍳", "👕", "🔒", "🌇"],
    images: [
      "/images/green-tourmaline/living-room-1.jpg",
      "/images/green-tourmaline/lounge-netflix.jpg",
      "/images/green-tourmaline/master-bedroom.jpg",
      "/images/green-tourmaline/kitchen-1.jpg",
      "/images/green-tourmaline/ensuite-shower.jpg",
      "/images/green-tourmaline/balcony.jpg",
    ],
    description: "All-ensuite premium living with LED ceilings, Netflix TV wall, fully-fitted kitchen with double-door fridge & oven, marble bathrooms, and a private rooftop terrace.",
    longDescription: "Green Tourmaline Thika is our flagship premium property on Bogoria Road, Golf View Estate. Every bedroom is fully ensuite with stunning marble bathrooms and glass shower enclosures. Enjoy the cinematic Netflix TV lounge, a modern fully-fitted kitchen with built-in oven and American double-door fridge, beautiful wooden staircase with LED step lighting, and a spacious private rooftop terrace overlooking lush gardens.",
  }
];

export const TESTIMONIALS = [
  { name: "James Mwangi", role: "Diaspora Traveller, UK", stars: 5, text: "Coming home to Kenya felt like coming home to luxury. The attention to detail, the warm service, and the beautiful property made our family holiday unforgettable. We'll be back every year!", avatar: "JM" },
  { name: "Sarah & Tom Williams", role: "Tourists, Australia", stars: 5, text: "We stayed 10 days exploring Thika and Central Kenya. The home was spotless, WiFi was great for work calls, and the Golf View Estate location was so peaceful. Highly recommend!", avatar: "ST" },
  { name: "Dr. Wanjiku Kamau", role: "Business Traveller, Nairobi", stars: 5, text: "The workspace setup was perfect for my extended stay. Professional, clean, secure, and the host communication was excellent. A 5-star experience at an incredible price.", avatar: "WK" },
  { name: "The Okonkwo Family", role: "Family Stay, Nigeria", stars: 5, text: "We needed space for 6 people and found exactly that — and more. The kids loved the double decker bed! Karibu Diaspora Homes truly understands African family hospitality.", avatar: "OF" },
];

export const GALLERY_ITEMS = [
  { label: "GT · Living Room", url: "/images/green-tourmaline/living-room-1.jpg", property: "Green Tourmaline" },
  { label: "GT · Netflix Lounge", url: "/images/green-tourmaline/lounge-netflix.jpg", property: "Green Tourmaline" },
  { label: "GT · Master Bedroom", url: "/images/green-tourmaline/master-bedroom.jpg", property: "Green Tourmaline" },
  { label: "GT · Second Bedroom", url: "/images/green-tourmaline/bedroom-2.jpg", property: "Green Tourmaline" },
  { label: "GT · Kitchen", url: "/images/green-tourmaline/kitchen-1.jpg", property: "Green Tourmaline" },
  { label: "GT · Dining Area", url: "/images/green-tourmaline/dining.jpg", property: "Green Tourmaline" },
  { label: "GT · Ensuite Bathroom", url: "/images/green-tourmaline/ensuite-shower.jpg", property: "Green Tourmaline" },
  { label: "GT · Rooftop Terrace", url: "/images/green-tourmaline/balcony.jpg", property: "Green Tourmaline" },
  { label: "GH · Living Room", url: "/images/great-hornbill/living-room-1.avif", property: "Great Hornbill" },
  { label: "GH · Smart TV Lounge", url: "/images/great-hornbill/lounge-netflix.avif", property: "Great Hornbill" },
  { label: "GH · Master Bedroom", url: "/images/great-hornbill/master-bedroom-1.avif", property: "Great Hornbill" },
  { label: "GH · Exterior & Gate", url: "/images/great-hornbill/exterior.avif", property: "Great Hornbill" },
  { label: "GH · Bedroom View", url: "/images/great-hornbill/master-bedroom-2.avif", property: "Great Hornbill" },
  { label: "GH · Second Bedroom", url: "/images/great-hornbill/bedroom-2.avif", property: "Great Hornbill" },
];

export const FEATURES = [
  { icon: "📍", title: "Prime Thika Location", desc: "Golf View Estate — perfectly between Nairobi and Central Kenya." },
  { icon: "💎", title: "Affordable Luxury", desc: "Premium furnishings and amenities at prices that won't break the bank." },
  { icon: "⚡", title: "Fast WiFi", desc: "High-speed fibre internet perfect for remote work and streaming." },
  { icon: "👨‍👩‍👧‍👦", title: "Family Friendly", desc: "Spacious layouts and beds for every family member." },
  { icon: "🔒", title: "Secure Environment", desc: "24/7 security in a gated estate for total peace of mind." },
  { icon: "🗓️", title: "Flexible Stays", desc: "Short stays, extended visits, or monthly rentals." },
  { icon: "📱", title: "Easy Booking", desc: "Book instantly via WhatsApp or our simple online form." },
  { icon: "🌍", title: "Diaspora-Friendly", desc: "We understand what Kenyans returning home truly need." },
];
