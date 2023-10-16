import './ShowList.css'

const ShowList = (prop) =>{

    return(
        <>
        {prop.list.map((item,ind) =>(
           <ul key={item.uid}>
            <li>
                <div className='content'>
                <div>{item.uid}</div> <div>{item.desc} </div>  <div> {item.price} </div> <button onClick={() => prop.onDelete(item)}>Delete</button>
                </div>
                </li>
           
           </ul>
        ))}
        </>
    )
}

export default ShowList;