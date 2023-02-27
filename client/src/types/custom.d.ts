// To use non-code assets with TypeScript, defer the type for these imports
// This also applies to  other assets including CSS, SCSS, JSON and more.

declare module "*.png" {
  const value: any;
  export = value;
}
