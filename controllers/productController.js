const Product = require("../models/Product");

// 1. Tạo mới sản phẩm (Create)
exports.createProduct = async (req, res) => {
  try {
    const { pid, pname, price, quantity } = req.body;
    const newProduct = new Product({ pid, pname, price, quantity });
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// 2. Lấy danh sách tất cả sản phẩm (Read all)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 3. Lấy sản phẩm theo pid (Read one)
exports.getProductByPid = async (req, res) => {
  try {
    const product = await Product.findOne({ pid: req.params.pid });
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// 4. Cập nhật thông tin sản phẩm theo pid (Update)
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { pid: req.params.pid },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// 5. Xóa sản phẩm theo pid (Delete)
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ pid: req.params.pid });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    return res.status(200).json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};