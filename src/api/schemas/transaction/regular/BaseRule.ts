import {RuleTransactionType} from "./RuleTransactionType.ts";
import {RuleMode} from "./RuleMode.ts";

export interface BaseRule {
	transactionType: RuleTransactionType,
	mode: RuleMode,
}
