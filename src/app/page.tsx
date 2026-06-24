import { getPortfolioData } from "@/lib/portfolio";
import HomeClient from "@/components/HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolioData();
  return <HomeClient data={data} />;
}
