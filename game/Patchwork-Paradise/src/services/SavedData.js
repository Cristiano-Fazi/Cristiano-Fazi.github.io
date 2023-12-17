import ObjectStore from "./ObjectStore.js";

export default class SavedData {
    constructor() {
        this.money = 500;
        this.objectStore = new ObjectStore()

    }
}