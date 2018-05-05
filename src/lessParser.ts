import * as less from "less";

class LessParser {
    public async getUsedClasses(lessContent: string, fileName: string): Promise<string[]> {
        const lessTree = await less.parse(lessContent, {filename: fileName});
        const resultNames: Array<string> = [];
        new LessTreeVisitor(resultNames).run(lessTree);
        const elementsProcessor = new LessElementsProcessor();
        const classesNames = resultNames.map(elementsProcessor.process)
            .filter(e => e);
        const hash:any = {};
        for (const cn of classesNames) {
            hash[cn as string] = cn;
        }
        const result = [];
        for (const cn in hash) {
            result.push(cn);
        }
        console.log(result);
        return result;
    }
}

class LessElementsProcessor {
    process(element: string) {
        const matchResult = element.match(/^\.([^()]+)$/);
        return matchResult && matchResult[1];
    }
}

class LessTreeVisitor {
    constructor(private resultNames: Array<string>){
    }

    run(root: any) {
        var visitor = new less.visitors.Visitor(this);
        visitor.visit(root);
    }

    visitElement(element: any) {
        this.resultNames.push(element.value);
    }

    visitMixinCall(mixinCall: any, visitArgs: any) {
        visitArgs.visitDeeper = false;
    }
}

const lessParser = new LessParser();

export default lessParser;