import db from "../db";

interface OrderRequest {
  body: {
    userId: string;
    mealType: string;
  };
}

interface OrderResponse {
  status: (code: number) => OrderResponse;
  json: (body: any) => void;
}

export const recordOrder = async (req: OrderRequest, res: OrderResponse) => {
  const { userId, mealType } = req.body;

  await db("user_orders").insert({
    user_id: userId,
    meal_type: mealType,
    order_time: new Date(),
  });

  res.status(201).json({ message: "Order recorded" });
};

interface Request {
  params: {
    id: string;
  };
  body: {
    userId: string;
    mealType: string;
  };
}

interface Response {
  status: (code: number) => Response;
  json: (body: any) => void;
}

export const getUserDetails = async (req: any, res: any) => {
  const { id } = req.params;
  const user = await db("users").where({ id }).first();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};
