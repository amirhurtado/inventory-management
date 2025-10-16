import { PrismaClient, Prisma } from "@/generated/prisma";

const prisma = new PrismaClient();

const userId = "7ab1dd1d-b65c-411b-a3ce-b3d25891bbcc";

const productData: Prisma.ProductCreateInput[] = [
  {
    name: "Teclado mecánico RGB",
    sku: "PROD-001",
    price: 2000,
    quantity: 15,
    lowStockAt: 5,
    userId,
    createdAt: new Date("2025-10-01"),
  },


];

export async function main() {
  for (const product of productData) {
    await prisma.product.create({ data: product });
  }
  console.log("✅ Productos insertados correctamente");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
