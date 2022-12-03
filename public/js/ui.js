const boxes = document.querySelector(".boxes");

const render = (data, id) => {
    const html = `
        <div class="box col l3 m4 s6" data-id="${id}">
            <div class="card small hoverable yellow lighten-4">
                <div class="card-content blue-grey-text">
                    <span class="card-title">${data.name}</span>
                    <p class="truncate" id="container">Items: ${data.items}</p>
                    <p class="truncate">Categories: ${data.categories}</p>
                </div>
                <div class="card-action">
                    <div class="row">
                        <a class="tooltipped modal-trigger" href="#editboxmodal" data-position="top" data-tooltip="edit"><i class="material-icons teal-text" 
                            data-id="${id}" boxname="${data.name}" items="${data.items}" categories="${data.categories}"  >edit</i></a>
                        <a class="tooltipped right deletebox" data-position="top" data-tooltip="delete" ><i class="material-icons teal-text" data-id="${id}">delete</i></a>
                    </div>
                </div>
            </div>
        </div>
    `;
    boxes.innerHTML += html;
};

// const categories = document.querySelectorAll(".categories");
// const renderchips = (data, id) => {
//     categories.forEach((category) => {
//         const html = `
//         <div class="categories" data-id="${id}">
//             <div class="card hoverable gray lighten-4 left">
//                 <div class="card-content blue-grey-text">
//                  <!--   <i class="unchecked material-icons" data-id="${id}">check_box_outline_blank</i></a>
//                     <i class="checked material-icons" data-id="${id}">check_box</i></a> -->

//                     <p class="truncate flow-text">${data.category_name} 
//                     <i class="close material-icons" data-id="${id}">close</i>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     `;
//     category.innerHTML += html;
//     })
// };

// const categoryOptions = document.querySelectorAll(".selectcat");
// const renderOptions = (data, id) => {
//     categoryOptions.forEach((category) => {
//         const html = `
//         <option value="${id}">${data.category_name}</option>
//     `;
//     category.innerHTML += html;
//     })
// };

//remove Box from DOM
const removeBox = (id) => {
    const box = document.querySelector(`.box[data-id ="${id}"]`);
    box.remove();
}
//remove Category from DOM
const removeCategory = (id) => {
    const category = document.querySelector(`.categories[data-id ="${id}"]`);
    category.remove();
}
