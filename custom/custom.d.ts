declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
  interface Global {
    fetch: typeof fetch;
  }
}

/** Type of that module is 'any' */
declare module '*.graphql' {
  import { DocumentNode } from 'graphql';
  const node: DocumentNode;
  export default node;
};