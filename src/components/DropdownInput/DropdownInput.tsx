import {Children, cloneElement, FC, ReactElement, useEffect, useRef, useState} from "react";
import {DropdownInputOptionProps} from "./DropdownInputOption.tsx";
import classes from "./DropdownInput.module.css";
import clsx from "clsx";

interface DropdownInputProps {
	children: ReactElement<DropdownInputOptionProps> | ReactElement<DropdownInputOptionProps>[],
	setValue: (value: string | null) => void;
	placeholder?: string,
}

export const DropdownInput: FC<DropdownInputProps> = ({children, setValue, placeholder}) => {
	const [open, setOpen] = useState<boolean>(false);
	const [selected, setSelected] = useState<string>("");
	const [direction, setDirection] = useState<"top" | "bottom">("bottom");

	const dropdownRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (open && containerRef.current && dropdownRef.current) {
			const fieldRect = containerRef.current.getBoundingClientRect();
			const dropdownRect = dropdownRef.current.getBoundingClientRect();
			const spaceBelow = window.innerHeight - fieldRect.bottom;

			if (spaceBelow >= dropdownRect.height) {
				setDirection("bottom");
			} else {
				setDirection("top");
			}
		}
	}, [open]);

	return (
		<div
			className={clsx(
				classes.container,
				open && (direction === "bottom" ? classes.bottom : classes.top)
			)}
		>
			<div
				ref={containerRef}
				className={clsx(
					classes.input, {
						[classes.open]: open,
					}
				)}
				onClick={() => setOpen(!open)}
			>
				{selected ? (
					<small>{selected}</small>
				) : (
					<small className={classes.placeholder}>{placeholder}</small>
				)}
			</div>
			{open && (
				<div ref={dropdownRef} className={classes.dropdown}>
					{Children.map(children, (child) =>
						cloneElement(child, {
							onClick: () => {
								setValue(child.props.value);
								setSelected(child.props.label);
								setOpen(false);
							},
						})
					)}
				</div>
			)}
		</div>
	)
}