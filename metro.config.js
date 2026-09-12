const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Enable Metro bundler to resolve 3D model asset extensions
config.resolver.assetExts.push("glb", "gltf", "obj", "usdz");

module.exports = config;
