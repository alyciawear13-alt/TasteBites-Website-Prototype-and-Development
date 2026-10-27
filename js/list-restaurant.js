/* =========================================================
   List Your Restaurant page (list-restaurant.html)
   Builds the form, then saves the restaurant in this browser.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  // ---------- Build the form pieces from data.js ----------
  document.getElementById("f-cuisine").innerHTML = CUISINES.map(function (c) {
    return "<option>" + c + "</option>";
  }).join("");

  document.getElementById("f-meals").innerHTML = MEALS.map(function (m) {
    return '<label><input type="checkbox" name="meal" value="' + m + '"> ' + m + "</label>";
  }).join("");

  document.getElementById("f-facility").innerHTML = ALLERGENS.map(function (a) {
    return '<label><input type="checkbox" name="facility" value="' + a.id + '"> ' + a.icon + " " + a.label + "</label>";
  }).join("");

  document.getElementById("f-accommodates").innerHTML = ALLERGENS.map(function (a) {
    return "<tr><td>" + a.icon + " " + a.label + "</td><td>" +
      '<select name="acc-' + a.id + '" style="width:auto">' +
        '<option value="yes">Can accommodate</option>' +
        '<option value="ask" selected>Ask staff</option>' +
        '<option value="no">Cannot accommodate</option>' +
      "</select></td></tr>";
  }).join("");

  // ---------- Menu: one block per dish ----------
  var dishCount = 0;
  function addDish() {
    dishCount++;
    var n = dishCount;
    var div = document.createElement("div");
    div.className = "menu-item dish";
    div.innerHTML =
      '<div class="grid-2">' +
        '<div class="field"><label>Dish name</label><input type="text" class="d-name"></div>' +
        '<div class="field"><label>Price ($)</label><input type="text" class="d-price" inputmode="decimal"></div>' +
      "</div>" +
      '<div class="field" style="margin-top:10px"><label>Description</label><input type="text" class="d-desc"></div>' +
      '<div class="field" style="margin-top:10px"><label>Contains</label><div class="check-grid">' +
        ALLERGENS.map(function (a) {
          return '<label><input type="checkbox" class="d-contains" value="' + a.id + '"> ' + a.label + "</label>";
        }).join("") +
      "</div></div>" +
      '<div class="field" style="margin-top:10px"><label>Can be made without</label><div class="check-grid">' +
        ALLERGENS.map(function (a) {
          return '<label><input type="checkbox" class="d-remove" value="' + a.id + '"> ' + a.label + "</label>";
        }).join("") +
      "</div></div>" +
      '<button type="button" class="btn secondary remove-dish" style="margin-top:10px">Remove dish ' + n + "</button>";
    div.querySelector(".remove-dish").addEventListener("click", function () { div.remove(); });
    document.getElementById("f-menu").appendChild(div);
  }
  document.getElementById("add-dish").addEventListener("click", addDish);
  addDish(); // start with one empty dish

  // ---------- Save ----------
  function checked(selector, root) {
    return Array.prototype.map.call((root || document).querySelectorAll(selector + ":checked"), function (el) { return el.value; });
  }
  function val(id) { return document.getElementById(id).value.trim(); }

  document.getElementById("restaurant-form").addEventListener("submit", function (e) {
    e.preventDefault();

    var name = val("f-name");
    var accommodates = {};
    ALLERGENS.forEach(function (a) {
      accommodates[a.id] = document.querySelector('select[name="acc-' + a.id + '"]').value;
    });

    var menu = Array.prototype.map.call(document.querySelectorAll(".dish"), function (d) {
      return {
        name: d.querySelector(".d-name").value.trim(),
        price: d.querySelector(".d-price").value.trim(),
        description: d.querySelector(".d-desc").value.trim(),
        contains: checked(".d-contains", d),
        canRemove: checked(".d-remove", d)
      };
    }).filter(function (item) { return item.name; });

    var restaurant = {
      // id like "joes-diner-1730000000000" so it never clashes with another one
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now(),
      name: name,
      cuisine: val("f-cuisine"),
      meals: checked('input[name="meal"]'),
      price: Number(val("f-price")),
      address: val("f-address"),
      phone: val("f-phone"),
      hours: val("f-hours"),
      // No real address lookup yet, so place the pin near downtown SLO.
      lat: MAP_CENTER.lat + (Math.random() - 0.5) * 0.008,
      lng: MAP_CENTER.lng + (Math.random() - 0.5) * 0.008,
      certified: false,
      lastUpdated: new Date().toISOString().slice(0, 10),
      bio: val("f-bio"),
      practices: val("f-practices").split("\n").map(function (s) { return s.trim(); }).filter(Boolean),
      allergensInFacility: checked('input[name="facility"]'),
      accommodates: accommodates,
      menu: menu,
      reviews: []
    };

    addRestaurant(restaurant);
    document.getElementById("restaurant-form").classList.add("hidden");
    document.getElementById("done-link").href = "restaurant.html?id=" + encodeURIComponent(restaurant.id);
    document.getElementById("done").classList.remove("hidden");
    window.scrollTo(0, 0);
  });
});
