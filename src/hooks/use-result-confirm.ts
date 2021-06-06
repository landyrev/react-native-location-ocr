import { useCallback, useEffect, useState } from 'react';
import { IHasValueOf } from 'src/interfaces';

interface UseResultConfirmOptions {
  successThresholdNumber?: number;
  failThresholdNumber?: number;
}

export function useResultConfirm<T extends IHasValueOf>(
  options?: UseResultConfirmOptions
): [T | null, (v: T) => void] {
  const { failThresholdNumber = 5, successThresholdNumber = 3 } = options || {};
  const [value, setValue] = useState<T | null>(null);
  const [result, setResult] = useState<T | null>(null);
  const [successCount, setSuccessCount] = useState(0);
  const [nullCount, setNullcount] = useState(0);

  const onValueChanged = useCallback(
    (data: T | null) => {
      if (data) {
        if (value && data.valueOf() === value.valueOf()) {
          setSuccessCount(successCount + 1);
        } else {
          setSuccessCount(1);
        }
        setNullcount(0);
        setValue(data);
      } else {
        setNullcount(nullCount + 1);
      }
    },
    [value, nullCount, successCount]
  );

  useEffect(() => {
    if (successCount >= successThresholdNumber) {
      setResult(value);
      setSuccessCount(0);
      setValue(null);
    }
  }, [successCount, successThresholdNumber, value]);

  useEffect(() => {
    if (nullCount >= failThresholdNumber) {
      setSuccessCount(0);
      setValue(null);
      setNullcount(0);
    }
  }, [nullCount, setValue, setSuccessCount, setNullcount, failThresholdNumber]);

  return [result, onValueChanged];
}
