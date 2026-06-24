import { getPortfolioData } from "@/lib/portfolio";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const data = await getPortfolioData();
  return <HomeClient data={data} />;
}
