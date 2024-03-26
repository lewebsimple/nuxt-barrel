import { addServerImports, addTemplate, createResolver, defineNuxtModule, resolveFiles } from "@nuxt/kit";

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
      // Resolve files from globs
      const files: string[] = [];
      for await (const rootDir of nuxt.options._layers.map((layer) => layer.config.rootDir)) {
        files.push(...(await resolveFiles(rootDir, globs)));
      }

      // Add barrel files and server imports
      addTemplate({
        write: true,
        filename: `barrel/${key}-index.ts`,
        getContents: () => files.map((file) => `export * from "${file.replace(".ts", "")}";`).join("\n"),
      });
      addTemplate({
        write: true,
        filename: `barrel/${key}.ts`,
        getContents: () => `export * as ${key} from "./${key}-index";`,
      });

      // Add server import
      const { resolve } = createResolver(nuxt.options.buildDir);
      addServerImports([{ from: resolve(`barrel/${key}.ts`), name: key }]);
    });
  },
});
