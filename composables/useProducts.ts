export const useProducts = () => {
  const getProducts = async (nbproducts?: number) => {
    return await $fetch("/api/ecommerce/products", {
      params: nbproducts ? { nbproducts } : undefined,
    });
  };

  return { getProducts };
};
