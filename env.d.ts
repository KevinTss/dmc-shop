/// <reference types="vite/client" />
/// <reference types="react-router" />
/// <reference types="@shopify/oxygen-workers-types" />
/// <reference types="@shopify/hydrogen/react-router-types" />

import type {HydrogenEnv} from '@shopify/hydrogen';
import type {createHydrogenRouterContext} from '~/lib/context';

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

interface Env extends HydrogenEnv {}

interface AppLoadContext
  extends Awaited<ReturnType<typeof createHydrogenRouterContext>> {}
