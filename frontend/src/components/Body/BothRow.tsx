import { formatNumber } from "../../functions/format";
import { IconLink } from "../../functions/icons";

function BothRow(_props: any) {

  return (
    <>
      <td class="small" title={_props.food.Name}
        style={{"max-width": "150px", overflow: "hidden", "text-overflow": "ellipsis",
        "white-space": "nowrap"}}>{_props.food.Name}</td>
      <td class="small" title={_props.food.Link}>
        {_props.food.Link && <IconLink />}
      </td>
      {/* <td class="small" title="Protein">{formatNumber(_props.food.Prot)}<sub class="opacity-50 small"> P</sub></td>
      <td class="small" title="Fat">{formatNumber(_props.food.Fat)}<sub class="opacity-50 small"> F</sub></td>
      <td class="small" title="Carbs">{formatNumber(_props.food.Carb)}<sub class="opacity-50 small"> C</sub></td> */}
      <td class="small" title="Calories">{formatNumber(_props.food.Kcal)}<sub class="opacity-50 small"> K</sub></td>
    </>
  )
}

export default BothRow
