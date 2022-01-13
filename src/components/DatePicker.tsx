import 'react-datepicker/src/stylesheets/datepicker.scss';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

function DatetimePicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(selectedDate);
  return (
    <div className="datepicker">
      <DatePicker
        placeholderText="Date de la session"
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy HH:mm"
        minDate={new Date()}
        showTimeSelect
      />
    </div>
  );
}

export default DatetimePicker;