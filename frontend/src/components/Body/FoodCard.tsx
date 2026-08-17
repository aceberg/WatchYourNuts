import { createMemo, createSignal, For, onMount } from "solid-js";
import { foodStore } from "../../store/foods";
import FoodRow from "./FoodRow";
import TabHead from "./TabHead";
import { IconPlus } from "../../functions/icons";

function FoodCard() {

  const [selectedGroup, setSelectedGroup] = createSignal("");

  const filteredFoods = createMemo(() => {
    const group = selectedGroup();

    return group
    ? foodStore.foods.filter(food => food.Group === group || food.Tag === group)
    : foodStore.foods;
  });

  onMount(async () => {
    await foodStore.reload();
  });

  return (
  <div class="card border-primary">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <select class="form-select form-select-sm w-auto"
          onChange={e => setSelectedGroup(e.currentTarget.value)}>
            <option value=""></option>
            <For each={foodStore.tags}>{(tag) =>
              <option value={tag}>{tag}</option>
            }</For>
            <For each={foodStore.groups}>{(group) =>
              <option value={group}>{group}</option>
            }</For>
        </select>
        <a class="my-btn p-1 px-2" title="New" href={`/editfood/0`}>
          <IconPlus />
        </a>
      </div>
    </div>
    <div class="card-body table-responsive">
      <table class="table table-sm table-hover table-borderless">
        <thead>
          <tr>
            <th style="width: 3em"></th>
            <TabHead></TabHead>
            <th></th>
          </tr>
        </thead>
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
