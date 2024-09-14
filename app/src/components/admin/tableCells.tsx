// import ActionModal from "components/common/actionModal";

import { parseQuery as parse } from "utils/queryParams";
import { classNames } from "utils/className";
// import history from "utils/history";

// import { User } from "types/User";
import { DefaultObject } from "types/common";
// import { CellData, DefaultObject, RowData } from "types/common";

type User = DefaultObject;

// export function ActionCell(
//   { row: { original } }: { row: { original: RowData<User> } },
//   ActionOption: (requestData: RowData<User>) => CellData[]
// ) {
//   const option = ActionOption(original);

//   return <ActionModal cellData={option} rowData={original} />;
// }

export function TextCell(value?: string | number, className?: string) {
  return <span className={classNames("", className)}>{value || "-"}</span>;
}

// export function RoleCell(user: User, className?: string) {
//   const { location } = history;

//   const queryParams: DefaultObject = parse(location.search);

//   const { roles } = user;
//   const roleIds = queryParams.roleIds ? queryParams.roleIds.split(",") : [];

//   return (
//     <div className="employee__role" id={`user-role-${user}`}>
//       {roles?.length > 0
//         ? roles.map((role) => {
//             const matchId = roleIds?.find((id: number) => id === role.id);
//             return (
//               <span
//                 key={role.id}
//                 className={classNames("role-table-item", {
//                   "text-bold": matchId,
//                 })}
//               >
//                 {role.name}
//               </span>
//             );
//           })
//         : "-"}
//     </div>
//   );
// }
