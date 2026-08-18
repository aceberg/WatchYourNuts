import { createStore } from "solid-js/store";
import { Food } from "../../functions/models";
import { foodStore } from "../../store/foods";
import { formatNumber, stringToNumber } from "../../functions/format";
import { SquareXIcon } from "../../functions/icons";
import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import Confirm from "../All/Confirm";

function EditFoodForm(_props: any) {

  const [food, setFood] = createStore<Food>(_props.food);
  const navigate = useNavigate();

  const submit = async (e: SubmitEvent) => {
    e.preventDefault();

    await foodStore.add(food);
    navigate("/");
  };

  const [confirmDelete, setConfirmDelete] = createSignal<boolean>(false);

  const handleDelete = async () => {
    setConfirmDelete(false);
    await foodStore.remove(food.ID);
    navigate("/");
  };

  return (
  <div class="card border-primary">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        {food.ID === 0 ? "Add" : "Edit"} Food
        {food.ID !== 0 &&
          <div class="position-relative">
            <div class="my-btn py-1 px-2" onClick={() => setConfirmDelete(true)}      title="Delete"><SquareXIcon></SquareXIcon></div>

            <Confirm
              show={confirmDelete()}
              message={`Delete ID: ${food.ID}?`}
              onConfirm={handleDelete}
              onCancel={() => setConfirmDelete(false)}
            />
          </div>
        }
      </div>
    </div>
    <div class="card-body table-responsive">
      <form onSubmit={submit}>
        <table class="table table-borderless"><tbody>
          <tr>
            <td>Name</td>
            <td><input class="form-control" type="text" name="name" value={food.Name} 
                onInput={(e) => setFood("Name", e.currentTarget.value)}/></td>
          </tr>
          <tr>
            <td>Group</td>
            <td><input class="form-control" type="text" name="group" value={food.Group} 
                onInput={(e) => setFood("Group", e.currentTarget.value)}/></td>
          </tr>
          <tr>
            <td>Tag</td>
            <td><input class="form-control" type="text" name="tag" value={food.Tag} 
                onInput={(e) => setFood("Tag", e.currentTarget.value)}/></td>
          </tr>
          <tr>
            <td>Prot / 100g</td>
            <td><input class="form-control" type="text" value={formatNumber(food.Prot)} 
                onInput={(e) => setFood("Prot", stringToNumber(e.currentTarget.value))}/></td>
          </tr>
          <tr>
            <td>Fat  / 100g</td>
            <td><input class="form-control" type="text" value={formatNumber(food.Fat)} 
                onInput={(e) => setFood("Fat", stringToNumber(e.currentTarget.value))}/></td>
          </tr>
          <tr>
            <td>Carb / 100g</td>
            <td><input class="form-control" type="text" value={formatNumber(food.Carb)} 
                onInput={(e) => setFood("Carb", stringToNumber(e.currentTarget.value))}/></td>
          </tr>
          <tr>
            <td>Kcal / 100g</td>
            <td><input class="form-control" type="text" value={formatNumber(food.Kcal)} 
                onInput={(e) => setFood("Kcal", stringToNumber(e.currentTarget.value))}/></td>
          </tr>
          <tr>
            <td>Portion Size (g)</td>
            <td><input class="form-control" type="number" value={food.Size}
                onInput={(e) => setFood("Size", Number(e.currentTarget.value))}/></td>
          </tr>
          <tr>
            <td>Link</td>
            <td><input class="form-control" type="url" value={food.Link} 
                onInput={(e) => setFood("Link", e.currentTarget.value)}/></td>
          </tr>
          <tr>
            <td>
              <button class="btn btn-primary" type="submit">Save</button>
            </td>
            <td></td>
          </tr>
        </tbody></table>
      </form>
    </div>
  </div>
  )
}

export default EditFoodForm
