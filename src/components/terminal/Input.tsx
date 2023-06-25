import React, { useState } from 'react'
import { cmdList } from '../../shell/index'

export default function Input({
	updateHistory,
}: {
	updateHistory: React.Dispatch<{
		clear?: boolean
		next?: string[][]
	}>
}) {
	const [value, setValue] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') return
		updateHistory({
			next: [value.split(' ')],
		})
		setValue('')
	}

	return (
		<input
			type="text"
			className={`bg-base03 border-none outline-none flex-grow ${cmdList.includes(value.split(' ')[0]) || value.length === 0 ? 'text-green' : 'text-red'}`}
			autoFocus={true}
			autoComplete="off"
			spellCheck="false"
			tabIndex={0}
			value={value}
			onChange={handleChange}
			onKeyDown={handleEnter}
		/>
	)
}
