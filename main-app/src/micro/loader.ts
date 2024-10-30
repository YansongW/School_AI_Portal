import { loadMicroApp } from 'qiankun';
import type { LoadableApp } from 'qiankun';
import { initMicroAppCommunication } from './communication';

interface AppConfig extends LoadableApp {
  title: string;
  icon?: string;
}

class MicroAppLoader {
  private apps: Map<string, AppConfig> = new Map();
  private mountedApps: Map<string, any> = new Map();

  registerApp(appConfig: AppConfig) {
    this.apps.set(appConfig.name, appConfig);
  }

  async loadApp(name: string, container: string) {
    const app = this.apps.get(name);
    if (!app) {
      throw new Error(`App ${name} not found`);
    }

    if (this.mountedApps.has(name)) {
      return this.mountedApps.get(name);
    }

    const microApp = loadMicroApp({
      ...app,
      container: `#${container}`,
    });

    this.mountedApps.set(name, microApp);
    initMicroAppCommunication(name);

    return microApp;
  }

  async unloadApp(name: string) {
    const app = this.mountedApps.get(name);
    if (app) {
      await app.unmount();
      this.mountedApps.delete(name);
    }
  }

  getRegisteredApps() {
    return Array.from(this.apps.values());
  }

  getMountedApps() {
    return Array.from(this.mountedApps.keys());
  }
}

export default new MicroAppLoader(); 