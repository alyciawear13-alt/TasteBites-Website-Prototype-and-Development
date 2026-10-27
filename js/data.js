/* =========================================================
   TasteBites – sample data
   ---------------------------------------------------------
   Everything the site shows comes from this file (plus anything
   a visitor saves in their own browser, see storage.js).

   IMPORTANT: these restaurants are MADE UP for the prototype.
   They are not the real SLO restaurants from our interviews.
   To add a restaurant, copy one object in SAMPLE_RESTAURANTS,
   give it a new unique `id`, and change the details.
   ========================================================= */

// The FDA "top 9" major allergens, plus gluten (for celiac disease).
// `id` is what the code uses; `label` is what people see.
var ALLERGENS = [
  { id: "milk",      label: "Milk / dairy",  icon: "🥛", foundIn: "Butter, cheese, cream sauces, baked goods, some breads and dressings." },
  { id: "egg",       label: "Eggs",          icon: "🥚", foundIn: "Baked goods, mayonnaise, aioli, pasta, batters and breading, some sauces." },
  { id: "fish",      label: "Fish",          icon: "🐟", foundIn: "Fish dishes, Caesar dressing, Worcestershire sauce, fish sauce in Asian cooking." },
  { id: "shellfish", label: "Shellfish",     icon: "🦐", foundIn: "Shrimp, crab, lobster, some broths and seafood seasonings. Shared fryers are a common risk." },
  { id: "treenut",   label: "Tree nuts",     icon: "🌰", foundIn: "Almonds, walnuts, cashews, pesto, desserts, granola, some sauces and oils." },
  { id: "peanut",    label: "Peanuts",       icon: "🥜", foundIn: "Peanut sauces, Asian and African dishes, baked goods, candy, some chili and mole." },
  { id: "wheat",     label: "Wheat",         icon: "🌾", foundIn: "Bread, pasta, tortillas, breading, soy sauce, gravies and thickened soups." },
  { id: "soy",       label: "Soy",           icon: "🫘", foundIn: "Soy sauce, tofu, edamame, many processed foods and vegetable oils." },
  { id: "sesame",    label: "Sesame",        icon: "⚪", foundIn: "Sesame seeds and oil, tahini, hummus, buns and bagels." },
  { id: "gluten",    label: "Gluten (celiac)", icon: "🍞", foundIn: "Wheat, barley and rye: bread, pasta, beer, soy sauce, and anything fried in a shared fryer." }
];

// Choices for the filters on the Find Restaurants page.
var CUISINES = ["American", "Mexican", "Italian", "Asian", "Mediterranean", "Cafe"];
var MEALS = ["Breakfast", "Lunch", "Dinner", "Dessert"];

// Center of the map (downtown San Luis Obispo, CA).
var MAP_CENTER = { lat: 35.2799, lng: -120.6622 };

