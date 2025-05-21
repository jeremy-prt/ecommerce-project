<template>
  <div>
    <input
      v-model="nbproducts"
      type="number"
      min="0"
      max="200"
      placeholder="Nombre de produits"
    />
    <button @click="fetchProducts">Tester</button>
    <pre v-if="products">{{ products }}</pre>
  </div>
</template>

<script setup lang="ts">
const nbproducts = ref(0);
const products = ref("");
const { getProducts } = useProducts();

const fetchProducts = async () => {
  const res = await getProducts(nbproducts.value);
  localStorage.setItem("products", JSON.stringify(res.products));
};
</script>
