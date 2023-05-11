import { Puppy } from "./types";

export const idIncrementer = (db:Puppy[]) => {
    //find the highest id in the db
    const highestId = db.reduce((acc:number, curr:Puppy) => {
        if (curr.id > acc) {
            return curr.id;
        }
        else {
            return acc;
        }
    }
    , 0);
    //increment the highest id by 1
    const newId = highestId + 1;
    return newId;
};