import Main from '@/components/Main';
import Introduce from './components/Introduce';
import RadioTable from './components/RadioTable';
import radioApi from '@/api/radio';
import { useEffect, useState, createContext } from 'react';
import { useParams } from 'react-router';

export const ApiCtx = createContext();

export default function () {

    const [intr, setIntr] = useState({dj: {}});
    const getDetails = async () => { //电台介绍
        const res = await radioApi.getDetails(id);
        setIntr(res);
    }

    const [programList, setProgram] = useState([]);
    const [total, setTotal] = useState([]);
    const getProgram = async ({asc} = {}) => { //获取节目列表
        const res = await radioApi.getProgram(id, {asc});
        setProgram(res.programs)
        setTotal(res.count)
    }

    const { id } = useParams();

    useEffect(() => {
        document.body.scrollTo(0, 0)
        getDetails();
        getProgram();
    }, [])

    return (
        <Main className="g-bd4 f-cb">
            <section className="g-mn4">
                <div className="g-mn4c">
                    <div className="g-wrap6">
                        <Introduce {...intr} />
                        <ApiCtx.Provider value={{getProgram}}>
                            <RadioTable list={programList} total={total} />
                        </ApiCtx.Provider>
                    </div>
                </div>
            </section>
        </Main>
    )
}