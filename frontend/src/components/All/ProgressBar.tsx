import { createMemo } from "solid-js";
import { formatNumber } from "../../functions/format";

function ProgressBar(_props: any) {

  const value = createMemo(() =>
    Math.round((_props.total * 100) / _props.plan) || 25
  );
  const width = createMemo(() => Math.min(value(), 100));
  
  return (
<>
  <td style="width: 60%">
    <div
      class="progress" role="progressbar"
      aria-valuenow={value()}
      aria-valuemin="0" aria-valuemax="100"
    >
      <div
        class={value() > 100 ? "progress-bar text-bg-warning" : "progress-bar text-bg-primary"}
        style={{ width: `${width()}%` }}
      >
        {formatNumber(_props.total)}
      </div>
    </div>
  </td>
  <td class="small w-auto">/ {formatNumber(_props.plan)}
    <sub class="opacity-50 small">{_props.k ? " k" : " g"}</sub>
  </td>
</>);
}

export default ProgressBar