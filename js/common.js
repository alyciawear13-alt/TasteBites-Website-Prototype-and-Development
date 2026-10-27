/* =========================================================
   TasteBites – shared helpers used on every page
   ---------------------------------------------------------
   There is no database yet. Anything a visitor saves (their
   profile, reviews, a restaurant they list) is kept in their
   own browser with localStorage, so it only shows up for them.
   ========================================================= */

var STORAGE_KEYS = {
  profile: "tastebites.profile",
  reviews: "tastebites.reviews",           // reviews written in this browser
  restaurants: "tastebites.restaurants",   // restaurants listed in this browser
  disclaimer: "tastebites.disclaimerAccepted"
};

// ---------- localStorage helpers ----------
function loadJSON(key, fallback) {
  try {
    var raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

// ---------- Diner profile ----------
function getProfile() {
  return loadJSON(STORAGE_KEYS.profile, { name: "", email: "", phone: "", allergies: [] });
}

function saveProfile(profile) {
  return saveJSON(STORAGE_KEYS.profile, profile);
}

// ---------- Restaurants ----------
// Sample restaurants from data.js + any listed in this browser.
function getAllRestaurants() {
  var added = loadJSON(STORAGE_KEYS.restaurants, []);
  var extraReviews = loadJSON(STORAGE_KEYS.reviews, {});
  return SAMPLE_RESTAURANTS.concat(added).map(function (r) {
    var copy = Object.assign({}, r);
    copy.reviews = (r.reviews || []).concat(extraReviews[r.id] || []);
    return copy;
  });
}

function getRestaurantById(id) {
  return getAllRestaurants().find(function (r) { return r.id === id; });
}

function addReview(restaurantId, review) {
  var all = loadJSON(STORAGE_KEYS.reviews, {});
  all[restaurantId] = (all[restaurantId] || []).concat([review]);
  return saveJSON(STORAGE_KEYS.reviews, all);
}

function addRestaurant(restaurant) {
  var added = loadJSON(STORAGE_KEYS.restaurants, []);
  added = added.filter(function (r) { return r.id !== restaurant.id; });
  added.push(restaurant);
  return saveJSON(STORAGE_KEYS.restaurants, added);
}

// ---------- Allergen helpers ----------
function allergenLabel(id) {
  var a = ALLERGENS.find(function (x) { return x.id === id; });
  return a ? a.label : id;
}

function statusFor(restaurant, allergenId) {
  return (restaurant.accommodates && restaurant.accommodates[allergenId]) || "ask";
}

var STATUS_TEXT = { yes: "Can accommodate", ask: "Ask staff", no: "Cannot accommodate" };

/*
  Compare a restaurant with the diner's allergies.
  Returns { level: "good" | "warn" | "bad" | "none", text: "..." }
*/
function matchRestaurant(restaurant, allergies) {
  if (!allergies || allergies.length === 0) {
    return { level: "none", text: "" };
  }
  var no = allergies.filter(function (a) { return statusFor(restaurant, a) === "no"; });
  var ask = allergies.filter(function (a) { return statusFor(restaurant, a) === "ask"; });
  if (no.length) {
    return { level: "bad", text: "Can't accommodate: " + no.map(allergenLabel).join(", ") };
  }
  if (ask.length) {
    return { level: "warn", text: "Ask staff about: " + ask.map(allergenLabel).join(", ") };
  }
  return { level: "good", text: "Says it can accommodate all your allergies" };
}

/*
  Can this menu item work for the diner?
  Returns { fits: true/false, mustRemove: [...], blocking: [...] }
*/
function checkMenuItem(item, allergies) {
  var hits = (item.contains || []).filter(function (a) { return allergies.indexOf(a) !== -1; });
  var removable = item.canRemove || [];
  var mustRemove = hits.filter(function (a) { return removable.indexOf(a) !== -1; });
  var blocking = hits.filter(function (a) { return removable.indexOf(a) === -1; });
  return { fits: blocking.length === 0, mustRemove: mustRemove, blocking: blocking };
}

// ---------- Small display helpers ----------
function priceText(level) {
  return "$$$".slice(0, level || 1);
}

function stars(n) {
  return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
}

function averageRating(reviews) {
  if (!reviews || reviews.length === 0) return null;
  var sum = reviews.reduce(function (t, r) { return t + Number(r.rating); }, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

// Distance in miles between two { lat, lng } points.
function milesBetween(a, b) {
  var toRad = function (d) { return (d * Math.PI) / 180; };
  var R = 3958.8;
  var dLat = toRad(b.lat - a.lat);
  var dLng = toRad(b.lng - a.lng);
  var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Turn user-typed text into safe HTML text (stops broken pages and script injection).
function escapeHTML(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(iso) {
  if (!iso) return "";
  var d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ---------- Runs on every page ----------
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu button (the ☰ icon)
  var toggle = document.querySelector(".menu-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Highlight the current page in the menu
  var page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });

  // Show the diner's first name on the Profile link once they've saved one
  var profile = getProfile();
  var profileLink = document.querySelector(".profile-link");
  if (profileLink && profile.name) {
    profileLink.textContent = "👤 " + profile.name.split(" ")[0];
  }

  // Disclaimer box with an "I understand" checkbox (home page)
  var box = document.querySelector(".disclaimer[data-accept]");
  if (box) {
    var check = box.querySelector("input[type=checkbox]");
    var accepted = loadJSON(STORAGE_KEYS.disclaimer, false);
    check.checked = accepted;
    box.classList.toggle("accepted", accepted);
    check.addEventListener("change", function () {
      saveJSON(STORAGE_KEYS.disclaimer, check.checked);
      box.classList.toggle("accepted", check.checked);
    });
  }
});
