import { sql } from "../config/db.js";

export const SAMPLE_PRODUCTS = [
  // // BREAKFAST
  // {
  //   name: "Pancakes",
  //   price: 6.99,
  //   image: "https://images.unsplash.com/photo-1575853121743-60c24f0a7502?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBhbmNha2V8ZW58MHx8MHx8fDA%3D",
  //   category: "breakfast",
  //   ingredients: ["flour", "milk", "eggs", "sugar", "butter"]
  // },
  // {
  //   name: "French Toast",
  //   price: 7.49,
  //   image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlbmNoJTIwdG9hc3R8ZW58MHx8MHx8fDA%3D",
  //   category: "breakfast",
  //   ingredients: ["bread", "eggs", "milk", "cinnamon", "syrup"]
  // },
  // {
  //   name: "Omelette",
  //   price: 8.99,
  //   image: "https://images.unsplash.com/photo-1677844592730-ce9c936d8f1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b21lbGV0dGV8ZW58MHx8MHx8fDA%3D",
  //   category: "breakfast",
  //   ingredients: ["eggs", "cheese", "peppers", "onions"]
  // },
  // {
  //   name: "Waffles",
  //   price: 7.99,
  //   image: "https://images.unsplash.com/photo-1641924673100-7c9f0682ece6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdhZmZsZXN8ZW58MHx8MHx8fDA%3D",
  //   category: "breakfast",
  //   ingredients: ["flour", "milk", "eggs", "baking powder"]
  // },
  // {
  //   name: "Avocado Toast",
  //   price: 9.49,
  //   image: "https://plus.unsplash.com/premium_photo-1676106623114-e2edc4f04fe0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGF2b2NhZG8lMjB0b2FzdHxlbnwwfHwwfHx8MA%3D%3D",
  //   category: "breakfast",
  //   ingredients: ["bread", "avocado", "salt", "pepper"]
  // },
  // {
  //   name: "Sausage & Egg Muffin",
  //   price: 7.99,
  //   image: "https://plus.unsplash.com/premium_photo-1733306506331-adaca500eaf2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2F1c2FnZSUyMCUyNiUyMEVnZyUyME11ZmZpbnxlbnwwfHwwfHx8MA%3D%3D",
  //   category: "breakfast",
  //   ingredients: ["egg", "sausage", "cheese", "muffin bun"]
  // },
  // {
  //   name: "Breakfast Burrito",
  //   price: 10.49,
  //   image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVycml0b3xlbnwwfHwwfHx8MA%3D%3D",
  //   category: "breakfast",
  //   ingredients: ["eggs", "tortilla", "cheese", "sausage"]
  // },
  // {
  //   name: "Cinnamon Roll",
  //   price: 4.99,
  //   image: "https://plus.unsplash.com/premium_photo-1672865349434-b38838dd1182?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2luYW1vbiUyMHJvbGx8ZW58MHx8MHx8fDA%3D",
  //   category: "breakfast",
  //   ingredients: ["flour", "sugar", "cinnamon", "butter", "yeast"]
  // },  
  // {
  //   name: "Bacon & Eggs",
  //   price: 8.49,
  //   image: "https://plus.unsplash.com/premium_photo-1693086421131-c0cb5a3bada3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmFjb24lMjAlMjYlMjBFZ2dzfGVufDB8fDB8fHww",
  //   category: "breakfast",
  //   ingredients: ["eggs", "bacon", "salt"]
  // },
  // {
  //   name: "Breakfast Sandwich",
  //   price: 6.49,
  //   image: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2FuZHdpY2h8ZW58MHx8MHx8fDA%3D",
  //   category: "breakfast",
  //   ingredients: ["egg", "cheese", "bacon", "toasted bun"]
  // },  

  // // lunch
  // {
  //   name: "Grilled Chicken Sandwich",
  //   price: 11.99,
  //   image: "https://plus.unsplash.com/premium_photo-1739142431087-f8768ff66b57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEdyaWxsZWQlMjBDaGlja2VuJTIwU2FuZHdpY2h8ZW58MHx8MHx8fDA%3D",
  //   category: "lunch",
  //   ingredients: ["chicken breast", "lettuce", "tomato", "bun"]
  // },
  // {
  //   name: "Beef Burger",
  //   price: 12.49,
  //   image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmVlZiUyMEJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
  //   category: "lunch",
  //   ingredients: ["beef patty", "cheese", "lettuce", "bun"]
  // },
  // {
  //   name: "Caesar Salad",
  //   price: 9.99,
  //   image: "https://plus.unsplash.com/premium_photo-1700089483464-4f76cc3d360b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2Flc2FyJTIwU2FsYWR8ZW58MHx8MHx8fDA%3D",
  //   category: "lunch",
  //   ingredients: ["lettuce", "croutons", "parmesan", "caesar dressing"]
  // },
  // {
  //   name: "Chicken Fried Rice",
  //   price: 10.49,
  //   image: "https://plus.unsplash.com/premium_photo-1694141251673-1758913ade48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2hpY2tlbiUyMEZyaWVkJTIwUmljZXxlbnwwfHwwfHx8MA%3D%3D",
  //   category: "lunch",
  //   ingredients: ["rice", "chicken", "soy sauce", "vegetables"]
  // },
  // {
  //   name: "Spaghetti Bolognese",
  //   price: 13.99,
  //   image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3BhZ2hldHRpJTIwQm9sb2duZXNlfGVufDB8fDB8fHww",
  //   category: "lunch",
  //   ingredients: ["pasta", "ground beef", "tomato sauce"]
  // },
  // {
  //   name: "Chicken Shawarma Wrap",
  //   price: 8.99,
  //   image: "https://media.istockphoto.com/id/1356818887/photo/roast-chicken-blt-lettuce-wrap-sandwich.webp?a=1&b=1&s=612x612&w=0&k=20&c=rULhAzptIRXjueq_K82zRAX0A7UNdp0LYyIWWwd54VU=",
  //   category: "lunch",
  //   ingredients: ["chicken", "tortilla", "garlic sauce", "lettuce"]
  // },
  // {
  //   name: "Grilled Salmon Plate",
  //   price: 15.49,
  //   image: "https://media.istockphoto.com/id/1457092074/photo/baked-salmon-fillet-with-vegetables.webp?a=1&b=1&s=612x612&w=0&k=20&c=P3fLPQUHCqQBNoTbNUZn0qQ3ubHqCcD1GrGRyQ7GahY=",
  //   category: "lunch",
  //   ingredients: ["salmon", "lemon", "rice", "vegetables"]
  // },
  // {
  //   name: "BBQ Ribs",
  //   price: 18.99,
  //   image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QkJRJTIwUmlic3xlbnwwfHwwfHx8MA%3D%3D",
  //   category: "lunch",
  //   ingredients: ["pork ribs", "bbq sauce", "spices"]
  // },
  // {
  //   name: "Tacos",
  //   price: 9.49,
  //   image: "https://plus.unsplash.com/premium_photo-1661730329741-b3bf77019b39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VGFjb3N8ZW58MHx8MHx8fDA%3D",
  //   category: "lunch",
  //   ingredients: ["tortilla", "beef", "cheese", "lettuce"]
  // },
  // {
  //   name: "Mac & Cheese",
  //   price: 11.49,
  //   image: "https://images.unsplash.com/photo-1707528904014-658b4c068ec5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWFjJTIwJTI2JTIwQ2hlZXNlfGVufDB8fDB8fHww",
  //   category: "lunch",
  //   ingredients: ["macaroni", "cheddar", "cream", "butter"]
  // },

  // // dinner
  // {
  //   name: "Steak & Mashed Potatoes",
  //   price: 19.99,
  //   image: "https://media.istockphoto.com/id/1349299883/photo/traditional-steak-and-mashed-potatoes.webp?a=1&b=1&s=612x612&w=0&k=20&c=gUfES8uYdpJoLtvSWqSHMtmRupUCV0haP4IhmUGwizM=",
  //   category: "dinner",
  //   ingredients: ["steak", "potatoes", "butter", "salt"]
  // },
  // {
  //   name: "Grilled Chicken & Veggies",
  //   price: 16.49,
  //   image: "https://media.istockphoto.com/id/104019452/photo/chicken-meal.webp?a=1&b=1&s=612x612&w=0&k=20&c=RPRlioxYn2a9E_SNzVe6O1IWIkrPPQ5-PJzZlKx23Jw=",
  //   category: "dinner",
  //   ingredients: ["chicken breast", "carrots", "broccoli", "seasoning"]
  // },
  // {
  //   name: "Jollof Rice & Chicken",
  //   price: 13.99,
  //   image: "https://media.istockphoto.com/id/688602226/photo/jollof-rice-with-chicken-and-plantains.webp?a=1&b=1&s=612x612&w=0&k=20&c=yziUVbgIUo5X4Dr3pc7QY6LlZ62nDg2XDJKQNnVdqe0=",
  //   category: "dinner",
  //   ingredients: ["rice", "tomato stew", "chicken", "spices"]
  // },
  // {
  //   name: "Beef Stir Fry",
  //   price: 14.49,
  //   image: "https://media.istockphoto.com/id/644070696/photo/beef-and-broccoli-stir-fry.webp?a=1&b=1&s=612x612&w=0&k=20&c=OLt9-s8Ow5M4BJv49taa1SKBdZRKMTKvW0UlurJFV7k=",
  //   category: "dinner",
  //   ingredients: ["beef", "peppers", "soy sauce", "vegetables"]
  // },
  // {
  //   name: "Shrimp Pasta",
  //   price: 17.99,
  //   image: "https://images.unsplash.com/photo-1762631178604-3b79d4d0bff9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fFNocmltcCUyMFBhc3RhfGVufDB8fDB8fHww",
  //   category: "dinner",
  //   ingredients: ["pasta", "shrimp", "cream sauce", "garlic"]
  // },
  // {
  //   name: "Fried Rice & Grilled Turkey",
  //   price: 12.99,
  //   image: "https://media.istockphoto.com/id/1390969031/photo/close-up-asian-chicken-fried-rice-popular-take-out-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=F6IhHcF6wJ_j4riDCpvasI0_e6wRTBbBKCTQMLVrFZ0=",
  //   category: "dinner",
  //   ingredients: ["rice", "vegetables", "turkey", "soy sauce"]
  // },
  // {
  //   name: "Chicken Curry & Rice",
  //   price: 14.99,
  //   image: "https://media.istockphoto.com/id/1145286289/photo/tofu-curry-with-rice-and-naan-bread.webp?a=1&b=1&s=612x612&w=0&k=20&c=g-uchOuilPwJ49Ni-71i7MZIHDfMnCpjxfum-WRPW8s=",
  //   category: "dinner",
  //   ingredients: ["chicken", "curry sauce", "rice", "spices"]
  // },
  // {
  //   name: "Beef Lasagna",
  //   price: 15.49,
  //   image: "https://images.unsplash.com/photo-1730900737654-ac6d843139da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEJlZWYlMjBMYXNhZ25hfGVufDB8fDB8fHww",
  //   category: "dinner",
  //   ingredients: ["pasta sheets", "ground beef", "cheese", "tomato sauce"]
  // },
  // {
  //   name: "Prawns & Garlic Butter",
  //   price: 18.49,
  //   image: "https://media.istockphoto.com/id/1420207604/photo/pan-fried-butter-garlic-shrimp-on-plate.webp?a=1&b=1&s=612x612&w=0&k=20&c=kxB1D-SkikwSoGxi7hC-g7EivHOrKnX4Oka1pXL9S04=",
  //   category: "dinner",
  //   ingredients: ["prawns", "garlic", "butter", "lemon"]
  // },
  // {
  //   name: "Roasted Chicken & Potatoes",
  //   price: 16.99,
  //   image: "https://plus.unsplash.com/premium_photo-1698172221740-80f3ff030f4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Um9hc3RlZCUyMENoaWNrZW4lMjAlMjYlMjBQb3RhdG9lc3xlbnwwfHwwfHx8MA%3D%3D",
  //   category: "dinner",
  //   ingredients: ["chicken", "potatoes", "herbs", "oil"]
  // }
  
  // {
  //   name: "Chocolate Lava Cake",
  //   price: 6.99,
  //   image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Dark Chocolate", "Butter", "Eggs", "Sugar", "Flour", "Vanilla Extract"]
  // },
  // {
  //   name: "Tiramisu",
  //   price: 7.49,
  //   image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Ladyfingers", "Mascarpone", "Espresso", "Eggs", "Sugar", "Cocoa Powder"]
  // },
  // {
  //   name: "Cheesecake",
  //   price: 6.49,
  //   image: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Cream Cheese", "Graham Crackers", "Butter", "Sugar", "Eggs", "Vanilla"]
  // },
  // {
  //   name: "Puff Puff",
  //   price: 3.99,
  //   image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Flour", "Yeast", "Sugar", "Nutmeg", "Salt", "Vegetable Oil"]
  // },
  // {
  //   name: "Chin Chin",
  //   price: 4.49,
  //   image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Flour", "Sugar", "Butter", "Eggs", "Nutmeg", "Milk"]
  // },
  // {
  //   name: "Banana Fritters",
  //   price: 4.99,
  //   image: "https://images.unsplash.com/photo-1603729362753-f8162ac6c3df?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Bananas", "Flour", "Sugar", "Eggs", "Cinnamon", "Vegetable Oil"]
  // },
  // {
  //   name: "Ice Cream Sundae",
  //   price: 5.49,
  //   image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Vanilla Ice Cream", "Chocolate Sauce", "Whipped Cream", "Cherries", "Nuts", "Sprinkles"]
  // },
  // {
  //   name: "Brownies",
  //   price: 4.99,
  //   image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Chocolate", "Butter", "Sugar", "Eggs", "Flour", "Cocoa Powder"]
  // },
  // {
  //   name: "Coconut Candy",
  //   price: 3.49,
  //   image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Coconut", "Sugar", "Ginger", "Food Coloring", "Water"]
  // },
  // {
  //   name: "Apple Pie",
  //   price: 5.99,
  //   image: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Apples", "Pie Crust", "Sugar", "Cinnamon", "Butter", "Lemon Juice"]
  // },
  // {
  //   name: "Pancakes",
  //   price: 5.49,
  //   image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Flour", "Eggs", "Milk", "Sugar", "Baking Powder", "Maple Syrup"]
  // },
  // {
  //   name: "Churros",
  //   price: 4.99,
  //   image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Flour", "Water", "Butter", "Sugar", "Cinnamon", "Vegetable Oil"]
  // },
  // {
  //   name: "Donuts",
  //   price: 3.99,
  //   image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Flour", "Yeast", "Sugar", "Eggs", "Milk", "Glaze"]
  // },
  // {
  //   name: "Fruit Salad",
  //   price: 4.49,
  //   image: "https://images.unsplash.com/photo-1564093497595-593b96d80180?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Pineapple", "Watermelon", "Grapes", "Oranges", "Apples", "Honey"]
  // },
  // {
  //   name: "Crème Brûlée",
  //   price: 7.99,
  //   image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Heavy Cream", "Egg Yolks", "Sugar", "Vanilla Bean", "Salt"]
  // },
  // {
  //   name: "Cupcakes",
  //   price: 4.49,
  //   image: "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Flour", "Sugar", "Butter", "Eggs", "Baking Powder", "Frosting"]
  // },
  // {
  //   name: "Macarons",
  //   price: 6.99,
  //   image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Almond Flour", "Egg Whites", "Sugar", "Food Coloring", "Buttercream", "Vanilla"]
  // },
  // {
  //   name: "Waffles",
  //   price: 5.99,
  //   image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Flour", "Eggs", "Milk", "Sugar", "Baking Powder", "Butter"]
  // },
  // {
  //   name: "Pudding",
  //   price: 3.99,
  //   image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Milk", "Sugar", "Cornstarch", "Eggs", "Vanilla Extract", "Whipped Cream"]
  // },
  // {
  //   name: "Gelato",
  //   price: 5.99,
  //   image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=500&auto=format&fit=crop&q=60",
  //   category: "dessert",
  //   ingredients: ["Milk", "Cream", "Sugar", "Egg Yolks", "Vanilla", "Fresh Fruit"]
  // }
  
  {
    name: "Spring Rolls",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Rice Paper", "Vegetables", "Shrimp", "Dipping Sauce"]
  },
  {
    name: "Chicken Wings",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Chicken Wings", "Hot Sauce", "Butter", "Garlic"]
  },
  {
    name: "Samosa",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Pastry", "Potatoes", "Peas", "Spices"]
  },
  {
    name: "Mozzarella Sticks",
    price: 5.49,
    image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Mozzarella", "Breadcrumbs", "Marinara Sauce"]
  },
  {
    name: "Suya",
    price: 6.49,
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Beef", "Suya Spice", "Onions", "Peppers"]
  },
  {
    name: "Plantain Chips",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1621009549421-37e302a9d45c?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Plantains", "Salt", "Vegetable Oil"]
  },
  {
    name: "Bruschetta",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Bread", "Tomatoes", "Basil", "Olive Oil"]
  },
  {
    name: "Akara",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Black-eyed Peas", "Onions", "Peppers", "Salt"]
  },
  {
    name: "Nachos",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Tortilla Chips", "Cheese", "Jalapeños", "Salsa"]
  },
  {
    name: "Peppered Snail",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Snails", "Peppers", "Onions", "Spices"]
  },
  {
    name: "Calamari",
    price: 7.49,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Squid", "Flour", "Lemon", "Aioli"]
  },
  {
    name: "Kebab",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Beef", "Peppers", "Onions", "Spices"]
  },
  {
    name: "Stuffed Mushrooms",
    price: 6.49,
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Mushrooms", "Cream Cheese", "Garlic", "Herbs"]
  },
  {
    name: "Gizdodo",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1598511726623-d2e9996892f0?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Gizzard", "Plantains", "Peppers", "Onions"]
  },
  {
    name: "Egg Rolls",
    price: 5.49,
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Wrappers", "Cabbage", "Carrots", "Ground Meat"]
  },
  {
    name: "Chicken Satay",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Chicken", "Peanut Sauce", "Spices", "Skewers"]
  },
  {
    name: "Prawn Crackers",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Prawn", "Tapioca Starch", "Salt"]
  },
  {
    name: "Deviled Eggs",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Eggs", "Mayonnaise", "Mustard", "Paprika"]
  },
  {
    name: "Meat Pie",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Pastry", "Ground Beef", "Potatoes", "Carrots"]
  },
  {
    name: "Potato Wedges",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1598511726623-d2e9996892f0?w=500&auto=format&fit=crop&q=60",
    category: "appetizer",
    ingredients: ["Potatoes", "Paprika", "Garlic", "Sour Cream"]
  }  

];
