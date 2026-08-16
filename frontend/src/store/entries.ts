import { createStore } from "solid-js/store";
import { apiAddEntry, apiDelEntry, apiGetEntries } from "../functions/api";
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

async function add(food: Food, size: number, date: string) {

    await apiAddEntry({
        ...food,
        ID:   0,
        Date: date,
        Size: size,
        Prot: Math.round((food.Prot / 100) * size),
        Fat:  Math.round((food.Fat  / 100) * size),
        Carb: Math.round((food.Carb / 100) * size),
        Kcal: Math.round((food.Kcal / 100) * size),
    });
    await reload();
};

export const entryStore = {
    entries,

    add,
    reload,
    remove,
};
