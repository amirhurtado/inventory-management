export type productsDashboardType = {
  name: string;
  price: Decimal;
  lowStockAt: number | null;
  quantity: number ;
  createdAt: Date;
}[];



export type Product = {
  id: string;
  name: string;
  sku: string | null;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  lowStockAt: number | null;
};