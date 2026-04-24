import { useState, useEffect, useDeferredValue } from 'react';
import { ZxcvbnResult, zxcvbnAsync } from '@zxcvbn-ts/core';
import { useInputValidationProps } from './useInputValidation';

export const usePasswordValidationProps = (
  validate: (pwd: string, strength: ZxcvbnResult | null | undefined) => boolean,
) => {
  const [result, setResult] = useState<ZxcvbnResult | null>();

  const { value, onBlur, isValid, isTouched, onInputChange } =
    useInputValidationProps((inputVal) => validate(inputVal, result));

  // NOTE: useDeferredValue is React v18 only, for v17 or lower use debouncing
  const deferredPassword = useDeferredValue(value);

  useEffect(() => {
    zxcvbnAsync(deferredPassword)
      .then((response: any) => setResult(response))
      .catch(() => setResult(null));
  }, [deferredPassword]);

  return {
    result,
    value,
    onBlur,
    isValid,
    isTouched,
    onInputChange,
  };
};
