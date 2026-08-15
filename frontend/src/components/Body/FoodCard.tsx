import { createMemo, createSignal, For, onMount } from "solid-js";
import { foodStore } from "../../store/foods";
import { formatNumber } from "../../functions/format";
import { IconRight, PencilIcon } from "../../functions/icons";

function FoodCard() {

  const [selectedGroup, setSelectedGroup] = createSignal("");

  const filteredFoods = createMemo(() => {
    const group = selectedGroup();

    return group
    ? foodStore.foods.filter(food => food.Group === group)
    : foodStore.foods;
  });

  onMount(async () => {
    await foodStore.reload();
  });

  return (
  <div class="card border-primary">
    <div class="card-header">
      <select class="form-select form-select-sm w-auto"
        onChange={e => setSelectedGroup(e.currentTarget.value)}>
          <option value=""></option>
          <For each={foodStore.groups}>{(group) =>
            <option value={group}>{group}</option>
          }</For>
      </select>
    </div>
    <div class="card-body table-responsive">
      <table class="table table-sm table-hover table-borderless">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Prot</th>
            <th>Fat</th>
            <th>Carb</th>
            <th>KCal</th>
            <th>Size</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <For each={filteredFoods()}>{food =>
            <tr>
              <td class="my-btn"><PencilIcon></PencilIcon></td>
              <td>{food.Name}</td>
              <td>{formatNumber(food.Prot)}<sub class="opacity-50 small"> P</sub></td>
              <td>{formatNumber(food.Fat)}<sub class="opacity-50 small"> F</sub></td>
              <td>{formatNumber(food.Carb)}<sub class="opacity-50 small"> C</sub></td>
              <td>{formatNumber(food.Kcal)}<sub class="opacity-50 small"> K</sub></td>
              <td>{food.Size}<sub class="opacity-50 small"> G</sub></td>
              <td class="my-btn"><IconRight></IconRight></td>
            </tr>
          }</For>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default FoodCard
