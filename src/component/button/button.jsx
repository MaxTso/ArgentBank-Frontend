import './styles/button.scss'

export default function Button({ text, clas, click, typename = null }) {
    return (
        <button className={clas} onClick={click} type={typename}>{text}</button>
    )
}
