import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from "react-bootstrap";
const Datatable = () => {
  const [data,dataChange] = useState(null)
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  useEffect(()=>{
    fetch("http://localhost:8000/posts").then((res)=>{
      return res.json()
    }).then((resp)=>{
      dataChange(resp)
    }).catch((err)=>{
      console.log(err.message)
    })
  },[])

  
  return (
    <>
    {values.map((v, idx) => (
      <Button style={{position:'absolute',borderRadius:'8px',marginTop:'-37px',color:'black' ,margin:"-38px 65px", backgroundColor:'#6c757d' ,border:'1px #fff'}} key={idx} className="me-2 mb-1" onClick={() => handleShow(v)}>
        Results
        {typeof v === 'string' && `below ${v.split('-')[0]}`}
      </Button>
    ))}
    <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title ></Modal.Title>
      </Modal.Header >
      <Modal.Body style={{backgroundColor:'#282621'}}>
      <div  className="container">
            <div className="card">
                <div className="card-title">
                </div>
                <div className="card-body">
                    <div className="divbtn">
                    </div>
                    <Table  striped bordered hover variant="dark">
                        <thead id='head' className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Username</td>
                                <td>Crashbet</td>
                                <td>CrashScore</td>
                            </tr>
                        </thead>
                        <tbody>

                            {data &&
                                data.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.value}</td>
                                        <td>{item.point}</td>
                                       
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>    
      </Modal.Body>
    </Modal>
  </>
);
}




export default Datatable;
