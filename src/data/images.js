const modules = import.meta.glob("../assets/*.{png,jpg,jpeg,webp,svg,gif}", {
  eager: true,
  import: "default",
});

export const projectImages = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => {
    const filename = path.split("/").pop();
    return [filename, url];
  })
);