const products = {
    1: {
        name: 'Daisy',
        price: 3.5,
        image: './images/flower1.png',
        desc: "Simple yet beautiful daisies bring joy, innocence, and freshness to every occasion. Their bright yellow centers and soft white petals create a lovely and cheerful appearance. Perfect for everyday gifts, birthdays, or adding a little natural beauty and happiness to someone's home.",
        rating: 0,
        reviewsNum: 0
    },
    2: {
        name: 'Sunflower',
        price: 5,
        image: './images/flower2.png',
        desc: "Bright and cheerful sunflowers bring warmth, happiness, and positive energy to any space. Their vibrant yellow petals and beautiful golden centers create a sunny atmosphere wherever they are placed. They are a perfect choice for birthdays, celebrations, or simply making someone's day a little brighter.",
        rating: 0,
        reviewsNum: 0
    },
    3: {
        name: 'White Rose',
        price: 4,
        image: './images/flower3.png',
        desc: 'Elegant white roses symbolize purity, love, and new beginnings. Their soft, delicate petals and timeless beauty make them a wonderful addition to any bouquet. Perfect for weddings, anniversaries, romantic occasions, or expressing your deepest feelings to someone special.',
        rating: 0,
        reviewsNum: 0
    },
    4: {
        name: 'Periwinkle',
        price: 3,
        image: './images/flower4.png',
        desc: 'Delicate periwinkle flowers add a touch of charm, freshness, and natural beauty to any arrangement. Their lovely blue-purple petals create a calm and peaceful atmosphere. These charming flowers are a beautiful choice for thoughtful gifts, garden decorations, and special moments.',
        rating: 0,
        reviewsNum: 0
    }
}

const savedRatings = JSON.parse(
    sessionStorage.getItem('productRatings') || '{}'
);

for (const id in products) {
    if (savedRatings[id]) {
        products[id].rating = savedRatings[id].rating;
        products[id].reviewsNum = savedRatings[id].reviewsNum;
    } else {
        const rating = Number(
            (Math.random() * (5 - 4) + 4).toFixed(1)
        );

        const reviewsNum = Math.floor(Math.random() * 2000) + 50;

        products[id].rating = rating;
        products[id].reviewsNum = reviewsNum;

        savedRatings[id] = {
            rating,
            reviewsNum
        };
    }
}

sessionStorage.setItem(
    'productRatings',
    JSON.stringify(savedRatings)
);

export default products;
