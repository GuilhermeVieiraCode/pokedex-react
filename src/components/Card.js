import React from 'react';
import '../styles/card-container.css'
import '../styles/types.css'

const Card = ({ data }) => {
    
    return(
        <div className='card'>
            <img src={data.sprites.front_default} alt="pokemon"></img>
            <div className='types'>
                {data.types.map((item,index) => {
                    return(
                    <div className={item.type.name} key={index}>
                        {item.type.name.replace(/^\w/, (c) => c.toUpperCase())}
                    </div>
                    )
                })
                }
            </div>
            <div className='card-title'>
                <p>{data.name.replace(/^\w/, (c) => c.toUpperCase())}</p>
            </div>
        </div>
    )
}

export default Card;