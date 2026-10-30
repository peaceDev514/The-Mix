import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./FullMenu.css";

// KEEP YOUR LOCAL FOOD IMAGES
const localImages = import.meta.glob("./assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const imageFiles = Object.keys(localImages).reduce((result, path) => {
  const filename = path.split("/").pop().toLowerCase();
  const extension = filename.split(".").pop();
  if (["jpg", "jpeg", "png", "webp", "avif"].includes(extension)) {
    result[filename] = localImages[path];
  }
  return result;
}, {});

const CART_STORAGE_KEY = "theMixCart";
const WHATSAPP_NUMBER = "2349011445400";

// ALL NEW DRINKS FETCH ONLINE - WORKING LINKS
const onlineDrinkImages = {
  "trophy.jpg": "trophy-1.jpg",
  "gulder.jpg": "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400",
  "budweiser.jpg": "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400",
  "legend-big.jpg": "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400",
  "goldberg.jpg": "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400",
  "tiger-beer.jpg": "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400",
  "desperado.jpg": "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400",
  "star-radler.jpg": "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400",
  "origin-beer.jpg": "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400",
  "33-beer.jpg": "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400",
  "smirnoff-ice.jpg": "https://images.pexels.com/photos/6818473/pexels-photo-6818473.jpeg?auto=compress&cs=tinysrgb&w=400",
  "can-desperado.jpg": "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400",
  "heineken-big.jpg": "heineken.jpg",
  "stout-medium.jpg": "https://images.pexels.com/photos/6818473/pexels-photo-6818473.jpeg?auto=compress&cs=tinysrgb&w=400",
  "heineken-can.jpg": "heineken.jpg",
  "goldberg-can.jpg": "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400",
  "smirnoff-can.jpg": "./assets/smirnoff-can.jpg",
  "desperado-can.jpg": "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400",
  "origin-can.jpg": "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400",
  "can-beer.jpg": "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400",
  "monster.jpg": "https://images.pexels.com/photos/11958257/pexels-photo-11958257.jpeg?auto=compress&cs=tinysrgb&w=400",
  "power-horse.jpg": "https://images.pexels.com/photos/11958257/pexels-photo-11958257.jpeg?auto=compress&cs=tinysrgb&w=400",
  "red-bull.jpg": "https://images.pexels.com/photos/11958257/pexels-photo-11958257.jpeg?auto=compress&cs=tinysrgb&w=400",
  "predator.jpg": "https://images.pexels.com/photos/11958257/pexels-photo-11958257.jpeg?auto=compress&cs=tinysrgb&w=400",
  "fearless.jpg": "https://images.pexels.com/photos/11958257/pexels-photo-11958257.jpeg?auto=compress&cs=tinysrgb&w=400",
  "black-bullet.jpg": "https://images.pexels.com/photos/11958257/pexels-photo-11958257.jpeg?auto=compress&cs=tinysrgb&w=400",
  "blue-bullet.jpg": "./assets/blue-bullet.jpg",
  "climax.jpg": "https://images.pexels.com/photos/11958257/pexels-photo-11958257.jpeg?auto=compress&cs=tinysrgb&w=400",
  "active.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "5alive-pulpy.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "5alive-berry-blast.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "maltina.jpg": "malt.jpg",
  "fayrouz.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "hollandia.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "pure-heaven.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "water.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "pet-coke.jpg": "coke.jpg",
  "pet-fanta.jpg": "fanta.jpg",
  "vita-milk.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "can-malt.jpg": "malt.jpg",
  "coke.jpg": "https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg?auto=compress&cs=tinysrgb&w=400",
  "fanta.jpg": "https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg?auto=compress&cs=tinysrgb&w=400",
  "sprite.jpg": "https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg?auto=compress&cs=tinysrgb&w=400",
  "pulpy.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "berry-blast.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "exotic.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "smoove.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "zobo.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "nutri-milk.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "viju-milk.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "viju-chocolate.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "viju-wheat.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "4th-street.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "baron.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "cranberry-wine.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "four-cousins.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "origin-wine.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "origin-wine-medium.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "8pm.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "lacoco.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "lacoco-purple.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "ice-rose.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "joven.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "argon.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "jack-daniels.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "jack-williams.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "williams-lawson.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "red-label.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "black-label.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "jameson-green.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "jameson-black.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "glenfiddich-15.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "imperial-blue.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "best-whisky.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "best-whisky-small.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "best-whisky-mini.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "smirnoff-x1.jpg": "smirnoff-ice.jpg",
  "smirnoff-x1-medium.jpg": "smirnoff-ice.jpg",
  "smirnoff-x1-small.jpg": "smirnoff-ice.jpg",
  "ciroc.jpg": "ciroc.jpg",
  "magic-moment.jpg": "magic-moment.jpg",
  "gordons-medium.jpg": "gordon.jpg",
  "gordons-big.jpg": "gordon.jpg",
  "gordons-small.jpg": "gordon.jpg",
  "skirt-gin.jpg": "https://images.pexels.com/photos/6818473/pexels-photo-6818473.jpeg?auto=compress&cs=tinysrgb&w=400",
  "lords-gin.jpg": "lord-gin.jpg",
  "lords-gin-medium.jpg": "lord-gin.jpg",
  "lords-gin-small.jpg": "lord-gin.jpg",
  "imperial-small.jpg": "https://images.pexels.com/photos/6818473/pexels-photo-6818473.jpeg?auto=compress&cs=tinysrgb&w=400",
  "moet.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "martini-rose.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "andre-rose.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "belaire.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "ace-of-spades.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "hennessy-xo.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "hennessy-vsop.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "hennessy-vs.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "hennessy-mini.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "martell-vsop.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "martell-vs.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "dusse-vsop.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "clase-azul.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "don-julio.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "azul-plata.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "casamigos.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "olmeca.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "sierra.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "bacardi.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "best-cream.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "baileys-original.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "baileys-delight.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "elliot-cream.jpg": "https://images.pexels.com/photos/14733471/pexels-photo-14733471.jpeg?auto=compress&cs=tinysrgb&w=400",
  "action-bitters.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "kolaq-alomo.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "fekomi.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "origin-pet.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "xman-small.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "xman-big.jpg": "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=400",
  "red-juice.jpg": "https://images.pexels.com/photos/6163275/pexels-photo-6163275.jpeg?auto=compress&cs=tinysrgb&w=400",
  "shisha.jpg": "shisha.jpg",
  "shisha-premium.jpg": "shisha.jpg",
};

