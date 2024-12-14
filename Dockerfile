# Chọn Node.js image làm nền tảng
FROM node:20-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy các file package vào container
COPY package.json package-lock.json ./

# Cài đặt các dependencies
RUN npm install --legacy-peer-deps


# Copy toàn bộ mã nguồn vào container
COPY . .


# Build ứng dụng Next.js
RUN npm run build

# Expose port 5001 cho container
EXPOSE 5001

# Start ứng dụng Next.js trên cổng 5001
CMD ["npm", "run", "start", "--", "-p", "5001"]
