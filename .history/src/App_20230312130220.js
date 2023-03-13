import { Alert, Button } from 'bootstrap';
import { useEffect, useState, useCallback, useContext } from 'react';
import './App.css';
import debounce from "lodash.debounce";
import { Link, useNavigate } from "react-router-dom";
import { EditedObjContext } from './shared/Shared';

function App() {

  let [Data, setData] = useState([]);
  const [DataFiltered, setDataFiltered] = useState([])
  const [categoryList, setcategoryList] = useState([])
  const [empty, setEmpty] = useState(true)
  const [query, setQuery] = useState("");
  const [searchIn, setsearchIn] = useState("نام");
  const [titleSort, setTitleSort] = useState("");
  const [titleSearch, setTitleSearch] = useState("");
  const [titleRow, setTitleRow] = useState("");
  const [row, setRow] = useState(30);
  const [page, setPage] = useState(1);
  const [newProcuctId, setNewProcuctId] = useState("");
  const [newProcuctTitle, setNewProcuctTitle] = useState("");
  const [newProcuctPrice, setNewProcuctPrice] = useState("");
  const [newProcuctDescription, setNewProcuctDescription] = useState("");
  const [newProcuctCategory, setNewProcuctCategory] = useState("");
  const navigate = useNavigate();
  let [EditedObj, setEditedObj] = useContext(EditedObjContext);


  const postData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      let result = await response.json();
      setData(result.products);
      if(EditedObj){
        Data.map((item)=>item.id===EditedObj.id?item.price=EditedObj.price:"")
      }

    } catch (err) {
      console.log("err = ", err);
    } finally {
    }
  };

  const postCategory = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/categories");
      let result = await response.json();
      setcategoryList(result)
      console.log(result)

    } catch (err) {
      console.log("err = ", err);
    } finally {
    }
  };

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 1000), []);

  const deleteProduct = async (x) => {
    if (window.confirm('Do you want to remove?'))
      try {
        const response = await fetch("https://dummyjson.com/products/" + x, {
          method: "DELETE"
        })
        console.log(response)
        setData(Data.filter(item => item.id !== x))
        if (response.status === 200) {
          alert("Removed seccessfully")
        }
      } catch (err) {
        console.log("err = ", err);
      } finally {
      }

  };

  const EditPage = (id) => {
    navigate("/products/" + id);
  }

  const addProduct = async () => {
    if (window.confirm('Do you want to Add it?'))
      if (isNaN(newProcuctId)) {
        alert("آیدی معتبر نیست ")
      }
      else if (isNaN(newProcuctPrice)) {
        alert("قیمت معتبر نیست ")
      }
      else
        try {
          const response = await fetch("https://dummyjson.com/products/add", {
            method: "POST",
            body: JSON.stringify(
              { id: newProcuctId, price: newProcuctPrice, description: newProcuctDescription, category: newProcuctCategory }
            )
          })
          console.log(response)

          setData((x) => [...x, { id: newProcuctId, title: newProcuctTitle, price: newProcuctPrice, description: newProcuctDescription, category: newProcuctCategory }])
          setEmpty(!empty)
          // setDataFiltered(Data)
          if (response.status === 200) {
            alert("add successfully")
            document.getElementById("inputNewId").value = ""
            document.getElementById("inputNewTitle").value = ""
            document.getElementById("inputNewCategory").value = ""
            document.getElementById("inputNewPrice").value = ""
            document.getElementById("inputNewDescription").value = ""
            if ((Math.ceil(Data.length / row)) > page) setPage(Math.ceil(DataFiltered.length / row))

          }

          console.log(DataFiltered)
        } catch (err) {
          console.log("err = ", err);
        } finally {
        }

  };

  useEffect(() => {
    postData()
    postCategory()
  }, []);

  useEffect(() => {
    filtering(searchIn)
  }, [query]);

  useEffect(() => {
    setDataFiltered(Data)
    console.log("Datachanged : ", Data)
  }, [Data]);

  useEffect(() => {
    setEmpty(!empty)

  }, [DataFiltered]);

  function compareById(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }
  function compareByCategory(a, b) {
    if (a.category < b.category) {
      return -1;
    }
    if (a.category > b.category) {
      return 1;
    }
    return 0;
  }
  function compareByName(a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  }
  function compareByPrice(a, b) {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  }
  const sorting = (i) => {
    if (empty !== true) {
      let vvvvvv = "";
      setDataFiltered(vvvvvv)
      setEmpty(true)
      switch (i) {

        case 1:
          setDataFiltered(Data.sort(compareById))
          break;

        case 2:
          setDataFiltered(Data.sort(compareByCategory))
          break;

        case 3:
          setDataFiltered(Data.sort(compareByName))
          break;

        case 4:
          setDataFiltered(Data.sort(compareByPrice))
          break;

        default:
          break;
      }
    }

    else {
      switch (i) {

        case 1:
          setDataFiltered(Data.sort(compareById))
          setEmpty(false)
          break;

        case 2:
          setDataFiltered(Data.sort(compareByCategory))
          setEmpty(false)
          break;

        case 3:
          setDataFiltered(Data.sort(compareByName))
          setEmpty(false)
          break;

        case 4:
          setDataFiltered(Data.sort(compareByPrice))
          setEmpty(false)
          break;

        default:
          break;
      }
    }
  }
  let uniqueTags = [];

  const filtering = (searchIn) => {

    switch (searchIn) {
      case "شناسه":
        Data
          .filter((data) => data.id.toString().toLowerCase().includes(query))
          .map((data, index) => {
            uniqueTags.push(data);

          });
        setDataFiltered(uniqueTags)
        break;

      case "نام":
        Data
          .filter((data) => data.title.toLowerCase().includes(query))
          .map((data, index) => {
            uniqueTags.push(data);

          });
        setDataFiltered(uniqueTags)
        break;

      case "قیمت":
        Data
          .filter((data) => data.price.toString().toLowerCase().includes(query))
          .map((data, index) => {
            uniqueTags.push(data);

          });
        setDataFiltered(uniqueTags)
        break;

      case "دسته بندی":
        Data
          .filter((data) => data.category.toLowerCase().includes(query))
          .map((data, index) => {
            uniqueTags.push(data);

          });
        setDataFiltered(uniqueTags)
        break;

      default:
        break;
    }



  };

  return <div className="App">
    <div className='containerr'>

      <div className='headButton'>
        <div className='left'>

          <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

              {titleRow !== "" ? titleRow : "ردیف"}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={() => { setRow(5); setTitleRow(5) }} >5</a>
              <a className="dropdown-item" onClick={() => { setRow(12); setTitleRow(12) }}>12  </a>
              <a className="dropdown-item" onClick={() => { setRow(30); setTitleRow(30) }}>30</a>
            </div>
          </div>


          <div className="dropdown">
            <button className="btn dropdown-toggle btn-sort" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

              {titleSort !== "" ? titleSort : "مرتب سازی براساس..."}

            </button>
            <div className="dropdown-menu dropDownSort" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={() => { sorting(1); setTitleSort("شناسه") }}>شناسه</a>
              <a className="dropdown-item" onClick={() => { sorting(2); setTitleSort("دسته بندی") }}>دسته بندی </a>
              <a className="dropdown-item" onClick={() => { sorting(3); setTitleSort("نام") }}>نام</a>
              <a className="dropdown-item" onClick={() => { sorting(4); setTitleSort("قیمت") }}>قیمت</a>
            </div>
          </div>

        </div>

        <div className='right'>

          <input className='inputSearch' onChange={debouncedChangeHandler}
            type="text" placeholder='متن...' />

          <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {titleSearch !== "" ? titleSearch : "جستجو در..."}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={() => { setsearchIn("شناسه"); setTitleSearch("شناسه") }}>شناسه</a>
              <a className="dropdown-item" onClick={() => { setsearchIn("دسته بندی"); setTitleSearch("دسته بندی") }} >دسته بندی </a>
              <a className="dropdown-item" onClick={() => { setsearchIn("نام"); setTitleSearch("نام") }}>نام</a>
              <a className="dropdown-item" onClick={() => { setsearchIn("قیمت"); setTitleSearch("قیمت") }}>قیمت</a>
            </div>
          </div>


        </div>
      </div>

      <table>
        <tr>
          <th>شناسه</th>
          <th>دسته بندی</th>
          <th>نام </th>
          <th>قیمت</th>
          <th>توضیحات </th>
          <th>اکشن </th>
        </tr>

        {query === "" ?
          DataFiltered ? DataFiltered.map((item, index) => (
            index < page * row && index + 1 > (page - 1) * row ?
              (<tr>
                <td>{item.id}</td>
                <td>{item.category}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td className='actionsTd'>
                  <button className='actions deleteAction' onClick={() => { deleteProduct(item.id) }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074z" fill="white" /></svg>
                  </button>
                  <button className='actions editAction' onClick={() => { EditPage(item.id) }}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.85355 0.146447C9.65829 -0.0488155 9.34171 -0.0488155 9.14645 0.146447L6.50002 2.79288L12.2071 8.49998L14.8536 5.85355C15.0488 5.65829 15.0488 5.34171 14.8536 5.14645L9.85355 0.146447Z" fill="white" /> <path d="M0 9.29289L5.79291 3.49998L11.5 9.20709L5.70711 15H0.5C0.223858 15 0 14.7761 0 14.5V9.29289Z" fill="white" /> <path d="M8 15H15V14H8V15Z" fill="white" /> </svg>
                  </button>
                </td>
              </tr>) : ""
          )) : ""
          : DataFiltered ? DataFiltered.map((item, index) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.category}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td className='actionsTd'>
                <button className='actions deleteAction' onClick={() => { deleteProduct(item.id) }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074z" fill="white" /></svg>
                </button>
                <button className='actions editAction'>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.85355 0.146447C9.65829 -0.0488155 9.34171 -0.0488155 9.14645 0.146447L6.50002 2.79288L12.2071 8.49998L14.8536 5.85355C15.0488 5.65829 15.0488 5.34171 14.8536 5.14645L9.85355 0.146447Z" fill="white" /> <path d="M0 9.29289L5.79291 3.49998L11.5 9.20709L5.70711 15H0.5C0.223858 15 0 14.7761 0 14.5V9.29289Z" fill="white" /> <path d="M8 15H15V14H8V15Z" fill="white" /> </svg>
                </button>
              </td>
            </tr>
          )) : ""}

        <tr className='addingInput'>
          <th><input placeholder='= شناسه' onChange={(e) => {
            setNewProcuctId(e.target.value); const value = e.target.value;
            if (isNaN(+value)) alert("عدد نامعتبره");
          }} id="inputNewId" /></th>
          <th>
            <div className="dropdown" id="dropdownMenuButton2">
              <button className="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {newProcuctCategory === "" ? "دسته بندی" : newProcuctCategory}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ maxHeight: "200px", overflow: "scroll" }}>
                {categoryList.map((item, index) => (
                  <a className="dropdown-item" onClick={() => { setNewProcuctCategory(item); }}>{item}</a>
                ))}

              </div>
            </div></th>
          <th><input placeholder='نام' onChange={(e) => { setNewProcuctTitle(e.target.value) }} id="inputNewTitle" /> </th>
          <th><input placeholder='قیمت' onChange={(e) => {
            setNewProcuctPrice(e.target.value); const value = e.target.value;
            if (isNaN(+value)) alert("عدد نامعتبره");
          }} id="inputNewPrice" /></th>
          <th><input placeholder='توضیحات' onChange={(e) => { setNewProcuctDescription(e.target.value) }} id="inputNewDescription" /> </th>
          <th className='addingTh'>
            <button className='actions addAction' onClick={() => addProduct()}>
              <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="ceil" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fillRule="nonzero" /></svg>
            </button>
          </th>
        </tr>


      </table>

      <div className='containCounterPage'>
        <button onClick={() => page !== 1 ? setPage(page - 1) : ""}><svg xmlns="http://www.w3.org/2000/svg" width="10.605" height="15.555"><path d="M10.605 12.727 5.656 7.776l4.949-4.948L7.777 0 0 7.776l7.777 7.779 2.828-2.828z" /></svg></button>

        {[...Array(Math.ceil(DataFiltered.length / row))].map((_, index) => (
          index + 1 === page || index + 1 === Math.ceil(DataFiltered.length / row) || index === 0 ?
            <button className='pagingButton' style={{}} onClick={() => setPage(index + 1)}>{index + 1}</button> : "🍆"
        ))}
        <button onClick={() => page !== Math.ceil(DataFiltered.length / row) ? setPage(page + 1) : ""}><svg xmlns="http://www.w3.org/2000/svg" width="10.605" height="15.555"><path d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z" /></svg></button>


      </div>

    </div>

  </div >
}

export default App;
