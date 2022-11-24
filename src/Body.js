import React, { useEffect, useState } from "react";
import './Header.css'


export default function Body(){

    const getLocalItem = ()=> {
        let list = localStorage.getItem("lists");
        if(list){
            return JSON.parse(list);
        }else{
            return [];
        }
    }

    const [task, setTask] = useState("");
    const [arr, setArr] = useState(getLocalItem);
    const [showEdit, setShowEdit] = useState(-1);
    const [ updatedText, setUpadatedText] = useState("");
    const [lgIn, setLgIn] =useState(false);

    function addTask(){
        if(!task){
            alert("Please enter a post");
            return;
        }
        const item = {
            id: Math.floor(Math.random()*1000),
            value: task,
        }

        setArr(oldList => [...oldList,item]);
        

        setTask("")
    }

    function deleteItem(id){
        const newArr = arr.filter((i)=>i.id!==id)
        setArr(newArr)         
    }

    function editItem(id, newTask){
        console.log(updatedText)
        const newItem = {
            id: id,
            value: newTask,
        }
        if(!newTask){
            alert("Please enter a post");
            return;
        }

        deleteItem(id);

        setArr((oldList)=> [...oldList, newItem]);

        setUpadatedText("");
        setShowEdit(-1);

    }

    const checkLogin = () => {
        if(lgIn){
            setShowEdit(-1)
        }
        setLgIn(!lgIn)
        
    }

    useEffect(()=>{
        localStorage.setItem("lists", JSON.stringify(arr));
    }, [arr])

    return(
        <React.Fragment>
            <div className="header">
                <h1 className="heading">PostBook</h1>
                {/* <GoogleBtn /> */}
                <button onClick={checkLogin} className='btn' > {lgIn ? "Logout" : "Login"} </button>
            </div>
            <div className="input" >
                <input className="taskHolder" type="text" onChange={(e)=>{setTask(e.target.value)}} placeholder="Enter Post" value={task}></input>
                <br />
            {lgIn? <button className="btn" onClick={addTask} >Add Post</button>: <button className="btn" onClick={() => alert("login to post")}>Add Post</button>}
            </div>
           
            <div className="tasks" >
            <ol>
                    {arr.map((t) => {
                        return(<>
                            <div className="post">
                                <li key = {t.id} onClick={() => 
                                    lgIn ? setShowEdit(t.id): null
                                } style={{margin: 15}}>{t.value} 
                                 </li> 
                            
                            {showEdit === t.id ? (
                                <div style={{margin: 15}}>
                                    <div className="post">
                                    <input type="text" value={updatedText} onChange={(e)=>setUpadatedText(e.target.value)}></input>
                                    {/* </div>
                                    <div> */}
                                    <button onClick={()=> editItem(t.id, updatedText)} >Update Post</button>
                                    </div>
                                    {lgIn? <button className="delete" onClick={()=>deleteItem(t.id)} >Remove Post</button>: null}
                                </div>
                            ): null}

                            </div>
                            </>
                            
                            
                        )
                    })}
            </ol>
            </div>
            
        </React.Fragment>
    );
}
