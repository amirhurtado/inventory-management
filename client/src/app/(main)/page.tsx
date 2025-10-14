import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  
  await getCurrentUser();

  return null;
}
