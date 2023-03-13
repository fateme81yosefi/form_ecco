import React, { useState, useEffect } from "react";
import "./Details.css"
export default function Details(props) {
    const [Data, setData] = useState([])

    const postData = async () => {
        try {
            const response = await fetch("https://dummyjson.com/products/" + props.id);
            let result = await response.json();
            setData(result)
            console.log(result)

        } catch (err) {
            console.log("err = ", err);
        } finally {
        }
    };

    useEffect(() => {
        postData()
       console.log( window.location.pathname.split(" ");)
    }, []);
    
    return (
        <div className="containeEditForm">
            <div className="editForm">

                <div class="floating-label-group">
                    <input type="text" id="password" class="form-control" autocomplete="off" required />
                    <label class="floating-label">نام</label>
                </div>
                <div class="floating-label-group">
                    <input type="text" id="password" class="form-control" autocomplete="off" required />
                    <label class="floating-label">قیمت</label>
                </div>
                <div class="floating-label-group">
                    <input type="text" id="password" class="form-control" autocomplete="off" required value="adfksbn" />
                    <label class="floating-label">دسته بندی</label>
                </div>
                <div className="containButtonEdit">
                    <button className="cancelButton">لغو</button>
                    <button className="saveButton">ذخیره</button>

                </div>
            </div>
        </div>
    )
}