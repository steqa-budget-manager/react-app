import {useState} from "react";

type UseMessagesTimeStack = [
	string[],
	(msg: string) => void
];

export const useMessagesTimeStack = (): UseMessagesTimeStack => {
	const [messages, setMessages] = useState<string[]>([]);

	const addMessage = (msg: string) => {
		setMessages((prev) => [...prev, msg]);
		setTimeout(() => {
			setMessages((prev) => prev.slice(1));
		}, 2000);
	}

	return [messages, addMessage]
};