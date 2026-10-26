import type {
  BusinessType,
  GroupBy,
  OperationType,
} from "./api-types";

export interface DateRangeFilter {
  /** Inclusive lower date bound in `YYYY-MM-DD` format; omit it for no lower bound. */
  start_date?: string;
  /** Inclusive upper date bound in `YYYY-MM-DD` format; omit it for no upper bound. */
  end_date?: string;
}

export interface AlertsParams extends DateRangeFilter {
  /** Minimum relative increase to report. The API default is `0.3` and accepts values >= 0; the product UI restricts input to `0.01` through `1.0`. */
  threshold?: number;
  /** Aggregation period: `day`, `week`, or `month`; API default is `month`. */
  group_by?: GroupBy;
  /** Optional segment filter: `B2B` or `B2C`. */
  business_type?: BusinessType;
}

export interface TopCategoriesParams extends DateRangeFilter {
  /** Operation to rank: `income` or `outcome`; API default is `outcome`. */
  operation_type?: OperationType;
  /** Maximum number of categories to return; API default is `5`, valid range is 1 through 20. */
  limit?: number;
  /** Optional segment filter: `B2B` or `B2C`. */
  business_type?: BusinessType;
}