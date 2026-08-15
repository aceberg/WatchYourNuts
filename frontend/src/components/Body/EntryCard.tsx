import { For, onMount } from "solid-js";
import { entryStore } from "../../store/entries";

function EntryCard() {

  onMount(async () => {
    await entryStore.reload();
  });

  return (
  <div class="card border-primary">
    <div class="card-header">
      Entry
    </div>
    <div class="card-body table-responsive">
      <table class="table table-sm table-hover table-borderless">
        <thead>
          <tr>
            <th>Name</th>
            <th>KCal</th>
          </tr>
        </thead>
        <tbody>
          <For each={entryStore.entries}>{(entry) =>
            <tr>
              <td>{entry.Name}</td>
              <td>{entry.Kcal}</td>
            </tr>
          }</For>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default EntryCard
