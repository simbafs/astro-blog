import { useReducer } from 'react'
import PS1 from './PS1.tsx'
import Exec from './Exec.tsx'

export default function Terminal() {
	const [value, updateValue] = useReducer(
		(prev: string[][], next: string[][]) => {
			return [...prev, ...next]
		},
		[['banner']]
	)

	return (
		<>
			{value.map(cmd => (
				<>
					<PS1 cmd={cmd} />
					<Exec args={cmd} />
				</>
			))}
			<PS1 addLine={line => updateValue([line.split(' ')])} />
		</>
	)
}
