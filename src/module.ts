import { addServerImports, addTemplate, createResolver, defineNuxtModule, resolveFiles, updateTemplates } from "@nuxt/kit";
import { minimatch } from "minimatch";

export type ModuleOptions = Record<string, string | string[]>;

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@lewebsimple/nuxt-barrel",
    configKey: "barrel",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(options, nuxt) {
    Object.entries(options).forEach(async ([key, globs]) => {
      // Add barrel index from glob patterns
      addTemplate({
        write: true,
        filename: `barrel/${key}-index.ts`,
        getContents: async () => {
          // Resolve files from globs
          const files: string[] = [];
          for await (const rootDir of nuxt.options._layers.map((layer) => layer.config.rootDir)) {
            files.push(...(await resolveFiles(rootDir, globs)));
          }
          return files.map((file) => `export * from "${file.replace(".ts", "")}";`).join("\n");
        },
      });

      // Add barrel files and server imports
      addTemplate({
        write: true,
        filename: `barrel/${key}.ts`,
        getContents: () => `export * as ${key} from "./${key}-index";`,
      });

      // Add server import
      const { resolve } = createResolver(nuxt.options.buildDir);
      addServerImports([{ from: resolve(`barrel/${key}.ts`), name: key }]);

      // Watch for file changes
      nuxt.hook("builder:watch", async (event, relativePath) => {
        const shouldUpdate = await new Promise<boolean>((resolve) => {
          if (Array.isArray(globs)) {
            for (const glob of globs) {
              if (minimatch(relativePath, glob)) {
                resolve(true);
              }
            }
          } else if (typeof globs === "string") {
            if (minimatch(relativePath, globs)) {
              resolve(true);
            }
          }
          resolve(false);
        });
        if (shouldUpdate) {
          updateTemplates({ filter: (template) => template.filename.includes(`barrel/${key}-index`) });
        }
      });
    });
  },
});
