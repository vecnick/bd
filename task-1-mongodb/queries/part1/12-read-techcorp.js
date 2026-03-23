// Часть 1.2 Read: все товары бренда TechCorp
db.products.find({ brand: "TechCorp" });

// Read: цена <= 100
db.products.find({ price: { $lte: 100 } });

// Read: peripherals, которых нет в наличии (только name, brand)
db.products.find(
    { category: "peripherals", in_stock: false },
    { _id: 0, name: 1, brand: 1 },
  );
  
