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
  const [msgApiResult, setMsgApiResult] = useState("");


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

    setmodalHeader("https://upload.wikimedia.org/wikipedia/commons/0/0f/Icons8_flat_delete_generic.svg")
    setmodalBody("آیا میخواهید این آیتم را حذف کنید؟")

    if (modalAccept) {
      console.log("lskdcnlksd")
      try {
        const response = await fetch("https://dummyjson.com/products/" + x, {
          method: "DELETE"
        })
        console.log(response)

        setData(Data.filter(item => item.id !== x))
        if (response.status === 200) {
          setMsgApiResult("عملیات ویرایش قیمت با موفقیت انجام شد.")

          alert("Removed seccessfully")

        } else {
          setMsgApiResult("مشکلی رخ داده است. لطفا مجددا تلاش کنید.")

          setmodalBody(response)
          setmodalHeader("https://banner2.cleanpng.com/20180608/ckp/kisspng-computer-icons-download-clip-art-5b1a78e2334640.19371497152846153821.jpg")

        }

      } catch (err) {
        console.log("err = ", err);
      } finally {


      }
    }

  };

  const EditPage = (id) => {

    // setmodalHeader("data:image/png;base64,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")
    // setmodalBody("آیا میخواهید این آیتم را ویرایش کنید؟")

    // if (modalAccept) {
      navigate("/products/" + id);
    // }
  }

  const addProduct = async () => {
    setmodalHeader("https://www.freeiconspng.com/thumbs/add-icon-png/add-1-icon--flatastic-1-iconset--custom-icon-design-0.png")
    setmodalBody("آیا میخواهید این آیتم را اضافه کنید؟")
    if (modalAccept) {
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
            setMsgApiResult("عملیات ویرایش قیمت با موفقیت انجام شد.")
            alert("add successfully")
            document.getElementById("inputNewId").value = ""
            document.getElementById("inputNewTitle").value = ""
            document.getElementById("inputNewCategory").value = ""
            document.getElementById("inputNewPrice").value = ""
            document.getElementById("inputNewDescription").value = ""
            if ((Math.ceil(Data.length / row)) > page) setPage(Math.ceil(DataFiltered.length / row))

          } else {
            setMsgApiResult("مشکلی رخ داده است. لطفا مجددا تلاش کنید.")

            setmodalBody(response)
            setmodalHeader("https://banner2.cleanpng.com/20180608/ckp/kisspng-computer-icons-download-clip-art-5b1a78e2334640.19371497152846153821.jpg")

          }


        } catch (err) {
          console.log("err = ", err);
        } finally {
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

    <div className="alertError" id="errorWindow">{msgApiResult}</div>

      {showModal && <div className='moddal'>
        <div className='moddalHeader'>
          <img src={modalHeader} />
        </div>
        <div className='moddalBody'> {modalBody}</div>
        <div className='moddalFooter'><button className='yesButton' onClick={() => { setmodalAccept(true); setshowModal(false) }}>بله</button><button className='noButton' onClick={() => setshowModal(false)}>خیر</button></div>
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
                  <button className='actions deleteAction' onClick={() => { deleteProduct(item.id); setshowModal(true) }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074z" fill="white" /></svg>
                  </button>
                  <button className='actions editAction' onClick={() => { EditPage(item.id); }}>
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
          <th><input placeholder=' شناسه' onChange={(e) => {
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
            <button className='actions addAction' onClick={() => { addProduct(); setshowModal(true) }}>
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
