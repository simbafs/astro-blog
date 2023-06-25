import { useReducer } from 'react'
import PS1 from './PS1.tsx'
import Exec from './Exec.tsx'

export default function Terminal({ initCmd }: {
	initCmd: string[][]
}) {
	const [history, updateHistory] = useReducer(
		(prev: string[][], action: {
			clear?: boolean,
			next?: string[][],
		}) => {
			if (action.clear) return []
			return [...prev, ...action?.next || []]
		},
		initCmd || [],
	)

	return <>
		{history.map(cmd => (
			<div style={{
				wordBreak: 'break-all',
			}}>
				<PS1 cmd={cmd} />
				<Exec args={cmd} terminal={{
					history,
					updateHistory,
				}} />
			</div>
		))}
		<PS1 updateHistory={updateHistory} />
	</>

}
