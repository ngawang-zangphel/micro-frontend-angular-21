import { Injectable, Type } from '@angular/core';
import { federation } from '../main';

export async function loadRemoteComponent(
  port: number,
  remoteName: string,
): Promise<Type<unknown>> {
  const runtime = await federation;
  const withRemote = await runtime.initRemoteEntry(
    `http://localhost:${port}/remoteEntry.json`,
    remoteName,
  );
  const remoteModule = await withRemote.loadRemoteModule(remoteName, './Component');
  return (remoteModule as { App: Type<unknown> }).App;
}

@Injectable({ providedIn: 'root' })
export class MicroFrontend {
  loadRemoteComponent(port: number, remoteName: string): Promise<Type<unknown>> {
    return loadRemoteComponent(port, remoteName);
  }
}
