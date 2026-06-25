# Trang Portfolio Lập Trình Viên Song Ngữ Cao Cấp & CMS

Dự án trang web Portfolio cá nhân song ngữ (Anh/Việt) với giao diện tương tác cao, tích hợp hệ thống quản trị nội dung (CMS) được bảo mật bằng mật khẩu trên nền tảng web.

🔗 **Website chính thức:** [https://portfolio.phongdaynai.id.vn/](https://portfolio.phongdaynai.id.vn/)

Dự án được xây dựng dựa trên **Next.js 16.2.7**, **React 19**, **TailwindCSS v4**, **Framer Motion v12**, được thiết kế với giao diện tối (Dark Theme) sang trọng, hiệu ứng con trỏ spotlight chuyển động mượt mà và các bộ sưu tập ảnh tương tác 3D độc đáo.

---

## 🌟 Tính Năng Nổi Bật

### 1. Giao Diện Người Dùng Đẳng Cấp & Trải Nghiệm Tương Tác (UX)
* **Giao diện Spotlight & Con trỏ Vật lý (Spring Cursor):** Thiết kế giao diện tối tối giản kết hợp với con trỏ chuột tùy biến sử dụng kỹ thuật đảo ngược màu (`mix-blend-difference`) và hiệu ứng quầng sáng (spotlight) chạy theo con trỏ chuột dựa trên mô phỏng vật lý lò xo (tự động co giãn, xoay hướng và dịch chuyển theo vận tốc di chuyển chuột).
* **Bộ Ba Thư Viện Ảnh Tương Tác 3D:** Phần giới thiệu bản thân (About Me) sẽ hiển thị ngẫu nhiên một trong ba hiệu ứng thư viện ảnh cao cấp sau mỗi lần tải lại trang:
  * **`PhotoSphere`:** Vòng quay hình ảnh 3D xoay tròn trong không gian ba chiều bằng CSS 3D Transforms.
  * **`PhotoStack`:** Hiệu ứng trượt chồng ảnh 3D với chuyển động spring sinh động.
  * **`SpotlightPhoto`:** Thẻ ảnh tương tác rọi sáng (spotlight) theo vị trí chuột trên bề mặt ảnh, đi kèm một lớp hào quang mờ ảo phía sau.
* **Tính Số Năm Kinh Nghiệm Tự Động:** Thời gian làm việc thực tế được tính toán tự động theo thời gian thực từ mốc ngày thiết lập (`experienceStartDate`), tự động hiển thị nội dung tùy biến ngôn ngữ như *"over 3 years of hands-on experience"* hoặc *"hơn 3 năm kinh nghiệm thực chiến"*.
* **Cơ Chế Song Ngữ Linh Hoạt:** Hỗ trợ chuyển đổi nhanh chóng giữa Tiếng Anh (EN) và Tiếng Việt (VI) cho toàn bộ hệ thống menu điều hướng, các phần nội dung và các trường nhập liệu trong CMS.
* **Hỗ trợ Repo con (Sub-repositories):** Thẻ dự án cho phép lồng ghép và hiển thị các kho mã nguồn con hoặc các nhánh thành phần của dự án lớn.

### 2. Trang Quản Trị Nội Dung (CMS) Bảo Mật Cao
* **Xác Thực JWT Cực Kỳ An Toàn:** Trang quản trị (`/settings`) và các API thay đổi dữ liệu được bảo vệ nghiêm ngặt bằng [mã JWT](file:///home/dhpho/workspace/My-Portfolio/src/lib/jwt.ts) lưu dưới dạng Cookie Session chỉ đọc (HTTP-Only, Secure, SameSite=Strict).
* **Trang Thiết Lập Tự Động (Setup Mode):** Hệ thống tự động phát hiện nếu chưa có mật khẩu admin nào được thiết lập. Người dùng sẽ được dẫn tới trang Setup để tạo mật khẩu an toàn trong lần chạy đầu tiên.
* **Bảo Mật Mật Khẩu Bằng PBKDF2:** Mật khẩu quản trị được băm trên máy chủ bằng giải thuật PBKDF2 với SHA-512 và muối ngẫu nhiên (salt). Việc kiểm tra mật khẩu sử dụng hàm `crypto.timingSafeEqual` để loại bỏ hoàn toàn nguy cơ bị tấn công dò tìm thời gian (timing attacks).
* **Hệ Thống CMS Toàn Diện:** Hỗ trợ đầy đủ các thao tác chỉnh sửa trực quan (CRUD):
  * Chỉnh sửa thông tin cá nhân cơ bản (Họ tên, vai trò, liên hệ, mạng xã hội).
  * Tải lên và quản lý ảnh chân dung cũng như tài liệu CV hồ sơ (.pdf, .docx, .doc tối đa 5MB), tự động dọn dẹp file vật lý trên ổ cứng khi thực hiện xóa.
  * Thay đổi thứ tự, bật/tắt hiển thị (thuộc tính `show`) cho các dự án, kỹ năng, mốc lịch sử làm việc, và các mạng xã hội.
  * Trình chỉnh sửa bản dịch song ngữ trực quan để sửa đổi nhanh văn bản VI và EN.

### 3. Công Nghệ Lưu Trữ Bằng File System JSON
* **Không Cần Server Cơ Sở Dữ Liệu:** Đọc và ghi trực tiếp dữ liệu Portfolio theo thời gian thực vào một tệp JSON cục bộ: [portfolio.json](file:///home/dhpho/workspace/My-Portfolio/src/data/portfolio-default.json).
* **Tự Động Di Trú Dữ Liệu (Migrations):** Tự động kiểm tra và nâng cấp phiên bản cấu trúc JSON (ví dụ từ v1 lên v2) đồng thời tự động gộp (merge) các khóa dịch thuật mới được bổ sung vào file dữ liệu cũ mỗi khi khởi động hệ thống.
* **Tự Động Sao Lưu Dự Phòng:** Tự động tạo tệp tin sao lưu dự phòng (`portfolio.json.bak`) trên đĩa trước khi lưu bất kỳ thay đổi nào từ CMS.
* **Xác Thực Cấu Trúc Bằng Zod:** Kiểm soát toàn bộ cấu trúc dữ liệu JSON đầu vào/đầu ra bằng bộ lọc [Zod Schemas](file:///home/dhpho/workspace/My-Portfolio/src/lib/schema.ts).

---

## 🛠️ Stack Công Nghệ

* **Framework Chính:** [Next.js 16.2.7](https://nextjs.org/) (App Router, Chế độ build độc lập Standalone)
* **Thư Viện Runtime:** [React 19.2.4](https://react.dev/)
* **Engine Giao Diện:** [TailwindCSS v4](https://tailwindcss.com/) & PostCSS
* **Thư Viện Chuyển Động:** [Framer Motion v12.30.0](https://www.framer.com/motion/)
* **Bộ Icon:** [Lucide React 0.563.0](https://lucide.dev/)
* **Kiểm Tra Dữ Liệu:** [Zod 3.23.8](https://zod.dev/)

---

## 📂 Cấu Trúc Thư Mục Dự Án

```
├── .github/workflows
│   └── deploy.yml              # Quy trình tự động triển khai CI/CD
├── public/                     # Các tài nguyên tĩnh (Favicons, assets)
│   ├── images/                 # Ảnh chân dung đã tải lên (Volume lưu trữ persistent)
│   ├── images-default/         # Thư mục ảnh mặc định để khôi phục
│   └── uploads/                # File CV đã tải lên (Volume lưu trữ persistent)
├── src/
│   ├── app/                    # Cấu trúc Next.js App Router
│   │   ├── api/auth/           # API Auth: login, logout, setup, status, change-password
│   │   ├── api/documents/      # Đầu cuối xử lý tệp tài liệu CV
│   │   ├── api/images/         # Đầu cuối xử lý tệp ảnh chân dung
│   │   ├── login/              # Trang đăng nhập Admin
│   │   ├── settings/           # Trang quản trị Admin Dashboard
│   │   ├── actions.ts          # Server Action để lưu dữ liệu JSON portfolio
│   │   ├── layout.tsx          # Bọc HTML/Body toàn cục & tự động tạo thẻ SEO Metadata
│   │   └── page.tsx            # Trang hiển thị Portfolio chính (gọi HomeClient)
│   ├── components/             # Các Component giao diện tái sử dụng
│   │   ├── SpotlightLayout.tsx # Hiệu ứng quầng sáng & con trỏ chuột lò xo vật lý
│   │   ├── PhotoSphere.tsx     # Thư viện ảnh dạng vòng tròn 3D
│   │   ├── PhotoStack.tsx      # Thư viện ảnh dạng chồng slide 3D
│   │   ├── SpotlightPhoto.tsx  # Thẻ ảnh rọi sáng spotlight tương tác di chuột
│   │   ├── SettingsClient.tsx  # Giao diện khung quản trị, bộ chọn tab & tải lên CV
│   │   └── PortfolioEditor.tsx # Trình chỉnh sửa CMS chi tiết dự án, kỹ năng, timeline
│   ├── constants/              # Các biến hằng số, bản dịch UI tĩnh của settings
│   ├── context/                # Các React Context Provider (Language, PortfolioData)
│   ├── hooks/                  # Các hook tùy biến (ví dụ: useIsMobile)
│   ├── lib/                    # Các module helper phía máy chủ
│   │   ├── auth.ts             # Mã hóa PBKDF2, tạo muối ngẫu nhiên, verifyPassword
│   │   ├── jwt.ts              # Tạo/xác thực chuỗi JWT bảo mật HS256
│   │   ├── portfolio.ts        # Đọc, ghi và tự động tạo file backup portfolio.json
│   │   ├── migrations.ts       # Di trú cấu trúc cơ sở dữ liệu v1 -> v2 schema
│   │   ├── schema.ts           # Quy tắc kiểm tra cấu trúc dữ liệu của Zod
│   │   └── experience.ts       # Công thức tính thời gian làm việc thực tế
│   └── proxy.ts                # Logic phân quyền và kiểm tra session cho Middleware
├── bootstrap.js                # Tự động khôi phục ảnh/dữ liệu mặc định khi mount volume rỗng
├── Dockerfile                  # Quy trình dựng ảnh Docker multi-stage ở chế độ standalone
├── docker-compose.yml          # Cấu hình container với quyền truy cập volume ngoài host
├── package.json                # Khai báo thư viện phụ thuộc và mã scripts
└── tsconfig.json               # Cấu hình cài đặt TypeScript
```

---

## ⚙️ Biến Môi Trường Cấu Hình

Tạo tệp `.env` ở thư mục gốc của dự án (tham khảo mẫu tại [.env.example](file:///home/dhpho/workspace/My-Portfolio/.env.example)):

| Tên Biến | Giá Trị Mặc Định | Mô Tả Chi Tiết |
| :--- | :--- | :--- |
| `ADMIN_USERNAME` | `admin` | Tên tài khoản dùng để đăng nhập vào trang `/settings`. |
| `ADMIN_PASSWORD_HASH` | *Chuỗi băm PBKDF2* | Chuỗi băm mật khẩu bảo mật. Tạo tự động ở Setup hoặc lấy qua API hỗ trợ. |
| `JWT_SECRET` | *Chuỗi ngẫu nhiên* | Khóa bí mật dùng để ký và xác thực token JWT. Thay đổi khi chạy sản xuất. |
| `PORTFOLIO_DATA_PATH` | *Tùy chọn* | Ghi đè đường dẫn lưu file dữ liệu JSON. Mặc định là `src/data/portfolio.json`. |

> [!TIP]
> **Cách tạo chuỗi băm mật khẩu thủ công:**
> Bạn có thể tạo chuỗi băm PBKDF2 cho mật khẩu của mình bằng cách khởi chạy máy chủ thử nghiệm và truy cập địa chỉ:
> `http://localhost:3000/api/auth/hash?password=MAT_KHAU_CUA_BAN`

---

## 🚀 Cài Đặt & Phát Triển Cục Bộ

### Yêu cầu tiên quyết
* **Node.js:** Phiên bản v22.20.0 trở lên
* **npm:** Phiên bản v10.0.0 trở lên

### Các bước thực hiện
1. Nhân bản kho lưu trữ về máy:
   ```bash
   git clone https://github.com/PhongDayNai/My-Portfolio.git
   cd My-Portfolio
   ```

2. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```

3. Thiết lập biến môi trường:
   ```bash
   cp .env.example .env
   ```

4. Khởi chạy máy chủ phát triển cục bộ:
   ```bash
   npm run dev
   ```

5. Truy cập ứng dụng:
   * Trang hiển thị Portfolio: [http://localhost:3000](http://localhost:3000)
   * Trang quản trị CMS Settings: [http://localhost:3000/settings](http://localhost:3000/settings)

---

## 🐳 Triển Khai Docker (Môi trường Production)

Hệ thống được cấu hình sẵn tệp [Dockerfile](file:///home/dhpho/workspace/My-Portfolio/Dockerfile) và [docker-compose.yml](file:///home/dhpho/workspace/My-Portfolio/docker-compose.yml) tối ưu cho việc vận hành thực tế. Dự án tận dụng chế độ xuất bản **Standalone Output Mode** của Next.js để loại bỏ các module thừa, giảm thiểu dung lượng ảnh Docker xuống mức thấp nhất.

### Quy Trình Khởi Tạo (Bootstrapping Lifecycle)
Khi container bắt đầu khởi chạy:
1. Container phụ `init-permissions` chạy đầu tiên. Container này mount thư mục ngoài host `/app/data/my-portfolio` và phân quyền sở hữu (`chown -R 1001:1001`) cho người dùng `nextjs` bên trong ứng dụng chính để tránh lỗi ghi đè dữ liệu phân quyền của Linux Host.
2. Container chính bắt đầu thực thi tệp [bootstrap.js](file:///home/dhpho/workspace/My-Portfolio/bootstrap.js).
3. `bootstrap.js` kiểm tra xem thư mục lưu trữ persistent có bị trống hay không (trong lần đầu chạy hoặc khi mount volume trống). Nếu có, nó sẽ khôi phục toàn bộ ảnh mẫu từ `public/images-default` sang `public/images`, và sao chép cấu hình mẫu `portfolio-default.json` thành `portfolio.json`.
4. Cuối cùng, script kích hoạt server Next.js standalone chính (`server.js`).

### Khởi chạy bằng Docker Compose
1. Thiết lập các thông số môi trường trong `docker-compose.yml` hoặc khai báo trực tiếp ngoài Terminal của Host:
   ```bash
   export ADMIN_USERNAME=ten_dang_nhap
   export JWT_SECRET=khoa_bi_mat_jwt
   ```
2. Thực hiện dựng và chạy container dưới dạng ngầm (daemon):
   ```bash
   docker compose up -d --build
   ```
3. Ứng dụng sẽ được mở tại cổng `2664`. Kiểm tra hoạt động tại địa chỉ: `http://localhost:2664`.

---

## 🔒 Các Giải Pháp Bảo Mật Được Áp Dụng

* **HttpOnly Cookie:** Token JWT lưu ở cookie được cấu hình thuộc tính `httpOnly` ngăn chặn hoàn toàn việc đánh cắp token thông qua các đoạn script độc hại (tấn công XSS).
* **Phòng Chống Tấn Công Path Traversal:** Các API xóa tài liệu và ảnh chân dung được thiết kế bộ lọc chặt chẽ, kiểm tra tính tương đối của đường dẫn bằng `path.relative` để ngăn chặn hacker gửi tham số dạng `../` nhằm xóa các file hệ thống khác ngoài thư mục được chỉ định.
* **Ngăn Ngừa Timing Attacks:** So sánh chuỗi hash mật khẩu bằng giải thuật timing-safe `crypto.timingSafeEqual`, đảm bảo thời gian xử lý khớp chuỗi luôn cố định, vô hiệu hóa việc phân tích thời gian phản hồi máy chủ.
* **Xác Thực Dữ Liệu Tải Lên Phía Server:** Kiểm tra nghiêm ngặt dung lượng (tối đa 5MB) cùng định dạng đuôi tệp tin (.pdf, .doc, .docx, .png, .jpg, .webp, .svg) trực tiếp trên máy chủ trước khi lưu vào ổ cứng để tránh mã độc.
