# Sử dụng image Node.js LTS bản nhẹ
FROM node:20-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy các file quản lý thư viện trước để tận dụng Docker cache layer
COPY package*.json ./

# Cài đặt các dependencies cho production
RUN npm install --only=production

# Copy toàn bộ mã nguồn vào container
COPY . .

# Khai báo cổng ứng dụng lắng nghe
EXPOSE 3000

# Lệnh khởi chạy ứng dụng
CMD ["npm", "start"]