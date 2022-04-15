import { entity } from "simpler-state";

export const roomEntity = entity([]);

export const setRoom = (persons) => {
    roomEntity.set(persons)
};

export const addPerson = (person) => {
    var persons = roomEntity.get();
    roomEntity.set([...persons, person]);
}

export const removePerson = (person) => {
    var persons = roomEntity.get();
    roomEntity.set(persons.filter(p => p !== person));
}