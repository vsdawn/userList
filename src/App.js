import React, {useEffect, useState} from 'react'
import './App.css';
import CommentList from './Container/UserList';
import ReactPaginate from 'react-paginate';
import axios from 'axios'
import {isEmpty} from 'lodash'

const App = () => {
  
  const[data, setData]= React.useState([])
  const[offset, setOffset]= React.useState(0)
  const[pageCount, setPageCount]= React.useState(1)


  const loadUserData = (value) => {
    let url = 'https://reqres.in/api/users?page=' + `${1 + offset/6}`
    console.log("url value", url)
    if(value || value == 0){
      url = 'https://reqres.in/api/users?page=' + `${1 + value/6}`
    }
  axios.get(url,{data: { limit: 6, offset: offset }})
  .then(function (response) {
    // handle success
    console.log(response);
    const allData = response.data
    console.log("data value is***", allData, "page number", allData.total / 6);
    setData(allData.data)
    console.log("data..............",data)
    setPageCount(Math.ceil(allData.total / 6))
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }

  
  useEffect(() => {
    if(isEmpty(data)){
      loadUserData()
    }
  }, [data])

  const handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * 6);

    // this.setState({ offset: offset }, () => {
    //   this.loadUserData();
    // });
    setOffset(offset)
    loadUserData(offset)
  };

  return (
    <div className="commentBox">
      <CommentList data={data} />
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default App
