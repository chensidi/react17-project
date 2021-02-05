import { Component } from 'react';
import { connect } from 'react-redux';
import { setCurSong } from '@store/action';
import http from '@/api/http';
import { Button } from 'antd'

const mapStateToProps = (state) => {
    return {
        curSong: state.globalData.curSong,
        userInfo: state.user.userInfo
    }
}

const mapDispatchToProps = (dispath) => {
    return {
        setCurSong: (song) => dispath(setCurSong(song))
    }
}

class Home extends Component {
    componentDidMount() {
        http.get('/banner')
    }
    change = () => {
        this.props.setCurSong({
            song: 'aaa',
            url: 'ddd',
            singer: 'jacky'
        })
    }
    render() {
        return (
            <div>
                this is home page
                <p>
                    {this.props.curSong.name}
                    {this.props.curSong.url}
                    {this.props.curSong.singer}
                    {this.props.userInfo.name}
                </p>
                <p>
                    <Button onClick={this.change}>change song</Button>
                </p>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);