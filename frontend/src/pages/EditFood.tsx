import { useParams } from "@solidjs/router";
import EditFoodForm from "../components/EditFood/EditFoodForm";
import { emptyFood } from "../functions/models";
import { foodStore } from "../store/foods";


function EditFood() {

  const params = useParams();
  const id = Number(params.id);

  const food = () =>
    id === 0
      ? {...emptyFood, Size: 100,}
      : foodStore.foods.find((f) => f.ID === id) ?? {...emptyFood, Size: 100,};

  return (
    <div class="row mb-4">
      <div class="col-md mt-4">
        <EditFoodForm food={food()}></EditFoodForm>
      </div>
      <div class="col-md mt-4">
      </div>
    </div>
  )
}

export default EditFood