import {useValidator} from "../../hooks/useValidator.ts";
import {FC, FormEvent, useEffect, useMemo, useState} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import classes from "./AddRegularTransactionForm.module.css";
import {Input} from "../../components/Input/Input.tsx";
import {InputError} from "../../components/InputError/InputError.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {MoneyInput} from "../../components/MoneyInput/MoneyInput.tsx";
import {descriptionValidator} from "../../validators/descriptionValidator.ts";
import {amountValidator} from "../../validators/amountValidator.ts";
import {getAllAccounts} from "../../api/requests/accountRequests.ts";
import {AccountResponse} from "../../api/schemas/account/AccountResponse.ts";
import {DropdownInput} from "../../components/DropdownInput/DropdownInput.tsx";
import {DropdownInputOption} from "../../components/DropdownInput/DropdownInputOption.tsx";
import {requiredValidator} from "../../validators/requiredValidator.ts";
import {getAllCategories} from "../../api/requests/categoryRequests.ts";
import {CategoryResponse} from "../../api/schemas/category/CategoryResponse.ts";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";
import {ruLocale} from "../../locale/ruLocale.ts";
import {RuleMode} from "../../api/schemas/transaction/regular/RuleMode.ts";
import {NumberInput} from "../../components/NumberInput/NumberInput.tsx";
import {monthValidator} from "../../validators/monthValidator.ts";
import {dayValidator} from "../../validators/dayValidator.ts";
import {secondValidator} from "../../validators/secondValidator.ts";
import {AddTransactionRegular} from "../../api/schemas/transaction/regular/AddTransactionRegular.ts";
import {RuleTransactionType} from "../../api/schemas/transaction/regular/RuleTransactionType.ts";
import {addTransactionRegular} from "../../api/requests/transactionRegularRequests.ts";
import {TransactionRegularResponse} from "../../api/schemas/transaction/regular/TransactionRegularResponse.ts";

export interface AddRegularTransactionFormProps {
	type: TransactionType
	onSubmit?: (newTransactionRegular: TransactionRegularResponse) => void
	onError?: (error: string) => void
}

