// Часть 2.2 Update: добавить тег "best-seller" всем с stock_count > 100
db.products.updateMany(
  { stock_count: { $gt: 100 } },
  { $push: { tags: "best-seller" } },
);
