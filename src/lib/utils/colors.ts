export function rgbToHex(r, g, b) {
	return (
		'#' +
		[r, g, b]
			.map((x) => {
				const hex = x.toString(16);
				return hex.length === 1 ? '0' + hex : hex;
			})
			.join('')
	);
}

export function getDominantColorFromURL(imageURL) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = 'Anonymous'; // Enable cross-origin requests (if needed)
		img.src = imageURL;

		img.onload = () => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			canvas.width = img.width;
			canvas.height = img.height;

			ctx.drawImage(img, 0, 0, img.width, img.height);

			const imageData = ctx.getImageData(0, 0, img.width, img.height);
			const data = imageData.data;

			const colorMap = {};
			let dominantColor = '';
			let maxCount = 0;

			for (let i = 0; i < data.length; i += 4) {
				const r = data[i];
				const g = data[i + 1];
				const b = data[i + 2];
				const a = data[i + 3];

				if (a === 0) continue; // Skip fully transparent pixels

				const rgb = `${r},${g},${b}`;

				if (colorMap[rgb]) {
					colorMap[rgb]++;
				} else {
					colorMap[rgb] = 1;
				}

				if (colorMap[rgb] > maxCount) {
					dominantColor = rgb;
					maxCount = colorMap[rgb];
				}
			}

			const [r, g, b] = dominantColor.split(',').map(Number);
			resolve(rgbToHex(r, g, b));
		};

		img.onerror = () => reject(new Error('Failed to load image'));
	});
}
