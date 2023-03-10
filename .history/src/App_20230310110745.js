import { Button } from 'bootstrap';
import { useEffect, useState, useCallback } from 'react';
import './App.css';
import debounce from "lodash.debounce";

function App() {

  const [Data, setData] = useState([])
  const [DataFiltered, setDataFiltered] = useState([])
  const [empty, setEmpty] = useState(true)
  const [query, setQuery] = useState("");
  const [searchIn, setsearchIn] = useState("نام");
  const [titleSort, setTitleSort] = useState("");
  const [titleSearch, setTitleSearch] = useState("");
  const [titleRow, setTitleRow] = useState("");

  const [row, setRow] = useState(30);
  const [page, setPage] = useState(1);
  const [newProcuctId, setNewProcuctId] = useState();
  const [newProcuctTitle, setNewProcuctTitle] = useState();
  const [newProcuctPrice, setNewProcuctPrice] = useState();
  const [newProcuctDescription, setNewProcuctDescription] = useState();
  const [newProcuctCategory, setNewProcuctCategory] = useState();


  let rows = [];



  const postData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      let result = await response.json();
      setData(result.products)
      console.log(result)

    } catch (err) {
      console.log("err = ", err);
    } finally {
    }
  };
  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 2000), []);


  const deleteProduct = async (id) => {
    if (window.confirm('Do you want to remove?')) {

      try {
        const response = await fetch("https://dummyjson.com/products/" + id, {
          method: "DELETE"
        })
        let result = await response.json();

        window.location.reload()
        postData()
      } catch (err) {
        console.log("err = ", err);
      } finally {
      }
    }
  };


  const addProduct = async () => {
    if (window.confirm('Do you want to Add it?')) {

      try {
        // const response = await fetch("https://dummyjson.com/products/" + newProcuctId, {
        //   method: "POST",
        //   body: JSON.stringify(
        //     { id: newProcuctId, price: newProcuctPrice, description: newProcuctDescription, category: newProcuctCategory }
        //   )

        // })
        // let result = await response.json();
        // console.log(result)
        // console.log(response)
      } catch (err) {
        console.log("err = ", err);
      } finally {
      }
    }
  };

  useEffect(() => {
    postData()
  }, []);



  useEffect(() => {

    for (let i = 0; i < row; i++) {
      rows.push(i);
    }

  }, [row]);



  useEffect(() => {
    filtering(searchIn)
  }, [query]);

  useEffect(() => {
    setDataFiltered(Data)
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
              <a className="dropdown-item" onClick={() => {setRow(5);setTitleRow(5)}} >5</a>
              <a className="dropdown-item" onClick={() => {setRow(12);setTitleRow(12)}}>12  </a>
              <a className="dropdown-item" onClick={() => {setRow(30);setTitleRow(30)}}>30</a>
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
              <a className="dropdown-item" onClick={() => { setsearchIn("نام "); setTitleSearch("نام") }}>نام</a>
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

      

        <tr className='addingInput'>
          <th></th>
          <th><input placeholder='دسته بندی' onChange={(e) => { setNewProcuctCategory(e.target.value) }} /></th>
          <th><input placeholder='نام' onChange={(e) => { setNewProcuctTitle(e.target.value) }} /> </th>
          <th><input placeholder='قیمت' onChange={(e) => { setNewProcuctPrice(e.target.value) }} /></th>
          <th><input placeholder='توضیحات' onChange={(e) => { setNewProcuctDescription(e.target.value) }} /> </th>
          <th className='addingTh'>
            <button className='actions addAction' onClick={() => addProduct()}>
              <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fillRule="nonzero" /></svg>
            </button>
          </th>
        </tr>


      </table>

      <div className='containCounterPage'>
        {[...Array(Math.round(DataFiltered.length / row))].map((_, index) => (
          <button onClick={() => setPage(index + 1)}>{index + 1}</button>
        ))}

      </div>

    </div>

  </div >
}

export default App;
