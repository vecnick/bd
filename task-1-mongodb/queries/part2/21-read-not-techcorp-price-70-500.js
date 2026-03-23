// Часть 2.1 Read: не TechCorp и цена от 70 до 500 включительно
db.products.find({
  brand: { $ne: "TechCorp" },
  price: { $gte: 70, $lte: 500 },
});
