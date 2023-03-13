import React, { useState, useEffect, useContext } from "react";
import "./Details.css";
import { useHistory, useNavigate } from "react-router-dom";

export default function Details() {
    const [Data1, setData1] = useState([])
    const [price, setPrice] = useState();
    const [msgApiResult, setMsgApiResult] = useState("");

    const navigate = useNavigate();
    const postData = async (id) => {
        try {
            const response = await fetch("https://dummyjson.com/products/" + id);
            let result = await response.json();
            setData1(result)
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

    const EditPrice = async () => {


        document.getElementById("disableBtn").disabled = true;

        try {
            const response = await fetch("https://dummyjson.com/products/" + window.location.pathname.split('/')[2], {
                method: "PUT",
                body: JSON.stringify(
                    { price: price }
                )
            })
            if(response.status===200)
            setMsgApiResult(response.ReturnValueMessage)

            Data1.price = price * 1

            let arr = []
            if (JSON.parse(localStorage.getItem('items')) !== null) {
                console.log(JSON.parse(localStorage.getItem('items')))
            }
            arr.push({ id: Data1.id, price: Data1.price })
            localStorage.setItem('items', JSON.stringify(arr));

        } catch (err) {
            console.log("err = ", err);
        } finally {
            navigate("/");
        }
    };



    return (
        <div className="containeEditForm">
            <div className="alertError" id="errorWindow">{msgApiResult}</div>

            <div className="editForm">

                <div class="floating-label-group">
                    <input type="text" id="password" class="form-control" autocomplete="on" required value={Data1.title} />
                    <label class="floating-label">نام</label>
                </div>
                <div class="floating-label-group">
                    <input type="text" id="password" class="form-control" onChange={handleChange} value={price} />
                    <label class="floating-label">قیمت</label>
                </div>
                <div class="floating-label-group">
                    <input type="text" id="password" class="form-control" autocomplete="on" required value={Data1.category} />
                    <label class="floating-label">دسته بندی</label>
                </div>
                <div className="containButtonEdit">
                    <button className="cancelButton">لغو</button>
                    <button className="saveButton" id="disableBtn" onClick={() => { EditPrice(); }}>ذخیره</button>

                </div>
            </div>
        </div>
    )
}