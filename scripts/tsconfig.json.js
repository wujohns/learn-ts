/**
 * tsconfig
 */
'use strict';

const tsConfig = {
    'compilerOptions': {
        'target': 'es5',
        'outDir': 'dist',
        'module': 'commonjs',
        'moduleResolution': 'node',
        'inlineSourceMap': true
    },
    'files': [
        'src/app.ts'
    ]
};

const fs = require('fs');
const path = require('path');
const targetFile = path.join(__dirname, '../tsconfig.json');
fs.writeFileSync(targetFile, JSON.stringify(tsConfig, null, 2), {
    encoding: 'utf8',
    flags: 'w',
    mode: 0o666
});