document.addEventListener("click", (_: Event) => {
    if (this.classList.contains("servers__server")) {
        for (let toDisable of document.getElementsByClassName("current_server")) {
            toDisable.classList.remove("current_server");
        }
        this.classList.add("current_server");
    }

    if (this.classList.contains("channels__channel")) {
        window.location.href = "";  // TODO
    }
})
