import { Component } from 'react';
import { connect } from 'react-redux';

/* 
    缓存页面，类似vue的keepalive，但仅仅是存储原来的state，如果数据极大慎用！
*/

const mapStateToProps = (state) => {
    return {
        keep: state.user.keep
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        open: (key) => dispatch({type: 'open', keep: key})
    }
}

const KeepAlive = (Com) => {
    let cache = {};
    class Alive extends Component {
        componentWillUnmount() {
            const state = this.com.state;
            cache = this.props.keep.includes(this.props.name) ? {...state} : {};
        }
        componentDidMount() {
            console.log(this.props)
            console.log(this.com);
            const state = this.com.state;
            this.props.keep.includes(this.props.name) && this.com.setState({...state, ...cache});
        }
        componentWillReceiveProps(nextProps) {
            console.log(nextProps);
        }
        render() {
            let dom = <Com ref={com => this.com = com} {...this.props} />;
            return (
                dom
            )
        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(Alive)
}

export default KeepAlive;