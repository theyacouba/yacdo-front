import { Repeat } from "../enums/repeat";

export class Todo {

    constructor(public title: string, public isDone: Boolean, public description?: string, public deadline?: Date, public repetition?: Repeat) { }

    id!: number;
    // title!: string;
    // description!: string;
    // deadline!: Date;
    // repetition!: Repeat;
    // isDone!: Boolean;
}
