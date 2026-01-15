const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');

// Ensure directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Create SVG banners with text
const createBanner = (filename, backgroundColor, title, description) => {
  const svg = `
    <svg width="1200" height="450" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${backgroundColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="450" fill="url(#grad)"/>
      <text x="600" y="150" font-size="60" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial">
        🌸 ${title}
      </text>
      <text x="600" y="250" font-size="32" text-anchor="middle" fill="white" font-family="Arial">
        ${description}
      </text>
    </svg>
  `;
  
  sharp(Buffer.from(svg))
    .jpeg({ quality: 90 })
    .toFile(path.join(imagesDir, filename))
    .then(() => console.log(`✓ Created ${filename}`))
    .catch(err => console.error(`✗ Error creating ${filename}:`, err));
};

// Create 3 banners
createBanner('c1.jpg', '#ff6b9d', 'Bộ Sưu Tập Lan Phi Điệp', 'Những dòng đột biến cực quý hiếm');
createBanner('c2.jpg', '#c44569', 'Lan Hồ Điệp Tết', 'Vẻ đẹp sang trọng cho không gian nhà bạn');
createBanner('c3.jpg', '#f78fb3', 'Lan Hồ Điệp Đột biến', 'Vẻ đẹp sang trọng lan đột biến');
