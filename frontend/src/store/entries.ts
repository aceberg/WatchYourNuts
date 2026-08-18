import { createStore } from "solid-js/store";
import { apiAddEntry, apiDelEntry, apiGetEntries } from "../functions/api";
import { emptyFood, Food } from "../functions/models";
import { createSignal } from "solid-js";
import { configStore } from "./configs";
import { changeDate } from "../functions/format";

const [entries, setEntries] = createStore<Food[]>([]);
const [entryDate, setEntryDate] = createSignal<string>(configStore.today());
const [total, setTotal] = createSignal<Food>(emptyFood);
const [mealTag, setMealTag] = createSignal<string>("1");

async function reload() {

    if (entryDate() === "") {
        setEntryDate(configStore.today());
    }

    const data = await apiGetEntries(entryDate());
        
    if (data !== null) {
        setEntries(data);

        setTotal({
            ...emptyFood,
            Prot: data.reduce((sum: number, e: Food) => sum + e.Prot, 0),
            Fat:  data.reduce((sum: number, e: Food) => sum + e.Fat, 0),
            Carb: data.reduce((sum: number, e: Food) => sum + e.Carb, 0),
            Kcal: data.reduce((sum: number, e: Food) => sum + e.Kcal, 0),
            Size: data.reduce((sum: number, e: Food) => sum + e.Size, 0),
        });
    }
}

async function remove(idsArray: number[]) {
    
    const ids = new Set(idsArray);

    for (const entry of entries) {
      if (ids.has(entry.ID)) {
        await apiDelEntry(entry.ID);
      }
    }
    await reload();
}

async function add(food: Food, size: number) {

    await apiAddEntry({
        ...food,
        Prot: Math.round((food.Prot / food.Size) * size),
        Fat:  Math.round((food.Fat  / food.Size) * size),
        Carb: Math.round((food.Carb / food.Size) * size),
        Kcal: Math.round((food.Kcal / food.Size) * size),
        Size: size,
    });
    await reload();
};

async function moveDate(days: number) {

    setEntryDate(changeDate(entryDate(), days));
    await reload();
}

async function copyToDate(idsArray: number[], date: string) {
    
    const ids = new Set(idsArray);

    for (const entry of entries) {
      if (ids.has(entry.ID)) {
        await apiAddEntry({
            ...entry,
            ID: 0,
            Date: date,
        });
      }
    }
    await reload();
}

async function updMealTag(idsArray: number[]) {
    
    const ids = new Set(idsArray);

    for (const entry of entries) {
      if (ids.has(entry.ID)) {
        await apiAddEntry({
            ...entry,
            Tag: mealTag(),
        });
      }
    }
    await reload();
}

export const entryStore = {
    entries,
    entryDate,
    total,
    mealTag,

    setEntryDate,
    setMealTag,

    add,
    reload,
    remove,
    moveDate,
    copyToDate,
    updMealTag,
};
