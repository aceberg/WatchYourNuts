import { createStore } from "solid-js/store";
import { apiAddEntry, apiDelEntry, apiGetEntries } from "../functions/api";
import { emptyFood, Food } from "../functions/models";
import { createSignal } from "solid-js";
import { configStore } from "./configs";

const [entries, setEntries] = createStore<Food[]>([]);
const [entryDate, setEntryDate] = createSignal<string>(configStore.today());
const [total, setTotal] = createSignal<Food>(emptyFood);

function changeDate(date: string, days: number): string {
  const [year, month, day] = date.split("-").map(Number);

  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() + days);

  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

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

async function remove(id: number) {
    await apiDelEntry(id);
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

export const entryStore = {
    entries,
    entryDate,
    total,

    add,
    reload,
    remove,
    moveDate,
};
