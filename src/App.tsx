import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck, 
  Leaf,
  Clock,
  Package,
  RotateCcw,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight,
  ChevronLeft,
  User,
  Phone,
  MapPin,
  CheckCircle2,
  Box,
  Truck,
  Heart
} from "lucide-react";

// Image constants
const HERO_IMAGES = [
  "/src/assets/images/rolex_gold_daydate_1777619061428.png",
  "/src/assets/images/seiko_new_luxury.png",
  "/src/assets/images/luxury_sneakers_black_1777619390059.png",
  "/src/assets/images/baggy_jeans_dark_1777619408317.png",
  "/src/assets/images/aesthetic_outfit_mood_1777619427376.png"
];

const QR_CODE = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=ansumanverma@fam&pn=Honeys%20Fashion&am=999&cu=INR";

type Category = "Watches" | "Shoes" | "Baggy Jeans" | "Aesthetic Outfits";
const CATEGORIES: Category[] = ["Watches", "Shoes", "Baggy Jeans", "Aesthetic Outfits"];


const PRODUCTS = [
  // WATCHES (10 total: 5 Rolex Style, 5 Seiko Style)
  { id: 1, category: "Watches" as Category, brand: "Rolex Style", name: "Datejust Ebony Mod", price: 999, images: ["/src/assets/images/rolex_classic_dark_1777619040163.png", "/src/assets/images/rolex_gold_daydate_1777619061428.png"], description: "Fluted bezel, Jubilee bracelet, precision automatic.", specs: ["41mm Case", "Sapphire Glass", "Date Display"] },
  { id: 2, category: "Watches" as Category, brand: "Rolex Style", name: "Day-Date Presidential Gold", price: 999, images: ["/src/assets/images/rolex_gold_daydate_1777619061428.png", "/src/assets/images/rolex_classic_dark_1777619040163.png"], description: "Full gold finish, the peak of presidential luxury.", specs: ["36mm Case", "Gold-Plated Steel", "Day-Date Window"] },
  { id: 3, category: "Watches" as Category, brand: "Rolex Style", name: "Submariner Hulk Edition", price: 999, images: ["/src/assets/images/rolex_submariner_hulk_1777619078004.png", "/src/assets/images/rolex_pepsi_gmt_1777619093643.png"], description: "Deep green sunburst dial with matching ceramic bezel.", specs: ["40mm Case", "Ceramic Insert", "Oyster Braclet"] },
  { id: 4, category: "Watches" as Category, brand: "Rolex Style", name: "GMT Master II Pepsi", price: 999, images: ["/src/assets/images/rolex_pepsi_gmt_1777619093643.png", "/src/assets/images/rolex_submariner_hulk_1777619078004.png"], description: "Iconic red and blue bezel for the modern traveler.", specs: ["40mm Case", "Jubilee Band", "GMT Movement"] },
  { id: 5, category: "Watches" as Category, brand: "Rolex Style", name: "Yacht-Master Oysterflex", price: 999, images: ["/src/assets/images/rolex_yacht_master_rose_1777619110502.png", "/src/assets/images/rolex_classic_dark_1777619040163.png"], description: "Rose gold luxury paired with a sporty matte black strap.", specs: ["40mm Case", "Matte Ceramic", "Flexible Strap"] },
  { id: 6, category: "Watches" as Category, brand: "Seiko Style", name: "Prospex Turtle Stealth", price: 999, images: ["/src/assets/images/seiko_prospex_turtle_1777619127382.png", "/src/assets/images/seiko_alpinist_green_1777619144101.png"], description: "Rugged professional diver with the classic cushion case.", specs: ["44mm Case", "NH35 Automatic", "High Lume"] },
  { id: 7, category: "Watches" as Category, brand: "Seiko Style", name: "Alpinist Emerald Gold", price: 999, images: ["/src/assets/images/seiko_alpinist_green_1777619144101.png", "/src/assets/images/seiko_prospex_turtle_1777619127382.png"], description: "Internal compass bezel and signature green dial.", specs: ["38mm Case", "Leather Strap", "Sunburst Finish"] },
  { id: 8, category: "Watches" as Category, brand: "Seiko Style", name: "Presage Cocktail Moon", price: 999, images: ["/src/assets/images/seiko_presage_cocktail_1777619160466.png", "/src/assets/images/seiko_5_sports_stealth_1777619177377.png"], description: "Elegant radiating dial inspired by the Blue Moon cocktail.", specs: ["40mm Case", "Honed Indices", "Silver Case"] },
  { id: 9, category: "Watches" as Category, brand: "Seiko Style", name: "5 Sports Dark Stealth", price: 999, images: ["/src/assets/images/seiko_5_sports_stealth_1777619177377.png", "/src/assets/images/seiko_presage_cocktail_1777619160466.png"], description: "All-black tactical mod with a minimalist aesthetic.", specs: ["42mm Case", "PVD Finish", "Dark Grey Lume"] },
  { id: 10, category: "Watches" as Category, brand: "Seiko Style", name: "King Seiko Heritage", price: 999, images: ["/src/assets/images/seiko_king_vintage_1777619196033.png", "/src/assets/images/seiko_alpinist_green_1777619144101.png"], description: "A sharp, vintage-inspired dress watch with angular lugs.", specs: ["37mm Case", "Linear Dial", "Classic Leather"] },
  { id: 20, category: "Watches" as Category, brand: "Seiko Style", name: "Seiko Mod 'Grand' Edition", price: 999, images: ["/src/assets/images/seiko_new_luxury.png", "/src/assets/images/seiko_king_vintage_1777619196033.png"], description: "Premium sunburst dial with high-polish indices and precision modded movement.", specs: ["40mm Case", "Grand Style Dial", "Stainless Steel"] },
  
  // SHOES
  { id: 11, category: "Shoes" as Category, brand: "Honey's Elite", name: "Phantom Leather Sneakers", price: 999, images: ["/src/assets/images/luxury_sneakers_black_1777619390059.png", "/src/assets/images/luxury_sneakers_black_1777619390059.png"], description: "Handcrafted matte black leather for the ultimate minimal look.", specs: ["Calfskin Leather", "Italian Stitching"] },
  { id: 12, category: "Shoes" as Category, brand: "Honey's Elite", name: "Onyx Street Runner", price: 999, images: ["/src/assets/images/luxury_sneakers_black_1777619390059.png", "/src/assets/images/luxury_sneakers_black_1777619390059.png"], description: "Proprietary foam technology meeting high-end fashion design.", specs: ["Comfort Insole", "Breathable Mesh"] },
  { id: 13, category: "Shoes" as Category, brand: "Honey's Elite", name: "Stealth Hi-Top", price: 999, images: ["/src/assets/images/luxury_sneakers_black_1777619390059.png", "/src/assets/images/luxury_sneakers_black_1777619390059.png"], description: "The iconic hi-top silhouette redefined in premium materials.", specs: ["Premium Suede", "Ankle Support"] },
  
  // JEANS
  { id: 14, category: "Baggy Jeans" as Category, brand: "Urban Mood", name: "Midnight Baggy Denim", price: 999, images: ["/src/assets/images/baggy_jeans_dark_1777619408317.png", "/src/assets/images/baggy_jeans_dark_1777619408317.png"], description: "Perfectly oversized with a structured architecture.", specs: ["14oz Denim", "Deep Charcoal Wash"] },
  { id: 15, category: "Baggy Jeans" as Category, brand: "Urban Mood", name: "Washed Slate Oversized", price: 999, images: ["/src/assets/images/baggy_jeans_dark_1777619408317.png", "/src/assets/images/baggy_jeans_dark_1777619408317.png"], description: "A relaxed drape that defines the modern streetwear look.", specs: ["Relaxed Taper", "Reinforced Hem"] },
  { id: 16, category: "Baggy Jeans" as Category, brand: "Urban Mood", name: "Tactical Denim Baggy", price: 999, images: ["/src/assets/images/baggy_jeans_dark_1777619408317.png", "/src/assets/images/baggy_jeans_dark_1777619408317.png"], description: "Combining utility aesthetics with classic baggy fits.", specs: ["Multi-pocket", "YKK Hardware"] },

  // OUTFITS
  { id: 17, category: "Aesthetic Outfits" as Category, brand: "Honeys Design", name: "Shadowbox Hoodie Set", price: 999, images: ["/src/assets/images/aesthetic_outfit_mood_1777619427376.png", "/src/assets/images/aesthetic_outfit_mood_1777619427376.png"], description: "The full dark ensemble: Oversized hoodie and tech cargos.", specs: ["Heavyweight Cotton", "Relaxed Fit"] },
  { id: 18, category: "Aesthetic Outfits" as Category, brand: "Honeys Design", name: "Minimalist Lounge Ensemble", price: 999, images: ["/src/assets/images/aesthetic_outfit_mood_1777619427376.png", "/src/assets/images/aesthetic_outfit_mood_1777619427376.png"], description: "Luxury loungewear designed for high-end aesthetic comfort.", specs: ["Silk-touch Fabric", "Clean Silhouettes"] }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category>("Watches");
  
  const [checkoutStep, setCheckoutStep] = useState<"detail" | "shipping" | "payment">("detail");
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [formData, setFormData] = useState({ name: "", number: "", address: "" });

  useEffect(() => {
    if (showCheckout || isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showCheckout, isMenuOpen]);

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    setCheckoutStep("payment");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleBuyNow = (product: typeof PRODUCTS[0]) => {
    setSelectedProduct(product);
    setActiveGalleryIndex(0);
    setCheckoutStep("detail");
    setShowCheckout(true);
  };

  const filteredProducts = PRODUCTS.filter(p => p.category === currentCategory);

  return (
    <div className={`min-h-screen transition-all duration-700 ${currentCategory === "Aesthetic Outfits" ? "bg-zinc-50 text-black" : "bg-rich-black text-white"} selection:bg-gold selection:text-black font-sans leading-relaxed luxury-bg`}>
      {/* Dynamic Header */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 md:px-12 px-6 flex justify-between items-center ${
          isScrolled 
            ? (currentCategory === "Aesthetic Outfits" ? "bg-white/95 backdrop-blur-3xl border-b border-zinc-200 py-4 shadow-sm" : "bg-rich-black/95 backdrop-blur-3xl border-b border-white/10 py-4") 
            : "bg-transparent py-8"
        }`}
      >
        <div className="flex items-center gap-10">
          <button onClick={() => setIsMenuOpen(true)} className="group relative">
            <Menu className={`w-7 h-7 transition-colors ${currentCategory === "Aesthetic Outfits" ? "text-black hover:text-gold" : "text-white hover:text-gold"}`} />
          </button>
          <a href="#" className="font-display font-extrabold text-2xl tracking-[0.05em] flex items-center gap-2">
            HONEYSFASHION<span className="text-gold italic">.STORE</span>
          </a>
        </div>

        <nav className="hidden xl:flex items-center gap-12 text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              onClick={() => setCurrentCategory(cat)}
              className={`hover:text-white transition-all relative py-2 ${currentCategory === cat ? "text-gold" : ""}`}
            >
              {cat}
              {currentCategory === cat && <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 w-full h-[2px] bg-gold rounded-full" />}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          {/* Direct checkout model - cart removed */}
        </div>
      </header>

      {/* Side Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[60]" />
            <motion.div 
              initial={{ x: "-100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "-100%" }} 
              transition={{ type: "spring", damping: 35, stiffness: 350 }}
              className="fixed top-0 left-0 h-full w-full max-w-lg bg-rich-black z-[70] p-16 border-r border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-24">
                <span className="font-display font-black text-xs tracking-[0.5em] text-gold uppercase underline decoration-gold/20 underline-offset-8 italic">Curated Collection</span>
                <button onClick={() => setIsMenuOpen(false)} className="hover:rotate-180 transition-transform duration-700">
                  <X className="w-8 h-8" />
                </button>
              </div>
              <ul className="space-y-10 text-4xl md:text-6xl font-display font-light">
                {CATEGORIES.map((item, i) => (
                  <motion.li key={item} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                    <button 
                      onClick={() => { setCurrentCategory(item); setIsMenuOpen(false); }} 
                      className={`hover:text-gold transition-all duration-300 block text-left group w-full ${currentCategory === item ? "text-gold italic font-medium" : "text-white"}`}
                    >
                      {item}
                      <ArrowRight className="inline-block ml-4 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8" />
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="absolute bottom-16 left-16 space-y-6">
                <div className="h-[1px] w-24 bg-gold/30" />
                <p className="text-zinc-600 text-xs tracking-widest font-medium italic">LUXURY REDEFINED • 2024</p>
                <div className="flex gap-6">
                  <Instagram className="w-5 h-5 text-zinc-500 hover:text-white" />
                  <Facebook className="w-5 h-5 text-zinc-500 hover:text-white" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Reduced Main Slider */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-rich-black pt-24 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.2, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: -20 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-0"
            style={{ perspective: "2000px" }}
          >
            <img src={HERO_IMAGES[activeSlide]} alt="Luxury Banner" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-rich-black/40 via-transparent to-rich-black" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div key={`hero-${activeSlide}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <span className="text-gold font-display font-medium text-[10px] tracking-[0.8em] uppercase block mb-10">Limited Release Collection</span>
            <h1 className="text-5xl md:text-9xl font-display font-black tracking-tighter leading-[0.85] mb-12">
              <span className="text-white">PREMIUM</span><br/>
              <span className="italic">LUXURY COLLECTION</span>
            </h1>
            <div className="flex justify-center">
              <a href="#collections" className="group bg-white text-black px-14 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-gold transition-all duration-500 flex items-center gap-4 text-xs">
                Explore The Shop <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 flex gap-4 z-20">
          {HERO_IMAGES.map((_, i) => (
            <button key={i} onClick={() => setActiveSlide(i)} className={`w-8 h-[2px] transition-all rounded-full ${activeSlide === i ? "bg-gold w-16" : "bg-white/20"}`} />
          ))}
        </div>
      </section>

      {/* Advantage Banner */}
      <section className={`transition-all duration-700 backdrop-blur-md border-y py-16 px-6 ${currentCategory === "Aesthetic Outfits" ? "bg-white/50 border-zinc-200" : "bg-rich-black/50 border-white/5"}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: Truck, title: "2-3 Days Shipping", desc: "Express delivery across the nation." },
            { icon: Box, title: "Open Box Delivery", desc: "Verify your order upon arrival." },
            { icon: RotateCcw, title: "7 Days Returns", desc: "Total peace of mind with easy returns." },
            { icon: Leaf, title: "Eco-Friendly Elite", desc: "Sustainably crafted luxury vibes." }
          ].map((item, i) => (
            <motion.div whileHover={{ y: -5 }} key={i} className="flex flex-col items-center text-center space-y-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-2 transition-all duration-500 ${currentCategory === "Aesthetic Outfits" ? "bg-zinc-50 border-zinc-200 hover:border-gold" : "bg-white/5 border-white/10 hover:border-gold/50"}`}>
                <item.icon className="w-7 h-7 text-gold" />
              </div>
              <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] ${currentCategory === "Aesthetic Outfits" ? "text-black" : "text-white"}`}>{item.title}</h4>
              <p className={`text-[10px] font-bold max-w-[150px] ${currentCategory === "Aesthetic Outfits" ? "text-zinc-400" : "text-zinc-500"}`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Category Navigation Bar */}
      <div className={`sticky top-16 md:top-24 z-40 backdrop-blur-2xl border-b transition-all duration-700 px-6 ${currentCategory === "Aesthetic Outfits" ? "bg-white/80 border-zinc-200" : "bg-rich-black/80 border-white/10"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-8 py-6 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setCurrentCategory(cat)}
              className={`whitespace-nowrap text-[9px] uppercase tracking-[0.3em] font-black px-8 py-3 rounded-full border transition-all duration-500 hover:scale-105 ${
                currentCategory === cat ? "bg-gold border-gold text-black shadow-lg shadow-gold/20" : 
                (currentCategory === "Aesthetic Outfits" ? "border-zinc-200 text-zinc-400 hover:border-zinc-400" : "border-white/10 text-zinc-500 hover:border-white/30")
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <section id="collections" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div>
              <span className={`font-display font-black text-[10px] tracking-[0.6em] uppercase block mb-6 italic underline decoration-gold/10 underline-offset-8 ${currentCategory === "Aesthetic Outfits" ? "text-zinc-400" : "text-gold"}`}>Signature Series</span>
              <h2 className={`text-4xl md:text-7xl font-display font-light italic ${currentCategory === "Aesthetic Outfits" ? "text-black" : "text-white"}`}>The <span className={`font-black not-italic ${currentCategory === "Aesthetic Outfits" ? "text-black" : "text-white"}`}>{currentCategory} Collection</span></h2>
            </div>
            <div className={`uppercase tracking-widest text-[10px] font-bold ${currentCategory === "Aesthetic Outfits" ? "text-zinc-400" : "text-zinc-500"}`}>Exclusive Price: <span className="text-gold text-2xl font-black ml-2">₹999</span></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {filteredProducts.map((product) => (
              <motion.div 
                layout 
                key={product.id} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                transition={{ duration: 0.8 }} 
                className="group cursor-pointer perspective-1000"
                onClick={() => handleBuyNow(product)}
              >
                <div className={`relative aspect-[1/1] overflow-hidden rounded-3xl mb-10 border transition-all duration-500 shadow-2xl backdrop-blur-sm ${currentCategory === "Aesthetic Outfits" ? "bg-white border-zinc-100 group-hover:shadow-zinc-200" : "bg-white/5 border-white/10 group-hover:shadow-gold/10 group-hover:border-gold/30"}`}>
                  <motion.div 
                    className="w-full h-full"
                    whileHover={{ rotateY: 15, rotateX: -5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  </motion.div>
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none ${currentCategory === "Aesthetic Outfits" ? "bg-zinc-100/20" : "bg-rich-black/20"}`}>
                    <span className={`text-[10px] font-black uppercase tracking-[0.4em] italic ${currentCategory === "Aesthetic Outfits" ? "text-black/60" : "text-white/50"}`}>View Archive</span>
                  </div>
                  <div className={`absolute top-6 left-6 backdrop-blur-xl px-5 py-2 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] italic ${currentCategory === "Aesthetic Outfits" ? "bg-white/80 border-zinc-200 text-black" : "bg-rich-black/80 border-white/10 text-white"}`}>
                    {product.brand}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); /* Future wishlist logic */ }}
                    className={`absolute top-6 right-6 p-3 rounded-full transition-colors group/heart border ${currentCategory === "Aesthetic Outfits" ? "bg-zinc-50 border-zinc-100 hover:bg-gold/10" : "bg-white/5 border-white/5 hover:bg-gold/20"}`}
                  >
                    <Heart className={`w-5 h-5 transition-colors ${currentCategory === "Aesthetic Outfits" ? "text-zinc-300 group-hover/heart:text-gold" : "text-zinc-500 group-hover/heart:text-gold"}`} />
                  </button>
                </div>
                <div className="flex justify-between items-start px-4">
                  <div className="flex-1">
                    <h3 className={`font-display font-bold text-2xl mb-2 italic tracking-tight ${currentCategory === "Aesthetic Outfits" ? "text-black" : "text-white"}`}>{product.name}</h3>
                    <p className={`text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-2 ${currentCategory === "Aesthetic Outfits" ? "text-zinc-400" : "text-zinc-500"}`}>
                       Archive Entry <span className="w-1 h-1 bg-gold rounded-full" /> Verified
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-black ${currentCategory === "Aesthetic Outfits" ? "text-black" : "text-gold"}`}>₹999</span>
                    <p className={`text-[10px] line-through font-bold ${currentCategory === "Aesthetic Outfits" ? "text-zinc-300" : "text-zinc-600"}`}>₹4,999</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Experience */}
      <AnimatePresence>
        {showCheckout && selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-12 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { if(!isSuccess) setShowCheckout(false); }} className="fixed inset-0 bg-black/98 backdrop-blur-3xl" />
            
            <motion.div 
              key={selectedProduct.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }} 
              className="relative w-full max-w-6xl bg-white border border-zinc-200 rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-[0_40px_100px_rgba(0,0,0,0.15)] my-4 md:my-0 md:max-h-[85vh]"
            >
              {isSuccess ? (
                <div className="w-full py-20 md:py-32 px-8 md:px-16 text-center flex flex-col items-center justify-center bg-white overflow-y-auto">
                  <CheckCircle2 className="w-16 h-16 md:w-24 md:h-24 text-gold mb-8 md:mb-12 animate-bounce" />
                  <h2 className="text-4xl md:text-7xl font-display font-black mb-6 md:mb-8 italic tracking-tighter text-black">ORDER SECURED.</h2>
                  <p className="text-zinc-500 text-base md:text-xl max-w-xl mb-10 md:mb-16 leading-relaxed uppercase tracking-widest font-black italic">Congrats <span className="text-black font-black">{formData.name}</span>! Your <span className="text-gold font-black">{selectedProduct.name}</span> has been secured. Our team will dispatch it today. Expect delivery in 2-3 days.</p>
                  <button onClick={() => { setShowCheckout(false); setIsSuccess(false); setFormData({name: "", number: "", address: ""}); }} className="bg-black text-white px-12 md:px-16 py-4 md:py-5 rounded-full font-black uppercase tracking-widest transition-all hover:bg-gold hover:scale-105 active:scale-95 shadow-xl text-xs">Return To Store</button>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row w-full overflow-hidden">
                  {/* Sidebar - Detailed Order Summary / Detail Gallery - ONLY SHOWN IN DETAIL STEP */}
                  {checkoutStep === "detail" && (
                    <div className="w-full md:w-5/12 p-6 md:p-12 bg-zinc-50 border-b md:border-b-0 md:border-r border-zinc-100 flex flex-col shadow-inner overflow-y-auto md:max-h-full">
                      <div className="mb-6 md:mb-8">
                        <span className="text-[10px] text-zinc-400 uppercase tracking-[0.4em] font-black italic block mb-4">
                          Archive View
                        </span>
                        <div className="relative group/modal inline-block w-full">
                          <AnimatePresence mode="wait">
                            <motion.img 
                              key={`${selectedProduct.id}-${activeGalleryIndex}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              src={selectedProduct.images[activeGalleryIndex]} 
                              alt={selectedProduct.name} 
                              className="w-full aspect-square object-cover rounded-3xl shadow-xl ring-1 ring-zinc-200" 
                            />
                          </AnimatePresence>
                        </div>
                        
                        <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar py-2">
                          {selectedProduct.images.map((img, i) => (
                            <button 
                              key={i} 
                              onClick={() => setActiveGalleryIndex(i)}
                              className={`w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeGalleryIndex === i ? "border-gold scale-105" : "border-zinc-100 opacity-50"}`}
                            >
                              <img src={img} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-6 flex-1">
                        <div>
                          <h2 className="text-2xl font-display font-black tracking-tight mb-2 text-black">{selectedProduct.name}</h2>
                          <p className="text-zinc-400 text-[10px] uppercase tracking-widest font-black italic">Archive Series • {selectedProduct.category}</p>
                        </div>

                        <div className="pt-6 border-t border-zinc-100 space-y-4">
                          <div className="space-y-3">
                            <p className="text-xs text-zinc-500 italic font-medium">"{selectedProduct.description}"</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedProduct.specs.map((s, i) => (
                                <span key={i} className="text-[8px] bg-zinc-100 border border-zinc-200 px-2 py-1 rounded-full text-zinc-600 uppercase tracking-widest font-black italic">{s}</span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="pt-6 border-t border-zinc-200 flex justify-between items-center text-xl font-display font-black italic">
                            <span className="text-black">Subtotal</span>
                            <span className="text-black">₹999</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 p-4 bg-zinc-100 rounded-2xl border border-zinc-200">
                        <div className="flex items-center gap-3 text-[9px] font-black text-black uppercase tracking-[0.2em] italic">
                          <ShieldCheck className="w-4 h-4 text-gold" /> Authenticity Verified
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Main Content Area */}
                  <div className={`w-full ${checkoutStep === "detail" ? "md:w-7/12" : "md:w-full"} p-6 md:p-12 overflow-y-auto bg-white flex flex-col`}>
                    <div className="flex justify-between items-start mb-8 md:mb-12">
                      <div className="space-y-4 md:space-y-6">
                        <h3 className="text-xl md:text-2xl font-display font-black italic tracking-tighter text-black">
                          {checkoutStep === "detail" ? "SPECIFICATIONS" : "ACQUISITION"}
                        </h3>
                        {/* Progress Stepper */}
                        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto no-scrollbar">
                          <div className={`flex items-center gap-2 text-[7px] md:text-[8px] uppercase tracking-[0.15em] font-black transition-all ${checkoutStep === "detail" ? "text-gold" : "text-zinc-300"}`}>
                            <span className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center transition-all ${checkoutStep === "detail" ? "border-gold bg-gold/10" : "border-zinc-200"}`}>1</span>
                            Review
                          </div>
                          <div className="w-4 md:w-8 h-[1px] bg-zinc-100" />
                          <div className={`flex items-center gap-2 text-[7px] md:text-[8px] uppercase tracking-[0.15em] font-black transition-all ${checkoutStep === "shipping" ? "text-gold" : "text-zinc-300"}`}>
                            <span className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center transition-all ${checkoutStep === "shipping" ? "border-gold bg-gold/10" : "border-zinc-200"}`}>2</span>
                            Logistic
                          </div>
                          <div className="w-4 md:w-8 h-[1px] bg-zinc-100" />
                          <div className={`flex items-center gap-2 text-[7px] md:text-[8px] uppercase tracking-[0.15em] font-black transition-all ${checkoutStep === "payment" ? "text-gold" : "text-zinc-300"}`}>
                            <span className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center transition-all ${checkoutStep === "payment" ? "border-gold bg-gold/10" : "border-zinc-200"}`}>3</span>
                            Settlement
                          </div>
                        </div>
                      </div>
                      <button onClick={() => setShowCheckout(false)} className="group p-2 hover:bg-zinc-100 rounded-full transition-all"><X className="w-6 h-6 md:w-8 md:h-8 text-zinc-400 group-hover:text-black group-hover:rotate-90 transition-all duration-500" /></button>
                    </div>

                    <AnimatePresence mode="wait">
                      {checkoutStep === "detail" ? (
                        <motion.div 
                          key="detail-step"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          className="flex flex-col flex-1 space-y-8 md:space-y-12"
                        >
                          <div className="space-y-8 md:space-y-10">
                            {/* Specifications listed in sidebar summary already, but we can add more info here if needed */}
                            <div className="space-y-6">
                              <h4 className="text-[10px] md:text-sm font-black uppercase tracking-[0.3em] italic text-gold">Impeccable Pedigree</h4>
                              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed italic font-medium">This curated selection represents the pinnacle of aesthetic engineering. Every component has been meticulously evaluated for architectural integrity and visual impact.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                                <span className="block text-[8px] text-zinc-400 uppercase tracking-widest mb-1 font-black italic">Quality Check</span>
                                <span className="text-[10px] text-black font-black uppercase italic">Certified</span>
                              </div>
                              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                                <span className="block text-[8px] text-zinc-400 uppercase tracking-widest mb-1 font-black italic">Assurance</span>
                                <span className="text-[10px] text-black font-black uppercase italic">Limited</span>
                              </div>
                            </div>
                          </div>

                          <button 
                            onClick={() => setCheckoutStep("shipping")}
                            className="bg-black text-white py-4 md:py-5 rounded-full font-black uppercase tracking-[0.2em] hover:bg-gold transition-all duration-500 shadow-2xl mt-auto text-[10px] md:text-xs"
                          >
                            Initiate Transfer • ₹999
                          </button>
                        </motion.div>
                      ) : checkoutStep === "shipping" ? (
                        <motion.div 
                          key="shipping-step"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8 md:space-y-12 flex-1"
                        >
                          <form onSubmit={handleNextStep} className="space-y-6 md:space-y-8">
                            <div className="space-y-3 md:space-y-4">
                              <label className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] flex items-center gap-3 italic"><User className="w-3 md:w-4 h-3 md:h-4 text-gold" /> Direct Recipient</label>
                              <input required type="text" placeholder="FULL NAME" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 md:p-5 focus:border-gold outline-none transition-all placeholder:text-zinc-300 font-black italic text-sm text-black" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                            </div>
                            <div className="space-y-3 md:space-y-4">
                              <label className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] flex items-center gap-3 italic"><Phone className="text-gold w-3 md:w-4 h-3 md:h-4" /> Secure Channel</label>
                              <input required type="tel" placeholder="10-DIGIT MOBILE" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 md:p-5 focus:border-gold outline-none transition-all placeholder:text-zinc-300 font-black italic text-sm text-black" value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} />
                            </div>
                            <div className="space-y-3 md:space-y-4">
                              <label className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] flex items-center gap-3 italic"><MapPin className="w-3 md:w-4 h-3 md:h-4 text-gold" /> Drop Location</label>
                              <textarea required rows={3} placeholder="COMPLETE ADDRESS WITH PINCODE" className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 md:p-5 focus:border-gold outline-none transition-all placeholder:text-zinc-300 font-black italic resize-none text-sm text-black" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                            </div>
                            
                            <div className="flex gap-4">
                              <button type="button" onClick={() => setCheckoutStep("detail")} className="w-1/4 border border-zinc-100 rounded-full text-zinc-300 hover:text-black transition-colors">
                                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 mx-auto" />
                              </button>
                              <button type="submit" className="flex-1 bg-black text-white py-4 md:py-5 rounded-full font-black uppercase tracking-[0.2em] hover:bg-gold transition-all duration-500 shadow-2xl text-[10px] md:text-xs">
                                Confirm Logistics
                              </button>
                            </div>
                          </form>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="payment-step"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex flex-col flex-1 space-y-8 md:space-y-10"
                        >
                          <div className="flex items-center justify-between">
                            <button onClick={() => setCheckoutStep("shipping")} className="text-[8px] md:text-[10px] text-zinc-400 uppercase tracking-widest font-black hover:text-black flex items-center gap-2 transition-colors">
                              <ChevronLeft className="w-3 md:w-4 h-3 md:h-4" /> Revise Logistics
                            </button>
                            <div className="text-[8px] md:text-[9px] text-gold uppercase tracking-[0.4em] font-black italic">Transmission Active</div>
                          </div>

                          <div className="p-8 md:p-12 bg-zinc-50 border-2 border-gold/20 rounded-[2rem] md:rounded-[3rem] flex flex-col items-center text-center space-y-8 md:space-y-10 relative shadow-xl">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />
                            
                            <div className="space-y-2 md:space-y-3">
                              <h4 className="text-2xl md:text-3xl font-display font-black italic tracking-widest text-black uppercase">Settlement Protocol</h4>
                              <p className="text-[8px] md:text-[10px] text-zinc-400 font-black uppercase tracking-[0.4em] italic">UP-ID: ansumanverma@fam</p>
                            </div>

                            <div className="relative">
                              <div className="absolute -inset-6 md:-inset-10 bg-gold/5 blur-3xl rounded-full opacity-60 animate-pulse" />
                              <img src={QR_CODE} alt="UPI QR" className="relative w-48 h-48 md:w-56 md:h-56 p-4 md:p-6 bg-[#fde7cf] rounded-[1.5rem] md:rounded-[2rem] shadow-[0_20px_50px_rgba(212,175,55,0.1)] border-4 border-gold/10" />
                            </div>

                            <div className="space-y-4 max-w-sm">
                              <p className="text-[10px] md:text-[11px] text-zinc-400 font-black uppercase tracking-[0.2em] leading-relaxed italic animate-pulse">
                                Awaiting confirmation...
                              </p>
                            </div>

                            <button 
                              onClick={() => setIsSuccess(true)}
                              className="w-full bg-black text-white py-4 md:py-6 rounded-full font-black uppercase tracking-[0.2em] hover:bg-gold transition-all duration-500 shadow-xl transform active:scale-95 text-[10px] md:text-xs"
                            >
                              Finalize Payment • ₹999
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Luxury Footer */}
      <footer className="bg-black pt-32 pb-16 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-24">
          <div className="max-w-xl">
            <h2 className="font-display font-black text-4xl tracking-tight text-white mb-8">HONEYSFASHION<span className="text-gold italic">.STORE</span></h2>
            <p className="text-zinc-600 text-lg leading-relaxed mb-12 italic font-light">Defining the intersection of minimalist luxury and tactical street architecture. Curated for the few, delivered for the bold.</p>
            <div className="flex gap-10">
              <Instagram className="w-6 h-6 text-zinc-500 hover:text-gold cursor-pointer transition-all" />
              <Facebook className="w-6 h-6 text-zinc-500 hover:text-gold cursor-pointer transition-all" />
              <Twitter className="w-6 h-6 text-zinc-500 hover:text-gold cursor-pointer transition-all" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-24 sm:gap-40">
            <div>
              <h4 className="text-gold font-black text-[11px] uppercase tracking-[0.5em] mb-12 italic">Directives</h4>
              <ul className="space-y-6 text-zinc-600 text-[11px] uppercase tracking-[0.25em] font-black italic">
                <li><a href="#" className="hover:text-white transition-all">Heritage Story</a></li>
                <li><a href="#" className="hover:text-white transition-all">Track Logistics</a></li>
                <li><a href="#" className="hover:text-white transition-all">Bulk Request</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gold font-black text-[11px] uppercase tracking-[0.5em] mb-12 italic">Security</h4>
              <ul className="space-y-6 text-zinc-600 text-[11px] uppercase tracking-[0.25em] font-black italic">
                <li><a href="#" className="hover:text-white transition-all">7 Day Pledge</a></li>
                <li><a href="#" className="hover:text-white transition-all">Logistics Policy</a></li>
                <li><a href="#" className="hover:text-white transition-all">Internal Protocol</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center text-[10px] text-zinc-700 uppercase tracking-[0.5em] font-black italic">
          <p>&copy; 2024 HONEYSFASHION.STORE • BUILT WITH ARCHITECTURAL PRECISION</p>
          <div className="flex gap-10 mt-6 md:mt-0 opacity-50">
            <span>BOM</span>
            <span>DXB</span>
            <span>TKO</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
