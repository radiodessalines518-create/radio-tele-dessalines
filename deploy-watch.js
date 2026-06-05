const { exec } = require("child_process");
const chokidar = require("chokidar");

// Koute tout dosye eksepte node_modules, .next, .git, ak .netlify
const watcher = chokidar.watch("./", {
  ignored: /node_modules|\.next|\.git|\.netlify/,
  persistent: true,
});

function deploy() {
  console.log("Chanjman detekte, ap deploy sou Netlify...");
  exec("netlify deploy --prod", (err, stdout, stderr) => {
    if (err) {
      console.error("Error deploy:", err);
      return;
    }
    console.log(stdout);
    if (stderr) console.error(stderr);
    console.log("Deploy fini ✅");
  });
}

watcher.on("change", (path) => {
  console.log(`Chanjman nan: ${path}`);
  deploy();
});

console.log("Watcher k ap koute chanjman nan pwojè a...");