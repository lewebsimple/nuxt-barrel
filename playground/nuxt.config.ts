export default defineNuxtConfig({
  modules: ["../src/module"],
  barrel: {
    myBarrel: "server/barrel/*.ts",
  },
  devtools: { enabled: true },
});
