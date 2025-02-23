const fs = require("fs");
const path = require("path");

exports.handler = async function () {
  const pages = ["/"]; 
  const domain = "https://yuki-lab.com";

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${domain}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>
  `
    )
    .join("")}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), sitemapContent);

  return {
    statusCode: 200,
    body: "Sitemap generated!",
  };
};