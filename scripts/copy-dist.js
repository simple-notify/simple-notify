const fs = require('fs-extra');
const chokidar = require('chokidar');

const sourceDir = 'dist';
const destinationDir = 'website/dist';

const copyFiles = () => {
  fs.copySync(sourceDir, destinationDir);
};

copyFiles();

chokidar.watch(sourceDir, { ignoreInitial: true }).on('all', (event, path) => {
  copyFiles();
});
