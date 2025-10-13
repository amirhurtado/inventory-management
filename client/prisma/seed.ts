import { PrismaClient, Prisma } from "@/generated/prisma";

const prisma = new PrismaClient();

const productData: Prisma.ProductCreateInput[] = [
  {
    name: "Teclado mecánico RGB",
    sku: "PROD-001",
    prince: new Prisma.Decimal(249.99),
    quantity: 15,
    lowStockAt: 5,
    userId:   "7ab1dd1d-b65c-411b-a3ce-b3d25891bbcc" 

  },
  {
    name: "Mouse inalámbrico",
    sku: "PROD-002",
    prince: new Prisma.Decimal(129.99),
    quantity: 25,
    lowStockAt: 5,
    userId:   "7ab1dd1d-b65c-411b-a3ce-b3d25891bbcc" 
  },
  {
    name: "Mouse malo",
    sku: "PROD-003",
    prince: new Prisma.Decimal(121.99),
    quantity: 25,
    lowStockAt: 5,
    userId:   "7ab1dd1d-b65c-411b-a3ce-b3d25891bbcc" 
  },
];
export async function main() {
  for (const u of productData) {
    await prisma.product.create({ data: u });
  }
}

main();