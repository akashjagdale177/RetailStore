/**
 * Realistic sample catalog data used to seed MongoDB on first run.
 *
 * Images: served from https://picsum.photos (Lorem Picsum) — a free, public
 * image CDN with no API key and no download step required. Each product gets
 * a stable, unique image by seeding the URL with the product's slug, so the
 * same product always renders the same picture.
 */

const img = (seed, w = 500, h = 500) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const categories = [
  { name: 'Electronics', slug: 'electronics', description: 'Phones, laptops, audio & smart devices' },
  { name: 'Fashion', slug: 'fashion', description: 'Clothing, footwear & accessories for everyone' },
  { name: 'Grocery', slug: 'grocery', description: 'Everyday food & household essentials' },
  { name: 'Beauty', slug: 'beauty', description: 'Skincare, makeup & personal care' },
  { name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Appliances, cookware & home essentials' },
  { name: 'Sports', slug: 'sports', description: 'Fitness gear, equipment & activewear' },
  { name: 'Books', slug: 'books', description: 'Fiction, non-fiction & educational titles' },
  { name: 'Toys', slug: 'toys', description: 'Toys & games for kids of all ages' },
  { name: 'Furniture', slug: 'furniture', description: 'Furniture for every room' },
  { name: 'Accessories', slug: 'accessories', description: 'Bags, watches, jewelry & more' },
].map((c) => ({ ...c, image: img(c.slug, 400, 300) }));

// [category, brand, productName, basePrice]
const catalog = [
  // Electronics
  ['Electronics', 'Apple', 'iPhone 15 Pro 128GB', 129999],
  ['Electronics', 'Apple', 'iPhone 14 128GB', 69999],
  ['Electronics', 'Samsung', 'Samsung Galaxy S24 Ultra', 124999],
  ['Electronics', 'Samsung', 'Samsung Galaxy A54 5G', 32999],
  ['Electronics', 'Apple', 'Apple Watch Series 9', 41900],
  ['Electronics', 'Apple', 'MacBook Air M2 13-inch', 114900],
  ['Electronics', 'Dell', 'Dell Inspiron 15 Laptop', 54990],
  ['Electronics', 'Dell', 'Dell 27-inch 4K Monitor', 32990],
  ['Electronics', 'HP', 'HP Pavilion 14 Laptop', 58990],
  ['Electronics', 'HP', 'HP DeskJet All-in-One Printer', 6499],
  ['Electronics', 'Sony', 'Sony WH-1000XM5 Headphones', 29990],
  ['Electronics', 'Sony', 'Sony Bravia 55-inch 4K TV', 64990],
  ['Electronics', 'Logitech', 'Logitech MX Master 3S Mouse', 8995],
  ['Electronics', 'Logitech', 'Logitech K380 Keyboard', 2999],
  ['Electronics', 'boAt', 'boAt Airdopes 141 Earbuds', 1299],
  ['Electronics', 'boAt', 'boAt Rockerz 450 Headphones', 1499],
  ['Electronics', 'JBL', 'JBL Flip 6 Bluetooth Speaker', 11999],
  ['Electronics', 'JBL', 'JBL Tune 510BT Headphones', 2499],
  ['Electronics', 'Canon', 'Canon EOS 1500D DSLR Camera', 33990],
  ['Electronics', 'OnePlus', 'OnePlus 12 5G', 64999],
  ['Electronics', 'Xiaomi', 'Xiaomi Redmi Note 13 Pro', 24999],
  ['Electronics', 'Lenovo', 'Lenovo IdeaPad Slim 3', 42990],
  ['Electronics', 'Asus', 'Asus ROG Strix Gaming Laptop', 134990],
  ['Electronics', 'Amazon', 'Amazon Echo Dot (5th Gen)', 4499],
  ['Electronics', 'Anker', 'Anker PowerCore 20000mAh Power Bank', 2999],

  // Fashion
  ['Fashion', 'Nike', 'Nike Air Max 270 Sneakers', 12995],
  ['Fashion', 'Nike', 'Nike Dri-FIT Running T-Shirt', 1795],
  ['Fashion', 'Adidas', 'Adidas Ultraboost 22 Running Shoes', 16999],
  ['Fashion', 'Adidas', 'Adidas Essentials Hoodie', 3299],
  ['Fashion', "Levi's", "Levi's 511 Slim Fit Jeans", 3499],
  ['Fashion', "Levi's", "Levi's Trucker Denim Jacket", 4999],
  ['Fashion', 'Puma', 'Puma Smash Sneakers', 3499],
  ['Fashion', 'Puma', 'Puma Cotton Polo T-Shirt', 1699],
  ['Fashion', 'H&M', 'H&M Slim Fit Chinos', 1999],
  ['Fashion', 'Zara', 'Zara Casual Linen Shirt', 2599],
  ['Fashion', 'Van Heusen', 'Van Heusen Formal Shirt', 1899],
  ['Fashion', 'Allen Solly', 'Allen Solly Cotton Trousers', 2299],
  ['Fashion', 'Ray-Ban', 'Ray-Ban Aviator Classic Sunglasses', 8990],
  ['Fashion', 'Fossil', 'Fossil Leather Analog Watch', 8995],
  ['Fashion', 'Woodland', 'Woodland Leather Boots', 4995],
  ['Fashion', 'Biba', 'Biba Printed Kurta Set', 2199],

  // Grocery
  ['Grocery', 'Tata', 'Tata Sampann Toor Dal 1kg', 179],
  ['Grocery', 'Tata', 'Tata Salt 1kg', 28],
  ['Grocery', 'Fortune', 'Fortune Sunflower Oil 1L', 189],
  ['Grocery', 'Aashirvaad', 'Aashirvaad Atta 5kg', 279],
  ['Grocery', 'India Gate', 'India Gate Basmati Rice 5kg', 599],
  ['Grocery', 'Nescafe', 'Nescafe Classic Coffee 200g', 449],
  ['Grocery', 'Tata', 'Tata Tea Gold 1kg', 545],
  ['Grocery', 'Amul', 'Amul Gold Milk 1L', 72],
  ['Grocery', 'Amul', 'Amul Butter 500g', 265],
  ['Grocery', "Kellogg's", "Kellogg's Corn Flakes 875g", 379],
  ['Grocery', 'MTR', 'MTR Ready to Eat Poha 200g', 89],
  ['Grocery', 'Maggi', 'Maggi 2-Minute Noodles 12-pack', 168],
  ['Grocery', 'Britannia', 'Britannia Marie Gold Biscuits', 65],
  ['Grocery', 'Haldiram', "Haldiram's Bhujia Sev 400g", 129],

  // Beauty
  ['Beauty', "L'Oreal", "L'Oreal Paris Revitalift Face Cream", 899],
  ['Beauty', 'Nivea', 'Nivea Soft Light Moisturizer 200ml', 299],
  ['Beauty', 'Maybelline', 'Maybelline Fit Me Foundation', 649],
  ['Beauty', 'Lakme', 'Lakme Eyeconic Kajal', 199],
  ['Beauty', 'The Ordinary', 'The Ordinary Niacinamide Serum', 799],
  ['Beauty', 'Mamaearth', 'Mamaearth Vitamin C Face Wash', 299],
  ['Beauty', 'Dove', 'Dove Nourishing Body Wash 250ml', 249],
  ['Beauty', 'Gillette', 'Gillette Mach3 Razor', 399],
  ['Beauty', 'Himalaya', 'Himalaya Neem Face Wash 150ml', 145],
  ['Beauty', 'Colgate', 'Colgate Total Toothpaste 150g', 115],

  // Home & Kitchen
  ['Home & Kitchen', 'Prestige', 'Prestige Induction Cooktop', 2499],
  ['Home & Kitchen', 'Prestige', 'Prestige Pressure Cooker 5L', 1899],
  ['Home & Kitchen', 'Philips', 'Philips Air Fryer HD9200', 7995],
  ['Home & Kitchen', 'Philips', 'Philips Mixer Grinder 750W', 3495],
  ['Home & Kitchen', 'Milton', 'Milton Thermosteel Water Bottle 1L', 899],
  ['Home & Kitchen', 'Cello', 'Cello Dinner Set 18-piece', 1599],
  ['Home & Kitchen', 'Bajaj', 'Bajaj Electric Kettle 1.5L', 999],
  ['Home & Kitchen', 'Havells', 'Havells Ceiling Fan', 2999],
  ['Home & Kitchen', 'LG', 'LG 260L Double Door Refrigerator', 27990],
  ['Home & Kitchen', 'IFB', 'IFB 6.5kg Front Load Washing Machine', 28990],
  ['Home & Kitchen', 'Wonderchef', 'Wonderchef Nonstick Cookware Set', 2799],

  // Sports
  ['Sports', 'Nivia', 'Nivia Football Size 5', 899],
  ['Sports', 'Yonex', 'Yonex Badminton Racket', 1899],
  ['Sports', 'Cosco', 'Cosco Cricket Bat Kashmir Willow', 1299],
  ['Sports', 'Decathlon', 'Decathlon Yoga Mat 6mm', 799],
  ['Sports', 'Nike', 'Nike Training Gym Bag', 2299],
  ['Sports', 'Adidas', 'Adidas Skipping Rope', 499],
  ['Sports', 'boldfit', 'Boldfit Adjustable Dumbbell Set 20kg', 2499],
  ['Sports', 'Puma', 'Puma Running Shorts', 999],

  // Books
  ['Books', 'Penguin', 'Atomic Habits by James Clear', 499],
  ['Books', 'Penguin', 'Rich Dad Poor Dad by Robert Kiyosaki', 399],
  ['Books', 'HarperCollins', 'The Alchemist by Paulo Coelho', 299],
  ['Books', 'Penguin', 'Ikigai by Hector Garcia', 349],
  ['Books', 'Bloomsbury', 'Harry Potter Complete Box Set', 2499],
  ['Books', 'Wiley', 'Clean Code by Robert C. Martin', 599],
  ['Books', "O'Reilly", 'Designing Data-Intensive Applications', 1299],
  ['Books', 'Penguin', 'Sapiens by Yuval Noah Harari', 549],

  // Toys
  ['Toys', 'Lego', 'Lego Classic Creative Bricks Set', 2499],
  ['Toys', 'Hot Wheels', 'Hot Wheels 20-Car Gift Pack', 1499],
  ['Toys', 'Funskool', 'Funskool Monopoly Board Game', 899],
  ['Toys', 'Barbie', 'Barbie Dreamhouse Playset', 4999],
  ['Toys', 'Nerf', 'Nerf Elite 2.0 Blaster', 1699],
  ['Toys', 'Fisher-Price', 'Fisher-Price Baby Activity Gym', 2199],

  // Furniture
  ['Furniture', 'Urban Ladder', 'Urban Ladder 3-Seater Sofa', 24999],
  ['Furniture', 'Nilkamal', 'Nilkamal Plastic Chair Set of 2', 1899],
  ['Furniture', 'Godrej', 'Godrej 2-Door Steel Almirah', 8999],
  ['Furniture', 'Pepperfry', 'Pepperfry Study Table with Storage', 6499],
  ['Furniture', 'Wakefit', 'Wakefit Orthopedic Memory Foam Mattress', 10999],
  ['Furniture', 'Ikea', 'Ikea MALM Bed Frame Queen Size', 15999],

  // Accessories
  ['Accessories', 'Fastrack', 'Fastrack Chronograph Watch', 3495],
  ['Accessories', 'Titan', 'Titan Analog Watch for Men', 4995],
  ['Accessories', 'American Tourister', 'American Tourister Backpack', 1799],
  ['Accessories', 'Wildcraft', 'Wildcraft Trail Backpack 30L', 1999],
  ['Accessories', 'Casio', 'Casio Vintage Digital Watch', 2495],
  ['Accessories', 'Da Milano', 'Da Milano Leather Wallet', 2999],
  ['Accessories', 'Tanishq', 'Tanishq Silver Pendant Necklace', 3999],
  ['Accessories', 'Skybags', 'Skybags Trolley Suitcase 24-inch', 3499],
];

const adjectivesForReview = [
  'Great value for money, exactly as described.',
  'Good quality, fast delivery, would buy again.',
  'Product matches the description perfectly.',
  'Decent quality but packaging could be better.',
  'Excellent! Exceeded my expectations.',
  'Works well, no complaints so far.',
  'Average product, does the job.',
  'Superb quality, highly recommend to everyone.',
];

const reviewNames = ['Rohit S.', 'Priya M.', 'Amit K.', 'Sneha R.', 'Vikram P.', 'Anjali T.', 'Karan D.', 'Neha G.'];

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function buildProducts() {
  return catalog.map(([category, brand, name, basePrice]) => {
    const slug = slugify(`${brand}-${name}`);
    const discountPercentage = [0, 5, 10, 15, 20, 25, 30][Math.floor(Math.random() * 7)];
    const stock = 10 + Math.floor(Math.random() * 190);
    const ratings = +(3.5 + Math.random() * 1.5).toFixed(1);
    const numReviewsCount = 2 + Math.floor(Math.random() * 4);
    const reviews = Array.from({ length: numReviewsCount }, () => ({
      userName: reviewNames[Math.floor(Math.random() * reviewNames.length)],
      rating: Math.min(5, Math.max(1, Math.round(ratings + (Math.random() - 0.5)))),
      comment: adjectivesForReview[Math.floor(Math.random() * adjectivesForReview.length)],
    }));

    return {
      name,
      description: `${name} from ${brand}. A top-rated pick in our ${category} range, chosen for its quality, durability and everyday reliability. Ships with manufacturer warranty where applicable.`,
      price: basePrice,
      discountPercentage,
      images: [img(slug, 600, 600), img(slug + '-2', 600, 600)],
      category,
      brand,
      stock,
      ratings,
      numReviews: reviews.length,
      reviews,
    };
  });
}

module.exports = { categories, buildProducts };
