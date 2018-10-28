import wigly from "wigly";
import { useState, useEffect } from "wigly-use";

export default function useMount(f) {
  var [count, set] = useState(0);

  useEffect(el => {
    if (count === 1) setTimeout(f, 1, el);
    else if (count > 1) return;
    set(count + 1);
  });
}
