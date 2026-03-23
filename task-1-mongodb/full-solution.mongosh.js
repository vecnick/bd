// Запуск: mongosh ... --file full-solution.mongosh.js
// Подключение к admin, переключение на shop

db = db.getSiblingDB('shop');

print('=== Подготовка: коллекция products, insertMany (6 товаров) ===');
db.products.drop();
const initial = [
  { name: 'Laptop Pro', brand: 'TechCorp', price: 1500, category: 'electronics', tags: ['powerful', 'professional', '15-inch'], in_stock: true, stock_count: 50 },
  { name: 'Gaming Mouse', brand: 'GamerGear', price: 80, category: 'peripherals', tags: ['rgb', 'fast', 'ergonomic'], in_stock: true, stock_count: 200 },
  { name: 'Wireless Keyboard', brand: 'TechCorp', price: 120, category: 'peripherals', tags: ['bluetooth', 'mechanical', 'compact'], in_stock: false, stock_count: 0 },
  { name: '4K Monitor', brand: 'ViewSonic', price: 450, category: 'electronics', tags: ['4k', '27-inch', 'ips'], in_stock: true, stock_count: 75 },
  { name: 'Webcam HD', brand: 'GamerGear', price: 60, category: 'peripherals', tags: ['1080p', 'streaming'], in_stock: true, stock_count: 150 },
  { name: 'Smartphone X', brand: 'TechCorp', price: 900, category: 'electronics', tags: ['5g', 'oled', 'camera'], in_stock: false, stock_count: 0 },
];
printjson(db.products.insertMany(initial));

print('\n=== Часть 1.1 Create: USB-C Hub ===');
printjson(
  db.products.insertOne({
    name: 'USB-C Hub',
    brand: 'TechCorp',
    price: 45,
    category: 'accessories',
    tags: ['usb-c', 'multiport'],
    in_stock: true,
    stock_count: 300,
  }),
);

print('\n=== Часть 1.2 Read: TechCorp ===');
printjson(db.products.find({ brand: 'TechCorp' }).toArray());

print('\n=== Часть 1.2 Read: price <= 100 ===');
printjson(db.products.find({ price: { $lte: 100 } }).toArray());

print('\n=== Часть 1.2 Read: peripherals, не в наличии — только name, brand ===');
printjson(
  db.products.find(
    { category: 'peripherals', in_stock: false },
    { _id: 0, name: 1, brand: 1 },
  ).toArray(),
);

print('\n=== Часть 1.3 Update: GamerGear -> GamerPro ===');
printjson(db.products.updateMany({ brand: 'GamerGear' }, { $set: { brand: 'GamerPro' } }));

print('\n=== Часть 1.3 Update: Laptop Pro, цена -100 ($inc) ===');
printjson(db.products.updateOne({ name: 'Laptop Pro' }, { $inc: { price: -100 } }));

print('\n=== Часть 1.4 Delete: Webcam HD ===');
printjson(db.products.deleteOne({ name: 'Webcam HD' }));

print('\n=== Часть 2.1 Read: не TechCorp и цена 70..500 включительно ===');
printjson(
  db.products
    .find({
      brand: { $ne: 'TechCorp' },
      price: { $gte: 70, $lte: 500 },
    })
    .toArray(),
);

print('\n=== Часть 2.2 Update: тег best-seller при stock_count > 100 ===');
printjson(
  db.products.updateMany({ stock_count: { $gt: 100 } }, { $push: { tags: 'best-seller' } }),
);

print('\n=== Часть 2.3: найти 4K Monitor ===');
printjson(db.products.findOne({ name: '4K Monitor' }));

print('\n=== Часть 2.3: upsert 8K Monitor ===');
printjson(
  db.products.updateOne(
    { name: '8K Monitor' },
    { $set: { price: 2000, brand: 'ViewSonic' } },
    { upsert: true },
  ),
);
printjson(db.products.findOne({ name: '8K Monitor' }));

print('\n=== Часть 2.4: коллекция test_delete ===');
db.test_delete.drop();
db.createCollection('test_delete');
printjson(
  db.test_delete.insertMany([
    { n: 1 },
    { n: 2 },
    { n: 3 },
    { n: 4 },
    { n: 5 },
  ]),
);
print('До deleteMany:');
printjson(db.test_delete.find().toArray());
printjson(db.test_delete.deleteMany({}));
print('После deleteMany:');
printjson(db.test_delete.find().toArray());

print('\n=== Готово ===');
