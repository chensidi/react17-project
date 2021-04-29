import store from '@/store';
import { getSongInfo, setHistory, setCurSong } from '@/store/action';
import commonRequest from '@/api/common';
import albumApi from '@/api/album';
import toplistApi from '@/api/toplist';
import { message } from 'antd';

async function getSongDetails(id) {
    const url = await commonRequest.getSongUrl(id);
    const details = await commonRequest.getSongDetails(id);
    return { id, details, url };
}

export function mediaTimeFormat(time) { //毫秒转
    time = Math.round(time);
    const min = parseInt(time / 60).toString(),
          sec = (time % 60).toString();
    return `${min.padStart(2, 0)}:${sec.padStart(2, 0)}`
}

export function formatLrc(lrc) { //歌词转数组
    if (typeof lrc !== 'string') return [];
    let split1 = lrc.split('[')
    split1.shift();
    let split2 = [];
    split1.map((item) => {
        let temp = item.split(']');
        let time = temp[0];
        time = time.split(':');
        time = parseInt(time[0]) * 60 + Math.round(time[1]);
        if(temp[1].trim() != '') { //排除空歌词
            split2.push({
                time,
                txt: temp[1]
            })
        }
    })
    return split2;
}

export function lrcFilter(lrc) { //截取歌词文字部分，排除时间片段
    let split1 = lrc.split('[')
    split1.shift();
    let split2 = [];
    split1.map((item) => {
        let temp = item.split(']');
        let time = temp[0];
        time = time.split(':');
        time = parseInt(time[0]) * 60 + Math.round(time[1]);
        if(temp[1].trim() != '') { //排除空歌词
            split2.push(temp[1])
        }
    })
    return split2;
}

export function artistsFormat(ar, attr='name') { //多位艺人合并
    let artistsArr = [];
    ar.map(item => {
        artistsArr.push(item[attr]);
    })
    return artistsArr.join('/');
}

export function playTimesFormat(num, unit = 10000, unitName = '万') { //数量级转换
    return num >= unit ? (num / unit).toFixed(1) + unitName : num;
}

export function getRandom(min, max, exclude = []) { //产生随机数
    let item = min + (max - min) * Math.random();
    item = Math.floor(item);
    if (exclude.includes(item)) {
        return getRandom(min, max, exclude);
    } else {
        return item;
    }
}

export function playItem(id) { //播放单曲
    const historyPlay = store.getState().globalData.historyPlay;
    let exist = false;
    for(let i = 0; i < historyPlay.length; i ++) {
        if (historyPlay[i].id === id) {
            if (id === store.getState().globalData.curSong.id) return;
            exist = true;
            break;
        }
    }
    store.dispatch(getSongInfo(id)).then((res) => {
        // console.log(res);
        if (exist) return;
        const song = res.song;
        const nowItem = {
            url: song.url,
            name: song.name,
            singer: song.singer,
            id: song.id,
            alblum: song.alblum,
            duration: song.duration
        }
        historyPlay.unshift(nowItem);
        store.dispatch(setHistory([...historyPlay]));
    })
}

export function addToPlay(id) { //添加到播放列表
    const historyPlay = store.getState().globalData.historyPlay;
    let exist = false;
    for(let i = 0; i < historyPlay.length; i ++) {
        if (historyPlay[i].id == id) {
            exist = true;
            message.success('此歌曲已在播放列表中', 1);
            break;
        }
    }
    if (exist) return;
    getSongDetails(id).then(res => {
        const { id, url, details } = res;
        const addItem = {
            url,
            name: details.name,
            singer: artistsFormat(details.ar),
            id,
            alblum: details.al,
            duration: mediaTimeFormat(details.dt / 1000)
        }
        historyPlay.push(addItem); 
        store.dispatch(setHistory([...historyPlay]));
        message.success('已添加到播放列表', 1);
    })
}

export async function delFromPlay(id, e) { //从播放列表里删除
    e.stopPropagation();
    const historyPlay = store.getState().globalData.historyPlay;
    let idx, curId;
    for(let i = 0; i < historyPlay.length; i ++) {
        if (historyPlay[i].id === id) {
            idx = i;
            curId = id;
            break;
        }
    }
    if (idx == null) return;
    console.log(idx);
    historyPlay.splice(idx, 1);
    store.dispatch(setHistory([...historyPlay]));

    if (curId === store.getState().globalData.curSong.id) { //删除的正在playing
        if (idx >= historyPlay.length) {
            idx = historyPlay.length - 1;
        }
        const res = await commonRequest.getLyric(historyPlay[idx].id);
        store.dispatch(setCurSong({...historyPlay[idx], lyc: res}));
        document.querySelector('.listlyric').scrollTop = 0;
    }
}

export function replaceHistory(list) { //替换播放历史记录
    const newList = list.map(item => {
        const addItem = {
            url: '',
            name: item.name,
            singer: artistsFormat(item.ar),
            id: item.id,
            alblum: item.al,
            duration: mediaTimeFormat(item.dt / 1000)
        }
        return addItem;
    })
    store.dispatch(setHistory([...newList]));
}

export function clearHistory() { //清除历史记录
    store.dispatch(setHistory([]));
}

export function timeToYMD(time) {
    if (isNaN(Number(time))) return time;
    const date = new Date(time);
    const [year, month, day] = [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, 0),
        date.getDate().toString().padStart(2, 0)
    ]
    return [year, month, day].join('-');
}

export async function playAlbum(id) { //播放整张专辑内容
    const res = await albumApi.getAlbumInfo(id);
    //将历史记录变为当前专辑列表
    replaceHistory(res.songs);
    //将当前播放歌曲切换为该专辑第一首歌曲
    playItem(res.songs[0].id);
}

export async function playList(id, songs = []) { //播放整张歌单
    let res = songs;
    if (songs.length === 0) {
        res = await toplistApi.getTopDetails(id);
        res = res.tracks;
    }
    //将历史记录变为当前专辑列表
    replaceHistory(res);
    //将当前播放歌曲切换为该专辑第一首歌曲
    playItem(res[0].id);
}

