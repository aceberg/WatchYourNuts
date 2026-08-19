import { createSignal } from "solid-js";
import { formatNumber } from "../../functions/format";
import { IconLink } from "../../functions/icons";
import PopInfo from "../All/PopInfo";

function BothRow(_props: any) {

  const [showInfo, setShowInfo] = createSignal<boolean>(false);

  return (
    <>
      <td class="small" title={_props.food.Name}
        style={{"max-width": "150px", overflow: "hidden", "text-overflow": "ellipsis",
        "white-space": "nowrap"}}>{_props.food.Name}</td>
      <td class="small" title={_props.food.Link}>
        {_props.food.Link && <IconLink />}
      </td>
      <td>
        <div class="position-relative">
          <div class="small my-btn" title="Show more" onClick={() => setShowInfo(true)}>
            {formatNumber(_props.food.Kcal)}<sub class="opacity-50 small"> k</sub>
          </div>
          <PopInfo
              show={showInfo()}
              message={
                <table class="table table-sm table-borderless">
                  <tbody>
                    <tr>
                      <td>Protein</td>
                      <td>{formatNumber(_props.food.Prot)}</td>
                    </tr>
                    <tr>
                      <td>Fat</td>
                      <td>{formatNumber(_props.food.Fat)}</td>
                    </tr>
                    <tr>
                      <td>Carb</td>
                      <td>{formatNumber(_props.food.Carb)}</td>
                    </tr>
                  </tbody>
                </table>
              }
              onCancel={() => setShowInfo(false)}
            />
        </div>
      </td>
    </>
  )
}

export default BothRow
