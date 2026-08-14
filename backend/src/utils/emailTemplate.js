import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatesDirectory = path.join(__dirname, "../templates/emails");

const loadEmailTemplate = async (templateName, variables = {}) => {
  const templateDirectory = path.join(templatesDirectory, templateName);

  const htmlPath = path.join(templateDirectory, `${templateName}.html`);

  const cssPath = path.join(templateDirectory, `${templateName}.css`);

  let html = await fs.readFile(htmlPath, "utf8");
  const css = await fs.readFile(cssPath, "utf8");

  html = html.replace("{{CSS}}", css);

  for (const [key, value] of Object.entries(variables)) {
    html = html.replaceAll(`{{${key}}}`, String(value));
  }

  return html;
};

export default loadEmailTemplate;
