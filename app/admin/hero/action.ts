import { getBaseUrl, getLocalStorage } from "@/lib/utils";
import { AboutContent, HeroContent } from "@/types";

const token = getLocalStorage("token");
const CURRENT_URL_ABOUT = "/about";
const CURRENT_URL_HERO = "/hero";

//        d8888 888                        888
//       d88888 888                        888
//      d88P888 888                        888
//     d88P 888 88888b.   .d88b.  888  888 888888
//    d88P  888 888 "88b d88""88b 888  888 888
//   d88P   888 888  888 888  888 888  888 888
//  d8888888888 888 d88P Y88..88P Y88b 888 Y88b.
// d88P     888 88888P"   "Y88P"   "Y88888  "Y888

// ABOUT - create / update

export async function postAbout(data: AboutContent) {
  const res = await fetch(getBaseUrl() + CURRENT_URL_ABOUT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res;
}

// ABOUT - get
export async function getAbout() {
  const res = await fetch(getBaseUrl() + CURRENT_URL_ABOUT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

// 888    888
// 888    888
// 888    888
// 8888888888  .d88b.  888d888 .d88b.
// 888    888 d8P  Y8b 888P"  d88""88b
// 888    888 88888888 888    888  888
// 888    888 Y8b.     888    Y88..88P
// 888    888  "Y8888  888     "Y88P"

export async function postHero(data: HeroContent) {
  const res = await fetch(getBaseUrl() + CURRENT_URL_HERO, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res;
}

// ABOUT - get
export async function getHero() {
  const res = await fetch(getBaseUrl() + CURRENT_URL_HERO, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}
