import { initFederation } from '@angular-architects/native-federation-v4';

export const federation = initFederation('federation.manifest.json', {
  hostRemoteEntry: { url: "./remoteEntry.json" }
});

federation
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));