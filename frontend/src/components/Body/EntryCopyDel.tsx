import { createSignal, Show } from "solid-js"
import { entryStore } from "../../store/entries"
import { changeDate } from "../../functions/format"
import Confirm from "../All/Confirm";

function EntryCopyDel(_props: any) {

  const [copyDate, setCopyDate] = createSignal<string>(changeDate(entryStore.entryDate(), 1));
  const [confirmDelete, setConfirmDelete] = createSignal<boolean>(false);

  const handleDelete = async () => {
    
    setConfirmDelete(false);
    await entryStore.remove(_props.ids);
    _props.clearSelected();
  };

  const handleCopy = async () => {
    
    await entryStore.copyToDate(_props.ids, copyDate());
    _props.clearSelected();    
  };

  const handleMeal = async () => {
    
    await entryStore.updMealTag(_props.ids);
    _props.clearSelected();    
  };

  return (
    <tr><td colSpan={7}>
      <Show when={_props.ids.length > 0}>
        <div class="d-flex justify-content-between mt-1">
          <div class="input-group w-auto">
            <button class="btn btn-sm btn-primary" onClick={handleCopy}>Copy to</button>
            <input type="date" class="form-control form-control-sm"
              onChange={(e) => setCopyDate(e.currentTarget.value)}
              value={copyDate()}></input>
          </div>
          <button class="btn btn-sm btn-primary" onClick={handleMeal}
            title="Change Meal tag to current">Meal</button>
          <div class="position-relative">
            <button class="btn btn-sm btn-danger" onClick={() => setConfirmDelete(true)}>Delete</button>
            <Confirm
              show={confirmDelete()}
              message={`Delete ID: ${_props.ids}?`}
              onConfirm={handleDelete}
              onCancel={() => setConfirmDelete(false)}
            />
          </div>
        </div>
      </Show>
    </td></tr>
  )
}

export default EntryCopyDel
