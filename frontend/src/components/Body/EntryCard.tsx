import { For, onMount } from "solid-js";
import { entryStore } from "../../store/entries";
import EntryRow from "./EntryRow";
import TabHead from "./TabHead";

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
            <TabHead></TabHead>
          </tr>
        </thead>
        <tbody>
          <For each={entryStore.entries}>{(entry) =>
            <EntryRow food={entry}></EntryRow>
          }</For>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default EntryCard
