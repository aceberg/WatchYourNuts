import { Show } from "solid-js";

interface ConfirmProps {
  show: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function Confirm(props: ConfirmProps) {
  return (
    <Show when={props.show}>
      <div
        class="position-absolute border rounded shadow p-2"
        style={{
          top: "100%",
          right: "0",
          "z-index": "1000",
          width: "220px",
          "min-width": "220px",
          "background-color": "var(--bs-body-bg)",
          color: "var(--bs-body-color)"
        }}
      >
        <div class="small mb-2">
          {props.message}
        </div>

        <div class="d-flex justify-content-end gap-3">
          <button
            type="button"
            class="btn btn-sm btn-primary"
            onClick={props.onCancel}
          >
            No
          </button>

          <button
            type="button"
            class="btn btn-sm btn-danger"
            onClick={props.onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </Show>
  );
}

export default Confirm