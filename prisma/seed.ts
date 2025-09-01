import { hashSync } from "bcrypt";
import { prisma } from "./prisma-client";
import { categories, ingredients, products } from "./constant";

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}
async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User Test",
        email: "user@test.com",
        password: hashSync("11111111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Test",
        email: "admin@test.com",
        password: hashSync("11111111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });
  await prisma.category.createMany({
    data: categories,
  });
  await prisma.ingredient.createMany({
    data: ingredients,
  });
  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Пепперони фреш",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  });
  const pizza2 = await prisma.product.create({
    data: {
      name: "Сырная",
      imageUrl:
        "https://media.dodostatic.net/image/r:584x584/11EE7D610D2925109AB2E1C92CC5383C.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });
  const pizza3 = await prisma.product.create({
    data: {
      name: "Четыре сезона",
      imageUrl:
        "https://media.dodostatic.net/image/r:584x584/11EE7D611ADF5AAD898B8B651186E023.avif",
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 17),
      },
    },
  });
  await prisma.productItem.createMany({
    data: [
      //Пепперони фреш
      {
        productId: pizza1.id,
        price: randomNumber(190, 400),
        pizzaType: 1,
        size: 25,
      },
      {
        productId: pizza1.id,
        price: randomNumber(400, 600),
        pizzaType: 2,
        size: 30,
      },
      {
        productId: pizza1.id,
        price: randomNumber(600, 800),
        pizzaType: 2,
        size: 35,
      },

      //Сырная
      {
        productId: pizza2.id,
        price: randomNumber(190, 400),
        pizzaType: 1,
        size: 25,
      },
      {
        productId: pizza2.id,
        price: randomNumber(400, 600),
        pizzaType: 1,
        size: 30,
      },
      {
        productId: pizza2.id,
        price: randomNumber(600, 800),
        pizzaType: 1,
        size: 35,
      },
      {
        productId: pizza2.id,
        price: randomNumber(190, 400),
        pizzaType: 2,
        size: 25,
      },
      {
        productId: pizza2.id,
        price: randomNumber(400, 600),
        pizzaType: 2,
        size: 30,
      },
      {
        productId: pizza2.id,
        price: randomNumber(600, 800),
        pizzaType: 2,
        size: 35,
      },

      //Четыре сезона
      {
        productId: pizza3.id,
        price: randomNumber(190, 400),
        pizzaType: 1,
        size: 25,
      },
      {
        productId: pizza3.id,
        price: randomNumber(190, 400),
        pizzaType: 2,
        size: 25,
      },
      {
        productId: pizza3.id,
        price: randomNumber(400, 600),
        pizzaType: 2,
        size: 30,
      },
      {
        productId: pizza3.id,
        price: randomNumber(600, 800),
        pizzaType: 2,
        size: 35,
      },

      // продукты остальные

      { productId: 1, price: randomNumber(200, 300) },
      { productId: 2, price: randomNumber(200, 300) },
      { productId: 3, price: randomNumber(200, 300) },
      { productId: 4, price: randomNumber(200, 300) },
      { productId: 5, price: randomNumber(200, 300) },
      { productId: 6, price: randomNumber(200, 300) },
      { productId: 7, price: randomNumber(200, 300) },
      { productId: 8, price: randomNumber(200, 300) },
      { productId: 9, price: randomNumber(200, 300) },
      { productId: 10, price: randomNumber(200, 300) },
      { productId: 11, price: randomNumber(200, 300) },
      { productId: 12, price: randomNumber(200, 300) },
      { productId: 13, price: randomNumber(200, 300) },
      { productId: 14, price: randomNumber(200, 300) },
      { productId: 15, price: randomNumber(200, 300) },
      { productId: 16, price: randomNumber(200, 300) },
      { productId: 17, price: randomNumber(200, 300) },
    ],
  });
  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "1111111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "2222222",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 1,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737",
      },
      {
        previewImageUrl:
          "https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284",
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE",
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