export const AddRegularTransactionForm: FC<AddRegularTransactionFormProps> = ({type, onSubmit, onError}) => {
	const [description, setDescription, descriptionValid, descriptionEmpty, descriptionErrors] = useValidator<string>("", descriptionValidator);
	const [amount, setAmount, amountValid, amountEmpty, amountErrors] = useValidator<bigint | null>(null, amountValidator);
	const [accountId, setAccountId, accountIdValid, accountIdEmpty, accountIdErrors] = useValidator<number | null>(null, requiredValidator);
	const [categoryId, setCategoryId, categoryIdValid, categoryIdEmpty, categoryIdErrors] = useValidator<number | null>(null, requiredValidator);

	const [month, setMonth, monthValid, monthEmpty, monthErrors] = useValidator<number | null>(null, monthValidator);
	const [day, setDay, dayValid, dayEmpty, dayErrors] = useValidator<number | null>(null, dayValidator);
	const [second, setSecond, secondValid, secondEmpty, secondErrors] = useValidator<number | null>(null, secondValidator);

	const [mode, setMode, modeValid, modeEmpty, modeErrors] = useValidator<string | null>(null, requiredValidator);

	const [accounts, setAccounts] = useState<AccountResponse[]>([]);
	const [categories, setCategories] = useState<CategoryResponse[]>([]);

	const [fetchGetAccounts, , getAccountsError, resetGetAccountsError] = useHttpRequest(
		async () => getAllAccounts()
	)

	const [fetchGetCategories, , getCategoriesError, resetGetCategoriesError] = useHttpRequest(
		async () => getAllCategories(type)
	)

	const [fetchAddTransactionRegular, isAddTransactionRegularLoading, addTransactionRegularError, resetAddTransactionRegularError] = useHttpRequest(
		async (transactionRegular: AddTransactionRegular) => addTransactionRegular(transactionRegular)
	)

	const isValid = useMemo(() => {
		return (
			(
				!amountEmpty && !accountIdEmpty && !categoryIdEmpty && !modeEmpty &&
				descriptionValid && amountValid && accountIdValid && categoryIdValid && modeValid
			) &&
			(
				(mode == RuleMode.FIXED_YEAR && (
					!monthEmpty && !dayEmpty && monthValid && dayValid
				)) ||
				(mode == RuleMode.FIXED_MONTH && (
					!dayEmpty && dayValid
				)) ||
				(mode == RuleMode.INTERVAL_DAY && (
					!dayEmpty && dayValid
				)) ||
				(mode == RuleMode.INTERVAL_SECOND && (
					!secondEmpty && secondValid
				))
			)
		);
	}, [
		descriptionEmpty, amountEmpty, accountIdEmpty, categoryIdEmpty, modeEmpty, monthEmpty, dayEmpty, secondEmpty,
		descriptionValid, amountValid, accountIdValid, categoryIdValid, modeValid, monthValid, dayValid, secondValid
	]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		if (!isValid) return;

		let rule;
		if (mode == RuleMode.FIXED_YEAR) {
			rule = {
				transactionType: RuleTransactionType.DEFAULT,
				mode: mode,
				month: month!,
				day: day!,
			}
		} else if (mode == RuleMode.FIXED_MONTH) {
			rule = {
				transactionType: RuleTransactionType.DEFAULT,
				mode: mode,
				day: day!,
			}
		} else if (mode == RuleMode.INTERVAL_DAY) {
			rule = {
				transactionType: RuleTransactionType.DEFAULT,
				mode: mode,
				days: day!,
			}
		} else if (mode == RuleMode.INTERVAL_SECOND) {
			rule = {
				transactionType: RuleTransactionType.DEFAULT,
				mode: mode,
				seconds: second!,
			}
		}
		if (!rule) return;

		const transactionRegular: AddTransactionRegular = {
			type: type,
			amount: amount!,
			accountId: accountId!,
			categoryId: categoryId!,
			description,
			rule: rule,
		};

		await fetchAddTransactionRegular(transactionRegular)
			.then((response) => {
				if (onSubmit) onSubmit(response);
			});
	};

	const selectMode = (mode: string | null) => {
		setMode(mode);
		setMonth(null);
		setDay(null);
		setSecond(null);
	}

	useEffect(() => {
		if (onError && getAccountsError) {
			onError(getAccountsError);
			resetGetAccountsError();
		}
	}, [getAccountsError]);

	useEffect(() => {
		if (onError && getCategoriesError) {
			onError(getCategoriesError);
			resetGetCategoriesError();
		}
	}, [getCategoriesError]);

	useEffect(() => {
		if (onError && addTransactionRegularError) {
			onError(addTransactionRegularError);
			resetAddTransactionRegularError();
		}
	}, [addTransactionRegularError]);


	useEffect(() => {
		fetchGetAccounts().then(setAccounts);
		fetchGetCategories().then(setCategories);
	}, []);

	return (
		<form onSubmit={(e: FormEvent) => submit(e)} className={classes.container}>
			<div className={classes.period}>
				<DropdownInput
					placeholder="Период"
					setValue={(value) => selectMode(value)}
				>
					{Object.values(RuleMode).map((mode, index) => (
						<DropdownInputOption key={index} label={ruLocale(mode)} value={mode}/>
					))}
				</DropdownInput>
				<InputError errors={modeErrors}/>

				{mode == RuleMode.FIXED_YEAR && (<>
					<NumberInput placeholder="Месяц" value={month} setValue={setMonth} min={1} max={12} step={1}/>
					<InputError errors={monthErrors}/>

					<NumberInput placeholder="День" value={day} setValue={setDay} min={1} max={28} step={1}/>
					<InputError errors={dayErrors}/>
				</>)}

				{mode == RuleMode.FIXED_MONTH && (<>
					<NumberInput placeholder="День" value={day} setValue={setDay} min={1} max={28} step={1}/>
					<InputError errors={dayErrors}/>
				</>)}

				{mode == RuleMode.INTERVAL_DAY && (<>
					<NumberInput placeholder="Количество дней" value={day} setValue={setDay} min={1} max={28} step={1}/>
					<InputError errors={dayErrors}/>
				</>)}

				{mode == RuleMode.INTERVAL_SECOND && (<>
					<NumberInput placeholder="Количество секунд" value={second} setValue={setSecond} min={1} step={1}/>
					<InputError errors={secondErrors}/>
				</>)}
			</div>
			<div className={classes.data}>
				<DropdownInput
					placeholder="Аккаунт"
					setValue={(value) => setAccountId(Number(value))}
				>
					{accounts.map((account, index) => (
						<DropdownInputOption key={index} label={account.name} value={account.id.toString()}/>
					))}
				</DropdownInput>
				<InputError errors={accountIdErrors}/>

				<DropdownInput
					placeholder="Категория"
					setValue={(value) => setCategoryId(Number(value))}
				>
					{categories.map((category, index) => (
						<DropdownInputOption key={index} label={category.name} value={category.id.toString()}/>
					))}
				</DropdownInput>
				<InputError errors={categoryIdErrors}/>

				<MoneyInput placeholder="Сумма" value={amount} setValue={setAmount}/>
				<InputError errors={amountErrors}/>

				<Input placeholder="Описание" value={description} setValue={setDescription}/>
				<InputError errors={descriptionErrors}/>

				<Button
					{...(type === TransactionType.INCOME ? {income: true} : {expense: true})}
					type="submit"
					active={isValid && !isAddTransactionRegularLoading}
				>
					{isAddTransactionRegularLoading ? "Загрузка..." : "Добавить"}
				</Button>
			</div>
		</form>
	)
}