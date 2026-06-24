"use server";

import { revalidatePath } from "next/cache";
import { savePortfolioData } from "@/lib/portfolio";
import { PortfolioData } from "@/lib/schema";

export async function updatePortfolio(data: PortfolioData) {
  try {
    // Save data and trigger backup
    await savePortfolioData(data);
    
    // Clear Next.js cache for the home page to immediately show updated settings
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update portfolio data:", error);
    return { 
      success: false, 
      error: error?.message || "Failed to update portfolio data due to an unknown error." 
    };
  }
}
