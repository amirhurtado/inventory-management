import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Decimal } from "@prisma/client/runtime/library";

type Product = {
  id: string;
  name: string;
  sku: string | null;
  price: Decimal;
  quantity: number;
  createdAt: Date;
  lowStockAt: number | null;
};

interface InventoryListProps {
  products: Product[];
}

const InventoryList = ({ products }: InventoryListProps) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-8">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            No tienes productos
          </h3>
          <p className="text-sm text-muted-foreground">
            Empieza añadiendo tu primer producto para verlo aquí.
          </p>
          <Button className="mt-4">Añadir Producto</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-xs text-gray-500">Acciones</DropdownMenuLabel>
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Eliminar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="text-2xl font-bold">${Number(product.price).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {product.quantity} unidades en stock
            </p>
             {product.sku && (
               <p className="text-xs text-muted-foreground mt-2">SKU: {product.sku}</p>
             )}
          </CardContent>
          <CardFooter>
             {product.lowStockAt && product.quantity <= product.lowStockAt ? (
                <Badge variant="destructive">Bajo stock</Badge>
              ) : (
                <Badge variant="secondary">En stock</Badge>
              )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default InventoryList;