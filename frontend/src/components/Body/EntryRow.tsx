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
        <input type="checkbox" class="form-check-input" title="Select"
        onChange={(e) =>_props.onSelect(_props.food.ID, e.currentTarget.checked)}>
        </input>
      </td>
      <BothRow food={_props.food}></BothRow>
      <td class="d-flex justify-content-between p-0" style="width: 6em">
        <input
          type="number" step="10" title="Portion Size (g)"
          class="form-control form-control-sm p-0 ps-1"
          value={size()} onInput={(e) => setSize(Number(e.currentTarget.value))}
        />
        <div class="my-btn px-1" onClick={handleSave} title="Save">
          <IconCheck></IconCheck>
        </div>
      </td>
    </tr>
  )
}

export default EntryRow
