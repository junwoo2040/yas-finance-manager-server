/* paths.ts */

/* Imports */
import { addAliases } from "module-alias";
import "module-alias/register";

/* Get srouce directory */
const srcDir = `${process.cwd()}/src`;

/* Map aliases with path */
addAliases({
  "@routes": `${srcDir}/routes`,
  "@controllers": `${srcDir}/controllers`,
  "@middlewares": `${srcDir}/middlewares`,
  "@configs": `${srcDir}/configs`,
  "@utils": `${srcDir}/utils`,
  "@models": `${srcDir}../../../shared/src/models`,
});
