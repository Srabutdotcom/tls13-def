// deno-lint-ignore-file no-slow-types
// @ts-self-types="./mod.d.ts"
// ver 0.1.2
export * from "./base.js"
export * from "./alert.js"
export * from "./keyexchange.js"
export * from "./record.js"
export * from "./handshake.js"
export * from "./auth.js"
export * from "./ticket.js"
export * from "./update.js"
export * from "./extension/servername.js"
export * from "./extension/namedgroup.js"
export * from "./extension/signaturescheme.js"
export * from "./extension/keyshare.js"
export * from "./extension/pskeyexchange.js"
export * from "./extension/supportedversion.js"
export * from "./extension/extension.js"
export * from "./clienthello.js"
export * from "./serverhello.js"
export * from "./msghash.js"
export * from "./params.js"

//`esbuild ./mod.js --bundle --format=esm --target=esnext --outfile=../dist/def.js --legal-comments=inline --external:@aicone*`
//--external:npm:jose* --external:npm:@lapo/*
// npx -p typescript tsc def.js --declaration --allowJs --emitDeclarationOnly --lib ESNext

// add this in the first line in /dist/ file
// @ts-self-types="./types.d.ts"
