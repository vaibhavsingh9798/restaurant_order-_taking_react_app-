

const Input = (prop) => {
  
    return(
        <>
         <div className="form-data">
            <label htmlFor="userName">{prop.label}  </label>
            <input type={prop.type}  name={prop.name} value={prop.value} onChange={prop.onChange}/>
            </div>
        </>
    )
}

export default Input ;