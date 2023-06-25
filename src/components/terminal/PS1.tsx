import Input from './Input.tsx'

export default function PS1({
	cmd,
	updateHistory,
}: {
	cmd?: string[]
	updateHistory?: React.Dispatch<{
		clear?: boolean
		next?: string[][]
	}>
}) {
	// TODO: something wrong when input is too long
	return (
		<div className="flex">
			<span className="text-blue">vistor</span>
			<span className="text-cyan">@</span>
			<span className="text-green">blog.simbafs.cc</span>
			<span className="text-cyan">:$ ~&nbsp;</span>
			{updateHistory && <Input updateHistory={updateHistory} />}
			<span>{cmd}</span>
		</div>
	)
}
