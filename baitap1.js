const http = require("node:http");
const os = require("os");
const fs = require("fs");
const path = require("path");

const getSystemInfo = () => {
  const totalMem = (os.totalmem() / 1024 ** 3).toFixed(2); // GB
  const freeMem = (os.freemem() / 1024 ** 3).toFixed(2); // GB
  const usedMem = (totalMem - freeMem).toFixed(2);

  return {
    OS: os.platform(),
    CPU: os.cpus()[0].model,
    Cores: os.cpus().length,
    Total_RAM_GB: totalMem,
    Used_RAM_GB: usedMem,
    Free_RAM_GB: freeMem,
  };
};

const server = http.createServer((req, res) => {
  const sysInfo = getSystemInfo();

  // Chuyển thông tin thành HTML
  let html = "<h1>Thông tin hệ thống</h1><ul>";
  for (let key in sysInfo) {
    html += `<li><strong>${key}:</strong> ${sysInfo[key]}</li>`;
  }
  html += "</ul>";

  // Ghi vào file
  const dir = "D:/Homework";
  const filePath = path.join(dir, "system_info.txt");

  // Tạo thư mục nếu chưa tồn tại
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  // Ghi thông tin ra file
  fs.writeFileSync(filePath, JSON.stringify(sysInfo, null, 2), "utf-8");

  // Trả kết quả lên trình duyệt
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Server is running at http://127.0.0.1:3000");
});
