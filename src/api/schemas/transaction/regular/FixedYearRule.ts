import {BaseRule} from "./BaseRule.ts";

export interface FixedYearRule extends BaseRule {
	month: number;
	day: number;
}
