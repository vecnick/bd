// Часть 1.3 Update: GamerGear -> GamerPro (обновить все товары)
db.products.updateMany(
  { brand: "GamerGear" },
  { $set: { brand: "GamerPro" } },
);

// Update: Laptop Pro, уменьшить цену на 100 через $inc
db.products.updateOne({ name: "Laptop Pro" }, { $inc: { price: -100 } });
