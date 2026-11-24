import { initSdk, setColorScheme } from '../src';

initSdk('channel-id', undefined, undefined, undefined, { colorScheme: 'dark' });

setColorScheme('auto');

// @ts-expect-error only "light", "dark" and "auto" are accepted
setColorScheme('sepia');
