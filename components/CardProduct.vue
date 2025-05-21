<template>
  <li class="border p-4 rounded flex flex-col gap-2">
    <div class="font-bold">{{ product.name }}</div>
    <div>{{ product.price }} €</div>
    <div class="text-sm text-gray-500">{{ product.description }}</div>
    <button
      class="bg-black text-white px-3 py-1 rounded w-max cursor-pointer"
      @click="$emit('add-to-cart', product)"
    >
      Ajouter au panier
    </button>
  </li>
</template>

<script setup lang="ts">
import type { Product } from "~/types/Product";

defineProps<{
  product: Product;
}>();
defineEmits<{
  (e: "add-to-cart", product: Product): void;
}>();
</script>