const getLocalImage = (filename) => {
  if (!filename) return "";
  const lower = filename.toLowerCase().trim();

  // 1. Direct local file
  if (imageFiles[lower]) return imageFiles[lower];

  // 2. Online link or alias
  if (onlineDrinkImages[lower]) {
    const value = onlineDrinkImages[lower];
    // if value is http -> return http link
    if (value.startsWith("http")) return value;
    // if value is another filename like "smirnoff-ice.jpg" -> get that file
    const aliasLower = value.toLowerCase().trim();
    if (imageFiles[aliasLower]) return imageFiles[aliasLower];
    if (onlineDrinkImages[aliasLower] && onlineDrinkImages[aliasLower].startsWith("http")) {
      return onlineDrinkImages[aliasLower];
    }
  }

  const drinkName = lower.replace('.jpg','').replace(/-/g,' ').toUpperCase();
  return `https://via.placeholder.com/400x600/111/fff.png?text=${encodeURIComponent(drinkName)}`;
};

const itemImages = {
  "restaurant-drinks": [
    "trophy-1.jpg", "gulder.jpg", "budweiser.jpg", "legend-big.jpg", "goldberg.jpg",
    "tiger-beer.jpg", "desperado.jpg", "star-radler.jpg", "origin-beer.jpg", "33-beer.jpg",
    "smirnoff-ice.jpg", "can-desperado.jpg", "heineken-big.jpg", "stout-medium.jpg",
    "heineken-can.jpg", "goldberg-can.jpg", "smirnoff-can.jpg", "desperado-can.jpg",
    "origin-can.jpg", "can-beer.jpg", "monster.jpg", "power-horse.jpg", "red-bull.jpg",
    "predator.jpg", "fearless.jpg", "black-bullet.jpg", "blue-bullet.jpg", "climax.jpg",
    "active.jpg", "5alive-pulpy.jpg", "5alive-berry-blast.jpg", "maltina.jpg",
    "fayrouz.jpg", "hollandia.jpg", "pure-heaven.jpg", "water.jpg", "coke.jpg",
    "./assets/fanta.jpg", "vita-milk.jpg", "can-malt.jpg", "coke.jpg", "fanta.jpg",
    "sprite.jpg", "pulpy.jpg", "berry-blast.jpg", "exotic.jpg", "smoove.jpg",
    "zobo.jpg", "nutri-milk.jpg", "viju-milk.jpg", "viju-chocolate.jpg", "viju-wheat.jpg",
    "4th-street.jpg", "baron.jpg", "cranberry-wine.jpg", "four-cousins.jpg",
    "origin-wine.jpg", "origin-wine-medium.jpg", "8pm.jpg", "lacoco.jpg",
    "lacoco-purple.jpg", "ice-rose.jpg", "joven.jpg", "argon.jpg", "jack-daniels.jpg",
    "jack-williams.jpg", "williams-lawson.jpg", "red-label.jpg", "black-label.jpg",
    "jameson-green.jpg", "jameson-black.jpg", "glenfiddich-15.jpg", "imperial-blue.jpg",
    "best-whisky.jpg", "best-whisky-small.jpg", "best-whisky-mini.jpg", "smirnoff-x1.jpg",
    "smirnoff-x1-medium.jpg", "smirnoff-x1-small.jpg", "ciroc.jpg", "magic-moment.jpg",
    "gordons-medium.jpg", "./assets/gordon.jpg", "gordons-small.jpg", "skirt-gin.jpg",
    "lords-gin.jpg", "lords-gin-medium.jpg", "lords-gin-small.jpg", "imperial-small.jpg",
    "moet.jpg", "martini-rose.jpg", "andre-rose.jpg", "belaire.jpg", "ace-of-spades.jpg",
    "hennessy-xo.jpg", "hennessy-vsop.jpg", "hennessy-vs.jpg", "hennessy-mini.jpg",
    "martell-vsop.jpg", "martell-vs.jpg", "dusse-vsop.jpg", "clase-azul.jpg",
    "don-julio.jpg", "azul-plata.jpg", "casamigos.jpg", "olmeca.jpg", "sierra.jpg",
    "bacardi.jpg", "best-cream.jpg", "baileys-original.jpg", "baileys-delight.jpg",
    "elliot-cream.jpg", "action-bitters.jpg", "kolaq-alomo.jpg", "fekomi.jpg",
    "origin-pet.jpg", "xman-small.jpg", "xman-big.jpg", "red-juice.jpg",
    "shisha.jpg", "shisha-premium.jpg",
  ],
  food: [
    "jollof-rice.jpg", "fried-rice.jpg", "rice-and-beans.jpg",
    "ewa.jpg", "white-rice.jpg", "coconut-rice.jpg",
    "native-rice.jpg", "suya-rice.jpg", "jollof-pasta.jpg",
    "stir-fry-pasta.jpg", "plantain-egg-sauce.jpg",
    "yamarita.jpg", "noodles-egg-sauce.jpg", "plantain.jpg",
    "beef.jpg", "fish.jpg", "chicken.jpg", "chicken.jpg",
    "chicken.jpg", "turkey.jpg", "turkey.jpg", "turkey.jpg",
    "turkey.jpg", "ponmo.jpg", "moinmoin.jpg", "salad.jpg",
    "gizzard.jpg", "asun.jpg", "asun.jpg",
    "barbecue.jpg", "grilled-chicken.jpg",
  ],
  "pepper-soup": [
    "catfish-pepper-soup.jpg", "beef-pepper-soup.jpg",
    "chicken-pepper-soup.jpg", "turkey-pepper-soup.jpg",
    "goat-meat-pepper-soup.jpg",
  ],
  swallow: [
    "swallow.jpg", "egusi-soup.jpg", "swallow-m.jpg",
    "swallow-fish.jpg", "swallow-m.jpg",
    "swallow-m.jpg", "egusi-soup.jpg",
    "okra-soup.jpg",
  ],
  shawarma: [
    "shawarma.jpg", "shawarma.jpg",
    "shawarma.jpg", "shawarma.jpg",
    "shawarma.jpg", "shawarma.jpg",
  ],
  bread: [
    "butter-bread.jpg", "butter-bread.jpg", "fruit-bread.jpg",
    "chocolate-bread.jpg", "chocolate-bread.jpg",
    "sardine-bread.jpg", "sardine-bread.jpg", "banana-bread.jpg",
    "coconut-bread.jpg", "coconut-bread.jpg", "burger.jpg",
  ],
  snacks: [
    "egg-roll.jpg", "doughnut.jpg", "jam-doughnut.jpg",
    "milky-doughnut.jpg", "frank-roll.jpg", "frank-roll.jpg",
    "meat-pie.jpg", "chicken-pie.jpg", "burger.jpg",
    "croissant.jpg", "cookies.jpg", "cookies.jpg", "honey-roll.jpg",
    "pancake.jpg", "chinchin.jpg", "popcorn.jpg",
  ],
  cake: [
    "fruit-cake.jpg", "banana-cake.jpg", "coconut-bread.jpg",
    "foil-cake.jpg", "red-velvet-cake.jpg", "chocolate-cake.jpg",
    "celebration-cake.jpg",
  ],
  "ice-cream": [
    "sachet-ice-cream.jpg", "ice-cream.jpg", "ice-cream.jpg",
    "ice-cream.jpg", "ice-cream.jpg", "go-slo.jpg",
    "vanilla-fantasy.jpg", "chocolate-fantasy.jpg",
    "frosty-bite.jpg", "frosty-bite.jpg",
  ],
  pizza: [
    "pizza.jpg", "pizza.jpg", "pizza.jpg",
  ],
};