/*
  How each restaurant describes an allergen (the `accommodates` field):
    "yes" = can accommodate, has a procedure for it
    "ask" = sometimes / limited, talk to staff first
    "no"  = cannot safely accommodate
  If an allergen is missing from `accommodates`, it is treated as "ask".
*/
var SAMPLE_RESTAURANTS = [
  {
    id: "green-table",
    name: "The Green Table",
    cuisine: "American",
    meals: ["Breakfast", "Lunch", "Dinner"],
    price: 2,
    address: "880 Higuera St, San Luis Obispo, CA",
    phone: "(805) 555-0142",
    hours: "Daily 8am – 9pm",
    lat: 35.2795, lng: -120.6627,
    certified: true,
    lastUpdated: "2026-10-20",
    bio: "Farm-to-table kitchen with a dedicated allergen prep station. Every allergy order gets a purple ticket and is plated by the chef on duty.",
    practices: [
      "Separate prep station and color-coded cutting boards for allergy orders",
      "Dedicated gluten-free fryer",
      "All staff complete allergen training during onboarding",
      "Allergy tickets are marked in purple and checked by the chef before leaving the kitchen"
    ],
    allergensInFacility: ["milk", "egg", "wheat", "gluten", "soy", "treenut", "fish"],
    accommodates: { milk: "yes", egg: "yes", fish: "yes", shellfish: "yes", treenut: "ask", peanut: "yes", wheat: "yes", soy: "yes", sesame: "yes", gluten: "yes" },
    menu: [
      { name: "Harvest Grain Bowl", price: 15, description: "Quinoa, roasted squash, kale, lemon-tahini dressing.", contains: ["sesame"], canRemove: ["sesame"] },
      { name: "Classic Smash Burger", price: 16, description: "Two patties, cheddar, house sauce, brioche bun (GF bun available).", contains: ["milk", "egg", "wheat", "gluten", "sesame"], canRemove: ["milk", "wheat", "gluten", "sesame"] },
      { name: "Grilled Salmon Plate", price: 24, description: "Salmon, herbed potatoes, seasonal vegetables.", contains: ["fish", "milk"], canRemove: ["milk"] },
      { name: "Buttermilk Pancakes", price: 12, description: "Stack of three with maple syrup.", contains: ["milk", "egg", "wheat", "gluten"], canRemove: [] },
      { name: "Flourless Chocolate Cake", price: 9, description: "Rich chocolate cake with whipped cream.", contains: ["milk", "egg"], canRemove: [] }
    ],
    reviews: [
      { name: "Maya R.", allergy: "Celiac", rating: 5, date: "2026-10-12", text: "Server knew exactly what celiac meant and confirmed the dedicated fryer without me asking twice." },
      { name: "Jordan M.", allergy: "Dairy", rating: 4, date: "2026-09-28", text: "Easy to swap out cheese. Took a few extra minutes but felt safe." }
    ]
  },
  {
    id: "casa-limon",
    name: "Casa Limón",
    cuisine: "Mexican",
    meals: ["Lunch", "Dinner"],
    price: 1,
    address: "1021 Monterey St, San Luis Obispo, CA",
    phone: "(805) 555-0178",
    hours: "Tue – Sun 11am – 10pm",
    lat: 35.2820, lng: -120.6598,
    certified: true,
    lastUpdated: "2026-10-15",
    bio: "Family-owned taqueria. Corn tortillas are made in-house in a wheat-free area, and we are happy to walk you through every salsa.",
    practices: [
      "Corn tortillas made on a separate press away from flour",
      "Ingredient binder at the register for every salsa and marinade",
      "Gloves and utensils changed for allergy orders"
    ],
    allergensInFacility: ["milk", "wheat", "gluten", "shellfish", "peanut"],
    accommodates: { milk: "yes", egg: "yes", fish: "yes", shellfish: "ask", treenut: "yes", peanut: "no", wheat: "yes", soy: "yes", sesame: "yes", gluten: "yes" },
    menu: [
      { name: "Carne Asada Tacos", price: 11, description: "Three corn tortillas, grilled steak, onion, cilantro, salsa verde.", contains: [], canRemove: [] },
      { name: "Chicken Mole Plate", price: 14, description: "House mole (contains peanuts), rice, beans.", contains: ["peanut", "sesame", "wheat", "gluten"], canRemove: [] },
      { name: "Shrimp Burrito", price: 13, description: "Flour tortilla, garlic shrimp, rice, cheese.", contains: ["shellfish", "wheat", "gluten", "milk"], canRemove: ["milk"] },
      { name: "Veggie Bowl", price: 10, description: "Rice, black beans, fajita vegetables, guacamole, pico.", contains: [], canRemove: [] }
    ],
    reviews: [
      { name: "Alex P.", allergy: "Gluten", rating: 5, date: "2026-10-03", text: "They showed me the separate tortilla press. Best tacos I've had without worrying." }
    ]
  },
  {
    id: "nonna-sofia",
    name: "Nonna Sofia's",
    cuisine: "Italian",
    meals: ["Dinner", "Dessert"],
    price: 3,
    address: "740 Chorro St, San Luis Obispo, CA",
    phone: "(805) 555-0109",
    hours: "Wed – Mon 5pm – 10pm",
    lat: 35.2805, lng: -120.6640,
    certified: false,
    lastUpdated: "2026-08-02",
    bio: "Classic Italian with fresh pasta made daily. We have gluten-free pasta, but flour is in the air in our kitchen, so we cannot promise it is safe for celiac.",
    practices: [
      "Gluten-free pasta cooked in a separate pot of fresh water",
      "Nut-free pesto available on request"
    ],
    allergensInFacility: ["milk", "egg", "wheat", "gluten", "treenut", "fish", "shellfish"],
    accommodates: { milk: "ask", egg: "ask", fish: "yes", shellfish: "yes", treenut: "ask", peanut: "yes", wheat: "ask", soy: "yes", sesame: "yes", gluten: "no" },
    menu: [
      { name: "Fresh Fettuccine Alfredo", price: 22, description: "House egg pasta, parmesan cream sauce.", contains: ["wheat", "gluten", "egg", "milk"], canRemove: [] },
      { name: "Linguine alle Vongole", price: 26, description: "Clams, garlic, white wine, chili.", contains: ["shellfish", "wheat", "gluten"], canRemove: [] },
      { name: "Insalata Mista", price: 11, description: "Mixed greens, olive oil, balsamic.", contains: [], canRemove: [] },
      { name: "Tiramisu", price: 10, description: "Espresso-soaked ladyfingers, mascarpone.", contains: ["milk", "egg", "wheat", "gluten"], canRemove: [] }
    ],
    reviews: [
      { name: "Sam K.", allergy: "Tree nuts", rating: 3, date: "2026-07-19", text: "They had a nut-free pesto, but I had to explain my allergy to two different people." }
    ]
  },
  {
    id: "lotus-kitchen",
    name: "Lotus Kitchen",
    cuisine: "Asian",
    meals: ["Lunch", "Dinner"],
    price: 2,
    address: "1150 Garden St, San Luis Obispo, CA",
    phone: "(805) 555-0163",
    hours: "Daily 11am – 9:30pm",
    lat: 35.2788, lng: -120.6605,
    certified: false,
    lastUpdated: "2026-09-10",
    bio: "Pan-Asian noodles and rice bowls. We use tamari (gluten-free soy sauce) in all our sauces.",
    practices: [
      "Tamari instead of regular soy sauce in house sauces",
      "Woks are washed between allergy orders on request"
    ],
    allergensInFacility: ["soy", "peanut", "treenut", "sesame", "shellfish", "fish", "egg", "wheat", "gluten"],
    accommodates: { milk: "yes", egg: "ask", fish: "ask", shellfish: "ask", treenut: "no", peanut: "no", wheat: "yes", soy: "no", sesame: "no", gluten: "yes" },
    menu: [
      { name: "Chicken Pad Thai", price: 15, description: "Rice noodles, egg, peanuts, tamarind sauce.", contains: ["peanut", "egg", "fish", "soy"], canRemove: ["peanut"] },
      { name: "Teriyaki Salmon Bowl", price: 17, description: "Rice, salmon, tamari glaze, sesame, pickled vegetables.", contains: ["fish", "soy", "sesame"], canRemove: ["sesame"] },
      { name: "Vegetable Fried Rice", price: 12, description: "Jasmine rice, egg, mixed vegetables, tamari.", contains: ["egg", "soy"], canRemove: ["egg"] }
    ],
    reviews: []
  },
  {
    id: "olive-and-fig",
    name: "Olive & Fig",
    cuisine: "Mediterranean",
    meals: ["Lunch", "Dinner"],
    price: 2,
    address: "975 Osos St, San Luis Obispo, CA",
    phone: "(805) 555-0121",
    hours: "Mon – Sat 11am – 8pm",
    lat: 35.2812, lng: -120.6580,
    certified: true,
    lastUpdated: "2026-10-24",
    bio: "Mediterranean plates built around fresh vegetables and grilled proteins. Most of our menu is naturally gluten-free and dairy-free.",
    practices: [
      "Allergen chart for every dish posted at the counter and updated when recipes change",
      "Dedicated gluten-free pita baked separately",
      "Manager on every shift trained in allergen handling"
    ],
    allergensInFacility: ["sesame", "milk", "wheat", "gluten", "treenut"],
    accommodates: { milk: "yes", egg: "yes", fish: "yes", shellfish: "yes", treenut: "yes", peanut: "yes", wheat: "yes", soy: "yes", sesame: "ask", gluten: "yes" },
    menu: [
      { name: "Chicken Shawarma Plate", price: 16, description: "Rice, salad, garlic sauce, pita (GF pita available).", contains: ["wheat", "gluten", "egg"], canRemove: ["wheat", "gluten"] },
      { name: "Falafel Bowl", price: 14, description: "Falafel, hummus, tabbouleh, tahini.", contains: ["sesame", "wheat", "gluten"], canRemove: [] },
      { name: "Greek Salad", price: 12, description: "Tomato, cucumber, olives, feta, oregano vinaigrette.", contains: ["milk"], canRemove: ["milk"] },
      { name: "Grilled Lamb Kebabs", price: 21, description: "Lamb, peppers, onions, herbed rice.", contains: [], canRemove: [] }
    ],
    reviews: [
      { name: "Lily B.", allergy: "Peanuts & tree nuts", rating: 5, date: "2026-10-18", text: "The manager came out to talk me through the menu. I didn't feel like a burden at all." },
      { name: "Priya S.", allergy: "Sesame", rating: 3, date: "2026-10-01", text: "Honest that sesame is everywhere in the kitchen. Appreciated the honesty, limited options for me." }
    ]
  },
  {
    id: "morning-bloom",
    name: "Morning Bloom Cafe",
    cuisine: "Cafe",
    meals: ["Breakfast", "Lunch", "Dessert"],
    price: 1,
    address: "1340 Broad St, San Luis Obispo, CA",
    phone: "(805) 555-0190",
    hours: "Daily 7am – 3pm",
    lat: 35.2772, lng: -120.6570,
    certified: false,
    lastUpdated: "2026-06-30",
    bio: "Neighborhood coffee shop with pastries, breakfast burritos and sandwiches. Oat and almond milk available.",
    practices: [
      "Separate steam wand for non-dairy milks"
    ],
    allergensInFacility: ["milk", "egg", "wheat", "gluten", "treenut", "peanut", "soy"],
    accommodates: { milk: "yes", egg: "ask", treenut: "no", peanut: "no", wheat: "no", gluten: "no" },
    menu: [
      { name: "Breakfast Burrito", price: 10, description: "Egg, potato, cheddar, salsa, flour tortilla.", contains: ["egg", "milk", "wheat", "gluten"], canRemove: ["milk"] },
      { name: "Avocado Toast", price: 9, description: "Sourdough, avocado, chili flakes, lemon.", contains: ["wheat", "gluten"], canRemove: [] },
      { name: "Oat Milk Latte", price: 5, description: "Espresso with steamed oat milk.", contains: [], canRemove: [] },
      { name: "Almond Croissant", price: 5, description: "Butter croissant with almond filling.", contains: ["treenut", "milk", "egg", "wheat", "gluten"], canRemove: [] }
    ],
    reviews: []
  }
];
