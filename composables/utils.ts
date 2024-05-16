export function getAssetsUrl(name: String) {
  return new URL(`../assets/${name}`, import.meta.url).href
}