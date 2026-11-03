export interface ServiceItem {
  slug: string;
  n: string;
  cat: "A" | "B" | "C";
  title: string;
  forWho: string;
  blurb: string;
  points: string[];
  benefit: string;
  cta: string;
  note?: string;
  subnote?: string;
  flow?: string[];
}

export const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "How we work", href: "/#process" },
  { label: "Why KeySpex", href: "/#why" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const site = {
  name: "KeySpex",
  tagline: "Custom digital solutions for real businesses",
  hero: {
    eyebrow: "Custom digital solutions for real businesses \u00B7 Free consultation",
    title: "WEBSITES, TOOLS & MARKETING FOR",
    accent: "REAL BUSINESSES.",
    sub: "Websites, business tools, marketing and creative work from one digital partner. Shaped around what your business actually needs.",
  },
  supports: [
    { n: "01", title: "Startups and new businesses", desc: "Build a credible first impression and right-sized digital foundations." },
    { n: "02", title: "Small & medium-sized businesses", desc: "Consolidate operations, improve customer reach, and look professional." },
    { n: "03", title: "Local and offline shops", desc: "Bring clarity to stock, sales, and local search visibility." },
    { n: "04", title: "Growing and established brands", desc: "Maintain visual consistency and run structured promotional campaigns." },
  ],
  categories: [
    { id: "A", name: "Website & Business Solutions", line: "Look credible. Stay organised." },
    { id: "B", name: "Digital Visibility & Marketing", line: "Be found. Stay consistent. Stand out." },
    { id: "C", name: "Creative & Content", line: "Look sharp. Tell your story." },
  ],
  services: [
    {
      slug: "business-portfolio-website",
      n: "01",
      cat: "A",
      title: "Business Portfolio Website",
      forWho: "Businesses that are hard to find, or hard to trust, online.",
      blurb: "A professional website that presents your services, work and contact details in one credible place, so potential customers can learn about you before they get in touch.",
      points: [
        "Services and portfolio shown clearly",
        "Contact details in one place",
        "A layout that works on phones and laptops"
      ],
      benefit: "A clear, credible first impression.",
      cta: "Not sure what your website should include? Ask us."
    },
    {
      slug: "business-dashboard",
      n: "02",
      cat: "A",
      title: "Business Dashboard",
      forWho: "Businesses whose data is scattered across sheets and notes.",
      blurb: "A digital interface that organises your business data and lets you monitor the metrics you choose to track. Features are agreed as part of your project scope.",
      points: [
        "Data organised in one place",
        "Selected metrics shown clearly",
        "Easier review and reporting"
      ],
      benefit: "Better visibility to support everyday decisions.",
      cta: "Tell us which numbers matter most to you."
    },
    {
      slug: "store-management-system",
      n: "03",
      cat: "A",
      title: "Store Management System",
      note: "Internal tool for offline stores, not an online store.",
      subnote: "This is an internal tool for running your shop, not a customer-facing online store. Exact features are agreed based on your store's needs.",
      forWho: "Shop owners who track stock and sales by hand.",
      blurb: "A digital system that helps offline store owners move away from manual records and keep inventory and revenue information in one place.",
      points: [
        "A more organised view of your inventory",
        "Digital tracking of relevant stock information",
        "Visibility into recorded sales and revenue",
        "Easier review of store records and performance"
      ],
      benefit: "A clearer picture of your stock and sales.",
      cta: "Running an offline store? Let's talk about what you track today."
    },
    {
      slug: "google-business-seo",
      n: "04",
      cat: "B",
      title: "Google Business SEO",
      forWho: "Local businesses with an incomplete or outdated Google listing.",
      blurb: "We help improve your Google Business Profile so your business information is accurate, complete and easy for people to understand.",
      points: [
        "Accurate business details",
        "Suitable categories and services",
        "A complete, well-presented profile"
      ],
      benefit: "A stronger local online presence.",
      cta: "Wondering how your listing looks today? Ask us."
    },
    {
      slug: "social-media-marketing",
      n: "05",
      cat: "B",
      title: "Social Media Marketing",
      forWho: "Brands whose posts look different every time, or stop altogether.",
      blurb: "Consistent, on-brand content that presents your products and services and builds recognition and engagement with your audience.",
      points: [
        "Content that reflects your brand",
        "Products and services showcased",
        "A consistent look across posts"
      ],
      benefit: "Stronger brand recognition over time.",
      cta: "Tell us what you'd like your audience to know."
    },
    {
      slug: "social-media-campaigns",
      n: "06",
      cat: "B",
      title: "Social Media Campaigns",
      forWho: "Launches, offers and seasons that deserve more than a single post.",
      blurb: "Coordinated promotional activity built around a defined business goal and run over an agreed period, such as a product launch, festival offer, seasonal push or brand-awareness drive.",
      flow: ["Goal", "Plan", "Create", "Launch"],
      points: [
        "A defined objective for each campaign",
        "Coordinated communication over an agreed period"
      ],
      benefit: "A promotion with a plan behind it.",
      cta: "Got a launch or festival offer coming up? Let's plan it."
    },
    {
      slug: "graphic-designing",
      n: "07",
      cat: "C",
      title: "Graphic Designing",
      forWho: "Businesses whose materials look mismatched or unfinished.",
      blurb: "Professional design that improves how your business is presented and keeps your communication consistent across your brand and marketing materials.",
      points: [
        "Social media creatives",
        "Promotional graphics",
        "Banners and other marketing materials"
      ],
      benefit: "A polished, cohesive look across your brand.",
      cta: "Share what you need designed and we'll take it from there."
    },
    {
      slug: "video-editing",
      n: "08",
      cat: "C",
      title: "Video Editing",
      forWho: "Businesses with footage but no polished way to share it.",
      blurb: "Edited videos that present your products, services, promotional messages and brand story through engaging visual content.",
      points: [
        "Product and service videos",
        "Promotional and brand-story videos"
      ],
      benefit: "Clear, engaging content for your channels.",
      cta: "Have footage ready? Tell us what you want it to say."
    }
  ] as ServiceItem[],
  marketingPrinciples: [
    { n: "01", title: "Be found.", desc: "Accurate local information so customers find you effortlessly." },
    { n: "02", title: "Stay consistent.", desc: "A steady, recognisable presence across every touchpoint." },
    { n: "03", title: "Promote with purpose.", desc: "A clear message designed for a clear, measurable goal." }
  ],
  process: [
    { n: "01", step: "Discuss", desc: "We talk through your goals, situation, and what you actually need." },
    { n: "02", step: "Identify", desc: "We identify suitable solutions and the right scope for your business." },
    { n: "03", step: "Agree", desc: "We agree on scope, deliverables, timeline and transparent pricing up front." },
    { n: "04", step: "Execute", desc: "We carry out the work with steady updates and zero guesswork." },
    { n: "05", step: "Hand over", desc: "We review and hand over everything, with clear guidance on how to use it." }
  ],
  why: [
    {
      n: "01",
      title: "Requirement-based and affordable",
      desc: "Solutions shaped around what your business needs, with scope and cost agreed up front. No bloated packages or hidden fees."
    },
    {
      n: "02",
      title: "Multiple services, one partner",
      desc: "Websites, business tools, marketing and creative work, all in one place — handled in sync, not by three disconnected agencies."
    },
    {
      n: "03",
      title: "Transparent communication",
      desc: "Clear conversations from the first call to the final handover. You always know what is being built and why."
    }
  ],
  faq: [
    {
      q: "Who do you work with?",
      a: "We work with startups, small and medium-sized businesses, local and offline shops, and growing or established brands across India."
    },
    {
      q: "How does pricing work?",
      a: "Every business is different, so every quote is too. We start with a free consultation to understand your requirements, then agree scope and cost together. Projects are scoped and quoted individually."
    },
    {
      q: "What is the Store Management System?",
      a: "It is an internal operational tool for running your offline shop (inventory tracking, stock review, and recorded sales) — not a customer-facing e-commerce or online store."
    },
    {
      q: "Do you promise specific rankings or enquiry numbers?",
      a: "No. Outcomes depend on your business, market dynamics, and agreed scope. KeySpex does not promise specific rankings, enquiry numbers or fixed timelines."
    },
    {
      q: "Can you tailor the scope to what I actually need?",
      a: "Yes. Every project begins with your requirements. If only one service fits your current stage, that is all we will propose."
    }
  ],
  disclaimer: "Outcomes depend on your business, market and agreed scope. KeySpex does not promise specific rankings, enquiry numbers or timelines.",
  contact: {
    email: "hello@keyspex.com", // TODO: confirm
    phone: "+91 98765 43210", // TODO: confirm
    location: "India",
    availability: "Accepting new client consultations"
  }
};
