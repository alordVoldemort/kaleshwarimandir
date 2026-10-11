// Resolves a file name to the bundled copy in src/assets (replaces the old zonixtec.com CDN links).
const files = require.context('./assets', false, /\.(png|jpe?g|webp|gif|svg|mp4)$/i);

const lookup = {};
files.keys().forEach((key) => {
  lookup[key.replace('./', '')] = files(key);
});

// Names used in code that differ from the file actually present in assets
const aliases = {
  'icon-cluture.png': 'culture-icon (1).png',
  'eco-icon__1.png': 'eco-icon (1).png',
};

const assetUrl = (name) => {
  const real = aliases[name] || name;
  const mod = lookup[real];
  if (!mod) console.warn(`assetUrl: "${name}" not found in src/assets`);
  return mod && mod.default ? mod.default : mod;
};

export default assetUrl;
