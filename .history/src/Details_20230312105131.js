import React from "react";
import "./Details.css"
export default function Details() {
    return (
        <div className="containeEditForm">
            <div className="editForm">
                <input placeholder="نام" />
                <input placeholder="قیمت" />
                <input placeholder="دسته بندی" />
                <div class="floating-label-group">
                    <input type="password" id="password" class="form-control" autocomplete="off" required />
                    <label class="floating-label">نام</label>
                </div>
                <div class="floating-label-group">
                    <input type="password" id="password" class="form-control" autocomplete="off" required />
                    <label class="floating-label">قیمت</label>
                </div>
                <div class="floating-label-group">
                    <input type="password" id="password" class="form-control" autocomplete="off" required />
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