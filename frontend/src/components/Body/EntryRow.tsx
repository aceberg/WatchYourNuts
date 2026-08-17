import { createSignal } from "solid-js";
import BothRow from "./BothRow";
import { entryStore } from "../../store/entries";
import { IconCheck } from "../../functions/icons";

function EntryRow(_props: any) {

  const [size, setSize] = createSignal(_props.food.Size);

  const handleSave = () => {
    if (_props.food.Size != size()) {
      entryStore.add(_props.food, size());
    }
  };

  return (
    <tr>
      <td>
        <input type="checkbox" class="form-check-input"></input>
      </td>
      <BothRow food={_props.food}></BothRow>
      <td class="d-flex justify-content-center" style="width: 7em">
        <input
          type="number" step="10"
          class="form-control form-control-sm"
          value={size()} onInput={(e) => setSize(Number(e.currentTarget.value))}
        />
        <div class="my-btn p-1" onClick={handleSave} title="Save">
          <IconCheck></IconCheck>
        </div>
      </td>
    </tr>
  )
}

export default EntryRow
