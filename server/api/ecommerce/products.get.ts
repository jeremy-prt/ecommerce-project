import { faker } from "@faker-js/faker";

export default defineEventHandler((event) => {
  const { nbproducts } = getQuery(event);
  const count = Number(nbproducts) || 10;

  if (isNaN(count) || count < 0 || count > 200) {
    throw createError({
      statusCode: 400,
      statusMessage: "Le nombre de produit doit être entre 0 et 200",
    });
  }

  const products = Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.urlPicsumPhotos(),
    description: faker.commerce.productDescription(),
  }));

  return { products };
});
// Retourne des produits aléatoires avec faker, si pas de précision dans la requete alors on renvoit 10
// Si c'est un nombre pas entre 0 et 200, on send une erreur
