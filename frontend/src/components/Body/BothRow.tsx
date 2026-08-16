import { formatNumber } from "../../functions/format";

function BothRow(_props: any) {

  return (
    <>
      <td>{_props.food.Name}</td>
      <td>{formatNumber(_props.food.Prot)}<sub class="opacity-50 small"> P</sub></td>
      <td>{formatNumber(_props.food.Fat)}<sub class="opacity-50 small"> F</sub></td>
      <td>{formatNumber(_props.food.Carb)}<sub class="opacity-50 small"> C</sub></td>
      <td>{formatNumber(_props.food.Kcal)}<sub class="opacity-50 small"> K</sub></td>
    </>
  )
}

export default BothRow
