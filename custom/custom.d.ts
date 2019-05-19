declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
  interface Global {
    fetch: typeof fetch;
  }
}

/** Type of that module is 'any' */
declare module '*.graphql';