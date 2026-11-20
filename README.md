# Travel Dost – Interactive Multi‑Page Travel Experience  

Travel Dost is a **production‑ready, static website** that lets visitors discover, plan, and book trips worldwide. Built with plain HTML5, CSS3 (custom properties & dark/light themes), and vanilla JavaScript, the site uses only CDN‑hosted libraries—no build tools or server‑side code required.  

## Key Features 

| Feature | What it does |
|--------|--------------|
| **Design System** | CSS variables define a full light and dark palette (`--primary-color`, `--head-text`, etc.) and typography (`Poppins`, `Noto Serif`, `Oxygen`, `Afacad Flux`). Smooth scrolling, a progress bar, a pre‑loader, and a floating “Back‑to‑Top” button are included. |
| **Responsive Navigation** | Sticky header with brand logo, mobile hamburger drawer, dark/light toggle, and a quick “View Map” button. |
| **Hero Section** | Background travel images, Typed.js headline rotating “Wonders | Gems | Secrets”, and three CTA buttons (Membership, Plan a Trip, Book Now). |
| **About Us** | Four tabbed panels (Why Tour Guide, Our Heritage, Eco Tourism, Guarantees) plus animated counters for Guides (25k+), Tours (20k+), Destinations (10,994+), and Voyagers (150k+). |
| **Universal Map & Mall Explorer** | Full‑width Leaflet map (`homeWorldMap`) with a searchable database of world‑famous malls, wonders, beaches, nature spots, and luxury resorts. Users can type any place (e.g., “Dubai Mall”, “Eiffel Tower”), filter by category pills, toggle street/satellite layers, and reset the global view. A hotspot carousel below the map provides one‑click fly‑to actions. |
| **Popular Destinations** | Live text search and a row of 22 country‑quick‑pill buttons. Selecting a pill or typing a country name instantly displays **all curated destinations for that country** (e.g., India, Japan, Egypt). If a user types an unlisted country, the script generates a fallback set of cards, ensuring no country is empty. |
| **Packages & Trip Builder** | Filterable package catalog with modal details, an itinerary builder form, and a mock checkout page supporting Credit Card, Net Banking, and UPI. |
| **Testimonials & FAQ** | Swiper.js carousel of traveler quotes and an accordion covering booking, cancellations, visas, insurance, and payment security. |
| **Contact & Newsletter** | EmailJS‑powered contact form, direct inquiry cards, and an animated subscription bar. |
| **Footer** | Four‑column layout with brand story, quick links, legal pages, and dynamic year. |
| **404 Page** | Custom illustration with “Back to Home” button. |

## Tech Stack  

* **HTML5** – semantic markup, ARIA attributes.  
* **CSS3** – custom properties, Flexbox/Grid, media queries.  
* **JavaScript** – modular (`Theme.js`, `navbarToggle.js`, `index.js`).  
* **CDN Libraries** – Bootstrap 5, Font Awesome 6, Remix Icon, AOS, Typed.js, Swiper, jQuery Flipster, Leaflet, EmailJS.  

## Getting Started  

```bash
git clone https://github.com/your‑username/travel-dost.git
cd travel-dost
# Open index.html in a browser – no build step required
```

Deploy the folder to any static host (GitHub Pages, Netlify, Vercel) and the site works out of the box.

## Contributing  

Feel free to add new destinations, improve UI/UX, or integrate a real backend for bookings. Submit a pull request; the project is MIT‑licensed.  

---  

Travel Dost demonstrates how a modern, theme‑aware travel portal can be built with **only static assets** while delivering rich interactivity and a global map experience. 🚀
