<template>
  <div class="p-6 max-w-xl mx-auto space-y-6 flex flex-col items-center">
    <h1 class="text-xl font-semibold text-black">Administration</h1>
    <div class="flex flex-col gap-2">
      <label class="text-gray-800 min-w-[250px] inline-block text-center">
        Nombre de produits : {{ nbproducts }}
      </label>
      <USlider
        class="cursor-pointer"
        v-model="nbproducts"
        :min="0"
        :max="200"
      />
    </div>

    <div class="flex gap-4">
      <Button
        @click="fetchProducts"
        class="bg-green-500 hover:bg-green-600 text-white px-3 rounded h-10 duration-300 w-70 font-semibold"
        :class="
          isGenerated ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        "
        :disabled="isGenerated"
      >
        Générer les produits
      </Button>

      <Button
        @click="clearProducts"
        class="bg-red-500 hover:bg-red-600 text-white px-3 rounded h-10 duration-300 w-70 font-semibold"
        :class="
          !isGenerated ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        "
        :disabled="!isGenerated"
      >
        Dégénérer tous les produits
      </Button>
    </div>
  </div>
  <button
    @click="logout"
    class="cursor-pointer absolute bottom-10 right-10 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold duration-300"
  >
    Se déconnecter du mode admin
  </button>
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

function logout() {
  document.cookie = "auth=; Max-Age=0; path=/";
  navigateTo("/login");
}
</script>
