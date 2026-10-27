/* =========================================================
   Restaurant Profile page (restaurant.html?id=green-table)
   Reads the id from the web address and fills in the page.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  var id = new URLSearchParams(location.search).get("id");
  var r = getRestaurantById(id);

  if (!r) {
    document.getElementById("not-found").classList.remove("hidden");
    return;
  }

  var profile = getProfile();
  var myAllergies = profile.allergies || [];
  document.title = r.name + " – TasteBites";
  document.getElementById("restaurant").classList.remove("hidden");

  // ---------- Header info ----------
  document.getElementById("r-name").textContent = r.name;
  document.getElementById("r-meta").innerHTML = [
    escapeHTML(r.cuisine), priceText(r.price), escapeHTML(r.address),
    escapeHTML(r.phone), escapeHTML(r.hours)
  ].filter(Boolean).map(function (x) { return "<span>" + x + "</span>"; }).join("");
  document.getElementById("r-badge").innerHTML = r.certified
    ? '<span class="badge certified">✔ TasteBites Certified</span>'
    : '<span class="badge self">Self-reported (not certified)</span>';
  document.getElementById("r-bio").textContent = r.bio || "";
  document.getElementById("r-updated").textContent = r.lastUpdated
    ? "Allergy info last updated " + formatDate(r.lastUpdated)
    : "";

  // ---------- Match box ----------
  var match = matchRestaurant(r, myAllergies);
  var matchBox = document.getElementById("r-match");
  if (match.level === "none") {
    matchBox.innerHTML = '<a href="profile.html">Save your allergies</a> to see which dishes here fit you.';
  } else {
    var icon = match.level === "good" ? "✅" : match.level === "warn" ? "⚠️" : "⛔";
    matchBox.innerHTML = '<span class="match ' + match.level + '">' + icon + " " + escapeHTML(match.text) + "</span>" +
      '<span class="small muted"> · Your allergies: ' + myAllergies.map(allergenLabel).join(", ") + "</span>";
  }

  // ---------- Allergen table ----------
  document.getElementById("r-allergens").innerHTML = ALLERGENS.map(function (a) {
    var s = statusFor(r, a.id);
    var mine = myAllergies.indexOf(a.id) !== -1 ? " <strong>(you)</strong>" : "";
    return "<tr><td>" + a.icon + " " + a.label + mine + '</td><td><span class="chip ' + s + '">' + STATUS_TEXT[s] + "</span></td></tr>";
  }).join("");

  // ---------- Practices + allergens in facility ----------
  var practices = r.practices || [];
  document.getElementById("r-practices").innerHTML = practices.length
    ? practices.map(function (p) { return "<li>" + escapeHTML(p) + "</li>"; }).join("")
    : '<li class="muted">The restaurant hasn\'t described its practices yet.</li>';
  var facility = r.allergensInFacility || [];
  document.getElementById("r-facility").innerHTML = facility.length
    ? facility.map(function (a) { return '<span class="chip">' + allergenLabel(a) + "</span>"; }).join("")
    : '<span class="muted small">Not provided</span>';

  // ---------- Menu ----------
  document.getElementById("menu-hint").textContent = myAllergies.length
    ? "Dishes highlighted in green fit your allergies (some need a change, which we note)."
    : "Each dish lists the major allergens it contains.";

  document.getElementById("r-menu").innerHTML = (r.menu || []).map(function (item) {
    var check = checkMenuItem(item, myAllergies);
    var cls = "menu-item";
    var note = "";
    if (myAllergies.length) {
      if (check.fits) {
        cls += " fits";
        note = check.mustRemove.length
          ? '<div class="match good small">✅ Fits you if you ask for it without: ' + check.mustRemove.map(allergenLabel).join(", ") + "</div>"
          : '<div class="match good small">✅ Fits your allergies</div>';
      } else {
        cls += " contains";
        note = '<div class="match bad small">Contains: ' + check.blocking.map(allergenLabel).join(", ") + "</div>";
      }
    }
    var contains = (item.contains || []).length
      ? "Contains: " + item.contains.map(allergenLabel).join(", ")
      : "No major allergens listed";
    var removable = (item.canRemove || []).length
      ? " · Can be made without: " + item.canRemove.map(allergenLabel).join(", ")
      : "";
    return '<div class="' + cls + '">' +
      '<div class="top"><span>' + escapeHTML(item.name) + "</span><span>$" + escapeHTML(item.price) + "</span></div>" +
      '<div class="small">' + escapeHTML(item.description) + "</div>" +
      '<div class="small muted">' + contains + removable + "</div>" +
      note +
    "</div>";
  }).join("") || '<p class="muted">No menu posted yet.</p>';

  // ---------- Reviews ----------
  function drawReviews(reviews) {
    var avg = averageRating(reviews);
    var html = avg
      ? '<p><span class="stars">' + stars(Math.round(avg)) + "</span> <strong>" + avg + "</strong> average from " + reviews.length + " review" + (reviews.length === 1 ? "" : "s") + "</p>"
      : '<p class="muted">No reviews yet. Be the first!</p>';
    html += reviews.slice().reverse().map(function (rv) {
      return '<div class="review">' +
        '<div><span class="stars">' + stars(Number(rv.rating)) + "</span> <strong>" + escapeHTML(rv.name) + "</strong>" +
        ' <span class="small muted">· ' + escapeHTML(rv.allergy) + " · " + formatDate(rv.date) + "</span></div>" +
        "<div>" + escapeHTML(rv.text) + "</div>" +
      "</div>";
    }).join("");
    document.getElementById("r-reviews").innerHTML = html;
  }
  drawReviews(r.reviews || []);

  // Pre-fill the review form from the diner's profile
  if (profile.name) document.getElementById("rv-name").value = profile.name;
  if (myAllergies.length) document.getElementById("rv-allergy").value = myAllergies.map(allergenLabel).join(", ");

  document.getElementById("review-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var review = {
      name: document.getElementById("rv-name").value.trim(),
      allergy: document.getElementById("rv-allergy").value.trim(),
      rating: Number(document.getElementById("rv-rating").value),
      text: document.getElementById("rv-text").value.trim(),
      date: new Date().toISOString().slice(0, 10)
    };
    addReview(r.id, review);
    drawReviews(getRestaurantById(r.id).reviews);
    document.getElementById("rv-text").value = "";
    document.getElementById("rv-saved").classList.remove("hidden");
  });
});
