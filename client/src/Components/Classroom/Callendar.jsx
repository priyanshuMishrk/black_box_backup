import React from 'react';

const CalendarIcon = (prop) => {
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         aria-label="Calendar" 
         role="img"
         className='gx'
         viewBox="0 0 512 512">

<path d="M512 455c0 32-25 57-57 57H57c-32 0-57-25-57-57V128c0-31 25-57 57-57h398c32 0 57 26 57 57z" fill="white" stroke="#ffcc00" stroke-width="30"/>
<path d="M484 0h-47c2 4 4 9 4 30a28 28 0 1 1-53-30H124c3 4 4 9 4 30A28 28 0 1 1 75 0H28C13 0 0 13 0 28v157h512V28c0-15-13-28-28-28z" fill="#ffcc00"/>


{/* <g fill="#f3aab9">
  <circle cx="470" cy="142" r="14"/>
  <circle cx="470" cy="100" r="14"/>
  <circle cx="427" cy="142" r="14"/>
  <circle cx="427" cy="100" r="14"/>
  <circle cx="384" cy="142" r="14"/>
  <circle cx="384" cy="100" r="14"/>
</g> */}
 <rect x="385" y="-80" width="70" height="160" rx="20" ry="20" fill="#ffcc00" stroke='white' strokeWidth="10"/>
  <rect x="55" y="-80" width="70" height="160" rx="20" ry="20" fill="#ffcc00" stroke='white' strokeWidth="10"/>
      <text id="month" x="145" y="150" fill="#fff"  font-size="120px" style={{ textAlign : "center" }}>{prop.month}</text>
      <text id="day" x="256" y="430" fill="#ffcc00" font-size="256px" style={{ textAnchor: 'middle' }}>{prop.date}</text>
    </svg>
  );
};

export default CalendarIcon;