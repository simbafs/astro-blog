// TODO: auto load every js file in this directory
// maybe this https://stackoverflow.com/questions/75126196/dynamically-import-all-images-from-a-folder-in-astro
// or this https://stackoverflow.com/questions/44987464/import-all-modules-from-a-directory-at-once-node
// or this https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder

import React from "react"

type Terminal = {
	history: string[][]
	updateHistory: React.Dispatch<{
		clear?: boolean
		next?: string[][]
	}>
}

type Props = {
	args: string[]
	terminal: Terminal
}

export default function Shell({ args, terminal }: Props) {
	const cmd = cmds[args[0]]
	if (!cmd) {
		return cmds['commandNotFound']({
			args: ['commandNotFound', ...args],
			terminal,
		})
	}
	return cmd({ args, terminal })
}

const cmds: { [cmd: string]: (prop: Props) => React.JSX.Element } = {
	clear: clear,
	banner: banner,
	help: help,
	commandNotFound: commandNotFound,
}

export const cmdList = Object.keys(cmds)

function commandNotFound({ args }: Props) {
	return <p>command not found: {args[1]}</p>
}

function clear({ terminal }: Props) {
	terminal.updateHistory({ clear: true })
	return <></>
}

function ClickCmd({ cmd, terminal }: { cmd: string, terminal: Terminal }) {
	return <a
		className="underline hover:underline-offset-1"
		href="javascript:void(0)"
		onClick={() => terminal.updateHistory({ next: [[cmd]] })}
	> {cmd}</a>
}

function help({ terminal }: Props) {
	function insertBetween(arr: any, between: any) {
		return arr.reduce((acc: any, curr: any) => [...acc, between, curr], []).slice(1)
	}

	return <p>Available commands: {insertBetween(cmdList.map(cmd => <ClickCmd cmd={cmd} terminal={terminal} />), ', ')}</p >
}

function banner({ terminal }: Props) {
	return <>
		<div className="overflow-scroll break-keep">
			<p>╱╭━━━╮╱╱╭━━╮╱╱╭━╮╭━╮╱╱╭━━╮╱╱╱╭━━━╮╱╱╭━━━╮╱╱╭━━━╮╱╱╱╱╱╱╭━━━╮╱╱╭━━━╮╱</p>
			<p>╱┃╭━╮┃╱╱╰┫┣╯╱╱┃┃╰╯┃┃╱╱┃╭╮┃╱╱╱┃╭━╮┃╱╱┃╭━━╯╱╱┃╭━╮┃╱╱╱╱╱╱┃╭━╮┃╱╱┃╭━╮┃╱</p>
			<p>╱┃╰━━╮╱╱╱┃┃╱╱╱┃╭╮╭╮┃╱╱┃╰╯╰╮╱╱┃┃╱┃┃╱╱┃╰━━╮╱╱┃╰━━╮╱╱╱╱╱╱┃┃╱╰╯╱╱┃┃╱╰╯╱</p>
			<p>╱╰━━╮┃╱╱╱┃┃╱╱╱┃┃┃┃┃┃╱╱┃╭━╮┃╱╱┃╰━╯┃╱╱┃╭━━╯╱╱╰━━╮┃╱╱╱╱╱╱┃┃╱╭╮╱╱┃┃╱╭╮╱</p>
			<p>╱┃╰━╯┃╱╱╭┫┣╮╱╱┃┃┃┃┃┃╱╱┃╰━╯┃╱╱┃╭━╮┃╱╱┃┃╱╱╱╱╱┃╰━╯┃╱╱╭╮╱╱┃╰━╯┃╱╱┃╰━╯┃╱</p>
			<p>╱╰━━━╯╱╱╰━━╯╱╱╰╯╰╯╰╯╱╱╰━━━╯╱╱╰╯╱╰╯╱╱╰╯╱╱╱╱╱╰━━━╯╱╱╰╯╱╱╰━━━╯╱╱╰━━━╯╱</p>
		</div>
		<p># Social</p>
		<p>• <a href="https://github.com/simbafs" target="_blank" className="underline hover:underline-offset-1">GitHub</a></p>
		<p>• <a href="https://twitter.com/simbafs" target="_blank" className="underline hover:underline-offset-1">Twitter</a></p>
		<br />
		<p>use <ClickCmd cmd="help" terminal={terminal} /> to list all commands</p>
	</>
}
