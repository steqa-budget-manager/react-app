import {TransactionType} from "../TransactionType.ts";
import {FixedYearRule} from "./FixedYearRule.ts";
import {IntervalDayRule} from "./IntervalDayRule.ts";
import {IntervalSecondRule} from "./IntervalSecondRule.ts";
import {FixedMonthRule} from "./FixedMonthRule.ts";

export interface TransactionRegularResponse {
	id: number,
	type: TransactionType,
	shortName: string,
	amount: bigint,
	account: string,
	accountId: number,
	category: string,
	categoryId: number,
	description: string,
	rule: FixedYearRule | FixedMonthRule | IntervalDayRule | IntervalSecondRule,
}
