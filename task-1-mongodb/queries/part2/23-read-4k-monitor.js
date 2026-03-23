// Часть 2.3 Read: найти "4K Monitor"
db.products.findOne({ name: "4K Monitor" });

//Update: upsert "8K Monitor" (обновить или создать)
db.products.updateOne(
  { name: "8K Monitor" },
  { $set: { price: 2000, brand: "ViewSonic" } },
  { upsert: true },
);

