export type productsDashboardType = {
  name: string;
  price: Decimal;
  lowStockAt: number | null;
  quantity: number ;
  createdAt: Date;
}[];
