class TypingsFormatter {
    public format(classes: string[]): string {
        return classes.map(c => `export const ${c}: string;`)
            .join("\n");
    }
}

const typingsFormatter = new TypingsFormatter();
export default typingsFormatter;