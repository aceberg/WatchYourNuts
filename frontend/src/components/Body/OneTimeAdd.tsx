import { createStore } from "solid-js/store";
import { emptyFood, Food } from "../../functions/models";
import { formatNumber, stringToNumber } from "../../functions/format";
import { entryStore } from "../../store/entries";

export default function OneTimeAdd() {
  const [food, setFood] = createStore<Food>({...emptyFood, Size: 100});

  const submit = (e: SubmitEvent) => {
      e.preventDefault();
  
      entryStore.add({...food, ID: 0, Size: 100, Tag: entryStore.mealTag(), Date: entryStore.entryDate(),}, food.Size);
      setFood({...emptyFood, Size: 100});
    };

  return (
    <form class="input-group input-group-sm mb-2" onSubmit={submit}>
      <input class="form-control w-auto" placeholder="Name" value={food.Name}
        onInput={(e) => setFood("Name", e.currentTarget.value)}/>
      <input class="form-control" value={formatNumber(food.Prot)} title="Protein"
        onInput={(e) => setFood("Prot", stringToNumber(e.currentTarget.value))}/>
      <input class="form-control" value={formatNumber(food.Fat)} title="Fat"
        onInput={(e) => setFood("Fat", stringToNumber(e.currentTarget.value))}/>
      <input class="form-control" value={formatNumber(food.Carb)} title="Carbs"
        onInput={(e) => setFood("Carb", stringToNumber(e.currentTarget.value))}/>
      <input class="form-control" value={formatNumber(food.Kcal)} title="Calories"
        onInput={(e) => setFood("Kcal", stringToNumber(e.currentTarget.value))}/>
      <input class="form-control" value={food.Size} title="Size"
        onInput={(e) => setFood("Size", Number(e.currentTarget.value))}/>
      <button class="btn btn-primary">
        Add
      </button>
    </form>
  );
}