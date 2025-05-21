<template>
  <div class="flex flex-col items-center mt-20 gap-4">
    <input
      v-model="password"
      type="password"
      placeholder="Mot de passe"
      class="border border-gray-300 rounded px-3 py-2 text-gray-900 focus:ring-1 focus:ring-green-400 focus:border-green-400 outline-none duration-300"
    />
    <button
      @click="handleLogin"
      class="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold transition duration-200 shadow focus:outline-none"
    >
      Se connecter
    </button>
    <div v-if="error" class="text-red-500">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
const password = ref("");
const error = ref("");
const { login } = useLogin();

const handleLogin = async () => {
  error.value = "";
  try {
    const res = await login(password.value);
    if ("success" in res && res.success === true) {
      await navigateTo("/admin/add-products");
      return;
    }
    if ("message" in res) {
      error.value = res.message;
      return;
    }
  } catch (e: any) {
    error.value = e?.data?.message || "Erreur serveur";
  }
};
</script>
