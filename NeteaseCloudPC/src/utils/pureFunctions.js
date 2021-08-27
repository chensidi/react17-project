import { areaList } from '@vant/area-data';
import * as crypto from 'crypto';
import { message, Modal } from 'antd';
import sessionStore from './sessionStore';

var key = '@(5h)-$3_if(*%#';  

export const areaFormat = (cityCode, type = 1) => { //根据城市编号获取地区
    /* 
        cityCode 代表城市代码
        type 代表转换形式
        1. 省 - 市
        2. 省
        3. 市
    */
    if (cityCode == null) {
        return '来自火星';
    }
    let provinceCode = ~~(cityCode / 1000) * 1000;
    // 510100 成都市
    // 510000 四川省
    let province = areaList.province_list[provinceCode],
        city = areaList.city_list[cityCode];
    switch (type) {
        case 1:
            return `${province} - ${city}`;
        case 2:
            return `${province}`;
        case 3:
            return `${city}`;
    }
}

export function aesEncrypt(data, key='g6@d5*&f8fe$s4ff8e') { //加密
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

export function downLoadImg(url, name) { //下载图片
    const aTag = document.createElement('a');
    aTag.setAttribute('href', url);
    aTag.setAttribute('download', name);
    document.body.append(aTag);
    aTag.click();
    document.body.removeChild(aTag);
}

// 下载服务器的MP3文件
export const downloadMp3 = (filePath, name, showTips = true) => {
    const key = filePath;
    showTips && message.loading({ content: `《${name}》正在下载中...`, key })
    fetch(filePath).then(res => res.blob()).then(blob => {
        const a = document.createElement('a');
        document.body.appendChild(a)
        a.style.display = 'none';
        // 使用获取到的blob对象创建的url
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        // 指定下载的文件名
        a.download = name;
        a.click();
        document.body.removeChild(a)
        // 移除blob对象的url
        window.URL.revokeObjectURL(url);
        showTips && message.success({ content: `《${name}》下载完成`, key })
    });
}

export function parseJson(jsonObj, path) {
    let target = JSON.parse(jsonObj),
        pathArr = path.split('.');
    
    while (pathArr.length) {
        let prop = pathArr.shift();
        target = target?.[prop];
    }

    return target;
}

export function enterTips() {
	const tag = sessionStore.get('enter');
	if (JSON.stringify(tag) === '{}') {
		Modal.info({
			width: 700,
			title: 'FBI Warning 郑重提示',
			content: (
				<div>
					<p>
						本项目是使用react17版本，结合相关技术栈
						借鉴网易云官方网站的交互和布局，并参考部分样式
						完成的一次独立开发过程，后台接口是nodeJS的neteasecloudmusicapi
						如果您觉得该项目还行，还望多多star，欢迎issue.
					</p>
					<h3>
						在此声明，本项目仅用于学习，不用做其他用途，听歌请上网易官网，本人学友哥骨灰级粉丝
					</h3>
					<p>github地址: <a target="_blank" href="https://github.com/chensidi/react17-project">https://github.com/chensidi/react17-project</a></p>
					<p>gitee地址: <a target="_blank" href="https://gitee.com/chensidi/react17-project">https://gitee.com/chensidi/react17-project</a></p>
				</div>
			),
			onOk() {
				sessionStore.set('enter', true);
			},
		});
	}
}