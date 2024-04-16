import React, { useState } from 'react'

function Readmore({str}) {


    const[fullstr,setfullstr]=useState(false)
    const showfullstr = (e) => {
        e.preventDefault();
        setfullstr(true);
    };
    
    const replaceString=(str,num)=>{
        if(str?.length>num && !fullstr)
        {
            return (
                <>
                {str.slice(0,num)+'...'}
                <button onClick={showfullstr}>Read more</button>
                </>
                )
        }
        else
            return str;
        
    }
  return (
    <div>
        <p className='my-4 w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{replaceString(str,150)}</p>
    </div>
  )
}

export default Readmore