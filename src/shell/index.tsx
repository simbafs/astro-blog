// TODO: auto load every js file in this directory
// maybe this https://stackoverflow.com/questions/75126196/dynamically-import-all-images-from-a-folder-in-astro
// or this https://stackoverflow.com/questions/44987464/import-all-modules-from-a-directory-at-once-node
// or this https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder

import React from "react"
import { CollectionEntry } from "astro:content"

type Terminal = {
	history: string[][]
	updateHistory: React.Dispatch<{
		clear?: boolean
		next?: string[][]
	}>
	files?: CollectionEntry<'blog'>[]
}

type Props = {
	args: string[]
	terminal: Terminal
	data?: any
}

export default function Shell({ args, terminal, data }: Props) {
	const cmd = cmds[args[0]]
	if (!cmd) {
		return cmds['commandNotFound']({
			args: ['commandNotFound', ...args],
			terminal,
		})
	}
	return cmd({ args, terminal, data })
}

const cmds: { [cmd: string]: (prop: Props) => React.JSX.Element } = {
	clear: clear,
	banner: banner,
	help: help,
	echo: echo,
	ls: ls,
	cd: cd,
	commandNotFound: commandNotFound,
}

export const cmdList = Object.keys(cmds)

// helpers

function ClickCmd({ cmd, terminal }: { cmd: string[], terminal: Terminal }) {
	return <a
		className="underline hover:underline-offset-1"
		href="javascript:void(0)"
		onClick={() => terminal.updateHistory({ next: [cmd] })}
	> {cmd.join(' ')}</a>
}

function insertBetween(arr: any, between: any): any[] {
	return arr.reduce((acc: any, curr: any) => [...acc, between, curr], []).slice(1)
}

// generate by ChatGPT:
// prompt: implement the path.join function in nodejs with function 
// signature `function join(...paths)`, consider '../' in path.
function join(...paths: string[]) {
	const sanitizedPaths = paths.map(path => {
		// Replace backslashes with forward slashes
		path = path.replace(/\\/g, '/');

		// Remove leading and trailing slashes
		path = path.replace(/^\/|\/$/g, '');

		return path;
	});

	let joinedPath = sanitizedPaths.join('/');

	// Handle relative paths with "../"
	const parts = joinedPath.split('/');
	const newParts: string[] = [];

	for (const part of parts) {
		if (part === '..') {
			newParts.pop();
		} else if (part !== '.') {
			newParts.push(part);
		}
	}

	joinedPath = newParts.join('/');

	// Add a leading slash if necessary
	if (paths[0].startsWith('/') && !joinedPath.startsWith('/')) {
		joinedPath = '/' + joinedPath;
	}

	return joinedPath;
}

// cmds

function cd({ args }: Props) {
	if (args.length === 1) {
		location.pathname = '/newBlog/';
		return <></>
	}
	location.href = join(location.href, args[1])
	return <></>
}

// ls('.', data)
function ls({ /*args,*/ terminal }: Props) {
	// TODO base
	const files = terminal?.files || []
	const formatedDate = (date: Date) => `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
	return <ul>
		{files.map(file => <li>• <span>{formatedDate(file.data.pubDate)}</span> <a className="underline hover:underline-offset-1" href={`/newBlog/blog/${file.slug}`}>{file.data.title}</a></li>)}
	</ul>
}

function commandNotFound({ args }: Props) {
	return <p>command not found: {args[1]}</p>
}

function echo({ args, data }: Props) {
	return <>
		<p>{args.slice(1).join(' ')}</p>
		{data && <pre className="overflow-scroll">{JSON.stringify(data, null, 2)}</pre>}
	</>
}

function clear({ terminal }: Props) {
	terminal.updateHistory({ clear: true })
	return <></>
}

function help({ terminal }: Props) {
	return <p>Available commands: {insertBetween(cmdList.map(cmd => <ClickCmd cmd={[cmd]} terminal={terminal} />), ', ')}</p >
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
		<p>use <ClickCmd cmd={['help']} terminal={terminal} /> to list all commands</p>
		<p>use <ClickCmd cmd={['cd', 'blog']} terminal={terminal} /> to read blog posts</p>
	</>
}
