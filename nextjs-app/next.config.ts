import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Xuất HTML tĩnh -> thư mục out/ để upload thẳng lên Hostinger
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
