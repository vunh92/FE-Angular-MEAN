export class Info {
    id: Number;
    name: string;
    age: number;

    constructor(
        id?: number,
        name?: string,
        age?: number
    ) {
        this.id = id || 0;
        this.name = name || '';
        this.age = age || 0;
    }
}