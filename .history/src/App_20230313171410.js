import { Alert, Button } from 'bootstrap';
import { useEffect, useState, useCallback, useContext } from 'react';
import './App.css';
import debounce from "lodash.debounce";
import { Link, useNavigate } from "react-router-dom";

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

  const [modalHeader, setmodalHeader] = useState("");
  const [modalBody, setmodalBody] = useState("");
  const [modalAccept, setmodalAccept] = useState(false);
  const [showModal, setshowModal] = useState(false);


  const navigate = useNavigate();

  let items = []
  const postData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      let result = await response.json();
      setData(result.products);

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
    setshowModal(true)

    setmodalHeader("https://upload.wikimedia.org/wikipedia/commons/0/0f/Icons8_flat_delete_generic.svg")
    setmodalBody("آیا میخواهید این آیتم را حذف کنید؟")

    if (modalAccept === true)
      console.log("lskdcnlksd")
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
      setmodalAccept(false)
      setshowModal(false)

    }


  };

  const EditPage = (id) => {
    navigate("/products/" + id);
  }

  const addProduct = async () => {
    setshowModal(true)
    setmodalHeader("https://www.freeiconspng.com/thumbs/add-icon-png/add-1-icon--flatastic-1-iconset--custom-icon-design-0.png")
    setmodalBody("آیا میخواهید این آیتم را اضافه کنید؟")
    if (modalAccept === true) {
      console.log("modalAccept === true")
      if (isNaN(newProcuctId)) {
        alert("آیدی معتبر نیست ")
      }
      else if (isNaN(newProcuctPrice)) {
        alert("قیمت معتبر نیست ")
      }
      else {
        try {
          const response = await fetch("https://dummyjson.com/products/add", {
            method: "POST",
            body: JSON.stringify(
              { id: newProcuctId, price: newProcuctPrice, description: newProcuctDescription, category: newProcuctCategory }
            )
          })

          setData((x) => [...x, { id: newProcuctId, title: newProcuctTitle, price: newProcuctPrice, description: newProcuctDescription, category: newProcuctCategory }])
          setEmpty(!empty)
          console.log(response)
          if (response.status === 200) {
            alert("add successfully")
            document.getElementById("inputNewId").value = ""
            document.getElementById("inputNewTitle").value = ""
            document.getElementById("inputNewCategory").value = ""
            document.getElementById("inputNewPrice").value = ""
            document.getElementById("inputNewDescription").value = ""
            if ((Math.ceil(Data.length / row)) > page) setPage(Math.ceil(DataFiltered.length / row))
          }else{
            setmodalBody(response)
            setmodalHeader("data:image/png;base64,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")
          }

        } catch (err) {
          console.log("err = ", err);
        } finally {
          setmodalAccept(false)
          setshowModal(false)
        }
      }
    }

  };

  const applyEdit = (items) => {

    Data.map((item) =>
      item.id === items[0].id ? item.price = items[0].price : ""
    )
    setDataFiltered(Data)

  }

  useEffect(() => {
    postData()
    postCategory()
    document.getElementById("inputSearch").focus();
  }, []);

  useEffect(() => {
    filtering(searchIn)
  }, [query]);

  useEffect(() => {
    items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      applyEdit(items)
    }
    else setDataFiltered(Data);

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
      {showModal && <div className='moddal'>
        <div className='moddalHeader'>
          <img src={modalHeader} />
        </div>
        <div className='moddalBody'> {modalBody}</div>
        <div className='moddalFooter'><button className='yesButton' onClick={() => setmodalAccept(true)}>بله</button><button className='noButton' onClick={() => setshowModal(false)}>خیر</button></div>
      </div>}

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

          <input className='inputSearch' id='inputSearch' onChange={debouncedChangeHandler}
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
            <button className='pagingButton' style={{}} onClick={() => setPage(index + 1)}>{index + 1}</button> : "●"
        ))}
        <button onClick={() => page !== Math.ceil(DataFiltered.length / row) ? setPage(page + 1) : ""}><svg xmlns="http://www.w3.org/2000/svg" width="10.605" height="15.555"><path d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z" /></svg></button>

      </div>

    </div>

  </div >
}

export default App;