const menuCategories = [
  {
    id: "restaurant-drinks",
    title: "Lounge Drinks",
    subtitle: "Refreshing drinks & beverages",
    emoji: "🥤",
    items: [
      ["Trophy", "₦1,500"], ["Gulder", "₦2,000"], ["Budweiser", "₦1,700"],
      ["Legend Big", "₦2,000"], ["Goldberg", "₦1,500"], ["Tiger", "₦1,500"],
      ["Desperado", "₦2,000"], ["Star Radler", "₦1,300"], ["Origin Beer", "₦1,500"],
      ["33 Beer", "₦1,800"], ["Smirnoff Ice", "₦2,000"], ["Can Desperado", "₦1,700"],
      ["Heineken Big", "₦2,000"], ["Stout Medium", "₦2,000"], ["Heineken Can", "₦2,000"],
      ["Goldberg Can", "₦1,500"], ["Smirnoff Can", "₦2,000"], ["Desperado Can", "₦2,000"],
      ["Origin Can", "₦1,800"], ["Can Beer", "₦2,000"], ["Monster", "₦2,000"],
      ["Power Horse", "₦2,000"], ["Red Bull", "₦3,000"], ["Predator", "₦1,000"],
      ["Fearless", "₦1,000"], ["Black Bullet", "₦2,500"], ["Blue Bullet", "₦2,500"],
      ["Climax", "₦1,500"], ["Active", "₦3,000"], ["5 Alive Pulpy", "₦3,000"],
      ["5 Alive Berry Blast", "₦3,000"], ["Maltina", "₦1,000"], ["Fayrouz", "₦1,200"],
      ["Hollandia", "₦3,000"], ["Pure Heaven", "₦3,000"], ["Water", "₦500"],
      ["Pet Coke", "₦1,000"], ["Pet Fanta", "₦1,000"], ["Vita Milk", "₦3,000"],
      ["Can Malt", "₦1,000"], ["Coke", "₦600"], ["Fanta", "₦600"], ["Sprite", "₦600"],
      ["Pulpy", "₦2,000"], ["Berry Blast", "₦2,000"], ["Exotic", "₦2,500"],
      ["Smoove", "₦600"], ["Zobo", "₦500"], ["Nutri Milk", "₦800"], ["Viju Milk", "₦800"],
      ["Viju Chocolate", "₦1,500"], ["Viju Wheat", "₦1,500"], ["4th Street", "₦10,000"],
      ["Baron", "₦10,000"], ["Cranberry", "₦10,000"], ["Four Cousins", "₦15,000"],
      ["Origin Wine", "₦8,000"], ["Medium Origin Wine", "₦5,000"], ["8 PM", "₦15,000"],
      ["Lacoco", "₦1,000"], ["Purple Lacoco", "₦1,000"], ["Ice Rose", "₦20,000"],
      ["Joven", "₦20,000"], ["Argon", "₦15,000"], ["Jack Daniel's", "₦45,000"],
      ["Jack Williams", "₦15,000"], ["Williams Lawson", "₦25,000"], ["Red Label", "₦35,000"],
      ["Black Label", "₦80,000"], ["Green Jameson", "₦40,000"], ["Black Jameson", "₦60,000"],
      ["Glenfiddich 15", "₦20,000"], ["Imperial Blue", "₦15,000"], ["Best Whisky", "₦15,000"],
      ["Best Whisky Small", "₦5,000"], ["Mini Best Whiskey", "₦1,000"], ["Smirnoff X1", "₦12,000"],
      ["Medium Smirnoff X1", "₦4,000"], ["Small Smirnoff X1", "₦3,000"], ["Cîroc", "₦60,000"],
      ["Magic Moment", "₦15,000"], ["Gordon's Medium", "₦4,500"], ["Gordon's Big", "₦9,000"],
      ["Gordon's Small", "₦3,000"], ["Skirt", "₦10,000"], ["Lord Gin", "₦6,500"],
      ["Medium Lord", "₦3,500"], ["Small Lord", "₦2,000"], ["Small Imperial", "₦2,500"],
      ["Moët", "₦180,000"], ["Martini Rosé", "₦30,000"], ["Andre Rosé", "₦30,000"],
      ["Belaire", "₦100,000"], ["Ace of Spades", "₦800,000"], ["Hennessy XO", "₦600,000"],
      ["Hennessy VSOP", "₦160,000"], ["Hennessy VS", "₦90,000"], ["Mini Hennessy", "₦60,000"],
      ["Martell VSOP", "₦120,000"], ["Martell VS", "₦80,000"], ["D'Ussé VSOP", "₦150,000"],
      ["Clase Azul", "₦700,000"], ["Don Julio", "₦700,000"], ["Azul Plata", "₦300,000"],
      ["Casamigos", "₦260,000"], ["Olmeca", "₦40,000"], ["Sierra", "₦25,000"],
      ["Bacardi", "₦30,000"], ["Best Cream", "₦15,000"], ["Bailey's Original", "₦30,000"],
      ["Bailey's Delight", "₦20,000"], ["Elliot", "₦20,000"], ["Action Bitters", "₦1,500"],
      ["Kolaq Alomo", "₦1,500"], ["Fekomi", "₦1,500"], ["Origin Pet", "₦2,000"],
      ["X-Man Small", "₦500"], ["X-Man Big", "₦1,000"], ["Red Juice", "₦2,000"],
      ["Shisha", "₦5,000"], ["Premium Shisha", "₦10,000"],
    ],
  },
  {
    id: "food",
    title: "Food Menu",
    subtitle: "Traditional favourites & everyday meals",
    emoji: "🍛",
    items: [
      ["Jollof Rice", "₦500"], ["Fried Rice", "₦500"], ["Rice & Beans", "₦400"],
      ["Ewa", "₦400"], ["White Rice", "₦400"], ["Coconut Rice", "₦700"],
      ["Native Rice", "₦700"], ["Suya Rice", "₦700"], ["Jollof Pasta", "₦700"],
      ["Stir Fry Pasta", "₦500"], ["Plantain with Egg Sauce", "₦2,800"],
      ["Yamarita with Egg Sauce", "₦2,800"], ["Noodles with Egg Sauce", "₦2,800"],
      ["Plantain", "₦400"], ["Beef", "₦700"], ["Fish", "₦1,200"], ["Chicken", "₦1,000"],
      ["Chicken", "₦2,000"], ["Chicken", "₦3,000"], ["Turkey", "₦3,500"],
      ["Turkey", "₦4,000"], ["Turkey", "₦4,500"], ["Turkey", "₦6,000"],
      ["Ponmo", "₦500"], ["Moinmoin", "₦500"], ["Salad", "₦700"], ["Gizzard", "₦1,500"],
      ["Asun", "₦700"], ["Pepper Meat", "₦3,500"], ["Barbecue", "₦7,000"],
      ["Grilled Chicken", "₦1,000 / ₦2,000 / ₦3,000"],
    ],
  },
  {
    id: "pepper-soup",
    title: "Pepper Soup",
    subtitle: "Rich, spicy & freshly prepared",
    emoji: "🌶️",
    items: [
      ["Catfish Pepper Soup", "₦7,000 / ₦10,000"],
      ["Beef Pepper Soup", "₦5,000 / ₦7,000"],
      ["Chicken Pepper Soup", "₦5,000 / ₦70,000"],
      ["Turkey Pepper Soup", "₦5,300 / ₦10,000"],
      ["Goat Meat Pepper Soup", "₦5,300 / ₦8,000"],
    ],
  },
  {
    id: "swallow",
    title: "Swallow Menu",
    subtitle: "Classic Nigerian swallow combinations",
    emoji: "🥣",
    items: [
      ["Swallow", "Semo / Pando / Eba / Amala"],
      ["Soup", "Egusi / Vegetable / Egusi & Okra"],
      ["A Plate of Swallow with Beef", "₦2,700"],
      ["A Plate of Swallow with Fish", "₦3,000"],
      ["A Plate of Swallow with Chicken", "₦4,000"],
      ["A Plate of Swallow with Turkey", "₦5,500 / ₦6,000"],
      ["1 Litre of Vegetable / Egusi Soup", "₦6,000"],
      ["1 Litre of Okro Soup", "₦10,000"],
    ],
  },
  {
    id: "shawarma",
    title: "Shawarma Menu",
    subtitle: "Freshly prepared & generously filled",
    emoji: "🌯",
    items: [
      ["Double Sausage", "₦3,000"], ["Single Sausage", "₦2,800"],
      ["No Sausage", "₦2,600"], ["Double Sausage with Extra Beef", "₦3,500"],
      ["No Sausage with Extra Beef", "₦3,100"], ["Shawarma with Grilled Chicken", "₦3,500"],
    ],
  },
  {
    id: "bread",
    title: "Bread Menu",
    subtitle: "Freshly baked favourites",
    emoji: "🍞",
    items: [
      ["Butter Bread", "₦1,000"], ["Butter Bread — Small Size", "₦600"],
      ["Fruit Bread", "₦1,200"], ["Chocolate Bread", "₦1,000"],
      ["Chocolate Bread", "₦1,500"], ["Sandine Bread", "₦1,000"],
      ["Sardine Bread", "₦1,500"], ["Banana Bread", "₦2,000"],
      ["Coconut Bread", "₦1,000"], ["Coconut Bread", "₦1,500"],
      ["Burger", "₦3,500 / ₦5,000"],
    ],
  },
  {
    id: "snacks",
    title: "Snacks Menu",
    subtitle: "Perfect for a quick bite",
    emoji: "🥐",
    items: [
      ["Egg Roll", "₦700"], ["Doughnut", "₦600"], ["Jam Doughnut", "₦700"],
      ["Milky Doughnut", "₦1,000"], ["Frank Roll", "₦700"], ["Sausage Roll", "₦700"],
      ["Meat Pie", "₦1,000"], ["Chicken Pie", "₦1,200"], ["Egg Burger", "₦1,000"],
      ["Croissant", "₦700"], ["Cookies", "₦1,500"], ["Cookies", "₦2,000"],
      ["Honey Roll", "₦700"], ["Pancake", "₦700"], ["Chinchin", "₦500"], ["Popcorn", "₦500"],
    ],
  },
  {
    id: "cake",
    title: "Cake Menu",
    subtitle: "Sweet treats for every occasion",
    emoji: "🍰",
    items: [
      ["Fruit Cake", "₦1,500"], ["Banana Cake", "₦1,500"], ["Coconut Cake", "₦1,500"],
      ["Foil Cake", "₦1,500"], ["Red Velvet Cake", "₦1,500"], ["Chocolate Cake", "₦1,500"],
      ["Celebration Cake", "₦10,000"],
    ],
  },
  {
    id: "ice-cream",
    title: "Ice Cream Menu",
    subtitle: "Cool, creamy & delicious",
    emoji: "🍦",
    items: [
      ["Sachet Ice Cream", "₦500"], ["120ml", "₦750"], ["250ml", "₦1,500"],
      ["450ml", "₦3,500"], ["900ml", "₦4,700"], ["Go Slo", "₦5,500"],
      ["Vanilla / Strawberry Fantasy", "₦1,800"], ["Chocolate Fantasy", "₦2,000"],
      ["Frosty Byte 150ml", "₦1,000"], ["Frosty Byte 250ml", "₦1,800"],
      ["Frosty Byte 550ml", "₦3,500"],
    ],
  },
  {
    id: "pizza",
    title: "Pizza Menu",
    subtitle: "Freshly baked & made to order",
    emoji: "🍕",
    items: [
      ["Small Pizza", "₦4,000"], ["Medium Pizza", "₦6,000"], ["Large Pizza", "₦10,000"],
    ],
  },
];

