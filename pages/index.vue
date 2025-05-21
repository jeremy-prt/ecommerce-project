<template>
  <div class="container mx-auto pt-16 px-4">
    <h1 class="text-3xl font-bold mb-6 text-black text-center">
      Store Ecommerce
    </h1>

    <div class="flex justify-center">
      <input
        v-model.trim="searchQuery"
        type="text"
        placeholder="Rechercher un produit..."
        class="w-full max-w-md mx-auto mb-6 px-4 py-2 border border-gray-300 rounded text-gray-900 focus:ring-1 focus:ring-green-400 focus:border-green-400 outline-none duration-300"
      />
    </div>

    <div v-if="filteredProducts.length === 0" class="text-center text-black">
      Aucun produit pour le moment
    </div>

    <ul
      v-else
      class="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <CardProduct
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
        :show-add="true"
        :show-remove="false"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import Fuse from "fuse.js";
import type { Product } from "~/types/Product"; // l'auto import pour le type ne fonctionn epas perso ??

const searchQuery = ref("");
const products = ref<Product[]>([]);
const results = ref<Product[]>([]);
let fuse: Fuse<Product>;

onMounted(() => {
  const stored = localStorage.getItem("products");
  products.value = stored ? JSON.parse(stored) : [];

  fuse = new Fuse(products.value, {
    keys: ["name", "description"],
    threshold: 0.3,
  });
});

watch(searchQuery, (query) => {
  results.value = query ? fuse.search(query).map((result) => result.item) : [];
});

const filteredProducts = computed(() =>
  searchQuery.value.length > 0 ? results.value : products.value
);

function addToCart(product: Product) {
  const storedCart = localStorage.getItem("cart");
  const cart = storedCart ? JSON.parse(storedCart) : [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}
</script>
<!-- Honnetement j'ai encore du mal à comprendre les states à 100% (du moins l'utilisation)
 dcp j'ai pref props et emit pour un petit projet simple comme lui -->
