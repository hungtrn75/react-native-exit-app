const fs = require("fs");
const path = require("path");

// Read package.json to get the module name
const packageJson = require("../package.json");
const moduleName = packageJson.name;

// Get all files in current directory
fs.readdir(path.join(__dirname, ".."), (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  console.log({ files });

  // Filter .tgz files that contain the module name
  const tgzFiles = files.filter(
    (file) => file.includes(moduleName) && file.endsWith(".tgz"),
  );

  // Delete each matching file
  tgzFiles.forEach((file) => {
    const filePath = path.join(__dirname, "..", file);

    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error(`Error deleting ${file}:`, unlinkErr);
      } else {
        console.log(`Successfully deleted: ${file}`);
      }
    });
  });
});
