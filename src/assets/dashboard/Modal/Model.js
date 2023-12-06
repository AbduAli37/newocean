import React from 'react'
import './model.css'
import { AiOutlineClose } from 'react-icons/ai'
const Model = ({children,header,show,toggle}) => {
  return (
    <div className={show?'model_big_div active':'model_big_div'}>
      <div onClick={()=>{
              toggle(!show);
            }} className="layout">
      </div>
      <div className="modal">
        <h3 className='modal_header'>
          <span>{header}</span>
          <AiOutlineClose
            onClick={()=>{
              toggle(!show);
            }}
          />
        </h3>
        <hr/>
        <div className="modal_body">
          {children?children:null}
        </div>
      </div>
    </div>
  )
}

export default Model
