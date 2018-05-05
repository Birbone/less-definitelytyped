import * as fs from "fs";
import * as mkpath from "mkpath";
import * as path from "path";

interface ITypingsOutput{
    save(typingsContent: string): Promise<void>;
}

class FileTypingsOutput implements ITypingsOutput {
    constructor(private fileName: string) {
    }

    public save(typingsContent: string): Promise<void> {
        return new Promise((resolve, reject) => {
            mkpath(path.dirname(this.fileName), (err) => {
                if (err) {
                    return reject(err);
                }
                fs.writeFile(this.fileName, typingsContent, err => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve();
                });
            });
        });
    }
}

class TypingsOutputFactory {
    public file(fileName: string) {
        return new FileTypingsOutput(fileName);
    }
}

const typingsOutput = new TypingsOutputFactory();

export default typingsOutput;