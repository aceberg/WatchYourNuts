import { createStore } from "solid-js/store";
import { apiAddEntry, apiDelEntry, apiGetEntries } from "../functions/api";
import { emptyFood, Food } from "../functions/models";
import { createSignal } from "solid-js";
import { configStore } from "./configs";
import { changeDate } from "../functions/format";

const [entries, setEntries] = createStore<Food[]>([]);
const [entryDate, setEntryDate] = createSignal<string>(configStore.today());
const [total, setTotal] = createSignal<Food>(emptyFood);
const [mealTag, setMealTag] = createSignal<string>(localStorage.getItem("mealTag") || "1");
const [linkRefresh, setLinkRefresh] = createSignal(0);

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
    
    await Promise.all(
        entries
            .filter(entry => ids.has(entry.ID))
            .map(entry => apiDelEntry(entry.ID))
        );
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

    if (food.Link !== "") {
        setLinkRefresh(v => v + 1);
    }
};

async function moveDate(days: number) {

    setEntryDate(changeDate(entryDate(), days));
    await reload();
}

async function copyToDate(idsArray: number[], date: string) {
    
    const ids = new Set(idsArray);
    const selectedEntries = entries.filter(entry => ids.has(entry.ID));
    const hasLink = selectedEntries.some(entry => entry.Link !== "");

    await Promise.all(
        selectedEntries.map(entry =>
        apiAddEntry({
            ...entry,
            ID: 0,
            Date: date,
        })
        )
    );

    await reload();

    if (hasLink) {
        setLinkRefresh(v => v + 1);
    }
}

async function updMealTag(idsArray: number[]) {
    
    const ids = new Set(idsArray);

    await Promise.all(entries
        .filter(e => ids.has(e.ID))
        .map(entry =>
            apiAddEntry({
                ...entry,
                Tag: mealTag(),
            })
        )
    );
    await reload();
}

function saveMealTag(meal: string) {

    localStorage.setItem("mealTag", meal);
    setMealTag(meal);
}

export const entryStore = {
    entries,
    entryDate,
    total,
    mealTag,
    linkRefresh,

    setEntryDate,

    add,
    reload,
    remove,
    moveDate,
    copyToDate,
    updMealTag,
    saveMealTag,
};
