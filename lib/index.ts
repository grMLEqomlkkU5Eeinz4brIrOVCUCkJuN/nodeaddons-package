// It is important to do the following steps to import the native addon in an ESM context, it needs to be understood that since the native addon is a compiled C++ project
// typescript cannot import and read the types and other relevant information from the addon.
// To circumvent this, we use the createRequire function to create a require function for this ESM module and use that to import the addon.

// I highly recommend that you read this repository to understand more: https://github.com/xan105/node-addons/blob/main/lib/napi.js
// xan's repo has been a great resource for learning more about more interesting stuff about nodejs and addons, especicially methods for checking against tampering
// But again this repository will be focused on N-API and C++/C

// Import createRequire to use require() in ESM context
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Create a require function for this ESM module
const require = createRequire(import.meta.url);

// Get the directory of this module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Import the native addon using node-gyp-build which will load prebuilt binaries or fall back to build directory
const addon = require("node-gyp-build")(join(__dirname, "..")) as { hello(): string };




export function hello(): string {
	return addon.hello();
}

console.log(hello());