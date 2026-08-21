import { createMemo, createSignal, For, onMount } from "solid-js";
import { entryStore } from "../../store/entries";
import EntryRow from "./EntryRow";
import { CalCheckIcon, CartLeft, CartRight } from "../../functions/icons";
import EntryCopyDel from "./EntryCopyDel";
import { configStore } from "../../store/configs";
import Totals from "./Totals";

function EntryCard() {

  const [selectedIds, setSelectedIds] = createSignal<number[]>([]);

  const handleSelect = (id: number, checked: boolean) => {
    setSelectedIds(ids =>
      checked
        ? [...ids, id]
        : ids.filter(x => x !== id)
    );
  };

  const handleClearSelected = () => {
    setSelectedIds([]);
  }

  const handleDate = (date: string) => {
    entryStore.setEntryDate(date);
    entryStore.reload();
  }

  onMount(() => {
    entryStore.reload();
  });

  const groupedEntries = createMemo(() => {
    const groups = new Map<string, typeof entryStore.entries>();

    for (const entry of entryStore.entries) {
      const tag = entry.Tag || "";

      if (!groups.has(tag)) {
        groups.set(tag, []);
      }

      groups.get(tag)!.push(entry);
    }
    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
  });

  return (
  <div class="card border-primary">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <div class="d-flex justify-content-between">
          <select class="form-select form-select-sm w-auto" value={entryStore.mealTag()}
            onChange={e => entryStore.saveMealTag(e.currentTarget.value)} title="Meal">
            {[1, 2, 3, 4, 5, 6, 7].map(n => (
              <option value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div class="d-flex justify-content-between">
          <div class="my-btn py-1 px-2" onClick={() => entryStore.moveDate(-1)} title="Previous Day"><CartLeft /></div>
          <input type="date" class="form-control form-control-sm w-auto" value={entryStore.entryDate()} onChange={(e) => handleDate(e.currentTarget.value)}></input>
          <div class="my-btn py-1 px-2" onClick={() => entryStore.moveDate(1)} title="Next Day"><CartRight /></div>
        </div>
        <div class="my-btn py-1 px-2 ms-3" onClick={() => {configStore.syncDate(); handleDate(configStore.today())}} title="Today"><CalCheckIcon /></div>
      </div>
    </div>
    <div class="card-body table-responsive">
      <table class="table table-sm table-hover table-borderless">
        <tbody>
          <For each={groupedEntries()}>{([tag, entries]) => (
            <>
              <tr><td colspan="100%" class="p-0 text-muted small" title="Meal">{tag}</td></tr>
              <For each={entries}>{(entry) =>
                <EntryRow food={entry} onSelect={handleSelect} />}</For>
            </>
          )}</For>
          <EntryCopyDel ids={selectedIds()} clearSelected={handleClearSelected}></EntryCopyDel>
        </tbody>
      </table>
      <hr></hr>
      <Totals></Totals>
    </div>
  </div>
  )
}

export default EntryCard
