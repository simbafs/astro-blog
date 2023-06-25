// TODO: auto load every js file in this directory
// maybe this https://stackoverflow.com/questions/75126196/dynamically-import-all-images-from-a-folder-in-astro
// or this https://stackoverflow.com/questions/44987464/import-all-modules-from-a-directory-at-once-node
// or this https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder

import React from "react"

type Terminal = {
	history: string[]
	updateHistory: React.Dispatch<{
		clear?: boolean
		next?: string[][]
	}>
}


export default function shell(args: string[], terminal: Terminal) {
	const cmd = cmds[args[0]]
	if (!cmd) {
		return cmds['commandNotFound'](args, terminal)
	}
	return cmd(args, terminal)
}

const cmds: { [cmd: string]: (args: string[], terminal: Terminal) => string } = {
	clear: clear,
	banner: banner,
	help: help,
	commandNotFound: commandNotFound,
}

export const cmdList = Object.keys(cmds)

function commandNotFound(args: string[]) {
	return `command not found: ${args[0]}`
}

function clear(args: string[], terminal: Terminal) {
	terminal.updateHistory({ clear: true })
	return ''
}

function help() {
	return 'Available commands: ' + cmdList.join(', ')
}

function banner() {
	const link = (url: string, opt: { text: string, external: boolean }) =>
		`<a class="underline hover:underline-offset-1" href="${url}" ${opt.external && 'target="_blank"'
		}>${opt.text ? opt.text : url}</a>`

	return (
		'<p>' +
		'╱╭━━━╮╱╭━━╮╱╭━╮╭━╮╱╭━━╮╱╱╭━━━╮╱╭━━━╮╱╭━━━╮╱╱╱╱╭━━━╮╱╭━━━╮</br>' +
		'╱┃╭━╮┃╱╰┫┣╯╱┃┃╰╯┃┃╱┃╭╮┃╱╱┃╭━╮┃╱┃╭━━╯╱┃╭━╮┃╱╱╱╱┃╭━╮┃╱┃╭━╮┃</br>' +
		'╱┃╰━━╮╱╱┃┃╱╱┃╭╮╭╮┃╱┃╰╯╰╮╱┃┃╱┃┃╱┃╰━━╮╱┃╰━━╮╱╱╱╱┃┃╱╰╯╱┃┃╱╰╯</br>' +
		'╱╰━━╮┃╱╱┃┃╱╱┃┃┃┃┃┃╱┃╭━╮┃╱┃╰━╯┃╱┃╭━━╯╱╰━━╮┃╱╱╱╱┃┃╱╭╮╱┃┃╱╭╮</br>' +
		'╱┃╰━╯┃╱╭┫┣╮╱┃┃┃┃┃┃╱┃╰━╯┃╱┃╭━╮┃╱┃┃╱╱╱╱┃╰━╯┃╱╭╮╱┃╰━╯┃╱┃╰━╯┃</br>' +
		'╱╰━━━╯╱╰━━╯╱╰╯╰╯╰╯╱╰━━━╯╱╰╯╱╰╯╱╰╯╱╱╱╱╰━━━╯╱╰╯╱╰━━━╯╱╰━━━╯</br>' +
		'</p>' +
		'<p># Social</p>' +
		'<p>• ' +
		link('https://github.com/simbafs', { text: 'GitHub', external: true }) +
		'</p>' +
		'<p>• ' +
		link('https://twitter.com/simbafs', {
			text: 'Twitter',
			external: true,
		}) +
		'</p>'
	)
}
