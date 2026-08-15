import { createStore } from "solid-js/store";
import { apiDelEntry, apiGetEntries } from "../functions/api";
import { Food } from "../functions/models";

const [entries, setEntries] = createStore<Food[]>([]);

async function reload() {
    const data = await apiGetEntries("");
        
    if (data !== null) {
        setEntries(data);
    }
}

async function remove(id: number) {
    await apiDelEntry(id);
    await reload();
}

export const entryStore = {
    entries,

    reload,
    remove,
};
