<template>
  <div class="flex flex-col items-center mt-12">
    <div class="flex flex-col items-center gap-2 mb-7">
      <h1 class="text-2xl font-bold text-black flex items-center gap-2">
        Mon Panier
      </h1>

      <span
        v-if="cart.length > 0"
        class="text-base font-semibold text-gray-600"
      >
        ({{ cart.length }} {{ cart.length === 1 ? "article" : "articles" }})
      </span>
    </div>
    <div v-if="cart.length === 0" class="text-gray-800">Panier vide</div>
    <ul
      v-else
      class="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <CardProduct
        v-for="(product, i) in cart"
        :key="product.id"
        :product="product"
        :show-add="false"
        :show-remove="true"
        @remove="removeFromCart(i)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/Product"; // l'auto import pour le type ne fonctionn epas perso ??

const cart = ref<Product[]>([]);

onMounted(() => {
  const storedCart = localStorage.getItem("cart");
  cart.value = storedCart ? JSON.parse(storedCart) : [];
});

function removeFromCart(index: number) {
  cart.value.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart.value));
}
</script>
