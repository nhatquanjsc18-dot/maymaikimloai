/**
 * Máy chủ tĩnh nhỏ để xem lại các bản mockup giao diện (v1 / v2 / v3).
 * Trang thật chạy bằng Next.js: `cd nextjs-app && npm run dev`.
 *
 *   node preview-server.js   ->  http://localhost:4321
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const MOCKUPS = path.join(__dirname, "design-mockups");
const PUBLIC = path.join(__dirname, "nextjs-app", "public");
const DATA = path.join(__dirname, "nextjs-app", "data");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function send(res, file) {
  fs.readFile(file, (err, buf) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("404");
    }
    res.writeHead(200, {
      "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream",
    });
    res.end(buf);
  });
}

http
  .createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p === "/") p = "/design-v3.html";

    // site.json là nguồn duy nhất cho access key + thông tin liên hệ
    if (p === "/site.json") {
      res.writeHead(200, { "Content-Type": TYPES[".json"], "Cache-Control": "no-store" });
      return res.end(fs.readFileSync(path.join(DATA, "site.json")));
    }

    // mockup trước, ảnh sản phẩm trong public sau
    const inMockups = path.join(MOCKUPS, p);
    if (inMockups.startsWith(MOCKUPS) && fs.existsSync(inMockups) && fs.statSync(inMockups).isFile()) {
      return send(res, inMockups);
    }
    const inPublic = path.join(PUBLIC, p);
    if (!inPublic.startsWith(PUBLIC)) {
      res.writeHead(403);
      return res.end("forbidden");
    }
    send(res, inPublic);
  })
  .listen(4321, () => console.log("Mockup: http://localhost:4321"));
