<template>
  <li
    class="relative bg-white border border-gray-200 shadow-lg rounded-2xl flex flex-col gap-3 p-4 transition hover:shadow-xl duration-300 group"
  >
    <div class="w-full h-40 overflow-hidden">
      <img
        :src="product.image || '/placeholder.jpg'"
        :alt="product.name"
        class="w-full h-40 object-cover mb-2 bg-gray-100 transition-transform duration-300 group-hover:scale-110"
        style="background-color: #f3f4f6"
      />
    </div>
    <div class="flex-1 flex flex-col gap-1">
      <div class="font-bold text-lg text-gray-900 truncate">
        {{ product.name }}
      </div>
      <div class="text-green-600 font-semibold text-base">
        {{ product.price }} €
      </div>
      <div class="text-sm text-gray-700 line-clamp-2">
        {{ product.description }}
      </div>
    </div>
    <button
      v-if="showAdd !== false"
      class="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow transition duration-200 cursor-pointer"
      @click="$emit('add-to-cart', product)"
    >
      Ajouter au panier
    </button>
    <button
      v-if="showRemove"
      @click="$emit('remove')"
      class="absolute top-[-13px] right-[-13px] text-white text-xl font-bold bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 shadow cursor-pointer transition flex items-center justify-center"
      title="Supprimer"
      type="button"
    >
      <span class="mb-[0.9px]">×</span>
    </button>
  </li>
</template>

<script setup lang="ts">
import type { Product } from "~/types/Product";

defineProps<{
  product: Product;
  showAdd?: boolean;
  showRemove?: boolean;
}>();
defineEmits<{
  (e: "add-to-cart", product: Product): void;
  (e: "remove"): void;
}>();
</script>
