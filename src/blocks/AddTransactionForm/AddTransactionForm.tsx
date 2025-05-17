import {useValidator} from "../../hooks/useValidator.ts";
import {FC, FormEvent, useEffect, useMemo, useState} from "react";
import {useHttpRequest} from "../../hooks/useHttpRequest.ts";
import classes from "./AddTransactionForm.module.css";
import {Input} from "../../components/Input/Input.tsx";
import {InputError} from "../../components/InputError/InputError.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {MoneyInput} from "../../components/MoneyInput/MoneyInput.tsx";
import {descriptionValidator} from "../../validators/descriptionValidator.ts";
import {amountValidator} from "../../validators/amountValidator.ts";
import {DateInput} from "../../components/DateInput/DateInput.tsx";
import {dateValidator} from "../../validators/dateValidator.ts";
import {getAllAccounts} from "../../api/requests/accountRequests.ts";
import {AccountResponse} from "../../api/schemas/account/AccountResponse.ts";
import {DropdownInput} from "../../components/DropdownInput/DropdownInput.tsx";
import {DropdownInputOption} from "../../components/DropdownInput/DropdownInputOption.tsx";
import {requiredValidator} from "../../validators/requiredValidator.ts";
import {getAllCategories} from "../../api/requests/categoryRequests.ts";
import {CategoryResponse} from "../../api/schemas/category/CategoryResponse.ts";
import {addTransaction} from "../../api/requests/transactionRequests.ts";
import {AddTransaction} from "../../api/schemas/transaction/AddTransaction.ts";
import {TransactionType} from "../../api/schemas/transaction/TransactionType.ts";
import {TransactionResponse} from "../../api/schemas/transaction/TransactionResponse.ts";
import {TransactionTemplateResponse} from "../../api/schemas/transaction/template/TransactionTemplateResponse.ts";
import {getAllTransactionTemplates} from "../../api/requests/transactionTemplateRequests.ts";
import {TableRow} from "../../components/TableRow/TableRow.tsx";
import {fromCents} from "../../utils/moneyConverters.ts";

export interface AddTransactionFormProps {
	type: TransactionType
	onSubmit?: (newTransaction: TransactionResponse) => void
	onError?: (error: string) => void
}

