import EntryCard from "../components/Body/EntryCard"
import FoodCard from "../components/Body/FoodCard"

function Body() {

  return (
  <>
  <div class="row mt-4">
    <div class="col-md mb-4">
      <FoodCard></FoodCard>
    </div>
    <div class="col-md mb-4">
      <EntryCard></EntryCard>
    </div>
  </div>
  </>
  )
}

export default Body
