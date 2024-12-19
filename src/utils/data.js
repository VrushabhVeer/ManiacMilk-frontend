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

export const baseURL = "http://localhost:8000/";

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
  "Privacy Policy",
  "Terms & Conditions",
  "Refund Policy",
  "Shipping Policy",
];

export const socialMedia = [
  { src: facebook, alt: "Facebook" },
  { src: instagram, alt: "Instagram" },
  { src: whatsapp, alt: "WhatsApp" },
];

export const address = [
  "205, Ugam tower,",
  "Shantinagar, Gandhi Marg,",
  "Karanja, Maharashtra 444105.",
];

// Contact.jsx
export const contactInfo = [
  { icon: call, label: "Phone", text: "+91 9067543208", alt: "Call Icon" },
  {
    icon: email,
    label: "Email",
    text: "support@example.com",
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
    comma:comma,
    userName: "Suhas Joshi",
    description:
      "The milk is so fresh and creamy! It reminds me of the purity of farm-fresh milk we used to get in my village.",
  },
  {
    id: 2,
    rating: "★ ★ ★ ★ ★",
    avatar: user,
    comma:comma,
    userName: "Snehal Patil",
    description:
      "Loved the quality of the milk and paneer. It’s perfect for making authentic dishes.",
  },
  {
    id: 3,
    rating: "★ ★ ★ ★ ★",
    avatar: user,
    comma:comma,
    userName: "Ashwini Kulkarni",
    description:
      "The ghee is so aromatic and pure. It adds such a wonderful flavor to my Modaks and traditional sweets!",
  },
  {
    id: 4,
    rating: "★ ★ ★ ★",
    avatar: user,
    comma:comma,
    userName: "Amol Deshmukh",
    description:
      "The service is excellent, and the milk is always fresh. My morning tea has never tasted better.",
  },
  {
    id: 5,
    rating: "★ ★ ★ ★ ★",
    avatar: user,
    comma:comma,
    userName: "Swapnil Gokhale",
    description:
      "I’m very impressed with the quality of their organic milk. It’s healthy and perfect for my kids!",
  },
  {
    id: 6,
    rating: "★ ★ ★ ★",
    avatar: user,
    comma:comma,
    userName: "Shweta Bhosale",
    description:
      "Their dahi is thick and delicious. It’s perfect for making shrikhand and other desserts!",
  },
];
