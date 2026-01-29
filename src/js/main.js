(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]'))
        a(o);
    new MutationObserver(o => {
        for (const s of o)
            if (s.type === "childList")
                for (const i of s.addedNodes)
                    i.tagName === "LINK" && i.rel === "modulepreload" && a(i)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(o) {
        const s = {};
        return o.integrity && (s.integrity = o.integrity),
        o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy),
        o.crossOrigin === "use-credentials" ? s.credentials = "include" : o.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin",
        s
    }
    function a(o) {
        if (o.ep)
            return;
        o.ep = !0;
        const s = n(o);
        fetch(o.href, s)
    }
}
)();
const Je = "VwECw2OiAzxVzIqnwmKJUG41FbeXJk1y"
  , Ze = "ettHKfVK4KzXl2OoacHCMmHCl3042ioKkCgZ8OsIYIo"
  , ne = "https://date.nager.at/api/v3"
  , Xe = "https://api.open-meteo.com/v1"
  , Le = "https://v6.exchangerate-api.com/v6/805842951e5953ad31497176/latest"
  , Ce = "https://restcountries.com/v3.1"
  , Qe = "https://api.sunrise-sunset.org/json"
  , et = "https://api.unsplash.com"
  , ge = new Map;
let I = []
  , Re = []
  , y = JSON.parse(localStorage.getItem("wanderlust_plans") || "[]")
  , tt = null
  , C = {}
  , L = []
  , U = {}
  , r = {
    countryCode: null,
    countryName: null,
    cityName: null,
    cityLat: null,
    cityLon: null,
    year: new Date().getFullYear()
};
function ce(e) {
    return `https://flagcdn.com/w40/${e.toLowerCase()}.png`
}
const Fe = {
    US: [{
        name: "New York",
        lat: 40.7128,
        lon: -74.006
    }, {
        name: "Los Angeles",
        lat: 34.0522,
        lon: -118.2437
    }, {
        name: "Chicago",
        lat: 41.8781,
        lon: -87.6298
    }, {
        name: "Miami",
        lat: 25.7617,
        lon: -80.1918
    }, {
        name: "San Francisco",
        lat: 37.7749,
        lon: -122.4194
    }],
    GB: [{
        name: "London",
        lat: 51.5074,
        lon: -.1278
    }, {
        name: "Manchester",
        lat: 53.4808,
        lon: -2.2426
    }, {
        name: "Edinburgh",
        lat: 55.9533,
        lon: -3.1883
    }, {
        name: "Birmingham",
        lat: 52.4862,
        lon: -1.8904
    }, {
        name: "Liverpool",
        lat: 53.4084,
        lon: -2.9916
    }],
    DE: [{
        name: "Berlin",
        lat: 52.52,
        lon: 13.405
    }, {
        name: "Munich",
        lat: 48.1351,
        lon: 11.582
    }, {
        name: "Frankfurt",
        lat: 50.1109,
        lon: 8.6821
    }, {
        name: "Hamburg",
        lat: 53.5511,
        lon: 9.9937
    }, {
        name: "Cologne",
        lat: 50.9375,
        lon: 6.9603
    }],
    FR: [{
        name: "Paris",
        lat: 48.8566,
        lon: 2.3522
    }, {
        name: "Lyon",
        lat: 45.764,
        lon: 4.8357
    }, {
        name: "Marseille",
        lat: 43.2965,
        lon: 5.3698
    }, {
        name: "Nice",
        lat: 43.7102,
        lon: 7.262
    }, {
        name: "Bordeaux",
        lat: 44.8378,
        lon: -.5792
    }],
    IT: [{
        name: "Rome",
        lat: 41.9028,
        lon: 12.4964
    }, {
        name: "Milan",
        lat: 45.4642,
        lon: 9.19
    }, {
        name: "Florence",
        lat: 43.7696,
        lon: 11.2558
    }, {
        name: "Venice",
        lat: 45.4408,
        lon: 12.3155
    }, {
        name: "Naples",
        lat: 40.8518,
        lon: 14.2681
    }],
    ES: [{
        name: "Madrid",
        lat: 40.4168,
        lon: -3.7038
    }, {
        name: "Barcelona",
        lat: 41.3851,
        lon: 2.1734
    }, {
        name: "Seville",
        lat: 37.3891,
        lon: -5.9845
    }, {
        name: "Valencia",
        lat: 39.4699,
        lon: -.3763
    }, {
        name: "Bilbao",
        lat: 43.263,
        lon: -2.935
    }],
    NL: [{
        name: "Amsterdam",
        lat: 52.3676,
        lon: 4.9041
    }, {
        name: "Rotterdam",
        lat: 51.9244,
        lon: 4.4777
    }, {
        name: "The Hague",
        lat: 52.0705,
        lon: 4.3007
    }, {
        name: "Utrecht",
        lat: 52.0907,
        lon: 5.1214
    }],
    PT: [{
        name: "Lisbon",
        lat: 38.7223,
        lon: -9.1393
    }, {
        name: "Porto",
        lat: 41.1579,
        lon: -8.6291
    }, {
        name: "Faro",
        lat: 37.0194,
        lon: -7.9322
    }],
    AT: [{
        name: "Vienna",
        lat: 48.2082,
        lon: 16.3738
    }, {
        name: "Salzburg",
        lat: 47.8095,
        lon: 13.055
    }, {
        name: "Innsbruck",
        lat: 47.2692,
        lon: 11.4041
    }],
    CH: [{
        name: "Zurich",
        lat: 47.3769,
        lon: 8.5417
    }, {
        name: "Geneva",
        lat: 46.2044,
        lon: 6.1432
    }, {
        name: "Bern",
        lat: 46.948,
        lon: 7.4474
    }],
    BE: [{
        name: "Brussels",
        lat: 50.8503,
        lon: 4.3517
    }, {
        name: "Antwerp",
        lat: 51.2194,
        lon: 4.4025
    }, {
        name: "Bruges",
        lat: 51.2093,
        lon: 3.2247
    }],
    SE: [{
        name: "Stockholm",
        lat: 59.3293,
        lon: 18.0686
    }, {
        name: "Gothenburg",
        lat: 57.7089,
        lon: 11.9746
    }, {
        name: "Malmo",
        lat: 55.6059,
        lon: 13.0007
    }],
    NO: [{
        name: "Oslo",
        lat: 59.9139,
        lon: 10.7522
    }, {
        name: "Bergen",
        lat: 60.3913,
        lon: 5.3221
    }],
    DK: [{
        name: "Copenhagen",
        lat: 55.6761,
        lon: 12.5683
    }, {
        name: "Aarhus",
        lat: 56.1629,
        lon: 10.2039
    }],
    PL: [{
        name: "Warsaw",
        lat: 52.2297,
        lon: 21.0122
    }, {
        name: "Krakow",
        lat: 50.0647,
        lon: 19.945
    }, {
        name: "Gdansk",
        lat: 54.352,
        lon: 18.6466
    }],
    CZ: [{
        name: "Prague",
        lat: 50.0755,
        lon: 14.4378
    }, {
        name: "Brno",
        lat: 49.1951,
        lon: 16.6068
    }],
    GR: [{
        name: "Athens",
        lat: 37.9838,
        lon: 23.7275
    }, {
        name: "Thessaloniki",
        lat: 40.6401,
        lon: 22.9444
    }],
    JP: [{
        name: "Tokyo",
        lat: 35.6762,
        lon: 139.6503
    }, {
        name: "Osaka",
        lat: 34.6937,
        lon: 135.5023
    }, {
        name: "Kyoto",
        lat: 35.0116,
        lon: 135.7681
    }],
    AU: [{
        name: "Sydney",
        lat: -33.8688,
        lon: 151.2093
    }, {
        name: "Melbourne",
        lat: -37.8136,
        lon: 144.9631
    }, {
        name: "Brisbane",
        lat: -27.4698,
        lon: 153.0251
    }],
    CA: [{
        name: "Toronto",
        lat: 43.6532,
        lon: -79.3832
    }, {
        name: "Vancouver",
        lat: 49.2827,
        lon: -123.1207
    }, {
        name: "Montreal",
        lat: 45.5017,
        lon: -73.5673
    }],
    BR: [{
        name: "São Paulo",
        lat: -23.5505,
        lon: -46.6333
    }, {
        name: "Rio de Janeiro",
        lat: -22.9068,
        lon: -43.1729
    }],
    MX: [{
        name: "Mexico City",
        lat: 19.4326,
        lon: -99.1332
    }, {
        name: "Cancun",
        lat: 21.1619,
        lon: -86.8515
    }],
    EG: [{
        name: "Cairo",
        lat: 30.0444,
        lon: 31.2357
    }, {
        name: "Alexandria",
        lat: 31.2001,
        lon: 29.9187
    }],
    IE: [{
        name: "Dublin",
        lat: 53.3498,
        lon: -6.2603
    }, {
        name: "Cork",
        lat: 51.8985,
        lon: -8.4756
    }],
    FI: [{
        name: "Helsinki",
        lat: 60.1699,
        lon: 24.9384
    }]
}
  , he = [{
    name: "Paris",
    country: "France",
    query: "paris eiffel tower",
    code: "FR"
}, {
    name: "Tokyo",
    country: "Japan",
    query: "tokyo japan city",
    code: "JP"
}, {
    name: "New York",
    country: "USA",
    query: "new york skyline",
    code: "US"
}, {
    name: "Rome",
    country: "Italy",
    query: "rome colosseum italy",
    code: "IT"
}];
document.addEventListener("DOMContentLoaded", nt);
async function nt() {
    at(),
    it(),
    Me(),
    setInterval(Me, 6e4),
    await dt(),
    ct(),
    ue(),
    wt(),
    bt(),
    $t(),
    lt(),
    me(),
    Rt()
}
function at() {
    document.querySelectorAll(".nav-item").forEach(e => {
        e.addEventListener("click", t => {
            t.preventDefault();
            const n = e.dataset.view;
            n && navigateTo(n)
        }
        )
    }
    )
}
window.navigateTo = function(e) {
    document.querySelectorAll(".nav-item").forEach(n => {
        n.classList.toggle("active", n.dataset.view === e)
    }
    ),
    document.querySelectorAll(".view").forEach(n => {
        n.classList.remove("active")
    }
    );
    const t = document.getElementById(`${e}-view`);
    t && t.classList.add("active"),
    st(e),
    xe(),
    r.countryCode && ot(e),
    e === "my-plans" && (Ve(),
    pe())
}
;
async function ot(e) {
    switch (qe(e),
    ["events", "weather", "sun-times"].includes(e) && await re(),
    e) {
    case "holidays":
        await loadHolidays();
        break;
    case "events":
        r.cityLat && r.cityLon && await loadEvents();
        break;
    case "weather":
        r.cityLat && r.cityLon && await loadWeather();
        break;
    case "long-weekends":
        await loadLongWeekends();
        break;
    case "sun-times":
        r.cityLat && r.cityLon && await loadSunTimes();
        break
    }
}
async function re() {
    if (r.cityLat && r.cityLon || !r.countryCode)
        return;
    const e = await We(r.countryCode);
    e && (r.cityName = e.name + " (Capital)",
    r.cityLat = e.lat,
    r.cityLon = e.lon,
    de(),
    Ee())
}
function qe(e) {
    const n = {
        holidays: {
            selectionId: "holidays-selection",
            flagId: "holidays-flag",
            nameId: "holidays-country-name",
            cityId: null,
            yearId: "holidays-year-display"
        },
        events: {
            selectionId: "events-selection",
            flagId: "events-flag",
            nameId: "events-country-name",
            cityId: "events-city-name",
            yearId: null
        },
        weather: {
            selectionId: "weather-selection",
            flagId: "weather-flag",
            nameId: "weather-country-name",
            cityId: "weather-city-name",
            yearId: null
        },
        "long-weekends": {
            selectionId: "lw-selection",
            flagId: "lw-flag",
            nameId: "lw-country-name",
            cityId: null,
            yearId: "lw-year-display"
        },
        "sun-times": {
            selectionId: "sun-selection",
            flagId: "sun-flag",
            nameId: "sun-country-name",
            cityId: "sun-city-name",
            yearId: null
        }
    }[e];
    if (!n)
        return;
    const a = document.getElementById(n.selectionId)
      , o = document.getElementById(n.flagId)
      , s = document.getElementById(n.nameId)
      , i = n.cityId ? document.getElementById(n.cityId) : null
      , l = n.yearId ? document.getElementById(n.yearId) : null;
    r.countryCode ? (a && (a.style.display = "flex"),
    o && (o.src = ce(r.countryCode),
    o.style.display = "block"),
    s && (s.textContent = r.countryName),
    i && (i.textContent = r.cityName || ""),
    l && (l.textContent = r.year)) : a && (a.style.display = "none")
}
function Ee() {
    ["holidays", "events", "weather", "long-weekends", "sun-times"].forEach(e => {
        qe(e)
    }
    )
}
function st(e) {
    const t = {
        dashboard: {
            title: "Dashboard",
            subtitle: "Welcome back! Ready to plan your next adventure?"
        },
        holidays: {
            title: "Holidays",
            subtitle: "Explore public holidays around the world"
        },
        events: {
            title: "Events",
            subtitle: "Find concerts, sports, and entertainment"
        },
        weather: {
            title: "Weather",
            subtitle: "Check forecasts for any destination"
        },
        "long-weekends": {
            title: "Long Weekends",
            subtitle: "Find the perfect mini-trip opportunities"
        },
        "my-plans": {
            title: "My Plans",
            subtitle: "Your saved holidays and events"
        },
        currency: {
            title: "Currency",
            subtitle: "Convert currencies with live exchange rates"
        },
        "sun-times": {
            title: "Sun Times",
            subtitle: "Check sunrise and sunset times worldwide"
        }
    }
      , n = document.getElementById("page-title")
      , a = document.getElementById("page-subtitle");
    t[e] && (n.textContent = t[e].title,
    a.textContent = t[e].subtitle)
}
function it() {
    const e = document.getElementById("mobile-menu-btn")
      , t = document.getElementById("sidebar")
      , n = document.getElementById("sidebar-overlay");
    e == null || e.addEventListener("click", () => {
        t.classList.toggle("open"),
        n.classList.toggle("hidden"),
        n.classList.toggle("active")
    }
    ),
    n == null || n.addEventListener("click", xe)
}
function xe() {
    const e = document.getElementById("sidebar")
      , t = document.getElementById("sidebar-overlay");
    e == null || e.classList.remove("open"),
    t == null || t.classList.add("hidden"),
    t == null || t.classList.remove("active")
}
function Me() {
    const e = document.getElementById("current-datetime");
    if (e) {
        const t = new Date;
        e.textContent = t.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    }
}
function lt() {
    const e = new Date
      , t = new Date(e);
    t.setMonth(t.getMonth() + 1);
    const n = document.getElementById("search-start-date")
      , a = document.getElementById("search-end-date");
    n && (n.value = be(e)),
    a && (a.value = be(t))
}
function ct() {
    const e = document.getElementById("global-country")
      , t = document.getElementById("global-city")
      , n = document.getElementById("global-year");
    if (!e)
        return;
    ut(e, {
        id: "global-country",
        cityId: "global-city",
        placeholder: "Select Country"
    }),
    t && He(t, {
        id: "global-city",
        placeholder: "Select City",
        icon: "fa-city",
        emptyText: "Select a country first"
    });
    const a = new Date().getFullYear()
      , o = [a, a + 1, a + 2];
    n && (n.innerHTML = o.map(c => `<option value="${c}" ${c === a ? "selected" : ""}>${c}</option>`).join(""),
    He(n, {
        id: "global-year",
        placeholder: "Select Year",
        icon: "fa-calendar",
        defaultValue: a.toString()
    })),
    e.addEventListener("change", c => {
        ie()
    }
    ),
    t && t.addEventListener("change", c => {
        ie()
    }
    );
    const s = document.getElementById("global-search-btn");
    s && s.addEventListener("click", rt);
    const i = new MutationObserver( () => {
        ie()
    }
    )
      , l = document.getElementById("global-country-custom");
    l && i.observe(l, {
        subtree: !0,
        attributes: !0,
        attributeFilter: ["class"]
    })
}
function ie() {
    const e = document.getElementById("global-country")
      , t = document.getElementById("global-city")
      , n = document.getElementById("global-year")
      , a = e == null ? void 0 : e.value
      , o = t == null ? void 0 : t.value
      , s = n == null ? void 0 : n.value;
    if (a) {
        const i = I.find(l => l.countryCode === a);
        if (r.countryCode = a,
        r.countryName = (i == null ? void 0 : i.name) || a,
        r.year = s ? parseInt(s) : new Date().getFullYear(),
        o) {
            const l = Array.from(t.options).find(c => c.value === o);
            l && l.dataset.lat && l.dataset.lon ? (r.cityName = o,
            r.cityLat = parseFloat(l.dataset.lat),
            r.cityLon = parseFloat(l.dataset.lon)) : (r.cityName = o,
            r.cityLat = null,
            r.cityLon = null)
        } else
            r.cityName = null,
            r.cityLat = null,
            r.cityLon = null;
        de(),
        Ee()
    } else
        Ue()
}
function de() {
    const e = document.getElementById("selected-destination")
      , t = document.getElementById("selected-country-flag")
      , n = document.getElementById("selected-country-name")
      , a = document.getElementById("selected-city-name");
    !e || !r.countryCode || (t.src = ce(r.countryCode),
    t.alt = r.countryCode,
    n.textContent = r.countryName,
    a.textContent = r.cityName ? `• ${r.cityName}` : "",
    e.classList.remove("hidden"))
}
window.clearGlobalSelection = function() {
    Ue();
    const e = document.getElementById("global-country")
      , t = document.getElementById("global-city");
    e && (e.value = ""),
    t && (t.innerHTML = '<option value="">Select City</option>');
    const n = C["global-country"];
    if (n) {
        const s = n.trigger;
        s.querySelector(".flag").innerHTML = "",
        s.querySelector(".selected-text").textContent = "Select Country",
        s.querySelector(".selected-text").classList.add("placeholder")
    }
    const a = E["global-city"];
    if (a) {
        const s = a.trigger;
        s.querySelector(".selected-text").textContent = "Select City",
        s.querySelector(".selected-text").classList.add("placeholder"),
        a.dropdown.innerHTML = '<div class="simple-select-option no-results">Select a country first</div>'
    }
    const o = document.getElementById("selected-destination");
    o && o.classList.add("hidden"),
    Ee(),
    p("Selection cleared", "info")
}
;
function Ue() {
    r = {
        countryCode: null,
        countryName: null,
        cityName: null,
        cityLat: null,
        cityLon: null,
        year: new Date().getFullYear()
    },
    ze();
    const e = document.getElementById("selected-destination");
    e && e.classList.add("hidden")
}
async function rt() {
    if (ie(),
    !r.countryCode) {
        p("Please select a country first", "warning");
        return
    }
    p(`Exploring ${r.countryName}${r.cityName ? ", " + r.cityName : ""}!`, "success"),
    await ze()
}
async function dt() {
    try {
        I = await (await fetch(`${ne}/AvailableCountries`)).json(),
        I.sort( (t, n) => t.name.localeCompare(n.name))
    } catch (e) {
        console.error("Failed to load countries:", e),
        p("Failed to load countries", "error")
    }
}
function ut(e, t) {
    e.style.display = "none";
    const n = document.createElement("div");
    n.className = "custom-select-wrapper",
    n.id = `${t.id}-custom`;
    const a = document.createElement("div");
    a.className = "custom-select-trigger",
    a.innerHTML = `
    <span class="flag"></span>
    <span class="selected-text placeholder">${t.placeholder}</span>
    <i class="fa-solid fa-chevron-down arrow"></i>
  `;
    const o = document.createElement("div");
    o.className = "custom-select-dropdown",
    o.innerHTML = `
    <div class="custom-select-search">
      <i class="fa-solid fa-search"></i>
      <input type="text" placeholder="Search countries..." autocomplete="off">
    </div>
    <div class="custom-select-options"></div>
  `,
    n.appendChild(a),
    n.appendChild(o),
    e.parentNode.insertBefore(n, e.nextSibling),
    e.innerHTML = '<option value="">Select Country</option>' + I.map(i => `<option value="${i.countryCode}">${i.name}</option>`).join("");
    const s = o.querySelector(".custom-select-options");
    Ie(s, I),
    C[t.id] = {
        wrapper: n,
        trigger: a,
        dropdown: o,
        originalSelect: e,
        config: t,
        selectedValue: ""
    },
    mt(t.id)
}
function Ie(e, t, n="") {
    const a = n ? t.filter(o => o.name.toLowerCase().includes(n.toLowerCase()) || o.countryCode.toLowerCase().includes(n.toLowerCase())) : t;
    if (a.length === 0) {
        e.innerHTML = '<div class="custom-select-option no-results">No countries found</div>';
        return
    }
    e.innerHTML = a.map(o => `
    <div class="custom-select-option" data-value="${o.countryCode}" data-name="${o.name}">
      <img src="${ce(o.countryCode)}" alt="${o.countryCode}" class="flag-img" onerror="this.style.display='none'">
      <span class="country-name">${o.name}</span>
      <span class="country-code">${o.countryCode}</span>
    </div>
  `).join("")
}
function mt(e) {
    const t = C[e];
    if (!t)
        return;
    const {wrapper: n, trigger: a, dropdown: o, config: s} = t
      , i = o.querySelector("input")
      , l = o.querySelector(".custom-select-options");
    a.addEventListener("click", c => {
        c.stopPropagation(),
        Object.keys(C).forEach(u => {
            u !== e && X(u)
        }
        ),
        Object.keys(E).forEach(u => {
            Q(u)
        }
        ),
        o.classList.contains("open") ? X(e) : pt(e)
    }
    ),
    i.addEventListener("input", c => {
        Ie(l, I, c.target.value),
        we(e)
    }
    ),
    o.addEventListener("click", c => {
        c.stopPropagation()
    }
    ),
    we(e),
    document.addEventListener("click", () => {
        X(e)
    }
    )
}
function we(e) {
    const t = C[e];
    if (!t)
        return;
    const {dropdown: n, config: a} = t;
    n.querySelectorAll(".custom-select-option:not(.no-results)").forEach(s => {
        s.addEventListener("click", () => {
            const i = s.dataset.value
              , l = s.dataset.name;
            De(e, i, l)
        }
        )
    }
    )
}
function pt(e) {
    const t = C[e];
    if (!t)
        return;
    const {trigger: n, dropdown: a} = t
      , o = a.querySelector("input");
    n.classList.add("open"),
    a.classList.add("open"),
    setTimeout( () => {
        o.focus()
    }
    , 100)
}
function X(e) {
    const t = C[e];
    if (!t)
        return;
    const {trigger: n, dropdown: a} = t
      , o = a.querySelector("input");
    n.classList.remove("open"),
    a.classList.remove("open"),
    o.value = "",
    Ie(a.querySelector(".custom-select-options"), I),
    we(e)
}
function De(e, t, n) {
    const a = C[e];
    if (!a)
        return;
    const {trigger: o, dropdown: s, originalSelect: i, config: l} = a
      , c = o.querySelector(".flag")
      , d = o.querySelector(".selected-text");
    c.innerHTML = `<img src="${ce(t)}" alt="${t}" class="flag-img" onerror="this.style.display='none'">`,
    d.textContent = n,
    d.classList.remove("placeholder"),
    i.value = t,
    s.querySelectorAll(".custom-select-option").forEach(u => {
        u.classList.toggle("selected", u.dataset.value === t)
    }
    ),
    a.selectedValue = t,
    X(e),
    l.cityId && ke(t, l.cityId)
}
const E = {};
function He(e, t) {
    e.style.display = "none";
    const n = document.createElement("div");
    n.className = "simple-select-wrapper",
    n.id = `${t.id}-simple`;
    const a = document.createElement("div");
    a.className = "simple-select-trigger";
    const o = e.options.length > 1 || e.options.length === 1 && e.options[0].value;
    let s = t.placeholder
      , i = !0;
    if (t.defaultValue && o) {
        const c = Array.from(e.options).find(d => d.value === t.defaultValue);
        c && (s = c.textContent,
        i = !1,
        e.value = t.defaultValue)
    }
    a.innerHTML = `
    <span class="select-icon"><i class="fa-solid ${t.icon || "fa-list"}"></i></span>
    <span class="selected-text ${i ? "placeholder" : ""}">${s}</span>
    <i class="fa-solid fa-chevron-down arrow"></i>
  `;
    const l = document.createElement("div");
    l.className = "simple-select-dropdown",
    n.appendChild(a),
    n.appendChild(l),
    e.parentNode.insertBefore(n, e.nextSibling),
    ft(l, e, t),
    E[t.id] = {
        wrapper: n,
        trigger: a,
        dropdown: l,
        originalSelect: e,
        config: t,
        selectedValue: t.defaultValue || ""
    },
    yt(t.id)
}
function ft(e, t, n) {
    const a = Array.from(t.options);
    if (a.length === 0 || a.length === 1 && !a[0].value) {
        e.innerHTML = `<div class="simple-select-option no-results">${n.emptyText || "No options available"}</div>`;
        return
    }
    e.innerHTML = a.map(o => {
        var i, l;
        return `
      <div class="simple-select-option ${o.selected && o.value ? "selected" : ""}" 
           data-value="${o.value}" 
           data-lat="${((i = o.dataset) == null ? void 0 : i.lat) || ""}" 
           data-lon="${((l = o.dataset) == null ? void 0 : l.lon) || ""}">
        ${o.textContent}
      </div>
    `
    }
    ).join("")
}
function yt(e) {
    const t = E[e];
    if (!t)
        return;
    const {wrapper: n, trigger: a, dropdown: o, config: s} = t;
    a.addEventListener("click", i => {
        if (i.stopPropagation(),
        a.classList.contains("disabled"))
            return;
        Object.keys(E).forEach(c => {
            c !== e && Q(c)
        }
        ),
        Object.keys(C).forEach(c => {
            X(c)
        }
        ),
        o.classList.contains("open") ? Q(e) : vt(e)
    }
    ),
    o.addEventListener("click", i => {
        i.stopPropagation()
    }
    ),
    je(e),
    document.addEventListener("click", () => {
        Q(e)
    }
    )
}
function je(e) {
    const t = E[e];
    if (!t)
        return;
    const {dropdown: n} = t;
    n.querySelectorAll(".simple-select-option:not(.no-results):not(.loading)").forEach(o => {
        o.addEventListener("click", () => {
            const s = o.dataset.value
              , i = o.textContent.trim()
              , l = o.dataset.lat
              , c = o.dataset.lon;
            gt(e, s, i, l, c)
        }
        )
    }
    )
}
function vt(e) {
    const t = E[e];
    if (!t)
        return;
    const {trigger: n, dropdown: a} = t;
    n.classList.add("open"),
    a.classList.add("open")
}
function Q(e) {
    const t = E[e];
    if (!t)
        return;
    const {trigger: n, dropdown: a} = t;
    n.classList.remove("open"),
    a.classList.remove("open")
}
function gt(e, t, n, a, o) {
    const s = E[e];
    if (!s)
        return;
    const {trigger: i, dropdown: l, originalSelect: c, config: d} = s
      , u = i.querySelector(".selected-text");
    if (u.textContent = n,
    u.classList.toggle("placeholder", !t),
    c.value = t,
    a && o) {
        const m = c.querySelector(`option[value="${t}"]`);
        m && (m.dataset.lat = a,
        m.dataset.lon = o)
    }
    l.querySelectorAll(".simple-select-option").forEach(m => {
        m.classList.toggle("selected", m.dataset.value === t)
    }
    ),
    s.selectedValue = t,
    Q(e),
    c.dispatchEvent(new Event("change")),
    e === "global-year" && (r.year = parseInt(t))
}
function Z(e, t, n={}) {
    const a = E[e];
    if (!a)
        return;
    const {trigger: o, dropdown: s, originalSelect: i} = a
      , l = o.querySelector(".selected-text");
    if (n.loading) {
        s.innerHTML = '<div class="simple-select-option loading"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</div>',
        l.textContent = "Loading...",
        l.classList.add("placeholder"),
        o.classList.add("disabled");
        return
    }
    if (o.classList.remove("disabled"),
    i.innerHTML = t.map(c => `<option value="${c.value}" data-lat="${c.lat || ""}" data-lon="${c.lon || ""}">${c.text}</option>`).join(""),
    t.length === 0)
        s.innerHTML = `<div class="simple-select-option no-results">${n.emptyText || a.config.emptyText || "No options available"}</div>`,
        l.textContent = n.emptyText || a.config.placeholder,
        l.classList.add("placeholder");
    else if (s.innerHTML = t.map( (c, d) => `
      <div class="simple-select-option ${n.autoSelect && d === 0 ? "selected" : ""}" 
           data-value="${c.value}" 
           data-lat="${c.lat || ""}" 
           data-lon="${c.lon || ""}">
        ${c.text}
      </div>
    `).join(""),
    n.autoSelect && t.length > 0) {
        const c = t[0];
        l.textContent = c.text,
        l.classList.remove("placeholder"),
        i.value = c.value,
        a.selectedValue = c.value,
        i.dispatchEvent(new Event("change"))
    } else
        n.keepSelection || (l.textContent = a.config.placeholder,
        l.classList.add("placeholder"),
        a.selectedValue = "");
    je(e)
}
async function ke(e, t) {
    const n = document.getElementById(t);
    if (!n)
        return;
    const a = E[t]
      , o = Fe[e] || [];
    if (o.length === 0) {
        a ? Z(t, [], {
            loading: !0
        }) : n.innerHTML = '<option value="">Loading capital city...</option>';
        try {
            const s = await We(e);
            if (s) {
                const i = [{
                    value: s.name,
                    text: `${s.name} (Capital)`,
                    lat: s.lat,
                    lon: s.lon
                }];
                a ? Z(t, i, {
                    autoSelect: !0
                }) : (n.innerHTML = `<option value="${s.name}" data-lat="${s.lat}" data-lon="${s.lon}">${s.name} (Capital)</option>`,
                n.selectedIndex = 0,
                n.dispatchEvent(new Event("change")))
            } else
                a ? Z(t, [], {
                    emptyText: "No city data available"
                }) : n.innerHTML = '<option value="">No city data available</option>'
        } catch (s) {
            console.error("Failed to get capital city:", s),
            a ? Z(t, [], {
                emptyText: "No city data available"
            }) : n.innerHTML = '<option value="">No city data available</option>'
        }
    } else {
        const s = [{
            value: "",
            text: "Select City",
            lat: "",
            lon: ""
        }, ...o.map(i => ({
            value: i.name,
            text: i.name,
            lat: i.lat,
            lon: i.lon
        }))];
        a ? Z(t, s) : n.innerHTML = '<option value="">Select City</option>' + o.map(i => `<option value="${i.name}" data-lat="${i.lat}" data-lon="${i.lon}">${i.name}</option>`).join("")
    }
}
async function We(e) {
    var t, n, a, o;
    try {
        if (U[e]) {
            const l = U[e];
            if ((t = l.capitalInfo) != null && t.latlng)
                return {
                    name: ((n = l.capital) == null ? void 0 : n[0]) || "Capital",
                    lat: l.capitalInfo.latlng[0],
                    lon: l.capitalInfo.latlng[1]
                }
        }
        const i = await (await fetch(`${Ce}/alpha/${e}`)).json();
        if (i && i.length > 0) {
            const l = i[0];
            if (U[e] = l,
            (a = l.capitalInfo) != null && a.latlng)
                return {
                    name: ((o = l.capital) == null ? void 0 : o[0]) || "Capital",
                    lat: l.capitalInfo.latlng[0],
                    lon: l.capitalInfo.latlng[1]
                }
        }
        return null
    } catch (s) {
        return console.error("Error fetching capital city:", s),
        null
    }
}
function ue() {
    document.getElementById("stat-countries").textContent = "90+",
    document.getElementById("stat-saved").textContent = y.length,
    ht()
}
async function ht() {
    try {
        const e = new Date().getFullYear()
          , n = await (await fetch(`${ne}/PublicHolidays/${e}/US`)).json();
        document.getElementById("stat-holidays").textContent = n.length
    } catch {
        document.getElementById("stat-holidays").textContent = "15+"
    }
}
async function wt() {
    const e = document.getElementById("featured-destinations");
    if (e) {
        e.innerHTML = he.map(t => `
    <div class="destination-card" onclick="searchDestination('${t.code}', '${t.name}')">
      <div class="destination-image-placeholder"></div>
      <div class="destination-overlay">
        <h4>${t.name}</h4>
        <p>${t.country}</p>
      </div>
    </div>
  `).join("");
        for (let t = 0; t < he.length; t++) {
            const n = he[t]
              , a = await Ge(n.query, 400, 300)
              , o = e.children[t];
            if (o && a) {
                const s = o.querySelector(".destination-image-placeholder");
                if (s) {
                    const i = document.createElement("img");
                    i.src = a,
                    i.alt = n.name,
                    i.loading = "lazy",
                    s.replaceWith(i)
                }
            } else if (o) {
                const s = o.querySelector(".destination-image-placeholder");
                if (s) {
                    const i = document.createElement("img");
                    i.src = Be.default,
                    i.alt = n.name,
                    i.loading = "lazy",
                    s.replaceWith(i)
                }
            }
        }
    }
}
window.searchDestination = function(e, t) {
    const n = I.find(l => l.countryCode === e);
    if (!n)
        return;
    r.countryCode = e,
    r.countryName = n.name;
    const o = (Fe[e] || []).find(l => l.name === t);
    o && (r.cityName = o.name,
    r.cityLat = o.lat,
    r.cityLon = o.lon);
    const s = document.getElementById("global-country")
      , i = document.getElementById("global-city");
    s && (s.value = e,
    C["global-country"] && De("global-country", e, n.name),
    ke(e, "global-city"),
    setTimeout( () => {
        i && t && (i.value = t),
        de()
    }
    , 100)),
    p(`Selected: ${n.name}${t ? ` - ${t}` : ""}`, "success")
}
;
async function bt() {
    const e = document.getElementById("upcoming-holidays");
    if (e)
        try {
            const t = new Date().getFullYear()
              , a = await (await fetch(`${ne}/PublicHolidays/${t}/US`)).json()
              , o = new Date
              , s = a.filter(i => new Date(i.date) >= o).slice(0, 5);
            if (s.length === 0) {
                e.innerHTML = '<p class="text-center" style="padding: 20px; color: var(--slate-500);">No upcoming holidays</p>';
                return
            }
            e.innerHTML = s.map(i => {
                const l = new Date(i.date);
                return `
        <div class="upcoming-item" onclick="savePlan('holiday', ${JSON.stringify(i).replace(/"/g, "&quot;")})">
          <div class="upcoming-date">
            <span class="day">${l.getDate()}</span>
            <span class="month">${l.toLocaleString("en-US", {
                    month: "short"
                })}</span>
          </div>
          <div class="upcoming-info">
            <h4>${i.localName}</h4>
            <p>${i.name}</p>
          </div>
          <div class="upcoming-action">
            <i class="fa-regular fa-heart"></i>
          </div>
        </div>
      `
            }
            ).join("")
        } catch {
            e.innerHTML = '<p class="text-center" style="padding: 20px; color: var(--slate-500);">Failed to load holidays</p>'
        }
}
async function $t() {
    const e = document.getElementById("weather-preview");
    if (!e)
        return;
    const t = [{
        name: "New York",
        lat: 40.7128,
        lon: -74.006
    }, {
        name: "London",
        lat: 51.5074,
        lon: -.1278
    }, {
        name: "Tokyo",
        lat: 35.6762,
        lon: 139.6503
    }, {
        name: "Paris",
        lat: 48.8566,
        lon: 2.3522
    }, {
        name: "Sydney",
        lat: -33.8688,
        lon: 151.2093
    }];
    e.innerHTML = t.map(n => `
    <div class="weather-preview-card">
      <div class="city">${n.name}</div>
      <div class="weather-icon"><i class="fa-solid fa-spinner fa-spin"></i></div>
      <div class="temp">--°</div>
      <div class="condition">Loading...</div>
    </div>
  `).join("");
    for (let n = 0; n < t.length; n++) {
        const a = t[n];
        try {
            const o = await Te(a.lat, a.lon);
            if (o && o.daily) {
                const s = ee(o.daily.weather_code[0])
                  , i = Math.round(o.daily.temperature_2m_max[0])
                  , l = e.children[n];
                l.querySelector(".weather-icon").innerHTML = `<i class="fa-solid ${s.icon} ${s.color}"></i>`,
                l.querySelector(".temp").textContent = `${i}°C`,
                l.querySelector(".condition").textContent = s.desc
            }
        } catch (o) {
            console.error(`Failed to load weather for ${a.name}:`, o)
        }
    }
}
async function Ke(e, t) {
    try {
        const n = await fetch(`${ne}/PublicHolidays/${t}/${e}`);
        if (!n.ok)
            throw new Error("Failed to fetch holidays");
        return await n.json()
    } catch (n) {
        return console.error("Error fetching holidays:", n),
        []
    }
}
async function St(e, t, n) {
    const a = new Date(t).getFullYear()
      , o = new Date(n).getFullYear();
    let s = [];
    for (let c = a; c <= o; c++) {
        const d = await Ke(e, c);
        s = s.concat(d)
    }
    const i = new Date(t)
      , l = new Date(n);
    return s.filter(c => {
        const d = new Date(c.date);
        return d >= i && d <= l
    }
    )
}
async function Lt(e, t) {
    try {
        const n = await fetch(`${ne}/LongWeekend/${t}/${e}`);
        if (!n.ok)
            throw new Error("Failed to fetch long weekends");
        return await n.json()
    } catch (n) {
        return console.error("Error fetching long weekends:", n),
        []
    }
}
async function Te(e, t) {
    try {
        const n = await fetch(`${Xe}/forecast?latitude=${e}&longitude=${t}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&timezone=auto`);
        if (!n.ok)
            throw new Error("Failed to fetch weather");
        return await n.json()
    } catch (n) {
        return console.error("Error fetching weather:", n),
        null
    }
}
function ee(e) {
    return {
        0: {
            icon: "fa-sun",
            color: "text-yellow-400",
            desc: "Clear sky"
        },
        1: {
            icon: "fa-sun",
            color: "text-yellow-400",
            desc: "Mainly clear"
        },
        2: {
            icon: "fa-cloud-sun",
            color: "text-gray-400",
            desc: "Partly cloudy"
        },
        3: {
            icon: "fa-cloud",
            color: "text-gray-500",
            desc: "Overcast"
        },
        45: {
            icon: "fa-smog",
            color: "text-gray-400",
            desc: "Foggy"
        },
        48: {
            icon: "fa-smog",
            color: "text-gray-400",
            desc: "Rime fog"
        },
        51: {
            icon: "fa-cloud-rain",
            color: "text-blue-300",
            desc: "Light drizzle"
        },
        53: {
            icon: "fa-cloud-rain",
            color: "text-blue-400",
            desc: "Drizzle"
        },
        55: {
            icon: "fa-cloud-rain",
            color: "text-blue-500",
            desc: "Dense drizzle"
        },
        61: {
            icon: "fa-cloud-showers-heavy",
            color: "text-blue-400",
            desc: "Slight rain"
        },
        63: {
            icon: "fa-cloud-showers-heavy",
            color: "text-blue-500",
            desc: "Rain"
        },
        65: {
            icon: "fa-cloud-showers-heavy",
            color: "text-blue-600",
            desc: "Heavy rain"
        },
        71: {
            icon: "fa-snowflake",
            color: "text-blue-200",
            desc: "Slight snow"
        },
        73: {
            icon: "fa-snowflake",
            color: "text-blue-300",
            desc: "Snow"
        },
        75: {
            icon: "fa-snowflake",
            color: "text-blue-400",
            desc: "Heavy snow"
        },
        80: {
            icon: "fa-cloud-rain",
            color: "text-blue-400",
            desc: "Rain showers"
        },
        81: {
            icon: "fa-cloud-showers-heavy",
            color: "text-blue-500",
            desc: "Moderate showers"
        },
        82: {
            icon: "fa-cloud-showers-heavy",
            color: "text-blue-600",
            desc: "Violent showers"
        },
        95: {
            icon: "fa-bolt",
            color: "text-yellow-500",
            desc: "Thunderstorm"
        },
        96: {
            icon: "fa-cloud-bolt",
            color: "text-yellow-600",
            desc: "Thunderstorm + hail"
        },
        99: {
            icon: "fa-cloud-bolt",
            color: "text-yellow-600",
            desc: "Heavy thunderstorm"
        }
    }[e] || {
        icon: "fa-cloud",
        color: "text-gray-400",
        desc: "Unknown"
    }
}
async function Ye(e, t, n="") {
    var a;
    try {
        let o = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${Je}&city=${encodeURIComponent(e)}&countryCode=${t}&size=20`;
        n && (o += `&segmentId=${n}`);
        const s = await fetch(o);
        if (!s.ok)
            throw new Error("Failed to fetch events");
        return ((a = (await s.json())._embedded) == null ? void 0 : a.events) || []
    } catch (o) {
        return console.error("Error fetching events:", o),
        await Ct(e)
    }
}
async function Ct(e) {
    const t = ["music", "sports", "arts"]
      , n = {
        music: ["Jazz Night Live", "Rock Festival", "Symphony Orchestra", "Electronic Dance Party", "Blues Concert", "World Music Celebration", "Indie Band Showcase", "Hip Hop Night"],
        sports: ["Football Match", "Basketball Game", "Tennis Tournament", "Ice Hockey Night", "Rugby Championship", "Marathon Race", "Boxing Championship", "Soccer Derby"],
        arts: ["Theatre Play", "Ballet Performance", "Comedy Show", "Opera Night", "Art Exhibition", "Stand-up Comedy", "Film Festival", "Dance Recital"]
    }
      , a = {
        music: ["concert crowd", "live music performance", "jazz band", "rock concert", "orchestra symphony"],
        sports: ["football stadium", "basketball game", "tennis match", "sports arena", "athletic event"],
        arts: ["theatre stage", "ballet dancer", "comedy show", "opera performance", "art gallery"]
    }
      , o = {
        music: ["Music Hall", "Concert Arena", "Live House", "Amphitheater", "Jazz Club"],
        sports: ["Sports Stadium", "Arena", "Olympic Center", "Athletic Complex", "Sports Park"],
        arts: ["Theatre", "Opera House", "Cultural Center", "Art Gallery", "Playhouse"]
    }
      , s = new Date
      , i = e.split("").reduce( (c, d) => c + d.charCodeAt(0), 0)
      , l = {};
    for (const c of t) {
        const d = i % a[c].length
          , u = await Ge(a[c][d]);
        l[c] = u || Be[c]
    }
    return Array(8).fill(null).map( (c, d) => {
        const u = new Date(s);
        u.setDate(u.getDate() + (d + i) % 14 + 1);
        const m = (d + i) % 3
          , f = t[m]
          , g = (d + i) % n[f].length
          , w = (d + i) % o[f].length;
        return {
            id: `mock-${d}-${i}`,
            name: `${n[f][g]} in ${e}`,
            dates: {
                start: {
                    localDate: u.toISOString().split("T")[0],
                    localTime: `${18 + d % 4}:00:00`
                }
            },
            _embedded: {
                venues: [{
                    name: `${e} ${o[f][w]}`,
                    city: {
                        name: e
                    }
                }]
            },
            classifications: [{
                segment: {
                    name: f.charAt(0).toUpperCase() + f.slice(1)
                }
            }],
            images: [{
                url: l[f]
            }],
            priceRanges: [{
                min: 25 + (d + i) % 50,
                max: 100 + (d + i) % 100
            }],
            url: "#"
        }
    }
    )
}
const Be = {
    music: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop",
    sports: "https://images.unsplash.com/photo-1461896836934-aba008cd3e95?w=400&h=250&fit=crop",
    arts: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&h=250&fit=crop",
    default: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=250&fit=crop"
};
async function Ge(e, t=400, n=250) {
    const a = `${e}-${t}-${n}`;
    if (ge.has(a))
        return ge.get(a);
    try {
        const o = await fetch(`${et}/photos/random?query=${encodeURIComponent(e)}&orientation=landscape&client_id=${Ze}`);
        if (!o.ok)
            throw new Error("Unsplash API error");
        const i = `${(await o.json()).urls.raw}&w=${t}&h=${n}&fit=crop&q=80`;
        return ge.set(a, i),
        i
    } catch (o) {
        return console.warn("Unsplash API failed, using fallback:", o),
        null
    }
}
function Et(e) {
    const t = Be;
    return t[e] || t.music
}
window.performSearch = async function() {
    var o;
    const e = document.getElementById("search-country").value
      , t = document.getElementById("search-city")
      , n = document.getElementById("search-start-date").value
      , a = document.getElementById("search-end-date").value;
    if (!e) {
        p("Please select a country", "error");
        return
    }
    j("Searching destinations...");
    try {
        const s = await St(e, n, a);
        xt(s);
        const i = t.options[t.selectedIndex];
        if (i && i.value) {
            const c = i.dataset.lat
              , d = i.dataset.lon;
            tt = {
                name: i.value,
                lat: parseFloat(c),
                lon: parseFloat(d)
            };
            const u = await Te(c, d);
            It(u);
            const m = await Ye(i.value, e);
            Re = m,
            Dt(m)
        } else
            document.getElementById("weather-result-list").innerHTML = te("Select a city for weather"),
            document.getElementById("events-result-list").innerHTML = te("Select a city for events");
        document.getElementById("search-results").classList.remove("hidden");
        const l = ((o = I.find(c => c.countryCode === e)) == null ? void 0 : o.name) || e;
        document.getElementById("results-title").textContent = `Results for ${l}`
    } catch (s) {
        console.error("Search error:", s),
        p("Search failed. Please try again.", "error")
    }
    W()
}
;
window.loadHolidays = async function() {
    if (!r.countryCode) {
        p("Please select a country from the dashboard", "warning");
        return
    }
    j("Loading holidays...");
    try {
        const e = await Ke(r.countryCode, r.year);
        kt(e, r.year)
    } catch {
        p("Failed to load holidays", "error")
    }
    W()
}
;
window.loadEvents = async function() {
    if (!r.countryCode) {
        p("Please select a country from the dashboard", "warning");
        return
    }
    if ((!r.cityLat || !r.cityLon) && await re(),
    !r.cityName) {
        p("Could not determine city location", "warning");
        return
    }
    j("Loading events...");
    try {
        const e = await Ye(r.cityName.replace(" (Capital)", ""), r.countryCode, "");
        console.log("Events loaded:", e),
        Re = e,
        Tt(e)
    } catch {
        p("Failed to load events", "error")
    }
    W()
}
;
window.loadWeather = async function() {
    if (!r.countryCode) {
        p("Please select a country from the dashboard", "warning");
        return
    }
    if ((!r.cityLat || !r.cityLon) && await re(),
    !r.cityLat || !r.cityLon) {
        p("Could not determine city location", "warning");
        return
    }
    j("Loading weather...");
    try {
        const e = await Te(r.cityLat, r.cityLon);
        Bt(e, r.cityName)
    } catch {
        p("Failed to load weather", "error")
    }
    W()
}
;
window.loadLongWeekends = async function() {
    if (!r.countryCode) {
        p("Please select a country from the dashboard", "warning");
        return
    }
    j("Finding long weekends...");
    try {
        const e = await Lt(r.countryCode, r.year);
        Pt(e, r.year)
    } catch {
        p("Failed to load long weekends", "error")
    }
    W()
}
;
function te(e) {
    return `
    <div style="text-align: center; padding: 30px; color: var(--slate-400);">
      <i class="fa-solid fa-inbox" style="font-size: 24px; margin-bottom: 8px;"></i>
      <p>${e}</p>
    </div>
  `
}
function xt(e) {
    const t = document.getElementById("holidays-result-list")
      , n = document.getElementById("holidays-result-count");
    if (n.textContent = e.length,
    e.length === 0) {
        t.innerHTML = te("No holidays in this range");
        return
    }
    t.innerHTML = e.map(a => `
    <div class="result-item" onclick="savePlan('holiday', ${JSON.stringify(a).replace(/"/g, "&quot;")})">
      <div class="result-item-icon holiday">
        <i class="fa-solid fa-calendar-check"></i>
      </div>
      <div class="result-item-content">
        <h5>${a.localName}</h5>
        <p>${k(a.date)} • ${Ne(a.date)}</p>
      </div>
      <div class="result-item-action">
        <i class="fa-regular fa-heart"></i>
      </div>
    </div>
  `).join("")
}
function It(e) {
    const t = document.getElementById("weather-result-list");
    if (!e || !e.daily) {
        t.innerHTML = te("Weather unavailable");
        return
    }
    const {daily: n} = e;
    t.innerHTML = n.time.slice(0, 7).map( (a, o) => {
        const s = ee(n.weather_code[o])
          , i = Math.round(n.temperature_2m_max[o])
          , l = Math.round(n.temperature_2m_min[o]);
        return `
      <div class="result-item">
        <div class="result-item-icon weather">
          <i class="fa-solid ${s.icon}" style="color: var(--primary-500);"></i>
        </div>
        <div class="result-item-content">
          <h5>${Ne(a)}</h5>
          <p>${s.desc}</p>
        </div>
        <div class="result-item-meta">
          <span class="result-item-temp">${i}°</span>
          <span style="color: var(--slate-400); font-size: 14px;">${l}°</span>
        </div>
      </div>
    `
    }
    ).join("")
}
function Dt(e) {
    const t = document.getElementById("events-result-list")
      , n = document.getElementById("events-result-count");
    if (n.textContent = e.length,
    e.length === 0) {
        t.innerHTML = te("No events found");
        return
    }
    t.innerHTML = e.slice(0, 8).map(a => {
        var l, c, d, u, m, f, g, w, S;
        const o = ((u = (d = (c = (l = a.classifications) == null ? void 0 : l[0]) == null ? void 0 : c.segment) == null ? void 0 : d.name) == null ? void 0 : u.toLowerCase()) || "other"
          , s = ((f = (m = a.dates) == null ? void 0 : m.start) == null ? void 0 : f.localDate) || ""
          , i = ((S = (w = (g = a._embedded) == null ? void 0 : g.venues) == null ? void 0 : w[0]) == null ? void 0 : S.name) || "TBA";
        return `
      <div class="result-item event-item" data-category="${o}" onclick="savePlan('event', ${JSON.stringify(a).replace(/"/g, "&quot;")})">
        <div class="result-item-icon event">
          <i class="fa-solid fa-ticket"></i>
        </div>
        <div class="result-item-content">
          <h5>${a.name}</h5>
          <p>${k(s)} • ${i}</p>
        </div>
        <div class="result-item-meta">
          <span class="result-item-badge badge-${o}">${o}</span>
        </div>
      </div>
    `
    }
    ).join("")
}
window.filterDiscoverEvents = function(e) {
    document.querySelectorAll(".events-filters .filter-chip").forEach(t => {
        t.classList.toggle("active", t.dataset.filter === e)
    }
    ),
    document.querySelectorAll(".event-item").forEach(t => {
        e === "all" || t.dataset.category === e ? t.style.display = "flex" : t.style.display = "none"
    }
    )
}
;
window.filterResultsTab = function(e) {
    document.querySelectorAll(".result-tab").forEach(n => {
        n.classList.toggle("active", n.dataset.tab === e)
    }
    ),
    document.querySelectorAll(".result-column").forEach(n => {
        e === "all" ? n.style.display = "block" : n.style.display = n.dataset.type === e ? "block" : "none"
    }
    )
}
;
function kt(e, t) {
    const n = document.getElementById("holidays-content");
    if (e.length === 0) {
        n.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-calendar-xmark"></i></div>
        <h3>No Holidays Found</h3>
        <p>No public holidays found for ${t}</p>
      </div>
    `;
        return
    }
    n.innerHTML = e.map(a => {
        const o = new Date(a.date)
          , s = y.some(i => i.type === "holiday" && i.data.date === a.date && i.data.name === a.name);
        return `
      <div class="holiday-card">
        <div class="holiday-card-header">
          <div class="holiday-date-box">
            <span class="day">${o.getDate()}</span>
            <span class="month">${o.toLocaleString("en-US", {
            month: "short"
        })}</span>
          </div>
          <div class="holiday-card-actions">
            <button class="holiday-action-btn ${s ? "saved" : ""}" onclick="savePlan('holiday', ${JSON.stringify(a).replace(/"/g, "&quot;")})">
              <i class="fa-${s ? "solid" : "regular"} fa-heart"></i>
            </button>
          </div>
        </div>
        <h3>${a.localName}</h3>
        <p class="holiday-name">${a.name}</p>
        <div class="holiday-card-footer">
          <span class="holiday-day-badge">
            <i class="fa-regular fa-calendar"></i>
            ${Ne(a.date)}
          </span>
          ${a.types ? `
            <div class="holiday-types">
              ${a.types.slice(0, 2).map(i => `<span class="holiday-type-badge">${i}</span>`).join("")}
            </div>
          ` : ""}
        </div>
      </div>
    `
    }
    ).join("")
}
function Tt(e) {
    const t = document.getElementById("events-content");
    if (e.length === 0) {
        t.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-ticket"></i></div>
        <h3>No Events Found</h3>
        <p>No events found for this location</p>
      </div>
    `;
        return
    }
    t.innerHTML = e.map(n => {
        var m, f, g, w, S, T, B, K, h, O, R, F, q, N, _, M, H, P, A;
        const a = ((g = (f = (m = n.classifications) == null ? void 0 : m[0]) == null ? void 0 : f.segment) == null ? void 0 : g.name) || "Event"
          , o = ((T = (S = (w = n._embedded) == null ? void 0 : w.venues) == null ? void 0 : S[0]) == null ? void 0 : T.name) || "TBA"
          , s = ((O = (h = (K = (B = n._embedded) == null ? void 0 : B.venues) == null ? void 0 : K[0]) == null ? void 0 : h.city) == null ? void 0 : O.name) || ""
          , i = ((F = (R = n.dates) == null ? void 0 : R.start) == null ? void 0 : F.localDate) || ""
          , l = ((_ = (N = (q = n.dates) == null ? void 0 : q.start) == null ? void 0 : N.localTime) == null ? void 0 : _.slice(0, 5)) || ""
          , c = ((H = (M = n.images) == null ? void 0 : M.find(x => x.width > 300)) == null ? void 0 : H.url) || ((A = (P = n.images) == null ? void 0 : P[0]) == null ? void 0 : A.url) || Et(a.toLowerCase())
          , d = y.some(x => x.type === "event" && x.data.id === n.id)
          , u = n.url || "#";
        return `
      <div class="event-card">
        <div class="event-card-image">
          <img src="${c}" alt="${n.name}" loading="lazy">
          <span class="event-card-category">${a}</span>
          <button class="event-card-save ${d ? "saved" : ""}" onclick="savePlan('event', ${JSON.stringify(n).replace(/"/g, "&quot;")})">
            <i class="fa-${d ? "solid" : "regular"} fa-heart"></i>
          </button>
        </div>
        <div class="event-card-body">
          <h3>${n.name}</h3>
          <div class="event-card-info">
            <div><i class="fa-regular fa-calendar"></i>${k(i)}${l ? ` at ${l}` : ""}</div>
            <div><i class="fa-solid fa-location-dot"></i>${o}${s ? `, ${s}` : ""}</div>
          </div>
          <div class="event-card-footer">
            <button class="btn-event" onclick="savePlan('event', ${JSON.stringify(n).replace(/"/g, "&quot;")})">
              <i class="fa-regular fa-heart"></i> Save
            </button>
            <a href="${u}" target="_blank" rel="noopener noreferrer" class="btn-buy-ticket" ${u === "#" ? `onclick="event.preventDefault(); showToast('Ticket link not available', 'info')"` : ""}>
              <i class="fa-solid fa-ticket"></i> Buy Tickets
            </a>
          </div>
        </div>
      </div>
    `
    }
    ).join("")
}
function Bt(e, t) {
    var N, _, M, H, P, A, x, G, v, b, ae, oe;
    const n = document.getElementById("weather-content");
    if (!e || !e.daily) {
        n.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-cloud-question"></i></div>
        <h3>Weather Unavailable</h3>
        <p>Could not load weather data</p>
      </div>
    `;
        return
    }
    const {current: a, daily: o, hourly: s} = e
      , i = ee((a == null ? void 0 : a.weather_code) || o.weather_code[0])
      , l = Math.round((a == null ? void 0 : a.temperature_2m) || o.temperature_2m_max[0])
      , c = Math.round((a == null ? void 0 : a.apparent_temperature) || ((N = o.apparent_temperature_max) == null ? void 0 : N[0]) || l)
      , d = (a == null ? void 0 : a.relative_humidity_2m) || "N/A"
      , u = Math.round((a == null ? void 0 : a.wind_speed_10m) || o.wind_speed_10m_max[0])
      , m = Nt((a == null ? void 0 : a.wind_direction_10m) || ((_ = o.wind_direction_10m_dominant) == null ? void 0 : _[0]) || 0)
      , f = (a == null ? void 0 : a.uv_index) || ((M = o.uv_index_max) == null ? void 0 : M[0]) || 0
      , g = Math.round(o.temperature_2m_max[0])
      , w = Math.round(o.temperature_2m_min[0])
      , S = ((H = o.precipitation_sum) == null ? void 0 : H[0]) || 0
      , T = o.precipitation_probability_max[0] || 0
      , B = (P = o.sunrise) != null && P[0] ? Ae(o.sunrise[0]) : "N/A"
      , K = (A = o.sunset) != null && A[0] ? Ae(o.sunset[0]) : "N/A"
      , h = new Date().getHours()
      , O = ((x = s == null ? void 0 : s.time) == null ? void 0 : x.slice(h, h + 24)) || []
      , R = ((G = s == null ? void 0 : s.temperature_2m) == null ? void 0 : G.slice(h, h + 24)) || []
      , F = ((v = s == null ? void 0 : s.weather_code) == null ? void 0 : v.slice(h, h + 24)) || []
      , q = ((b = s == null ? void 0 : s.precipitation_probability) == null ? void 0 : b.slice(h, h + 24)) || [];
    n.innerHTML = `
    <!-- Current Weather Hero -->
    <div class="weather-hero-card ${_t((a == null ? void 0 : a.weather_code) || o.weather_code[0])}">
      <div class="weather-hero-bg"></div>
      <div class="weather-hero-content">
        <div class="weather-location">
          <i class="fa-solid fa-location-dot"></i>
          <span>${(t == null ? void 0 : t.replace(" (Capital)", "")) || "Unknown Location"}</span>
          <span class="weather-time">${new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric"
    })}</span>
        </div>
        
        <div class="weather-hero-main">
          <div class="weather-hero-left">
            <div class="weather-hero-icon">
              <i class="fa-solid ${i.icon}"></i>
            </div>
            <div class="weather-hero-temp">
              <span class="temp-value">${l}</span>
              <span class="temp-unit">°C</span>
            </div>
          </div>
          <div class="weather-hero-right">
            <div class="weather-condition">${i.desc}</div>
            <div class="weather-feels">Feels like ${c}°C</div>
            <div class="weather-high-low">
              <span class="high"><i class="fa-solid fa-arrow-up"></i> ${g}°</span>
              <span class="low"><i class="fa-solid fa-arrow-down"></i> ${w}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Weather Details Grid -->
    <div class="weather-details-grid">
      <div class="weather-detail-card">
        <div class="detail-icon humidity">
          <i class="fa-solid fa-droplet"></i>
        </div>
        <div class="detail-info">
          <span class="detail-label">Humidity</span>
          <span class="detail-value">${d}%</span>
        </div>
        <div class="detail-bar">
          <div class="detail-bar-fill" style="width: ${d}%"></div>
        </div>
      </div>
      
      <div class="weather-detail-card">
        <div class="detail-icon wind">
          <i class="fa-solid fa-wind"></i>
        </div>
        <div class="detail-info">
          <span class="detail-label">Wind</span>
          <span class="detail-value">${u} km/h</span>
        </div>
        <div class="detail-extra">${m}</div>
      </div>
      
      <div class="weather-detail-card">
        <div class="detail-icon uv">
          <i class="fa-solid fa-sun"></i>
        </div>
        <div class="detail-info">
          <span class="detail-label">UV Index</span>
          <span class="detail-value">${Math.round(f)}</span>
        </div>
        <div class="detail-extra uv-level ${Pe(f).class}">${Pe(f).text}</div>
      </div>
      
      <div class="weather-detail-card">
        <div class="detail-icon precip">
          <i class="fa-solid fa-cloud-rain"></i>
        </div>
        <div class="detail-info">
          <span class="detail-label">Precipitation</span>
          <span class="detail-value">${T}%</span>
        </div>
        <div class="detail-extra">${S}mm expected</div>
      </div>
      
      <div class="weather-detail-card sunrise-sunset">
        <div class="sun-times-visual">
          <div class="sun-time sunrise">
            <i class="fa-solid fa-sunrise"></i>
            <span class="sun-label">Sunrise</span>
            <span class="sun-value">${B}</span>
          </div>
          <div class="sun-arc">
            <div class="sun-arc-path"></div>
            <div class="sun-position" style="--sun-progress: ${Mt((ae = o.sunrise) == null ? void 0 : ae[0], (oe = o.sunset) == null ? void 0 : oe[0])}%"></div>
          </div>
          <div class="sun-time sunset">
            <i class="fa-solid fa-sunset"></i>
            <span class="sun-label">Sunset</span>
            <span class="sun-value">${K}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Hourly Forecast -->
    <div class="weather-section">
      <h3 class="weather-section-title">
        <i class="fa-solid fa-clock"></i>
        Hourly Forecast
      </h3>
      <div class="hourly-scroll">
        ${O.slice(0, 24).map( (V, $) => {
        const se = new Date(V).getHours()
          , fe = ee(F[$] || 0)
          , ye = Math.round(R[$] || 0)
          , z = q[$] || 0
          , J = $ === 0;
        return `
            <div class="hourly-item ${J ? "now" : ""}">
              <span class="hourly-time">${J ? "Now" : Ht(se)}</span>
              <div class="hourly-icon">
                <i class="fa-solid ${fe.icon}"></i>
              </div>
              <span class="hourly-temp">${ye}°</span>
              ${z > 0 ? `<span class="hourly-precip"><i class="fa-solid fa-droplet"></i> ${z}%</span>` : ""}
            </div>
          `
    }
    ).join("")}
      </div>
    </div>
    
    <!-- 7-Day Forecast -->
    <div class="weather-section">
      <h3 class="weather-section-title">
        <i class="fa-solid fa-calendar-week"></i>
        7-Day Forecast
      </h3>
      <div class="forecast-list">
        ${o.time.map( (V, $) => {
        const se = ee(o.weather_code[$])
          , fe = Math.round(o.temperature_2m_max[$])
          , ye = Math.round(o.temperature_2m_min[$])
          , z = o.precipitation_probability_max[$] || 0
          , J = $ === 0
          , ve = new Date(V);
        return `
            <div class="forecast-day ${J ? "today" : ""}">
              <div class="forecast-day-name">
                <span class="day-label">${J ? "Today" : ve.toLocaleDateString("en-US", {
            weekday: "short"
        })}</span>
                <span class="day-date">${ve.getDate()} ${ve.toLocaleDateString("en-US", {
            month: "short"
        })}</span>
              </div>
              <div class="forecast-icon">
                <i class="fa-solid ${se.icon}"></i>
              </div>
              <div class="forecast-temps">
                <span class="temp-max">${fe}°</span>
                <span class="temp-min">${ye}°</span>
              </div>
              <div class="forecast-precip">
                ${z > 0 ? `<i class="fa-solid fa-droplet"></i><span>${z}%</span>` : ""}
              </div>
            </div>
          `
    }
    ).join("")}
      </div>
    </div>
  `
}
function Nt(e) {
    const t = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
      , n = Math.round(e / 22.5) % 16;
    return t[n]
}
function Pe(e) {
    return e <= 2 ? {
        text: "Low",
        class: "low"
    } : e <= 5 ? {
        text: "Moderate",
        class: "moderate"
    } : e <= 7 ? {
        text: "High",
        class: "high"
    } : e <= 10 ? {
        text: "Very High",
        class: "very-high"
    } : {
        text: "Extreme",
        class: "extreme"
    }
}
function _t(e) {
    return [0, 1].includes(e) ? "weather-sunny" : [2, 3].includes(e) ? "weather-cloudy" : [45, 48].includes(e) ? "weather-foggy" : [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(e) ? "weather-rainy" : [71, 73, 75].includes(e) ? "weather-snowy" : [95, 96, 99].includes(e) ? "weather-stormy" : "weather-default"
}
function Mt(e, t) {
    if (!e || !t)
        return 50;
    const n = new Date
      , a = new Date(e)
      , o = new Date(t);
    if (n < a)
        return 0;
    if (n > o)
        return 100;
    const s = o - a
      , i = n - a;
    return Math.round(i / s * 100)
}
function Ae(e) {
    return new Date(e).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !0
    })
}
function Ht(e) {
    return e === 0 ? "12 AM" : e === 12 ? "12 PM" : e > 12 ? `${e - 12} PM` : `${e} AM`
}
function Pt(e, t) {
    const n = document.getElementById("lw-content");
    if (e.length === 0) {
        n.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-umbrella-beach"></i></div>
        <h3>No Long Weekends</h3>
        <p>No long weekends found for ${t}</p>
      </div>
    `;
        return
    }
    n.innerHTML = e.map( (a, o) => {
        const s = y.some(i => i.type === "longweekend" && i.data.startDate === a.startDate);
        return `
      <div class="lw-card">
        <div class="lw-card-header">
          <span class="lw-badge">
            <i class="fa-solid fa-calendar-days"></i>
            ${a.dayCount} Days
          </span>
          <button class="holiday-action-btn ${s ? "saved" : ""}" onclick="savePlan('longweekend', ${JSON.stringify(a).replace(/"/g, "&quot;")})">
            <i class="fa-${s ? "solid" : "regular"} fa-heart"></i>
          </button>
        </div>
        <h3>Long Weekend #${o + 1}</h3>
        <div class="lw-dates">
          <i class="fa-regular fa-calendar"></i>
          ${k(a.startDate)} - ${k(a.endDate)}
        </div>
        <div class="lw-info-box ${a.needBridgeDay ? "warning" : "success"}">
          <i class="fa-solid ${a.needBridgeDay ? "fa-info-circle" : "fa-check-circle"}"></i>
          ${a.needBridgeDay ? "Requires taking a bridge day off" : "No extra days off needed!"}
        </div>
        <div class="lw-days-visual">
          ${At(a.startDate, a.dayCount)}
        </div>
      </div>
    `
    }
    ).join("")
}
function At(e, t) {
    const n = []
      , a = new Date(e);
    for (let o = 0; o < Math.min(t, 5); o++) {
        const s = new Date(a);
        s.setDate(s.getDate() + o);
        const i = s.toLocaleDateString("en-US", {
            weekday: "short"
        })
          , l = s.getDate()
          , c = s.getDay()
          , d = c === 0 || c === 6;
        n.push(`
      <div class="lw-day ${d ? "weekend" : ""}">
        <span class="name">${i}</span>
        <span class="num">${l}</span>
      </div>
    `)
    }
    return n.join("")
}
window.savePlan = function(e, t) {
    if (y.some(o => e === "holiday" ? o.type === "holiday" && o.data.date === t.date && o.data.name === t.name : e === "event" ? o.type === "event" && o.data.id === t.id : e === "longweekend" ? o.type === "longweekend" && o.data.startDate === t.startDate : !1)) {
        p("Already saved!", "info");
        return
    }
    const a = {
        id: Date.now(),
        type: e,
        data: t,
        savedAt: new Date().toISOString()
    };
    y.push(a),
    localStorage.setItem("wanderlust_plans", JSON.stringify(y)),
    me(),
    ue(),
    p("Saved to My Plans!", "success")
}
;
window.removePlan = function(e) {
    Swal.fire({
        title: "Remove Plan?",
        text: "Are you sure you want to remove this plan?",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "Cancel"
    }).then(t => {
        t.isConfirmed && (y = y.filter(n => n.id !== e),
        localStorage.setItem("wanderlust_plans", JSON.stringify(y)),
        me(),
        ue(),
        pe(),
        Swal.fire({
            title: "Removed!",
            text: "The plan has been removed.",
            icon: "success",
            timer: 1500,
            showConfirmButton: !1
        }))
    }
    )
}
;
window.clearAllPlans = function() {
    if (y.length === 0) {
        Swal.fire({
            title: "No Plans",
            text: "There are no saved plans to clear.",
            icon: "info",
            confirmButtonColor: "#3b82f6"
        });
        return
    }
    Swal.fire({
        title: "Clear All Plans?",
        text: "This will permanently delete all your saved plans. This action cannot be undone!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Yes, clear all!",
        cancelButtonText: "Cancel"
    }).then(e => {
        e.isConfirmed && (y = [],
        localStorage.setItem("wanderlust_plans", JSON.stringify(y)),
        me(),
        ue(),
        pe(),
        Swal.fire({
            title: "Cleared!",
            text: "All your plans have been removed.",
            icon: "success",
            timer: 1500,
            showConfirmButton: !1
        }))
    }
    )
}
;
window.exportPlans = function() {
    if (y.length === 0) {
        p("No plans to export", "error");
        return
    }
    const e = JSON.stringify(y, null, 2)
      , t = new Blob([e],{
        type: "application/json"
    })
      , n = URL.createObjectURL(t)
      , a = document.createElement("a");
    a.href = n,
    a.download = "wanderlust-plans.json",
    a.click(),
    URL.revokeObjectURL(n),
    p("Plans exported!", "success")
}
;
function me() {
    const e = document.getElementById("plans-count")
      , t = document.getElementById("stat-saved");
    e && (y.length > 0 ? (e.textContent = y.length,
    e.classList.remove("hidden")) : e.classList.add("hidden")),
    t && (t.textContent = y.length),
    Ve()
}
function Ve() {
    const e = {
        all: y.length,
        holiday: y.filter(t => t.type === "holiday").length,
        event: y.filter(t => t.type === "event").length,
        longweekend: y.filter(t => t.type === "longweekend").length
    };
    Object.entries(e).forEach( ([t,n]) => {
        const a = document.getElementById(`filter-${t === "longweekend" ? "lw" : t}-count`);
        a && (a.textContent = n)
    }
    )
}
window.filterPlans = function(e) {
    document.querySelectorAll(".plan-filter").forEach(t => {
        t.classList.toggle("active", t.dataset.filter === e)
    }
    ),
    pe(e)
}
;
function pe(e="all") {
    const t = document.getElementById("plans-content");
    let n = e === "all" ? y : y.filter(a => a.type === e);
    if (n.length === 0) {
        t.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-heart-crack"></i></div>
        <h3>No Saved Plans Yet</h3>
        <p>Start exploring and save holidays, events, or long weekends you like!</p>
        <button class="btn-primary" onclick="navigateTo('discover')">
          <i class="fa-solid fa-compass"></i>
          Start Exploring
        </button>
      </div>
    `;
        return
    }
    t.innerHTML = n.map(a => {
        var i, l, c, d, u;
        const o = {
            holiday: "Holiday",
            event: "Event",
            longweekend: "Long Weekend"
        };
        let s = "";
        if (a.type === "holiday") {
            const m = a.data;
            s = `
        <h4>${m.localName}</h4>
        <div class="plan-card-details">
          <div><i class="fa-regular fa-calendar"></i>${k(m.date)}</div>
          <div><i class="fa-solid fa-info-circle"></i>${m.name}</div>
        </div>
      `
        } else if (a.type === "event") {
            const m = a.data
              , f = ((c = (l = (i = m._embedded) == null ? void 0 : i.venues) == null ? void 0 : l[0]) == null ? void 0 : c.name) || "TBA"
              , g = ((u = (d = m.dates) == null ? void 0 : d.start) == null ? void 0 : u.localDate) || "";
            s = `
        <h4>${m.name}</h4>
        <div class="plan-card-details">
          <div><i class="fa-regular fa-calendar"></i>${k(g)}</div>
          <div><i class="fa-solid fa-location-dot"></i>${f}</div>
        </div>
      `
        } else if (a.type === "longweekend") {
            const m = a.data;
            s = `
        <h4>${m.dayCount} Day Long Weekend</h4>
        <div class="plan-card-details">
          <div><i class="fa-regular fa-calendar"></i>${k(m.startDate)} - ${k(m.endDate)}</div>
          <div><i class="fa-solid fa-info-circle"></i>${m.needBridgeDay ? "Bridge day needed" : "No extra days needed"}</div>
        </div>
      `
        }
        return `
      <div class="plan-card">
        <span class="plan-card-type ${a.type}">${o[a.type]}</span>
        <div class="plan-card-content">
          ${s}
          <div class="plan-card-actions">
            <button class="btn-plan-remove" onclick="removePlan(${a.id})">
              <i class="fa-solid fa-trash"></i> Remove
            </button>
          </div>
        </div>
      </div>
    `
    }
    ).join("")
}
function k(e) {
    return new Date(e).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    })
}
function be(e) {
    return e.toISOString().split("T")[0]
}
function Ne(e) {
    return new Date(e).toLocaleDateString("en-US", {
        weekday: "long"
    })
}
function j(e="Loading...") {
    const t = document.getElementById("loading-overlay")
      , n = document.getElementById("loading-text");
    n && (n.textContent = e),
    t == null || t.classList.remove("hidden")
}
function W() {
    var e;
    (e = document.getElementById("loading-overlay")) == null || e.classList.add("hidden")
}
function p(e, t="info") {
    const n = document.getElementById("toast-container");
    if (!n)
        return;
    const a = {
        success: "fa-check-circle",
        error: "fa-exclamation-circle",
        info: "fa-info-circle"
    }
      , o = document.createElement("div");
    o.className = `toast ${t}`,
    o.innerHTML = `
    <i class="fa-solid ${a[t] || a.info}"></i>
    <span>${e}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `,
    n.appendChild(o),
    setTimeout( () => {
        o.style.animation = "slideIn 0.3s ease reverse",
        setTimeout( () => o.remove(), 300)
    }
    , 4e3)
}
window.closeModal = function() {
    var e;
    (e = document.getElementById("modal-overlay")) == null || e.classList.add("hidden")
}
;
const D = {}
  , Ot = {
    USD: "US Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    JPY: "Japanese Yen",
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
    CHF: "Swiss Franc",
    CNY: "Chinese Yuan",
    INR: "Indian Rupee",
    EGP: "Egyptian Pound",
    AED: "UAE Dirham",
    SAR: "Saudi Riyal",
    KWD: "Kuwaiti Dinar",
    BHD: "Bahraini Dinar",
    OMR: "Omani Rial",
    QAR: "Qatari Riyal",
    JOD: "Jordanian Dinar",
    LBP: "Lebanese Pound",
    MAD: "Moroccan Dirham",
    TND: "Tunisian Dinar",
    DZD: "Algerian Dinar",
    LYD: "Libyan Dinar",
    SDG: "Sudanese Pound",
    IQD: "Iraqi Dinar",
    SYP: "Syrian Pound",
    YER: "Yemeni Rial",
    TRY: "Turkish Lira",
    ZAR: "South African Rand",
    NGN: "Nigerian Naira",
    KES: "Kenyan Shilling",
    GHS: "Ghanaian Cedi",
    BRL: "Brazilian Real",
    MXN: "Mexican Peso",
    ARS: "Argentine Peso",
    CLP: "Chilean Peso",
    COP: "Colombian Peso",
    PEN: "Peruvian Sol",
    NZD: "New Zealand Dollar",
    SGD: "Singapore Dollar",
    HKD: "Hong Kong Dollar",
    TWD: "Taiwan Dollar",
    KRW: "South Korean Won",
    THB: "Thai Baht",
    MYR: "Malaysian Ringgit",
    IDR: "Indonesian Rupiah",
    PHP: "Philippine Peso",
    VND: "Vietnamese Dong",
    PKR: "Pakistani Rupee",
    BDT: "Bangladeshi Taka",
    LKR: "Sri Lankan Rupee",
    NPR: "Nepalese Rupee",
    RUB: "Russian Ruble",
    UAH: "Ukrainian Hryvnia",
    PLN: "Polish Zloty",
    CZK: "Czech Koruna",
    HUF: "Hungarian Forint",
    RON: "Romanian Leu",
    BGN: "Bulgarian Lev",
    HRK: "Croatian Kuna",
    RSD: "Serbian Dinar",
    SEK: "Swedish Krona",
    NOK: "Norwegian Krone",
    DKK: "Danish Krone",
    ISK: "Icelandic Krona"
};
async function Rt() {
    try {
        const t = await (await fetch(`${Le}/USD`)).json();
        t.conversion_rates && (L = Object.keys(t.conversion_rates).map(o => ({
            code: o,
            name: Ot[o] || o
        })),
        L.sort( (o, s) => o.code.localeCompare(s.code)));
        const n = document.getElementById("currency-from")
          , a = document.getElementById("currency-to");
        if (n && a) {
            const o = L.map(s => `<option value="${s.code}">${s.code} - ${s.name}</option>`).join("");
            n.innerHTML = o,
            a.innerHTML = o,
            n.value = "USD",
            a.value = "EUR",
            Oe(n, "currency-from"),
            Oe(a, "currency-to")
        }
        Ut()
    } catch (e) {
        console.error("Failed to load currencies:", e)
    }
}
function Oe(e, t) {
    const n = document.createElement("div");
    n.className = "currency-custom-select",
    n.id = `${t}-custom`;
    const a = L.find(i => i.code === e.value) || L[0]
      , o = document.createElement("div");
    o.className = "currency-custom-trigger",
    o.innerHTML = `
    <span class="currency-code">${a.code}</span>
    <span class="currency-name">${a.name}</span>
    <i class="fa-solid fa-chevron-down arrow"></i>
  `;
    const s = document.createElement("div");
    s.className = "currency-custom-dropdown",
    s.innerHTML = `
    <div class="currency-custom-search">
      <i class="fa-solid fa-search"></i>
      <input type="text" placeholder="Search currency..." autocomplete="off">
    </div>
    <div class="currency-custom-options"></div>
  `,
    n.appendChild(o),
    n.appendChild(s),
    e.parentNode.appendChild(n),
    _e(s.querySelector(".currency-custom-options"), L, e.value),
    D[t] = {
        wrapper: n,
        trigger: o,
        dropdown: s,
        originalSelect: e
    },
    Ft(t)
}
function _e(e, t, n, a="") {
    const o = a ? t.filter(s => s.code.toLowerCase().includes(a.toLowerCase()) || s.name.toLowerCase().includes(a.toLowerCase())) : t;
    if (o.length === 0) {
        e.innerHTML = '<div class="currency-custom-option no-results">No currencies found</div>';
        return
    }
    e.innerHTML = o.map(s => `
    <div class="currency-custom-option ${s.code === n ? "selected" : ""}" data-value="${s.code}" data-name="${s.name}">
      <span class="code">${s.code}</span>
      <span class="name">${s.name}</span>
    </div>
  `).join("")
}
function Ft(e) {
    const t = D[e];
    if (!t)
        return;
    const {wrapper: n, trigger: a, dropdown: o, originalSelect: s} = t
      , i = o.querySelector("input")
      , l = o.querySelector(".currency-custom-options");
    a.addEventListener("click", c => {
        c.stopPropagation(),
        Object.keys(D).forEach(u => {
            u !== e && le(u)
        }
        ),
        o.classList.contains("open") ? le(e) : qt(e)
    }
    ),
    i.addEventListener("input", c => {
        _e(l, L, s.value, c.target.value),
        $e(e)
    }
    ),
    o.addEventListener("click", c => c.stopPropagation()),
    $e(e)
}
function $e(e) {
    const t = D[e];
    if (!t)
        return;
    const {dropdown: n, trigger: a, originalSelect: o} = t;
    n.querySelectorAll(".currency-custom-option:not(.no-results)").forEach(i => {
        i.addEventListener("click", () => {
            const l = i.dataset.value
              , c = i.dataset.name;
            o.value = l,
            a.querySelector(".currency-code").textContent = l,
            a.querySelector(".currency-name").textContent = c,
            n.querySelectorAll(".currency-custom-option").forEach(d => d.classList.remove("selected")),
            i.classList.add("selected"),
            le(e)
        }
        )
    }
    )
}
function qt(e) {
    const t = D[e];
    t && (t.trigger.classList.add("open"),
    t.dropdown.classList.add("open"),
    t.dropdown.querySelector("input").value = "",
    t.dropdown.querySelector("input").focus(),
    _e(t.dropdown.querySelector(".currency-custom-options"), L, t.originalSelect.value),
    $e(e))
}
function le(e) {
    const t = D[e];
    t && (t.trigger.classList.remove("open"),
    t.dropdown.classList.remove("open"))
}
document.addEventListener("click", () => {
    Object.keys(D).forEach(e => le(e))
}
);
window.convertCurrency = async function() {
    const e = parseFloat(document.getElementById("currency-amount").value)
      , t = document.getElementById("currency-from").value
      , n = document.getElementById("currency-to").value;
    if (!e || !t || !n) {
        p("Please fill in all fields", "error");
        return
    }
    j("Converting...");
    try {
        const o = await (await fetch(`${Le}/${t}`)).json();
        if (o.conversion_rates && o.conversion_rates[n]) {
            const s = o.conversion_rates[n]
              , i = e * s;
            document.getElementById("result-from-amount").textContent = e.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }),
            document.getElementById("result-from-code").textContent = t,
            document.getElementById("result-to-amount").textContent = i.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }),
            document.getElementById("result-to-code").textContent = n,
            document.getElementById("rate-from").textContent = t,
            document.getElementById("rate-value").textContent = s.toFixed(6),
            document.getElementById("rate-to").textContent = n,
            document.getElementById("rate-date").textContent = `Last updated: ${o.time_last_update_utc ? new Date(o.time_last_update_utc).toLocaleDateString() : "Today"}`,
            document.getElementById("currency-result").classList.remove("hidden")
        } else
            p("Currency not supported", "error")
    } catch (a) {
        console.error("Currency conversion failed:", a),
        p("Failed to convert currency", "error")
    }
    W()
}
;
window.swapCurrencies = function() {
    var c, d;
    const e = document.getElementById("currency-from")
      , t = document.getElementById("currency-to")
      , n = e.value
      , a = ((c = L.find(u => u.code === n)) == null ? void 0 : c.name) || ""
      , o = t.value
      , s = ((d = L.find(u => u.code === o)) == null ? void 0 : d.name) || "";
    e.value = o,
    t.value = n;
    const i = D["currency-from"]
      , l = D["currency-to"];
    i && (i.trigger.querySelector(".currency-code").textContent = o,
    i.trigger.querySelector(".currency-name").textContent = s),
    l && (l.trigger.querySelector(".currency-code").textContent = n,
    l.trigger.querySelector(".currency-name").textContent = a)
}
;
async function Ut() {
    const e = document.getElementById("popular-currencies");
    if (!e)
        return;
    const t = [{
        code: "EUR",
        name: "Euro",
        flag: "eu"
    }, {
        code: "GBP",
        name: "British Pound",
        flag: "gb"
    }, {
        code: "EGP",
        name: "Egyptian Pound",
        flag: "eg"
    }, {
        code: "AED",
        name: "UAE Dirham",
        flag: "ae"
    }, {
        code: "SAR",
        name: "Saudi Riyal",
        flag: "sa"
    }, {
        code: "JPY",
        name: "Japanese Yen",
        flag: "jp"
    }, {
        code: "CAD",
        name: "Canadian Dollar",
        flag: "ca"
    }, {
        code: "INR",
        name: "Indian Rupee",
        flag: "in"
    }];
    try {
        const a = await (await fetch(`${Le}/USD`)).json();
        e.innerHTML = t.map(o => {
            const s = a.conversion_rates ? a.conversion_rates[o.code] : null;
            return `
        <div class="popular-currency-card" onclick="quickConvert('${o.code}')">
          <img src="https://flagcdn.com/w40/${o.flag}.png" alt="${o.code}" class="flag">
          <div class="info">
            <div class="code">${o.code}</div>
            <div class="name">${o.name}</div>
          </div>
          <div class="rate">${s ? s.toFixed(4) : "-"}</div>
        </div>
      `
        }
        ).join("")
    } catch {
        e.innerHTML = '<p style="text-align: center; color: var(--slate-500); padding: 20px;">Failed to load rates</p>'
    }
}
window.quickConvert = function(e) {
    const t = document.getElementById("currency-to");
    t.value = e;
    const n = D["currency-to"];
    if (n) {
        const a = L.find(o => o.code === e);
        a && (n.trigger.querySelector(".currency-code").textContent = a.code,
        n.trigger.querySelector(".currency-name").textContent = a.name)
    }
    convertCurrency()
}
;
async function ze() {
    const e = document.getElementById("dashboard-country-info");
    if (e) {
        if (Y && (clearInterval(Y),
        Y = null),
        !r.countryCode) {
            e.innerHTML = `
      <div class="country-info-placeholder">
        <div class="placeholder-icon">
          <i class="fa-solid fa-globe"></i>
        </div>
        <p>Select a country to view detailed information</p>
      </div>
    `;
            return
        }
        e.innerHTML = `
    <div class="country-info-loading">
      <i class="fa-solid fa-spinner fa-spin"></i>
      <span>Loading country information...</span>
    </div>
  `;
        try {
            if (U[r.countryCode]) {
                Se(U[r.countryCode]);
                return
            }
            const n = await (await fetch(`${Ce}/alpha/${r.countryCode}`)).json();
            n && n.length > 0 && (U[r.countryCode] = n[0],
            Se(n[0]))
        } catch (t) {
            console.error("Failed to load country info:", t),
            e.innerHTML = `
      <div class="country-info-placeholder">
        <div class="placeholder-icon error">
          <i class="fa-solid fa-exclamation-triangle"></i>
        </div>
        <p>Failed to load country information. Please try again.</p>
      </div>
    `
        }
    }
}
let Y;
function Se(e) {
    var R, F, q, N, _, M, H, P, A, x, G;
    const t = document.getElementById("dashboard-country-info");
    if (!t)
        return;
    Y && clearInterval(Y);
    const n = ((R = e.name) == null ? void 0 : R.common) || "N/A"
      , a = ((F = e.name) == null ? void 0 : F.official) || n
      , o = ((q = e.capital) == null ? void 0 : q[0]) || "N/A"
      , s = ((N = e.population) == null ? void 0 : N.toLocaleString()) || "N/A"
      , i = ((_ = e.area) == null ? void 0 : _.toLocaleString()) || "N/A"
      , l = e.region || "N/A"
      , c = e.subregion || ""
      , d = e.languages ? Object.values(e.languages) : []
      , u = e.currencies ? Object.entries(e.currencies) : []
      , m = e.timezones || []
      , f = e.idd ? `${e.idd.root}${((M = e.idd.suffixes) == null ? void 0 : M[0]) || ""}` : "N/A"
      , g = ((H = e.flags) == null ? void 0 : H.svg) || ((P = e.flags) == null ? void 0 : P.png) || ""
      , w = e.borders || []
      , S = ((A = e.maps) == null ? void 0 : A.googleMaps) || "#"
      , T = ((x = e.continents) == null ? void 0 : x[0]) || l
      , B = (G = e.car) != null && G.side ? e.car.side.charAt(0).toUpperCase() + e.car.side.slice(1) : "N/A"
      , K = e.startOfWeek ? e.startOfWeek.charAt(0).toUpperCase() + e.startOfWeek.slice(1) : "N/A"
      , h = m[0] || "UTC";
    function O() {
        const v = new Date;
        try {
            if (h.includes("UTC")) {
                const b = h.match(/UTC([+-])(\d{2}):?(\d{2})?/);
                if (b) {
                    const ae = b[1] === "+" ? 1 : -1
                      , oe = parseInt(b[2]) || 0
                      , V = parseInt(b[3]) || 0
                      , $ = v.getTime() + v.getTimezoneOffset() * 6e4;
                    return new Date($ + ae * (oe * 36e5 + V * 6e4)).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: !0
                    })
                }
            }
            return v.toLocaleTimeString("en-US", {
                timeZone: h,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: !0
            })
        } catch {
            return v.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: !0
            })
        }
    }
    t.innerHTML = `
    <div class="dashboard-country-header">
      <img src="${g}" alt="${n}" class="dashboard-country-flag">
      <div class="dashboard-country-title">
        <h3>${n}</h3>
        <p class="official-name">${a}</p>
        <span class="region"><i class="fa-solid fa-location-dot"></i> ${l}${c ? ` • ${c}` : ""}</span>
      </div>
    </div>
    
    <div class="dashboard-local-time">
      <div class="local-time-display">
        <i class="fa-solid fa-clock"></i>
        <span class="local-time-value" id="country-local-time">${O()}</span>
        <span class="local-time-zone">${h}</span>
      </div>
    </div>
    
    <div class="dashboard-country-grid">
      <div class="dashboard-country-detail">
        <i class="fa-solid fa-building-columns"></i>
        <span class="label">Capital</span>
        <span class="value">${o}</span>
      </div>
      
      <div class="dashboard-country-detail">
        <i class="fa-solid fa-users"></i>
        <span class="label">Population</span>
        <span class="value">${s}</span>
      </div>
      
      <div class="dashboard-country-detail">
        <i class="fa-solid fa-ruler-combined"></i>
        <span class="label">Area</span>
        <span class="value">${i} km²</span>
      </div>
      
      <div class="dashboard-country-detail">
        <i class="fa-solid fa-globe"></i>
        <span class="label">Continent</span>
        <span class="value">${T}</span>
      </div>
      
      <div class="dashboard-country-detail">
        <i class="fa-solid fa-phone"></i>
        <span class="label">Calling Code</span>
        <span class="value">${f}</span>
      </div>
      
      <div class="dashboard-country-detail">
        <i class="fa-solid fa-car"></i>
        <span class="label">Driving Side</span>
        <span class="value">${B}</span>
      </div>
      
      <div class="dashboard-country-detail">
        <i class="fa-solid fa-calendar-week"></i>
        <span class="label">Week Starts</span>
        <span class="value">${K}</span>
      </div>
    </div>
    
    <div class="dashboard-country-extras">
      ${u.length > 0 ? `
        <div class="dashboard-country-extra">
          <h4><i class="fa-solid fa-coins"></i> Currency</h4>
          <div class="extra-tags">
            ${u.map( ([v,b]) => `<span class="extra-tag">${b.name} (${v}${b.symbol ? " " + b.symbol : ""})</span>`).join("")}
          </div>
        </div>
      ` : ""}
      
      ${d.length > 0 ? `
        <div class="dashboard-country-extra">
          <h4><i class="fa-solid fa-language"></i> Languages</h4>
          <div class="extra-tags">
            ${d.map(v => `<span class="extra-tag">${v}</span>`).join("")}
          </div>
        </div>
      ` : ""}
      
      ${w.length > 0 ? `
        <div class="dashboard-country-extra">
          <h4><i class="fa-solid fa-map-location-dot"></i> Neighbors</h4>
          <div class="extra-tags">
            ${w.map(v => `<span class="extra-tag border-tag" onclick="loadDashboardBorderCountry('${v}')">${v}</span>`).join("")}
          </div>
        </div>
      ` : ""}
    </div>
    
    <div class="dashboard-country-actions">
      <a href="${S}" target="_blank" rel="noopener" class="btn-map-link">
        <i class="fa-solid fa-map"></i> View on Google Maps
      </a>
    </div>
  `,
    Y = setInterval( () => {
        const v = document.getElementById("country-local-time");
        v && (v.textContent = O())
    }
    , 1e3)
}
window.loadDashboardBorderCountry = async function(e) {
    const t = document.getElementById("dashboard-country-info");
    if (t) {
        t.innerHTML = `
    <div class="country-info-loading">
      <i class="fa-solid fa-spinner fa-spin"></i>
      <span>Loading country information...</span>
    </div>
  `;
        try {
            const a = await (await fetch(`${Ce}/alpha/${e}`)).json();
            if (a && a.length > 0) {
                U[e] = a[0];
                const o = I.find(s => s.countryCode.toLowerCase() === e.toLowerCase());
                o && (r.countryCode = o.countryCode,
                r.countryName = o.name,
                r.cityName = null,
                r.cityLat = null,
                r.cityLon = null,
                C["global-country"] && De("global-country", o.countryCode, o.name),
                ke(o.countryCode, "global-city"),
                de()),
                Se(a[0])
            }
        } catch (n) {
            console.error("Failed to load border country:", n),
            t.innerHTML = `
      <div class="country-info-placeholder">
        <div class="placeholder-icon error">
          <i class="fa-solid fa-exclamation-triangle"></i>
        </div>
        <p>Failed to load country information. Please try again.</p>
      </div>
    `
        }
    }
}
;
window.loadSunTimes = async function() {
    if (!r.countryCode) {
        p("Please select a country from the dashboard", "warning");
        return
    }
    if ((!r.cityLat || !r.cityLon) && await re(),
    !r.cityLat || !r.cityLon) {
        p("Could not determine city location", "warning");
        return
    }
    const e = be(new Date);
    j("Getting sun times...");
    try {
        const n = await (await fetch(`${Qe}?lat=${r.cityLat}&lng=${r.cityLon}&date=${e}&formatted=0`)).json();
        n.status === "OK" && n.results ? jt(n.results, r.cityName, e) : p("Failed to get sun times", "error")
    } catch (t) {
        console.error("Sun times error:", t),
        p("Failed to load sun times", "error")
    }
    W()
}
;
function jt(e, t, n) {
    const a = document.getElementById("sun-times-content");
    if (!a)
        return;
    const o = new Date(e.sunrise)
      , s = new Date(e.sunset)
      , i = new Date(e.solar_noon)
      , l = new Date(e.civil_twilight_begin)
      , c = new Date(e.civil_twilight_end)
      , d = e.day_length
      , u = B => B.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: !0
    })
      , m = Math.floor(d / 3600)
      , f = Math.floor(d % 3600 / 60)
      , g = d / 86400 * 100
      , w = new Date(n)
      , S = w.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })
      , T = w.toLocaleDateString("en-US", {
        weekday: "long"
    });
    a.innerHTML = `
    <div class="sun-main-card">
      <div class="sun-main-header">
        <div class="sun-location">
          <h2><i class="fa-solid fa-location-dot"></i> ${t}</h2>
          <p>Sun times for your selected location</p>
        </div>
        <div class="sun-date-display">
          <div class="date">${S}</div>
          <div class="day">${T}</div>
        </div>
      </div>
      
      <div class="sun-times-grid">
        <div class="sun-time-card dawn">
          <div class="icon"><i class="fa-solid fa-moon"></i></div>
          <div class="label">Dawn</div>
          <div class="time">${u(l)}</div>
          <div class="sub-label">Civil Twilight</div>
        </div>
        
        <div class="sun-time-card sunrise">
          <div class="icon"><i class="fa-solid fa-sun"></i></div>
          <div class="label">Sunrise</div>
          <div class="time">${u(o)}</div>
          <div class="sub-label">Golden Hour Start</div>
        </div>
        
        <div class="sun-time-card noon">
          <div class="icon"><i class="fa-solid fa-sun"></i></div>
          <div class="label">Solar Noon</div>
          <div class="time">${u(i)}</div>
          <div class="sub-label">Sun at Highest</div>
        </div>
        
        <div class="sun-time-card sunset">
          <div class="icon"><i class="fa-solid fa-sun"></i></div>
          <div class="label">Sunset</div>
          <div class="time">${u(s)}</div>
          <div class="sub-label">Golden Hour End</div>
        </div>
        
        <div class="sun-time-card dusk">
          <div class="icon"><i class="fa-solid fa-moon"></i></div>
          <div class="label">Dusk</div>
          <div class="time">${u(c)}</div>
          <div class="sub-label">Civil Twilight</div>
        </div>
        
        <div class="sun-time-card daylight">
          <div class="icon"><i class="fa-solid fa-hourglass-half"></i></div>
          <div class="label">Day Length</div>
          <div class="time">${m}h ${f}m</div>
          <div class="sub-label">Total Daylight</div>
        </div>
      </div>
    </div>
    
    <div class="day-length-card">
      <h3><i class="fa-solid fa-chart-pie"></i> Daylight Distribution</h3>
      <div class="day-progress">
        <div class="day-progress-bar">
          <div class="day-progress-fill" style="width: ${g}%"></div>
        </div>
      </div>
      <div class="day-length-stats">
        <div class="day-stat">
          <div class="value">${m}h ${f}m</div>
          <div class="label">Daylight</div>
        </div>
        <div class="day-stat">
          <div class="value">${g.toFixed(1)}%</div>
          <div class="label">of 24 Hours</div>
        </div>
        <div class="day-stat">
          <div class="value">${24 - m}h ${60 - f}m</div>
          <div class="label">Darkness</div>
        </div>
      </div>
    </div>
  `
}
document.addEventListener("keydown", e => {
    e.key === "Escape" && (closeModal(),
    xe())
}
);
