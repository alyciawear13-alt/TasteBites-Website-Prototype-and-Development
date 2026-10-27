/* =========================================================
   Find Restaurants page (find.html)
   Builds the filter checkboxes, then shows the restaurants
   (list + map) that match the filters.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  var profile = getProfile();
  var restaurants = getAllRestaurants();

  // ---------- 1. Build the filter checkboxes ----------
  function makeCheckboxes(containerId, items, name, checkedValues) {
    var box = document.getElementById(containerId);
    box.innerHTML = items.map(function (item) {
      var checked = checkedValues.indexOf(item.value) !== -1 ? "checked" : "";
      return '<label><input type="checkbox" name="' + name + '" value="' + item.value + '" ' + checked + "> " + item.label + "</label>";
    }).join("");
  }

  makeCheckboxes("allergy-filters",
    ALLERGENS.map(function (a) { return { value: a.id, label: a.icon + " " + a.label }; }),
    "allergy", profile.allergies || []);
  makeCheckboxes("cuisine-filters", CUISINES.map(function (c) { return { value: c, label: c }; }), "cuisine", []);
  makeCheckboxes("meal-filters", MEALS.map(function (m) { return { value: m, label: m }; }), "meal", []);
  makeCheckboxes("price-filters", [1, 2, 3].map(function (p) { return { value: String(p), label: priceText(p) }; }), "price", []);

  // Pre-fill the search box from the home page search (find.html?q=tacos)
  var params = new URLSearchParams(location.search);
  document.getElementById("search").value = params.get("q") || "";

  // Friendly note at the top
  var hint = document.getElementById("profile-hint");
  if (profile.allergies && profile.allergies.length) {
    hint.innerHTML = "Showing results for your saved allergies. Change them below for this search, or update your <a href=\"profile.html\">profile</a>.";
  } else {
    hint.innerHTML = "Tip: <a href=\"profile.html\">save your allergies</a> so we can check every restaurant for you.";
  }

  // On phones, start with the filter panel folded up so results are visible
  if (window.innerWidth < 860) document.getElementById("filter-panel").open = false;

  // ---------- 2. Read the current filters ----------
  function checkedValues(name) {
    return Array.prototype.map.call(
      document.querySelectorAll('input[name="' + name + '"]:checked'),
      function (el) { return el.value; }
    );
  }

  function currentFilters() {
    return {
      text: document.getElementById("search").value.trim().toLowerCase(),
      allergies: checkedValues("allergy"),
      hideUnsafe: document.getElementById("hide-unsafe").checked,
      cuisines: checkedValues("cuisine"),
      meals: checkedValues("meal"),
      prices: checkedValues("price").map(Number),
      certifiedOnly: document.getElementById("certified-only").checked,
      sort: document.getElementById("sort").value
    };
  }

  // ---------- 3. Decide which restaurants to show ----------
  function matchesText(r, text) {
    if (!text) return true;
    var haystack = [r.name, r.cuisine, r.bio].concat((r.menu || []).map(function (m) { return m.name; }))
      .join(" ").toLowerCase();
    return haystack.indexOf(text) !== -1;
  }

  var LEVEL_ORDER = { good: 0, none: 1, warn: 2, bad: 3 };

  function filterAndSort(f) {
    var list = restaurants.map(function (r) {
      return Object.assign({}, r, {
        match: matchRestaurant(r, f.allergies),
        miles: milesBetween(MAP_CENTER, r),
        avg: averageRating(r.reviews)
      });
    }).filter(function (r) {
      if (!matchesText(r, f.text)) return false;
      if (f.hideUnsafe && r.match.level === "bad") return false;
      if (f.cuisines.length && f.cuisines.indexOf(r.cuisine) === -1) return false;
      if (f.meals.length && !f.meals.some(function (m) { return (r.meals || []).indexOf(m) !== -1; })) return false;
      if (f.prices.length && f.prices.indexOf(r.price) === -1) return false;
      if (f.certifiedOnly && !r.certified) return false;
      return true;
    });

    list.sort(function (a, b) {
      if (f.sort === "distance") return a.miles - b.miles;
      if (f.sort === "rating") return (b.avg || 0) - (a.avg || 0);
      // "Best match": safest first, then certified, then closest
      return (LEVEL_ORDER[a.match.level] - LEVEL_ORDER[b.match.level]) ||
        (Number(b.certified) - Number(a.certified)) ||
        (a.miles - b.miles);
    });
    return list;
  }

  // ---------- 4. Draw the results ----------
  function resultCard(r) {
    var badge = r.certified
      ? '<span class="badge certified">✔ TasteBites Certified</span>'
      : '<span class="badge self">Self-reported (not certified)</span>';
    var rating = r.avg ? '<span class="stars">' + stars(Math.round(r.avg)) + "</span> " + r.avg + " allergy rating (" + r.reviews.length + ")" : "No reviews yet";
    var matchLine = r.match.level === "none" ? ""
      : '<div class="match ' + r.match.level + '">' + (r.match.level === "good" ? "✅ " : r.match.level === "warn" ? "⚠️ " : "⛔ ") + escapeHTML(r.match.text) + "</div>";
    var link = "restaurant.html?id=" + encodeURIComponent(r.id);

    return '<article class="card result-card">' +
      '<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center">' +
        '<h3 style="margin:0"><a href="' + link + '">' + escapeHTML(r.name) + "</a></h3>" + badge +
      "</div>" +
      '<div class="meta"><span>' + escapeHTML(r.cuisine) + "</span><span>" + priceText(r.price) + "</span><span>" +
        r.miles.toFixed(1) + " mi</span><span>" + escapeHTML((r.meals || []).join(" · ")) + "</span></div>" +
      matchLine +
      '<div class="small">' + rating + "</div>" +
      '<div><a class="btn secondary" href="' + link + '">View allergy profile →</a></div>' +
    "</article>";
  }

  function render() {
    var f = currentFilters();
    var list = filterAndSort(f);
    var countText = list.length + (list.length === 1 ? " restaurant" : " restaurants");
    if (f.hideUnsafe) {
      // Tell the diner how many were hidden so results never look mysteriously empty
      var hidden = filterAndSort(Object.assign({}, f, { hideUnsafe: false })).length - list.length;
      if (hidden > 0) countText += " (" + hidden + " hidden because they can't accommodate you)";
    }
    document.getElementById("result-count").textContent = countText;
    document.getElementById("results").innerHTML = list.length
      ? list.map(resultCard).join("")
      : '<div class="card muted">No restaurants match these filters yet. Try removing a filter.</div>';
    updateMap(list);
  }

  // ---------- 5. Map (only if the Leaflet library loaded) ----------
  var map = null;
  var markerLayer = null;
  if (window.L) {
    var mapEl = document.getElementById("map");
    mapEl.classList.remove("map-fallback");
    mapEl.textContent = "";
    map = L.map("map").setView([MAP_CENTER.lat, MAP_CENTER.lng], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);
    markerLayer = L.layerGroup().addTo(map);
  } else {
    document.getElementById("map").textContent = "Map unavailable offline. The list below still works.";
  }

  function updateMap(list) {
    if (!map) return;
    markerLayer.clearLayers();
    list.forEach(function (r) {
      if (typeof r.lat !== "number" || typeof r.lng !== "number") return;
      L.marker([r.lat, r.lng])
        .bindPopup('<strong>' + escapeHTML(r.name) + "</strong><br>" + escapeHTML(r.cuisine) + " · " + priceText(r.price) +
          '<br><a href="restaurant.html?id=' + encodeURIComponent(r.id) + '">View profile</a>')
        .addTo(markerLayer);
    });
  }

  // ---------- 6. Re-draw whenever a filter changes ----------
  document.querySelector(".filters").addEventListener("input", render);
  document.getElementById("sort").addEventListener("change", render);
  document.getElementById("clear-filters").addEventListener("click", function () {
    document.querySelectorAll('.filters input[type="checkbox"]').forEach(function (el) {
      el.checked = el.id === "hide-unsafe" || (el.name === "allergy" && (profile.allergies || []).indexOf(el.value) !== -1);
    });
    document.getElementById("search").value = "";
    render();
  });

  render();
});
