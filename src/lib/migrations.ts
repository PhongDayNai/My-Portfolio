export const CURRENT_VERSION = 2;

/**
 * Deep merge utility for objects, ignores arrays.
 * Merges source properties into target if they don't exist in target.
 */
function deepMerge(target: any, source: any): any {
  if (!target) return source;
  if (!source) return target;

  const output = { ...target };

  if (typeof target === "object" && typeof source === "object" && !Array.isArray(target) && !Array.isArray(source)) {
    Object.keys(source).forEach((key) => {
      if (typeof source[key] === "object" && source[key] !== null && !Array.isArray(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        if (!(key in target)) {
          output[key] = source[key];
        }
      }
    });
  }
  return output;
}

/**
 * Migrates old portfolio data structure to the latest version.
 */
export function migratePortfolioData(rawData: any, defaultData: any): any {
  let data = { ...rawData };
  let version = data.version || 1;

  console.log(`[Migration] Starting portfolio data migration check. Current: v${version}, Target: v${CURRENT_VERSION}`);

  // Step 1: Migrate from v1 (unversioned or version 1) to v2
  if (version < 2) {
    console.log(`[Migration] Migrating from v${version} to v2...`);

    // 1. Deep merge translations to ensure new keys exist
    if (defaultData && defaultData.translations) {
      data.translations = deepMerge(data.translations || {}, defaultData.translations);
    }

    // 2. Normalize profileImages (old format might be string[])
    if (Array.isArray(data.profileImages)) {
      data.profileImages = data.profileImages.map((img: any) => {
        if (typeof img === "string") {
          return { url: img, show: true };
        }
        return {
          url: img.url || "",
          show: img.show !== undefined ? img.show : true,
        };
      });
    } else {
      data.profileImages = defaultData?.profileImages || [];
    }

    // 3. Ensure documents exists
    if (!data.documents) {
      data.documents = [];
    }

    // 4. Ensure "show" fields exist for projects, timeline, skills, and socialLinks
    if (Array.isArray(data.projects)) {
      data.projects = data.projects.map((proj: any) => ({
        show: proj.show !== undefined ? proj.show : true,
        ...proj,
      }));
    }
    if (Array.isArray(data.timeline)) {
      data.timeline = data.timeline.map((item: any) => ({
        show: item.show !== undefined ? item.show : true,
        ...item,
      }));
    }
    if (Array.isArray(data.skills)) {
      data.skills = data.skills.map((skill: any) => ({
        show: skill.show !== undefined ? skill.show : true,
        ...skill,
      }));
    }
    if (Array.isArray(data.socialLinks)) {
      data.socialLinks = data.socialLinks.map((link: any) => ({
        show: link.show !== undefined ? link.show : true,
        ...link,
      }));
    }

    data.version = 2;
    version = 2;
  }

  // Future migrations:
  // if (version < 3) {
  //   console.log(`[Migration] Migrating from v2 to v3...`);
  //   // migration logic...
  //   data.version = 3;
  //   version = 3;
  // }

  // Always merge translations on startup to pull in any newly added keys/translations
  // even if the schema version didn't change
  if (defaultData && defaultData.translations) {
    data.translations = deepMerge(data.translations || {}, defaultData.translations);
  }

  console.log(`[Migration] Migration check finished. Active version: v${version}`);
  return data;
}
