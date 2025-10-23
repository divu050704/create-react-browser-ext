import fs from "fs-extra";
import path from "path";

export default async function editManifest(
  extensionName,
  extensionDetails,
  templateDir
) {
  const manifestPath = path.join(templateDir, "extension", "manifest.json");

  if (!(await fs.pathExists(manifestPath))) {
    console.warn(`⚠️  manifest.json not found at ${manifestPath}`);
    console.warn(`   Skipping manifest update...`);
    return;
  }

  try {
    const content = await fs.readFile(manifestPath, "utf-8");

    // Use safer RegEx with word boundaries
    const updated = content
      .replace(/\bEXTENSION_NAME\b/g, extensionName)
      .replace(/\bEXTENSION_DESCRIPTION\b/g, extensionDetails);

    await fs.writeFile(manifestPath, updated, "utf-8");

    console.log("✅ manifest.json updated successfully.");
  } catch (e) {
    console.error("❌ Error editing manifest.json:", e.message);
    throw e; // Re-throw to let the main script handle it
  }
}