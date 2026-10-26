export type OperationType = "income" | "outcome";

export type BusinessType = "B2B" | "B2C";

export type GroupBy = "day" | "week" | "month";

export type Category =
  | "suppliers"
  | "sales"
  | "operational"
  | "administrative"
  | "others";

export type ISODateString = string;

export interface FacetsResponse {
  /** Operation types present in the dataset: `income` and/or `outcome`. */
  operation_types: OperationType[];
  /** Business segments present in the dataset: `B2B` and/or `B2C`. */
  business_types: BusinessType[];
  /** Categories present in the dataset, using the API's category literals. */
  categories: Category[];
  /** Earliest available movement date, serialized as `YYYY-MM-DD`. */
  min_date: ISODateString;
  /** Latest available movement date, serialized as `YYYY-MM-DD`. */
  max_date: ISODateString;
}

export interface AlertEntry {
  /** Period label in `YYYY-MM-DD`, ISO `YYYY-Www`, or `YYYY-MM` format. */
  period: string;
  /** Total outcome amount for this period. */
  outcome_total: number;
  /** Average outcome of all earlier periods in the filtered summary, not a three-period moving average. */
  baseline_average: number;
  /** Relative increase over `baseline_average`, represented as a ratio (for example, `0.3` means 30%). */
  increase_ratio: number;
}

export type AlertsResponse = AlertEntry[];

export interface CategoryEntry {
  /** Category identifier, not a display label. */
  category: Category;
  /** Operation type used to produce this category total. */
  operation_type: OperationType;
  /** Sum of amounts for this category and operation type. */
  total_amount: number;
}

export type TopCategoriesResponse = CategoryEntry[];

export interface MetricsSummaryItem {
  /** Group label: `YYYY-MM-DD` for day, `YYYY-Www` for ISO week, or `YYYY-MM` for month. */
  period: string;
  /** Total income amount for the period. */
  income: number;
  /** Total outcome amount for the period. */
  outcome: number;
  /** Net amount for the period, calculated as income minus outcome. */
  net: number;
}

export type MetricsSummaryResponse = MetricsSummaryItem[];

export interface MetricsComparison {
  /** Net amount for the requested date range. */
  current_period: number;
  /** Net amount for the immediately preceding range of equal duration. */
  previous_period: number;
  /** Absolute difference between current and previous net amounts. */
  delta_abs: number;
  /** Percentage change relative to the previous net, or `null` when the previous net is zero. */
  delta_pct: number | null;
}