for (let element of document.getElementsByClassName("servers__server")) {
    element.addEventListener("click", function(_: Event) {
        for (let toDisable of document.getElementsByClassName("current_server")) {
            toDisable.classList.remove("current_server");
        }
        element.classList.add("current_server");
    })
}
