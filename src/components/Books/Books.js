import React, { useEffect, useState } from 'react'
import BookService from '../../repository/bookRepository';
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "reactstrap";
import CardHeader from "@material-ui/core/CardHeader";
import Pagination from "@material-ui/lab/Pagination";
import './Books.css'
import Loading from "../loading/loading";
import {Link} from 'react-router-dom';
import {TiArrowSortedDown} from 'react-icons/ti';
import {TiArrowSortedUp} from 'react-icons/ti';
import {BiHeart} from 'react-icons/bi';
import useLocalStorage from '../useLocalStorage/useLocalStorage';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {RiChatHeartFill} from 'react-icons/ri';
import {
    Grid,
    CardContent,
} from "@material-ui/core/";
import UserService from '../../repository/userRepository';
import AuthenticationService from '../../services/AuthenticationService';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  }
})); 

const Books=()=> {
 const classes = useStyles();
 const MySwal = withReactContent(Swal);
 const[books, setBooks]=useState([]);
 const [clicked,setClicked]=useState(true)
 const [page, setPage]=useState(1);
 const [page2, setPage2]=useState(1);
 const [loading, setLoading] = useState(false)
 const [sort, setSort]=useState(false)
 const [recordToShow,setRecordToShow]=useState({})
// const [favouriteBooks, setFavouriteBooks]=useLocalStorage("favouriteBooks",[])
 const [wishlist, setWishList]=useState(books)
 const [allBooks, setAllBooks]=useState([]);
 const [bookId, setBookId]=useState(0)
 const [booksForUser, setBooksForUser]=useState([])
 const [disabledButton,setDisabledButton]=useState(false)
 const [disabledArr,setDisabledArr]=useState([])
 const favourites=wishlist

 const [formData, setFormData] = useState({
  isAsc: "true",
  sortName: "empty",
  name:null,
  author:null,
  price:null,
  new_price:null,
  shop:null

})

 const [totalElements, setTotalElements]=useState(0)
 const [rowsPerPage, setRowsPerPage] = React.useState(12);
 const [user,setUser]=React.useState({})
 const [addedBook,setAddedBook]=React.useState({})
 const handleChange = (e) => {

  setFormData({
      ...formData,
      [e.target.name]: e.target.value
  });

}

 const handleChangePage = (event, newPage) => {
       
  setPage(newPage);
  getAllBooks(newPage)
  setLoading(true)
};
const handleChangePage2 = (event, newPage) => {
       
  setPage2(newPage);
  sortAll(newPage)
  // setLoading(true)
};


 const getAllBooks=(page)=>{
     page=page-1;
     const bookFilter = {
     isAsc: formData.isAsc,
  sortName: formData.sortName,
  name:formData.name,
  author:formData.author,
  price:formData.price,
  new_price:formData.new_price,
  shop:formData.shop
  }
  setLoading(true)

     BookService.getAllBooksWithPagination(page, rowsPerPage, bookFilter)
     .then(response => response.data).then((data) => {
       setLoading(false)
      setBooks(data.content)
      setTotalElements(data.totalPages);
      setPage(data.number+1)
      
    //  console.log(data.content)
  });

 }

const search=()=>{
  getAllBooks(page)
}

function transliterate(word){
  word.toLowerCase();
  word.replace("– (тврд повез)","")
  var answer = ""
    , a = {};

 a["а"]="a";a["б"]="b";a["в"]="v";a["г"]="g";a["д"]="d";a["ѓ"]="g";a["е"]="e";a["ж"]="z";a["з"]="z";a["ѕ"]="z";a["и"]="i";a["ј"]="j";a["к"]="k";
 a["л"]="l";a["м"]="m";a["н"]="n";a["њ"]="nj";a["о"]="o";a["п"]="p";a["р"]="r";a["с"]="s";a["т"]="t";a["ќ"]="ќ";a["у"]="u";a["ф"]="f";a["х"]="h";
 a["ц"]="c";a["ч"]="c";a["џ"]="џ";a["ш"]="s"; a[" "]="-"; 

 a["А"]="a";a["Б"]="b";a["В"]="v";a["Г"]="g";a["Д"]="d";a["Ѓ"]="g";a["Е"]="e";a["Ж"]="z";a["З"]="z";a["Ѕ"]="z";a["И"]="i";a["Ј"]="j";a["К"]="k";
 a["Л"]="l";a["Љ"]="l"; a["М"]="m";a["Н"]="n";a["Њ"]="nj";a["О"]="o";a["П"]="p";a["Р"]="r";a["С"]="s";a["Т"]="t";a["Ќ"]="ќ";a["У"]="u";a["ф"]="f";a["Х"]="h";
 a["Ц"]="c";a["Ч"]="c";a["Џ"]="џ";a["Ш"]="s"; a[" "]="-"; 

 for (var i in word){
   if (word.hasOwnProperty(i)) {
     if (a[word[i]] === undefined){
       answer += word[i];
     } else {
       answer += a[word[i]];
     }
   }
 }

 return answer;
}


const sortByPriceAsc=()=>{
  setClicked(!clicked)
  var obj = [...books];
  for (let k in obj) {
    if (obj[k].new_price!=="") {
      obj.sort((a,b) => a.new_price - b.new_price);
    }
    else{
      obj.sort((a,b) => a.price - b.price);
    }
}
setBooks(obj)

}
const sortByPriceDesc=()=>{
setClicked(!clicked)
  var obj = [...books];
  for (let k in obj) {
    if (obj[k].new_price!=="") {
      obj.sort((a,b) => b.new_price - a.new_price);
    }
    else{
      obj.sort((a,b) => b.price - a.price);
    }
}
setBooks(obj)

}
const sortAll=(pageS)=>{
  pageS=pageS-1;
  BookService.sortBooksByPrice(pageS, rowsPerPage)
  .then(response=>response.data).then((data)=>{
    setSort(true)
    setBooks(data.content)
    setTotalElements(data.totalPages);
    setPage2(data.number+1)
  })
}
const sorting=()=>{
  sortAll(page2)
}
const sortAllBooks=()=>{
  var obj = [...allBooks];
  for (let k in obj) {
    if (obj[k].new_price!=="") {
      obj.sort((a,b) => a.new_price - b.new_price);
    }
    else{
      obj.sort((a,b) => a.price - b.price);
    }
}
setBooks(obj)

}
const addToFavourites=(book)=>{
  //  setFavouriteBooks([book, ...favouriteBooks]);
  // setBooks([book, ...books ]);
  BookService.addToFavourites(book.id).then(res=>{
    setBooks((preBooks) =>
    preBooks.map((book) => {
      if(book.id===res.data.id){
      return {
        ...book,
        favourite:  res.data.favourite
      };
    }
    return book;
    })
  );
  })

MySwal.fire({
  title: <strong>Додадено!</strong>,
  icon: 'success',
}).then(
  

  
);
}
const findAllBooks=()=>{
  BookService.getAllBooks().then(res=>{
    console.log(res.data)
    setAllBooks(res.data)

  })
}
const getUserDetails=()=>{
  AuthenticationService.getUserDetails().then(res=>{
    //  console.log(res.data)
    setUser(res.data)
  })
}
const addBookToFavoruites=(book)=>{
  const bookHelper={
    userId:user,
    bookId:book,
  }
 var disabledIds=[];
  BookService.addBookToFavoruites(bookHelper).then(res=>{

setAddedBook(res.data)
setBookId(res.data.books.id)
setDisabledArr(disabledArr => [...disabledArr,res.data.books.id] );

MySwal.fire({
  title: <strong>Додадено!</strong>,
  icon: 'success',
}).then(

  console.log("od dodadeno", disabledArr)
);
  })
  
}
const getBooksForUser=()=>{
  var newFav=[]
  var disabledIds=[]
  BookService.getBooksForUser(localStorage.getItem("loggedUserId")).then(res=>{
    res.data.map(book=>{
      newFav.push(book.books)
    })
    setBooksForUser(newFav)
    console.log("newFav", newFav)
    console.log("booksForUser", booksForUser)
    for(var i=0;i<newFav.length;i++)
    {
      disabledIds.push(newFav[i].id)
    }
    console.log("disabledIds",disabledIds)
    setDisabledArr(disabledIds)
    console.log("arrrr", disabledArr)

  })
    
 
}



 
 useEffect(()=>{
    getAllBooks(page)
    if(localStorage.getItem("Token")!==null)
    {
      getUserDetails();
      getBooksForUser();
    }
  

  return () => {
  }

 },[])   
  return (
    ///
    <div>
      {loading && <Loading/>}

      <div className="row mt-5 filter" style={{marginLeft:"100px"}}>
                                       <div className="col">
                                         <input className="form-control" id="filterFieldName" placeholder="Пребарувај по име..." name="name"
                                          onKeyUp={search} onChange={handleChange} 
                                   type="text" />
                                   </div>
                                   <div className="col">
                                           <input className="form-control" id="filterFieldAuthor" placeholder="Пребарувај по автор..." name="author"
                                           onKeyUp={search}  onChange={handleChange}
                                   type="text"  />
                                   </div>
                                   <div className="col">
                            <input  className="form-control" id="filterFieldPrice" placeholder="Пребарувај по цена..." name="price"
                          
                                   type="number" onChange={handleChange}  onKeyUp={search}   />
                                   </div>
                                   <div className="col">
                            <button type="button" className="btn text-white" style={{backgroundColor:"#F58634", width:"200px"}} onClick={search}>Пребарај</button>
                                   </div>
                                   <div className="col">
                                     {clicked ?
                            <button type="button" id="sortAll" onClick={sortByPriceAsc} className="btn">Сортирај по цена <TiArrowSortedUp/> </button>
                            :
                            <button type="button" id="sortAll" onClick={sortByPriceDesc} className="btn">Сортирај по цена <TiArrowSortedDown/> </button>
                                     }
                                   </div>
                                  

                                   </div>
   
                                 
                                   {!loading &&
      <div className="container">
      <div className="row mt-5">
      {books.map(elem=>{
        return (
    <div className="col-md-3">
    
     
  <div className="card mb-2">
 < a href={elem.linkToBook}>
  <img className="card-img-top" src={elem.image} />
  </a>
  <BiHeart className='heart'/>
                                  <div className="card-body" style={{textAlign:"center"}}>
                                    <div style={{display:"flex", justifyContent:"space-evenly"}}>
                                  
                                      {localStorage.getItem("Token")!==null ?
                                
                                 
                                  <button className='btn btn-warning addFav' disabled={disabledArr.indexOf(elem.id)!==-1}   id={`addToFavourites-${elem.id}`} style={{color:"white"}} onClick={()=>{addBookToFavoruites(elem)}}><RiChatHeartFill id="heaart" style={{fontSize:"2rem"}}/></button>
                                   :
                                   null
                                  }
                                      <h4 className="card-title">{elem.name}</h4>
                                  
                                 </div>
                                      <p className='card-text' >{elem.author!=="" ? elem.author : <br/>}</p>
                                      {elem.new_price!=="" ? <del style={{color:"red"}}>{parseInt(elem.price) + " ден."}</del> : elem.price==="" ? "" : parseInt(elem.price) + " ден."}
              <br/>
                                      
                                      {elem.new_price==="" ? "" : <p style={{color:"green"}}>{parseInt(elem.new_price) + "ден. "}</p>}
                                 
              {elem.shop==="sakamknigi" ? <p id="knizara" style={{textTransform:"uppercase", color:"red", fontWeight:"bold", textAlign:"center"}}>Сакам книги</p>
              : elem.shop==="tri" ? <p id="knizara" style={{textTransform:"uppercase", color:"red", fontWeight:"bold",textAlign:"center"}}>Три</p>
              :elem.shop==="matica"  ? <p id="knizara" style={{textTransform:"uppercase", color:"red", fontWeight:"bold",textAlign:"center"}}>Матица</p> 
              :elem.shop==="kupikniga"  ? <p id="knizara" style={{textTransform:"uppercase", color:"red", fontWeight:"bold",textAlign:"center"}}>Купи книга</p> 
              :elem.shop==="antolog"  ? <p id="knizara" style={{textTransform:"uppercase", color:"red", fontWeight:"bold",textAlign:"center"}}>Антолог</p> 
              :elem.shop==="gjurgja"  ? <p id="knizara" style={{textTransform:"uppercase", color:"red", fontWeight:"bold",textAlign:"center"}}>Ѓурѓа</p> 
              :elem.shop==="martina"  ? <p id="knizara" style={{textTransform:"uppercase", color:"red", fontWeight:"bold",textAlign:"center"}}>Мартина</p> 
              :elem.shop==="toper"  ? <p id="knizara" style={{textTransform:"uppercase", color:"red", fontWeight:"bold",textAlign:"center"}}>Топер</p> 
            :null} 
                                    
                               
                                  </div>
                              </div>

  </div>
        )
      })}
            {books.length===0 ? <div></div> :
      sort ? 
      <Pagination style={{float:"right"}}
            className="my-3"
            count={totalElements}
            page={page2}
            siblingCount={1}
            boundaryCount={1}
            onChange={handleChangePage2}
          />
          :
          <Pagination style={{float:"right"}}
          className="my-3"
          count={totalElements}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          onChange={handleChangePage}
        />
      }
  </div>
</div>

}


  
  

    </div>
  )
}

export default Books