const request = require("supertest");
const app = require("../server");
const Product = require("../models/Product");

// Mock model Product của Mongoose để kiểm thử CRUD trên CI
jest.mock("../models/Product");

describe("Kiểm thử toàn diện CRUD Product API", () => {
  const sampleProduct = {
    pid: "P101",
    pname: "Bàn phím cơ",
    price: 1500000,
    quantity: 10,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  // 1. CREATE
  it("POST /api/products - Tạo mới sản phẩm thành công", async () => {
    Product.prototype.save = jest.fn().mockResolvedValue(sampleProduct);

    const res = await request(app).post("/api/products").send(sampleProduct);

    expect(res.statusCode).toBe(201);
    expect(res.body.pid).toBe(sampleProduct.pid);
    expect(res.body.pname).toBe(sampleProduct.pname);
  });

  // 2. READ ALL
  it("GET /api/products - Lấy danh sách sản phẩm", async () => {
    Product.find = jest.fn().mockResolvedValue([sampleProduct]);

    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].pid).toBe(sampleProduct.pid);
  });

  // 3. READ ONE
  it("GET /api/products/:pid - Lấy chi tiết sản phẩm theo pid", async () => {
    Product.findOne = jest.fn().mockResolvedValue(sampleProduct);

    const res = await request(app).get(`/api/products/${sampleProduct.pid}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.pid).toBe(sampleProduct.pid);
  });

  // 4. UPDATE
  it("PUT /api/products/:pid - Cập nhật thông tin sản phẩm", async () => {
    const updatedProduct = { ...sampleProduct, price: 1800000, quantity: 15 };
    Product.findOneAndUpdate = jest.fn().mockResolvedValue(updatedProduct);

    const res = await request(app)
      .put(`/api/products/${sampleProduct.pid}`)
      .send({ price: 1800000, quantity: 15 });

    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(1800000);
    expect(res.body.quantity).toBe(15);
  });

  // 5. DELETE
  it("DELETE /api/products/:pid - Xóa sản phẩm", async () => {
    Product.findOneAndDelete = jest.fn().mockResolvedValue(sampleProduct);

    const res = await request(app).delete(`/api/products/${sampleProduct.pid}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Xóa sản phẩm thành công");
  });
});
