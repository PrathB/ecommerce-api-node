const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(reqData) {
  let firstLevel = await Category.findOne({ name: reqData.firstLevelCategory });
  if (!firstLevel) {
    firstLevel = new Category({
      name: reqData.firstLevelCategory,
      level: 1,
    });
    firstLevel = await firstLevel.save();
  }

  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: firstLevel._id,
  });
  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.secondLevelCategory,
      parentCategory: firstLevel._id,
      level: 2,
    });
    secondLevel = await secondLevel.save();
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });
  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    });
    thirdLevel = await thirdLevel.save();
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

async function deleteProduct(productId) {
  await Product.findByIdAndDelete(productId);
  return "Product deleted succesfully";
}

async function updateProduct(productId, reqData) {
  return await Product.findByIdAndUpdate(productId, reqData);
}

async function findProductById(productId) {
  const product = await Product.findById(productId).populate("category").exec();

  if (!product) {
    throw new Error("Product not found with id: ", productId);
  }

  return product;
}

async function getAllProducts(reqQuery) {
  let {
    category,
    carMake,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  pageSize = pageSize || 10;

  let query = Product.find().populate("category");

  // Filter by category if provided
  if (category && category != "null") {
    const categoriesArray = category
      .split(",")
      .map((category) => category.trim());
    for (const c of categoriesArray) {
      const existingCategory = await Category.findOne({ name: c });
      if (existingCategory) {
        let level3CategoryIds;
        if (existingCategory.level === 1) {
          const level2Categories = await Category.find({
            parentCategory: existingCategory._id,
          });
          const level2CategoryIds = level2Categories.map((cat) => cat._id);

          const level3Categories = await Category.find({
            parentCategory: { $in: level2CategoryIds },
          });
          level3CategoryIds = level3Categories.map((cat) => cat._id);
        } else if (existingCategory.level === 2) {
          const level3Categories = await Category.find({
            parentCategory: existingCategory._id,
          });
          level3CategoryIds = level3Categories.map((cat) => cat._id);
        } else if (existingCategory.level === 3) {
          level3CategoryIds = existingCategory._id;
        }
        query = query.where("category").in(level3CategoryIds);
      } else {
        return { content: [], currentPage: 1, totalPages: 0 };
      }
    }
  }

  // Filter by carMake if provided
  if (carMake && carMake != "null") {
    const carMakesArray = carMake.split(",").map((make) => make.trim());
    query = query.where("specifications.carMake").in(carMakesArray);
  }

  if (minPrice && maxPrice) {
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  if (minDiscount) {
    query = query.where("discountPercent").gte(minDiscount);
  }

  if (stock) {
    if (stock == "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock == "out_of_stock") {
      query = query.where("quantity").equals(0);
    }
  }

  if (sort) {
    const sortDirection = sort == "high_to_low" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  const totalProducts = await Product.countDocuments(query);

  // pagination
  const skip = (pageNumber - 1) * pageSize;
  query = query.skip(skip).limit(pageSize);

  const products = await query.exec();

  const totalPages = Math.ceil(totalProducts / pageSize);

  return { content: products, currentPage: pageNumber, totalPages: totalPages };
}

async function createMultipleProducts(products) {
  for (const product of products) {
    await createProduct(product);
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getAllProducts,
  createMultipleProducts,
};
