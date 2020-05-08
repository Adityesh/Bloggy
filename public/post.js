const delButtons = document.querySelectorAll('#delete');

delButtons.forEach(button => {
    button.addEventListener('click',async () => {
        const postTitle = button.parentElement.parentElement.firstChild.firstChild.innerHTML
        const dateString = button.parentElement.parentElement.firstChild.children[2].innerHTML
        const postBody = button.parentElement.parentElement.children[1].firstChild.innerHTML
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method : 'POST',
            body : JSON.stringify({
                postTitle,
                dateString,
                postBody
            })
        }

        const response = await fetch('/delete/post',options);
        await fetch('/profile')
    })
})