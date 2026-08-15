import { createStore } from "solid-js/store";
import { Food } from "../functions/models";
import { apiDelFood, apiGetFoods } from "../functions/api";


const [foods, setFoods] = createStore<Food[]>([]);
const [groups, setGroups] = createStore<string[]>([]);

async function reload() {

    const data = await apiGetFoods();
    
    if (data !== null) {
        setFoods(data);
        setGroups(foods.map(food => food.Group));
    }
}

async function remove(id: number) {
    await apiDelFood(id);

    await reload();
}

export const foodStore = {
    foods,
    groups,

    reload,
    remove,
};
