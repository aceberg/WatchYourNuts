import { configStore } from "../../store/configs"
import { entryStore } from "../../store/entries"
import ProgressBar from "../All/ProgressBar"

function Totals() {

  return (
    <div class="table-responsive">
      <table class="table table-sm table-hover table-borderless">
        <tbody>
          <tr>
            <td class="small">Protein</td>
            <ProgressBar plan={configStore.config.Protein} total={entryStore.total.Prot}></ProgressBar>
          </tr>
          <tr>
            <td class="small">Fat</td>
            <ProgressBar plan={configStore.config.Fat} total={entryStore.total.Fat}></ProgressBar>
          </tr>
          <tr>
            <td class="small">Carbs</td>
            <ProgressBar plan={configStore.config.Carbs} total={entryStore.total.Carb}></ProgressBar>
          </tr>
          <tr>
            <td class="small">Calories</td>
            <ProgressBar k={true} plan={configStore.config.Calories} total={entryStore.total.Kcal}></ProgressBar>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Totals
