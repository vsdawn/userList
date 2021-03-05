import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './UserList.css'

window.React = React;


export default (props) => {  

  const[searchItem, setSearchItem] = React.useState('')
  const[hidePopup, setHidePopup] = React.useState(true)
  const[filterUser, setFilterUser] = React.useState({})

  const editSearchItem = (e) => {
    setSearchItem(e.target.value)
    dynamicSearch()
  }
  const newData = props?.data?.filter(data => data?.first_name?.toLowerCase().includes(searchItem?.toLowerCase()))
  console.log("newdata...", newData)
  const dynamicSearch = () => {
    return props?.data?.filter(data => data?.first_name?.toLowerCase().includes(searchItem?.toLowerCase()))
  }

  console.log("this.props.data",props.data)
  let commentNodes = props?.data?.map(function (data, index) {
    return <div key={index}>{data.email}</div>;
  });

  const userClick = (name) => {
    setFilterUser(props?.data?.filter(data => data.first_name == name)[0])
    console.log("filterUser.....", filterUser)
    setHidePopup(false)
  }

  const onClose = () => {
    setHidePopup(true)
  }

  return (
    <div id="project-comments" className="commentList">
      <div>
        <h1 style={{textAlign:"center"}}>Users List</h1>
        <div style={{marginBottom:"20px", textAlign:"center"}}>
          <input type='text' value={searchItem} onChange={editSearchItem} placeholder="Search users name..." />
          {/* {newData?.map(data => (
            <div>{data.first_name}</div>
          ))} */}
        </div> 
        {hidePopup && <table>
          <tr>
            <th>Profile</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Id</th>
          </tr>
          {newData?.map((data, index) => (
            <tr key={index} onClick={() => userClick(data.first_name)}>
              <td><img style={{width:"20px", height:"20px", borderRadius:"10px"}} src={data.avatar} alt="Logo" /></td>
              <td>{data.first_name}</td>
              <td>{data.last_name}</td>
              <td>{data.email}</td>
            </tr>
          ))}
        </table>}
        <div>
          {hidePopup == false && filterUser ? <div class="cards-list">
            <div class="card 1">
              <div class="card_image"> <img src={filterUser.avatar} /> </div>
              <div class="card_title title-white">
                <p>{filterUser?.first_name + "" + filterUser?.last_name}</p>
                <p>{filterUser?.email}</p>
                <button onClick={() => onClose()}>close</button>
              </div>
            </div>
          </div>:null}
        </div>
      </div>
    </div>
  );
}

