import { useEffect, useState } from 'react';

export default () => {
    function goTop() {
        document.body.scrollTo({top: 0, behavior: "smooth"});
    }
    const [show, changeShow] = useState(false);
    useEffect(() => {
        document.body.addEventListener('scroll', () => {
            if (document.body.scrollTop > 0){
                changeShow(true);
            } else {
                changeShow(false);
            }
        }) 
    }, [])
    return (
		<span style={{display: show ? '' : 'none'}} className="m-back" onClick={goTop}></span>
    )
}