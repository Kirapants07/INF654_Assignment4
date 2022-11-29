const boxes = document.querySelector(".boxes");

const render = (data, id) => {
    const html = `
        <div class="box col l3 m4 s6" data-id="${id}">
            <div class="card hoverable yellow lighten-4">
                <div class="card-content blue-grey-text">
                    <span class="card-title">${data.name}</span>
                    <p class="truncate" id="container">${data.items}</p>
                </div>
                <div class="card-action">
                    <div class="row">
                        <a class="tooltipped" data-position="top" data-tooltip="edit"><i class="material-icons teal-text">edit</i></a>
                        <a class="tooltipped right" data-position="top" data-tooltip="delete" ><i class="material-icons teal-text" data-id="${id}">delete</i></a>
                    </div>
                </div>
            </div>
        </div>
    `;
    boxes.innerHTML += html;
};

const chips = document.querySelector(".categories");
const renderchips = (data, id) => {
    const html = `
    <div class="chip">
        ${data.category_name}
        <i class="close material-icons" data-id="${id}">close</i>
    </div>
    `;
    chips.innerHTML += html;
};


//remove Box from DOM
const removeBox = (id) => {
    const box = document.querySelector(`.box[data-id ="${id}"]`);
    console.log(box);
    box.remove();
}
