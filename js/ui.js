console.log("ui.js running");

const boxes = document.querySelector(".boxes");

const render = (data, id) => {
    const html = `
        <div class="col l3 m4 s6">
            <div class="card hoverable yellow lighten-4">
                <div class="card-content blue-grey-text">
                    <span class="card-title">${data.name}</span>
                    <p class="truncate" id="container">${data.items}</p>
                </div>
                <div class="card-action">
                    <div class="row">
                        <a class="tooltipped" data-position="top" data-tooltip="edit"><i class="material-icons teal-text">edit</i></a>
                        <a class="tooltipped right" data-position="top" data-tooltip="delete" data-id="${id}"><i class="material-icons teal-text">delete</i></a>
                    </div>
                </div>
            </div>
        </div>
    `;
    boxes.innerHTML += html;
};

