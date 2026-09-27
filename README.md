# Angular micro frontends

Three Angular apps composed with Native Federation. The host loads each remote at runtime from that remote's port.

| App | Folder | Port | Role |
| --- | --- | --- | --- |
| Host | `host` | 4200 | Shell that creates the remote components |
| Users | `users` | 4201 | Remote |
| Announcements | `announcements` | 4202 | Remote |

Node `>=24.16.0` is required (`@softarc/native-federation-orchestrator` declares that engine).

## Run

Install dependencies in each app, then start all three. Remotes must be up before the host loads them.

```bash
cd users && npm install && ng serve --port=4201
cd announcements && npm install && ng serve --port=4202
cd host && npm install && ng serve
```

Open http://localhost:4200/. The host shell renders first, then the users and announcements components appear under the nav.

## How a remote is exposed

Each remote's `federation.config.mjs` exposes its root component as `./Component`. The class in that file is `App`, not `AppComponent`.

```js
exposes: {
  './Component': './src/app/app.ts',
},
```

`users/federation.config.mjs` and `announcements/federation.config.mjs` both use that shape. The remote name is `users` or `announcements`.

## How the host starts federation

`host/src/main.ts` calls `initFederation` once and exports that promise. Bootstrap waits on the same promise. Do not call `initFederation` again from a service.

```ts
export const federation = initFederation('federation.manifest.json', {
  hostRemoteEntry: { url: './remoteEntry.json' },
});

federation
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));
```

`host/public/federation.manifest.json` can list known remotes. A remote whose port is chosen at runtime does not have to be in that file.

## How the host loads a remote

`MicroFrontend.loadRemoteComponent(port, remoteName)` uses the federation promise from `main.ts`:

1. `initRemoteEntry` registers `http://localhost:${port}/remoteEntry.json`.
2. `loadRemoteModule(remoteName, './Component')` loads the exposed file.
3. The method returns that module's `App` class.

```ts
const withRemote = await runtime.initRemoteEntry(
  `http://localhost:${port}/remoteEntry.json`,
  remoteName,
);
const remoteModule = await withRemote.loadRemoteModule(remoteName, './Component');
return remoteModule.App;
```

In the host component, pass that class to `createComponent`. The return value is already the component class, so do not read `.App` or `.AppComponent` off it.

```ts
const UsersComponent = await this.microFrontendService.loadRemoteComponent(4201, 'users');
const ref = this.usersContainer.createComponent(UsersComponent);
ref.changeDetectorRef.detectChanges();
```

Announcements is the same call with port `4202` and remote name `announcements`. The template needs a `ViewContainerRef` target for each remote (`#users`, `#announcements`).
