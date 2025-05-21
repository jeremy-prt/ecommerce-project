<template>
  <div class="flex flex-col items-center mt-12">
    <h1 class="text-2xl font-bold mb-6">Mon Panier</h1>
    <div v-if="cart.length === 0" class="text-gray-500">Panier vide</div>
    <ul v-else class="w-full max-w-xl space-y-4">
      <li
        v-for="(product, i) in cart"
        :key="product.id"
        class="border p-4 rounded flex justify-between items-start"
      >
        <div>
          <div class="font-bold">{{ product.name }}</div>
          <div>{{ product.price }} €</div>
          <div class="text-sm text-gray-500">{{ product.description }}</div>
        </div>
        <button
          @click="removeFromCart(i)"
          class="text-red-500 text-xl font-bold ml-4 cursor-pointer"
          title="Supprimer"
        >
          ×
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/types/Product"; // l'auto import pour le type ne fonctionn epas perso ??

const cart = ref<Product[]>([]);

onMounted(() => {
  const rawCart = localStorage.getItem("cart");
  cart.value = rawCart ? JSON.parse(rawCart) : [];
});

function removeFromCart(index: number) {
  cart.value.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart.value));
}
</script>
