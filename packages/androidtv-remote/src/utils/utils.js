const isBrowser =
  typeof window !== "undefined" && 
  typeof window.document !== "undefined";

const isNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;

  const isDeno =
  typeof Deno !== "undefined" &&
  typeof Deno.version !== "undefined" &&
  typeof Deno.version.deno !== "undefined";

const isNodeOrDeno = isNode || isDeno;

const isReactNative =
  typeof HermesInternal !== "undefined"


export { isBrowser, isNode, isDeno, isNodeOrDeno, isReactNative };
