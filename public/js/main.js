const logoutButton = document.querySelector('#logoutButton');

if(logoutButton){
    logoutButton.addEventListener('click', () => {
        axios.post('/logout')
            .then(()=>{
                document.location.reload(true);
            })
    })
}