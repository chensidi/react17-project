export function mediaTimeFormat(time) { //毫秒转
    time = Math.round(time);
    const min = parseInt(time / 60).toString(),
          sec = (time % 60).toString();
    return `${min.padStart(2, 0)}:${sec.padStart(2, 0)}`
}

export function formatLrc(lrc) { //歌词转数组
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