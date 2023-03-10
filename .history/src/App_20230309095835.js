import { Button } from 'bootstrap';
import { useEffect, useState, useCallback } from 'react';
import './App.css';
import debounce from "lodash.debounce";

function App() {
  const [Data, setData] = useState([])
  const [DataFiltered, setDataFiltered] = useState([])
  const [empty, setEmpty] = useState(true)
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([])


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

  useEffect(() => {
    postData()
  }, []);

  useEffect(() => {
    filtering()
    console.log(query)
    console.log(searchResult)
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

  const filtering = () => {
    DataFiltered
      .filter((data) => data.title.toLowerCase().includes(query))
      .map((data, index) => {
        س(data)
      });
  };

  return <div className="App">
    <div className='containerr'>
      <div className='headButton'>
        <div className='left'>

          <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              ردیف
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" >5</a>
              <a className="dropdown-item" >12  </a>
              <a className="dropdown-item" >30</a>
            </div>
          </div>


          <div className="dropdown">
            <button className="btn dropdown-toggle btn-sort" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              مرتب سازی براساس...
            </button>
            <div className="dropdown-menu dropDownSort" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={() => { sorting(1) }}>شناسه</a>
              <a className="dropdown-item" onClick={() => { sorting(2) }}>دسته بندی </a>
              <a className="dropdown-item" onClick={() => { sorting(3) }}>نام</a>
              <a className="dropdown-item" onClick={() => { sorting(4) }}>قیمت</a>
            </div>
          </div>

        </div>

        <div className='right'>

          <input className='inputSearch' onChange={debouncedChangeHandler}
            type="text" placeholder='متن...' />
          <div className="containList">
            {query === "" ? (
              ""
            ) : (
              <ul className="filteringList">
                {Data.map((data, index) => (
                  <li key={index} className="filteringLi">
                    <span> {data.title} </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              جستجو در ستون
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" >شناسه</a>
              <a className="dropdown-item" >دسته بندی </a>
              <a className="dropdown-item" >نام</a>
              <a className="dropdown-item" >قیمت</a>
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

        {DataFiltered ? DataFiltered.map((item, index) => (
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
        )) : ""

        }

        <tr className='addingInput'>
          <th></th>
          <th><input placeholder='دسته بندی' /></th>
          <th><input placeholder='نام' /> </th>
          <th><input placeholder='قیمت' /></th>
          <th><input placeholder='توضیحات' /> </th>
          <th className='addingTh'>
            <button className='actions addAction'>
              <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm0 1.5c-4.69 0-8.497 3.808-8.497 8.498s3.807 8.497 8.497 8.497 8.498-3.807 8.498-8.497-3.808-8.498-8.498-8.498zm-.747 7.75h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z" fillRule="nonzero" /></svg>
            </button>
          </th>
        </tr>


      </table>

      <div className='containCounterPage'>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
      </div>

    </div>

  </div >
}

export default App;
