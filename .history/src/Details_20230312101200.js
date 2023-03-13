import React from "react";
import "./Details.css"
export default function Details() {
    return (
        <div className="containeEditForm">
            <div className="editForm">
                <input placeholder="نام" />
                <input placeholder="قیمت" />
                <input placeholder="دسته بندی" />

                <div className="containButtonEdit">
                    <button>ذخیره</button>
                    <button className="cancelButton">لغو</button>

                </div>
            </div>
        </div>
    )
}