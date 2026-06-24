import fs from "fs";
import path from "path";
import { cache } from "react";
import { PortfolioDataSchema, PortfolioData } from "./schema";
import { migratePortfolioData, CURRENT_VERSION } from "./migrations";

const getPaths = () => {
  const dataDir = path.join(process.cwd(), "src/data");
  const defaultPath = path.join(dataDir, "portfolio-default.json");
  const dataPath = process.env.PORTFOLIO_DATA_PATH || path.join(dataDir, "portfolio.json");
  return { defaultPath, dataPath };
};

// Caching helper to deduplicate reads across a single request
export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  const { defaultPath, dataPath } = getPaths();

  let fileContent: string;
  try {
    // Check if portfolio.json exists
    if (!fs.existsSync(dataPath)) {
      console.warn(`Portfolio data file not found at ${dataPath}. Restoring from default...`);
      // Ensure directory exists
      fs.mkdirSync(path.dirname(dataPath), { recursive: true });
      // Copy default file
      if (fs.existsSync(defaultPath)) {
        fs.copyFileSync(defaultPath, dataPath);
      } else {
        throw new Error(`Default portfolio data file not found at ${defaultPath}`);
      }
    }

    fileContent = fs.readFileSync(dataPath, "utf-8");
  } catch (error) {
    console.error("Error reading portfolio data file:", error);
    // If reading active file failed, read default file directly as fallback
    try {
      fileContent = fs.readFileSync(defaultPath, "utf-8");
    } catch (fallbackError) {
      throw new Error(`Critical: Failed to read default portfolio data. ${fallbackError}`);
    }
  }

  // Parse JSON
  let rawData: any;
  try {
    rawData = JSON.parse(fileContent);
  } catch (error) {
    console.error("Error parsing portfolio JSON:", error);
    // If parsing active JSON failed, fallback to default JSON
    try {
      const defaultContent = fs.readFileSync(defaultPath, "utf-8");
      rawData = JSON.parse(defaultContent);
    } catch (fallbackError) {
      throw new Error(`Critical: Failed to parse default portfolio JSON. ${fallbackError}`);
    }
  }

  // Load default data for migrations and translation merging
  let defaultData: any = null;
  try {
    if (fs.existsSync(defaultPath)) {
      const defaultContent = fs.readFileSync(defaultPath, "utf-8");
      defaultData = JSON.parse(defaultContent);
    }
  } catch (err) {
    console.error("Failed to load default data for migration context:", err);
  }

  // Run migration check and translation merge
  let migratedData = rawData;
  try {
    migratedData = migratePortfolioData(rawData, defaultData);
    
    // Save updated data to disk if changes were made
    if (JSON.stringify(rawData) !== JSON.stringify(migratedData)) {
      console.log(`[Migration] Saving migrated/merged portfolio data to ${dataPath}...`);
      if (fs.existsSync(dataPath)) {
        const backupPath = `${dataPath}.bak`;
        try {
          fs.copyFileSync(dataPath, backupPath);
        } catch (backupError) {
          console.error(`Warning: Failed to create backup file at ${backupPath}`, backupError);
        }
      }
      fs.writeFileSync(dataPath, JSON.stringify(migratedData, null, 2), "utf-8");
      console.log("[Migration] Portfolio data successfully migrated and saved.");
    }
  } catch (migrationError) {
    console.error("[Migration] Error processing migration:", migrationError);
  }

  // Validate schema with Zod
  const result = PortfolioDataSchema.safeParse(migratedData);
  if (!result.success) {
    console.error("Portfolio data validation failed:", result.error.format());
    // If validation fails, attempt to parse and return the default data
    try {
      const defaultContent = fs.readFileSync(defaultPath, "utf-8");
      const defaultDataParsed = JSON.parse(defaultContent);
      const defaultResult = PortfolioDataSchema.safeParse(defaultDataParsed);
      if (defaultResult.success) {
        return defaultResult.data;
      } else {
        throw new Error("Default portfolio data validation failed.");
      }
    } catch (fallbackError) {
      throw new Error(`Critical: Failed to validate fallback default portfolio data. ${fallbackError}`);
    }
  }

  return result.data;
});

export const savePortfolioData = async (data: PortfolioData): Promise<void> => {
  const { dataPath } = getPaths();

  // 1. Validate data using Zod schema
  PortfolioDataSchema.parse(data);

  // 2. Backup current portfolio.json if it exists
  if (fs.existsSync(dataPath)) {
    const backupPath = `${dataPath}.bak`;
    try {
      fs.copyFileSync(dataPath, backupPath);
    } catch (error) {
      console.error(`Warning: Failed to create backup file at ${backupPath}`, error);
    }
  }

  // 3. Write new data to portfolio.json
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing portfolio data file:", error);
    throw new Error(`Failed to write portfolio data. ${error}`);
  }
};


