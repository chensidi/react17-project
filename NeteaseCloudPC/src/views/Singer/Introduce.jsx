import { useContext, Fragment } from 'react'
import { Intrs } from './Singer';

const Introduce = () => {
    const { 
        briefDesc = '',
        introduction = [],
        name = ''
    } = useContext(Intrs);
    return (
        <div className="n-artdesc">
            <h2>
                <i>&nbsp;</i>
                {name}简介
            </h2>
            <p>
                { briefDesc }
            </p>
            {
                introduction.map(item => {
                    return (
                        <Fragment key={item.ti}>
                            <h2>{ item.ti }</h2>
                            <p>{ item.txt }</p>
                        </Fragment>
                    )
                })
            }
        </div>
    )
}

export default Introduce;