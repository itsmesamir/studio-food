import { createRoute } from "utils/route";

import paths from "./paths";

export default {
  home: createRoute([paths.home]),
  signup: createRoute([paths.signup]),
  signin: createRoute([paths.signin]),
  leave: createRoute([paths.leave]),
  applyleave: createRoute([paths.leave, paths.apply]),
  profile: createRoute([paths.profile]),
  userProfile: createRoute([paths.profile, ":id"]),
  employee: createRoute([paths.employee]),
  leavebalance: createRoute([paths.leave, paths.balance]),
  leaveTypes: createRoute([paths.leaveTypes]),
  editLeave(id: number) {
    createRoute([paths.leave, id.toString()]);
  },
} as const;
