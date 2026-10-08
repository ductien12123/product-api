const express = require("express");
const router = express.Router();

// Danh sách sản phẩm tạm thời
let products = [];

// GET - lấy tất cả sản phẩm
router.get("/", (req, res) => {
  res.json(products);
});

// GET - lấy sản phẩm theo ID
router.get("/:id", (req, res) => {
  const product = products.find(
    (p) => p.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
});

// POST - thêm sản phẩm
router.post("/", (req, res) => {
  const product = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };

  products.push(product);

  res.status(201).json(product);
});

// PUT - cập nhật sản phẩm
router.put("/:id", (req, res) => {
  const product = products.find(
    (p) => p.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  product.name = req.body.name ?? product.name;
  product.price = req.body.price ?? product.price;

  res.json(product);
});

// DELETE - xóa sản phẩm
router.delete("/:id", (req, res) => {
  const index = products.findIndex(
    (p) => p.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  products.splice(index, 1);

  res.json({
    message: "Product deleted successfully",
  });
});

module.exports = router;