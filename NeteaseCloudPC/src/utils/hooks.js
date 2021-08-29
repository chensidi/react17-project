import { useState } from "react";

export const usePage = () => { //分页相关
    const [pageInfo, setPageInfo] = useState({
        total: 0,
        curPage: 1,
    });

    const [total, setTotal] = useState(0);
    const [curPage, setCurPage] = useState(1);

    return {total, setTotal, curPage, setCurPage};
}

export const useLoading = () => {
    const [loading, setLoading] = useState(true);

    const toggleLoad = (flag = true, timeout) => {
        if (typeof timeout === 'number') {
            setTimeout(setLoading(flag), timeout);
        } else {
            setLoading(flag);
        }
    }

    return { loading, toggleLoad }
}