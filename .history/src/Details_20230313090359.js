import React, { useState, useEffect, useContext } from "react";
import { EditedObjContext } from "./shared/Shared";
import "./Details.css";
import { useHistory, useNavigate } from "react-router-dom";

export default function Details(props) {
    const [Data1, setData1] = useState([])
    const [price, setPrice] = useState();
    let [EditedObj, setEditedObj] = useContext(EditedObjContext);
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
        try {
            const response = await fetch("https://dummyjson.com/products/" + window.location.pathname.split('/')[2], {
                method: "PUT",
                body: JSON.stringify(
                    { price: price }
                )
            })

            Data1.price = price * 1

            const items = JSON.parse(localStorage.getItem('items'));
            let concatArr = items + Data1
            console.log(concatArr)
            localStorage.setItem('items', JSON.stringify(Data1));

            console.log(EditedObj)

        } catch (err) {
            console.log("err = ", err);
        } finally {
        }
    };

    return (
        <div className="containeEditForm">
            <div className="editForm">

                <div class="floating-label-group">
                    <input type="text" id="password" class="form-control" autocomplete="off" required value={Data1.title} />
                    <label class="floating-label">نام</label>
                </div>
                <div class="floating-label-group">
                    <input type="text" id="password" class="form-control" onChange={handleChange} value={price} />
                    <label class="floating-label">قیمت</label>
                </div>
                <div class="floating-label-group">
                    <input type="text" id="password" class="form-control" autocomplete="off" required value={Data1.category} />
                    <label class="floating-label">دسته بندی</label>
                </div>
                <div className="containButtonEdit">
                    <button className="cancelButton">لغو</button>
                    <button data-toggle="modal" data-target="#exampleModal" className="saveButton" onClick={() => { EditPrice(); navigate("/") }}>ذخیره</button>
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    ...
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}