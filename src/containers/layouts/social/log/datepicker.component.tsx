import React, { useRef } from "react";
import DatePicker from "react-native-datepicker";
import { textStyle } from '@src/components/common';

export const Datepicker = React.forwardRef((props, ref) => {
  const dateRef = useRef(ref);
  return (
    <DatePicker
      ref={dateRef}
      showIcon={false}
      minuteInterval={10}
      mode={"datetime"}
      confirmBtnText={"OK"}
      cancelBtnText={"Cancel"}
      customStyles={{
        dateInput: {
          borderWidth: '0px !important',
          alignItems: 'flex-end'
        },
        placeholderText: {
          color: 'black',
          ...textStyle.caption2
        },
        dateText: {
          color: 'black',
          ...textStyle.caption2
        }
      }}
      {...props}
    />
  );
});
