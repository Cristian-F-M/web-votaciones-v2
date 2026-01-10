export function getModelsNames(...keys: (string | undefined)[]) {
	return keys.map((k) => {
		if (!k) return

		let newKey = structuredClone(k)

		if (newKey.endsWith('s')) newKey = newKey.slice(0, -1)
		newKey = newKey.replace('Id', '')
		newKey = `${newKey.charAt(0).toUpperCase()}${newKey.slice(1)}`

		return newKey
	})
}
