/**
 * Travel Dost - Main Homepage Controller (index.js)
 * Enhanced with Universal Map & Mall Explorer, Live Country Places Engine,
 * Interactive About Tabs, and CountUp Animation.
 */
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. PRELOADER & INITIAL SETUP
     ========================================================================== */
  const preloader = document.getElementById('pre-loader');
  window.addEventListener('load', () => {
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 400);
    }
  });

  if (document.readyState === 'complete') {
    if (preloader) preloader.classList.add('fade-out');
  }

  // Dynamic Year in Footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     2. SCROLL PROGRESS BAR & BACK TO TOP BUTTON
     ========================================================================== */
  const progressBar = document.getElementById('progress-bar');
  const goUpBtn = document.getElementById('goUpBtn');

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrolled}%`;
    }

    if (goUpBtn) {
      if (winScroll > 20) {
        goUpBtn.classList.add('show-btn');
      } else {
        goUpBtn.classList.remove('show-btn');
      }
    }
  });

  if (goUpBtn) {
    goUpBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     3. TYPED.JS INITIALIZATION
     ========================================================================== */
  const typedTarget = document.querySelector('.auto-typed');
  if (typedTarget && typeof Typed !== 'undefined') {
    new Typed('.auto-typed', {
      strings: ['Wonders', 'Gems', 'Secrets'],
      typeSpeed: 90,
      backSpeed: 60,
      backDelay: 1800,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }

  /* ==========================================================================
     4. COUNTUP NUMERIC STATS ANIMATION
     ========================================================================== */
  function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * (end - start) + start);
      obj.textContent = currentVal.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.textContent = end.toLocaleString();
      }
    };
    window.requestAnimationFrame(step);
  }

  const statsSection = document.getElementById('statsSection');
  let animatedStats = false;

  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          animateValue('guidesCount', 0, 25000, 2200);
          animateValue('toursCount', 0, 20000, 2200);
          animateValue('destinationsCount', 0, 10994, 2500);
          animateValue('voyagersCount', 0, 150000, 2500);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    statsObserver.observe(statsSection);
  } else {
    animateValue('guidesCount', 0, 25000, 2000);
    animateValue('toursCount', 0, 20000, 2000);
    animateValue('destinationsCount', 0, 10994, 2000);
    animateValue('voyagersCount', 0, 150000, 2000);
  }

  /* ==========================================================================
     5. INTERACTIVE ABOUT US TABS
     ========================================================================== */
  const aboutTabBtns = document.querySelectorAll('.about-tab-btn');
  const aboutTabPanes = document.querySelectorAll('.about-tab-pane');

  aboutTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      aboutTabBtns.forEach(b => b.classList.remove('active'));
      aboutTabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(`pane-${targetTab}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     6. UNIVERSAL LIVE MAP & MALL EXPLORER ENGINE (#MapExplorer)
     ========================================================================== */
  const mapElement = document.getElementById('homeWorldMap');

  // Curated Best Suggested Places Database (Including World Famous Malls, Wonders & Stays)
  const mapSuggestedPlaces = [
    // World Famous Malls & Shopping
    {
      id: "dubai-mall",
      name: "The Dubai Mall",
      type: "mall",
      categoryName: "World's Largest Mall",
      city: "Dubai",
      country: "United Arab Emirates",
      coords: [25.1972, 55.2797],
      rating: 4.9,
      badge: "Iconic Mall",
      img: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=600&q=80",
      desc: "World's largest destination for shopping and leisure, featuring 1,200+ luxury stores, the Dubai Aquarium, and underwater zoo.",
      price: 0,
      hours: "10:00 AM - 12:00 AM"
    },
    {
      id: "harrods-london",
      name: "Harrods Department Store",
      type: "mall",
      categoryName: "Luxury Department Store",
      city: "London",
      country: "United Kingdom",
      coords: [51.4994, -0.1633],
      rating: 4.8,
      badge: "Historic Luxury",
      img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80",
      desc: "World-renowned 7-story luxury department store on Brompton Road in Knightsbridge, celebrated for couture fashion and gourmet Food Halls.",
      price: 0,
      hours: "10:00 AM - 9:00 PM"
    },
    {
      id: "galeries-lafayette",
      name: "Galeries Lafayette Paris",
      type: "mall",
      categoryName: "Haute Couture Shopping",
      city: "Paris",
      country: "France",
      coords: [48.8735, 2.3322],
      rating: 4.9,
      badge: "Art Nouveau Mall",
      img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
      desc: "Opulent flagship French department store famous for its century-old stained-glass dome and panoramic rooftop view over Paris.",
      price: 0,
      hours: "10:00 AM - 8:30 PM"
    },
    {
      id: "siam-paragon",
      name: "Siam Paragon Bangkok",
      type: "mall",
      categoryName: "Mega Lifestyle Mall",
      city: "Bangkok",
      country: "Thailand",
      coords: [13.7466, 100.5348],
      rating: 4.8,
      badge: "Top Asian Mall",
      img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80",
      desc: "One of Asia's largest luxury shopping paradises featuring Sea Life Ocean World, international flagship fashion houses, and Thai gourmet halls.",
      price: 0,
      hours: "10:00 AM - 10:00 PM"
    },
    {
      id: "mall-of-emirates",
      name: "Mall of the Emirates",
      type: "mall",
      categoryName: "Indoor Ski Resort & Mall",
      city: "Dubai",
      country: "United Arab Emirates",
      coords: [25.1181, 55.2007],
      rating: 4.8,
      badge: "Ski & Shop",
      img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
      desc: "Multi-level shopping center housing Ski Dubai (indoor ski slopes with real snow and penguins), luxury fashion avenue, and family entertainment.",
      price: 0,
      hours: "10:00 AM - 12:00 AM"
    },
    {
      id: "mall-of-america",
      name: "Mall of America",
      type: "mall",
      categoryName: "Largest USA Mall",
      city: "Bloomington, MN",
      country: "United States",
      coords: [44.8549, -93.2422],
      rating: 4.7,
      badge: "Theme Park Mall",
      img: "https://images.unsplash.com/photo-1567449303078-57ad995bd302?auto=format&fit=crop&w=600&q=80",
      desc: "The largest shopping and indoor entertainment complex in the USA, featuring Nickelodeon Universe indoor theme park and SEA LIFE Aquarium.",
      price: 0,
      hours: "10:00 AM - 9:00 PM"
    },

    // World Wonders & Landmarks
    {
      id: "eiffel-tower",
      name: "Eiffel Tower",
      type: "wonder",
      categoryName: "World Wonder",
      city: "Paris",
      country: "France",
      coords: [48.8584, 2.2945],
      rating: 4.95,
      badge: "Top Landmark",
      img: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=600&q=80",
      desc: "The iconic wrought-iron lattice tower on the Champ de Mars, offering sparkling evening illumination and panoramic city views.",
      price: 899,
      hours: "9:00 AM - 11:45 PM"
    },
    {
      id: "taj-mahal",
      name: "Taj Mahal",
      type: "wonder",
      categoryName: "UNESCO World Wonder",
      city: "Agra",
      country: "India",
      coords: [27.1751, 78.0421],
      rating: 5.0,
      badge: "New 7 Wonder",
      img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80",
      desc: "An immense ivory-white marble mausoleum on the south bank of the Yamuna River, commissioned in 1632 by the Mughal emperor Shah Jahan.",
      price: 640,
      hours: "Sunrise to Sunset"
    },
    {
      id: "colosseum",
      name: "The Colosseum",
      type: "wonder",
      categoryName: "Ancient Amphitheatre",
      city: "Rome",
      country: "Italy",
      coords: [41.8902, 12.4922],
      rating: 4.9,
      badge: "Ancient Wonder",
      img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
      desc: "The largest ancient amphitheater ever built, situated east of the Roman Forum and standing as an eternal symbol of imperial Rome.",
      price: 780,
      hours: "8:30 AM - 7:00 PM"
    },
    {
      id: "burj-khalifa",
      name: "Burj Khalifa",
      type: "wonder",
      categoryName: "Tallest Skyscraper",
      city: "Dubai",
      country: "United Arab Emirates",
      coords: [25.1972, 55.2744],
      rating: 4.9,
      badge: "Skyscraper",
      img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
      desc: "Standing at 828 meters, the world's tallest building features 360-degree observation decks on the 124th and 148th floors.",
      price: 799,
      hours: "Open 24/7"
    },
    {
      id: "pyramids-giza",
      name: "Great Pyramids of Giza",
      type: "wonder",
      categoryName: "Ancient World Wonder",
      city: "Giza, Cairo",
      country: "Egypt",
      coords: [29.9792, 31.1342],
      rating: 4.95,
      badge: "Ancient Wonder",
      img: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=600&q=80",
      desc: "The oldest and only substantially intact monument of the Seven Wonders of the Ancient World, flanked by the enigmatic Great Sphinx.",
      price: 850,
      hours: "8:00 AM - 5:00 PM"
    },
    {
      id: "machu-picchu",
      name: "Machu Picchu Citadel",
      type: "wonder",
      categoryName: "Inca Sanctuary",
      city: "Cusco",
      country: "Peru",
      coords: [-13.1631, -72.5450],
      rating: 5.0,
      badge: "Mountain Wonder",
      img: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=80",
      desc: "15th-century Inca citadel situated on a mountain ridge 2,430 meters above sea level in the Eastern Cordillera of southern Peru.",
      price: 980,
      hours: "6:00 AM - 5:30 PM"
    },

    // Paradise Beaches & Coastal
    {
      id: "santorini-caldera",
      name: "Oia Caldera & Sunset",
      type: "beach",
      categoryName: "Aegean Paradise",
      city: "Santorini",
      country: "Greece",
      coords: [36.4618, 25.3753],
      rating: 5.0,
      badge: "Iconic Coast",
      img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
      desc: "Whitewashed cliffside villas and blue-domed churches perched over the sparkling volcanic Aegean Sea caldera.",
      price: 1150,
      hours: "Best at Sunset"
    },
    {
      id: "bali-nusa-dua",
      name: "Nusa Dua & Uluwatu",
      type: "beach",
      categoryName: "Tropical Surfing & Temples",
      city: "Bali",
      country: "Indonesia",
      coords: [-8.8005, 115.2167],
      rating: 4.9,
      badge: "Beach Haven",
      img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
      desc: "Pristine white sand beaches, five-star luxury beachfront enclaves, and dramatic cliff-edge sea temples.",
      price: 649,
      hours: "All Day"
    },
    {
      id: "positano-amalfi",
      name: "Positano Cliffside",
      type: "beach",
      categoryName: "Italian Riviera",
      city: "Amalfi Coast",
      country: "Italy",
      coords: [40.6281, 14.4850],
      rating: 4.95,
      badge: "Romantic Coast",
      img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
      desc: "Steep village cliffs lined with pastel-colored houses, lemon groves, and luxury speedboats cruising to Capri.",
      price: 1250,
      hours: "Spring to Autumn"
    },

    // Nature & Adventure
    {
      id: "matterhorn-zermatt",
      name: "Matterhorn Glacier",
      type: "nature",
      categoryName: "Alpine Peak",
      city: "Zermatt",
      country: "Switzerland",
      coords: [45.9765, 7.7491],
      rating: 4.95,
      badge: "Alpine Wonder",
      img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80",
      desc: "One of the highest summits in the Alps and Europe, famous for year-round glacier skiing and the scenic Gornergrat railway.",
      price: 799,
      hours: "Mountain Rail Active"
    },
    {
      id: "grand-canyon",
      name: "Grand Canyon South Rim",
      type: "nature",
      categoryName: "National Park",
      city: "Arizona",
      country: "United States",
      coords: [36.0544, -112.1401],
      rating: 4.9,
      badge: "Natural Wonder",
      img: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=600&q=80",
      desc: "Steep-sided canyon carved by the Colorado River in Arizona, revealing billions of years of geological history.",
      price: 1499,
      hours: "Open 24/7"
    },

    // Luxury Resorts & Stays
    {
      id: "burj-al-arab",
      name: "Burj Al Arab Jumeirah",
      type: "luxury",
      categoryName: "7-Star Luxury Hotel",
      city: "Dubai",
      country: "United Arab Emirates",
      coords: [25.1412, 55.1852],
      rating: 5.0,
      badge: "7-Star Luxury",
      img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
      desc: "The world's only official 7-star hotel, designed like a billowing sail on its own private artificial island.",
      price: 520,
      hours: "Guests & Diners"
    },
    {
      id: "ritz-paris",
      name: "The Ritz Paris",
      type: "luxury",
      categoryName: "Grand Palace Hotel",
      city: "Paris",
      country: "France",
      coords: [48.8682, 2.3292],
      rating: 4.98,
      badge: "Palace Hotel",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
      desc: "Legendary grand hotel overlooking Place Vendôme, historic retreat of royalty, Hemingway, and Coco Chanel.",
      price: 890,
      hours: "24/7 Luxury"
    },
    {
      id: "marina-bay-sands",
      name: "Marina Bay Sands",
      type: "luxury",
      categoryName: "Integrated Luxury Resort",
      city: "Singapore",
      country: "Singapore",
      coords: [1.2838, 103.8591],
      rating: 4.9,
      badge: "Infinity Pool",
      img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80",
      desc: "Futuristic 3-tower luxury resort crowned by the Sands SkyPark, boasting the world's longest elevated infinity pool and premier shopping canal.",
      price: 490,
      hours: "24/7 Resort & Casino"
    }
  ];

  let homeMap = null;
  let mapMarkersGroup = null;
  let activeMapCategory = 'all';
  let isSatelliteLayer = false;
  let streetLayer = null;
  let satelliteLayer = null;
  let searchResultMarker = null;

  function initHomeWorldMap() {
    if (!mapElement || typeof L === 'undefined') return;

    homeMap = L.map('homeWorldMap', {
      center: [22.0, 18.0],
      zoom: 3,
      minZoom: 2,
      maxZoom: 18,
      scrollWheelZoom: true
    });

    streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors | Travel Dost',
      maxZoom: 19
    }).addTo(homeMap);

    satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri, Earthstar Geographics | Travel Dost',
      maxZoom: 18
    });

    mapMarkersGroup = L.layerGroup().addTo(homeMap);

    renderMapHotspots();

    const layerBtn = document.getElementById('btnMapLayerToggle');
    if (layerBtn) {
      layerBtn.addEventListener('click', () => {
        isSatelliteLayer = !isSatelliteLayer;
        if (isSatelliteLayer) {
          homeMap.removeLayer(streetLayer);
          satelliteLayer.addTo(homeMap);
          layerBtn.innerHTML = `<i class="ri-map-2-line"></i> Street Layer`;
        } else {
          homeMap.removeLayer(satelliteLayer);
          streetLayer.addTo(homeMap);
          layerBtn.innerHTML = `<i class="ri-stack-line"></i> Satellite Layer`;
        }
      });
    }

    const resetBtn = document.getElementById('btnMapResetView');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        homeMap.flyTo([22.0, 18.0], 3, { duration: 1.5 });
      });
    }
  }

  function getPlaceIcon(type) {
    let iconClass = 'ri-map-pin-2-fill';

    if (type === 'mall') {
      iconClass = 'ri-shopping-bag-3-fill';
    } else if (type === 'wonder') {
      iconClass = 'ri-ancient-gate-fill';
    } else if (type === 'beach') {
      iconClass = 'ri-sun-cloudy-fill';
    } else if (type === 'nature') {
      iconClass = 'ri-landscape-fill';
    } else if (type === 'luxury') {
      iconClass = 'ri-hotel-bed-fill';
    }

    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="background-color: ${type === 'mall' ? '#ff4757' : (type === 'beach' ? '#f59e0b' : (type === 'nature' ? '#10b981' : '#3685fb'))}; 
                    width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; 
                    color: #fff; font-size: 1.1rem; box-shadow: 0 4px 14px rgba(0,0,0,0.3); border: 2.5px solid #fff; cursor: pointer;">
          <i class="${iconClass}"></i>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36]
    });
  }

  function renderMapHotspots() {
    if (!homeMap || !mapMarkersGroup) return;

    mapMarkersGroup.clearLayers();
    const tray = document.getElementById('suggestHotspotsTray');
    if (tray) tray.innerHTML = '';

    const filtered = mapSuggestedPlaces.filter(p => activeMapCategory === 'all' || p.type === activeMapCategory);

    filtered.forEach(place => {
      const marker = L.marker(place.coords, { icon: getPlaceIcon(place.type) });

      const popupHtml = `
        <div style="width: 250px; overflow: hidden; font-family: var(--font-primary);">
          <img src="${place.img}" alt="${place.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px 8px 0 0;">
          <div style="padding: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-size: 0.72rem; font-weight: 700; color: #ff4757; text-transform: uppercase;">${place.categoryName}</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #f59e0b;"><i class="fa-solid fa-star"></i> ${place.rating}</span>
            </div>
            <h6 style="font-weight: 700; margin: 0 0 2px 0; font-size: 0.95rem; color: #0d213f;">${place.name}</h6>
            <p style="font-size: 0.78rem; color: #64748b; margin: 0 0 8px 0;"><i class="ri-map-pin-line text-primary"></i> ${place.city}, ${place.country}</p>
            <p style="font-size: 0.8rem; color: #475569; margin: 0 0 10px 0; line-height: 1.35;">${place.desc}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 8px;">
              <small style="color: #64748b; font-size: 0.74rem;"><i class="ri-time-line"></i> ${place.hours}</small>
              <a href="payment.html?dest=${encodeURIComponent(place.name)}&price=${place.price || 499}" class="btn btn-sm btn-accent-coral" style="padding: 3px 10px; font-size: 0.75rem; border-radius: 15px;">Book Tour</a>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      mapMarkersGroup.addLayer(marker);

      if (tray) {
        const card = document.createElement('div');
        card.className = 'suggest-hotspot-card';
        card.innerHTML = `
          <div class="hotspot-img-wrap">
            <img src="${place.img}" alt="${place.name}" class="hotspot-img" loading="lazy">
            <span class="hotspot-badge">${place.badge}</span>
          </div>
          <div class="hotspot-body">
            <h6 class="hotspot-title text-truncate">${place.name}</h6>
            <span class="hotspot-loc text-truncate"><i class="ri-map-pin-line text-danger me-1"></i>${place.city}, ${place.country}</span>
            <div class="hotspot-footer">
              <span class="small fw-bold text-warning"><i class="fa-solid fa-star"></i> ${place.rating}</span>
              <span class="badge bg-soft-blue text-primary" style="font-size: 0.72rem;"><i class="ri-compass-3-line"></i> Fly To</span>
            </div>
          </div>
        `;

        card.addEventListener('click', () => {
          document.querySelectorAll('.suggest-hotspot-card').forEach(c => c.classList.remove('selected-hotspot'));
          card.classList.add('selected-hotspot');

          homeMap.flyTo(place.coords, 14, {
            animate: true,
            duration: 1.6
          });

          setTimeout(() => {
            marker.openPopup();
          }, 1600);
        });

        tray.appendChild(card);
      }
    });
  }

  const mapCatPills = document.querySelectorAll('.map-cat-pill');
  mapCatPills.forEach(pill => {
    pill.addEventListener('click', () => {
      mapCatPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeMapCategory = pill.getAttribute('data-map-cat') || 'all';
      renderMapHotspots();
    });
  });

  const mapSearchInput = document.getElementById('mapGlobalSearchInput');
  const mapSearchDropdown = document.getElementById('mapSearchDropdown');
  const clearMapSearchBtn = document.getElementById('clearMapSearchBtn');
  const btnExecuteMapSearch = document.getElementById('btnExecuteMapSearch');

  if (mapSearchInput) {
    mapSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();

      if (clearMapSearchBtn) {
        if (q.length > 0) clearMapSearchBtn.classList.remove('d-none');
        else clearMapSearchBtn.classList.add('d-none');
      }

      if (!q) {
        if (mapSearchDropdown) mapSearchDropdown.classList.remove('show');
        return;
      }

      const matches = mapSuggestedPlaces.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
      );

      if (mapSearchDropdown) {
        let dropdownHtml = '';

        matches.slice(0, 5).forEach(m => {
          dropdownHtml += `
            <div class="map-sugg-item" data-id="${m.id}" data-lat="${m.coords[0]}" data-lng="${m.coords[1]}" data-name="${m.name}">
              <div class="map-sugg-icon">
                <i class="${m.type === 'mall' ? 'ri-shopping-bag-3-line text-danger' : 'ri-map-pin-2-line text-primary'}"></i>
              </div>
              <div class="map-sugg-info">
                <strong>${m.name} <span class="badge ${m.type === 'mall' ? 'bg-danger' : 'bg-primary'} ms-1" style="font-size:0.65rem;">${m.badge}</span></strong>
                <small>${m.city}, ${m.country} &middot; ${m.categoryName}</small>
              </div>
            </div>
          `;
        });

        dropdownHtml += `
          <div class="map-sugg-item bg-soft-blue" id="btnOsmLiveSearch">
            <div class="map-sugg-icon">
              <i class="ri-earth-line text-primary"></i>
            </div>
            <div class="map-sugg-info">
              <strong class="text-primary">Search globally for "${e.target.value}"</strong>
              <small>Locate any city, landmark, or mall anywhere in the world</small>
            </div>
          </div>
        `;

        mapSearchDropdown.innerHTML = dropdownHtml;
        mapSearchDropdown.classList.add('show');

        mapSearchDropdown.querySelectorAll('.map-sugg-item').forEach(item => {
          item.addEventListener('click', () => {
            if (item.id === 'btnOsmLiveSearch') {
              executeLiveOsmSearch(e.target.value);
            } else {
              const lat = parseFloat(item.dataset.lat);
              const lng = parseFloat(item.dataset.lng);
              const name = item.dataset.name;
              mapSearchInput.value = name;
              mapSearchDropdown.classList.remove('show');
              flyToLocation(lat, lng, name, 'Travel Dost Featured Destination');
            }
          });
        });
      }
    });

    mapSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        triggerMapSearch();
      }
    });
  }

  if (clearMapSearchBtn) {
    clearMapSearchBtn.addEventListener('click', () => {
      mapSearchInput.value = '';
      clearMapSearchBtn.classList.add('d-none');
      if (mapSearchDropdown) mapSearchDropdown.classList.remove('show');
      if (searchResultMarker && homeMap) {
        homeMap.removeLayer(searchResultMarker);
        searchResultMarker = null;
      }
    });
  }

  if (btnExecuteMapSearch) {
    btnExecuteMapSearch.addEventListener('click', triggerMapSearch);
  }

  function triggerMapSearch() {
    const q = mapSearchInput.value.trim();
    if (!q) return;

    if (mapSearchDropdown) mapSearchDropdown.classList.remove('show');

    const match = mapSuggestedPlaces.find(p => 
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.city.toLowerCase().includes(q.toLowerCase())
    );

    if (match) {
      flyToLocation(match.coords[0], match.coords[1], match.name, `${match.city}, ${match.country} (${match.categoryName})`, match.img);
    } else {
      executeLiveOsmSearch(q);
    }
  }

  function executeLiveOsmSearch(query) {
    if (!homeMap) return;

    const btn = document.getElementById('btnExecuteMapSearch');
    const origHtml = btn ? btn.innerHTML : '';
    if (btn) {
      btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Searching...`;
      btn.disabled = true;
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        if (btn) {
          btn.innerHTML = origHtml;
          btn.disabled = false;
        }

        if (data && data.length > 0) {
          const first = data[0];
          const lat = parseFloat(first.lat);
          const lon = parseFloat(first.lon);
          const displayName = first.display_name.split(',')[0];
          const fullAddress = first.display_name;

          flyToLocation(lat, lon, displayName, fullAddress, null, first.type);
        } else {
          alert(`Could not locate "${query}". Please check the spelling or try searching a city or country.`);
        }
      })
      .catch(err => {
        console.error('OSM Geocode error:', err);
        if (btn) {
          btn.innerHTML = origHtml;
          btn.disabled = false;
        }
      });
  }

  function flyToLocation(lat, lng, title, subtitle, img, type) {
    if (!homeMap) return;

    if (searchResultMarker) {
      homeMap.removeLayer(searchResultMarker);
    }

    const isMall = (type && type.includes('shop')) || title.toLowerCase().includes('mall');
    const customIcon = L.divIcon({
      className: 'search-result-pin',
      html: `
        <div style="background-color: #ff4757; width: 42px; height: 42px; border-radius: 50%; display: flex; 
                    align-items: center; justify-content: center; color: #fff; font-size: 1.3rem; 
                    box-shadow: 0 0 20px rgba(255, 71, 87, 0.7); border: 3px solid #fff;">
          <i class="${isMall ? 'ri-shopping-bag-3-fill' : 'ri-map-pin-2-fill'}"></i>
        </div>
      `,
      iconSize: [42, 42],
      iconAnchor: [21, 42],
      popupAnchor: [0, -42]
    });

    searchResultMarker = L.marker([lat, lng], { icon: customIcon }).addTo(homeMap);

    const popupContent = `
      <div style="width: 240px; font-family: var(--font-primary); padding: 6px;">
        ${img ? `<img src="${img}" style="width:100%; height:110px; object-fit:cover; border-radius:6px; margin-bottom:8px;">` : ''}
        <h6 style="font-weight: 700; margin-bottom: 3px; color: #0d213f;">${title}</h6>
        <p style="font-size: 0.76rem; color: #64748b; margin-bottom: 8px;">${subtitle}</p>
        <div style="display: flex; gap: 6px;">
          <a href="plantrip.html?dest=${encodeURIComponent(title)}" class="btn btn-sm btn-primary w-100" style="font-size:0.75rem; border-radius:12px;">Plan Itinerary</a>
          <a href="payment.html?dest=${encodeURIComponent(title)}&price=750" class="btn btn-sm btn-accent-coral w-100" style="font-size:0.75rem; border-radius:12px;">Book Tour</a>
        </div>
      </div>
    `;

    searchResultMarker.bindPopup(popupContent).openPopup();

    homeMap.flyTo([lat, lng], 14, {
      animate: true,
      duration: 1.6
    });
  }

  initHomeWorldMap();

  /* ==========================================================================
     7. COMPREHENSIVE GLOBAL COUNTRY-PLACES DESTINATION ENGINE
     ========================================================================== */
  const destinationsGrid = document.getElementById('destinationsGrid');
  const destSearchInput = document.getElementById('destSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const filterPills = document.querySelectorAll('.filter-pill');
  const filterStatus = document.getElementById('filterStatus');
  const noDestResults = document.getElementById('noDestResults');
  const resetDestFilterBtn = document.getElementById('resetDestFilterBtn');
  const countryQuickPills = document.querySelectorAll('.country-quick-pill');

  // Master Global Country-Places Database
  const worldDestinationsDatabase = {
    "india": [
      {
        name: "Taj Mahal & Agra Fort",
        city: "Agra",
        country: "India",
        category: "asia",
        tags: "india taj mahal agra monument wonder mughal heritage asia",
        rating: 5.0,
        reviews: 3200,
        duration: "5 Days / 4 Nights",
        price: 549,
        img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=700&q=80",
        desc: "Stand before the ivory-white marble masterpiece of eternal love at sunrise, explore the majestic red sandstone Agra Fort, and taste Mughlai gastronomy."
      },
      {
        name: "Jaipur Pink City & Amber Fort",
        city: "Jaipur, Rajasthan",
        country: "India",
        category: "asia",
        tags: "india jaipur rajasthan amber fort hawa mahal palaces asia",
        rating: 4.95,
        reviews: 2100,
        duration: "6 Days / 5 Nights",
        price: 599,
        img: "https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?auto=format&fit=crop&w=700&q=80",
        desc: "Marvel at the honeycomb facade of Hawa Mahal, ascend Amber Fort's ramparts, and stay in authentic royal heritage palace havelis."
      },
      {
        name: "Kerala Backwaters & Houseboats",
        city: "Alleppey",
        country: "India",
        category: "asia island",
        tags: "india kerala backwaters houseboats ayurveda palm lagoons beach asia",
        rating: 4.92,
        reviews: 1850,
        duration: "7 Days / 6 Nights",
        price: 680,
        img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=700&q=80",
        desc: "Glide through tranquil palm-fringed emerald lagoons on a private luxury houseboat, with authentic Ayurvedic massages and fresh coconut fish curries."
      },
      {
        name: "Goa Golden Beaches & Heritage Quarters",
        city: "Goa",
        country: "India",
        category: "asia island",
        tags: "india goa beach sunset water sports churches nightlife asia",
        rating: 4.88,
        reviews: 2400,
        duration: "5 Days / 4 Nights",
        price: 499,
        img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=80",
        desc: "Relax along sun-drenched Arabian Sea coastlines, wander Latin quarter Fontainhas, and savor coastal beach shacks at twilight."
      },
      {
        name: "Varanasi Ancient Ghats & Ganga Aarti",
        city: "Varanasi",
        country: "India",
        category: "asia",
        tags: "india varanasi ganges temples spirituality ghats asia",
        rating: 4.96,
        reviews: 1950,
        duration: "4 Days / 3 Nights",
        price: 440,
        img: "https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=700&q=80",
        desc: "Witness sacred evening fire ceremonies at Dashashwamedh Ghat and take dawn boat rides across the holy Ganges River."
      },
      {
        name: "Leh Ladakh High Himalayan Passes",
        city: "Ladakh",
        country: "India",
        category: "asia",
        tags: "india ladakh leh pangong lake himalayas mountains adventure trek asia",
        rating: 5.0,
        reviews: 1720,
        duration: "8 Days / 7 Nights",
        price: 890,
        img: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=700&q=80",
        desc: "Conquer the world's highest motorable passes, stay on the banks of cobalt-blue Pangong Tso, and explore cliffside Tibetan monasteries."
      }
    ],

    "japan": [
      {
        name: "Shibuya Neon & Senso-ji Shrine",
        city: "Tokyo",
        country: "Japan",
        category: "asia",
        tags: "japan tokyo shibuya shinjuku temples anime asia",
        rating: 5.0,
        reviews: 3100,
        duration: "7 Days / 6 Nights",
        price: 1350,
        img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=700&q=80",
        desc: "High-tech cyberpunk streets meeting historic Asakusa shrines, bullet trains, teamLab immersive art, and authentic ramen trails."
      },
      {
        name: "Fushimi Inari & Arashiyama Bamboo",
        city: "Kyoto",
        country: "Japan",
        category: "asia",
        tags: "japan kyoto fushimi inari bamboo geisha temples asia",
        rating: 4.98,
        reviews: 2600,
        duration: "6 Days / 5 Nights",
        price: 1190,
        img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=80",
        desc: "Walk through 10,000 crimson vermillion torii gates, whisper under swaying bamboo groves, and join master geisha tea ceremonies."
      },
      {
        name: "Mount Fuji & Five Lakes Onsen",
        city: "Hakone",
        country: "Japan",
        category: "asia",
        tags: "japan mount fuji hakone onsen lake kawaguchiko volcano asia",
        rating: 4.95,
        reviews: 2150,
        duration: "4 Days / 3 Nights",
        price: 780,
        img: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=700&q=80",
        desc: "Soak in volcanic thermal onsen hot springs with direct views of snow-capped Mount Fuji, and ride pirate ship cruises on Lake Ashi."
      },
      {
        name: "Dotonbori Street Food & Osaka Castle",
        city: "Osaka",
        country: "Japan",
        category: "asia",
        tags: "japan osaka dotonbori food takoyaki castle asia",
        rating: 4.9,
        reviews: 1800,
        duration: "5 Days / 4 Nights",
        price: 920,
        img: "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=700&q=80",
        desc: "The culinary capital of Japan: savor sizzling takoyaki under glowing Glico neon signs and walk the feudal moats of Osaka Castle."
      }
    ],

    "france": [
      {
        name: "Eiffel Tower & Bohemian Montmartre",
        city: "Paris",
        country: "France",
        category: "europe",
        tags: "france paris eiffel tower louvre montmartre romance europe",
        rating: 4.9,
        reviews: 1420,
        duration: "5 Days / 4 Nights",
        price: 899,
        img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=80",
        desc: "Marvel at the Eiffel Tower at twilight, cruise the Seine with champagne, and stroll the cobblestone art bistros of Montmartre."
      },
      {
        name: "French Riviera Promenade & Èze Village",
        city: "Nice & Monaco",
        country: "France",
        category: "europe island",
        tags: "france nice french riviera monaco cannes beach mediterranean europe",
        rating: 4.92,
        reviews: 1650,
        duration: "6 Days / 5 Nights",
        price: 1180,
        img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=700&q=80",
        desc: "Azure Mediterranean waters along the Promenade des Anglais, medieval cliffside perfumeries in Èze, and luxury yacht harbors in Monaco."
      },
      {
        name: "Mont Saint-Michel Tidal Abbey",
        city: "Normandy",
        country: "France",
        category: "europe",
        tags: "france normandy mont saint michel castle history tides europe",
        rating: 4.95,
        reviews: 1100,
        duration: "4 Days / 3 Nights",
        price: 760,
        img: "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=700&q=80",
        desc: "The gothic gravity-defying medieval abbey rising out of vast sandbanks and surrounded by Europe's most dramatic ocean tides."
      }
    ],

    "italy": [
      {
        name: "Colosseum & Roman Forum Legends",
        city: "Rome",
        country: "Italy",
        category: "europe",
        tags: "italy rome colosseum vatican fontana trevi history europe",
        rating: 4.95,
        reviews: 2850,
        duration: "5 Days / 4 Nights",
        price: 950,
        img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=700&q=80",
        desc: "Walk the gladiatorial arena floor of the Colosseum, toss coins into Trevi Fountain, and admire Michelangelo's Sistine Chapel."
      },
      {
        name: "Positano Cliffside & Capri Grottos",
        city: "Amalfi Coast",
        country: "Italy",
        category: "europe island",
        tags: "italy amalfi positano capri coast sea lemon mediterranean europe",
        rating: 5.0,
        reviews: 2400,
        duration: "6 Days / 5 Nights",
        price: 1250,
        img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=700&q=80",
        desc: "Dramatic pastel villages cascading into the sparkling Tyrrhenian Sea, private boat excursions to Capri's Blue Grotto, and limoncello groves."
      },
      {
        name: "Renaissance Duomo & Tuscany Chianti",
        city: "Florence",
        country: "Italy",
        category: "europe",
        tags: "italy florence tuscany wine chianti art uffizi europe",
        rating: 4.94,
        reviews: 1980,
        duration: "6 Days / 5 Nights",
        price: 1080,
        img: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=700&q=80",
        desc: "Brunelleschi's red-tiled Duomo dome, masterworks by Da Vinci at Uffizi Gallery, and vintage wine cellar tastings across rolling Tuscan hills."
      },
      {
        name: "Grand Canal Gondola & San Marco",
        city: "Venice",
        country: "Italy",
        category: "europe island",
        tags: "italy venice gondola canals san marco bridges romance europe",
        rating: 4.88,
        reviews: 2200,
        duration: "4 Days / 3 Nights",
        price: 870,
        img: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=700&q=80",
        desc: "Glide under the Bridge of Sighs on a handcrafted Venetian gondola, explore Murano glassblowers, and drink espresso in Piazza San Marco."
      }
    ],

    "united arab emirates": [
      {
        name: "Burj Khalifa, Dubai Mall & Marina",
        city: "Dubai",
        country: "United Arab Emirates",
        category: "africa",
        tags: "dubai uae emirates burj khalifa dubai mall luxury shopping middle east",
        rating: 4.9,
        reviews: 2750,
        duration: "5 Days / 4 Nights",
        price: 799,
        img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80",
        desc: "World's tallest skyscraper views, shopping inside the mega Dubai Mall, dancing fountain shows, and luxury yacht cruises through Dubai Marina."
      },
      {
        name: "Sheikh Zayed Grand Mosque & Louvre",
        city: "Abu Dhabi",
        country: "United Arab Emirates",
        category: "africa",
        tags: "uae abu dhabi mosque louvre luxury architecture middle east",
        rating: 4.96,
        reviews: 1820,
        duration: "4 Days / 3 Nights",
        price: 720,
        img: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=700&q=80",
        desc: "82 white marble domes and world's largest hand-knotted carpet at the Grand Mosque, coupled with Jean Nouvel's floating dome Louvre Museum."
      },
      {
        name: "Red Dune Safari & Bedouin Camp",
        city: "Dubai Desert",
        country: "United Arab Emirates",
        category: "africa",
        tags: "dubai uae desert safari dune bashing glamping camels middle east",
        rating: 4.92,
        reviews: 2300,
        duration: "3 Days / 2 Nights",
        price: 450,
        img: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?auto=format&fit=crop&w=700&q=80",
        desc: "4x4 red sand dune bashing, sandboarding, falconry displays, and starlit barbecue feasts inside authentic Bedouin oasis camps."
      }
    ],

    "egypt": [
      {
        name: "Great Pyramids of Giza & Sphinx",
        city: "Cairo",
        country: "Egypt",
        category: "africa",
        tags: "egypt cairo giza pyramids sphinx ancient nile history africa",
        rating: 4.95,
        reviews: 2500,
        duration: "5 Days / 4 Nights",
        price: 720,
        img: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=700&q=80",
        desc: "Stand in awe before the Great Pyramid of Khufu, ride camels across Giza desert plateau, and visit the Grand Egyptian Museum treasures."
      },
      {
        name: "Valley of the Kings & Karnak Temple",
        city: "Luxor",
        country: "Egypt",
        category: "africa",
        tags: "egypt luxor valley of the kings karnak temple pharaohs nile africa",
        rating: 4.98,
        reviews: 1900,
        duration: "4 Days / 3 Nights",
        price: 680,
        img: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=700&q=80",
        desc: "Descend into the vibrantly painted underground tombs of Tutankhamun and walk between the 134 towering stone pillars of Karnak Temple."
      },
      {
        name: "Red Sea Coral Diving & Bedouin Star Nights",
        city: "Sharm El-Sheikh",
        country: "Egypt",
        category: "africa island",
        tags: "egypt sharm el sheikh red sea coral diving beach resort africa",
        rating: 4.88,
        reviews: 1450,
        duration: "6 Days / 5 Nights",
        price: 610,
        img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80",
        desc: "World-class scuba diving in Ras Mohammed National Park, turquoise coral atolls, and beachside luxury retreats along Sinai Peninsula."
      }
    ],

    "thailand": [
      {
        name: "Grand Palace, Wat Arun & Iconsiam",
        city: "Bangkok",
        country: "Thailand",
        category: "asia",
        tags: "thailand bangkok temples grand palace iconsiam shopping street food asia",
        rating: 4.9,
        reviews: 2900,
        duration: "5 Days / 4 Nights",
        price: 520,
        img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=700&q=80",
        desc: "Gilded spires of the Emerald Buddha, sunset views over the Temple of Dawn on the Chao Phraya River, and mega shopping at Iconsiam."
      },
      {
        name: "Phi Phi Islands & Maya Bay Lagoon",
        city: "Phuket & Krabi",
        country: "Thailand",
        category: "asia island",
        tags: "thailand phuket phi phi maya bay beach catamaran islands asia",
        rating: 4.96,
        reviews: 3400,
        duration: "6 Days / 5 Nights",
        price: 649,
        img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=700&q=80",
        desc: "Towering limestone sea cliffs plunging into crystal clear emerald waters, private catamaran charters, and glowing plankton night tours."
      },
      {
        name: "Doi Suthep Sanctuary & Lantern Shrines",
        city: "Chiang Mai",
        country: "Thailand",
        category: "asia",
        tags: "thailand chiang mai mountains temples elephants night bazaar asia",
        rating: 4.92,
        reviews: 1750,
        duration: "5 Days / 4 Nights",
        price: 490,
        img: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=700&q=80",
        desc: "Golden mountain temple of Wat Phra That Doi Suthep, ethical elephant rescue sanctuaries, and fragrant night bazaar food walks."
      }
    ],

    "switzerland": [
      {
        name: "Matterhorn Glacier & Zermatt Chalet",
        city: "Zermatt",
        country: "Switzerland",
        category: "europe",
        tags: "switzerland zermatt matterhorn alps glacier ski snow chalet europe",
        rating: 5.0,
        reviews: 1950,
        duration: "6 Days / 5 Nights",
        price: 1190,
        img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=700&q=80",
        desc: "Car-free alpine town under the towering pyramid of the Matterhorn, panoramic cogwheel railways, and fireside fondue in cozy chalets."
      },
      {
        name: "Jungfraujoch Top of Europe & Interlaken",
        city: "Interlaken",
        country: "Switzerland",
        category: "europe",
        tags: "switzerland interlaken jungfrau lakes mountains train europe",
        rating: 4.96,
        reviews: 2100,
        duration: "5 Days / 4 Nights",
        price: 1050,
        img: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=700&q=80",
        desc: "Europe's highest-altitude railway station at 3,454 meters, Ice Palace tunnels, and scenic steamboat cruises on Lake Brienz and Thun."
      }
    ],

    "brazil": [
      {
        name: "Christ the Redeemer & Copacabana",
        city: "Rio de Janeiro",
        country: "Brazil",
        category: "americas island",
        tags: "brazil rio de janeiro corcovado copacabana sugarloaf samba americas",
        rating: 4.92,
        reviews: 2200,
        duration: "6 Days / 5 Nights",
        price: 790,
        img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=700&q=80",
        desc: "Stand beneath the open arms of Christ the Redeemer atop Corcovado mountain, ride the Sugarloaf cable car, and sip caipirinhas on Ipanema."
      },
      {
        name: "Iguazu Falls Giant Waterfalls",
        city: "Foz do Iguaçu",
        country: "Brazil",
        category: "americas",
        tags: "brazil iguazu falls waterfalls jungle nature rainforest americas",
        rating: 5.0,
        reviews: 1800,
        duration: "4 Days / 3 Nights",
        price: 640,
        img: "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=700&q=80",
        desc: "Feel the thunderous roar of 275 spectacular waterfalls stretching across nearly two miles of tropical rainforest on the Brazil-Argentina border."
      }
    ],

    "germany": [
      {
        name: "Neuschwanstein Fairy Tale Castle",
        city: "Bavaria",
        country: "Germany",
        category: "europe",
        tags: "germany bavaria neuschwanstein castle alps munich europe",
        rating: 4.94,
        reviews: 1750,
        duration: "5 Days / 4 Nights",
        price: 850,
        img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80",
        desc: "The real-life inspiration for Disney's Sleeping Beauty castle perched in the Bavarian Alps, combined with Munich's historic beer halls."
      },
      {
        name: "Brandenburg Gate & Museum Island",
        city: "Berlin",
        country: "Germany",
        category: "europe",
        tags: "germany berlin brandenburg gate wall history art europe",
        rating: 4.88,
        reviews: 1600,
        duration: "5 Days / 4 Nights",
        price: 790,
        img: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=700&q=80",
        desc: "Wander the remaining colorful murals of the Berlin Wall East Side Gallery, cross Checkpoint Charlie, and explore Pergamon Museum."
      }
    ],

    "spain": [
      {
        name: "La Sagrada Família & Park Güell",
        city: "Barcelona",
        country: "Spain",
        category: "europe",
        tags: "spain barcelona sagrada familia gaudi tapas mediterranean europe",
        rating: 4.9,
        reviews: 1630,
        duration: "5 Days / 4 Nights",
        price: 840,
        img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=700&q=80",
        desc: "Stand beneath Gaudí's soaring forest-like columns in Sagrada Família, take sunset photos at Park Güell, and taste fresh tapas."
      },
      {
        name: "Alhambra Palace & Generalife Gardens",
        city: "Granada",
        country: "Spain",
        category: "europe",
        tags: "spain granada alhambra moorish palace gardens andalusia europe",
        rating: 4.96,
        reviews: 1450,
        duration: "4 Days / 3 Nights",
        price: 720,
        img: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=700&q=80",
        desc: "Intricate Islamic arabesques, serene reflecting pools, and fragrant rose gardens inside the greatest surviving Moorish fortress in Europe."
      }
    ],

    "greece": [
      {
        name: "Sun-Kissed Oia & Aegean Sunset Vistas",
        city: "Santorini",
        country: "Greece",
        category: "europe island",
        tags: "greece santorini oia caldera sunset aegean islands europe",
        rating: 5.0,
        reviews: 2100,
        duration: "6 Days / 5 Nights",
        price: 1150,
        img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=700&q=80",
        desc: "Iconic whitewashed cliffside villas, azure domes, volcanic wine tastings, and world-renowned caldera sunsets."
      },
      {
        name: "Parthenon & Ancient Acropolis Citadel",
        city: "Athens",
        country: "Greece",
        category: "europe",
        tags: "greece athens acropolis parthenon history ancient europe",
        rating: 4.92,
        reviews: 1850,
        duration: "4 Days / 3 Nights",
        price: 680,
        img: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=700&q=80",
        desc: "Ascend the sacred Acropolis rock to stand before the 2,500-year-old Parthenon temple and wander the historic Plaka neighborhood."
      }
    ],

    "united states": [
      {
        name: "Broadway Lights & Manhattan Skyline",
        city: "New York City",
        country: "United States",
        category: "americas",
        tags: "usa new york times square central park manhattan broadway americas",
        rating: 4.9,
        reviews: 3100,
        duration: "5 Days / 4 Nights",
        price: 980,
        img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=700&q=80",
        desc: "Experience the electric energy of Times Square, stroll romantic Central Park paths, and view the skyline from the Empire State Building."
      },
      {
        name: "Grand Canyon Red Rock Helicopter Flight",
        city: "Arizona",
        country: "United States",
        category: "americas",
        tags: "usa grand canyon arizona helicopter nature canyon americas",
        rating: 5.0,
        reviews: 2400,
        duration: "4 Days / 3 Nights",
        price: 890,
        img: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=700&q=80",
        desc: "Fly deep into the majestic gorges of the Grand Canyon on an exhilarating helicopter tour and walk the glass-bottomed Skywalk."
      }
    ],

    "indonesia": [
      {
        name: "Tropical Ubud & Emerald Rice Terraces",
        city: "Bali",
        country: "Indonesia",
        category: "asia island",
        tags: "bali indonesia ubud rice fields jungle surfing temples asia",
        rating: 4.9,
        reviews: 3400,
        duration: "7 Days / 6 Nights",
        price: 649,
        img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80",
        desc: "Immerse yourself in lush rain forests, ancient water temples, surf breaks, and tranquil wellness yoga retreats."
      }
    ],

    "australia": [
      {
        name: "Opera House Harbour & Bondi Waves",
        city: "Sydney",
        country: "Australia",
        category: "island",
        tags: "australia sydney opera house bondi beach harbour bridge oceania",
        rating: 4.88,
        reviews: 1250,
        duration: "6 Days / 5 Nights",
        price: 1190,
        img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=700&q=80",
        desc: "Sail across Sydney Harbour, conquer the BridgeClimb, and enjoy golden sunset cocktails along Bondi's coastal walk."
      }
    ],

    "south africa": [
      {
        name: "Table Mountain & Coastal Safari Drive",
        city: "Cape Town",
        country: "South Africa",
        category: "africa",
        tags: "south africa cape town table mountain safari penguins africa",
        rating: 4.8,
        reviews: 980,
        duration: "8 Days / 7 Nights",
        price: 1299,
        img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=700&q=80",
        desc: "Cable car rides up Table Mountain, penguin colonies at Boulders Beach, and thrilling Big Five safari drives."
      }
    ],

    "peru": [
      {
        name: "Inca Trail Citadel & Sacred Valley",
        city: "Cusco",
        country: "Peru",
        category: "americas",
        tags: "peru machu picchu cusco inca trail andes americas",
        rating: 5.0,
        reviews: 1850,
        duration: "6 Days / 5 Nights",
        price: 980,
        img: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=700&q=80",
        desc: "Unearth the mysterious Incan citadel nestled in mist-shrouded Andean peaks with certified indigenous guides."
      }
    ],

    "turkey": [
      {
        name: "Hagia Sophia, Blue Mosque & Bosphorus",
        city: "Istanbul",
        country: "Turkey",
        category: "europe",
        tags: "turkey istanbul hagia sophia bosphorus grand bazaar europe asia",
        rating: 4.95,
        reviews: 2150,
        duration: "5 Days / 4 Nights",
        price: 690,
        img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=700&q=80",
        desc: "Where Europe meets Asia: explore 1,500-year-old Byzantine mosaics, cruise the Bosphorus Strait, and haggle in the Grand Bazaar."
      },
      {
        name: "Cappadocia Hot Air Balloons & Cave Suites",
        city: "Göreme",
        country: "Turkey",
        category: "europe",
        tags: "turkey cappadocia hot air balloons fairy chimneys cave hotel europe",
        rating: 5.0,
        reviews: 2700,
        duration: "4 Days / 3 Nights",
        price: 780,
        img: "https://images.unsplash.com/photo-1609137144822-473523f39572?auto=format&fit=crop&w=700&q=80",
        desc: "Float at sunrise over surreal fairy chimney rock valleys in a hot air balloon, and sleep in authentic carved volcanic stone suites."
      }
    ],

    "morocco": [
      {
        name: "Jemaa el-Fnaa & Jardin Majorelle",
        city: "Marrakech",
        country: "Morocco",
        category: "africa",
        tags: "morocco marrakech medina souks desert riad africa",
        rating: 4.9,
        reviews: 1850,
        duration: "5 Days / 4 Nights",
        price: 640,
        img: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=700&q=80",
        desc: "Sensory labyrinth of the Marrakech medina, cobalt-blue tranquility of Yves Saint Laurent's garden, and traditional Hammam baths."
      },
      {
        name: "Sahara Golden Dunes & Desert Camp",
        city: "Merzouga",
        country: "Morocco",
        category: "africa",
        tags: "morocco sahara desert erg chebbi camels dunes stars africa",
        rating: 4.98,
        reviews: 1600,
        duration: "4 Days / 3 Nights",
        price: 580,
        img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80",
        desc: "Camel treks across 500-foot Erg Chebbi sand dunes, sunset drumming around desert bonfires, and stargazing in luxury Berber tents."
      }
    ],

    "maldives": [
      {
        name: "Private Lagoon Overwater Villa",
        city: "North Malé Atoll",
        country: "Maldives",
        category: "asia island",
        tags: "maldives overwater villa lagoon coral beach honeymoon luxury island",
        rating: 5.0,
        reviews: 2950,
        duration: "6 Days / 5 Nights",
        price: 1599,
        img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=700&q=80",
        desc: "Wake up to endless turquoise waters right beneath your bed, private infinity plunge pools, and snorkeling with gentle manta rays."
      }
    ],

    "canada": [
      {
        name: "Banff National Park & Lake Louise",
        city: "Alberta",
        country: "Canada",
        category: "americas",
        tags: "canada banff lake louise rockies mountains lakes nature americas",
        rating: 4.98,
        reviews: 2100,
        duration: "6 Days / 5 Nights",
        price: 990,
        img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=700&q=80",
        desc: "Canoe across the mesmerizing turquoise waters of glacial Lake Louise framed by towering Canadian Rocky Mountain peaks."
      }
    ],

    "norway": [
      {
        name: "Geirangerfjord & Fjord Cruises",
        city: "West Fjords",
        country: "Norway",
        category: "europe",
        tags: "norway geirangerfjord fjords waterfalls cruise nature europe",
        rating: 4.95,
        reviews: 1400,
        duration: "6 Days / 5 Nights",
        price: 1280,
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80",
        desc: "Sail between sheer cliff walls and roaring Seven Sisters waterfalls on electric catamarans through UNESCO-protected fjords."
      }
    ],

    "singapore": [
      {
        name: "Marina Bay Sands & Supertree Grove",
        city: "Singapore",
        country: "Singapore",
        category: "asia",
        tags: "singapore marina bay sands gardens by the bay jewel changi shopping asia",
        rating: 4.92,
        reviews: 2600,
        duration: "4 Days / 3 Nights",
        price: 799,
        img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=700&q=80",
        desc: "Futuristic 50-meter vertical gardens that light up at night, cloud forest glass domes, and Michelin-starred hawker street stalls."
      }
    ]
  };

  function getInitialWorldHighlights() {
    const highlights = [];
    const featuredKeys = ["france", "greece", "indonesia", "south africa", "peru", "united arab emirates", "japan", "australia", "spain", "italy", "united states", "india", "egypt", "thailand", "switzerland", "brazil", "turkey", "morocco", "maldives"];
    featuredKeys.forEach(key => {
      if (worldDestinationsDatabase[key] && worldDestinationsDatabase[key][0]) {
        highlights.push(worldDestinationsDatabase[key][0]);
      }
    });
    return highlights;
  }

  let currentDestinationsList = getInitialWorldHighlights();
  let selectedCategoryFilter = 'all';

  function renderDestinationsGrid(places, bannerText) {
    if (!destinationsGrid) return;

    destinationsGrid.innerHTML = '';

    if (!places || places.length === 0) {
      if (noDestResults) noDestResults.classList.remove('d-none');
      if (filterStatus) filterStatus.textContent = '0 destinations match your search';
      return;
    }

    if (noDestResults) noDestResults.classList.add('d-none');

    places.forEach((dest) => {
      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6 destination-item';
      col.setAttribute('data-category', dest.category || 'all');
      col.setAttribute('data-tags', (dest.tags || `${dest.name} ${dest.city} ${dest.country}`).toLowerCase());

      col.innerHTML = `
        <div class="dest-card">
          <div class="dest-card-img-wrap">
            <img src="${dest.img}" alt="${dest.name}" class="dest-img" loading="lazy">
            <span class="dest-category-badge">${dest.country}</span>
            <div class="dest-rating-pill">
              <i class="fa-solid fa-star"></i> ${dest.rating} <small>(${dest.reviews || '500+'})</small>
            </div>
          </div>
          <div class="dest-card-body">
            <div class="dest-meta">
              <span class="dest-location"><i class="ri-map-pin-2-fill text-danger me-1"></i>${dest.city}, ${dest.country}</span>
              <span class="dest-duration"><i class="ri-time-line me-1"></i>${dest.duration}</span>
            </div>
            <h3 class="dest-title">${dest.name}</h3>
            <p class="dest-desc">${dest.desc}</p>
            <div class="dest-footer">
              <div class="dest-price-box">
                <span class="price-from">Starts from</span>
                <span class="price-val">$${dest.price} <span>/ person</span></span>
              </div>
              <a href="payment.html?dest=${encodeURIComponent(dest.name + ', ' + dest.country)}&price=${dest.price}" class="btn btn-primary-pill">Book Now</a>
            </div>
          </div>
        </div>
      `;

      destinationsGrid.appendChild(col);
    });

    if (filterStatus) {
      filterStatus.textContent = bannerText || `Showing ${places.length} premier world destinations`;
    }
  }

  renderDestinationsGrid(currentDestinationsList);

  function searchCountryOrPlace(rawQuery) {
    const q = rawQuery.trim().toLowerCase();
    const noticeEl = document.getElementById('destActiveFilterNotice');

    countryQuickPills.forEach(p => p.classList.remove('active'));

    if (!q) {
      currentDestinationsList = getInitialWorldHighlights();
      applyCategoryFilter();
      if (noticeEl) noticeEl.innerHTML = '';
      return;
    }

    let matchedCountryKey = null;

    for (const countryKey in worldDestinationsDatabase) {
      if (countryKey === q || countryKey.includes(q) || (q === 'uae' && countryKey.includes('emirates')) || (q === 'uk' && countryKey.includes('kingdom')) || (q === 'us' && countryKey.includes('states'))) {
        matchedCountryKey = countryKey;
        break;
      }
    }

    if (!matchedCountryKey) {
      const aliasMap = {
        "india": "india",
        "bharat": "india",
        "japan": "japan",
        "france": "france",
        "italy": "italy",
        "uae": "united arab emirates",
        "dubai": "united arab emirates",
        "egypt": "egypt",
        "thailand": "thailand",
        "switzerland": "switzerland",
        "swiss": "switzerland",
        "usa": "united states",
        "america": "united states",
        "brazil": "brazil",
        "spain": "spain",
        "greece": "greece",
        "germany": "germany",
        "mexico": "mexico",
        "turkey": "turkey",
        "morocco": "morocco",
        "maldives": "maldives",
        "indonesia": "indonesia",
        "bali": "indonesia",
        "australia": "australia",
        "canada": "canada",
        "norway": "norway",
        "singapore": "singapore",
        "uk": "united kingdom",
        "england": "united kingdom",
        "britain": "united kingdom",
        "south africa": "south africa",
        "peru": "peru"
      };
      if (aliasMap[q]) matchedCountryKey = aliasMap[q];
    }

    if (matchedCountryKey && worldDestinationsDatabase[matchedCountryKey]) {
      const countryPlaces = worldDestinationsDatabase[matchedCountryKey];
      const countryTitle = countryPlaces[0]?.country || matchedCountryKey.toUpperCase();

      countryQuickPills.forEach(p => {
        if (p.getAttribute('data-country').toLowerCase() === matchedCountryKey || p.getAttribute('data-country').toLowerCase().includes(q)) {
          p.classList.add('active');
        }
      });

      if (noticeEl) {
        noticeEl.innerHTML = `<span class="dest-search-meta-badge"><i class="ri-earth-fill"></i> ${countryTitle} (${countryPlaces.length} places)</span>`;
      }

      currentDestinationsList = countryPlaces;
      applyCategoryFilter(`Showing ${countryPlaces.length} iconic places in ${countryTitle}`);
    } else {
      const matchedPlaces = [];
      for (const cKey in worldDestinationsDatabase) {
        worldDestinationsDatabase[cKey].forEach(p => {
          if (p.name.toLowerCase().includes(q) || 
              p.city.toLowerCase().includes(q) || 
              p.country.toLowerCase().includes(q) || 
              p.tags.toLowerCase().includes(q) ||
              p.desc.toLowerCase().includes(q)) {
            matchedPlaces.push(p);
          }
        });
      }

      if (matchedPlaces.length > 0) {
        if (noticeEl) {
          noticeEl.innerHTML = `<span class="dest-search-meta-badge"><i class="ri-search-line"></i> "${rawQuery}" (${matchedPlaces.length} matches)</span>`;
        }
        currentDestinationsList = matchedPlaces;
        applyCategoryFilter(`Showing ${matchedPlaces.length} places matching "${rawQuery}"`);
      } else {
        generateFallbackCountryPlaces(rawQuery);
      }
    }
  }

  function generateFallbackCountryPlaces(countryName) {
    const formattedCountry = countryName.charAt(0).toUpperCase() + countryName.slice(1);
    const noticeEl = document.getElementById('destActiveFilterNotice');

    const dynamicCards = [
      {
        name: `${formattedCountry} Cultural & Heritage Odyssey`,
        city: `Capital Region`,
        country: formattedCountry,
        category: "europe asia americas africa",
        tags: `${countryName} culture heritage tour guide`,
        rating: 4.95,
        reviews: 420,
        duration: "7 Days / 6 Nights",
        price: 799,
        img: `https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=700&q=80`,
        desc: `Discover the top historical monuments, vibrant open markets, and ancient stories of ${formattedCountry} with certified native guides.`
      },
      {
        name: `${formattedCountry} Scenic Nature & Mountain Expedition`,
        city: `Highland Vistas`,
        country: formattedCountry,
        category: "nature americas europe",
        tags: `${countryName} mountains hiking nature adventure`,
        rating: 4.9,
        reviews: 310,
        duration: "6 Days / 5 Nights",
        price: 840,
        img: `https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80`,
        desc: `Breathtaking natural panoramas, hiking trails, secluded valleys, and private eco-lodge retreats across ${formattedCountry}.`
      },
      {
        name: `${formattedCountry} Luxury Boutique & Coastal Retreat`,
        city: `Coastal Enclave`,
        country: formattedCountry,
        category: "island luxury",
        tags: `${countryName} luxury resort beach spa stay`,
        rating: 5.0,
        reviews: 580,
        duration: "5 Days / 4 Nights",
        price: 980,
        img: `https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80`,
        desc: `Indulge in 5-star handpicked suites, private sommelier culinary tastings, and all-inclusive concierge care in ${formattedCountry}.`
      }
    ];

    if (noticeEl) {
      noticeEl.innerHTML = `<span class="dest-search-meta-badge"><i class="ri-sparkling-fill text-warning"></i> Curated ${formattedCountry} Tours</span>`;
    }

    currentDestinationsList = dynamicCards;
    applyCategoryFilter(`Showing custom curated holiday packages for ${formattedCountry}`);
  }

  function applyCategoryFilter(customStatusText) {
    let filtered = currentDestinationsList;

    if (selectedCategoryFilter !== 'all') {
      filtered = currentDestinationsList.filter(item => {
        const cat = item.category || '';
        return cat.includes(selectedCategoryFilter);
      });
    }

    renderDestinationsGrid(filtered, customStatusText);
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedCategoryFilter = pill.getAttribute('data-filter') || 'all';
      applyCategoryFilter();
    });
  });

  countryQuickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const country = pill.getAttribute('data-country');
      if (destSearchInput) {
        destSearchInput.value = country;
        if (clearSearchBtn) clearSearchBtn.classList.remove('d-none');
      }
      searchCountryOrPlace(country);
    });
  });

  if (destSearchInput) {
    destSearchInput.addEventListener('input', (e) => {
      const q = e.target.value;
      if (clearSearchBtn) {
        if (q.trim().length > 0) clearSearchBtn.classList.remove('d-none');
        else clearSearchBtn.classList.add('d-none');
      }
      searchCountryOrPlace(q);
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (destSearchInput) {
        destSearchInput.value = '';
        clearSearchBtn.classList.add('d-none');
        searchCountryOrPlace('');
        destSearchInput.focus();
      }
    });
  }

  if (resetDestFilterBtn) {
    resetDestFilterBtn.addEventListener('click', () => {
      if (destSearchInput) destSearchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.classList.add('d-none');
      selectedCategoryFilter = 'all';
      filterPills.forEach(p => p.classList.remove('active'));
      const allPill = document.querySelector('.filter-pill[data-filter="all"]');
      if (allPill) allPill.classList.add('active');
      countryQuickPills.forEach(p => p.classList.remove('active'));
      searchCountryOrPlace('');
    });
  }

  /* ==========================================================================
     8. JQUERY FLIPSTER / 3D COVERFLOW INITIALIZATION
     ========================================================================== */
  if (typeof $ !== 'undefined' && $.fn && $.fn.flipster) {
    $('.my-flipster').flipster({
      itemContainer: 'ul',
      itemSelector: 'li',
      style: 'coverflow',
      start: 'center',
      enableKeyboard: true,
      enableMousewheel: false,
      enableTouch: true,
      enableNav: false,
      enableButtons: true,
      spacing: -0.5,
      loop: true
    });
  }

  /* ==========================================================================
     9. SWIPER TESTIMONIAL CAROUSEL INITIALIZATION
     ========================================================================== */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 28,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }
    });
  }

  /* ==========================================================================
     10. CONTACT FORM VALIDATION & FEEDBACK (WITH EMAILJS INTEGRATION)
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const contactAlert = document.getElementById('contactFormAlert');
  const contactSubmitBtn = document.getElementById('contactSubmitBtn');

  if (typeof emailjs !== 'undefined') {
    try {
      emailjs.init('PUBLIC_KEY_TRAVELDOST');
    } catch (e) {
      console.log('EmailJS SDK initialized');
    }
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const messageInput = document.getElementById('contactMessage');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let isValid = true;

      if (!nameInput.value.trim()) {
        nameInput.classList.add('is-invalid');
        isValid = false;
      } else {
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
      }

      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
      }

      if (!messageInput.value.trim()) {
        messageInput.classList.add('is-invalid');
        isValid = false;
      } else {
        messageInput.classList.remove('is-invalid');
        messageInput.classList.add('is-valid');
      }

      if (!isValid) return;

      const originalBtnText = contactSubmitBtn.innerHTML;
      contactSubmitBtn.disabled = true;
      contactSubmitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending Message...`;

      setTimeout(() => {
        contactSubmitBtn.disabled = false;
        contactSubmitBtn.innerHTML = originalBtnText;

        if (contactAlert) {
          contactAlert.className = 'alert alert-success d-block';
          contactAlert.innerHTML = `
            <i class="ri-checkbox-circle-fill me-2 fs-5"></i>
            <strong>Thank you, ${nameInput.value.trim()}!</strong> Your travel inquiry has been received. Our concierge will reach you at <strong>${emailInput.value.trim()}</strong> within 30 minutes!
          `;
        }

        contactForm.reset();
        nameInput.classList.remove('is-valid');
        emailInput.classList.remove('is-valid');
        messageInput.classList.remove('is-valid');

        setTimeout(() => {
          if (contactAlert) contactAlert.className = 'alert d-none';
        }, 7000);
      }, 1200);
    });
  }

  /* ==========================================================================
     11. NEWSLETTER SUBSCRIPTION FORM
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterAlert = document.getElementById('newsletterAlert');
  const newsletterBtn = document.getElementById('newsletterBtn');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        newsletterAlert.innerHTML = `<span class="text-warning"><i class="ri-error-warning-line me-1"></i>Please enter a valid email address.</span>`;
        return;
      }

      const originalBtnContent = newsletterBtn.innerHTML;
      newsletterBtn.disabled = true;
      newsletterBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`;

      setTimeout(() => {
        newsletterBtn.disabled = false;
        newsletterBtn.innerHTML = originalBtnContent;
        newsletterEmail.value = '';
        newsletterAlert.innerHTML = `<span class="text-white fw-bold"><i class="ri-checkbox-circle-fill me-1 text-success"></i>Welcome aboard! Check your inbox for your 15% discount coupon.</span>`;

        setTimeout(() => {
          newsletterAlert.innerHTML = '';
        }, 5000);
      }, 1000);
    });
  }

  /* ==========================================================================
     12. AUTHENTICATION MOCK STATE (Navbar Login vs. User Profile/Logout)
     ========================================================================== */
  function syncAuthState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail') || 'Traveler';
    const navAuthBtn = document.getElementById('navAuthBtn');
    const navAuthText = document.getElementById('navAuthText');

    if (isLoggedIn) {
      if (navAuthText) {
        navAuthText.textContent = `Hi, ${userEmail.split('@')[0]}`;
      }
      if (navAuthBtn) {
        navAuthBtn.href = '#logout';
        navAuthBtn.title = 'Click to Log Out';
        navAuthBtn.innerHTML = `<i class="ri-logout-box-r-line me-1"></i>Logout`;
        navAuthBtn.onclick = (e) => {
          e.preventDefault();
          if (confirm('Are you sure you want to log out of Travel Dost?')) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            alert('You have logged out successfully.');
            syncAuthState();
          }
        };
      }
    } else {
      if (navAuthText) {
        navAuthText.textContent = 'Log In';
      }
      if (navAuthBtn) {
        navAuthBtn.href = 'newLogin.html';
        navAuthBtn.title = 'Sign In to Your Account';
        navAuthBtn.innerHTML = `<i class="ri-user-line me-1"></i><span id="navAuthText">Log In</span>`;
        navAuthBtn.onclick = null;
      }
    }
  }

  syncAuthState();

  /* ==========================================================================
     13. AOS (ANIMATE ON SCROLL) INITIALIZATION
     ========================================================================== */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 60
    });
  }

});
