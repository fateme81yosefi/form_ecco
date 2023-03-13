import React, { useState, useEffect } from "react";
import "./Details.css"
export default function Details(props) {
    const [Data, setData] = useState([])
    const [price, setPrice] = useState();

    const postData = async (id) => {
        try {
            const response = await fetch("https://dummyjson.com/products/" + id);
            let result = await response.json();
            setData(result)
            console.log(result)
            setPrice(result.price)

        } catch (err) {
            console.log("err = ", err);
        } finally {
        }
    };

    useEffect(() => {
        postData(window.location.pathname.split('/')[2])

    }, []);

    const handleChange = event => {
        if (isNaN(event.target.value)) {
            alert("قیمت وارد شده معتبر نیست!")
        }
        else setPrice(event.target.value);
    };

    const EditPrice = async (id) => {
        try {
            const response = await fetch("https://dummyjson.com/products/" + id, {
                method: "PUT",
                body: JSON.stringify(
                    { price: price }
                )
            })
            let result = await response.json();
       

        } catch (err) {
            console.log("err = ", err);
        } finally {
        }
    };

    return (
        <div className="containeEditForm">
            <div className="editForm">

                <div class="floating-label-group">
                    <input type="text" id="password" class="form-control" autocomplete="off" required value={Data.title} />
                    <label class="floating-label">نام</label>
                </div>
                <div class="floating-label-group">
                    <input type="text" id="password" class="form-control" onChange={handleChange} value={price} />
                    <label class="floating-label">قیمت</label>
                </div>
                <div class="floating-label-group">
                    <input type="text" id="password" class="form-control" autocomplete="off" required value={Data.category} />
                    <label class="floating-label">دسته بندی</label>
                </div>
                <div className="containButtonEdit">
                    <button className="cancelButton">لغو</button>
                    <button className="saveButton" onClick={() => EditPrice()}>ذخیره</button>

                </div>
            </div>
        </div>
    )
}