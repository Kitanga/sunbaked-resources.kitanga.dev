const { readdir, readFile } = require("node:fs/promises");
const { join } = require('node:path');
const sharp = require('sharp');

const img_folder = join(import.meta.dir, 'img');
const preprocessed_img_folder = join(import.meta.dir, 'preprocessed');

// read all the files in the current directory
const preprocessed_files = await readdir(preprocessed_img_folder);

console.log(preprocessed_files);

preprocessed_files.forEach(async file => {
    await readFile(join('preprocessed', file)).then(buf => {
        const sharpFile = sharp(buf);

        return sharpFile
            .avif({
                effort: 7
            }).toFile(join('img', file.replace(/.webp|.png|.jpg|.jpeg/g, '.avif')));
    });
});
