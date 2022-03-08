import { entity } from "simpler-state";

export const roomEntity = entity([]);

export const setRoom = (persons) => {
    roomEntity.set(persons)
};