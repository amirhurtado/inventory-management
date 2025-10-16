import { deleteProductAction } from "@/actions/products/deleteProduct";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: deleteProductAction,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("¡Éxito!", {
          description: data.message,
        });
        queryClient.invalidateQueries({ queryKey: ["inventoryProducts"] });
        queryClient.invalidateQueries({ queryKey: ["dashboardProducts"] });
      } else {
        toast.error("Error", {
          description: data.error || "Ocurrió un error desconocido.",
        });
      }
    },
    onError: (error) => {
      toast.error("Error de red", {
        description: error.message,
      });
    },
  });

  return { deleteProduct, isDeleting };
};