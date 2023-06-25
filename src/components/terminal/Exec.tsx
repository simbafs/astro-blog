import shell from '../../shell'

export default function Exec({ args, terminal }: {
	args: string[]
	terminal: {
		history: string[][]
		updateHistory: React.Dispatch<{
			clear?: boolean
			next?: string[][]
		}>
	}
}) {
	return <div dangerouslySetInnerHTML={{ __html: shell(args, terminal) }} />
}
