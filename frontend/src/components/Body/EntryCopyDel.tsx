import { createSignal, Show } from "solid-js"
import { entryStore } from "../../store/entries"
import { changeDate } from "../../functions/format"

function EntryCopyDel(_props: any) {

  const [copyDate, setCopyDate] = createSignal<string>(changeDate(entryStore.entryDate(), 1));

  const handleDelete = async () => {
    if (confirm(`Delete ID: ${_props.ids}?`)) {
      await entryStore.remove(_props.ids);
      _props.clearSelected();
    }
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
    <tr><td colSpan={7} class="border-bottom">
      <Show when={_props.ids.length > 0}>
        <div class="d-flex justify-content-between">
          <div class="input-group w-auto">
            <button class="btn btn-sm btn-primary" onClick={handleCopy}>Copy to</button>
            <input type="date" class="form-control form-control-sm"
              onChange={(e) => setCopyDate(e.currentTarget.value)}
              value={copyDate()}></input>
          </div>
          <button class="btn btn-sm btn-primary" onClick={handleMeal}
            title="Change Meal tag to current">Meal</button>
          <button class="btn btn-sm btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </Show>
    </td></tr>
  )
}

export default EntryCopyDel
