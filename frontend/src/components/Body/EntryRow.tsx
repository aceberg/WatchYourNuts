import BothRow from "./BothRow";

function EntryRow(_props: any) {

  return (
    <tr>
      <BothRow food={_props.food}></BothRow>
      <td>{_props.food.Size}<sub class="opacity-50 small"> G</sub></td>
      <td>
        <input type="checkbox" class="form-check-input"></input>
      </td>
    </tr>
  )
}

export default EntryRow
