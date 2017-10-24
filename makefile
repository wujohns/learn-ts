install:
	node scripts/package.json.js
	npm prune
	npm install

build:
	node scripts/tsconfig.json.js

run: build
	node dist/app.js