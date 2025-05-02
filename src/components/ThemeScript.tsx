export default function ThemeScript() {
	const code = `
      const matchMedia = window.matchMedia("(prefers-color-scheme: dark)")

      function updateTheme() {
        const documentElement = document.documentElement
        const theme = localStorage.getItem('color-theme')
        const userTheme = matchMedia.matches ? 'dark' : 'light'
        const themeToSet = theme || userTheme
  
        documentElement.classList.add(themeToSet);
        documentElement.style.colorScheme = themeToSet
      }
  
      updateTheme()

      matchMedia.addEventListener("change", updateTheme)
  `
	// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
	return <script dangerouslySetInnerHTML={{ __html: code }} />
}
