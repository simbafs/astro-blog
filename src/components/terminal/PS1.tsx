import Input from './Input.tsx'

export default function PS1({
	cmd,
	addLine,
}: {
	cmd?: string[]
	addLine?: (line: string) => void
}) {
	return (
		<div className="flex">
			<span className="text-blue">vistor</span>
			<span className="text-cyan">@</span>
			<span className="text-green">blog.simbafs.cc</span>
			<span className="text-cyan">:$ ~&nbsp;</span>
			{addLine && <Input addLine={addLine} />}
			<span>{cmd}</span>
		</div>
	)
}
