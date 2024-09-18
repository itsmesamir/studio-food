import { MealTypes } from '@/enums/orders';

import { PageProps } from './pagination';

export type OrderProps = Partial<PageProps>;

export interface OrderFilter extends PageProps {
  mealType?: MealTypes[];
}
