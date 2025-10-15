import { PrismaClient, Prisma } from "@/generated/prisma";

const prisma = new PrismaClient();

const userId = "7ab1dd1d-b65c-411b-a3ce-b3d25891bbcc";

const productData: Prisma.ProductCreateInput[] = [
  {
    name: "Teclado mecánico RGB",
    sku: "PROD-001",
    price: new Prisma.Decimal(249.99),
    quantity: 15,
    lowStockAt: 5,
    userId,
    createdAt: new Date("2025-10-01"),
  },
  {
    name: "Mouse inalámbrico",
    sku: "PROD-002",
    price: new Prisma.Decimal(129.99),
    quantity: 5,
    lowStockAt: 5,
    userId,
    createdAt: new Date("2025-10-02"),
  },
  {
    name: "Mouse malo",
    sku: "PROD-003",
    price: new Prisma.Decimal(121.99),
    quantity: 25,
    lowStockAt: 5,
    userId,
    createdAt: new Date("2025-10-03"),
  },
  {
    name: "MTV",
    sku: "PROD-004",
    price: new Prisma.Decimal(11.99),
    quantity: 5,
    lowStockAt: 3,
    userId,
    createdAt: new Date("2025-10-03"),
  },
  {
    name: "Monitor 27'' 144Hz",
    sku: "PROD-005",
    price: new Prisma.Decimal(899.99),
    quantity: 8,
    lowStockAt: 2,
    userId,
    createdAt: new Date("2025-10-04"),
  },
  {
    name: "Silla ergonómica gamer",
    sku: "PROD-006",
    price: new Prisma.Decimal(499.99),
    quantity: 3,
    lowStockAt: 2,
    userId,
    createdAt: new Date("2025-10-04"),
  },
  {
    name: "Micrófono condensador",
    sku: "PROD-007",
    price: new Prisma.Decimal(199.99),
    quantity: 12,
    lowStockAt: 4,
    userId,
    createdAt: new Date("2025-10-05"),
  },
  {
    name: "Audífonos inalámbricos",
    sku: "PROD-008",
    price: new Prisma.Decimal(159.99),
    quantity: 20,
    lowStockAt: 5,
    userId,
    createdAt: new Date("2025-10-05"),
  },
  {
    name: "Webcam Full HD",
    sku: "PROD-009",
    price: new Prisma.Decimal(99.99),
    quantity: 9,
    lowStockAt: 3,
    userId,
    createdAt: new Date("2025-10-06"),
  },
  {
    name: "Base refrigerante para laptop",
    sku: "PROD-010",
    price: new Prisma.Decimal(49.99),
    quantity: 6,
    lowStockAt: 2,
    userId,
    createdAt: new Date("2025-10-06"),
  },
  {
    name: "Router WiFi 6",
    sku: "PROD-011",
    price: new Prisma.Decimal(299.99),
    quantity: 10,
    lowStockAt: 3,
    userId,
    createdAt: new Date("2025-10-07"),
  },
  {
    name: "Disco SSD 1TB",
    sku: "PROD-012",
    price: new Prisma.Decimal(349.99),
    quantity: 7,
    lowStockAt: 2,
    userId,
    createdAt: new Date("2025-10-07"),
  },
  {
    name: "Tarjeta gráfica RTX 4070",
    sku: "PROD-013",
    price: new Prisma.Decimal(1599.99),
    quantity: 2,
    lowStockAt: 1,
    userId,
    createdAt: new Date("2025-10-08"),
  },
  {
    name: "Fuente de poder 850W",
    sku: "PROD-014",
    price: new Prisma.Decimal(249.99),
    quantity: 11,
    lowStockAt: 3,
    userId,
    createdAt: new Date("2025-10-09"),
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
