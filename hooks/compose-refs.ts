import * as React from 'react';

type PossibleRef<T> = React.Ref<T> | undefined;

function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

function composeRefs<T>(...refs: PossibleRef<T>[]) {
  // biome-ignore lint/suspicious/useIterableCallbackReturn: <we need to iterate over the refs>
  return (node: T) => refs.forEach((ref) => setRef(ref, node));
}

function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: <we need to include all refs in the dependency array>
  return React.useCallback(composeRefs(...refs), refs);
}

export { composeRefs, useComposedRefs };
