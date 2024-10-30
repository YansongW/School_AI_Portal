class Storage {
  private prefix: string;

  constructor(prefix = 'app') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}_${key}`;
  }

  set(key: string, value: any, expire?: number): void {
    const data = {
      value,
      expire: expire ? new Date().getTime() + expire * 1000 : null,
    };
    localStorage.setItem(this.getKey(key), JSON.stringify(data));
  }

  get(key: string): any {
    const item = localStorage.getItem(this.getKey(key));
    if (!item) return null;

    const data = JSON.parse(item);
    if (data.expire && data.expire < new Date().getTime()) {
      this.remove(key);
      return null;
    }

    return data.value;
  }

  remove(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .forEach(key => localStorage.removeItem(key));
  }
}

export default new Storage(); 