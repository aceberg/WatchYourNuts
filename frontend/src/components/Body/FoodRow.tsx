import { createSignal } from "solid-js";
import { IconRight, PencilIcon } from "../../functions/icons";
import { entryStore } from "../../store/entries";
import BothRow from "./BothRow";

function FoodRow(_props: any) {

  const [size, setSize] = createSignal(_props.food.Size);

  const handleAdd = () => {
    entryStore.add({..._props.food,ID: 0, Size: 100, Date: entryStore.entryDate(),}, size());
    setSize(_props.food.Size);
  };

  return (
    <tr>
      <td class="my-btn"><PencilIcon></PencilIcon></td>
      <BothRow food={_props.food}></BothRow>
      <td>
        <input
          type="number" step="10"
          class="form-control form-control-sm" style="width: 5em"
          value={size()} onInput={(e) => setSize(Number(e.currentTarget.value))}
        />
      </td>
      <td class="my-btn" onClick={handleAdd} title="Add"><IconRight></IconRight></td>
    </tr>
  )
}

export default FoodRow
