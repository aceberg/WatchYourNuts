import { createStore } from "solid-js/store";
import { Food } from "../functions/models";
import { apiDelFood, apiGetFoods } from "../functions/api";


const [foods, setFoods] = createStore<Food[]>([]);
// const [list, setList] = createStore<string[]>([]);

async function reload() {

    const data = await apiGetFoods();
    
    if (data !== null) {
        setFoods(data);
    }
}

async function remove(id: number) {
    await apiDelFood(id);

    await reload();
}

export const foodStore = {
    foods,

    reload,
    remove,
};
