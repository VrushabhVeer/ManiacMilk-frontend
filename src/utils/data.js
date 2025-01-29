import instagram from "../assets/icons/instagram.png";
import facebook from "../assets/icons/facebook.png";
import whatsapp from "../assets/icons/whatsapp.png";
import rightUpArrow from "../assets/icons/rightUpArrow.png";
import user from "../assets/icons/userImage.png";
import call from "../assets/icons/call.png";
import email from "../assets/icons/email.png";
import location from "../assets/icons/location.png";
import leaf from "../assets/icons/leaf.png";
import farm from "../assets/icons/farm.png";
import hygiene from "../assets/icons/hygiene.png";
import process from "../assets/icons/process.png";
import antibiotics from "../assets/icons/antibiotics.png";
import cattle from "../assets/icons/cattle.png";
import comma from "../assets/icons/comma.png";

export const baseURL = import.meta.env.VITE_BASE_URL;

export const aboutContent = {
  header: "About Us",
  description:
    "Welcome to our e-commerce platform, your trusted source for fresh and pure dairy products. We are committed to delivering the highest quality milk and dairy items directly to your doorstep, ensuring health and happiness for your family.",
  highlights: [
    "Fresh milk delivered directly from our farms with strict cold-chain care to preserve its natural goodness.",
    "Naturally grazed cows, fed wholesome fodder. No hormones, antibiotics, or preservatives—just pure milk.",
    "Fresh, unprocessed milk retains more vitamins, minerals, and natural flavor.",
    "Milk is free from antibiotics and growth hormones, ensuring it’s safe and healthy.",
    "Cows are treated with care, quality feed, and comfortable living for better milk.",
  ],
  whyChooseUs:
    "We believe in the power of pure and natural dairy. Our commitment to quality begins at the farm, where every cow is cared for with love and attention. By maintaining ethical farming practices and a meticulous cold-chain process, we ensure that the milk and dairy products you receive are fresh, safe, and full of natural goodness. Join our journey to bring farm-fresh dairy to every home.",
  mission:
    "Our mission is to redefine the way people access dairy products by prioritizing health, sustainability, and community. We aim to support local farmers, reduce environmental impact, and provide our customers with the best dairy experience possible.",
  contact: {
    header: "Our Location",
    description: "Have questions or need support? We’re here to help!",
    linkText: "Contact Us >",
  },
};

export const highlightsData = [
  {
    icon: farm,
    alt: "farm",
    title: "Farm Fresh",
    description:
      "Fresh milk delivered directly from our farms with strict cold-chain care to preserve its natural goodness.",
  },
  {
    icon: hygiene,
    alt: "hygiene",
    title: "Hygienically Produced",
    description:
      "Strict hygiene protocols ensure healthy cows and high-quality milk.",
  },
  {
    icon: leaf,
    alt: "leaf",
    title: "100% Natural",
    description:
      "Naturally grazed cows, fed wholesome fodder. No hormones, antibiotics, or preservatives—just pure milk.",
  },
  {
    icon: process,
    alt: "process",
    title: "Unprocessed Milk",
    description:
      "Fresh, unprocessed milk retains more vitamins, minerals, and natural flavor.",
  },
  {
    icon: antibiotics,
    alt: "antibiotics",
    title: "No Antibiotics & Hormones",
    description:
      "Milk is free from antibiotics and growth hormones, ensuring it’s safe and healthy.",
  },
  {
    icon: cattle,
    alt: "cattle",
    title: "From Happy Cows",
    description:
      "Cows are treated with care, quality feed, and comfortable living for better milk.",
  },
];

// Footer.jsx
export const policies = [
  { text: "Privacy Policy", path: "/privacy-policy" },
  { text: "Terms & Conditions", path: "/terms-and-conditions" },
  { text: "Refund Policy", path: "/refund-policy" },
  { text: "Shipping Policy", path: "/shipping-policy" },
];

export const socialMedia = [
  {
    src: facebook,
    alt: "Facebook",
    link: "https://www.instagram.com/maniacmilk/",
  },
  {
    src: instagram,
    alt: "Instagram",
    link: "https://www.instagram.com/maniacmilk/",
  },
  { src: whatsapp, alt: "WhatsApp", link: "https://wa.me/917972344762" },
];

export const address = [
  "Maniacmilk Store,",
  "Plot No. 45, Ground Floor,",
  "Lokmanya Nagar,",
  "Karanja, Maharashtra - 444105,",
  "India"
];

// Contact.jsx
export const contactInfo = [
  { icon: call, label: "Phone", text: "+91 7972 344762", alt: "Call Icon" },
  {
    icon: email,
    label: "Email",
    text: "maniacmilkstore@gmail.com",
    alt: "Email Icon",
  },
];

export const icons = {
  rightUpArrow,
  location,
};

export const TESTIMONIALS = [
  {
    id: 1,
    rating: "★ ★ ★ ★",
    avatar: user,
    comma: comma,
    userName: "Suhas Joshi",
    description:
      "The milk is so fresh and creamy! It reminds me of the purity of farm-fresh milk we used to get in my village.",
  },
  {
    id: 2,
    rating: "★ ★ ★ ★ ★",
    avatar: user,
    comma: comma,
    userName: "Snehal Patil",
    description:
      "Loved the quality of the milk and paneer. It’s perfect for making authentic dishes.",
  },
  {
    id: 3,
    rating: "★ ★ ★ ★ ★",
    avatar: user,
    comma: comma,
    userName: "Ashwini Kulkarni",
    description:
      "The ghee is so aromatic and pure. It adds such a wonderful flavor to my Modaks and traditional sweets!",
  },
  {
    id: 4,
    rating: "★ ★ ★ ★",
    avatar: user,
    comma: comma,
    userName: "Amol Deshmukh",
    description:
      "The service is excellent, and the milk is always fresh. My morning tea has never tasted better.",
  },
  {
    id: 5,
    rating: "★ ★ ★ ★ ★",
    avatar: user,
    comma: comma,
    userName: "Swapnil Gokhale",
    description:
      "I’m very impressed with the quality of their organic milk. It’s healthy and perfect for my kids!",
  },
  {
    id: 6,
    rating: "★ ★ ★ ★",
    avatar: user,
    comma: comma,
    userName: "Shweta Bhosale",
    description:
      "Their dahi is thick and delicious. It’s perfect for making shrikhand and other desserts!",
  },
];
