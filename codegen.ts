import type {CodegenConfig} from '@graphql-codegen/cli';
import {getSchema, pluckConfig, preset} from '@shopify/hydrogen-codegen';

const sharedDocuments = ['./*.{ts,tsx,js,jsx}', './app/**/*.{ts,tsx,js,jsx}'];

const config = {
  overwrite: true,
  concurrency: 1,
  pluckConfig,
  generates: {
    'storefrontapi.generated.d.ts': {
      preset,
      schema: getSchema('storefront'),
      documents: [
        ...sharedDocuments,
        '!./app/graphql/customer-account/**/*.{ts,tsx,js,jsx}',
      ],
    },
    'customer-accountapi.generated.d.ts': {
      preset,
      schema: getSchema('customer-account'),
      documents: ['./app/graphql/customer-account/**/*.{ts,tsx,js,jsx}'],
    },
  },
} as CodegenConfig;

export default config;
