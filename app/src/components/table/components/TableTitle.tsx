// import React from 'react';

// import { interpolate } from 'utils/interpolate';

// import en from 'constants/en';

// interface TableTitleProps {
//   tableTitle: string;
//   itemName: string;
//   start: number;
//   total: number;
// }

// function TableTitle(props: TableTitleProps) {
//   const { tableTitle, itemName, start, total } = props;

//   return (
//     <div className="p-4 flex gap-x-4 items-center">
//       <p className="text-xl font-bold text-grey-900">{tableTitle}</p>

//       <div className="flex items-center">
//         <p className="text-[10px] text-grey-900 font-medium border border-grey-300 rounded text-center flex items-center px-1 py-[2px]">
//           {interpolate(en.TABLE.VIEWING, { start, total, title: itemName })}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default TableTitle;
