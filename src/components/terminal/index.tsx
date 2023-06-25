import { useReducer } from 'react'
import PS1 from './PS1.tsx'
import Exec from './Exec.tsx'

export default function Terminal() {
	const [history, updateHistory] = useReducer(
		(prev: string[][], action: {
			clear?: boolean,
			next?: string[][],
		}) => {
			if (action.clear) return []
			return [...prev, ...action?.next || []]
		},
		[['banner']]
	)

	return <>
		{history.map(cmd => (
			<>
				<PS1 cmd={cmd} />
				<Exec args={cmd} terminal={{
					history,
					updateHistory,
				}} />
			</>
		))}
		<PS1 updateHistory={updateHistory} />
	</>

}
