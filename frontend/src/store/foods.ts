import { createStore } from "solid-js/store";
import { Food } from "../functions/models";
import { apiAddFood, apiDelFood, apiGetFoods } from "../functions/api";


const [foods, setFoods] = createStore<Food[]>([]);
const [groups, setGroups] = createStore<string[]>([]);
const [tags, setTags] = createStore<string[]>([]);

async function reload() {

    const data = await apiGetFoods();
    
    if (data !== null) {
        setFoods(data);
        
        setGroups([...new Set(foods
            .map(food => food.Group)
            .filter(group => group !== ""))]);

        setTags([...new Set(foods
            .map(food => food.Tag)
            .filter(group => group !== ""))]);
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

export const foodStore = {
    foods,
    groups,
    tags,

    add,
    reload,
    remove,
};
