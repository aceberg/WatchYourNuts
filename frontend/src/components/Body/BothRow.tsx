import { createResource, createSignal } from "solid-js";
import { formatNumber } from "../../functions/format";
import PopInfo from "../All/PopInfo";
import { apiGetLinkRes } from "../../functions/api";
import { entryStore } from "../../store/entries";

function BothRow(_props: any) {

  const [showInfo, setShowInfo] = createSignal<boolean>(false);

  const [linkRes] = createResource(
    () => [_props.food.Link, entryStore.linkRefresh()],
    ([link]) => link ? apiGetLinkRes(link) : ""
  );

  return (
    <>
      <td>
        <div class="small" title={_props.food.Name}>
          {_props.food.Name}
          {_props.food.Link && <sup class="opacity-75" title={_props.food.Link}>&nbsp;&nbsp;{linkRes()}</sup>}
        </div>
      </td>
      <td>
        <div class="position-relative">
          <div class="small my-btn rounded-0" title="Show more" onClick={() => setShowInfo(true)}>
            {formatNumber(_props.food.Kcal)}<sub class="opacity-50 small"> k</sub>
          </div>
          <PopInfo
              show={showInfo()}
              message={
                <table class="table table-sm table-borderless ms-2">
                  <tbody class="small">
                    <tr>
                      <td>Protein</td>
                      <td>{formatNumber(_props.food.Prot)}<sub class="opacity-50 small"> g</sub></td>
                    </tr>
                    <tr>
                      <td>Fat</td>
                      <td>{formatNumber(_props.food.Fat)}<sub class="opacity-50 small"> g</sub></td>
                    </tr>
                    <tr>
                      <td>Carbs</td>
                      <td>{formatNumber(_props.food.Carb)}<sub class="opacity-50 small"> g</sub></td>
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
