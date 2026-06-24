import { getPortfolioData } from "@/lib/portfolio";
import SettingsClient from "@/components/SettingsClient";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const data = await getPortfolioData();
  return <SettingsClient data={data} />;
}
