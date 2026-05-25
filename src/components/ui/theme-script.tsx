export function ThemeScript() {
  const code = `try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t==="dark");}catch{}`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
