import Basic from "../components/Config/Basic"
import Plan from "../components/Config/Plan"

function Config() {

  return (
    <div class="row mb-4">
      <div class="col-md mt-4">
        <Basic></Basic>
      </div>
      <div class="col-md mt-4">
        <Plan></Plan>
      </div>
    </div>
  )
}

export default Config