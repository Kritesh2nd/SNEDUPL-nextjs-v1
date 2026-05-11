import { getBaseUrl, getLocalStorage } from "@/lib/utils";
import { Product } from "@/types";

const token = getLocalStorage("token");
const CURRENT_URL = "/products";

// PRODUCT - create

// export async function postProduct(product: Product, image: File | null) {
//   const res = await fetch(getBaseUrl() + CURRENT_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(product),
//   });

//   return res;
// }
export async function postProduct(product: Product, image: File | null) {
  const formData = new FormData();
  formData.append("product", JSON.stringify(product));

  if (image) formData.append("image", image);

  const res = await fetch(getBaseUrl() + CURRENT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res;
}

// PRODUCT - get
export async function getProduct() {
  const res = await fetch(getBaseUrl() + CURRENT_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
}

export async function patchProduct(
  product: Product,
  image: File | null,
  id: string,
) {
  const formData = new FormData();
  formData.append("product", JSON.stringify(product));

  if (image) formData.append("image", image);

  const res = await fetch(getBaseUrl() + CURRENT_URL + "/" + id, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res;
}

// PRODUCT - delete

export async function deleteProduct(id: string) {
  const res = await fetch(getBaseUrl() + CURRENT_URL + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
}
