import { createStore } from "solid-js/store";
import { Food } from "../functions/models";
import { apiAddFood, apiDelFood, apiGetFoods } from "../functions/api";
import { createSignal } from "solid-js";


const [foods, setFoods] = createStore<Food[]>([]);
const [groups, setGroups] = createStore<string[]>([]);
const [tags, setTags] = createStore<string[]>([]);

const [selectedGroup, setSelectedGroup] = createSignal<string>(localStorage.getItem("selectedGroup") || "");

async function reload() {

    const data = await apiGetFoods();

    if (data !== null) {
        setFoods(data);
        
        setGroups([...new Set(foods
            .map(food => food.Group)
            .filter(group => group !== ""))].sort());

        setTags([...new Set(foods
            .map(food => food.Tag)
            .filter(group => group !== ""))].sort());
    }
}

async function remove(id: number) {
    
    await apiDelFood(id);
    await reload();
}

async function add(food: Food) {

    await apiAddFood(food);
    await reload();
}

function saveSelectedGroup(group: string) {

    localStorage.setItem("selectedGroup", group);
    setSelectedGroup(group);
}

export const foodStore = {
    foods,
    groups,
    tags,
    selectedGroup,

    add,
    reload,
    remove,
    saveSelectedGroup,
};
