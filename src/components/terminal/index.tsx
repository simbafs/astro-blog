import { useReducer } from 'react'
import PS1 from './PS1.tsx'
import Exec from './Exec.tsx'
import { CollectionEntry } from 'astro:content'

export default function Terminal({ initCmd, files }: {
	initCmd?: string[][]
	files?: CollectionEntry<'blog'>[]
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
					files
				}} />
			</div>
		))}
		<PS1 updateHistory={updateHistory} />
	</>

}
