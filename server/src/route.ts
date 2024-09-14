import { Router } from "express";

import swaggerRoute from "@/modules/swagger/swagger.route";
import usersRoute from "@/modules/user/user.route";
import rolesRoute from "@/modules/roles/role.route";
import reviewsRoute from "@/modules/reviews/reviews.route";
import designationsRoute from "@/modules/designations/designation.route";
import countriesRoute from "@/modules/countries/countries.route";
import menuCategoriesRoute from "@/modules/menuCategories/menuCategories.route";
import menuUnitsRoute from "@/modules/menuUnits/menuUnits.route";
import cafesRoute from "@/modules/cafes/cafes.route";
import ordersRoute from "@/modules/orders/orders.route";
import menuItemsRoute from "@/modules/menuItems/menuItems.route";

import { addToStore } from "@/services/store";

import config from "config";
import { X_REQUEST_ID, X_TRACE_ID } from "constants/headers";
import authMiddleware, { requireAuth } from "middlewares/auth";

const router = Router();

router.get("/", (req, res) => {
  res.cookie("cookieName", "cookieValue", { httpOnly: false });

  res.json({
    app: config.app.name,
    version: config.app.version,
  });
});

// Add request id and trace id to store.
router.use((req, _, next) => {
  if (req.headers[X_REQUEST_ID]) {
    addToStore({ [X_REQUEST_ID]: req.headers[X_REQUEST_ID] });
  }

  if (req.headers[X_TRACE_ID]) {
    addToStore({ [X_TRACE_ID]: req.headers[X_TRACE_ID] });
  }

  next();
});

router.use(authMiddleware);

router.use("/users", usersRoute);
router.use("/roles", rolesRoute);
router.use("/reviews", reviewsRoute);
router.use("/countries", countriesRoute);
router.use("/designations", designationsRoute);
router.use("/menus/categories", menuCategoriesRoute);
router.use("/menus/units", menuUnitsRoute);
router.use("/cafes", cafesRoute);
router.use("/menus", menuItemsRoute);
router.use("/orders", ordersRoute);

router.use(requireAuth);
router.use("/api-docs", swaggerRoute);

export default router;
