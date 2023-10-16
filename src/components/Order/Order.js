import {  useEffect, useReducer, useState } from "react"
import './Order.css'
import Input from "../UI/Input/Input";
import ShowList from "../UI/ShowItem/ShowList";


function reducer (state,action){
      switch(action.type){
         case 'uid_change':{
           return {
             ...state,
             uid: action.nextUid
           }
         }
         break;
         case 'price_change':{
            return {
               ...state,
               price: action.nextPrice
            }
         }
         break;
         case 'desc_change':{
            return {
               ...state,
               desc: action.nextDesc
            }
         }
         break;
         case 'table_change':{
            return {
               ...state,
               table: action.nextTable
            }
         }
         break;
         case 'empty':
            return {uid:0,price:0,desc:'',table:1}
            break;
      }
}

const Order = (props) =>{

       const [error, setError] = useState(false);
       const [state,dispatch] = useReducer(reducer,{uid: 0,price: 0,desc:'',table:1})
       const [orderOne,setOrderOne] = useState([])
       const [orderTwo,setOrderTwo] = useState([])
       const [orderThree,setOrderThree] = useState([])

       useEffect(()=>{
         let tableOne = JSON.parse(localStorage.getItem('tableOne'))
          setOrderOne(tableOne)
            let tableTwo = JSON.parse(localStorage.getItem('tableTwo'))
          setOrderTwo(tableTwo)
            let tableThree = JSON.parse(localStorage.getItem('tableThree'))
          setOrderThree(tableThree)
       },[])
    
       const handleChanges = (e) =>{
         let name = e.target.name;
         let value = e.target.value;
         if(name == 'uid')
         dispatch({type:'uid_change',nextUid: value})
        else if(name == 'price')
        dispatch({type:'price_change',nextPrice: value})
        else if(name == 'desc')
        dispatch({type:'desc_change',nextDesc:value})
        else if(name == 'table')
        dispatch({type:'table_change',nextTable: value})
   
       }

    const handleSubmit = (event) =>{
      event.preventDefault()
      console.log('ans',state.uid && state.price && state.desc.trim().length && state.table,state.uid,state.price,state.desc.trim().length,state.table)
      if( state.uid && state.price && state.desc.trim().length && state.table) 
      {
          if(state.table == 1){
              setOrderOne([...orderOne,{...state}])
               localStorage.setItem('tableOne',JSON.stringify([...orderOne,{...state}]))
          }
          else if(state.table == 2){
            setOrderTwo([...orderTwo,{...state}])
              localStorage.setItem('tableTwo',JSON.stringify([...orderTwo,{...state}]))
          }else{
            console.log('3',state)
             setOrderThree([...orderThree,{...state}])
             localStorage.setItem('tableThree',JSON.stringify([...orderThree,{...state}]))

          }
      }
      else
      setError(true)
    dispatch({type:'empty'})
    }

    const handleDelete = (item) => {
     
       let uid = item.uid;
      if(item.table == 1){
       let updatedOrders =    orderOne.filter(item => item.uid != uid )
       setOrderOne(updatedOrders)
       localStorage.setItem('tableOne',JSON.stringify(updatedOrders))

      }else if(item.table == 2){
         let updatedOrders =    orderTwo.filter(item => item.uid != uid )
          setOrderTwo(updatedOrders)
          localStorage.setItem('tableTwo',JSON.stringify(updatedOrders))
      }else{
         let updatedOrders =    orderThree.filter(item => item.uid != uid )
         setOrderThree(updatedOrders)
         localStorage.setItem('tableThree',JSON.stringify(updatedOrders))
      }
    }

    return ( 
        <>
        <div className="form-container">
         
         <form onSubmit={handleSubmit}> 
          <Input type={'Number'} name={'uid'} label={'Unique Order Id '} value={state.uid} onChange={handleChanges} />
          <Input type={'Number'} name={'price'} label={'Price'} value={state.price} onChange={handleChanges} />
          <Input type={'text'} name={'desc'} label={'Description'} value={state.desc} onChange={handleChanges} />
          <div className="form-data">
            <label>Choose a Table</label>
            <select  name="table" value={state.table} onChange={handleChanges} className="form-data-option">
               <option value={1}>1</option>
               <option value={2}>2</option>
               <option value={3}>3</option>
            </select>
            </div>
            <div className="submit-button">
            <button type="submit">Add to Bill</button>
            </div>
         </form>
         </div>

            <div className="show-order">
               <h3>OrderList</h3>
               <h4>Table 1</h4>
               <ShowList list={orderOne} onDelete={handleDelete} />
               <h4>Table 2</h4>
               <ShowList list={orderTwo} onDelete={handleDelete} />
                <h4>Table 3</h4>
                <ShowList list={orderThree} onDelete={handleDelete} />
            </div>
        
        </>     
    )
}
export default Order ;