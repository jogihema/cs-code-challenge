(
    document.onreadystatechange = ()=> {
        if (document.readyState === 'complete') {
            var userList = document.getElementById('user-list');
            const model = {
                users: []
            };
            const controller = {
                createNewUserElement(el) {
                    listItem = document.createElement("li");
                    img = document.createElement("img");
                    nameLable = document.createElement("span");
                    idLable = document.createElement("span");
                    crateAtLable = document.createElement("span");
                    button = document.createElement("button");
    
                    listItem.className = "list-group-item"
                    img.src = el.avatar
                    img.className = "img"
                    idLable.textContent = el.id;
                    idLable.className = "id";
                    idLable.style.display = 'none'
                    nameLable.textContent = el.name;
                    nameLable.className = "name";
                    console.log(el.createdAt);
                    crateAtLable.textContent = el.createdAt;
                    crateAtLable.className = "createAt";
                    crateAtLable.style.display = 'none'
                    button.textContent = "view";
                    button.className = "view";

                    listItem.appendChild(img);
                    listItem.appendChild(idLable)
                    listItem.appendChild(nameLable)
                    listItem.appendChild(crateAtLable)
                    listItem.appendChild(button)

                    return listItem;
                },
                usersView() {
                    for (let i = 0; i < model.users.length; i++) {
                        const element = model.users[i];
                        const listItem = this.createNewUserElement(element);
                        userList.appendChild(listItem);
                        this.bindUserEvents(listItem);
                    }
                },
                revealUser (el) {
                    var listItem = this.parentNode;
                    var id = listItem.querySelectorAll("span.id")[0];
                    var createAt = listItem.querySelectorAll("span.createAt")[0];
                    if (id.style.display === "none") {
                        id.style.display = "block"
                        createAt.style.display = "block"
                    } else {
                        id.style.display = "none"
                        createAt.style.display = "none"
                    }
                },
                bindUserEvents(listItem, cb) {
                    var viewButton = listItem.querySelectorAll("button.view")[0];
                    viewButton.onclick = this.revealUser;
                },
                async init() {
                    await fetch('https://5dc588200bbd050014fb8ae1.mockapi.io/assessment')
                        .then(response => {
                            if (!response.ok) {
                                throw new Error("Could not get data.");
                            }
                            return response.json();
                        })
                        .then(json => {
                            model.users = json
                        })
                        .catch(err => console.error(err));
                    this.usersView();
                }   
            }
            controller.init();
        }
    }
) ();