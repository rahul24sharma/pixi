import React from 'react'
import { useState,useEffect } from 'react'
import './Box.css'
import { DataGridPro } from '@mui/x-data-grid-pro';


const Box = () => {
  const [activeIndex, setActiveIndex] = useState(0);
   const [data, setData] = useState([]);

   const columns = [
   // { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Username', width: 150 },
    { field: 'value', headerName: 'Bet', width: 100 },
    { field: 'point', headerName: 'Multiplier', width: 100 },


  ];
  
  useEffect(()=>{
    fetch("http://localhost:8000/posts").then((res)=>{
      return res.json()
    }).then((resp)=>{
      setData(resp)
    }).catch((err)=>{
      console.log(err.message)
    })
  },[])

  

  useEffect(() => {
    // Set the first link as active
    setActiveIndex(0);
  }, []);

  const handleLinkClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <div>
      <div className='cont'>
      <nav className="navbar">
      <ul>
        <li>
          <a
            href="#"
            className={activeIndex === 0 ? 'active' : ''}
            onClick={() => handleLinkClick(0)}
          >
            All Bets
          </a>
        </li>
        <li>
          <a
            href="#"
            className={activeIndex === 1 ? 'active' : ''}
            onClick={() => handleLinkClick(1)}
          >
            My Bets
          </a>
        </li>
        <li>
          <a
            href="#"
            className={activeIndex === 2 ? 'active' : ''}
            onClick={() => handleLinkClick(2)}
          >
            Top
          </a>
        </li>
      </ul>
    </nav>
   
    <div className="container">

            <div className="card" style={{backgroundColor:'black'}}>
                <div className="card-title">
                </div>
                <div className="card-body">
                    <div style={{ height: 400, width: '100%'}}>
      <DataGridPro
        rows={data}
        columns={columns}
        licenseKey=""
        style={{ color: '#fff',backgroundColor:'#101010' }} 
        pageSize={5}
        checkboxSelection
      />
    </div>
                </div>
            </div>
        </div>  
      </div>
    </div>
  )
}

export default Box
