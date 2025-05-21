<template>
  <div class="flex flex-col items-center mt-12">
    <h1 class="text-3xl font-bold mb-6">Store Ecommerce</h1>
    <div v-if="products.length === 0" class="text-gray-500">
      Aucun produit pour le moment
    </div>
    <ul v-else class="w-full max-w-xl space-y-4">
      <li
        v-for="product in products"
        :key="product.id"
        class="border p-4 rounded"
      >
        <div class="font-bold">{{ product.name }}</div>
        <div>{{ product.price }} €</div>
        <div class="text-sm text-gray-500">{{ product.description }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/Product";

const products = ref<Product[]>([]);

onMounted(() => {
  const storeProducts = localStorage.getItem("products");
  products.value = storeProducts ? JSON.parse(storeProducts) : [];
});
</script>
