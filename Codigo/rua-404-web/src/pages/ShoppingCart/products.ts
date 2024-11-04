export const products = [
    {
        id: 1,
        name: "PC system All in One APPLE iMac (2023) mqrq3ro/a",
        price: 1499,
        quantity: 2,
        image: "https://placehold.co/80x80/EEE/31343C",
        darkImage: "https://placehold.co/80x80/EEE/31343C",
      },
      {
        id: 2,
        name: "Restored Apple Watch Series 8 (GPS) 41mm",
        price: 598,
        quantity: 1,
        image: "https://placehold.co/80x80/EEE/31343C",
        darkImage: "https://placehold.co/80x80/EEE/31343C",
      },
      {
        id: 3,
        name: "Apple - MacBook Pro 16 Laptop, M3 Pro chip",
        price: 1799,
        quantity: 1,
        image: "https://placehold.co/80x80/EEE/31343C",
        darkImage: "https://placehold.co/80x80/EEE/31343C",
      },
      {
        id: 4,
        name: "Tablet APPLE iPad Pro 12.9 6th Gen",
        price: 699,
        quantity: 1,
        image: "https://placehold.co/80x80/EEE/31343C",
        darkImage: "https://placehold.co/80x80/EEE/31343C",
      },
      {
        id: 5,
        name: "APPLE iPhone 15 5G phone, 256GB",
        price: 999,
        quantity: 3,
        image: "https://placehold.co/80x80/EEE/31343C",
        darkImage: "https://placehold.co/80x80/EEE/31343C",
      }
]

export const defaultProducts = [
    {
      id: 1,
      name: "iMac 27\"",
      description: "This generation has some improvements, including a longer continuous battery life.",
      originalPrice: "399.99",
      salePrice: "299",
      href: "#",
      imageLightMode: "https://placehold.co/1000x800/EEE/31343C",
      imageDarkMode: "https://placehold.co/1000x800/EEE/31343C",
      onAddToCart: (product: any) => console.log('Added to cart:', product)
    },
    {
      id: 2,
      name: "PlayStation 5",
      description: "This generation has some improvements, including a longer continuous battery life.",
      originalPrice: "799.99",
      salePrice: "499",
      href: "#",
      imageLightMode: "https://placehold.co/600x400/EEE/31343C",
      imageDarkMode: "https://placehold.co/600x400/EEE/31343C",
      onAddToCart: (product: any) => console.log('Added to cart:', product)
    },
    {
      id: 3,
      name: "Apple Watch Series 8",
      description: "This generation has some improvements, including a longer continuous battery life.",
      originalPrice: "1799.99",
      salePrice: "1199",
      href: "#",
      imageLightMode: "https://placehold.co/600x400/EEE/31343C",
      imageDarkMode: "https://placehold.co/600x400/EEE/31343C",
      onAddToCart: (product: any) => console.log('Added to cart:', product)
    }
  ];