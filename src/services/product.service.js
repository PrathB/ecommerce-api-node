const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(reqData) {
  let firstLevel = await Category.findOne({ name: reqData.firstLevelCategory });
  if (!firstLevel) {
    firstLevel = Category({
      name: reqData.firstLevelCategory,
      level: 1,
    });
  }

  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: firstLevel._id,
  });
  if (!secondLevel) {
    secondLevel = Category({
      name: reqData.secondLevelCategory,
      parent: firstLevel._id,
      level: 2,
    });
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });
  if (!thirdLevel) {
    thirdLevel = Category({
      name: reqData.thirdLevelCategory,
      parent: secondLevel._id,
      level: 3,
    });
  }

  const product = new Product({
    title: reqData.title,
    imageUrl: reqData.imageUrl,
    category: thirdLevel,
    quantity: reqData.quantity,
    price: reqData.price,
    discountedPrice: reqData.discountedPrice,
    discountPercent: reqData.discountPercent,
    brand: reqData.brand,
    description: reqData.description,
    highlights: reqData.highlights,
    specifications: reqData.specifications,
    compatibility: reqData.compatibility,
  });

  return await product.save();
}