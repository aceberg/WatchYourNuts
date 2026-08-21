import { createMemo, createSignal, For, onMount } from "solid-js";
import { foodStore } from "../../store/foods";
import FoodRow from "./FoodRow";
import { IconPlus } from "../../functions/icons";

function FoodCard() {

  const [search, setSearch] = createSignal("");

  const filteredFoods = createMemo(() => {
    const group = foodStore.selectedGroup();
    const q = search().trim().toLowerCase();

    const groupMatch = group
    ? foodStore.foods.filter(food => food.Group === group || food.Tag === group)
    : foodStore.foods;

    return q
    ? groupMatch.filter(food => food.Name.toLowerCase().includes(q))
    : groupMatch;
  });

  onMount(() => {
    foodStore.reload();
  });

  return (
  <div class="card border-primary">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <select class="form-select form-select-sm w-auto" title="Filter by Tag or Group"
          onChange={e => foodStore.saveSelectedGroup(e.currentTarget.value)}>
            <option value="" selected={foodStore.selectedGroup() === ""}>ALL</option>
            <For each={foodStore.tags}>{(tag) =>
              <option value={tag} selected={foodStore.selectedGroup() === tag}>{tag}</option>
            }</For>
            <For each={foodStore.groups}>{(group) =>
              <option value={group} selected={foodStore.selectedGroup() === group}>{group}</option>
            }</For>
        </select>
        <input type="search" class="form-control form-control-sm w-25" title="Search" placeholder="Search" onInput={e => setSearch(e.currentTarget.value)} value={search()}></input>
        <a class="my-btn p-1 px-2" title="New" href={`/editfood/0`}>
          <IconPlus />
        </a>
      </div>
    </div>
    <div class="card-body table-responsive">
      <table class="table table-sm table-hover table-borderless">
        <tbody>
          <For each={filteredFoods()}>{food =>
            <FoodRow food={food}></FoodRow>
          }</For>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default FoodCard
