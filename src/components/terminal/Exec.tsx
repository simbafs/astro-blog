import shell from '../../shell'

export default function Exec({ args }: { args: string[] }) {
	return <div dangerouslySetInnerHTML={{ __html: shell(args) }} />
}
