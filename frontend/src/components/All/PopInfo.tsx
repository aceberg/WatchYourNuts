import { Show, onMount, onCleanup, JSX } from "solid-js";

interface PopInfoProps {
  show: boolean;
  message: JSX.Element
  onCancel: () => void;
}

function PopInfo(props: PopInfoProps) {
  let close: boolean = false;

  const handleClickOutside = () => {

    if (close) {
      close = false;
      props.onCancel();
    }

    if (props.show) {
      close = true;
    }
  };

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener("click", handleClickOutside);
  });

  return (
    <Show when={props.show}>
      <div
        class="position-absolute border border-primary rounded shadow p-2"
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
        {props.message}
      </div>
    </Show>
  );
}

export default PopInfo;