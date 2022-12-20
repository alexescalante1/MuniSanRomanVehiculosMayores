import {
  SetStorage,
  GetStorage,
} from "../../Domain/Interfaces/Protocols/Cache";

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: object): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }

  get(key: string): any {
    const DATA: any = localStorage.getItem(key);
    return JSON.parse(DATA);
  }
}
