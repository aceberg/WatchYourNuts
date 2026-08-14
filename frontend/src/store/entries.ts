import { createStore } from "solid-js/store";
import { apiDelEntry, apiGetEntries } from "../functions/api";
import { Entry } from "../functions/models";

const [entries, setEntries] = createStore<Entry[]>([]);

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
