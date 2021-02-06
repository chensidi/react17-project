const Main = (props) => {
    return (
        <div className={['f-cb main-wrap', props.className].join(' ')}>
            {props.children}
        </div>
    )
}

export default Main;