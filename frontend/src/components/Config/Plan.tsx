import { configStore } from "../../store/configs";
import { Conf } from "../../functions/models";
import { createStore } from "solid-js/store";
import { formatNumber, stringToNumber } from "../../functions/format";

function Plan() {

  const [conf, setConf] = createStore<Conf>(configStore.config);

  const submit = async (e: SubmitEvent) => {
    e.preventDefault();

    await configStore.add(conf);
  };

  return (
    <div class="card border-primary">
      <div class="card-header">Plan</div>
      <div class="card-body table-responsive">
        <form onSubmit={submit}>
          <table class="table table-borderless">
          <tbody>
            <tr>
              <td>Protein</td>
              <td><input class="form-control" type="text" value={formatNumber(conf.Protein)} onInput={(e) => setConf("Protein", stringToNumber(e.currentTarget.value))}/></td>
            </tr>
            <tr>
              <td>Fat</td>
              <td><input class="form-control" type="text" value={formatNumber(conf.Fat)} onInput={(e) => setConf("Fat", stringToNumber(e.currentTarget.value))}/></td>
            </tr>
            <tr>
              <td>Carbs</td>
              <td><input class="form-control" type="text" value={formatNumber(conf.Carbs)} onInput={(e) => setConf("Carbs", stringToNumber(e.currentTarget.value))}/></td>
            </tr>
            <tr>
              <td>Calories</td>
              <td><input class="form-control" type="text" value={formatNumber(conf.Calories)} onInput={(e) => setConf("Calories", stringToNumber(e.currentTarget.value))}/></td>
            </tr>
            <tr>
              <td><button type="submit" class="btn btn-primary">Save</button></td>
              <td></td>
            </tr>
          </tbody>
          </table>
        </form>
      </div>
    </div>
  )
}

export default Plan