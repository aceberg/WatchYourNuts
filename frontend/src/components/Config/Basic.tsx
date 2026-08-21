import { For, Show } from "solid-js";
import { apiPath } from "../../functions/api"
import { configStore } from "../../store/configs";
import { Conf } from "../../functions/models";
import { createStore } from "solid-js/store";

function Basic() {

  const themes = ["cerulean", "cosmo", "cyborg", "darkly", "emerald", "flatly", "grass", "grayscale", "journal", "litera", "lumen", "lux", "materia", "minty", "morph", "ocean", "pulse", "quartz", "sand", "sandstone", "simplex", "sketchy", "slate", "solar", "spacelab", "superhero", "united", "vapor", "wood", "yeti", "zephyr"];

  const [conf, setConf] = createStore<Conf>(configStore.config);

  const handleTheme = (theme:string) => {
    setConf("Theme", theme);
    configStore.setThemePath(apiPath+"/fs/public/themes/"+theme+"/bootstrap.min.css");
  };

  const handleColor = (color:string) => {
    setConf("Color", color);
    configStore.changeBackColor(color);
  };

  const submit = (e: SubmitEvent) => {
    e.preventDefault();

    configStore.add(conf);
  };

  return (
    <div class="card border-primary">
      <div class="card-header">
        Basic config (<a href={`https://github.com/aceberg/WatchYourNuts/releases/tag/v${configStore.config.Version}`} target="_blank">v{configStore.config.Version}</a>)
      </div>
      <div class="card-body table-responsive">
        <form onSubmit={submit}>
          <table class="table table-borderless">
          <tbody>
            <tr>
              <td>Host</td>
              <td><input name="host" type="text" class="form-control" value={conf.Host}   onInput={(e) => setConf("Host", e.currentTarget.value)}></input></td>
            </tr>
            <tr>
              <td>Port</td>
              <td><input name="port" type="text" class="form-control" value={conf.Port} onInput={(e) => setConf("Port", e.currentTarget.value)}></input></td>
            </tr>
            <tr>
              <td>Theme</td>
              <td>
                <select name="theme" class="form-select" onChange={(e)=>handleTheme(e.currentTarget.value)}>
                <For each={themes}>{theme =>
                  <Show
                    when={theme == conf.Theme}
                    fallback={<option value={theme}>{theme}</option>}
                  >
                    <option value={theme} selected>{theme}</option>
                  </Show>
                }</For>
                </select>
              </td>
            </tr>
            <tr>
               <td>Color mode</td>
               <td>
                <select name="color" class="form-select" onChange={(e)=>handleColor(e.currentTarget.value)}>
                <Show
                  when={conf.Color == "dark"}
                  fallback={<>
                    <option value="dark">dark</option>
                    <option value="light" selected>light</option>
                  </>}
                >
                  <option value="dark" selected>dark</option>
                  <option value="light">light</option>
                </Show>
                </select>
               </td>
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

export default Basic