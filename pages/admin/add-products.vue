<template>
  <div class="p-6 max-w-xl mx-auto space-y-6 flex flex-col items-center">
    <h1 class="text-xl font-semibold text-white">Administration</h1>

    <div class="flex flex-col gap-2">
      <label class="text-gray-300">Nombre de produits : {{ nbproducts }}</label>
      <USlider v-model="nbproducts" :min="0" :max="200" />
    </div>

    <div class="flex gap-4">
      <Button
        @click="fetchProducts"
        class="bg-green-500 hover:bg-green-600 text-white px-3 rounded h-10 duration-300 w-30"
        :class="
          isGenerated ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        "
        :disabled="isGenerated"
      >
        Générer
      </Button>

      <Button
        @click="clearProducts"
        class="bg-red-500 hover:bg-red-600 text-white px-3 rounded h-10 duration-300 w-30"
        :class="
          !isGenerated ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        "
        :disabled="!isGenerated"
      >
        Dégénérer
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const nbproducts = ref(100);
const products = ref("");
const isGenerated = ref(false);

const { getProducts } = useProducts();

onMounted(() => {
  const storedProducts = localStorage.getItem("products");
  if (storedProducts) {
    products.value = storedProducts;
    isGenerated.value = true;
  } else {
    isGenerated.value = false;
  }
});

const fetchProducts = async () => {
  const res = await getProducts(nbproducts.value);
  localStorage.setItem("products", JSON.stringify(res.products));
  products.value = JSON.stringify(res.products, null, 2);
  isGenerated.value = true;
};

const clearProducts = () => {
  localStorage.removeItem("products");
  products.value = "";
  isGenerated.value = false;
};
</script>
