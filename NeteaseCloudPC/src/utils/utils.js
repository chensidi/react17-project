export function mediaTimeFormat(time) { //毫秒转
    time = Math.round(time);
    const min = parseInt(time / 60).toString(),
          sec = (time % 60).toString();
    return `${min.padStart(2, 0)}:${sec.padStart(2, 0)}`
}