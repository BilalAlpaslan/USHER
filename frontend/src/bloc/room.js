import { entity } from "simpler-state";

export const roomEntity = entity([]);

export const setAdress = (persons) => {
    roomEntity.set(persons)
};