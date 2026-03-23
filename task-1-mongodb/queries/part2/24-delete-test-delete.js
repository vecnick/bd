// Часть 2.4 Delete: создать test_delete, вставить 5 документов и удалить их deleteMany одной командой
db.test_delete.drop();
db.createCollection("test_delete");
db.test_delete.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }]);
db.test_delete.deleteMany({});
