import { For, onMount } from "solid-js";
import { entryStore } from "../../store/entries";
import EntryRow from "./EntryRow";
import TabHead from "./TabHead";
import { CartLeft, CartRight } from "../../functions/icons";
import BothRow from "./BothRow";

function EntryCard() {

  onMount(async () => {
    await entryStore.reload();
  });

  return (
  <div class="card border-primary">
    <div class="card-header">
      <div class="d-flex justify-content-center">
        <div class="my-btn py-1 px-2" onClick={() => entryStore.moveDate(-1)}>
          <CartLeft></CartLeft>
        </div>
        <input type="date" class="form-control form-control-sm w-auto" value={entryStore.entryDate()}></input>
        <div class="my-btn py-1 px-2" onClick={() => entryStore.moveDate(1)}>
          <CartRight></CartRight>
        </div>
      </div>
    </div>
    <div class="card-body table-responsive">
      <table class="table table-sm table-hover table-borderless">
        <thead>
          <tr>
            <th></th>
            <TabHead></TabHead>
          </tr>
        </thead>
        <tbody>
          <For each={entryStore.entries}>{(entry) =>
            <EntryRow food={entry}></EntryRow>
          }</For>
          <tr><td colSpan={7}><hr></hr></td></tr>
          <tr><td colSpan={7}><b>Total</b></td></tr>
          <tr>
            <td></td>
            <BothRow food={entryStore.total()}></BothRow>
            <td>{entryStore.total().Size}<sub class="opacity-50 small"> G</sub></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default EntryCard