function getPrices(priceText) {
  if (!priceText) return [];
  const matches = priceText.match(/₦\s*[\d,]+/g);
  if (!matches) return [];
  return matches.map((value) => Number(value.replace(/[₦,\s]/g, "")));
}
function formatPrice(amount) { return `₦${amount.toLocaleString("en-NG")}`; }
function getItemImage(category, index) {
  const filenames = itemImages[category.id] || [];
  return getLocalImage(filenames[index]);
}
function FullMenu() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (!savedCart) return [];
      const parsedCart = JSON.parse(savedCart);
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch { return []; }
  });
  const [priceSelector, setPriceSelector] = useState(null);
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch {}
  }, [cart]);
  const addToCart = (name, price) => {
    const numericPrice = Number(price);
    if (!numericPrice || numericPrice <= 0) return;
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.name === name && item.price === numericPrice);
      if (existingItem) {
        return currentCart.map((item) => item.name === name && item.price === numericPrice ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...currentCart, { id: `${name}-${numericPrice}-${Date.now()}`, name, displayPrice: formatPrice(numericPrice), price: numericPrice, quantity: 1 }];
    });
  };
  const handlePriceSelection = (price) => {
    if (!priceSelector) return;
    addToCart(priceSelector.name, price);
    setPriceSelector(null);
  };
  const increaseQuantity = (id) => { setCart((currentCart) => currentCart.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)); };
  const decreaseQuantity = (id) => { setCart((currentCart) => currentCart.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0)); };
  const removeFromCart = (id) => { setCart((currentCart) => currentCart.filter((item) => item.id !== id)); };
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return menuCategories;
    return menuCategories.map((category) => ({ ...category, items: category.items.filter(([name, price]) => `${name} ${price}`.toLowerCase().includes(query)) })).filter((category) => category.items.length > 0);
  }, [search]);
  const orderViaWhatsApp = () => {
    if (cart.length === 0) return;
    const orderLines = cart.map((item) => `• ${item.name} x${item.quantity} — ${formatPrice(item.price * item.quantity)}`).join("\n");
    const message = `Hello The Mix, I would like to place an order.\n\n${orderLines}\n\nEstimated Total: ${formatPrice(cartTotal)}\n\nPlease confirm my order and final price.\n\nThank you.`.trim();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };
  return (
    <main className="full-menu-page">
      <section className="full-menu-hero">
        <div className="full-menu-hero-content">
          <Link to="/" className="menu-back">← Back to Home</Link>
          <span className="full-menu-label">THE MIX</span>
          <h1>Our <span>Menu</span></h1>
          <p>Delicious meals, freshly prepared favourites, sweet treats and refreshing drinks.</p>
        </div>
      </section>
      <section className="full-menu-content">
        <div className="menu-search-wrapper">
          <div className="menu-search">
            <span className="search-icon">⌕</span>
            <input type="text" placeholder="Search our menu..." value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search menu" />
            {search && (<button type="button" onClick={() => setSearch("")} aria-label="Clear search">×</button>)}
          </div>
        </div>
        <div className="full-menu-cart-bar">
          <div className="cart-bar-left"><span className="full-menu-cart-icon">🛒</span><div><strong>Your Cart</strong><small>{cartCount} {cartCount === 1 ? "item" : "items"}</small></div></div>
          <div className="full-menu-cart-summary"><strong>{formatPrice(cartTotal)}</strong></div>
        </div>
        {!search && (<nav className="menu-category-nav" aria-label="Menu categories">{menuCategories.map((category) => (<a href={`#${category.id}`} key={category.id}><span>{category.emoji}</span>{category.title}</a>))}</nav>)}
        <div className="full-menu-list">
          {filteredCategories.length === 0 ? (<div className="menu-no-results"><span>🔎</span><h2>No menu items found</h2><p>Try searching for another meal or drink.</p></div>) : (filteredCategories.map((category, index) => (
              <section className="full-menu-category" id={category.id} key={category.id}>
                <div className="category-heading"><div className="category-icon">{category.emoji}</div><div className="category-title"><span>{String(index + 1).padStart(2, "0")}</span><div><p>{category.subtitle}</p><h2>{category.title}</h2></div></div></div>
                <div className="menu-list">
                  {category.items.map(([name, price], itemIndex) => {
                    const prices = getPrices(price);
                    const isOrderable = prices.length > 0;
                    const hasMultiplePrices = prices.length > 1;
                    const image = getItemImage(category, itemIndex);
                    return (
                      <article className="full-menu-item" key={`${category.id}-${name}-${price}-${itemIndex}`}>
                        {image ? (<img className="full-menu-item-image" src={image} alt={name} loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; const placeholder = event.currentTarget.nextElementSibling; if (placeholder) { placeholder.style.display = "flex"; } }} />) : null}
                        <div className="full-menu-item-image" role="img" aria-label={`${name} image placeholder`} style={{ display: image ? "none" : "flex" }}>{category.emoji}</div>
                        <div className="full-menu-item-name"><h3>{name}</h3></div>
                        <div className="menu-dots" aria-hidden="true" />
                        <div className="full-menu-price">{price}</div>
                        {isOrderable ? (<button type="button" className="full-menu-add-btn" onClick={() => { if (hasMultiplePrices) { setPriceSelector({ name, prices }); } else { addToCart(name, prices[0]); } }}>{hasMultiplePrices ? "Select" : "Add"}</button>) : (<span className="full-menu-info">See options</span>)}
                      </article>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>
        <section className="full-menu-cart">
          <div className="cart-section-header"><div><span className="cart-section-label">YOUR ORDER</span><h2>Shopping Cart</h2></div><span className="cart-item-count">{cartCount} {cartCount === 1 ? "item" : "items"}</span></div>
          {cart.length === 0 ? (<div className="cart-empty"><div className="cart-empty-icon">🛒</div><h3>Your cart is empty</h3><p>Add something delicious from the menu above.</p></div>) : (
              <>
                <div className="cart-items">{cart.map((item) => (<div className="cart-item" key={item.id}><div className="cart-item-info"><h3>{item.name}</h3><span>{item.displayPrice} each</span></div><div className="cart-item-actions"><div className="quantity-control"><button type="button" onClick={() => decreaseQuantity(item.id)} aria-label={`Decrease ${item.name} quantity`}>−</button><span>{item.quantity}</span><button type="button" onClick={() => increaseQuantity(item.id)} aria-label={`Increase ${item.name} quantity`}>+</button></div><strong>{formatPrice(item.price * item.quantity)}</strong><button type="button" className="remove-cart-item" onClick={() => removeFromCart(item.id)}>Remove</button></div></div>))}</div>
                <div className="cart-bottom"><div className="cart-total-row"><span>Estimated Total</span><strong>{formatPrice(cartTotal)}</strong></div><button type="button" className="whatsapp-order-btn" onClick={orderViaWhatsApp}>Order via WhatsApp <span>→</span></button></div>
              </>
            )}
        </section>
        <div className="full-menu-cta"><span>THE MIX</span><h2>Hungry already?</h2><p>Choose your favourites and send your order directly to us.</p><a href="#food" className="full-menu-cta-btn">Start Ordering</a></div>
      </section>
      {priceSelector && (<div className="price-selector-overlay" onClick={() => setPriceSelector(null)}><div className="price-selector-modal" role="dialog" aria-modal="true" aria-labelledby="price-selector-title" onClick={(event) => event.stopPropagation()}><button type="button" className="price-selector-close" onClick={() => setPriceSelector(null)} aria-label="Close price selector">×</button><span className="price-selector-label">SELECT OPTION</span><h2 id="price-selector-title">{priceSelector.name}</h2><p>Choose the price option you want to add to your cart.</p><div className="price-selector-options">{priceSelector.prices.map((price, index) => (<button type="button" className="price-option" key={`${price}-${index}`} onClick={() => handlePriceSelection(price)}><span>{formatPrice(price)}</span><span className="price-option-arrow">→</span></button>))}</div></div></div>)}
    </main>
  );
}
export default FullMenu;
