'use client';

import type { TimeValue } from 'react-aria';
import type { TimeFieldStateOptions } from 'react-stately';
import { TimeField } from './time-field';

type TimePickerProps = Omit<TimeFieldStateOptions<TimeValue>, 'locale'>;

function TimePicker(props: TimePickerProps) {
  const { ...timeFieldProps } = props;
  return <TimeField {...timeFieldProps} />;
}

TimePicker.displayName = 'TimePicker';

export { TimePicker };
