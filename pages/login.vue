<template>
  <div class="flex flex-col items-center mt-20 gap-4">
    <input
      v-model="password"
      type="password"
      placeholder="Mot de passe"
      class="border rounded px-3 py-2"
    />
    <button
      @click="handleLogin"
      class="bg-blue-600 text-white px-4 py-2 rounded"
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
