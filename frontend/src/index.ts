// import image slide
import Image1 from "../src/assets/hero/women.png";
import Image2 from "../src/assets/hero/sale.png";
import Image3 from "../src/assets/hero/shopping.png";

// import image product
import Img1 from "../src/assets/women/women.png";
import Img2 from "../src/assets/women/women2.jpg";
import Img3 from "../src/assets/women/women3.jpg";
import Img4 from "../src/assets/women/women4.jpg";

// import image top product
import Shirt1 from "../src/assets/shirt/shirt.png";
import Shirt2 from "../src/assets/shirt/shirt2.png";
import Shirt3 from "../src/assets/shirt/shirt3.png";

// Component Header (Navbar)

// Define your menu items
const menuItems = [
  { id: 1, label: "Home", link: "/home" },
  { id: 2, label: "Product", link: "/products" },
  { id: 3, label: "About", link: "/about" },
  { id: 4, label: "Contact", link: "/contact" },
  { id: 5, label: "Blog", link: "/blog" },
];

const Dropdown = [
  // { id: 1, label: 'Treding Product', link: '#' },
  { id: 2, label: "New Product", link: "#" },
  { id: 3, label: "Best Selling", link: "#" },
  { id: 4, label: "Best Rated", link: "#" },
];

// Component Hero

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Upto 50% off on all Men's Wear",
    description:
      "lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    img: Image2,
    title: "30% off on all Women's Wear",
    description:
      "Who's there lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: Image3,
    title: "70% off on all Products Sale",
    description:
      "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

// Component Products

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Women Ethnic",
    rating: 5.0,
    color: "white",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img2,
    title: "Women western",
    rating: 4.5,
    color: "Red",
    aosDelay: "200",
  },
  {
    id: 3,
    img: Img3,
    title: "Goggles",
    rating: 4.7,
    color: "brown",
    aosDelay: "400",
  },
  {
    id: 4,
    img: Img4,
    title: "Printed T-Shirt",
    rating: 4.4,
    color: "Yellow",
    aosDelay: "600",
  },
  {
    id: 5,
    img: Img2,
    title: "Fashin T-Shirt",
    rating: 4.5,
    color: "Pink",
    aosDelay: "800",
  },
];

// Component Top Products
const TopProductsData = [
  {
    id: 1,
    img: Shirt1,
    title: "Casual Wear",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    img: Shirt2,
    title: "Printed shirt",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: Shirt3,
    title: "Women shirt",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

// Testimonial Data
const TestimonialData = [
  {
    id: 1,
    name: "Victor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Satya Nadella",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Virat Kohli",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 5,
    name: "Sachin Tendulkar",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/103/103",
  },
];

// Footer link data
const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];

// Profile
const Profile = [
  {
    id: 1,
    label: "Profile",
    link: "/profile",
  },
  {
    id: 2,
    label: "Logout",
    link: "/logout",
  },
];

// Export
export const Menu = menuItems;
export const DropdownMenu = Dropdown;
export const ImageListSection = ImageList;
export const Products = ProductsData;
export const TopProducts = TopProductsData;
export const Testimonial = TestimonialData;
export const FooterLink = FooterLinks;
export const ProfileMenu = Profile;
