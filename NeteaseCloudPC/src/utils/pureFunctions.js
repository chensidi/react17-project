import { areaList } from '@vant/area-data';

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