import { promises as fs } from 'fs';
import * as path from 'path';

const DIR = 'data';

export class JSONStorage<T> {
  public data: T;
  private filePath: string;

  constructor(fileName: string, defaultValue: T) {
    this.filePath = path.join(DIR, fileName);
    this.data = defaultValue;
  }

  public async load() {
    try {
      const readData = await fs.readFile(this.filePath, 'utf8');
      const parsedData = JSON.parse(readData);

      this.data = parsedData;
    } catch (e) {
      await this.save(this.data);
    }
  }

  public async save(data: T) {
    this.data = data;
    const stringifiedData = JSON.stringify(data);
    await fs.writeFile(this.filePath, stringifiedData);
  }
}
