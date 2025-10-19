import fs from "fs-extra";
import path from "path";

export default function editManifest(
  extensionName,
  extensionDetails,
  templateDir
) {
  try {
    const manifestPath = path.join(templateDir, "extension", "manifest.json");
    const content = fs.readFileSync(manifestPath, "utf-8");
    var updated = content.replace(/EXTENSION_NAME/g, extensionName).replace(/EXTENSION_DESCRIPTION/g, extensionDetails);
    fs.writeFileSync(manifestPath, updated);
  } catch (e) {
    console.error("Error occured while editing manifest.json: ", e);
  }
}
