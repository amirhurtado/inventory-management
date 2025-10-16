import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 gap-4 w-full">
    <div className="flex flex-col gap-4">
      <Skeleton className="h-48 w-full rounded-lg" />
      <Skeleton className="h-64 w-full rounded-lg" />
    </div>
    <div className="flex flex-col gap-4">
      <Skeleton className="h-80 w-full rounded-2xl" />
      <Skeleton className="h-80 w-full rounded-2xl" />
    </div>
  </div>
);