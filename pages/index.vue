<template>
  <div class="flex flex-col items-center mt-12">
    <h1 class="text-3xl font-bold mb-6">Store Ecommerce</h1>
    <div v-if="products.length === 0" class="text-gray-500">
      Aucun produit pour le moment
    </div>
    <ul v-else class="w-full max-w-xl space-y-4">
      <CardProduct
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/Product";

const products = ref<Product[]>([]);

onMounted(() => {
  const storedProduct = localStorage.getItem("products");
  products.value = storedProduct ? JSON.parse(storedProduct) : [];
});

function addToCart(product: Product) {
  const storedCartData = localStorage.getItem("cart");
  const cart: Product[] = storedCartData ? JSON.parse(storedCartData) : [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
}
</script>

<!-- Honnetement j'ai encore du mal à comprendre les states à 100% (du moins l'utilisation)
 dcp j'ai pref props et emit pour un petit projet simple comme lui -->
