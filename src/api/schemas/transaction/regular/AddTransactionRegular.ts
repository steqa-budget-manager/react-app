import {TransactionType} from "../TransactionType.ts";
import {FixedYearRule} from "./FixedYearRule.ts";
import {IntervalDayRule} from "./IntervalDayRule.ts";
import {IntervalSecondRule} from "./IntervalSecondRule.ts";
import {FixedMonthRule} from "./FixedMonthRule.ts";

export interface AddTransactionRegular {
	type: TransactionType,
	amount: bigint,
	accountId: number,
	categoryId: number,
	description?: string,
	rule: FixedYearRule | FixedMonthRule | IntervalDayRule | IntervalSecondRule,
}