export const AddTransactionForm: FC<AddTransactionFormProps> = ({type, onSubmit, onError}) => {
	const [description, setDescription, descriptionValid, descriptionEmpty, descriptionErrors] = useValidator<string>("", descriptionValidator);
	const [amount, setAmount, amountValid, amountEmpty, amountErrors] = useValidator<bigint | null>(null, amountValidator);
	const [date, setDate, dateValid, dateEmpty, dateErrors] = useValidator<Date | null>(null, dateValidator);
	const [accountId, setAccountId, accountIdValid, accountIdEmpty, accountIdErrors] = useValidator<number | null>(null, requiredValidator);
	const [categoryId, setCategoryId, categoryIdValid, categoryIdEmpty, categoryIdErrors] = useValidator<number | null>(null, requiredValidator);

	const [account, setAccount] = useState<string>();
	const [category, setCategory] = useState<string>();

	const [accounts, setAccounts] = useState<AccountResponse[]>([]);
	const [categories, setCategories] = useState<CategoryResponse[]>([]);

	const [showTemplateChoose, setShowTemplateChoose] = useState<boolean>(false);
	const [transactionTemplates, setTransactionTemplates] = useState<TransactionTemplateResponse[]>([]);

	const [fetchGetAccounts, , getAccountsError, resetGetAccountsError] = useHttpRequest(
		async () => getAllAccounts()
	)

	const [fetchGetCategories, , getCategoriesError, resetGetCategoriesError] = useHttpRequest(
		async () => getAllCategories(type)
	)

	const [fetchAddTransaction, isAddTransactionLoading, addTransactionError, resetAddTransactionError] = useHttpRequest(
		async (transaction: AddTransaction) => addTransaction(transaction)
	)

	const [fetchGetTransactionTemplates, , getTransactionTemplatesError, resetGetTransactionTemplatesError] = useHttpRequest(
		async () => getAllTransactionTemplates(type)
	)

	const handleSelectTemplate = (transactionTemplate: TransactionTemplateResponse) => {
		setDescription(transactionTemplate.description);
		setAmount(transactionTemplate.amount);
		setAccountId(transactionTemplate.accountId);
		setCategoryId(transactionTemplate.categoryId);
		setAccount(transactionTemplate.account);
		setCategory(transactionTemplate.category);
		setShowTemplateChoose(false);
	}

	useEffect(() => {
		if (onError && getTransactionTemplatesError) {
			onError(getTransactionTemplatesError);
			resetGetTransactionTemplatesError();
		}
	}, [getTransactionTemplatesError]);

	useEffect(() => {
		fetchGetTransactionTemplates().then(setTransactionTemplates);
	}, []);

	const isValid = useMemo(() => {
		return (
			!amountEmpty &&
			!dateEmpty &&
			!accountIdEmpty &&
			!categoryIdEmpty &&
			descriptionValid &&
			amountValid &&
			dateValid &&
			accountIdValid &&
			categoryIdValid
		);
	}, [
		descriptionEmpty, amountEmpty, dateEmpty, accountIdEmpty, categoryIdEmpty,
		descriptionValid, amountValid, dateValid, accountIdValid, categoryIdValid
	]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		if (!isValid) return;

		const transaction: AddTransaction = {
			type: type,
			amount: amount!,
			date: date!,
			accountId: accountId!,
			categoryId: categoryId!,
			description
		};

		await fetchAddTransaction(transaction)
			.then((response) => {
				if (onSubmit) onSubmit(response);
			});
	};

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
		if (onError && addTransactionError) {
			onError(addTransactionError);
			resetAddTransactionError();
		}
	}, [addTransactionError]);


	useEffect(() => {
		fetchGetAccounts().then(setAccounts);
		fetchGetCategories().then(setCategories);
	}, []);

	return (
		<form onSubmit={(e: FormEvent) => submit(e)} className={classes.container}>
			{showTemplateChoose ? (<>
				<div className={classes.templates}>
					{transactionTemplates.map((transactionTemplate) => (
						<TableRow
							secondary
							big
							key={transactionTemplate.id}
							leftTop={transactionTemplate.description}
							rightTop={fromCents(transactionTemplate.amount) + " ₽"}
							leftBottom={transactionTemplate.category}
							rightBottom={transactionTemplate.account}
							onClick={() => handleSelectTemplate(transactionTemplate)}
						/>
					))}
				</div>
				<Button
					{...(type === TransactionType.INCOME ? {income: true} : {expense: true})}
					transparent
					onClick={() => setShowTemplateChoose(false)}
				>
					Назад
				</Button>
			</>) : (<>
				<DropdownInput
					placeholder="Аккаунт"
					initSelected={account}
					setValue={(value) => setAccountId(Number(value))}
				>
					{accounts.map((account, index) => (
						<DropdownInputOption key={index} label={account.name} value={account.id.toString()}/>
					))}
				</DropdownInput>
				<InputError errors={accountIdErrors}/>

				<DropdownInput
					placeholder="Категория"
					initSelected={category}
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

				<DateInput placeholder="Дата" value={date} setValue={setDate}/>
				<InputError errors={dateErrors}/>

				<div className={classes.buttonGroup}>
					<Button
						{...(type === TransactionType.INCOME ? {income: true} : {expense: true})}
						transparent
						onClick={() => setShowTemplateChoose(true)}
					>
						Шаблон
					</Button>
					<Button
						{...(type === TransactionType.INCOME ? {income: true} : {expense: true})}
						type="submit"
						active={isValid && !isAddTransactionLoading}
					>
						{isAddTransactionLoading ? "Загрузка..." : "Добавить"}
					</Button>
				</div>
			</>)}
		</form>
	)
}