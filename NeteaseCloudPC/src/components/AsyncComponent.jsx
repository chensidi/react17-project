import { Component } from "react"

/* 
    异步加载组件，类似于vue里的 () => import('xxxxx')
*/
const AsyncComponent = (importFn) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                Com: null
            }
        }
        componentDidMount() {
            this.setComponents();
        }
        setComponents = () => {
            importFn().then(Com => {
                this.setState({
                    Com: Com.default ? Com.default : null
                })
            })
        }
        render() {
            let Com = this.state.Com;
            return (
                Com ? (
                    <Com {...this.props}>
                        {this.props.children}
                    </Com>
                ) : null
            )
        }
    }
}

export default AsyncComponent;